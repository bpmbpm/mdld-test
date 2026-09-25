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
