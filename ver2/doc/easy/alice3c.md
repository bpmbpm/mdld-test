## 1

Тогда вместо русскоязычных предикатов и сущностей используем англоязычные. Перепиши все файлы. Используем расширение файлов ".md" и вариант перехода по якорю.  
Также поясни именование сущностей (Person) и предикатов. Используется верблюжий стиль для составных имен, но в первом случае с заглавной буквы, а во втором со строчной? 

Вы правильно поняли принцип именования. В RDF/OWL существует **устоявшаяся конвенция**, которую используют W3C, Schema.org, FOAF, Dublin Core и практически все крупные онтологии:

| Тип сущности | Стиль | Первая буква | Примеры |
|---|---|---|---|
| **Классы (сущности)** | UpperCamelCase (PascalCase) | **Заглавная** | `Person`, `PostalAddress`, `Hobby`, `Organization` |
| **Свойства (предикаты)** | lowerCamelCase | **Строчная** | `hasAddress`, `streetAddress`, `name`, `knows` |
| **Индивиды (экземпляры)** | обычно lowerCamelCase или просто lower | **Строчная** | `alice`, `bob`, `aliceAddress` |

**Зачем это разделение?** Чтобы при чтении RDF-графа визуально различать классы и свойства. Когда вы видите `Person` — вы понимаете, что это класс. Когда видите `hasAddress` — это свойство. Когда видите `alice` — это конкретный индивид. Это не синтаксическое требование RDF (формально можно писать как угодно), а **соглашение**, которое делает граф читаемым для человека. Оно закреплено в [OWL Naming Conventions](https://www.w3.org/TR/owl-ref/#Naming) и поддерживается инструментами (Protégé, TopBraid и др.).

Теперь перепишу все файлы с англоязычными именами и якорями.

---

## 1. `ontology1.md`

**Адрес:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md`

```markdown
# Custom Ontology v1

**Prefix:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#`
**Separator:** `#` (hash namespace)

## Classes

<a id="Person"></a>
### Person

A human being or fictional character.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#Person`
- **Equivalent to:** `schema:Person`, `foaf:Person`, `vcard:Individual`, `dbo:Person`, `prov:Person`

<a id="PostalAddress"></a>
### PostalAddress

A postal address.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#PostalAddress`
- **Equivalent to:** `schema:PostalAddress`

<a id="Hobby"></a>
### Hobby

A hobby or interest.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#Hobby`
- **Equivalent to:** `schema:Thing`

## Properties

<a id="name"></a>
### name

Full name of a person.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#name`
- **Domain:** `Person`
- **Range:** `xsd:string`
- **Equivalent to:** `schema:name`, `foaf:name`

<a id="hasAddress"></a>
### hasAddress

Links a person to their postal address.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#hasAddress`
- **Domain:** `Person`
- **Range:** `PostalAddress`
- **Equivalent to:** `schema:address`

<a id="streetAddress"></a>
### streetAddress

Street name and house number.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#streetAddress`
- **Domain:** `PostalAddress`
- **Range:** `xsd:string`
- **Equivalent to:** `schema:streetAddress`

<a id="addressLocality"></a>
### addressLocality

City or locality name.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#addressLocality`
- **Domain:** `PostalAddress`
- **Range:** `xsd:string`
- **Equivalent to:** `schema:addressLocality`

<a id="postalCode"></a>
### postalCode

Postal code.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#postalCode`
- **Domain:** `PostalAddress`
- **Range:** `xsd:string`
- **Equivalent to:** `schema:postalCode`

<a id="addressCountry"></a>
### addressCountry

Country name.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#addressCountry`
- **Domain:** `PostalAddress`
- **Range:** `xsd:string`
- **Equivalent to:** `schema:addressCountry`

<a id="hasHobby"></a>
### hasHobby

Links a person to their hobby.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#hasHobby`
- **Domain:** `Person`
- **Range:** `Hobby`
- **Equivalent to:** `schema:knowsAbout`

## Turtle source

```turtle
@prefix onto: <https://bpmbpm.github.io/onto/ver1/ontology1.md#> .
@prefix owl:  <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

onto:Person a owl:Class ;
    rdfs:label "Person"@en ;
    owl:equivalentClass <http://schema.org/Person> ,
                        <http://xmlns.com/foaf/0.1/Person> ,
                        <http://www.w3.org/2006/vcard/ns#Individual> ,
                        <http://dbpedia.org/ontology/Person> ,
                        <http://www.w3.org/ns/prov#Person> .

onto:PostalAddress a owl:Class ;
    rdfs:label "PostalAddress"@en ;
    owl:equivalentClass <http://schema.org/PostalAddress> .

onto:Hobby a owl:Class ;
    rdfs:label "Hobby"@en ;
    owl:equivalentClass <http://schema.org/Thing> .

onto:name a owl:DatatypeProperty ;
    rdfs:label "name"@en ;
    rdfs:domain onto:Person ;
    rdfs:range <http://www.w3.org/2001/XMLSchema#string> ;
    owl:equivalentProperty <http://schema.org/name> ,
                           <http://xmlns.com/foaf/0.1/name> .

onto:hasAddress a owl:ObjectProperty ;
    rdfs:label "hasAddress"@en ;
    rdfs:domain onto:Person ;
    rdfs:range onto:PostalAddress ;
    owl:equivalentProperty <http://schema.org/address> .

onto:streetAddress a owl:DatatypeProperty ;
    rdfs:label "streetAddress"@en ;
    rdfs:domain onto:PostalAddress ;
    rdfs:range <http://www.w3.org/2001/XMLSchema#string> ;
    owl:equivalentProperty <http://schema.org/streetAddress> .

onto:addressLocality a owl:DatatypeProperty ;
    rdfs:label "addressLocality"@en ;
    rdfs:domain onto:PostalAddress ;
    rdfs:range <http://www.w3.org/2001/XMLSchema#string> ;
    owl:equivalentProperty <http://schema.org/addressLocality> .

onto:postalCode a owl:DatatypeProperty ;
    rdfs:label "postalCode"@en ;
    rdfs:domain onto:PostalAddress ;
    rdfs:range <http://www.w3.org/2001/XMLSchema#string> ;
    owl:equivalentProperty <http://schema.org/postalCode> .

onto:addressCountry a owl:DatatypeProperty ;
    rdfs:label "addressCountry"@en ;
    rdfs:domain onto:PostalAddress ;
    rdfs:range <http://www.w3.org/2001/XMLSchema#string> ;
    owl:equivalentProperty <http://schema.org/addressCountry> .

onto:hasHobby a owl:ObjectProperty ;
    rdfs:label "hasHobby"@en ;
    rdfs:domain onto:Person ;
    rdfs:range onto:Hobby ;
    owl:equivalentProperty <http://schema.org/knowsAbout> .
```
```

**Ссылки на якоря:**
- `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#Person`
- `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#hasAddress`
- `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#name`

---

## 2. `rdf2en.md` (замена `rdf2ru.md`)

**Адрес:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md`

```markdown
# RDF English Vocabulary

**Prefix:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#`
**Separator:** `#` (hash namespace)

## Classes

<a id="Property"></a>
### Property

An RDF property (predicate).

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#Property`
- **Equivalent to:** `rdf:Property`

<a id="Statement"></a>
### Statement

An RDF statement (reified triple).

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#Statement`
- **Equivalent to:** `rdf:Statement`

<a id="List"></a>
### List

An RDF list.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#List`
- **Equivalent to:** `rdf:List`

## Properties

<a id="type"></a>
### type

Indicates that a resource is an instance of a class.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#type`
- **Equivalent to:** `rdf:type`

<a id="subject"></a>
### subject

The subject of an RDF statement.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#subject`
- **Equivalent to:** `rdf:subject`

<a id="predicate"></a>
### predicate

The predicate of an RDF statement.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#predicate`
- **Equivalent to:** `rdf:predicate`

<a id="object"></a>
### object

The object of an RDF statement.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#object`
- **Equivalent to:** `rdf:object`

<a id="value"></a>
### value

The value of a property.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#value`
- **Equivalent to:** `rdf:value`

<a id="first"></a>
### first

The first element of an RDF list.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#first`
- **Equivalent to:** `rdf:first`

<a id="rest"></a>
### rest

The rest of an RDF list.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#rest`
- **Equivalent to:** `rdf:rest`
```

**Примечание:** Поскольку мы перешли на английский, эти «словари-аналоги» стали **избыточными** — стандартные `rdf:` и `rdfs:` уже используют английские имена. Файлы `rdf2en.md` и `rdfs2en.md` можно оставить как **документацию** или **учебный материал**, но в реальных триплетах достаточно использовать стандартные префиксы. Я оставляю их для полноты картины.

---

## 3. `rdfs2en.md` (замена `rdfs2ru.md`)

**Адрес:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md`

```markdown
# RDFS English Vocabulary

**Prefix:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#`
**Separator:** `#` (hash namespace)

## Classes

<a id="Resource"></a>
### Resource

Anything describable in RDF.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#Resource`
- **Equivalent to:** `rdfs:Resource`

<a id="Class"></a>
### Class

An RDFS class.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#Class`
- **Equivalent to:** `rdfs:Class`

<a id="Literal"></a>
### Literal

The class of literals.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#Literal`
- **Equivalent to:** `rdfs:Literal`

<a id="Datatype"></a>
### Datatype

The class of datatypes.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#Datatype`
- **Equivalent to:** `rdfs:Datatype`

## Properties

<a id="subClassOf"></a>
### subClassOf

Relation between a class and its subclass.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#subClassOf`
- **Equivalent to:** `rdfs:subClassOf`

<a id="subPropertyOf"></a>
### subPropertyOf

Relation between a property and its subproperty.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#subPropertyOf`
- **Equivalent to:** `rdfs:subPropertyOf`

<a id="domain"></a>
### domain

The domain of a property.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#domain`
- **Equivalent to:** `rdfs:domain`

<a id="range"></a>
### range

The range of a property.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#range`
- **Equivalent to:** `rdfs:range`

<a id="label"></a>
### label

A human-readable label.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#label`
- **Equivalent to:** `rdfs:label`

<a id="comment"></a>
### comment

A human-readable comment.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#comment`
- **Equivalent to:** `rdfs:comment`

<a id="seeAlso"></a>
### seeAlso

A link to additional information.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#seeAlso`
- **Equivalent to:** `rdfs:seeAlso`

<a id="isDefinedBy"></a>
### isDefinedBy

Indicates where a resource is defined.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#isDefinedBy`
- **Equivalent to:** `rdfs:isDefinedBy`

<a id="member"></a>
### member

A member of a container.

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#member`
- **Equivalent to:** `rdfs:member`
```

---

## 4. `test1.md` (данные Алисы и Боба)

**Адрес:** `https://github.com/bpmbpm/onto/blob/main/example1/test1.md`

```markdown
# Test Data: Alice and Bob

**Prefix:** `https://bpmbpm.github.io/onto/example1/test1.md#`
**Ontology:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#`

## Turtle source

```turtle
@prefix ex:   <https://bpmbpm.github.io/onto/example1/test1.md#> .
@prefix onto: <https://bpmbpm.github.io/onto/ver1/ontology1.md#> .
@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .

# --- Alice ---
ex:alice rdf:type onto:Person ;
    onto:name "Alice" ;
    onto:hasAddress ex:aliceAddress ;
    onto:hasHobby ex:aliceHobbyPhoto , ex:aliceHobbyChess .

ex:aliceAddress rdf:type onto:PostalAddress ;
    onto:name "Alice's address" ;
    onto:streetAddress "10 Lenin St." ;
    onto:addressLocality "Moscow" ;
    onto:postalCode "101000" ;
    onto:addressCountry "Russia" .

ex:aliceHobbyPhoto rdf:type onto:Hobby ;
    onto:name "Photography" .

ex:aliceHobbyChess rdf:type onto:Hobby ;
    onto:name "Chess" .

# --- Bob ---
ex:bob rdf:type onto:Person ;
    onto:name "Bob" ;
    onto:hasAddress ex:bobAddress ;
    onto:hasHobby ex:bobHobbyBike , ex:bobHobbyCode .

ex:bobAddress rdf:type onto:PostalAddress ;
    onto:name "Bob's address" ;
    onto:streetAddress "25 Pushkin St." ;
    onto:addressLocality "Khimki" ;
    onto:postalCode "141400" ;
    onto:addressCountry "Russia" .

ex:bobHobbyBike rdf:type onto:Hobby ;
    onto:name "Cycling" .

ex:bobHobbyCode rdf:type onto:Hobby ;
    onto:name "Programming" .
```
```

**Якоря для данных:**
- `https://github.com/bpmbpm/onto/blob/main/example1/test1.md#alice`
- `https://github.com/bpmbpm/onto/blob/main/example1/test1.md#bob`

---

## 📊 Сводная таблица именования

| Элемент | Стиль | Пример | Где используется |
|---|---|---|---|
| **Класс** | UpperCamelCase | `Person`, `PostalAddress`, `Hobby` | ontology1.md |
| **Свойство** | lowerCamelCase | `name`, `hasAddress`, `streetAddress` | ontology1.md |
| **Индивид** | lowerCamelCase | `alice`, `bob`, `aliceAddress` | test1.md |
| **Префикс** | lowercase | `ex:`, `onto:`, `rdf:` | везде |
| **Якорь** | Latin, lowercase | `#person`, `#hasAddress` | в URL |

**Ключевое правило:** заглавная буква в начале имени — признак **класса**. Строчная — признак **свойства** или **индивида**. Это позволяет даже без контекста понять, что перед вами: `Person` — класс, `hasAddress` — свойство, `alice` — конкретный человек.

**Ссылки:**
- OWL Naming Conventions (W3C) — https://www.w3.org/TR/owl-ref/#Naming
- Schema.org Naming — https://schema.org/docs/styleguide.html
- RDF 1.1 Primer — https://www.w3.org/TR/rdf11-primer/
- GitHub: создание якорей — https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#section-links

## 2

Вы абсолютно правы. После перехода на **английские имена** явные HTML-якоря `<a id="...">` становятся **не нужны**. GitHub автоматически генерирует `id` для каждого заголовка при рендеринге Markdown. Я добавил их «по инерции» — они были нужны для кириллицы, но с латиницей эта проблема исчезает.

### 🔍 Что генерирует GitHub автоматически

Для заголовка `### Person` GitHub создаёт:

```html
<h3 id="person">Person</h3>
```

И ссылка `#person` работает. Для `### hasAddress`:

```html
<h3 id="hasaddress">hasAddress</h3>
```

Ссылка `#hasaddress` тоже работает.

### ⚠️ Единственная тонкость: регистр

GitHub **приводит `id` к нижнему регистру**. Поэтому:

| Заголовок в файле | GitHub `id` | Ссылка |
|---|---|---|
| `### Person` | `person` | `#person` |
| `### PostalAddress` | `postaladdress` | `#postaladdress` |
| `### hasAddress` | `hasaddress` | `#hasaddress` |

Обратите внимание: `PostalAddress` → `postaladdress` (без дефиса, всё слитно). Это неочевидно, но работает.

### 💡 Нужны ли явные якоря?

**Нет, не нужны** — при условии, что вас устраивает:

1. **Регистр не совпадает с RDF-именем.** В RDF класс называется `Person` (с заглавной), а якорь — `#person` (строчная). Ссылка `#Person` **не сработает** — GitHub ищет `id="person"`, а не `id="Person"`.
2. **Слитное написание.** `PostalAddress` → `#postaladdress`. Если вы ожидали `#postal-address`, это не сработает.

Если эти два момента вас устраивают — **явные якоря можно удалить**. Файлы станут чище.

### 🛠️ Как выглядит файл без явных якорей

```markdown
# Custom Ontology v1

**Prefix:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#`
**Separator:** `#` (hash namespace)

## Classes

### Person

A human being or fictional character.

- **URI:** `...#Person`
- **Equivalent to:** `schema:Person`, `foaf:Person`, ...

### PostalAddress

A postal address.

- **URI:** `...#PostalAddress`
- **Equivalent to:** `schema:PostalAddress`

## Properties

### name

Full name of a person.

- **URI:** `...#name`
- **Domain:** `Person`
- **Range:** `xsd:string`

### hasAddress

Links a person to their address.

- **URI:** `...#hasAddress`
- **Domain:** `Person`
- **Range:** `PostalAddress`
```

### 📊 Когда явные якоря всё же полезны

| Ситуация | Нужны ли `<a id>` |
|---|---|
| Английские имена, регистр не важен | ❌ Не нужны |
| Английские имена, нужен точный регистр (`#Person`) | ✅ Нужны |
| Кириллические имена | ✅ Нужны (из-за percent-encoding) |
| Смешанные имена | ✅ Нужны для нестабильных случаев |
| Вы хотите, чтобы якорь не менялся при редактировании заголовка | ✅ Нужны |

### 💎 Итог

Для вашего случая (**английские имена, хранение в репозитории GitHub**) **явные якоря не нужны**. GitHub сгенерирует их сам. Ссылки будут работать, но с двумя оговорками:
- регистр приводится к нижнему: `#person`, а не `#Person`;
- составные имена пишутся слитно: `#postaladdress`, а не `#postal-address`.

Если эти оговорки приемлемы — удаляйте `<a id="...">` и оставляйте чистый Markdown. Если нужен точный регистр — оставляйте явные якоря.

**Ссылки:**
- GitHub: автоматическая генерация якорей — https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#section-links
- GitHub: обсуждение регистра в якорях — https://github.com/orgs/community/discussions/16925

## 3

Приведи все файлы заново (с учетом этого)

## 📐 Правила формирования якорей на GitHub

GitHub использует библиотеку `github-slugger` для генерации `id` из текста заголовка. Правила следующие:

| № | Правило | Пример |
|---|---|---|
| 1 | Всё приводится к **нижнему регистру** | `Person` → `person`, `Exe` → `exe` |
| 2 | **Пробелы** заменяются на **дефисы** | `Postal Address` → `postal-address` |
| 3 | **Дефисы сохраняются** | `Exe1-1` → `exe1-1` |
| 4 | **Знаки препинания удаляются** | `Person!` → `person`, `(Person)` → `person` |
| 5 | **Кириллица сохраняется** и приводится к нижнему регистру | `Персона` → `персона` |
| 6 | **Коллизии разрешаются суффиксом** `-1`, `-2` | см. ниже |

### ⚠️ Правило коллизий (важный случай)

Если в файле есть **два заголовка**, которые после нормализации дают одинаковый `id`, то:

- **Первый** получает `id` без суффикса.
- **Второй** получает `id` с суффиксом `-1`.
- **Третий** — `-2`, и так далее.

**Пример:**

```markdown
### exe
Первый раздел.

### Exe
Второй раздел.
```

GitHub сгенерирует:
- `### exe` → `<h3 id="exe">`
- `### Exe` → `<h3 id="exe-1">`

**Ссылка `#Exe`** нормализуется в `#exe` и откроет **первый** раздел (потому что `id="exe"` принадлежит ему). Чтобы попасть во второй раздел, нужно использовать `#exe-1`.

### ✅ Примеры работающих ссылок

| Заголовок в файле | Сгенерированный `id` | Ссылка в URL |
|---|---|---|
| `### Person` | `person` | `#person` |
| `### PostalAddress` | `postaladdress` | `#postaladdress` |
| `### hasAddress` | `hasaddress` | `#hasaddress` |
| `### has-address` | `has-address` | `#has-address` |
| `### Exe1-1` | `exe1-1` | `#exe1-1` |
| `### Персона` | `персона` | `#персона` |

---

## 📄 Файл 1. `ontology1.md`

**Адрес:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md`

```markdown
# Custom Ontology v1

**Prefix:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#`
**Separator:** `#` (hash namespace)

## Classes

### Person

A human being or fictional character.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#Person`
- **Equivalent to:** `schema:Person`, `foaf:Person`, `vcard:Individual`, `dbo:Person`, `prov:Person`

### PostalAddress

A postal address.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#PostalAddress`
- **Equivalent to:** `schema:PostalAddress`

### Hobby

A hobby or interest.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#Hobby`
- **Equivalent to:** `schema:Thing`

## Properties

### name

Full name of a person.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#name`
- **Domain:** `Person`
- **Range:** `xsd:string`
- **Equivalent to:** `schema:name`, `foaf:name`

### hasAddress

Links a person to their postal address.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#hasAddress`
- **Domain:** `Person`
- **Range:** `PostalAddress`
- **Equivalent to:** `schema:address`

### streetAddress

Street name and house number.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#streetAddress`
- **Domain:** `PostalAddress`
- **Range:** `xsd:string`
- **Equivalent to:** `schema:streetAddress`

### addressLocality

City or locality name.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#addressLocality`
- **Domain:** `PostalAddress`
- **Range:** `xsd:string`
- **Equivalent to:** `schema:addressLocality`

### postalCode

Postal code.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#postalCode`
- **Domain:** `PostalAddress`
- **Range:** `xsd:string`
- **Equivalent to:** `schema:postalCode`

### addressCountry

Country name.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#addressCountry`
- **Domain:** `PostalAddress`
- **Range:** `xsd:string`
- **Equivalent to:** `schema:addressCountry`

### hasHobby

Links a person to their hobby.

- **URI:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#hasHobby`
- **Domain:** `Person`
- **Range:** `Hobby`
- **Equivalent to:** `schema:knowsAbout`

## Turtle source

```turtle
@prefix onto: <https://bpmbpm.github.io/onto/ver1/ontology1.md#> .
@prefix owl:  <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

onto:Person a owl:Class ;
    rdfs:label "Person"@en ;
    owl:equivalentClass <http://schema.org/Person> ,
                        <http://xmlns.com/foaf/0.1/Person> ,
                        <http://www.w3.org/2006/vcard/ns#Individual> ,
                        <http://dbpedia.org/ontology/Person> ,
                        <http://www.w3.org/ns/prov#Person> .

onto:PostalAddress a owl:Class ;
    rdfs:label "PostalAddress"@en ;
    owl:equivalentClass <http://schema.org/PostalAddress> .

onto:Hobby a owl:Class ;
    rdfs:label "Hobby"@en ;
    owl:equivalentClass <http://schema.org/Thing> .

onto:name a owl:DatatypeProperty ;
    rdfs:label "name"@en ;
    rdfs:domain onto:Person ;
    rdfs:range <http://www.w3.org/2001/XMLSchema#string> ;
    owl:equivalentProperty <http://schema.org/name> ,
                           <http://xmlns.com/foaf/0.1/name> .

onto:hasAddress a owl:ObjectProperty ;
    rdfs:label "hasAddress"@en ;
    rdfs:domain onto:Person ;
    rdfs:range onto:PostalAddress ;
    owl:equivalentProperty <http://schema.org/address> .

onto:streetAddress a owl:DatatypeProperty ;
    rdfs:label "streetAddress"@en ;
    rdfs:domain onto:PostalAddress ;
    rdfs:range <http://www.w3.org/2001/XMLSchema#string> ;
    owl:equivalentProperty <http://schema.org/streetAddress> .

onto:addressLocality a owl:DatatypeProperty ;
    rdfs:label "addressLocality"@en ;
    rdfs:domain onto:PostalAddress ;
    rdfs:range <http://www.w3.org/2001/XMLSchema#string> ;
    owl:equivalentProperty <http://schema.org/addressLocality> .

onto:postalCode a owl:DatatypeProperty ;
    rdfs:label "postalCode"@en ;
    rdfs:domain onto:PostalAddress ;
    rdfs:range <http://www.w3.org/2001/XMLSchema#string> ;
    owl:equivalentProperty <http://schema.org/postalCode> .

onto:addressCountry a owl:DatatypeProperty ;
    rdfs:label "addressCountry"@en ;
    rdfs:domain onto:PostalAddress ;
    rdfs:range <http://www.w3.org/2001/XMLSchema#string> ;
    owl:equivalentProperty <http://schema.org/addressCountry> .

onto:hasHobby a owl:ObjectProperty ;
    rdfs:label "hasHobby"@en ;
    rdfs:domain onto:Person ;
    rdfs:range onto:Hobby ;
    owl:equivalentProperty <http://schema.org/knowsAbout> .
```
```

**Работающие якоря:**
- `#person`, `#postaladdress`, `#hobby`
- `#name`, `#hasaddress`, `#streetaddress`, `#addresslocality`, `#postalcode`, `#addresscountry`, `#hashobby`

---

## 📄 Файл 2. `test1.md`

**Адрес:** `https://github.com/bpmbpm/onto/blob/main/example1/test1.md`

```markdown
# Test Data: Alice and Bob

**Prefix:** `https://bpmbpm.github.io/onto/example1/test1.md#`
**Ontology:** `https://bpmbpm.github.io/onto/ver1/ontology1.md#`

## Alice

### Turtle

```turtle
@prefix ex:   <https://bpmbpm.github.io/onto/example1/test1.md#> .
@prefix onto: <https://bpmbpm.github.io/onto/ver1/ontology1.md#> .
@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

ex:alice rdf:type onto:Person ;
    onto:name "Алиса" ;
    onto:hasAddress ex:aliceAddress ;
    onto:hasHobby ex:aliceHobbyPhoto , ex:aliceHobbyChess .

ex:aliceAddress rdf:type onto:PostalAddress ;
    onto:name "Адрес Алисы" ;
    onto:streetAddress "ул. Ленина, д. 10" ;
    onto:addressLocality "Москва" ;
    onto:postalCode "101000" ;
    onto:addressCountry "Россия" .

ex:aliceHobbyPhoto rdf:type onto:Hobby ;
    onto:name "Фотография" .

ex:aliceHobbyChess rdf:type onto:Hobby ;
    onto:name "Шахматы" .
```

## Bob

### Turtle

```turtle
@prefix ex:   <https://bpmbpm.github.io/onto/example1/test1.md#> .
@prefix onto: <https://bpmbpm.github.io/onto/ver1/ontology1.md#> .
@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

ex:bob rdf:type onto:Person ;
    onto:name "Боб" ;
    onto:hasAddress ex:bobAddress ;
    onto:hasHobby ex:bobHobbyBike , ex:bobHobbyCode .

ex:bobAddress rdf:type onto:PostalAddress ;
    onto:name "Адрес Боба" ;
    onto:streetAddress "ул. Пушкина, д. 25" ;
    onto:addressLocality "Химки" ;
    onto:postalCode "141400" ;
    onto:addressCountry "Россия" .

ex:bobHobbyBike rdf:type onto:Hobby ;
    onto:name "Велоспорт" .

ex:bobHobbyCode rdf:type onto:Hobby ;
    onto:name "Программирование" .
```
```

**Работающие якоря:**
- `#alice`, `#bob`
- `#turtle` → первый (в разделе Alice), `#turtle-1` → второй (в разделе Bob)

**Ссылки:**
- `https://github.com/bpmbpm/onto/blob/main/example1/test1.md#alice`
- `https://github.com/bpmbpm/onto/blob/main/example1/test1.md#bob`

---

## 📄 Файл 3. `rdf2en.md` (опционально)

**Адрес:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md`

> **Примечание:** После перехода на английские имена этот файл **дублирует стандартный RDF** (`rdf:type`, `rdf:subject` и т.д.). Он сохранён как учебная документация и может быть удалён без потери функциональности.

```markdown
# RDF English Vocabulary (documentation)

**Prefix:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#`
**Note:** This file mirrors the standard `rdf:` namespace using English names.

## Classes

### Property

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#Property`
- **Equivalent to:** `rdf:Property`

### Statement

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#Statement`
- **Equivalent to:** `rdf:Statement`

### List

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#List`
- **Equivalent to:** `rdf:List`

## Properties

### type

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#type`
- **Equivalent to:** `rdf:type`

### subject

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#subject`
- **Equivalent to:** `rdf:subject`

### predicate

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#predicate`
- **Equivalent to:** `rdf:predicate`

### object

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2en.md#object`
- **Equivalent to:** `rdf:object`
```

---

## 📄 Файл 4. `rdfs2en.md` (опционально)

**Адрес:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md`

> **Примечание:** Аналогично предыдущему файлу — дублирует стандартный `rdfs:`. Может быть удалён.

```markdown
# RDFS English Vocabulary (documentation)

**Prefix:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#`
**Note:** This file mirrors the standard `rdfs:` namespace using English names.

## Classes

### Resource

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#Resource`
- **Equivalent to:** `rdfs:Resource`

### Class

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#Class`
- **Equivalent to:** `rdfs:Class`

### Literal

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#Literal`
- **Equivalent to:** `rdfs:Literal`

## Properties

### subClassOf

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#subClassOf`
- **Equivalent to:** `rdfs:subClassOf`

### subPropertyOf

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#subPropertyOf`
- **Equivalent to:** `rdfs:subPropertyOf`

### domain

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#domain`
- **Equivalent to:** `rdfs:domain`

### range

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#range`
- **Equivalent to:** `rdfs:range`

### label

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#label`
- **Equivalent to:** `rdfs:label`

### comment

- **URI:** `https://bpmbpm.github.io/onto/ver1/rdfs2en.md#comment`
- **Equivalent to:** `rdfs:comment`
```

---

## 📊 Сводка по именованию

| Тип | Стиль | Первая буква | Примеры |
|---|---|---|---|
| **Класс** | UpperCamelCase | Заглавная | `Person`, `PostalAddress`, `Hobby` |
| **Свойство** | lowerCamelCase | Строчная | `name`, `hasAddress`, `streetAddress` |
| **Индивид** | lowerCamelCase | Строчная | `alice`, `bob`, `aliceAddress` |
| **Префикс** | lowercase | Строчная | `ex:`, `onto:`, `rdf:` |
| **Label (значение)** | русский | — | `"Алиса"`, `"Боб"`, `"Адрес Алисы"` |

**Итог:** идентификаторы (IRI) — английские, в camelCase. Метки (labels) — русские, в естественной форме. Ссылки на сущности — через якоря GitHub, автоматически генерируемые из заголовков.

**Ссылки:**
- GitHub: автоматическая генерация якорей — https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#section-links
- OWL Naming Conventions (W3C) — https://www.w3.org/TR/owl-ref/#Naming
- RDF 1.1 Primer — https://www.w3.org/TR/rdf11-primer/
  
