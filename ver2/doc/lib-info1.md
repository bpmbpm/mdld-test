## 1

## 🔍 Подробный разбор вызовов библиотек в коде

### 1. Импорт модулей (dynamic import)

```js
const m = await import('https://cdn.jsdelivr.net/npm/marked@latest/+esm');
marked = m.marked || m.default || m;
```
**Что делает:** динамически загружает ES-модуль по URL. `await` ждёт загрузки. Возвращает объект-пространство имён, из которого извлекается функция `marked`.
**Аргументы:** URL модуля.
**Возвращает:** Promise<Module>.

```js
const oxMod = await import('https://cdn.jsdelivr.net/npm/oxigraph@latest/web.js');
await oxMod.default();
```
**Что делает:** загружает WASM-сборку Oxigraph. `default()` — это init-функция, которая компилирует WebAssembly.
**Аргументы:** нет.
**Возвращает:** Promise<void> после инициализации WASM.

```js
mdldParse = await import('https://cdn.jsdelivr.net/npm/mdld-parse/+esm');
```
**Что делает:** загружает парсер MD-LD. В `mdld-parse` экспортируются `parse`, `generate`, `merge`.

### 2. Работа с манифестами

```js
const r = await fetch('./notes/manifest.json');
noteList = await r.json();
```
**fetch(URL):** возвращает Promise<Response>. `r.ok` — true при статусе 200–299.
**r.json():** парсит тело ответа как JSON. Возвращает Promise<Array>.

### 3. Парсинг MD-LD — ключевой вызов

```js
const result = mdldParse.parse({ text });
```
**Библиотека:** `mdld-parse`.
**Функция:** `parse(options)`.
**Аргументы:** `{ text: string }` — исходный MD-LD-текст.
**Возвращает:** объект с полями:
- `quads` — массив RDF/JS-квадов (совместимы с n3.js, Oxigraph)
- `primary` — основная метаинформация (subject, type, label, comment)
- `statements` — «повышенные» утверждения
- `origin` — отслеживание происхождения (какая аннотация породила какой квад)
- `md` — **очищенный Markdown без аннотаций** (это то, что мы рендерим через marked)

Именно `result.md` даёт «рендеринг с пропуском `{}`». Без этого поля пришлось бы вручную удалять аннотации.

### 4. Загрузка в Oxigraph Store

```js
const store = new oxigraph.Store();
for (const q of quads) store.add(q);
```
**new Store():** создаёт in-memory RDF-хранилище.
**store.add(quad):** добавляет один RDF/JS-квад.
**Аргументы:** объект квада (subject, predicate, object, graph).
**Возвращает:** void.
**store.size:** количество квадов (свойство).

### 5. Сериализация в Turtle через N3.Writer

```js
const writer = new N3.Writer({
  format: 'Turtle',
  prefixes: { schema: '...', rdfs: '...', ... }
});
for (const q of result.quads) writer.addQuad(q);
writer.end((err, out) => { ... });
```
**new N3.Writer(options):** создаёт сериализатор.
**addQuad(quad):** добавляет квад в буфер.
**end(callback):** завершает запись; callback получает `(error, turtleString)`.
**Аргументы `end`:** функция `(err, out) => {}`.
**Возвращает:** через callback — строку Turtle.

### 6. Рендеринг Markdown

```js
const html = marked.parse(cleanMd);
```
**marked.parse(markdown):** преобразует Markdown в HTML.
**Аргументы:** строка Markdown (в нашем случае — `result.md` без аннотаций).
**Возвращает:** строку HTML.

### 7. Выполнение SPARQL

```js
const results = store.query(currentSparql);
for (const binding of results) {
  for (const [k, v] of binding) { row[k] = v.value; }
}
```
**store.query(sparql):** выполняет SPARQL-запрос.
**Аргументы:** строка запроса.
**Возвращает:** итерируемый объект. Каждая итерация — `Map<string, Term>`.
**Term:** объект с `.value` (строковое значение), `.termType` (NamedNode/Literal/BlankNode), `.datatype`, `.language`.

## 💎 Итог

«Понимать MD-LD» = `mdld-parse.parse()` → получаете `quads` (RDF) и `md`. Первое идёт в граф, второе — в рендерер. Онлайн-сервис для **другой** спецификации MD-LD есть у ozekik (https://ozekik.github.io/markdown-ld/), но для `{...}`-синтаксиса `davay42` готового онлайн-плейграунда нет — его роль выполняет ваш `index.html`.

**Ссылки:**
- mdld-parse (npm) — https://www.npmjs.com/package/mdld-parse
- MD-LD спецификация — https://github.com/davay42/mdld-parse/blob/HEAD/spec/index.md
- Markdown-LD Playground (ozekik) — https://ozekik.github.io/markdown-ld/
- Oxigraph — https://www.npmjs.com/package/oxigraph
- marked — https://www.npmjs.com/package/marked
- N3.js — https://www.npmjs.com/package/n3
