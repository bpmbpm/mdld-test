// ============================================================================
// app.js — ЧАСТЬ 2: ИСПОЛНЕНИЕ (работа пользователя в интерфейсе).
//
// Получает контекст ctx из start.js и навешивает обработчики событий:
//   * «Источник» / «Обновить» / «Экспорт data.js» / автообновление;
//   * выбор заметки → три окна, в каждом выпадающий список «Вид» и «Сохранить»;
//   * выбор SPARQL-запроса → «Выполнить», «Сохранить» для кода и результата.
//
// Состояние приложения — один объект state, который НЕ изменяется по месту:
// каждое событие создаёт новый объект через setState({...state, ...patch}),
// после чего вызывается перерисовка затронутых окон.
// ============================================================================
(function (root) {
  'use strict';
  const core = root.MdldCore;
  const $ = (id) => document.getElementById(id);

  // --------------------------------------------------------------------------
  // Сохранение файлов (браузерная загрузка через Blob, работает и по file://)
  // --------------------------------------------------------------------------

  /** Скачивает строку content как файл name. */
  const downloadText = (name, content, mime = 'text/plain') => {
    const url = URL.createObjectURL(new Blob([content], { type: `${mime};charset=utf-8` }));
    const a = Object.assign(document.createElement('a'), { href: url, download: name });
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // --------------------------------------------------------------------------
  // Представления заметки
  // --------------------------------------------------------------------------

  /**
   * Строит представление заметки для вида viewId.
   * Возвращает Promise<{ html, save }>:
   *   html — что показать в окне; save — содержимое файла для «Сохранить».
   */
  const renderView = async (libs, note, viewId) => {
    switch (viewId) {
      case 'raw':
        return { html: `<pre class="raw-md">${core.escapeHtml(note.text)}</pre>`, save: note.text };
      case 'rendered': {
        const html = libs.marked.parse(note.md);
        return { html: `<div class="markdown-view">${html}</div>`, save: core.wrapHtmlDocument(note.file, html) };
      }
      case 'turtle': {
        const ttl = await core.quadsToTurtle(libs.N3, note.quads);
        return { html: `<pre class="turtle">${core.escapeHtml(ttl)}</pre>`, save: ttl };
      }
      case 'github': {
        // GitHub не знает синтаксиса MD-LD: он рендерит ИСХОДНЫЙ текст как GFM,
        // поэтому аннотации {…} и строки префиксов видны как обычный текст.
        const html = libs.marked.parse(note.text, { gfm: true });
        const css = `<link rel="stylesheet" href="${root.CONFIG.libs.githubCss}">` +
          '<style>.markdown-body{max-width:980px;margin:0 auto;padding:45px}</style>';
        return {
          html: `<article class="markdown-body">${html}</article>`,
          save: core.wrapHtmlDocument(note.file, `<article class="markdown-body">${html}</article>`, css)
        };
      }
      default:
        throw new Error(`Неизвестный вид: ${viewId}`);
    }
  };

  // --------------------------------------------------------------------------
  // Запуск
  // --------------------------------------------------------------------------

  const run = (ctx) => {
    const { libs, logger } = ctx;
    const PANES = [0, 1, 2];

    // Единственное изменяемое место — ссылка на текущий неизменяемый снимок.
    let state = Object.freeze({
      data: ctx.data,                               // снимок из start.js/loadData
      noteFile: '',                                 // выбранная заметка
      views: ['raw', 'rendered', 'turtle'],         // вид каждого из трёх окон
      saved: [null, null, null],                    // что сохранять из каждого окна
      queryFile: '',
      queryText: '',
      table: null                                   // результат SPARQL {vars, rows}
    });
    const setState = (patch) => { state = Object.freeze({ ...state, ...patch }); return state; };

    // ---------------- Заполнение выпадающих списков ----------------

    const options = (items, placeholder) =>
      `<option value="">${placeholder}</option>` +
      items.map((f) => `<option value="${core.escapeHtml(f)}">${core.escapeHtml(f)}</option>`).join('');

    const fillSelects = () => {
      const d = state.data;
      $('note-select').innerHTML = options(d ? d.noteFiles : [], d ? '— выберите заметку —' : '— нет данных —');
      $('sparql-select').innerHTML = options(d ? d.queryFiles : [], d ? '— выберите запрос —' : '— нет данных —');
      $('source-info').textContent = d ? `${d.source.title}: ${d.noteFiles.length} заметок, ${d.store.size} триплетов` : 'данные не загружены';
      // сохраняем выбор, если файл есть в новом снимке
      if (d && d.notes.has(state.noteFile)) $('note-select').value = state.noteFile;
      if (d && d.queryFiles.includes(state.queryFile)) $('sparql-select').value = state.queryFile;
    };

    PANES.forEach((i) => {
      $(`view-${i}`).innerHTML = core.NOTE_VIEWS.map((v) => `<option value="${v.id}">${v.label}</option>`).join('');
      $(`view-${i}`).value = state.views[i];
    });

    // ---------------- Окна заметки ----------------

    /** Перерисовать окно i по текущему state. */
    const renderPane = async (i) => {
      const note = state.data && state.data.notes.get(state.noteFile);
      const body = $(`pane-${i}`);
      if (!note) { body.innerHTML = '<em>Заметка не выбрана</em>'; $(`save-${i}`).disabled = true; return; }
      try {
        const { html, save } = await renderView(libs, note, state.views[i]);
        body.innerHTML = html;
        setState({ saved: state.saved.map((s, j) => (j === i ? save : s)) });
        $(`save-${i}`).disabled = false;
        logger.log(`Окно ${i + 1}: ${note.file} → ${state.views[i]}`, 'ok');
      } catch (e) {
        body.innerHTML = `<span class="error">Ошибка: ${core.escapeHtml(e.message)}</span>`;
        logger.log(`Окно ${i + 1}: ${e.message}`, 'err');
      }
    };
    const renderPanes = () => Promise.all(PANES.map(renderPane));

    $('note-select').addEventListener('change', (e) => {
      setState({ noteFile: e.target.value });
      logger.log(`=== Выбрана заметка: ${state.noteFile || '—'} ===`);
      renderPanes();
    });

    PANES.forEach((i) => {
      $(`view-${i}`).addEventListener('change', (e) => {
        setState({ views: state.views.map((v, j) => (j === i ? e.target.value : v)) });
        renderPane(i);
      });
      $(`save-${i}`).addEventListener('click', () => {
        const view = core.NOTE_VIEWS.find((v) => v.id === state.views[i]);
        const name = core.saveFileName(state.noteFile, view.id);
        downloadText(name, state.saved[i], view.mime);
        logger.log(`Сохранено: ${name}`, 'ok');
      });
    });

    // ---------------- SPARQL ----------------

    const loadQuery = async (file) => {
      setState({ queryFile: file, table: null });
      $('sparql-result').innerHTML = '<em>—</em>';
      $('save-result').disabled = true;
      if (!file) { $('sparql-code').value = ''; $('run-sparql').disabled = true; return; }
      try {
        const text = await state.data.source.read(ctx.CONFIG.sparqlDir || 'SPARQL', file);
        setState({ queryText: text });
        $('sparql-code').value = text;
        $('run-sparql').disabled = false;
        logger.log(`SPARQL загружен: ${file} (${text.length} байт)`, 'ok');
      } catch (e) {
        logger.log(`Ошибка: ${e.message}`, 'err');
      }
    };

    const runQuery = () => {
      const query = $('sparql-code').value; // код можно править прямо в окне
      const t0 = performance.now();
      try {
        const table = core.bindingsToTable(state.data.store.query(query));
        logger.trace('store', 'query', [`{${query.length} chars}`], `{${table.rows.length} rows}`);
        logger.log(`SPARQL вернул ${table.rows.length} строк за ${(performance.now() - t0).toFixed(1)} мс`, 'ok');
        setState({ queryText: query, table });
        $('sparql-result').innerHTML = core.tableToHtml(table);
        $('save-result').disabled = false;
      } catch (e) {
        logger.log(`Ошибка SPARQL: ${e.message}`, 'err');
        $('sparql-result').innerHTML = `<span class="error">Ошибка: ${core.escapeHtml(e.message)}</span>`;
      }
    };

    $('sparql-select').addEventListener('change', (e) => loadQuery(e.target.value));
    $('run-sparql').addEventListener('click', runQuery);
    $('save-code').addEventListener('click', () => {
      const name = state.queryFile || 'query.rq';
      downloadText(name, $('sparql-code').value, 'application/sparql-query');
      logger.log(`Сохранено: ${name}`, 'ok');
    });
    $('save-result').addEventListener('click', () => {
      const name = `${core.baseName(state.queryFile || 'query')}.result.csv`;
      downloadText(name, core.tableToCsv(state.table), 'text/csv');
      logger.log(`Сохранено: ${name}`, 'ok');
    });

    // ---------------- Источник данных и синхронизация ----------------

    /** Перезагрузить данные из источника и обновить все окна. */
    const reload = async (source) => {
      if (!source) { logger.log('Источник недоступен', 'err'); return; }
      try {
        setState({ data: await ctx.loadData(source) });
        fillSelects();
        await renderPanes();
        if (state.queryFile) await loadQuery(state.queryFile);
      } catch (e) {
        logger.log(`Ошибка загрузки источника: ${e.message}`, 'err');
      }
    };

    $('source-select').addEventListener('change', (e) => {
      if (e.target.value === 'folder') { $('folder-input').click(); return; }
      reload(ctx.sources[e.target.value]());
    });
    $('folder-input').addEventListener('change', (e) => {
      if (e.target.files.length) reload(ctx.sources.folder(e.target.files));
    });
    $('reload').addEventListener('click', () => {
      const id = $('source-select').value;
      if (id === 'folder') $('folder-input').click(); // File-объекты — снимок, нужен повторный выбор папки
      else reload(state.data && state.data.source.id === id ? state.data.source : ctx.sources[id]());
    });

    // Автообновление: периодически перечитываем web/GitHub-источник
    let timer = null;
    $('auto-sync').addEventListener('change', (e) => {
      clearInterval(timer);
      if (e.target.checked) {
        const sec = Number($('auto-sync-sec').value) || 60;
        timer = setInterval(() => state.data && state.data.source.id !== 'folder' && reload(state.data.source), sec * 1000);
        logger.log(`Автообновление каждые ${sec} с`, 'info');
      }
    });

    // Экспорт data.js из текущего снимка (для запуска по file:// без сети)
    $('export-data').addEventListener('click', async () => {
      const d = state.data;
      if (!d) return;
      const dir = ctx.CONFIG.sparqlDir || 'SPARQL';
      const queries = await Promise.all(d.queryFiles.map(async (f) => [f, await d.source.read(dir, f)]));
      const bundle = {
        [ctx.CONFIG.notesDir || 'notes']: Object.fromEntries(d.noteFiles.map((f) => [f, d.notes.get(f).text])),
        [dir]: Object.fromEntries(queries)
      };
      downloadText('data.js', core.buildDataJs(bundle), 'text/javascript');
      logger.log('Сохранено: data.js — положите его в папку ver3', 'ok');
    });

    // Начальное значение списка «Источник»
    $('source-select').value = state.data ? state.data.source.id : 'folder';
    fillSelects();
    logger.log('=== Приложение готово (app.js) ===', 'ok');
  };

  root.MdldApp = Object.freeze({ run, renderView });

  // Связка частей: сначала инициализация, затем исполнение.
  root.MdldStart.start()
    .then(run)
    .catch((e) => {
      const el = document.getElementById('log');
      el.textContent += `✗ Критическая ошибка инициализации: ${e.message}\n`;
    });
})(window);
