## 1

Ниже — два новых файла с богатой семантикой и пояснениями, какие триплеты порождает каждая аннотация.

Текст в ````markdown`
## 📁 `notes/note1.md` — Персоны: Алиса и Боб

```markdown
[ex] <tag:example.org,2026:>

# Алиса {=ex:alice .schema:Person schema:name}

Алиса — вымышленная персона для тестирования семантической разметки MD-LD.

## Адрес Алисы {+ex:alice-addr ?schema:address .schema:PostalAddress schema:name}

- [ул. Ленина, д. 10] {schema:streetAddress}
- [Москва] {schema:addressLocality}
- [101000] {schema:postalCode}
- [Россия] {schema:addressCountry}

## Увлечения Алисы

Алиса увлекается [фотографией] {+ex:alice-hobby-photo ?schema:knowsAbout .schema:Thing schema:name}
и [шахматами] {+ex:alice-hobby-chess ?schema:knowsAbout .schema:Thing schema:name}.

# Боб {=ex:bob .schema:Person schema:name}

Боб — второй вымышленный персона.

## Адрес Боба {+ex:bob-addr ?schema:address .schema:PostalAddress schema:name}

- [ул. Пушкина, д. 25] {schema:streetAddress}
- [Химки] {schema:addressLocality}
- [141400] {schema:postalCode}
- [Россия] {schema:addressCountry}

## Увлечения Боба

Боб увлекается [велоспортом] {+ex:bob-hobby-bike ?schema:knowsAbout .schema:Thing schema:name}
и [программированием] {+ex:bob-hobby-code ?schema:knowsAbout .schema:Thing schema:name}.
```

### 🔍 Что генерирует этот файл

| Аннотация | Порождённые триплеты |
|---|---|
| `{=ex:alice .schema:Person schema:name}` | `ex:alice a schema:Person .`<br>`ex:alice schema:name "Алиса"` |
| `{+ex:alice-addr ?schema:address ...}` | `ex:alice schema:address ex:alice-addr .`<br>`ex:alice-addr a schema:PostalAddress`<br>`ex:alice-addr schema:name "Адрес Алисы"` |
| `[ул. Ленина, д. 10] {schema:streetAddress}` | `ex:alice-addr schema:streetAddress "ул. Ленина, д. 10"` |
| `[Москва] {schema:addressLocality}` | `ex:alice-addr schema:addressLocality "Москва"` |
| `[фотографией] {+ex:alice-hobby-photo ?schema:knowsAbout ...}` | `ex:alice schema:knowsAbout ex:alice-hobby-photo .`<br>`ex:alice-hobby-photo a schema:Thing`<br>`ex:alice-hobby-photo schema:name "фотографией"` |

Итого: **2 персоны**, **2 адреса** (по 4 поля), **4 увлечения** — примерно **30 триплетов**.

## 📁 `notes/note2.md` — Связи: расстояние и организация

```markdown
[ex] <tag:example.org,2026:>

# Расстояние между Алисой и Бобом {=ex:dist-alice-bob .ex:Distance schema:name}

Алиса и Боб живут друг от друга на расстоянии 11 километров.

[11] {schema:value}
[km] {schema:unitText}

## От кого {+ex:alice ?ex:from .schema:Person schema:name}

[Алиса] {schema:name}

## К кому {+ex:bob ?ex:to .schema:Person schema:name}

[Боб] {schema:name}

# Организация {=ex:org-example .schema:Organization schema:name}

[Example Corp] {schema:name}
[IT-компания] {schema:description}

# Место работы Алисы {=ex:alice .schema:Person schema:name}

Алиса работает в [Example Corp] {+ex:org-example ?schema:worksFor}.

# Место работы Боба {=ex:bob .schema:Person schema:name}

Боб работает в [Example Corp] {+ex:org-example ?schema:worksFor}.
```

### 🔍 Что генерирует этот файл

| Аннотация | Порождённые триплеты |
|---|---|
| `{=ex:dist-alice-bob .ex:Distance schema:name}` | `ex:dist-alice-bob a ex:Distance .`<br>`ex:dist-alice-bob schema:name "Расстояние между Алисой и Бобом"` |
| `[11] {schema:value}` | `ex:dist-alice-bob schema:value "11"` |
| `[km] {schema:unitText}` | `ex:dist-alice-bob schema:unitText "km"` |
| `{+ex:alice ?ex:from ...}` | `ex:dist-alice-bob ex:from ex:alice .`<br>`ex:alice a schema:Person`<br>`ex:alice schema:name "От кого"` |
| `[Алиса] {schema:name}` | `ex:alice schema:name "Алиса"` |
| `{+ex:bob ?ex:to ...}` | `ex:dist-alice-bob ex:to ex:bob .`<br>`ex:bob a schema:Person`<br>`ex:bob schema:name "К кому"` |
| `[Боб] {schema:name}` | `ex:bob schema:name "Боб"` |
| `{=ex:org-example .schema:Organization schema:name}` | `ex:org-example a schema:Organization .`<br>`ex:org-example schema:name "Организация"` |
| `[Example Corp] {schema:name}` | `ex:org-example schema:name "Example Corp"` |
| `[IT-компания] {schema:description}` | `ex:org-example schema:description "IT-компания"` |
| `{+ex:org-example ?schema:worksFor}` | `ex:alice schema:worksFor ex:org-example .`<br>`ex:bob schema:worksFor ex:org-example .` |

Итого: **1 расстояние** (значение + единица + от/к), **1 организация**, **2 связи worksFor** — примерно **20 триплетов**.

## 🧩 Пояснение синтаксиса

- `{=IRI ...}` — **переключает текущий субъект**. Все последующие аннотации до следующего `{=IRI}` относятся к нему.
- `{+IRI ?predicate ...}` — **создаёт объект** `IRI` и связывает его с текущим субъектом через `predicate`. Тип объекта задаётся через `.ClassName`.
- `{predicate}` — создаёт триплет с **литералом**: текст в `[...]` становится объектом.
- `.schema:Person` — задаёт тип (`rdf:type`) для создаваемого объекта.
- `schema:name` (без фигурных скобок перед ним) — забирает текст заголовка раздела как значение этого свойства.

## 🧪 Как проверить в приложении

1. Замените `notes/note1.md` и `notes/note2.md` на содержимое выше.
2. Убедитесь, что в `notes/manifest.json` указаны оба файла:
   ```json
   ["note1.md", "note2.md"]
   ```
3. Откройте приложение, выберите `note1.md` — в правой панели увидите ~30 триплетов.
4. Выберите `note2.md` — увидите ~20 триплетов, включая `ex:dist-alice-bob` с полями `from`/`to`/`value`/`unitText`.

## 🔍 Полезные SPARQL-запросы для проверки

Добавьте в `SPARQL/` файлы:

**`04-persons.rq`**
```sparql
PREFIX schema: <http://schema.org/>
SELECT ?person ?name WHERE {
  ?person a schema:Person ;
          schema:name ?name .
}
```

**`05-hobbies.rq`**
```sparql
PREFIX schema: <http://schema.org/>
SELECT ?person ?hobby WHERE {
  ?person schema:knowsAbout ?hobby .
  ?hobby schema:name ?hobbyName .
}
```

**`06-worksfor.rq`**
```sparql
PREFIX schema: <http://schema.org/>
SELECT ?person ?org WHERE {
  ?person schema:worksFor ?org .
  ?org schema:name ?orgName .
}
```

**`07-distance.rq`**
```sparql
PREFIX schema: <http://schema.org/>
SELECT ?from ?to ?value ?unit WHERE {
  ?dist a <tag:example.org,2026:Distance> ;
        schema:value ?value ;
        schema:unitText ?unit .
  OPTIONAL { ?dist <tag:example.org,2026:from> ?from }
  OPTIONAL { ?dist <tag:example.org,2026:to> ?to }
}
```

## 🔗 Ссылки

- MD-LD спецификация — https://github.com/davay42/mdld-parse/blob/HEAD/spec/index.md
- MD-LD синтаксис — https://github.com/alan8373/mdld-py/blob/main/docs/Syntax.md
- Schema.org (используемая онтология) — https://schema.org/
- SPARQL 1.1 — https://www.w3.org/TR/sparql11-query/
  
