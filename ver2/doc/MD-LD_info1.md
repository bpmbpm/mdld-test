## 1 MD-LD

### also
- https://github.com/bpmbpm/doc/blob/main/LD2/ZK/ver1/LD%E2%80%91Markdown_analysis2.md

Понимание MD-LD — это не только «рендеринг с пропуском `{}`», но именно **извлечение RDF-графа** из Markdown. Пропуск `{}` при отображении — это следствие: парсер отделяет семантику от текста. Инструменты, которые «понимают» MD-LD, делают две вещи: (1) парсят аннотации в RDF-квады, (2) отдают «чистый» Markdown для отображения.

## 🧰 Инструменты, работающие с MD-LD

| Инструмент | Язык | Что делает | Онлайн-доступ |
|---|---|---|---|
| **mdld-parse** | JS (npm) | `parse()`, `generate()`, `merge()`; работает в браузере и Node.js | через CDN (jsDelivr) |
| **mdld-py** | Python | порт спецификации MD-LD; парсинг, генерация, рендеринг в HTML+RDFa | нет |
| **markdownld** (ozekik) | JS (CLI/плагин) | компиляция Markdown-LD → Turtle / JSON-LD | **Playground: https://ozekik.github.io/markdown-ld/**  |
| **Markdown-LD Knowledge Bank** | .NET | Markdown → RDF/JSON-LD + SPARQL | нет |

**Важное различие:** `ozekik/markdown-ld` и `mdld-parse` (davay42) — это **разные спецификации** с похожими названиями. `ozekik` использует ссылочные ссылки и кодовые блоки, `davay42` — аннотации в `{...}`. В нашем коде используется **mdld-parse от davay42**.

Онлайн-площадка `ozekik` показывает, как «понимать» MD-LD: вы вводите Markdown-LD, а на выходе получаете Turtle/JSON-LD. Но это **другая** спецификация, не совместимая с `{...}` аннотациями `mdld-parse`.

## 2 ozekik/markdown-ld vs mdld-parse (davay42)

Это принципиально разные проекты, и их часто путают из-за схожих названий. Если кратко: **`ozekik/markdown-ld`** — это «литературное программирование» для Turtle, где RDF-термы прячутся в заголовках и инлайн-коде, а **`mdld-parse` (от davay42)** — это парсер для аннотаций в фигурных скобках `{...}`, встроенных прямо в текст.

Ниже — детальное сравнение.

### 📊 Сравнительная таблица

| Характеристика | `ozekik/markdown-ld` | `mdld-parse` (davay42) |
| :--- | :--- | :--- |
| **Название формата** | Markdown-LD | MD-LD (Markdown-Linked Data) |
| **Философия** | Literate programming для Turtle/TriG. Вы пишете документацию, а RDF-термы «спрятаны» в структуре заголовков и коде. | Написание графа знаний как обычного Markdown. Семантика — это неотъемлемая часть текста, а не отдельный слой. |
| **Синтаксис** | Использует **заголовки** (H1–H3) и **инлайн-код** (`` ` ``) для представления субъектов, предикатов и объектов. | Использует **аннотации в фигурных скобках** `{...}` для всех семантических элементов. |
| **Роль заголовков** | Заголовок H1 — имя графа, H2 — субъект, H3 — предикат. | Заголовок — это просто текст. Чтобы он стал субъектом, нужна аннотация `{=IRI ...}`. |
| **Представление триплета** | `# Граф` → `## Субъект` `` `<IRI>` `` → `### Предикат` `` `pred:` `` → `- Объект` | `[Текст] {предикат}` или `{=IRI .Тип label}` в любом месте текста. |
| **Читаемость** | Средняя. Требует понимания структуры заголовков как RDF-модели. | Высокая. Аннотации локальны, а без них текст остаётся чистым Markdown. |
| **Совместимость с GitHub** | Заголовки и код отображаются нормально, но без понимания семантики. | Аннотации `{...}` видны как обычный текст, но не мешают чтению. |
| **Инструменты** | Компилятор `markdownld` (CLI, плагин для `unified`/`remark`). Playground: https://ozekik.github.io/markdown-ld/ | Парсер `mdld-parse` (JS, npm) и его Python-порт `mdld-py`. Работает в браузере через CDN. |
| **Round-trip** | Нет (компиляция только в одну сторону: MD → Turtle/JSON-LD). | Есть (`parse` → quads, `generate` → MD-LD обратно). |
| **Ссылка** | https://github.com/ozekik/markdown-ld | https://github.com/davay42/mdld-parse |

### 🔍 Как они интерпретируют один и тот же текст

Возьмём простой факт: «Алиса знает Боба».

**Текст в `ozekik/markdown-ld`:**

```markdown
# Мой граф

## Алиса `<#Alice>`

### знает `foaf:knows`

- Боб `<#Bob>`
```

**Как это парсит `ozekik/markdown-ld`:**

1.  H1 `# Мой граф` — это имя графа.
2.  H2 `## Алиса` с инлайн-кодом `<#Alice>` — это **субъект** `<#Alice>`.
3.  H3 `### знает` с инлайн-кодом `foaf:knows` — это **предикат** `foaf:knows`.
4.  Элемент списка `- Боб` с инлайн-кодом `<#Bob>` — это **объект** `<#Bob>`.

**Результат в Turtle:** `<#Alice> foaf:knows <#Bob> .`

**Тот же факт в `mdld-parse` (davay42):**

```markdown
[ex] <tag:example.org,2026:>

# Алиса {=ex:alice .schema:Person schema:name}

[Боб] {+ex:bob ?schema:knows .schema:Person schema:name}
```

**Как это парсит `mdld-parse`:**

1.  `[ex] <tag:example.org,2026:>` — объявление префикса.
2.  `# Алиса {=ex:alice .schema:Person schema:name}` — заголовок H1 создаёт **субъект** `ex:alice` с типом `schema:Person` и меткой «Алиса».
3.  `[Боб] {+ex:bob ?schema:knows ...}` — аннотация создаёт **объект** `ex:bob` и связывает его с текущим субъектом через предикат `schema:knows`.

**Результат в Turtle:** `ex:alice schema:knows ex:bob .`

### 💎 Совместимость

Проекты **абсолютно несовместимы**. Синтаксис одного не будет понят парсером другого. Это два независимых стандарта с одинаковым названием «Markdown-LD»/«MD-LD».

**`ozekik/markdown-ld`** — это скорее инструмент для **публикации существующих RDF-данных** (например, словарей вроде FOAF) в читаемом виде. Он компилируется в Turtle, но не предполагает обратного преобразования.

**`mdld-parse` (davay42)** — это инструмент для **авторства новых графов знаний**. Он designed для работы с текстом, где семантика вплетена в повествование. Он поддерживает round-trip (MD-LD → RDF → MD-LD), что критично для редактирования.

### 🔗 Ссылки

- `ozekik/markdown-ld`: https://github.com/ozekik/markdown-ld
- Playground `ozekik/markdown-ld`: https://ozekik.github.io/markdown-ld/
- `mdld-parse` (davay42): https://github.com/davay42/mdld-parse
- Python-порт `mdld-py`: https://github.com/alan8373/mdld-py
- Спецификация MD-LD (davay42): https://raw.githubusercontent.com/alan8373/mdld-py/main/spec/Spec.md

## 2 MD-LD+

Помимо `ozekik/markdown-ld` и `mdld-parse`, существует еще несколько проектов, которые решают схожую задачу — добавление семантической разметки в Markdown. Я разделил их на три категории по способу работы с семантикой.

### 📊 Сводная таблица проектов семантической разметки Markdown

| Проект | Категория | Синтаксис / Подход | Что генерирует | Ключевая особенность |
|---|---|---|---|---|
| **mdld-parse** (davay42) | Встроенная (In-band) | Аннотации в фигурных скобках `{...}`, встроенные прямо в текст. Субъект задается через `{=IRI}`. | RDF-квады (совместимы с RDF/JS), «чистый» Markdown без аннотаций (`result.md`). | Round-trip (parse ↔ generate), потоковый парсер, zero-dependency, работает в браузере. |
| **ozekik/markdown-ld** | Встроенная (In-band) | «Literate programming» для Turtle. Субъект — заголовок H2, предикат — H3, объект — элемент списка. RDF-термы в инлайн-коде (`` ` ``). | Turtle (по умолчанию) или JSON-LD (через `@frogcat/ttl2jsonld`). | Компилятор на базе `unified`/`remark`, есть CLI и онлайн-playground. **Не поддерживает round-trip**. |
| **Vault-LD** | Встроенная (In-band) | YAML-LD frontmatter + общий `@context.jsonld` в корне vault. Проза в теле заметки не аннотируется. | RDF-граф (проекция frontmatter в триплеты). | **Round-trip с полной точностью**: RDF → vault → RDF. Онтология и заметка — «один и тот же объект». |
| **markdown-ld-kb** (lqdev) | Внешняя (Out-of-band) | Обычный Markdown с YAML frontmatter. Семантика извлекается **LLM-пайплайном** в CI (GitHub Models). | RDF/JSON-LD граф, статический сайт, serverless SPARQL-endpoint. | LLM сам извлекает сущности и связи из обычного текста. Поддерживает `/api/ask` для запросов на естественном языке. |
| **Markdown-LD Knowledge Bank** (managedcode) | Внешняя (Out-of-band) | Обычный Markdown / MDX / text с frontmatter. Извлечение фактов через `IChatClient` (LLM) или `Tiktoken` (детерминированно). | In-memory RDF-граф, SPARQL (read-only), SHACL-валидация, экспорт в Turtle/JSON-LD, диаграммы Mermaid/DOT. | .NET 10 библиотека. Есть режим `Tiktoken` — **без сети и LLM**, на основе токенов и структуры документа. |
| **vault-triplifier** | Внешняя (Out-of-band) | Markdown с Obsidian-синтаксисом (`::`, `[[...]]`). | RDF/Turtle. | Конвертирует как Markdown-файлы, так и Obsidian Canvas. Работает с существующими vault'ами. |
| **rdf-markdown-shacl** | Внешняя (Out-of-band) | Извлечение RDF из Markdown **на основе SHACL-шэйпов**. | RDF-триплеты. | SHACL-шэйпы задают, как именно парсить Markdown в RDF. Подход «schema-first». |
| **markdown-rdfa** (tetherless-world) | Встроенная (In-band) | Встраивание **RDFa Lite** прямо в Markdown (атрибуты в HTML-подобном синтаксисе). | HTML с RDFa-атрибутами. | Python-Markdown расширение. RDFa-триплеты извлекаются из готового HTML. |
| **mdx_semanticdata** | Встроенная (In-band) | Python-Markdown расширение для добавления **RDFa** в Markdown. | HTML с RDFa. | Аналогичен `markdown-rdfa`, но реализован как расширение `mdx`. |
| **lexify** | Встроенная (In-band) | Компактный формат definition lists в `.md` файлах. | HTML с RDFa + JSON-LD. | Конвертирует «lexicon»-файлы в HTML и JSON-LD, валидный по schema.org. |

### 💡 Что важно понимать

**Разница между «встроенной» и «внешней» семантикой**:

- **Встроенная (In-band)** — семантика находится **внутри** Markdown-файла. Читатель видит аннотации (или они скрыты за синтаксисом). Парсер извлекает RDF. Примеры: `mdld-parse`, `ozekik/markdown-ld`, Vault-LD.
- **Внешняя (Out-of-band)** — Markdown остается «чистым», а семантика извлекается **отдельным инструментом** (CI-пайплайн, LLM, SHACL-шэйпы). Примеры: `markdown-ld-kb`, `vault-triplifier`, `rdf-markdown-shacl`.

**Ключевой критерий выбора**:
- Если вы хотите **редактировать граф знаний вручную** и видеть семантику в тексте — берите встроенные форматы (`mdld-parse`, Vault-LD).
- Если вы хотите **писать обычный текст**, а семантику получать автоматически — берите внешние инструменты (`markdown-ld-kb`, `vault-triplifier`).

**Ссылки:**
- mdld-parse — https://www.npmjs.com/package/mdld-parse
- ozekik/markdown-ld — https://github.com/ozekik/markdown-ld
- Vault-LD — https://github.com/The-Knowledge-Graph-Guys/vault-ld
- markdown-ld-kb (lqdev) — https://github.com/lqdev/markdown-ld-kb
- Markdown-LD Knowledge Bank (managedcode) — https://github.com/managedcode/markdown-ld-kb
- vault-triplifier — https://www.npmjs.com/package/vault-triplifier
- rdf-markdown-shacl — https://packages.ecosyste.ms/registries/npmjs.org/packages/rdf-markdown-shacl
- markdown-rdfa — https://github.com/tetherless-world/markdown-rdfa
- mdx_semanticdata — https://pypi.org/project/mdx-semantic/
- lexify — https://cdn.jsdelivr.net/npm/lexify

## 3 In-band

Ниже — простые примеры для всех встроенных (in-band) форматов семантической разметки Markdown, которые мы обсуждали. Для каждого формата показан минимальный фрагмент, порождаемые RDF-триплеты и анализ преимуществ и недостатков.

---

## 1. MD-LD (`mdld-parse`, davay42)

**Пример (MD-LD):**

```markdown
[ex] <tag:example.org,2026:>

# Алиса {=ex:alice .schema:Person schema:name}

[Боб] {+ex:bob ?schema:knows .schema:Person schema:name}
```

**Что генерирует (Turtle):**

```turtle
ex:alice a schema:Person ;
    schema:name "Алиса" ;
    schema:knows ex:bob .

ex:bob a schema:Person ;
    schema:name "Боб" .
```

**Преимущества:**
- Аннотации `{...}` локальны и минимальны — без них текст остаётся чистым Markdown.
- Поддерживает round-trip: `parse()` извлекает quads, `generate()` восстанавливает MD-LD.
- Zero-dependency, работает в браузере и Node.js, ~15 КБ minified.
- Потоковый парсер: линейная сложность, без построения AST в памяти.

**Недостатки:**
- Фигурные скобки `{...}` видны в GitHub-рендеринге как обычный текст.
- Требует дисциплины: каждый триплет должен быть явно аннотирован.
- Меньшая экосистема, чем у RDFa или JSON-LD.

**Ссылка:** https://www.npmjs.com/package/mdld-parse

---

## 2. Markdown-LD (ozekik)

**Пример (Markdown-LD):**

```markdown
# Мой граф

`<http://example.com/>`

## Alice

`<#Alice>`

### Knows

`foaf:knows`

* Bob `<#Bob>`
```

**Что генерирует (Turtle):**

```turtle
<#Alice> foaf:knows <#Bob> .
```

**Преимущества:**
- «Literate programming» для Turtle: RDF-термы прячутся в заголовках и инлайн-коде.
- Компилируется в Turtle (по умолчанию) и JSON-LD через плагин `unified`/`remark`.
- Есть онлайн-playground для быстрого тестирования.

**Недостатки:**
- **Не поддерживает round-trip** — только MD → RDF, обратное преобразование невозможно.
- Синтаксис неочевиден: H2 — субъект, H3 — предикат, список — объект.
- Требует CLI (`markdownld`) или плагина для сборки.
- Последний коммит — 2024 год, проект менее активен.

**Ссылка:** https://github.com/ozekik/markdown-ld

---

## 3. Vault-LD

**Пример (Vault-LD):**

```markdown
---
"@context": "https://schema.org/"
"@id": "#hummus"
"@type": "Recipe"
name: "Hummus"
recipeIngredient:
  - "Chickpeas"
  - "Tahini"
---

# Hummus

Классический рецепт хумуса.
```

**Что генерирует (Turtle):**

```turtle
<#hummus> a schema:Recipe ;
    schema:name "Hummus" ;
    schema:recipeIngredient "Chickpeas", "Tahini" .
```

**Преимущества:**
- Frontmatter — привычный формат для Obsidian, Jekyll, Hugo.
- **Round-trip с полной точностью**: RDF → vault → RDF без потерь.
- Естественная интеграция с существующими онтологиями через `@context`.
- «Проза для людей и LLM, триплеты для машин».

**Недостатки:**
- Семантика сосредоточена **только в frontmatter** — тело заметки не аннотируется.
- Требуется общий `@context.jsonld` в корне vault.
- Относительно новый проект (2026), мало примеров в сообществе.

**Ссылка:** https://github.com/The-Knowledge-Graph-Guys/vault-ld

---

## 4. Markdown-RDFa (tetherless-world)

**Пример (Markdown + RDFa):**

```markdown
<div vocab="https://schema.org/" typeof="Person">
  <span property="name">Alice</span>
</div>
```

**Что генерирует (HTML + RDFa):**

```html
<div vocab="https://schema.org/" typeof="Person">
  <span property="name">Alice</span>
</div>
```

RDFa-триплеты извлекаются из готового HTML через `pyRdfa`.

**Преимущества:**
- Работает в HTML-рендеринге — RDFa-атрибуты видны в браузере.
- Не требует отдельного RDF-файла.
- Python-Markdown расширение, легко интегрируется в существующие пайплайны.

**Недостатки:**
- Привязан к HTML, не к Markdown — семантика «размазана» по тегам.
- Плохо переносится между системами (Obsidian, Logseq и т.д.).
- Последнее обновление — 5 лет назад.
- Требует `pyRdfa` для извлечения триплетов.

**Ссылка:** https://github.com/tetherless-world/markdown-rdfa

---

## 5. mdx_semanticdata (aleray)

**Пример (mdx_semanticdata):**

```markdown
%% property :: content | label %%
```

Согласно описанию, конструкция `%% property :: content | label %%` превращается в `<span>` с атрибутами `property` и `content`.

**Что генерирует (HTML + RDFa):**

```html
<span property="..." content="...">label</span>
```

**Преимущества:**
- Компактный синтаксис с `%%` — меньше визуального шума.
- Наследует все преимущества RDFa в HTML.

**Недостатки:**
- **Очень мало документации** — PyPI-страница содержит `UNKNOWN` вместо описания.
- Последнее обновление — 2012 год.
- Фактически не поддерживается сообществом.
- Проблемы интеграции с django-wiki из-за санитизации HTML.

**Ссылка:** https://pypi.org/project/mdx_semanticdata/

---

## 6. Lexify

**Пример (Lexify):**

```html
<dl>Baseball Pitching Terms
<dt><a href="https://authoritativeSource.com">Fastball</a>
<dd>A pitch thrown at or near maximum speed
<dt>Change Up
<dd>A pitch that mimics a fastball's mechanics, but is held deeper in the hand...
```

**Что генерирует (HTML + RDFa + JSON-LD):**

HTML с RDFa-разметкой и JSON-LD, валидный по schema.org.

**Преимущества:**
- Компактный формат definition lists — легко читается в GitHub.
- Генерирует **и** HTML+RDFa, **и** JSON-LD одновременно.
- Использует Mustache-шаблоны для кастомизации вывода.

**Недостатки:**
- **Очень узкая специализация** — только definition lists (глоссарии).
- Не подходит для произвольных заметок Zettelkasten.
- Требует подготовки `template/lexicon.mustache` вручную.
- Последняя версия — 1.0.5, проект не развивается.

**Ссылка:** https://github.com/dtex/lexify

---

## 📊 Сводная таблица

| Формат | Синтаксис | Что генерирует | Round-trip | Читаемость | Активность | Для Zettelkasten? |
|---|---|---|---|---|---|---|
| **MD-LD** (mdld-parse) | `{=IRI}`, `{+IRI ?pred}`, `[text]{pred}` | RDF/JS quads + чистый MD | ✅ Да | Высокая | 2025 | ✅ Да |
| **Markdown-LD** (ozekik) | Заголовки + инлайн-код `` ` `` | Turtle, JSON-LD | ❌ Нет | Средняя | 2024 | ⚠️ Ограниченно |
| **Vault-LD** | YAML-LD frontmatter + `@context` | RDF-граф из frontmatter | ✅ Да | Высокая | 2026 | ✅ Да |
| **Markdown-RDFa** | HTML-теги с RDFa-атрибутами | HTML + RDFa | ❌ Нет | Средняя | 2015 | ❌ Нет |
| **mdx_semanticdata** | `%% property :: content \| label %%` | HTML + RDFa | ❌ Нет | Средняя | 2012 | ❌ Нет |
| **Lexify** | Definition lists (`<dt>`/`<dd>`) | HTML + RDFa + JSON-LD | ❌ Нет | Высокая | 2019 | ❌ Только глоссарии |

---

## 💡 Вывод

Для семантического Zettelkasten на Markdown сегодня реально работают **два подхода**:

1. **MD-LD (mdld-parse)** — если нужна богатая семантика внутри текста, round-trip и работа в браузере.
2. **Vault-LD** — если вы уже используете YAML frontmatter в Obsidian и хотите добавить RDF без изменения синтаксиса тела заметки.

Остальные форматы (Markdown-RDFa, mdx_semanticdata, Lexify) либо устарели, либо слишком узкоспециализированы. **Markdown-LD (ozekik)** интересен как «literate programming для Turtle», но не поддерживает обратное преобразование и требует CLI.

**Ссылки:**
- MD-LD (mdld-parse) — https://www.npmjs.com/package/mdld-parse
- Markdown-LD (ozekik) — https://github.com/ozekik/markdown-ld
- Vault-LD — https://github.com/The-Knowledge-Graph-Guys/vault-ld
- Markdown-RDFa — https://github.com/tetherless-world/markdown-rdfa
- mdx_semanticdata — https://pypi.org/project/mdx_semanticdata/
- Lexify — https://github.com/dtex/lexify

## 3a
Для `3. Vault-LD` - где prefix?

Вы правы — в том примере Vault-LD не было объявления префиксов, потому что использовался **простой строковый `@context`**, который напрямую указывает на словарь Schema.org. В Vault-LD префиксы не объявляются через `@prefix`, как в Turtle — они задаются внутри **JSON-LD `@context`**, который может быть либо строкой (URL словаря), либо объектом с явными определениями префиксов.

### 🧩 Как Vault-LD работает с префиксами

Vault-LD использует YAML-LD frontmatter, а YAML-LD — это сериализация JSON-LD в YAML. Поэтому все правила JSON-LD применяются и здесь. Префиксы в JSON-LD определяются одним из двух способов:

1. **`@vocab`** — задаёт пространство имён по умолчанию для всех терминов без префикса. Если `@context` — строка `"https://schema.org/"`, то неявно используется `@vocab: "https://schema.org/"`, и все поля frontmatter (`name`, `author` и т.д.) автоматически разрешаются в `schema:name`, `schema:author`. Именно это и было в примере — префикс `schema:` просто не нужен, потому что Schema.org является словарём по умолчанию.

2. **Явные определения префиксов** — если нужно смешивать несколько словарей, `@context` становится объектом, где каждому префиксу сопоставляется его IRI:

```json
"@context": {
  "schema": "https://schema.org/",
  "ex": "https://example.org/vocab/",
  "foaf": "http://xmlns.com/foaf/0.1/"
}
```

После этого в frontmatter можно использовать компактные IRI:

```yaml
schema:name: "Алиса"
ex:employeeId: "A-001"
foaf:knows: "#bob"
```

### 📂 Пример Vault-LD с явными префиксами

**Файл `notes/alice.md`:**

```markdown
---
"@context":
  schema: "https://schema.org/"
  ex: "https://example.org/vocab/"
"@id": "#alice"
"@type": "schema:Person"
schema:name: "Алиса"
ex:employeeId: "A-001"
schema:knows:
  "@id": "#bob"
  "@type": "schema:Person"
  schema:name: "Боб"
---

# Алиса

Заметка о сотруднике.
```

**Что генерирует (Turtle):**

```turtle
<#alice> a schema:Person ;
    schema:name "Алиса" ;
    ex:employeeId "A-001" ;
    schema:knows <#bob> .

<#bob> a schema:Person ;
    schema:name "Боб" .
```

### 🏗️ «Составной контекст» на уровне vault

Vault-LD рекомендует хранить общий `@context` в корне vault в файле `context.jsonld`. Этот контекст **композируется** из контекстов отдельных онтологий — каждая онтология может приносить свои префиксы, а корневой контекст их объединяет. Это позволяет не дублировать определения в каждом `.md` файле: вы просто указываете `"@context": "./context.jsonld"`, а все префиксы уже доступны.

### 💎 Итог

В Vault-LD нет отдельного механизма `@prefix`, как в Turtle. Вместо этого используется **JSON-LD `@context`**, который может быть:
- **строкой** — тогда один словарь становится пространством имён по умолчанию (префиксы не нужны);
- **объектом** — тогда вы явно определяете префиксы для нескольких словарей;
- **ссылкой на общий `context.jsonld`** в корне vault — тогда префиксы композируются из онтологий.

В моём первом примере префикс отсутствовал именно потому, что использовался строковый `@context: "https://schema.org/"` — это эквивалент `@vocab`, при котором все термины автоматически получают префикс Schema.org.

**Ссылки:**
- Vault-LD (GitHub) — https://github.com/The-Knowledge-Graph-Guys/vault-ld
- Vault-LD (спецификация) — https://github.com/The-Knowledge-Graph-Guys/vault-ld/blob/main/SPEC.md
- Vault-LD Example vault — https://github.com/The-Knowledge-Graph-Guys/vault-ld/tree/main/Vault-LD%20Example
- YAML-LD спецификация — https://json-ld.github.io/yaml-ld/spec/
- JSON-LD 1.1 (W3C) — https://www.w3.org/TR/json-ld11/

## 3b

Вы правы, в предыдущем примере Turtle был неполным — без объявления префиксов и базового IRI. Это делает его синтаксически невалидным для парсеров. Разберём всё по порядку.

### 🧩 Что означает `<#alice>`

`<#alice>` — это **относительный IRI** (IRI reference) с фрагментом. В Turtle, как и в JSON-LD, относительные IRI разрешаются относительно **базового IRI**, заданного директивой `@base`. Если в документе указано:

```turtle
@base <https://example.org/notes/alice.md> .
```

то `<#alice>` превращается в `<https://example.org/notes/alice.md#alice>`. Если `@base` не задан, парсер использует IRI самого документа, что делает результат непредсказуемым.

В Vault-LD `@base` задаётся в `context.jsonld` и определяет пространство имён для субъектов. Без него `<#alice>` не имеет смысла.

### 📂 Законченный пример: от frontmatter к валидному Turtle

**Файл `notes/alice.md` (frontmatter):**

```yaml
---
"@context": "./context.jsonld"
"@id": "#alice"
"@type": "schema:Person"
schema:name: "Алиса"
schema:knows:
  "@id": "#bob"
  "@type": "schema:Person"
  schema:name: "Боб"
---
```

**Файл `context.jsonld` (в корне vault):**

```json
{
  "@context": {
    "@base": "https://example.org/notes/alice.md",
    "schema": "https://schema.org/",
    "type": "@type",
    "id": "@id"
  }
}
```

**Итоговый Turtle (после экспорта):**

```turtle
@base <https://example.org/notes/alice.md> .
@prefix schema: <https://schema.org/> .

<#alice> a schema:Person ;
    schema:name "Алиса" ;
    schema:knows <#bob> .

<#bob> a schema:Person ;
    schema:name "Боб" .
```

**Почему это валидно:**
- `@base` задаёт базовый IRI, относительно которого разрешаются `<#alice>` и `<#bob>`.
- `@prefix schema:` объявляет префикс для `https://schema.org/`.
- Все триплеты завершаются точкой, субъекты и предикаты корректны.

### 🔍 Как это получается из Vault-LD

В Vault-LD префиксы определяются в `context.jsonld`, а не в самом Markdown-файле. Спецификация (§4.2) описывает **композицию контекстов**: корневой `context.jsonld` содержит общие префиксы (`owl`, `rdfs`, `skos`, `xsd`, `sdo`), а каждый онтологический контекст добавляет свои термины. Когда Vault-LD-инструмент экспортирует граф в Turtle, он **обязан** преобразовать эти определения в директивы `@prefix` и `@base`.

Пример из официального репозитория Vault-LD показывает именно такую структуру: корневой `context.jsonld` объявляет `@base: "https://example.org/"` и префиксы, а онтологический контекст (например, Culinary) добавляет `@base: "https://example.org/culinary#"` и свои термины. При экспорте в Turtle это даёт:

```turtle
@prefix cul: <https://example.org/culinary#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@base <https://example.org/> .

<https://example.org/hummus> a cul:Recipe ;
    cul:requiresIngredient <https://example.org/Chickpeas> ;
    cul:prepTimeMinutes "25"^^xsd:integer .
```

Здесь `<https://example.org/hummus>` — это IRI, «отчеканенный» из имени файла `hummus.md` по правилу §4.5: `@base` + имя файла без `.md`.

### 💎 Итог

Без `@prefix` и `@base` Turtle-фрагмент не является валидным RDF-документом. `<#alice>` — это сокращение, которое работает только при наличии `@base`. В Vault-LD префиксы и базовые IRI определяются в `context.jsonld`, а экспортер в Turtle обязан их материализовать.

**Ссылки:**
- Vault-LD (GitHub) — https://github.com/The-Knowledge-Graph-Guys/vault-ld
- Vault-LD SPEC.md — https://github.com/The-Knowledge-Graph-Guys/vault-ld/blob/main/SPEC.md
- Vault-LD Example (context.jsonld) — https://github.com/The-Knowledge-Graph-Guys/vault-ld/blob/main/Vault-LD%20Example/context.jsonld
- Turtle (W3C) — https://www.w3.org/TR/turtle/
- JSON-LD 1.1 @base — https://www.w3.org/TR/json-ld11/#base-iri
  
