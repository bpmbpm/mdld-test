## 1
Поясни, в окно RDF (Turtle) выводится ответ из какой функции? Какие настройки передачи параметров в эту функцию (полный перечень), 
например, в окно вывод полного <tag:example.org,2026:dist-alice-bob> можно ли через prefix и можно ли комбинированной записью - когда в триплете используются ; и ,

Разберём по порядку: какая функция выводит Turtle, какие у неё параметры, как добавить свой префикс для `tag:example.org,2026:` и как N3.Writer автоматически использует `;` и `,`.

## 🔍 Какая функция выводит Turtle

В окно **RDF (Turtle)** пишет результат вызов **`writer.end(callback)`** из библиотеки **N3.js**. Цепочка вызовов такая:

```js
const writer = new N3.Writer({ format: 'Turtle', prefixes: {...} });  // 1. создание
for (const q of result.quads) writer.addQuad(q);                       // 2. накопление квадов
writer.end((err, out) => { rdfEl.textContent = out; });                // 3. сериализация
```

Именно `writer.end()` возвращает готовую строку Turtle в параметр `out` callback-функции. До вызова `end()` никакой сериализации не происходит — квады просто буферизуются.

## 📋 Полный перечень параметров `new N3.Writer(options)`

N3.Writer принимает объект опций. Вот полный список:

| Параметр | Тип | Назначение | По умолчанию |
|---|---|---|---|
| `format` | string | Формат вывода: `'Turtle'`, `'TriG'`, `'N-Triples'`, `'N-Quads'`, `'N3'` | `'Turtle'` |
| `prefixes` | object | Карта префиксов: `{ ex: 'http://example.org/' }` | `{}` |
| `baseIRI` | string | Базовый IRI для относительных ссылок (`@base`) | `undefined` |
| `blankNodePrefix` | string | Префикс для blank nodes (`_:b0` → `_:myb0`) | `'b'` |
| `lists` | boolean | Использовать синтаксис списков `( ... )` для `rdf:first`/`rdf:rest` | `true` |
| `literalTypes` | boolean | Писать datatype для литералов (`"25"^^xsd:integer`) | `true` |
| `subject` | function | Кастомная сериализация субъекта | — |
| `predicate` | function | Кастомная сериализация предиката | — |
| `object` | function | Кастомная сериализация объекта | — |
| `graph` | function | Кастомная сериализация графа (для TriG/N-Quads) | — |

Методы writer'а:

| Метод | Аргументы | Что делает |
|---|---|---|
| `addQuad(quad)` | RDF/JS Quad | Добавляет готовый квад |
| `addQuad(s, p, o, g)` | 4 терма | Добавляет квад из четырёх термов |
| `addQuads(quads)` | массив Quad | Добавляет массив квадов |
| `end(callback)` | `(error, result) => {}` | Завершает и возвращает строку |
| `end()` | — | Возвращает Promise<string> (если callback не передан) |

## 🏷️ Как добавить свой префикс для `tag:example.org,2026:`

Сейчас в вашем `index.html` в `prefixes` перечислены только `schema`, `rdfs`, `rdf`, `xsd`. Поэтому IRI `tag:example.org,2026:dist-alice-bob` выводится **полностью** в угловых скобках. Чтобы он выводился как `ex:dist-alice-bob`, добавьте в `prefixes` строку:

```js
const writer = new N3.Writer({
  format: 'Turtle',
  prefixes: {
    schema: 'http://schema.org/',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    xsd: 'http://www.w3.org/2001/XMLSchema#',
    ex: 'tag:example.org,2026:'        // ← добавили
  }
});
```

После этого в Turtle-выводе появится:

```turtle
@prefix ex: <tag:example.org,2026:> .
```

И все IRI с этим префиксом сократятся: `<tag:example.org,2026:dist-alice-bob>` → `ex:dist-alice-bob`.

**Важно:** префикс должен совпадать с тем, что объявлен в MD-LD через `[ex] <tag:example.org,2026:>`. Иначе N3.Writer не сможет сократить IRI, и выведет его полностью.

## ✂️ Автоматическое использование `;` и `,`

N3.Writer **автоматически группирует** триплеты:
- **Одинаковый субъект** → объединяет предикаты через `;`
- **Одинаковый субъект + предикат** → объединяет объекты через `,`
- **`rdf:type`** → заменяет на `a`

Никаких настроек для этого не нужно — это поведение по умолчанию. Пример: если у вас в графе такие триплеты:

```turtle
ex:alice a schema:Person .
ex:alice schema:name "Алиса" .
ex:alice schema:knows ex:bob .
ex:alice schema:knows ex:carol .
```

N3.Writer выведет их **сгруппированно**:

```turtle
ex:alice a schema:Person ;
    schema:name "Алиса" ;
    schema:knows ex:bob, ex:carol .
```

Это не «ручная» комбинированная запись — это результат оптимизации вывода. N3.Writer сам решает, где поставить `;` и `,`, чтобы минимизировать повторение субъекта и предиката.

## 🧪 Пример до и после добавления префикса

**До (текущий код, без `ex`):**

```turtle
<tag:example.org,2026:alice> a <http://schema.org/Person> ;
    <http://schema.org/name> "Алиса" ;
    <http://schema.org:knows> <tag:example.org,2026:bob> .
```

**После (с добавленным `ex:` и `schema:`):**

```turtle
@prefix ex: <tag:example.org,2026:> .
@prefix schema: <http://schema.org/> .

ex:alice a schema:Person ;
    schema:name "Алиса" ;
    schema:knows ex:bob .
```

Разница огромная: 1) появился `@prefix ex:`, 2) все IRI сократились, 3) `a` вместо полного `rdf:type`, 4) автоматическая группировка через `;`.

## 💎 Итог

| Вопрос | Ответ |
|---|---|
| Какая функция выводит Turtle? | `writer.end(callback)` из N3.js |
| Полный список опций? | См. таблицу выше: `format`, `prefixes`, `baseIRI`, `blankNodePrefix`, `lists`, `literalTypes`, `subject`, `predicate`, `object`, `graph` |
| Можно ли сократить `tag:example.org,2026:`? | Да, добавив `ex: 'tag:example.org,2026:'` в `prefixes` |
| Можно ли использовать `;` и `,`? | Да, N3.Writer делает это **автоматически** — настройки не нужны |

**Ссылки:**
- N3.js (GitHub) — https://github.com/rdfjs/N3.js
- N3.Writer API (документация) — https://github.com/rdfjs/N3.js/blob/main/README.md#writing
- RDF/JS Quad specification — https://rdf.js.org/data-model-spec/
- Turtle (W3C) — https://www.w3.org/TR/turtle/

## 1.1
Давайте разберём всё по порядку: сначала детально восстановим алгоритм работы вашего приложения и все вызовы внешних функций, а затем ответим на ключевой вопрос — можно ли запретить сокращения в N3.Writer.

---

## 🧭 Алгоритм работы приложения (пошагово)

Ваш `index.html` работает по следующему сценарию:

### Этап 1. Инициализация (при загрузке страницы)

1. **Импорт библиотек через CDN** (`await import(...)`):
   - `mdld-parse` — парсер MD-LD;
   - `oxigraph/web.js` — WASM-сборка RDF-хранилища;
   - `marked` — рендеринг Markdown в HTML;
   - `n3` — сериализация RDF в Turtle.

2. **Инициализация Oxigraph WASM**: вызов `oxMod.default()` компилирует WebAssembly.

3. **Создание пустого RDF-хранилища**: `new oxigraph.Store()`.

4. **Загрузка манифестов** (`fetch`):
   - `notes/manifest.json` — список заметок;
   - `SPARQL/manifest.json` — список запросов.

5. **Заполнение выпадающих списков** (`<select>`) на основе манифестов.

6. **Загрузка всех заметок в RDF-граф** (фоновая операция):
   - для каждого `.md` файла: `fetch` → `mdldParse.parse({ text })` → `store.add(quad)` для каждого квада.

### Этап 2. Работа с заметкой (при выборе в списке)

1. `fetch('./notes/<file>')` — загрузка исходного MD-LD.
2. Отображение **raw Markdown** (как есть, с аннотациями `{...}`).
3. `mdldParse.parse({ text })` — извлечение RDF-квадов и «чистого» Markdown (`result.md`).
4. `marked.parse(cleanMd)` — рендеринг очищенного Markdown в HTML.
5. Создание `N3.Writer` с префиксами.
6. `writer.addQuad(quad)` для каждого квада.
7. `writer.end(callback)` — получение строки Turtle и вывод в панель.

### Этап 3. Работа с SPARQL (при выборе запроса)

1. `fetch('./SPARQL/<file>')` — загрузка текста запроса.
2. Отображение кода запроса.
3. По кнопке **Выполнить**: `store.query(sparql)` → итерация по `binding` → построение HTML-таблицы.

### Этап 4. Логирование

Все ключевые вызовы обёрнуты в функцию `log()` и `trace()`, которые пишут в `<div id="log">`.

---

## 📞 Детальный разбор вызовов внешних функций

| № | Библиотека | Функция / метод | Аргументы | Возвращает | Где в коде |
|---|---|---|---|---|---|
| 1 | `mdld-parse` | `parse(options)` | `{ text: string }` | `{ quads: Quad[], md: string, primary, statements, origin }` | после fetch заметки |
| 2 | `oxigraph` | `new Store()` | — | объект Store | при инициализации |
| 3 | `oxigraph` | `store.add(quad)` | `Quad` | `void` | в цикле по quads |
| 4 | `oxigraph` | `store.size` | — | `number` | для лога |
| 5 | `oxigraph` | `store.query(sparql)` | `string` | итерируемый объект `Binding[]` | при выполнении SPARQL |
| 6 | `marked` | `marked.parse(md)` | `string` | `string` (HTML) | после parse MD-LD |
| 7 | `n3` | `new N3.Writer(options)` | `{ format, prefixes }` | объект Writer | перед сериализацией |
| 8 | `n3` | `writer.addQuad(quad)` | `Quad` | `void` | в цикле по quads |
| 9 | `n3` | `writer.end(callback)` | `(err, out) => void` | через callback: `string` (Turtle) | после addQuad |
| 10 | `fetch` | `fetch(url)` | `string` (URL) | `Promise<Response>` | для манифестов, заметок, SPARQL |
| 11 | `fetch` | `response.json()` | — | `Promise<any>` | для манифестов |
| 12 | `fetch` | `response.text()` | — | `Promise<string>` | для заметок и SPARQL |

**Важно:** `writer.end()` — единственная функция, которая **возвращает** готовую строку Turtle. До её вызова сериализация не происходит, квады только буферизуются.

---

## 🚫 Можно ли запретить сокращения (`;`, `,`, `a`) в N3.Writer?

**Краткий ответ: в N3.Writer нет прямой опции для этого.** Однако есть три обходных пути.

### Путь 1. Использовать формат `N-Triples` вместо `Turtle`

N-Triples по спецификации **не поддерживает** ни префиксы, ни сокращения `;`/`,`, ни `a` вместо `rdf:type`. Каждый триплет пишется в отдельной строке полностью.

```js
const writer = new N3.Writer({ format: 'N-Triples' });
```

Пример вывода:
```
<tag:example.org,2026:alice> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/Person> .
<tag:example.org,2026:alice> <http://schema.org/name> "Алиса" .
```

**Плюсы:** гарантированно полная запись без сокращений.
**Минусы:** теряются префиксы — IRI пишутся целиком; нет группировки; формат менее читаем для человека.

### Путь 2. Использовать `rdflib.js` с флагом `'p'`

Библиотека `rdflib.js` (не путать с N3.js) предоставляет флаги сериализации. Флаг `'p'` **полностью отключает сокращение префиксов** — все термы пишутся как `<...>` IRI.

```js
import { graph, serialize, sym } from 'rdflib';
const turtle = serialize(doc, kb, doc.value, 'text/turtle', undefined, { flags: 'p' });
```

Однако `rdflib.js` не является заменой Oxigraph — это отдельная библиотека с собственным store. Интеграция потребует переписывания логики.

### Путь 3. Ручная сериализация квадов

Самый надёжный способ — писать Turtle вручную, обходя N3.Writer. Вы просто итерируетесь по `result.quads` и формируете строки:

```js
function quadsToFullTurtle(quads, prefixes = {}) {
  let out = '';
  // Префиксы (опционально)
  for (const [p, iri] of Object.entries(prefixes)) {
    out += `@prefix ${p}: <${iri}> .\n`;
  }
  out += '\n';
  // Каждый квад — отдельная строка
  for (const q of quads) {
    const s = formatTerm(q.subject);
    const p = formatTerm(q.predicate);
    const o = formatTerm(q.object);
    out += `${s} ${p} ${o} .\n`;
  }
  return out;
}

function formatTerm(term) {
  if (term.termType === 'NamedNode') return `<${term.value}>`;
  if (term.termType === 'Literal') {
    let s = `"${term.value}"`;
    if (term.language) s += `@${term.language}`;
    else if (term.datatype && term.datatype.value !== 'http://www.w3.org/2001/XMLSchema#string') {
      s += `^^<${term.datatype.value}>`;
    }
    return s;
  }
  if (term.termType === 'BlankNode') return `_:${term.value}`;
  return String(term.value);
}
```

**Плюсы:** полный контроль; никаких сокращений.
**Минусы:** нужно вручную обрабатывать все типы термов; нет автоматической группировки.

---

## 📊 Сравнение вариантов

| Вариант | Сокращения `;`/`,` | `rdf:type` → `a` | Префиксы | Сложность |
|---|---|---|---|---|
| **N3.Writer (Turtle)** | ✅ Автоматически | ✅ Автоматически | ✅ Есть | Низкая |
| **N3.Writer (N-Triples)** | ❌ Нет | ❌ Нет | ❌ Нет | Низкая |
| **rdflib.js (flags: 'p')** | Зависит от флагов | Зависит от флагов | ❌ Отключены | Средняя |
| **Ручная сериализация** | ❌ Нет | ❌ Нет | ✅ Можно | Высокая |

---

## 💎 Итог

**Для запрета сокращений в N3.Writer прямой опции нет.** Самый простой путь — переключиться на `format: 'N-Triples'`, который по определению не использует сокращений. Если нужны префиксы, но без `;`/`,`/`a` — придётся писать сериализатор вручную или использовать `rdflib.js` с флагом `'p'`.

**Ссылки:**
- N3.js (Writing) — https://github.com/rdfjs/N3.js#writing
- N-Triples (W3C) — https://www.w3.org/TR/n-triples/
- rdflib.js (serializer flags) — https://github.com/linkeddata/rdflib.js
- Turtle (W3C) — https://www.w3.org/TR/turtle/
