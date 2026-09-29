// ============================================================================
// start.js — ЧАСТЬ 1: ИНИЦИАЛИЗАЦИЯ.
//
// Отвечает за всё, что происходит до того, как пользователь начал работать:
//   1. логгер (окно «Лог выполнения»);
//   2. загрузка библиотек с CDN (mdld-parse, oxigraph, marked, n3);
//   3. выбор ИСТОЧНИКА данных (web / data.js / локальная папка / GitHub raw);
//   4. чтение списка заметок и SPARQL-запросов;
//   5. разбор всех заметок в RDF и заполнение хранилища Oxigraph.
//
// Результат — объект контекста ctx, который получает app.js (часть 2).
// Файл подключается обычным <script src>, а не как ES-модуль:
// <script type="module"> по протоколу file:// блокируется CORS (см. doc/CORS.md).
// ============================================================================
(function (root) {
  'use strict';
  const core = root.MdldCore;
  const CONFIG = root.CONFIG || {};

  // --------------------------------------------------------------------------
  // 1. Логгер
  // --------------------------------------------------------------------------

  const LOG_COLORS = { info: '#7fdbff', ok: '#2ecc71', trace: '#9b59b6', warn: '#f39c12', err: '#e74c3c' };
  const LOG_ICONS = { info: 'ℹ', ok: '✓', trace: '📞', warn: '⚠', err: '✗' };

  /**
   * Создаёт логгер, пишущий в элемент el. Возвращает { log, trace }.
   * trace(lib, fn, args, result) печатает строку вызова библиотеки.
   */
  const createLogger = (el, traceEnabled) => {
    const log = (msg, type = 'info') => {
      const span = document.createElement('span');
      span.style.color = LOG_COLORS[type] || '#0f0';
      span.textContent = `[${new Date().toLocaleTimeString('ru-RU')}] ${LOG_ICONS[type] || '·'} ${msg}\n`;
      el.appendChild(span);
      el.scrollTop = el.scrollHeight;
    };
    const trace = (lib, fn, args, result) => traceEnabled && log(core.traceLine(lib, fn, args, result), 'trace');
    return { log, trace };
  };

  // --------------------------------------------------------------------------
  // 2. Библиотеки
  // --------------------------------------------------------------------------

  /** Загружает одну библиотеку через динамический import() с замером времени. */
  const importLib = async (logger, name, url) => {
    const t0 = performance.now();
    logger.log(`Загрузка ${name}…`);
    const mod = await import(url);
    logger.log(`${name} загружен за ${(performance.now() - t0).toFixed(0)} мс`, 'ok');
    return mod;
  };

  /**
   * Загружает все библиотеки ПАРАЛЛЕЛЬНО (Promise.all) — в ver2 они грузились
   * последовательно четырьмя try/catch-блоками.
   */
  const loadLibraries = async (logger, libs) => {
    const [mdld, ox, m, N3] = await Promise.all([
      importLib(logger, 'mdld-parse', libs.mdldParse),
      importLib(logger, 'oxigraph', libs.oxigraph),
      importLib(logger, 'marked', libs.marked),
      importLib(logger, 'n3', libs.n3)
    ]);
    await ox.default(); // инициализация WASM-модуля Oxigraph
    logger.trace('oxigraph', 'default', ['init WASM'], 'ok');
    return { mdld, oxigraph: ox, marked: m.marked || m.default || m, N3 };
  };

  // --------------------------------------------------------------------------
  // 3. Источники данных
  //
  // Источник — объект { id, title, list(dir, ext), read(dir, file) }.
  // Все функции возвращают Promise, поэтому app.js работает с любым
  // источником одинаково.
  // --------------------------------------------------------------------------

  /** Проверка ответа fetch и получение текста. */
  const fetchText = async (url, logger) => {
    const r = await fetch(url, { cache: 'no-store' });
    logger && logger.trace('fetch', 'fetch', [url], `Response ${r.status}`);
    if (!r.ok) throw new Error(`HTTP ${r.status}: ${url}`);
    return r.text();
  };

  /**
   * Web-источник: файлы рядом с index.html (GitHub Pages, любой http-сервер).
   * Список файлов берётся из <dir>/manifest.json.
   */
  const webSource = (logger, base = '.') => ({
    id: 'web',
    title: `Web (${base === '.' ? 'папка index.html' : base})`,
    list: async (dir, ext) => core.filesWithExt(JSON.parse(await fetchText(`${base}/${dir}/manifest.json`, logger)), ext),
    read: (dir, file) => fetchText(`${base}/${dir}/${file}`, logger)
  });

  /**
   * GitHub-источник: всегда актуальные файлы из репозитория (CONFIG.githubRepo).
   * Список — через GitHub REST API (manifest.json не нужен), содержимое — через
   * raw.githubusercontent.com. Оба сервиса отдают Access-Control-Allow-Origin: *,
   * поэтому работают и по file://.
   */
  const githubSource = (logger, cfg) => {
    const path = (dir) => [cfg.githubBasePath, dir].filter(Boolean).join('/');
    return {
      id: 'github',
      title: `GitHub (${cfg.githubRepo}@${cfg.githubBranch}/${cfg.githubBasePath})`,
      list: async (dir, ext) => {
        const url = `https://api.github.com/repos/${cfg.githubRepo}/contents/${path(dir)}?ref=${cfg.githubBranch}`;
        const items = JSON.parse(await fetchText(url, logger));
        return core.filesWithExt(items.filter((i) => i.type === 'file').map((i) => i.name), ext);
      },
      read: (dir, file) =>
        fetchText(`https://raw.githubusercontent.com/${cfg.githubRepo}/${cfg.githubBranch}/${path(dir)}/${file}`, logger)
    };
  };

  /**
   * Источник data.js: window.MDLD_DATA = { notes: {file: text}, SPARQL: {file: text} }.
   * Подключается через <script src="data.js"> — работает по file:// без сети.
   */
  const bundleSource = (data) => ({
    id: 'bundle',
    title: 'data.js (встроенная копия)',
    list: async (dir, ext) => core.filesWithExt(Object.keys(data[dir] || {}), ext),
    read: async (dir, file) => {
      if (!data[dir] || !(file in data[dir])) throw new Error(`Нет файла ${dir}/${file} в data.js`);
      return data[dir][file];
    }
  });

  /**
   * Источник «локальная папка»: FileList из <input type="file" webkitdirectory>.
   * Пользователь выбирает папку ver3 — файлы читаются через File.text(),
   * без fetch и без CORS. Повторный выбор папки = синхронизация с диском.
   */
  const folderSource = (fileList) => {
    // webkitRelativePath = "ver3/notes/note1.md" → ключ "notes/note1.md"
    const byPath = new Map([...fileList].map((f) => [f.webkitRelativePath.split('/').slice(1).join('/'), f]));
    const root = ([...fileList][0] || {}).webkitRelativePath || '';
    return {
      id: 'folder',
      title: `Локальная папка (${root.split('/')[0]})`,
      list: async (dir, ext) =>
        core.filesWithExt([...byPath.keys()].filter((p) => p.startsWith(dir + '/') && p.split('/').length === 2)
          .map((p) => p.split('/')[1]), ext),
      read: async (dir, file) => {
        const f = byPath.get(`${dir}/${file}`);
        if (!f) throw new Error(`Нет файла ${dir}/${file} в выбранной папке`);
        return f.text();
      }
    };
  };

  /**
   * Источник по умолчанию:
   *   http(s)  → web (файлы рядом с index.html);
   *   file://  → data.js, если он подключён; иначе web (сработает в Firefox
   *              с разрешённым file-доступом, либо пользователь выберет папку).
   */
  const defaultSource = (logger) =>
    root.location.protocol === 'file:' && root.MDLD_DATA ? bundleSource(root.MDLD_DATA) : webSource(logger);

  // --------------------------------------------------------------------------
  // 4–5. Загрузка данных и построение графа
  // --------------------------------------------------------------------------

  /** Разбор одной заметки: text → { file, text, quads, md }. */
  const parseNote = (libs, logger, file, text) => {
    const result = libs.mdld.parse({ text });
    logger.trace('mdldParse', 'parse', [{ text: `{${text.length} chars}` }], { quads: result.quads.length });
    return { file, text, quads: result.quads || [], md: result.md || text };
  };

  /**
   * Загружает всё из источника и строит новое хранилище Oxigraph.
   * Возвращает неизменяемый снимок данных:
   *   { source, noteFiles, queryFiles, notes: Map(file → note), store, quads }
   */
  const loadData = async (libs, logger, source) => {
    logger.log(`=== Источник данных: ${source.title} ===`);
    const [noteFiles, queryFiles] = await Promise.all([
      source.list(CONFIG.notesDir || 'notes', '.md'),
      source.list(CONFIG.sparqlDir || 'SPARQL', '.rq')
    ]);
    logger.log(`Заметки: ${noteFiles.join(', ') || '—'}`, 'ok');
    logger.log(`SPARQL: ${queryFiles.join(', ') || '—'}`, 'ok');

    // Чтение и разбор всех заметок параллельно (map + Promise.all вместо for…of)
    const notes = await Promise.all(noteFiles.map(async (file) => {
      try {
        return parseNote(libs, logger, file, await source.read(CONFIG.notesDir || 'notes', file));
      } catch (e) {
        logger.log(`Ошибка ${file}: ${e.message}`, 'err');
        return null;
      }
    }));
    const okNotes = notes.filter(Boolean);
    const quads = core.mergeQuads(okNotes.map((n) => n.quads));

    const store = new libs.oxigraph.Store();
    quads.forEach((q) => store.add(q));
    logger.trace('store', 'add', [`${quads.length} quads`], { size: store.size });
    logger.log(`RDF-граф готов: ${store.size} триплетов из ${okNotes.length} заметок`, 'ok');

    return Object.freeze({
      source,
      noteFiles: okNotes.map((n) => n.file),
      queryFiles,
      notes: new Map(okNotes.map((n) => [n.file, n])),
      store,
      quads
    });
  };

  /**
   * Точка входа инициализации. Возвращает Promise<ctx>:
   *   { CONFIG, libs, logger, sources: {...фабрики}, loadData, data }
   */
  const start = async () => {
    const logger = createLogger(document.getElementById('log'), CONFIG.trace !== false);
    logger.log('=== Запуск приложения (start.js) ===');
    logger.log(`Протокол: ${root.location.protocol}  data.js: ${root.MDLD_DATA ? 'подключён' : 'нет'}`);
    const libs = await loadLibraries(logger, CONFIG.libs);

    let data = null;
    try {
      data = await loadData(libs, logger, defaultSource(logger));
    } catch (e) {
      logger.log(`Источник по умолчанию недоступен: ${e.message}`, 'warn');
      logger.log('Выберите «Локальная папка» или «GitHub (raw)» в поле «Источник».', 'warn');
    }

    return {
      CONFIG,
      libs,
      logger,
      sources: {
        web: () => webSource(logger),
        github: () => githubSource(logger, CONFIG),
        bundle: () => (root.MDLD_DATA ? bundleSource(root.MDLD_DATA) : null),
        folder: (fileList) => folderSource(fileList)
      },
      loadData: (source) => loadData(libs, logger, source),
      data
    };
  };

  root.MdldStart = Object.freeze({ start, createLogger, webSource, githubSource, bundleSource, folderSource });
})(window);
