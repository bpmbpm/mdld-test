## 1
Из рассмотренных форматов и инструментов полную поддержку TriG и квадов (named graphs) обеспечивают **mdld-parse** и связанный с ним **mdld-convert**. Vault-LD использует квады концептуально, но не сериализует их в TriG. Остальные инструменты работают либо с триплетами, либо только планируют поддержку TriG.

## 📊 Поддержка TriG / квадов

| Инструмент | Квады (RDF/JS) | TriG (сериализация) | Named graph при парсинге |
|---|---|---|---|
| **mdld-parse** | ✅ Да, `result.quads` | ❌ Нет (нужен `mdld-convert`) | ✅ Да, опция `graph` |
| **mdld-convert** | ✅ Да, `returnQuads: true` | ✅ Да, `to: 'trig'` | ✅ Да, через `from: 'trig'` |
| **Vault-LD** | Концептуально (JSON-LD) | ❌ Нет | ⚠️ Через `@id` в frontmatter |
| **ozekik/markdown-ld** | ❌ Нет (только триплеты) | ❌ В todo: «Make TriG default» | ❌ Нет |
| **Yurtle (yurtle-rdflib)** | ✅ Через RDFlib | ✅ Через RDFlib (`.trig`) | ✅ Через `graph.parse(format="trig")` |
| **Markdown-LD Knowledge Bank** | ✅ Через .NET RDF | ✅ `.trig` в списке форматов | ✅ Через загрузку `.trig` |

## 🧩 Подход 1: Один TriG на каждый Markdown-файл

Идея: каждый `.md` файл — отдельный именованный граф, а имя файла становится IRI графа.

**Пример с `mdld-parse` + `mdld-convert`:**

```javascript
import { parse } from 'mdld-parse';
import { convert } from 'mdld-convert';

const filePath = 'notes/alice.md';
const graphIRI = `https://example.org/notes/${filePath}`;

// Парсим MD-LD, явно указывая graph IRI
const result = parse({
  text: mdldText,
  graph: graphIRI  // ← именованный граф
});

// result.quads — массив Quad с q.graph.value === graphIRI
console.log(result.quads[0].graph.value); // https://example.org/notes/notes/alice.md

// Сериализуем в TriG
const trig = await convert({
  input: result.quads,
  from: 'quads',
  to: 'trig'
});
```

**Результат в TriG:**

```trig
@prefix schema: <https://schema.org/> .

<https://example.org/notes/notes/alice.md> {
  <#alice> a schema:Person ;
      schema:name "Алиса" ;
      schema:knows <#bob> .
}

<https://example.org/notes/notes/bob.md> {
  <#bob> a schema:Person ;
      schema:name "Боб" .
}
```

**Преимущества:**
- Каждый файл изолирован — можно удалять/добавлять заметки без пересборки всего графа.
- Имя файла — стабильный IRI, не зависящий от содержимого.
- Легко отслеживать происхождение (provenance) каждого триплета.

**Недостатки:**
- IRI графа привязан к пути файла — при перемещении заметки меняется.
- Нужен отдельный шаг конвертации в TriG (`mdld-convert`).

## 🧩 Подход 2: Группировка по онтологии (Vault-LD)

Vault-LD не сериализует в TriG напрямую, но его модель **концептуально соответствует** именованным графам. В `context.jsonld` можно задать `@base` для каждого домена, а в frontmatter — `@id` для сущностей.

**Пример:**

```yaml
# notes/culinary/hummus.md
---
"@context": "../../context.jsonld"
"@id": "cul:hummus"
"@type": "cul:Recipe"
cul:prepTimeMinutes: 25
---
```

**Концептуальный TriG (после экспорта через внешний инструмент):**

```trig
@prefix cul: <https://example.org/culinary#> .

<https://example.org/culinary> {
  cul:hummus a cul:Recipe ;
      cul:prepTimeMinutes 25 .
}
```

**Преимущества:**
- Frontmatter — привычный формат для Obsidian.
- Round-trip с полной точностью (RDF → vault → RDF).

**Недостатки:**
- Нет встроенного экспорта в TriG — требуется внешний конвертер.
- Семантика только в frontmatter, тело заметки не аннотируется.

## 🧩 Подход 3: Yurtle (Turtle/YAML frontmatter)

Yurtle — это формат, где каждый `.md` файл содержит Turtle-блок, который RDFlib может парсить как **отдельный граф**.

**Пример `notes/task.md`:**

```markdown
@prefix yurtle: <https://yurtle.dev/schema/> .
@prefix pm: <https://yurtle.dev/pm/> .

<urn:task:F-048> a yurtle:WorkItem ;
    pm:status "in-progress" ;
    pm:priority 2 ;
    yurtle:title "Production Hardening" .

# F-048: Production Hardening

Human-readable content here...
```

**Загрузка в RDFlib с указанием графа:**

```python
from rdflib import Graph, URIRef

g = Graph()
g.parse("notes/task.md", format="yurtle", publicID=URIRef("urn:graph:task"))
# Теперь g — именованный граф, содержащий триплеты из task.md

# Сериализация в TriG
g.serialize("graph.trig", format="trig")
```

**Преимущества:**
- RDFlib поддерживает TriG «из коробки».
- `YurtleStore` обеспечивает двунаправленную синхронизацию графа и файловой системы.
- Каждый файл — одновременно документ и узел графа.

**Недостатки:**
- Turtle-блоки не читаются человеком без знания RDF.
- Требует Python и RDFlib.

## 🧩 Подход 4: Markdown-LD Knowledge Bank (.NET)

Эта библиотека загружает и сохраняет RDF в форматах TriG и N-Quads, а также генерирует документные IRI из путей файлов.

**Из документации:**
> Document identity is resolved in this order: `CanonicalUri`, the file path normalized deterministically: `content/notes/rdf.md` becomes a stable document IRI, the generated inline document path.

**Пример:**

```csharp
var pipeline = new MarkdownKnowledgePipeline(
    new Uri("https://kb.example/"),
    extractionMode: MarkdownKnowledgeExtractionMode.Tiktoken
);
var result = await pipeline.BuildAsync(documents);
// result.Graph можно сохранить в TriG
```

**Преимущества:**
- Поддержка TriG и N-Quads «из коробки».
- Детерминированные IRI из путей файлов.
- Два режима извлечения: `Tiktoken` (без LLM) и `IChatClient` (LLM).

**Недостатки:**
- .NET 10 — не работает в браузере.
- Требует C#-разработки.

## 💎 Итог

Для подхода «один Markdown-файл = один TriG-граф» лучше всего подходят **mdld-parse + mdld-convert**: первый парсит MD-LD с указанием `graph` IRI, второй сериализует в TriG. Если вы работаете в Python — **Yurtle + RDFlib** даёт ту же возможность через `format="trig"`. Vault-LD концептуально поддерживает именованные графы, но не имеет встроенного экспорта в TriG.

**Ссылки:**
- mdld-parse (npm) — https://www.npmjs.com/package/mdld-parse
- mdld-convert (npm) — https://www.npmjs.com/package/mdld-convert
- mdld-py (Python API, опция `graph`) — https://raw.githubusercontent.com/alan8373/mdld-py/refs/heads/main/docs/API.md
- Yurtle (PyPI) — https://pypi.org/project/yurtle-rdflib/
- Markdown-LD Knowledge Bank (.NET) — https://github.com/managedcode/markdown-ld-kb
- TriG (W3C) — https://www.w3.org/TR/trig/
