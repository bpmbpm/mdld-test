## 1

## 📖 Исходный текст (нарратив)

> **Алиса** — вымышленный персонаж, используемый для демонстрации семантической разметки. Она проживает по адресу: улица Ленина, дом 10, город Москва, почтовый индекс 101000, страна Россия. В свободное время Алиса увлекается фотографией и шахматами.

---

## 1. MD-LD

```markdown
[ex] <tag:example.org,2026:>

# Алиса {=ex:alice .schema:Person schema:name}

Алиса — вымышленный персонаж, используемый для демонстрации семантической разметки.

## Адрес {+ex:alice-addr ?schema:address .schema:PostalAddress}

- [ул. Ленина, д. 10] {schema:streetAddress}
- [Москва] {schema:addressLocality}
- [101000] {schema:postalCode}
- [Россия] {schema:addressCountry}

## Увлечения

В свободное время Алиса увлекается:

- [фотография] {+ex:hobby-photo ?schema:knowsAbout .schema:Thing schema:name}
- [шахматы] {+ex:hobby-chess ?schema:knowsAbout .schema:Thing schema:name}
```

**Комментарий к аннотациям:**
- `[ex] <tag:example.org,2026:>` — объявление префикса.
- `{=ex:alice ...}` — задаёт текущий субъект `ex:alice` и его тип `schema:Person`, метка берётся из заголовка «Алиса».
- `{+ex:alice-addr ?schema:address ...}` — создаёт объект `ex:alice-addr`, связывает его с Алисой через `schema:address` и типизирует как `schema:PostalAddress`.
- `[ул. Ленина, д. 10] {schema:streetAddress}` — литеральное значение для предиката; текст в `[...]` становится объектом.
- `{+ex:hobby-photo ?schema:knowsAbout ...}` — создаёт узел увлечения и связывает его с Алисой через `schema:knowsAbout`.

---

## 2. RDF Turtle (без сокращения `a`)

```turtle
@prefix schema: <http://schema.org/> .
@prefix rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd:    <http://www.w3.org/2001/XMLSchema#> .
@prefix ex:     <tag:example.org,2026:> .

ex:alice rdf:type schema:Person ;
    schema:name "Алиса" ;
    schema:address ex:alice-addr ;
    schema:knowsAbout ex:hobby-photo , ex:hobby-chess .

ex:alice-addr rdf:type schema:PostalAddress ;
    schema:streetAddress "ул. Ленина, д. 10" ;
    schema:addressLocality "Москва" ;
    schema:postalCode "101000" ;
    schema:addressCountry "Россия" .

ex:hobby-photo rdf:type schema:Thing ;
    schema:name "фотография" .

ex:hobby-chess rdf:type schema:Thing ;
    schema:name "шахматы" .
```

**Отличия от предыдущего варианта:**
- Везде `rdf:type` вместо `a` — как вы просили.
- Убраны квадратные скобки из литералов (это была ошибка парсинга).
- Падежи приведены к именительному: «фотография», «шахматы».
- Все префиксы объявлены явно.

---

## 3. JSON-LD

```json
{
  "@context": {
    "schema": "http://schema.org/",
    "ex": "tag:example.org,2026:",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  },
  "@graph": [
    {
      "@id": "ex:alice",
      "@type": "schema:Person",
      "schema:name": "Алиса",
      "schema:address": { "@id": "ex:alice-addr" },
      "schema:knowsAbout": [
        { "@id": "ex:hobby-photo" },
        { "@id": "ex:hobby-chess" }
      ]
    },
    {
      "@id": "ex:alice-addr",
      "@type": "schema:PostalAddress",
      "schema:streetAddress": "ул. Ленина, д. 10",
      "schema:addressLocality": "Москва",
      "schema:postalCode": "101000",
      "schema:addressCountry": "Россия"
    },
    {
      "@id": "ex:hobby-photo",
      "@type": "schema:Thing",
      "schema:name": "фотография"
    },
    {
      "@id": "ex:hobby-chess",
      "@type": "schema:Thing",
      "schema:name": "шахматы"
    }
  ]
}
```

**Особенности JSON-LD:**
- `@context` — аналог `@prefix` в Turtle. Определяет префиксы.
- `@graph` — массив узлов графа.
- `@id` — субъект (IRI).
- `@type` — аналог `rdf:type`.
- Свойства (`schema:name`, `schema:address`) — предикаты.
- Ссылки на другие узлы: `{ "@id": "ex:alice-addr" }`.
- Литералы — просто строки.

---

## 📊 Сравнение трёх форматов

| Элемент | MD-LD | Turtle | JSON-LD |
|---|---|---|---|
| Объявление префикса | `[ex] <tag:example.org,2026:>` | `@prefix ex: <...> .` | `"@context": { "ex": "..." }` |
| Субъект | `{=ex:alice}` | `ex:alice` | `"@id": "ex:alice"` |
| Тип | `.schema:Person` | `rdf:type schema:Person` | `"@type": "schema:Person"` |
| Литерал | `[текст] {pred}` | `pred "текст"` | `"pred": "текст"` |
| Ссылка на узел | `{+IRI ?pred}` | `pred ex:IRI` | `"pred": { "@id": "ex:IRI" }` |
| Группировка | секции Markdown | `;` и `,` | вложенность объектов и массивов |

**Ссылки:**
- Schema.org Person — https://schema.org/Person
- Schema.org PostalAddress — https://schema.org/PostalAddress
- Turtle (W3C) — https://www.w3.org/TR/turtle/
- JSON-LD 1.1 (W3C) — https://www.w3.org/TR/json-ld11/
- MD-LD спецификация — https://github.com/davay42/mdld-parse/blob/HEAD/spec/index.md
