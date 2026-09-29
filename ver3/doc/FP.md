# Переход к функциональному стилю: что и как заменено (ver2 → ver3)

Принцип «функциональное ядро, императивная оболочка»: вся логика преобразования данных вынесена в
чистые функции `js/core.js` (без DOM, сети, глобальных переменных; тестируются в Node.js), а работа с
DOM/сетью собрана в тонком слое `start.js`/`app.js`.

| # | ver2 (было) | ver3 (стало) | Где |
|---|-------------|--------------|-----|
| 1 | Глобальные `let mdldParse, oxigraph, marked, N3;` + 4 последовательных `try { await import } catch` | `loadLibraries()` возвращает объект `libs`; загрузка `Promise.all([...])` | start.js |
| 2 | Глобальные `let noteList = []; let sparqlList = []; let currentSparql` меняются в обработчиках | один неизменяемый `state` (`Object.freeze`), изменения через `setState({...state, ...patch})` | app.js |
| 3 | `for (const file of noteList) { … store.add … total += … }` | `noteFiles.map(async …)` + `Promise.all`, `filter(Boolean)`, `mergeQuads(lists)` | start.js |
| 4 | Ручная сборка таблицы `let html = …; for (row) { html += … }` | `tableToHtml({vars, rows})` — `map` + `join` | core.js |
| 5 | `const rows = []; const vars = new Set(); for (binding) { for ([k,v]) {…} rows.push }` | `bindingsToTable(results)` — `Object.fromEntries([...b].map(...))`, `flatMap` | core.js |
| 6 | `writer.end(callback)` с изменением DOM внутри колбэка | `quadsToTurtle(N3, quads)` → `Promise<string>` | core.js |
| 7 | `fmt`, `trace` писали прямо в DOM | `fmt`, `traceLine` — чистые, в DOM пишет только `logger` | core.js / start.js |
| 8 | Код получения данных дублировался (`fetch` в трёх местах) | единый интерфейс источника `{list, read}`: фабрики `webSource`, `githubSource`, `bundleSource`, `folderSource` | start.js |
| 9 | Три окна — три разных фрагмента кода | одно `renderView(libs, note, viewId)` + массив `PANES.map(renderPane)`; описания видов — данные `NOTE_VIEWS` | app.js / core.js |
| 10 | Изменяемые объекты | `Object.freeze` для констант, API модулей и снимков данных | все |

## Пример (п. 5)

ver2:
```js
const rows = []; const vars = new Set();
for (const binding of results) {
  const row = {};
  for (const [k, v] of binding) { row[k] = v.value; vars.add(k); }
  rows.push(row);
}
```
ver3:
```js
const rows = list.map((b) => Object.fromEntries([...b].map(([k, v]) => [k, v.value])));
const vars = [...new Set(rows.flatMap(Object.keys))];
```

## Пример (п. 2)

ver2: `currentSparql = await r.text();` — глобальная переменная.
ver3: `setState({ queryText: text })` — новый снимок, прежний не изменяется.

Чистота функций подтверждается тестами `tests/core.test.js` без моков DOM.
