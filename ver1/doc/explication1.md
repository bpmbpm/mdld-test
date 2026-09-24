## 1


## 🔍 «отрендеренный»

**Рендеринг** (rendering) — это процесс превращения исходного текста в **визуальное представление**. В контексте Markdown это означает: взять «сырой» текст с разметкой и показать его так, как он должен выглядеть для читателя.

Например, исходный Markdown:

```
# Заголовок
**жирный** текст
```

после рендеринга выглядит как:

> **Заголовок**
> **жирный** текст

В моём `index.html` используется библиотека `marked`, которая выполняет рендеринг в браузере. Она берёт Markdown-текст и превращает его в HTML (`<h1>Заголовок</h1>`, `<strong>жирный</strong>`). Затем этот HTML вставляется в страницу — и вы видите «отрендеренный» результат.

**Ключевой момент:** в моём коде я специально использую **`result.md`** — это «чистый» Markdown, из которого `mdld-parse` **удалил все аннотации `{...}`**. Поэтому в окне «Markdown (отрендеренный)» вы видите:

> **Семантический Zettelkasten**

Без `{=note1 .schema:CreativeWork name}`, потому что эти аннотации были извлечены как RDF и отправлены в правую панель (Turtle).

Если бы я использовал **исходный текст** (`text`), а не `result.md`, то в окне Markdown были бы видны все фигурные скобки — но тогда это был бы уже не «рендеринг», а просто отображение исходника.

## 🖥️ Где такие редакторы

«Рендеринг» Markdown выполняется везде, где вы видите отформатированный текст:

| Место | Как рендерится | Что с `{...}` |
|---|---|---|
| **GitHub** | Через `commonmark` / `cmark-gfm` | Показывает как обычный текст — `{...}` видны |
| **Obsidian** | Через встроенный движок | Показывает как обычный текст — `{...}` видны |
| **VS Code (Preview)** | Через `markdown-it` | Показывает как обычный текст — `{...}` видны |
| **Jekyll / Hugo** | Через `kramdown` / `goldmark` | Показывает как обычный текст — `{...}` видны |
| **Мой `index.html`** | Через `marked` + `result.md` из `mdld-parse` | **Скрывает `{...}`**, потому что использует очищенный Markdown |

**Важное уточнение:** GitHub, Obsidian, VS Code и другие стандартные рендереры **не знают** про MD-LD. Для них `{=note1 .schema:CreativeWork name}` — это просто текст в фигурных скобках, и они покажут его как есть. MD-LD — это **расширение**, которое понимает только `mdld-parse`.

Именно поэтому в моём `index.html` используется `result.md` — это даёт «двойной выигрыш»:
1. **Markdown-панель** показывает чистый текст без аннотаций (как если бы их не было).
2. **RDF-панель** показывает извлечённые из этих аннотаций триплеты.

## 🤔 Что делать, если вы хотите видеть `{...}` на GitHub

Если вам нужно, чтобы GitHub **тоже** показывал аннотации (или скрывал их), есть несколько вариантов:

1. **Оставить как есть** — GitHub покажет `{...}` как обычный текст. Это не ошибка, а ожидаемое поведение. Читатель увидит их, но они не помешают восприятию.

2. **Спрятать в HTML-комментарии** — если аннотации не должны быть видны на GitHub, их можно завернуть в `<!-- ... -->`, но тогда `mdld-parse` их не увидит (он работает с текстом, а не с HTML). Этот путь не подходит для MD-LD.

3. **Использовать `<span>` с CSS** — можно обернуть аннотации в `<span class="mdld-annotation">`, но GitHub всё равно отрендерит их как текст (CSS на GitHub ограничен).

4. **Смириться** — MD-LD по своей философии «прозрачен»: аннотации видны, но минимальны. Это цена за то, что они остаются частью Markdown-файла.

## 💎 Итог

- **«Отрендеренный»** = Markdown, преобразованный в визуальное представление (HTML). В моём коде используется `marked` + очищенный `result.md`, поэтому аннотации `{...}` не видны.
- **GitHub показывает `{...}`** как обычный текст, потому что он не знает про MD-LD. Это нормально и ожидаемо.
- **Редакторы, которые «понимают» MD-LD**, — это только те, которые используют парсер `mdld-parse` (например, мой `index.html`, Obsidian с плагином, или собственные приложения).

Если вы хотите, чтобы на GitHub аннотации были скрыты, можно добавить в `index.html` переключатель: показывать «чистый» Markdown (`result.md`) или исходный (`text`). Это даст вам контроль над тем, что видит читатель.

## 🔗 Ссылки

- mdld-parse (свойство `result.md`) — https://www.npmjs.com/package/mdld-parse
- marked (рендеринг Markdown) — https://www.npmjs.com/package/marked
- MD-LD спецификация — https://github.com/davay42/mdld-parse/blob/HEAD/spec/index.md

## 1a

Ниже — обновлённый `index.html` с тремя панелями, расширенными заметками и детальным трассированием вызовов библиотек.

## 📋 Что изменилось

| Изменение | Детали |
|---|---|
| **Третья панель** | «Markdown (raw)» — исходный текст с аннотациями `{...}` |
| **Трассировка** | Лог показывает `библиотека.функция(аргументы) → результат` для каждого вызова |
| **Разделы в заметках** | Заголовки H2/H3 имеют явные IRI через `{+IRI ?schema:hasPart ...}` |
| **Подсветка лога** | Разные цвета для info / ok / trace / warn / err |

## 📁 `notes/note1.md` (расширенная)

```markdown
[ex] <tag:example.org,2026:>

# Семантический Zettelkasten {=ex:note1 .schema:CreativeWork schema:name}

Вводная заметка о построении Zettelkasten на RDF.

## Определение {+ex:note1-sec1 ?schema:hasPart .schema:SectionHead schema:name}

Zettelkasten — это метод управления знаниями, при котором каждая заметка
атомарна и связана с другими.

### История {+ex:note1-sec1-1 ?schema:hasPart .schema:SectionHead schema:name}

Метод предложен социологом Никласом Луманом.

### Принципы {+ex:note1-sec1-2 ?schema:hasPart .schema:SectionHead schema:name}

- Атомарность
- Автономность
- Связность

## RDF и знания {+ex:note1-sec2 ?schema:hasPart .schema:SectionHead schema:name}

Использование RDF позволяет превратить Zettelkasten в граф знаний.

### Преимущества {+ex:note1-sec2-1 ?schema:hasPart .schema:SectionHead schema:name}

Связность данных и возможность SPARQL-запросов.

[Alice] {schema:author}
[2026-04-10] {schema:dateCreated}
```

**Что создают IRI:** каждый заголовок с `{+IRI ?schema:hasPart ...}` порождает новый субъект (`ex:note1-sec1`), связывает его с родителем (`ex:note1 schema:hasPart ex:note1-sec1`) и присваивает тип `schema:SectionHead` и метку из текста заголовка.

## 📁 `notes/note2.md` (расширенная)

```markdown
[ex] <tag:example.org,2026:>

# SPARQL в браузере {=ex:note2 .schema:CreativeWork schema:name}

Как выполнять SPARQL-запросы без сервера.

## Oxigraph WASM {+ex:note2-sec1 ?schema:hasPart .schema:SectionHead schema:name}

Oxigraph компилируется в WebAssembly и работает прямо в браузере.

### Установка {+ex:note2-sec1-1 ?schema:hasPart .schema:SectionHead schema:name}

Загрузка через CDN: `https://cdn.jsdelivr.net/npm/oxigraph@latest/web.js`.

### Использование {+ex:note2-sec1-2 ?schema:hasPart .schema:SectionHead schema:name}

Создание Store, загрузка триплетов, выполнение запросов.

## MD-LD {+ex:note2-sec2 ?schema:hasPart .schema:SectionHead schema:name}

MD-LD добавляет семантику в Markdown через аннотации в `{...}`.

### Синтаксис {+ex:note2-sec2-1 ?schema:hasPart .schema:SectionHead schema:name}

- `{=IRI}` — новый субъект
- `{+IRI}` — новый объект
- `{?pred}` — объектный предикат
- `{pred}` — литеральный предикат

[Bob] {schema:author}
[2026-04-11] {schema:dateCreated}
```

## 📄 `index.html` (полный файл)

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MD-LD Semantic Zettelkasten</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 1800px;
      margin: 0 auto;
      padding: 1rem;
      background: #f5f5f5;
      color: #2c3e50;
    }
    h1 { color: #2c3e50; }
    h2 { color: #34495e; border-bottom: 2px solid #3498db; padding-bottom: 0.3rem; }
    section {
      background: white;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    select, button {
      padding: 0.5rem;
      font-size: 1rem;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
    select { min-width: 340px; }
    button {
      background: #3498db;
      color: white;
      border: none;
      cursor: pointer;
      margin-left: 0.5rem;
    }
    button:hover:not(:disabled) { background: #2980b9; }
    button:disabled { background: #95a5a6; cursor: not-allowed; }

    /* Три панели */
    .panel-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
      margin-top: 1rem;
    }
    @media (max-width: 1200px) {
      .panel-3 { grid-template-columns: 1fr; }
    }
    .panel-3 > div {
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 1rem;
      background: #fafafa;
      max-height: 600px;
      overflow: auto;
    }
    .panel-3 h3 {
      margin-top: 0;
      color: #7f8c8d;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .panel-3 .raw-md {
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      white-space: pre-wrap;
      word-break: break-word;
      line-height: 1.5;
      background: #fdfdfd;
      color: #2c3e50;
      margin: 0;
    }
    pre {
      background: #2c3e50;
      color: #ecf0f1;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 0.85rem;
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
    }
    #log {
      background: #1a1a1a;
      color: #0f0;
      font-family: 'Courier New', monospace;
      font-size: 0.8rem;
      max-height: 340px;
      overflow-y: auto;
      padding: 1rem;
      border-radius: 4px;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .markdown-view :is(h1,h2,h3) { margin-top: 0.5rem; }
    .markdown-view pre { background: #ecf0f1; color: #2c3e50; }
    .sparql-result table {
      border-collapse: collapse;
      width: 100%;
      font-size: 0.9rem;
    }
    .sparql-result th, .sparql-result td {
      border: 1px solid #ddd;
      padding: 0.4rem 0.6rem;
      text-align: left;
    }
    .sparql-result th { background: #ecf0f1; }
    .hint { color: #7f8c8d; font-size: 0.9rem; }
  </style>
</head>
<body>
  <h1>📚 MD-LD Semantic Zettelkasten</h1>
  <p class="hint">
    Три представления каждой заметки: исходный Markdown с аннотациями, отрендеренный Markdown,
    RDF-граф в Turtle. Плюс SPARQL-консоль и подробный лог вызовов библиотек.
  </p>

  <section>
    <h2>1. Заметки</h2>
    <label for="note-select">Выберите заметку:</label>
    <select id="note-select">
      <option value="">— загрузка списка заметок —</option>
    </select>
    <div class="panel-3">
      <div>
        <h3>Markdown (raw, с аннотациями)</h3>
        <pre id="note-raw" class="raw-md"><em>Заметка не выбрана</em></pre>
      </div>
      <div>
        <h3>Markdown (отрендеренный)</h3>
        <div id="note-markdown" class="markdown-view"><em>Заметка не выбрана</em></div>
      </div>
      <div>
        <h3>RDF (Turtle)</h3>
        <pre id="note-rdf"><em>—</em></pre>
      </div>
    </div>
  </section>

  <section>
    <h2>2. SPARQL-запросы</h2>
    <label for="sparql-select">Выберите запрос:</label>
    <select id="sparql-select">
      <option value="">— загрузка списка запросов —</option>
    </select>
    <button id="run-sparql" disabled>Выполнить</button>
    <div class="panel-3" style="grid-template-columns: 1fr 1fr;">
      <div>
        <h3>Код запроса</h3>
        <pre id="sparql-code"><em>—</em></pre>
      </div>
      <div>
        <h3>Результат</h3>
        <div id="sparql-result" class="sparql-result"><em>—</em></div>
      </div>
    </div>
  </section>

  <section>
    <h2>3. Лог выполнения</h2>
    <div id="log"></div>
  </section>

  <script type="module">
    // ============================================================
    // Логирование с трассировкой вызовов
    // ============================================================
    const logEl = document.getElementById('log');
    const COLORS = {
      info:  '#7fdbff',   // голубой
      ok:    '#2ecc71',   // зелёный
      trace: '#9b59b6',   // фиолетовый — вызовы библиотек
      warn:  '#f39c12',   // оранжевый
      err:   '#e74c3c'    // красный
    };
    const PREFIX = { info: 'ℹ', ok: '✓', trace: '📞', warn: '⚠', err: '✗' };

    function log(msg, type = 'info') {
      const time = new Date().toLocaleTimeString('ru-RU');
      const span = document.createElement('span');
      span.style.color = COLORS[type] || '#0f0';
      span.textContent = `[${time}] ${PREFIX[type] || '·'} ${msg}\n`;
      logEl.appendChild(span);
      logEl.scrollTop = logEl.scrollHeight;
    }

    // Краткое форматирование значения для лога
    function fmt(v) {
      if (v === null) return 'null';
      if (v === undefined) return 'undefined';
      if (typeof v === 'string') {
        const s = v.replace(/\s+/g, ' ');
        return `"${s.length > 60 ? s.slice(0, 60) + '…' : s}"`;
      }
      if (typeof v === 'number' || typeof v === 'boolean') return String(v);
      if (Array.isArray(v)) return `[${v.length} items]`;
      if (v instanceof Map) return `Map(${v.size})`;
      if (typeof v === 'object') {
        if (typeof v.size === 'number') return `{size: ${v.size}}`;
        const keys = Object.keys(v);
        return `{${keys.slice(0, 4).join(', ')}${keys.length > 4 ? ', …' : ''}}`;
      }
      return String(v);
    }

    // Трассировка вызова: library.function(args) → result
    function trace(lib, fn, args, result, type = 'trace') {
      const argsStr = Array.isArray(args) ? args.map(fmt).join(', ') : fmt(args);
      log(`${lib}.${fn}(${argsStr}) → ${fmt(result)}`, type);
    }

    log('=== Запуск приложения ===', 'info');

    // ============================================================
    // Загрузка библиотек
    // ============================================================
    let mdldParse, oxigraph, marked, N3;

    try {
      log('Загрузка mdld-parse…', 'info');
      const t0 = performance.now();
      mdldParse = await import('https://cdn.jsdelivr.net/npm/mdld-parse/+esm');
      log(`mdld-parse загружен за ${(performance.now()-t0).toFixed(0)} мс. Экспорты: ${Object.keys(mdldParse).join(', ')}`, 'ok');
    } catch (e) { log(`Ошибка mdld-parse: ${e.message}`, 'err'); }

    try {
      log('Загрузка oxigraph WASM…', 'info');
      const t0 = performance.now();
      const oxMod = await import('https://cdn.jsdelivr.net/npm/oxigraph@latest/web.js');
      trace('oxigraph', 'default()', 'init WASM', 'Promise', 'trace');
      await oxMod.default();
      oxigraph = oxMod;
      log(`oxigraph инициализирован за ${(performance.now()-t0).toFixed(0)} мс. Экспорты: ${Object.keys(oxMod).join(', ')}`, 'ok');
    } catch (e) { log(`Ошибка oxigraph: ${e.message}`, 'err'); }

    try {
      log('Загрузка marked…', 'info');
      const t0 = performance.now();
      const m = await import('https://cdn.jsdelivr.net/npm/marked@latest/+esm');
      marked = m.marked || m.default || m;
      log(`marked загружен за ${(performance.now()-t0).toFixed(0)} мс`, 'ok');
    } catch (e) { log(`Ошибка marked: ${e.message}`, 'err'); }

    try {
      log('Загрузка n3…', 'info');
      const t0 = performance.now();
      N3 = await import('https://cdn.jsdelivr.net/npm/n3@latest/+esm');
      log(`n3 загружен за ${(performance.now()-t0).toFixed(0)} мс. Экспорты: ${Object.keys(N3).slice(0,6).join(', ')}…`, 'ok');
    } catch (e) { log(`Ошибка n3: ${e.message}`, 'err'); }

    // ============================================================
    // Хранилище
    // ============================================================
    const store = new oxigraph.Store();
    trace('oxigraph', 'new Store()', [], store, 'trace');
    log('Создан пустой Oxigraph Store', 'ok');

    // ============================================================
    // Манифесты
    // ============================================================
    const noteSelect = document.getElementById('note-select');
    const sparqlSelect = document.getElementById('sparql-select');
    let noteList = [];
    let sparqlList = [];

    try {
      log('Загрузка манифеста заметок…', 'info');
      const r = await fetch('./notes/manifest.json');
      trace('fetch', 'fetch', ['./notes/manifest.json'], `Response ${r.status}`, 'trace');
      noteList = await r.json();
      log(`Получено ${noteList.length} заметок: ${noteList.join(', ')}`, 'ok');
      noteSelect.innerHTML = '<option value="">— выберите заметку —</option>' +
        noteList.map(f => `<option value="${f}">${f}</option>`).join('');
    } catch (e) {
      log(`Ошибка манифеста заметок: ${e.message}`, 'err');
      noteSelect.innerHTML = '<option value="">— ошибка —</option>';
    }

    try {
      log('Загрузка манифеста SPARQL…', 'info');
      const r = await fetch('./SPARQL/manifest.json');
      trace('fetch', 'fetch', ['./SPARQL/manifest.json'], `Response ${r.status}`, 'trace');
      sparqlList = await r.json();
      log(`Получено ${sparqlList.length} запросов: ${sparqlList.join(', ')}`, 'ok');
      sparqlSelect.innerHTML = '<option value="">— выберите запрос —</option>' +
        sparqlList.map(f => `<option value="${f}">${f}</option>`).join('');
    } catch (e) {
      log(`Ошибка манифеста SPARQL: ${e.message}`, 'err');
      sparqlSelect.innerHTML = '<option value="">— ошибка —</option>';
    }

    // ============================================================
    // Загрузка всех заметок в RDF-граф
    // ============================================================
    async function loadAllNotes() {
      log('=== Загрузка всех заметок в RDF-граф ===', 'info');
      let total = 0;
      for (const file of noteList) {
        try {
          log(`— ${file} —`, 'info');
          const r = await fetch(`./notes/${file}`);
          trace('fetch', 'fetch', [`./notes/${file}`], `Response ${r.status}`, 'trace');
          const text = await r.text();
          log(`  Получено ${text.length} байт`, 'info');

          const result = mdldParse.parse({ text });
          trace('mdldParse', 'parse', [{text: `{${text.length} chars}`}], {quads: result.quads?.length, md: `{${result.md?.length} chars}`}, 'trace');

          const quads = result.quads || [];
          log(`  Извлечено ${quads.length} RDF-триплетов`, 'ok');

          for (const q of quads) store.add(q);
          trace('store', 'add', [`${quads.length} quads`], {size: store.size}, 'trace');
          total += quads.length;
        } catch (e) {
          log(`  Ошибка ${file}: ${e.message}`, 'err');
        }
      }
      log(`RDF-граф готов: ${store.size} триплетов из ${noteList.length} заметок`, 'ok');
    }

    if (noteList.length > 0 && mdldParse) await loadAllNotes();

    // ============================================================
    // Обработчик выбора заметки
    // ============================================================
    noteSelect.addEventListener('change', async () => {
      const file = noteSelect.value;
      if (!file) return;

      log(`=== Выбрана заметка: ${file} ===`, 'info');
      const rawEl = document.getElementById('note-raw');
      const mdEl = document.getElementById('note-markdown');
      const rdfEl = document.getElementById('note-rdf');
      rawEl.textContent = '…'; mdEl.innerHTML = '<em>Загрузка…</em>'; rdfEl.textContent = '…';

      try {
        const r = await fetch(`./notes/${file}`);
        trace('fetch', 'fetch', [`./notes/${file}`], `Response ${r.status}`, 'trace');
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const text = await r.text();
        log(`Получено ${text.length} байт`, 'info');

        // 1. Raw Markdown — как есть
        rawEl.textContent = text;
        log('Raw Markdown отображён (с аннотациями)', 'ok');

        // 2. Парсинг MD-LD
        const result = mdldParse.parse({ text });
        trace('mdldParse', 'parse', [{text: `{${text.length} chars}`}], {quads: result.quads?.length, md: `{${result.md?.length} chars}`}, 'trace');

        // 3. Отрендеренный Markdown
        const cleanMd = result.md || text;
        const html = marked.parse(cleanMd);
        trace('marked', 'parse', [`{${cleanMd.length} chars}`], `{${html.length} chars HTML}`, 'trace');
        mdEl.innerHTML = html;
        log('Markdown отрендерен через marked', 'ok');

        // 4. RDF → Turtle
        const writer = new N3.Writer({
          format: 'Turtle',
          prefixes: {
            schema: 'http://schema.org/',
            rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
            rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
            xsd: 'http://www.w3.org/2001/XMLSchema#'
          }
        });
        for (const q of result.quads || []) writer.addQuad(q);
        trace('N3.Writer', 'addQuad', [`${result.quads?.length} quads`], 'void', 'trace');

        writer.end((err, out) => {
          if (err) {
            log(`Ошибка сериализации: ${err.message}`, 'err');
            rdfEl.textContent = String(err);
          } else {
            trace('N3.Writer', 'end', [], `{${out.length} chars Turtle}`, 'trace');
            rdfEl.textContent = out;
            log(`Turtle готов: ${out.length} байт`, 'ok');
          }
        });
      } catch (e) {
        log(`Ошибка: ${e.message}`, 'err');
        mdEl.innerHTML = `<span style="color:red">Ошибка: ${e.message}</span>`;
      }
    });

    // ============================================================
    // SPARQL
    // ============================================================
    const runBtn = document.getElementById('run-sparql');
    const sparqlCodeEl = document.getElementById('sparql-code');
    const sparqlResultEl = document.getElementById('sparql-result');
    let currentSparql = '';

    sparqlSelect.addEventListener('change', async () => {
      const file = sparqlSelect.value;
      if (!file) { runBtn.disabled = true; return; }
      log(`=== Выбран SPARQL: ${file} ===`, 'info');
      sparqlCodeEl.textContent = 'Загрузка…';
      try {
        const r = await fetch(`./SPARQL/${file}`);
        trace('fetch', 'fetch', [`./SPARQL/${file}`], `Response ${r.status}`, 'trace');
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        currentSparql = await r.text();
        sparqlCodeEl.textContent = currentSparql;
        runBtn.disabled = false;
        log(`SPARQL загружен: ${currentSparql.length} байт`, 'ok');
      } catch (e) {
        log(`Ошибка: ${e.message}`, 'err');
        sparqlCodeEl.textContent = `Ошибка: ${e.message}`;
        runBtn.disabled = true;
      }
    });

    runBtn.addEventListener('click', () => {
      if (!currentSparql) return;
      log('Выполнение SPARQL…', 'info');
      const t0 = performance.now();
      try {
        const results = store.query(currentSparql);
        const rows = []; const vars = new Set();
        for (const binding of results) {
          const row = {};
          for (const [k, v] of binding) { row[k] = v.value; vars.add(k); }
          rows.push(row);
        }
        const dt = (performance.now() - t0).toFixed(1);
        trace('store', 'query', [`{${currentSparql.length} chars}`], `{${rows.length} rows, vars: [${[...vars].join(', ')}]}`, 'trace');
        log(`SPARQL вернул ${rows.length} строк за ${dt} мс`, 'ok');

        if (rows.length === 0) { sparqlResultEl.innerHTML = '<em>Нет результатов</em>'; return; }

        const varArr = [...vars];
        let html = '<table><thead><tr>';
        for (const v of varArr) html += `<th>${v}</th>`;
        html += '</tr></thead><tbody>';
        for (const row of rows) {
          html += '<tr>';
          for (const v of varArr) {
            const val = String(row[v] ?? '');
            html += `<td>${val.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</td>`;
          }
          html += '</tr>';
        }
        html += '</tbody></table>';
        sparqlResultEl.innerHTML = html;
      } catch (e) {
        log(`Ошибка SPARQL: ${e.message}`, 'err');
        sparqlResultEl.innerHTML = `<span style="color:red">Ошибка: ${e.message}</span>`;
      }
    });

    log('=== Приложение готово ===', 'ok');
  </script>
</body>
</html>
```

## 📊 Что показывает трассировка

Каждый вызов библиотеки теперь логируется в формате `библиотека.функция(аргументы) → результат`:

```
[12:34:56] 📞 fetch.fetch("./notes/note1.md") → Response 200
[12:34:56] 📞 mdldParse.parse({text: "{1234 chars}"}) → {quads: 12, md: "{890 chars}"}
[12:34:56] 📞 store.add("12 quads") → {size: 12}
[12:34:56] 📞 marked.parse("{890 chars}") → "{2100 chars HTML}"
[12:34:56] 📞 N3.Writer.addQuad("12 quads") → void
[12:34:56] 📞 N3.Writer.end() → "{1560 chars Turtle}"
[12:34:56] 📞 store.query("{120 chars}") → {3 rows, vars: [s, p, o]}
```

**Цвета в логе:**
- 🔵 `info` — общие сообщения
- 🟢 `ok` — успешные завершения
- 🟣 `trace` — вызовы библиотек (📞)
- 🟠 `warn` — предупреждения
- 🔴 `err` — ошибки

## 🧩 Ответы на вопросы

**Почему заголовки становятся субъектами?** В MD-LD нет «автоматического» создания субъектов для заголовков. Каждый заголовок с `{+IRI ?schema:hasPart ...}` явно объявляет новый объект и связывает его с родительским субъектом. Без аннотации заголовок — просто текст Markdown.

**Получают ли разделы IRI?** Да, если вы их явно указали. В примере `ex:note1-sec1`, `ex:note1-sec1-1` — это полноценные IRI, которые становятся субъектами в RDF-графе. Они связаны с родителем через `schema:hasPart`.

**Где видны `{...}` на GitHub?** Всегда — GitHub не знает про MD-LD. Но в нашем приложении третья панель («Markdown raw») показывает их специально, чтобы вы видели исходный текст.

## 🔗 Ссылки

- mdld-parse — https://www.npmjs.com/package/mdld-parse
- Oxigraph — https://www.npmjs.com/package/oxigraph
- marked — https://www.npmjs.com/package/marked
- N3.js — https://www.npmjs.com/package/n3
- MD-LD спецификация — https://github.com/davay42/mdld-parse/blob/HEAD/spec/index.md
