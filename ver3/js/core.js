// ============================================================================
// core.js — чистые функции (Functional Core) проекта MD-LD Zettelkasten ver3.
//
// Здесь НЕТ обращений к DOM, сети или глобальному состоянию: каждая функция
// получает все данные через аргументы и возвращает новое значение, не изменяя
// входные данные. Поэтому модуль:
//   * одинаково работает в браузере (подключается как <script src>) и в Node.js
//     (подключается через require() в автотестах tests/*.test.js);
//   * легко тестируется без моков.
//
// Подключение в браузере: <script src="js/core.js"></script> → window.MdldCore
// Подключение в Node.js:  const core = require('../js/core.js')
// ============================================================================
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api; // Node.js
  else root.MdldCore = api;                                                // браузер
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Константы
  // --------------------------------------------------------------------------

  /** Префиксы, используемые при сериализации в Turtle. */
  const TURTLE_PREFIXES = Object.freeze({
    ex: 'tag:example.org,2026:',
    schema: 'http://schema.org/',
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
    xsd: 'http://www.w3.org/2001/XMLSchema#'
  });

  /**
   * Виды (представления) окна заметки.
   * id — значение в выпадающем списке «Вид», ext/mime — формат файла при сохранении.
   */
  const NOTE_VIEWS = Object.freeze([
    { id: 'raw',      label: 'Markdown (raw, с аннотациями)', ext: 'md',   mime: 'text/markdown' },
    { id: 'rendered', label: 'Markdown (отрендеренный)',      ext: 'html', mime: 'text/html' },
    { id: 'turtle',   label: 'RDF (Turtle)',                  ext: 'ttl',  mime: 'text/turtle' },
    { id: 'github',   label: 'Markdown (GitHub)',             ext: 'html', mime: 'text/html' }
  ]);

  // --------------------------------------------------------------------------
  // Строки и форматирование
  // --------------------------------------------------------------------------

  /** Экранирование HTML-спецсимволов. */
  const escapeHtml = (s) => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  /** Краткое представление значения для лога: строки обрезаются, объекты сворачиваются. */
  const fmt = (v) => {
    if (v === null) return 'null';
    if (v === undefined) return 'undefined';
    if (typeof v === 'string') {
      const s = v.replace(/\s+/g, ' ');
      return `"${s.length > 60 ? s.slice(0, 60) + '…' : s}"`;
    }
    if (typeof v === 'number' || typeof v === 'boolean') return String(v);
    if (Array.isArray(v)) return `[${v.length} items]`;
    if (typeof v === 'object') {
      if (typeof v.size === 'number') return `{size: ${v.size}}`;
      const keys = Object.keys(v);
      return `{${keys.slice(0, 4).join(', ')}${keys.length > 4 ? ', …' : ''}}`;
    }
    return String(v);
  };

  /** Строка трассировки вызова: lib.fn(args) → result */
  const traceLine = (lib, fn, args, result) =>
    `${lib}.${fn}(${(Array.isArray(args) ? args : [args]).map(fmt).join(', ')}) → ${fmt(result)}`;

  /** Имя файла без расширения: "notes/note1.md" → "note1". */
  const baseName = (path) => String(path).split('/').pop().replace(/\.[^.]+$/, '');

  /** Имя файла для сохранения вида: ("note1.md", "turtle") → "note1.turtle.ttl". */
  const saveFileName = (file, viewId) => {
    const view = NOTE_VIEWS.find((v) => v.id === viewId) || NOTE_VIEWS[0];
    return `${baseName(file)}.${view.id}.${view.ext}`;
  };

  // --------------------------------------------------------------------------
  // Списки файлов (манифесты)
  // --------------------------------------------------------------------------

  /**
   * Фильтрует и сортирует список имён файлов по расширению.
   * Используется, когда манифест строится из содержимого папки (desktop / GitHub API).
   */
  const filesWithExt = (names, ext) =>
    [...new Set(names)]
      .filter((n) => n.toLowerCase().endsWith(ext))
      .sort((a, b) => a.localeCompare(b));

  // --------------------------------------------------------------------------
  // RDF
  // --------------------------------------------------------------------------

  /** Уникальный ключ квада (для дедупликации при объединении заметок). */
  const quadKey = (q) =>
    [q.subject, q.predicate, q.object, q.graph]
      .map((t) => (t ? `${t.termType}:${t.value}:${(t.datatype && t.datatype.value) || ''}:${t.language || ''}` : ''))
      .join(' ');

  /** Объединяет массивы квадов без дубликатов (порядок первого вхождения сохраняется). */
  const mergeQuads = (lists) =>
    [...new Map(lists.flat().map((q) => [quadKey(q), q])).values()];

  /**
   * Сериализация квадов в Turtle с помощью N3.Writer.
   * Возвращает Promise<string>; сам writer — внешний объект, но результат
   * зависит только от входных данных.
   */
  const quadsToTurtle = (N3, quads, prefixes = TURTLE_PREFIXES) =>
    new Promise((resolve, reject) => {
      const writer = new N3.Writer({ format: 'Turtle', prefixes });
      quads.forEach((q) => writer.addQuad(q));
      writer.end((err, out) => (err ? reject(err) : resolve(out)));
    });

  // --------------------------------------------------------------------------
  // SPARQL-результаты
  // --------------------------------------------------------------------------

  /**
   * Результат store.query() (итерируемый набор Map<var, Term>) → { vars, rows }.
   * rows — массив обычных объектов {var: value}. Для ASK/CONSTRUCT формирует
   * табличное представление тоже.
   */
  const bindingsToTable = (results) => {
    if (typeof results === 'boolean') return { vars: ['result'], rows: [{ result: String(results) }] };
    if (typeof results === 'string') return { vars: ['result'], rows: [{ result: results }] };
    const list = [...results];
    // CONSTRUCT/DESCRIBE возвращают квады
    if (list.length && list[0] && list[0].subject && list[0].predicate) {
      return {
        vars: ['subject', 'predicate', 'object'],
        rows: list.map((q) => ({ subject: q.subject.value, predicate: q.predicate.value, object: q.object.value }))
      };
    }
    const rows = list.map((b) => Object.fromEntries([...b].map(([k, v]) => [k, v.value])));
    const vars = [...new Set(rows.flatMap(Object.keys))];
    return { vars, rows };
  };

  /** Сокращение IRI по префиксам для отображения: http://schema.org/Person → schema:Person. */
  const compactIri = (value, prefixes = TURTLE_PREFIXES) => {
    const hit = Object.entries(prefixes).find(([, ns]) => String(value).startsWith(ns));
    return hit ? `${hit[0]}:${String(value).slice(hit[1].length)}` : String(value);
  };

  /** Таблица результатов → HTML. */
  const tableToHtml = ({ vars, rows }) =>
    rows.length === 0
      ? '<em>Нет результатов</em>'
      : '<table><thead><tr>' +
        vars.map((v) => `<th>${escapeHtml(v)}</th>`).join('') +
        '</tr></thead><tbody>' +
        rows.map((r) => '<tr>' + vars.map((v) => `<td>${escapeHtml(compactIri(r[v] ?? ''))}</td>`).join('') + '</tr>').join('') +
        '</tbody></table>';

  /** Экранирование значения CSV (RFC 4180). */
  const csvCell = (v) => {
    const s = String(v ?? '');
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  /** Таблица результатов → CSV. */
  const tableToCsv = ({ vars, rows }) =>
    [vars.map(csvCell).join(','), ...rows.map((r) => vars.map((v) => csvCell(r[v])).join(','))].join('\n') + '\n';

  // --------------------------------------------------------------------------
  // HTML-документы для сохранения
  // --------------------------------------------------------------------------

  /** Оборачивает HTML-фрагмент в самостоятельный документ (для кнопки «Сохранить»). */
  const wrapHtmlDocument = (title, bodyHtml, extraHead = '') =>
    `<!DOCTYPE html>\n<html lang="ru">\n<head>\n<meta charset="UTF-8">\n<title>${escapeHtml(title)}</title>\n${extraHead}\n</head>\n<body>\n${bodyHtml}\n</body>\n</html>\n`;

  /** Сериализует содержимое папок notes/ и SPARQL/ в текст файла data.js. */
  const buildDataJs = (data) =>
    '// data.js — АВТОМАТИЧЕСКИ СГЕНЕРИРОВАННЫЙ файл (см. doc/CORS.md, doc/SYNC.md).\n' +
    '// Содержит копию notes/ и SPARQL/ для запуска по file:// без CORS.\n' +
    '// Пересоздать: кнопка «Экспорт data.js» в интерфейсе или `node tests/build-data.js`.\n' +
    `window.MDLD_DATA = ${JSON.stringify(data, null, 2)};\n`;

  return Object.freeze({
    TURTLE_PREFIXES,
    NOTE_VIEWS,
    escapeHtml,
    fmt,
    traceLine,
    baseName,
    saveFileName,
    filesWithExt,
    quadKey,
    mergeQuads,
    quadsToTurtle,
    bindingsToTable,
    compactIri,
    tableToHtml,
    csvCell,
    tableToCsv,
    wrapHtmlDocument,
    buildDataJs
  });
});
