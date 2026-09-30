## 1

Ниже — все файлы, переработанные в соответствии с вашими требованиями. Используется домен `https://github.com/bpmbpm/onto/blob/main/`, английские идентификаторы с русскими описаниями и автоматические якоря GitHub.

---

## 📄 1. `ver1/rdf2en.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md`

```markdown
# RDF English Vocabulary (документация)

**Префикс:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md#`
**Разделитель:** `#` (hash namespace)
**Назначение:** Русскоязычная документация для английских имён стандартного пространства `rdf:`.

## Классы

### Property

Класс, представляющий RDF-свойство (предикат).

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md#Property`
- **Эквивалент:** `rdf:Property`
- **Описание:** Свойство определяет бинарное отношение между субъектом и объектом в RDF-утверждении.

### Statement

Класс, представляющий RDF-утверждение (реифицированный триплет).

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md#Statement`
- **Эквивалент:** `rdf:Statement`
- **Описание:** Используется для описания самого триплета как ресурса (субъект, предикат, объект).

### List

Класс RDF-списка.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md#List`
- **Эквивалент:** `rdf:List`
- **Описание:** Упорядоченная коллекция элементов, реализованная через `rdf:first` и `rdf:rest`.

## Свойства

### type

Указывает, что ресурс является экземпляром класса.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md#type`
- **Эквивалент:** `rdf:type`
- **Описание:** Основной предикат для указания класса ресурса.

### subject

Субъект RDF-утверждения.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md#subject`
- **Эквивалент:** `rdf:subject`
- **Описание:** Используется при реификации для указания субъекта исходного триплета.

### predicate

Предикат RDF-утверждения.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md#predicate`
- **Эквивалент:** `rdf:predicate`
- **Описание:** Используется при реификации для указания предиката исходного триплета.

### object

Объект RDF-утверждения.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md#object`
- **Эквивалент:** `rdf:object`
- **Описание:** Используется при реификации для указания объекта исходного триплета.

### first

Первый элемент RDF-списка.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md#first`
- **Эквивалент:** `rdf:first`
- **Описание:** Связывает узел списка с его первым элементом.

### rest

Остаток RDF-списка.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md#rest`
- **Эквивалент:** `rdf:rest`
- **Описание:** Связывает узел списка с остальной частью списка (или с `rdf:nil` для конца).

### value

Значение свойства.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md#value`
- **Эквивалент:** `rdf:value`
- **Описание:** Используется для указания значения в контексте реификации или структурированных значений.
```

**Работающие якоря:**
- `#property`, `#statement`, `#list`
- `#type`, `#subject`, `#predicate`, `#object`, `#first`, `#rest`, `#value`

**Полные ссылки:**
- `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md#property`
- `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md#type`

---

## 📄 2. `ver1/rdfs2en.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md`

```markdown
# RDFS English Vocabulary (документация)

**Префикс:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#`
**Разделитель:** `#` (hash namespace)
**Назначение:** Русскоязычная документация для английских имён стандартного пространства `rdfs:`.

## Классы

### Resource

Всё, что может быть описано в RDF.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#Resource`
- **Эквивалент:** `rdfs:Resource`
- **Описание:** Базовый класс для всех RDF-ресурсов. Всё, что имеет URI, является экземпляром этого класса.

### Class

Класс RDFS, определяющий группы ресурсов.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#Class`
- **Эквивалент:** `rdfs:Class`
- **Описание:** Используется для определения классов. Экземпляры класса — это ресурсы, принадлежащие к данной группе.

### Literal

Класс литералов.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#Literal`
- **Эквивалент:** `rdfs:Literal`
- **Описание:** Класс всех литеральных значений (строк, чисел, дат и т.д.).

### Datatype

Класс типов данных.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#Datatype`
- **Эквивалент:** `rdfs:Datatype`
- **Описание:** Класс типов данных, используемых для литералов (например, `xsd:string`, `xsd:integer`).

## Свойства

### subClassOf

Отношение между классом и его подклассом.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#subClassOf`
- **Эквивалент:** `rdfs:subClassOf`
- **Описание:** Указывает, что один класс является более специфичным, чем другой. Транзитивно.

### subPropertyOf

Отношение между свойством и его подсвойством.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#subPropertyOf`
- **Эквивалент:** `rdfs:subPropertyOf`
- **Описание:** Указывает, что одно свойство является частным случаем другого.

### domain

Область определения свойства.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#domain`
- **Эквивалент:** `rdfs:domain`
- **Описание:** Указывает класс, к которому должны принадлежать субъекты данного свойства.

### range

Область значений свойства.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#range`
- **Эквивалент:** `rdfs:range`
- **Описание:** Указывает класс, к которому должны принадлежать объекты данного свойства.

### label

Человекочитаемая метка ресурса.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#label`
- **Эквивалент:** `rdfs:label`
- **Описание:** Используется для отображения имени ресурса человеку. Может иметь языковую метку (`@ru`, `@en`).

### comment

Комментарий к ресурсу.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#comment`
- **Эквивалент:** `rdfs:comment`
- **Описание:** Предназначен для документации ресурса. Может иметь языковую метку.

### seeAlso

Ссылка на дополнительную информацию.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#seeAlso`
- **Эквивалент:** `rdfs:seeAlso`
- **Описание:** Указывает на другой ресурс, содержащий дополнительную информацию о данном ресурсе.

### isDefinedBy

Указывает, где определён ресурс.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#isDefinedBy`
- **Эквивалент:** `rdfs:isDefinedBy`
- **Описание:** Связывает ресурс с документом или онтологией, где он определён.

### member

Член контейнера.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#member`
- **Эквивалент:** `rdfs:member`
- **Описание:** Используется для указания членства в контейнере (например, в `rdf:Bag`, `rdf:Seq`, `rdf:Alt`).
```

**Работающие якоря:**
- `#resource`, `#class`, `#literal`, `#datatype`
- `#subclassof`, `#subpropertyof`, `#domain`, `#range`, `#label`, `#comment`, `#seealso`, `#isdefinedby`, `#member`

**Полные ссылки:**
- `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#subclassof`
- `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#label`

---

## 📄 3. `ver1/ontology1.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md`

```markdown
# Пользовательская онтология v1

**Префикс:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#`
**Разделитель:** `#` (hash namespace)

**Назначение:** Онтология для описания персон, их адресов и увлечений. Используется в примерах семантической разметки.

## Классы

### Person

Человек или вымышленный персонаж.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#Person`
- **Эквивалент:** `schema:Person`, `foaf:Person`, `vcard:Individual`, `dbo:Person`, `prov:Person`
- **Комментарий:** Основной класс для описания людей. Может иметь имя, адрес, увлечения.

### PostalAddress

Почтовый адрес.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#PostalAddress`
- **Эквивалент:** `schema:PostalAddress`
- **Комментарий:** Класс для структурированного описания адреса: улица, город, индекс, страна.

### Hobby

Увлечение или хобби.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#Hobby`
- **Эквивалент:** `schema:Thing`
- **Комментарий:** Класс для описания интересов и увлечений персоны.

## Свойства

### name

Полное имя персоны.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#name`
- **Эквивалент:** `schema:name`, `foaf:name`
- **Domain:** `Person`
- **Range:** `xsd:string`
- **Комментарий:** Используется для указания человекочитаемого имени.

### hasAddress

Связывает персону с её почтовым адресом.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#hasAddress`
- **Эквивалент:** `schema:address`
- **Domain:** `Person`
- **Range:** `PostalAddress`
- **Комментарий:** Объектное свойство, указывающее на узел адреса.

### streetAddress

Название улицы и номер дома.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#streetAddress`
- **Эквивалент:** `schema:streetAddress`
- **Domain:** `PostalAddress`
- **Range:** `xsd:string`
- **Комментарий:** Конкретная часть адреса — улица и дом.

### addressLocality

Название города или населённого пункта.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#addressLocality`
- **Эквивалент:** `schema:addressLocality`
- **Domain:** `PostalAddress`
- **Range:** `xsd:string`
- **Комментарий:** Город, посёлок или другой населённый пункт.

### postalCode

Почтовый индекс.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#postalCode`
- **Эквивалент:** `schema:postalCode`
- **Domain:** `PostalAddress`
- **Range:** `xsd:string`
- **Комментарий:** Почтовый индекс в любой системе.

### addressCountry

Название страны.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#addressCountry`
- **Эквивалент:** `schema:addressCountry`
- **Domain:** `PostalAddress`
- **Range:** `xsd:string`
- **Комментарий:** Страна (или код страны) в адресе.

### hasHobby

Связывает персону с её увлечением.

- **URI:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#hasHobby`
- **Эквивалент:** `schema:knowsAbout`
- **Domain:** `Person`
- **Range:** `Hobby`
- **Комментарий:** Объектное свойство, указывающее на узел увлечения.

## Исходный код Turtle

```turtle
@prefix onto: <https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#> .
@prefix owl:  <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .

onto:Person a owl:Class ;
    rdfs:label "Person"@en ;
    rdfs:comment "Человек или вымышленный персонаж."@ru ;
    owl:equivalentClass <http://schema.org/Person> ,
                        <http://xmlns.com/foaf/0.1/Person> ,
                        <http://www.w3.org/2006/vcard/ns#Individual> ,
                        <http://dbpedia.org/ontology/Person> ,
                        <http://www.w3.org/ns/prov#Person> .

onto:PostalAddress a owl:Class ;
    rdfs:label "PostalAddress"@en ;
    rdfs:comment "Почтовый адрес."@ru ;
    owl:equivalentClass <http://schema.org/PostalAddress> .

onto:Hobby a owl:Class ;
    rdfs:label "Hobby"@en ;
    rdfs:comment "Увлечение или хобби."@ru ;
    owl:equivalentClass <http://schema.org/Thing> .

onto:name a owl:DatatypeProperty ;
    rdfs:label "name"@en ;
    rdfs:comment "Полное имя персоны."@ru ;
    rdfs:domain onto:Person ;
    rdfs:range xsd:string ;
    owl:equivalentProperty <http://schema.org/name> ,
                           <http://xmlns.com/foaf/0.1/name> .

onto:hasAddress a owl:ObjectProperty ;
    rdfs:label "hasAddress"@en ;
    rdfs:comment "Связывает персону с её почтовым адресом."@ru ;
    rdfs:domain onto:Person ;
    rdfs:range onto:PostalAddress ;
    owl:equivalentProperty <http://schema.org/address> .

onto:streetAddress a owl:DatatypeProperty ;
    rdfs:label "streetAddress"@en ;
    rdfs:comment "Название улицы и номер дома."@ru ;
    rdfs:domain onto:PostalAddress ;
    rdfs:range xsd:string ;
    owl:equivalentProperty <http://schema.org/streetAddress> .

onto:addressLocality a owl:DatatypeProperty ;
    rdfs:label "addressLocality"@en ;
    rdfs:comment "Название города или населённого пункта."@ru ;
    rdfs:domain onto:PostalAddress ;
    rdfs:range xsd:string ;
    owl:equivalentProperty <http://schema.org/addressLocality> .

onto:postalCode a owl:DatatypeProperty ;
    rdfs:label "postalCode"@en ;
    rdfs:comment "Почтовый индекс."@ru ;
    rdfs:domain onto:PostalAddress ;
    rdfs:range xsd:string ;
    owl:equivalentProperty <http://schema.org/postalCode> .

onto:addressCountry a owl:DatatypeProperty ;
    rdfs:label "addressCountry"@en ;
    rdfs:comment "Название страны."@ru ;
    rdfs:domain onto:PostalAddress ;
    rdfs:range xsd:string ;
    owl:equivalentProperty <http://schema.org/addressCountry> .

onto:hasHobby a owl:ObjectProperty ;
    rdfs:label "hasHobby"@en ;
    rdfs:comment "Связывает персону с её увлечением."@ru ;
    rdfs:domain onto:Person ;
    rdfs:range onto:Hobby ;
    owl:equivalentProperty <http://schema.org/knowsAbout> .
```
```

**Работающие якоря:**
- `#person`, `#postaladdress`, `#hobby`
- `#name`, `#hasaddress`, `#streetaddress`, `#addresslocality`, `#postalcode`, `#addresscountry`, `#hashobby`

**Полные ссылки:**
- `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#person`
- `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#hasaddress`

---

## 📄 4. `example1/test1.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/example1/test1.md`

```markdown
# Тестовые данные: Алиса и Боб

**Префикс:** `https://github.com/bpmbpm/onto/blob/main/example1/test1.md#`
**Онтология:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#`

## Алиса

### Turtle

```turtle
@prefix ex:   <https://github.com/bpmbpm/onto/blob/main/example1/test1.md#> .
@prefix onto: <https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#> .
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

## Боб

### Turtle

```turtle
@prefix ex:   <https://github.com/bpmbpm/onto/blob/main/example1/test1.md#> .
@prefix onto: <https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#> .
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
- `#алиса`, `#боб` (кириллица — работает, если только нижний регистр)
- `#turtle` (первый), `#turtle-1` (второй)

**Полные ссылки:**
- `https://github.com/bpmbpm/onto/blob/main/example1/test1.md#алиса`
- `https://github.com/bpmbpm/onto/blob/main/example1/test1.md#боб`

---

## 📄 5. `anchor.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/anchor.md`

```markdown
# Правила формирования якорей на GitHub

GitHub автоматически генерирует `id` для каждого заголовка Markdown при рендеринге. Алгоритм основан на библиотеке `github-slugger`.

## Основные правила

1. **Приведение к нижнему регистру.** Все заглавные буквы становятся строчными.
   - `Person` → `person`
   - `PostalAddress` → `postaladdress`

2. **Пробелы заменяются на дефисы.**
   - `Postal Address` → `postal-address`

3. **Дефисы сохраняются.**
   - `Exe1-1` → `exe1-1`

4. **Знаки препинания удаляются.**
   - `Person!` → `person`
   - `(Person)` → `person`

5. **Кириллица сохраняется и приводится к нижнему регистру.**
   - `Алиса` → `алиса`
   - `Боб` → `боб`

6. **Коллизии разрешаются суффиксом `-1`, `-2` и т.д.**
   - Если два заголовка дают одинаковый `id`, первый получает `id` без суффикса, второй — с `-1`, третий — с `-2`.

## Примеры

| Заголовок | Сгенерированный `id` | Ссылка |
|---|---|---|
| `### Person` | `person` | `#person` |
| `### PostalAddress` | `postaladdress` | `#postaladdress` |
| `### hasAddress` | `hasaddress` | `#hasaddress` |
| `### has-address` | `has-address` | `#has-address` |
| `### Exe1-1` | `exe1-1` | `#exe1-1` |
| `### Алиса` | `алиса` | `#алиса` |
| `### Боб` | `боб` | `#боб` |

## Обработка дубликатов

Если в файле есть два заголовка с одинаковым текстом:

```markdown
### exe
Первый раздел.

### Exe
Второй раздел.
```

GitHub сгенерирует:
- `### exe` → `id="exe"`
- `### Exe` → `id="exe-1"`

**Ссылка `#Exe`** нормализуется в `#exe` и откроет **первый** раздел. Чтобы попасть во второй, используйте `#exe-1`.

## Кириллица и percent-encoding

Кириллические символы в URL должны быть percent-encoded, если они содержат заглавные буквы. Браузеры обычно делают это автоматически, но при ручном вводе ссылки могут возникнуть проблемы.

**Пример:**
- Заголовок: `### Алиса`
- Ссылка: `#алиса` (работает)
- Percent-encoded: `#%D0%B0%D0%BB%D0%B8%D1%81%D0%B0` (эквивалентно)

**Если заголовок содержит заглавные буквы:** `### Алиса` → `id="алиса"` (приведено к нижнему регистру). Ссылка `#Алиса` не сработает — используйте `#алиса`.

## Когда нужны явные якоря

Явные HTML-якоря (`<a id="...">`) нужны только в случаях:
1. Кириллица с заглавными буквами (нестабильно).
2. Смешанные языки.
3. Требуется точный регистр `id` (например, `#Person` вместо `#person`).

В остальных случаях GitHub генерирует якоря автоматически, и явные якоря не нужны.

## Ссылки

- [GitHub: создание якорей](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#section-links)
- [github-slugger (npm)](https://www.npmjs.com/package/github-slugger)
```

**Работающие якоря:**
- `#правила-формирования-якорей-на-github`
- `#основные-правила`
- `#обработка-дубликатов`
- `#кириллица-и-percent-encoding`
- `#когда-нужны-явные-якоря`

**Полная ссылка:**
- `https://github.com/bpmbpm/onto/blob/main/anchor.md#основные-правила`

---

## 💎 Итог

Все файлы переработаны:
- Используется URL репозитория GitHub вместо GitHub Pages.
- `rdf2en.md` и `rdfs2en.md` содержат английские имена и русские описания.
- Онтология снабжена подробными русскими комментариями.
- Данные Алисы и Боба в одном файле `example1/test1.md`.
- Создан файл `anchor.md` с полными правилами обработки якорей.

Ссылки на якоря работают автоматически — GitHub генерирует `id` из заголовков. Для английских имён (в нижнем регистре) и кириллицы (в нижнем регистре) дополнительных действий не требуется.
