## 1

Вы правы. Правило должно быть сквозным: **если у термина есть аналог в RDF или RDFS, используем `rdf2:` / `rdfs2:`; только для уникальных терминов используем `onto:`**. Исправляю все файлы и создаю `rules.md`.

---

## 📄 1. `ver1/rdf2.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2.md`

```markdown
# RDF Vocabulary (документация)  

**Префикс:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2.md#`  
**Разделитель:** `#` (hash namespace)  
**Назначение:** Английские имена для стандартного пространства `rdf:` с русскими описаниями.  

@prefix rdf2: <https://github.com/bpmbpm/onto/blob/main/ver1/rdf2.md#> .  
@prefix rdfs2: <https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2.md#> .  
@prefix owl: <http://www.w3.org/2002/07/owl#> .  
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .  

# Classes  

## Property  

rdf2:Property rdf2:type owl:Class ;  
    rdfs2:label "Property"@en ;  
    rdfs2:label "Свойство"@ru ;  
    rdfs2:comment "Класс, представляющий RDF-свойство (предикат)."@ru ;  
    owl:equivalentClass rdf:Property .  

## Statement  

rdf2:Statement rdf2:type owl:Class ;  
    rdfs2:label "Statement"@en ;  
    rdfs2:label "Утверждение"@ru ;  
    rdfs2:comment "Класс, представляющий RDF-утверждение (реифицированный триплет)."@ru ;  
    owl:equivalentClass rdf:Statement .  

## List  

rdf2:List rdf2:type owl:Class ;  
    rdfs2:label "List"@en ;  
    rdfs2:label "Список"@ru ;  
    rdfs2:comment "Класс RDF-списка."@ru ;  
    owl:equivalentClass rdf:List .  

# Properties  

## type  

rdf2:type rdf2:type owl:ObjectProperty ;  
    rdfs2:label "type"@en ;  
    rdfs2:label "тип"@ru ;  
    rdfs2:comment "Указывает, что ресурс является экземпляром класса."@ru ;  
    owl:equivalentProperty rdf:type .  

## subject  

rdf2:subject rdf2:type owl:ObjectProperty ;  
    rdfs2:label "subject"@en ;  
    rdfs2:label "субъект"@ru ;  
    rdfs2:comment "Субъект RDF-утверждения."@ru ;  
    owl:equivalentProperty rdf:subject .  

## predicate  

rdf2:predicate rdf2:type owl:ObjectProperty ;  
    rdfs2:label "predicate"@en ;  
    rdfs2:label "предикат"@ru ;  
    rdfs2:comment "Предикат RDF-утверждения."@ru ;  
    owl:equivalentProperty rdf:predicate .  

## object  

rdf2:object rdf2:type owl:ObjectProperty ;  
    rdfs2:label "object"@en ;  
    rdfs2:label "объект"@ru ;  
    rdfs2:comment "Объект RDF-утверждения."@ru ;  
    owl:equivalentProperty rdf:object .  

## first  

rdf2:first rdf2:type owl:ObjectProperty ;  
    rdfs2:label "first"@en ;  
    rdfs2:label "первый"@ru ;  
    rdfs2:comment "Первый элемент RDF-списка."@ru ;  
    owl:equivalentProperty rdf:first .  

## rest  

rdf2:rest rdf2:type owl:ObjectProperty ;  
    rdfs2:label "rest"@en ;  
    rdfs2:label "остаток"@ru ;  
    rdfs2:comment "Остаток RDF-списка."@ru ;  
    owl:equivalentProperty rdf:rest .  

## value  

rdf2:value rdf2:type owl:DatatypeProperty ;  
    rdfs2:label "value"@en ;  
    rdfs2:label "значение"@ru ;  
    rdfs2:comment "Значение свойства."@ru ;  
    owl:equivalentProperty rdf:value .  
```

**Комментарий:** в этом файле используются `rdfs2:label` и `rdfs2:comment` — потому что они уже определены в `rdfs2.md`. Это не «циклическая зависимость», а применение правила: если есть аналог в RDFS, берём его из `rdfs2:`. Для `rdf:type` используется `rdf2:type`, а не `a`.

---

## 📄 2. `ver1/rdfs2.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2.md`

```markdown
# RDFS Vocabulary (документация)  

**Префикс:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2.md#`  
**Разделитель:** `#` (hash namespace)  
**Назначение:** Английские имена для стандартного пространства `rdfs:` с русскими описаниями.  

@prefix rdfs2: <https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2.md#> .  
@prefix rdf2: <https://github.com/bpmbpm/onto/blob/main/ver1/rdf2.md#> .  
@prefix owl: <http://www.w3.org/2002/07/owl#> .  
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .  

# Classes  

## Resource  

rdfs2:Resource rdf2:type owl:Class ;  
    rdfs2:label "Resource"@en ;  
    rdfs2:label "Ресурс"@ru ;  
    rdfs2:comment "Всё, что может быть описано в RDF."@ru ;  
    owl:equivalentClass rdfs:Resource .  

## Class  

rdfs2:Class rdf2:type owl:Class ;  
    rdfs2:label "Class"@en ;  
    rdfs2:label "Класс"@ru ;  
    rdfs2:comment "Класс RDFS, определяющий группы ресурсов."@ru ;  
    owl:equivalentClass rdfs:Class .  

## Literal  

rdfs2:Literal rdf2:type owl:Class ;  
    rdfs2:label "Literal"@en ;  
    rdfs2:label "Литерал"@ru ;  
    rdfs2:comment "Класс литералов."@ru ;  
    owl:equivalentClass rdfs:Literal .  

## Datatype  

rdfs2:Datatype rdf2:type owl:Class ;  
    rdfs2:label "Datatype"@en ;  
    rdfs2:label "Тип данных"@ru ;  
    rdfs2:comment "Класс типов данных."@ru ;  
    owl:equivalentClass rdfs:Datatype .  

# Properties  

## subClassOf  

rdfs2:subClassOf rdf2:type owl:ObjectProperty ;  
    rdfs2:label "subClassOf"@en ;  
    rdfs2:label "подкласс"@ru ;  
    rdfs2:comment "Отношение между классом и его подклассом."@ru ;  
    owl:equivalentProperty rdfs:subClassOf .  

## subPropertyOf  

rdfs2:subPropertyOf rdf2:type owl:ObjectProperty ;  
    rdfs2:label "subPropertyOf"@en ;  
    rdfs2:label "подсвойство"@ru ;  
    rdfs2:comment "Отношение между свойством и его подсвойством."@ru ;  
    owl:equivalentProperty rdfs:subPropertyOf .  

## domain  

rdfs2:domain rdf2:type owl:ObjectProperty ;  
    rdfs2:label "domain"@en ;  
    rdfs2:label "область определения"@ru ;  
    rdfs2:comment "Область определения свойства."@ru ;  
    owl:equivalentProperty rdfs:domain .  

## range  

rdfs2:range rdf2:type owl:ObjectProperty ;  
    rdfs2:label "range"@en ;  
    rdfs2:label "область значений"@ru ;  
    rdfs2:comment "Область значений свойства."@ru ;  
    owl:equivalentProperty rdfs:range .  

## label  

rdfs2:label rdf2:type owl:DatatypeProperty ;  
    rdfs2:label "label"@en ;  
    rdfs2:label "метка"@ru ;  
    rdfs2:comment "Человекочитаемая метка ресурса."@ru ;  
    owl:equivalentProperty rdfs:label .  

## comment  

rdfs2:comment rdf2:type owl:DatatypeProperty ;  
    rdfs2:label "comment"@en ;  
    rdfs2:label "комментарий"@ru ;  
    rdfs2:comment "Комментарий к ресурсу."@ru ;  
    owl:equivalentProperty rdfs:comment .  

## seeAlso  

rdfs2:seeAlso rdf2:type owl:ObjectProperty ;  
    rdfs2:label "seeAlso"@en ;  
    rdfs2:label "см. также"@ru ;  
    rdfs2:comment "Ссылка на дополнительную информацию."@ru ;  
    owl:equivalentProperty rdfs:seeAlso .  

## isDefinedBy  

rdfs2:isDefinedBy rdf2:type owl:ObjectProperty ;  
    rdfs2:label "isDefinedBy"@en ;  
    rdfs2:label "определён в"@ru ;  
    rdfs2:comment "Указывает, где определён ресурс."@ru ;  
    owl:equivalentProperty rdfs:isDefinedBy .  

## member  

rdfs2:member rdf2:type owl:ObjectProperty ;  
    rdfs2:label "member"@en ;  
    rdfs2:label "член"@ru ;  
    rdfs2:comment "Член контейнера."@ru ;  
    owl:equivalentProperty rdfs:member .  
```

---

## 📄 3. `ver1/ontology1.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md`

```markdown
# Custom Ontology v1  

@prefix onto: <https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#> .  
@prefix rdf2: <https://github.com/bpmbpm/onto/blob/main/ver1/rdf2.md#> .  
@prefix rdfs2: <https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2.md#> .  
@prefix owl: <http://www.w3.org/2002/07/owl#> .  
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .  

# Classes  

## Person  

onto:Person rdf2:type owl:Class ;  
    rdfs2:label "Person"@en ;  
    rdfs2:label "Персона"@ru ;  
    rdfs2:comment "Человек или вымышленный персонаж."@ru ;  
    owl:equivalentClass <http://schema.org/Person> ,  
                        <http://xmlns.com/foaf/0.1/Person> ,  
                        <http://www.w3.org/2006/vcard/ns#Individual> ,  
                        <http://dbpedia.org/ontology/Person> ,  
                        <http://www.w3.org/ns/prov#Person> .  

## PostalAddress  

onto:PostalAddress rdf2:type owl:Class ;  
    rdfs2:label "PostalAddress"@en ;  
    rdfs2:label "Почтовый адрес"@ru ;  
    rdfs2:comment "Почтовый адрес."@ru ;  
    owl:equivalentClass <http://schema.org/PostalAddress> .  

## Hobby  

onto:Hobby rdf2:type owl:Class ;  
    rdfs2:label "Hobby"@en ;  
    rdfs2:label "Увлечение"@ru ;  
    rdfs2:comment "Увлечение или хобби."@ru ;  
    owl:equivalentClass <http://schema.org/Thing> .  

# Properties  

## hasAddress  

onto:hasAddress rdf2:type owl:ObjectProperty ;  
    rdfs2:label "hasAddress"@en ;  
    rdfs2:label "имеет адрес"@ru ;  
    rdfs2:comment "Связывает персону с её почтовым адресом."@ru ;  
    rdfs2:domain onto:Person ;  
    rdfs2:range onto:PostalAddress ;  
    owl:equivalentProperty <http://schema.org/address> .  

## streetAddress  

onto:streetAddress rdf2:type owl:DatatypeProperty ;  
    rdfs2:label "streetAddress"@en ;  
    rdfs2:label "улица"@ru ;  
    rdfs2:comment "Название улицы и номер дома."@ru ;  
    rdfs2:domain onto:PostalAddress ;  
    rdfs2:range xsd:string ;  
    owl:equivalentProperty <http://schema.org/streetAddress> .  

## addressLocality  

onto:addressLocality rdf2:type owl:DatatypeProperty ;  
    rdfs2:label "addressLocality"@en ;  
    rdfs2:label "город"@ru ;  
    rdfs2:comment "Название города или населённого пункта."@ru ;  
    rdfs2:domain onto:PostalAddress ;  
    rdfs2:range xsd:string ;  
    owl:equivalentProperty <http://schema.org/addressLocality> .  

## postalCode  

onto:postalCode rdf2:type owl:DatatypeProperty ;  
    rdfs2:label "postalCode"@en ;  
    rdfs2:label "почтовый индекс"@ru ;  
    rdfs2:comment "Почтовый индекс."@ru ;  
    rdfs2:domain onto:PostalAddress ;  
    rdfs2:range xsd:string ;  
    owl:equivalentProperty <http://schema.org/postalCode> .  

## addressCountry  

onto:addressCountry rdf2:type owl:DatatypeProperty ;  
    rdfs2:label "addressCountry"@en ;  
    rdfs2:label "страна"@ru ;  
    rdfs2:comment "Название страны."@ru ;  
    rdfs2:domain onto:PostalAddress ;  
    rdfs2:range xsd:string ;  
    owl:equivalentProperty <http://schema.org/addressCountry> .  

## hasHobby  

onto:hasHobby rdf2:type owl:ObjectProperty ;  
    rdfs2:label "hasHobby"@en ;  
    rdfs2:label "увлекается"@ru ;  
    rdfs2:comment "Связывает персону с её увлечением."@ru ;  
    rdfs2:domain onto:Person ;  
    rdfs2:range onto:Hobby ;  
    owl:equivalentProperty <http://schema.org/knowsAbout> .  
```

**Что изменилось:**
- `a` → `rdf2:type` (следуя правилу).
- `rdfs:label` → `rdfs2:label`, `rdfs:comment` → `rdfs2:comment`.
- `rdfs:domain` → `rdfs2:domain`, `rdfs:range` → `rdfs2:range`.
- `owl:equivalentClass`, `owl:equivalentProperty`, `owl:Class`, `owl:ObjectProperty`, `owl:DatatypeProperty` — остаются `owl:`, потому что аналогов в RDF/RDFS нет.
- `xsd:string` — остаётся `xsd:`, потому что это отдельное пространство имён.

---

## 📄 4. `example1/test1.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/example1/test1.md`

```markdown
# Test Data: Alice and Bob  

@prefix ex: <https://github.com/bpmbpm/onto/blob/main/example1/test1.md#> .  
@prefix onto: <https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#> .  
@prefix rdf2: <https://github.com/bpmbpm/onto/blob/main/ver1/rdf2.md#> .  
@prefix rdfs2: <https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2.md#> .  

# Alice  

ex:alice rdf2:type onto:Person ;  
    rdfs2:label "Алиса" ;  
    onto:hasAddress ex:aliceAddress ;  
    onto:hasHobby ex:aliceHobbyPhoto , ex:aliceHobbyChess .  

ex:aliceAddress rdf2:type onto:PostalAddress ;  
    rdfs2:label "Адрес Алисы" ;  
    onto:streetAddress "ул. Ленина, д. 10" ;  
    onto:addressLocality "Москва" ;  
    onto:postalCode "101000" ;  
    onto:addressCountry "Россия" .  

ex:aliceHobbyPhoto rdf2:type onto:Hobby ;  
    rdfs2:label "Фотография" .  

ex:aliceHobbyChess rdf2:type onto:Hobby ;  
    rdfs2:label "Шахматы" .  

# Bob  

ex:bob rdf2:type onto:Person ;  
    rdfs2:label "Боб" ;  
    onto:hasAddress ex:bobAddress ;  
    onto:hasHobby ex:bobHobbyBike , ex:bobHobbyCode .  

ex:bobAddress rdf2:type onto:PostalAddress ;  
    rdfs2:label "Адрес Боба" ;  
    onto:streetAddress "ул. Пушкина, д. 25" ;  
    onto:addressLocality "Химки" ;  
    onto:postalCode "141400" ;  
    onto:addressCountry "Россия" .  

ex:bobHobbyBike rdf2:type onto:Hobby ;  
    rdfs2:label "Велоспорт" .  

ex:bobHobbyCode rdf2:type onto:Hobby ;  
    rdfs2:label "Программирование" .  
```

**Что изменилось:**
- `rdf:type` → `rdf2:type`.
- `onto:label` → `rdfs2:label` (потому что `label` — это аналог `rdfs:label`).
- `onto:hasAddress`, `onto:hasHobby`, `onto:streetAddress` и т.д. — остаются `onto:`, потому что аналогов в RDF/RDFS нет (в Schema.org есть, но не в RDF/RDFS).

---

## 📄 5. `rules.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/rules.md`

```markdown
# Правила именования и выбора префиксов  

## Основное правило  

При описании данных и онтологии действует следующее правило выбора префикса:  

**Если у термина есть аналог в RDF или RDFS — используется `rdf2:` или `rdfs2:`.**  
**Если аналога нет — используется `onto:`.**  

Это правило распространяется на все файлы, кроме самих определений `rdf2.md` и `rdfs2.md` (они описывают соответствие между `rdf2:`/`rdfs2:` и стандартными `rdf:`/`rdfs:`).  

## Таблица соответствия  

| Стандартный термин | Замена | Где используется |
|---|---|---|
| `rdf:type` | `rdf2:type` | Все данные и онтологии |
| `rdf:Property` | `rdf2:Property` | Определения онтологий |
| `rdf:Statement` | `rdf2:Statement` | Определения онтологий |
| `rdf:List` | `rdf2:List` | Определения онтологий |
| `rdf:first` | `rdf2:first` | Определения онтологий |
| `rdf:rest` | `rdf2:rest` | Определения онтологий |
| `rdf:value` | `rdf2:value` | Определения онтологий |
| `rdfs:label` | `rdfs2:label` | Метки ресурсов |
| `rdfs:comment` | `rdfs2:comment` | Комментарии к ресурсам |
| `rdfs:domain` | `rdfs2:domain` | Область определения свойства |
| `rdfs:range` | `rdfs2:range` | Область значений свойства |
| `rdfs:subClassOf` | `rdfs2:subClassOf` | Иерархия классов |
| `rdfs:subPropertyOf` | `rdfs2:subPropertyOf` | Иерархия свойств |
| `rdfs:seeAlso` | `rdfs2:seeAlso` | Ссылки |
| `rdfs:isDefinedBy` | `rdfs2:isDefinedBy` | Определение ресурса |
| `rdfs:member` | `rdfs2:member` | Членство в контейнере |
| `rdfs:Resource` | `rdfs2:Resource` | Определения онтологий |
| `rdfs:Class` | `rdfs2:Class` | Определения онтологий |
| `rdfs:Literal` | `rdfs2:Literal` | Определения онтологий |
| `rdfs:Datatype` | `rdfs2:Datatype` | Определения онтологий |

## Термины без аналогов в RDF/RDFS  

Следующие термины **не имеют** аналогов в RDF/RDFS и всегда используются с префиксом `onto:` (или другим пространством имён, например `owl:`, `xsd:`):  

| Термин | Пространство имён | Комментарий |
|---|---|---|
| `owl:Class` | OWL | Класс OWL |
| `owl:ObjectProperty` | OWL | Объектное свойство |
| `owl:DatatypeProperty` | OWL | Свойство-литерал |
| `owl:equivalentClass` | OWL | Эквивалентность классов |
| `owl:equivalentProperty` | OWL | Эквивалентность свойств |
| `xsd:string` | XSD | Строковый тип данных |
| `xsd:integer` | XSD | Целочисленный тип |
| `onto:Person` | onto | Уникальный класс |
| `onto:hasAddress` | onto | Уникальное свойство |
| `onto:streetAddress` | onto | Уникальное свойство |
| ... | ... | ... |

## Правило для `rdf2:type` вместо `a`  

В стандартном Turtle `a` — это сокращение для `rdf:type`. Поскольку мы используем `rdf2:type`, в документах **не следует** использовать `a`. Всегда пишите:  

```
ex:alice rdf2:type onto:Person .
```

Это делает соответствие явным и не зависит от «магического» сокращения.

## Пример применения  

### Данные (test1.md)  

```
ex:alice rdf2:type onto:Person ;  
    rdfs2:label "Алиса" ;  
    onto:hasAddress ex:aliceAddress .  
```

- `rdf2:type` — аналог `rdf:type`.
- `rdfs2:label` — аналог `rdfs:label`.
- `onto:hasAddress` — уникальное свойство, аналога в RDF/RDFS нет.

### Онтология (ontology1.md)  

```
onto:Person rdf2:type owl:Class ;  
    rdfs2:label "Person"@en ;  
    rdfs2:comment "Человек или вымышленный персонаж."@ru ;  
    owl:equivalentClass <http://schema.org/Person> .  
```

- `rdf2:type` — аналог `rdf:type`.
- `rdfs2:label`, `rdfs2:comment` — аналоги RDFS.
- `owl:Class`, `owl:equivalentClass` — термины OWL, аналогов в RDF/RDFS нет.

## Формат файлов  

Все `.md` файлы содержат «сырой» Turtle:  

- Никаких code fences.  
- В конце каждой строки — два пробела (для отображения в Markdown).  
- `#` в начале строки — заголовок Markdown и комментарий Turtle одновременно.  
- URIs в `<...>` отображаются GitHub как автолинки, но парсер читает их корректно.  

## Ссылки  

- [RDF 1.1 Primer (W3C)](https://www.w3.org/TR/rdf11-primer/)  
- [RDF Schema 1.1 (W3C)](https://www.w3.org/TR/rdf-schema/)  
- [OWL 2 Web Ontology Language (W3C)](https://www.w3.org/TR/owl2-overview/)  
- [Turtle (W3C)](https://www.w3.org/TR/turtle/)  
```

---

## 📊 Итоговая сводка изменений

| Файл | Что изменилось |
|---|---|
| `rdf2.md` | Переименован из `rdf2en.md`; использует `rdf2:type`, `rdfs2:label`, `rdfs2:comment` |
| `rdfs2.md` | Переименован из `rdfs2en.md`; использует `rdf2:type`, `rdfs2:label`, `rdfs2:comment` |
| `ontology1.md` | `a` → `rdf2:type`; `rdfs:*` → `rdfs2:*`; `owl:*` без изменений |
| `test1.md` | `rdf:type` → `rdf2:type`; `onto:label` → `rdfs2:label` |
| `rules.md` | **Новый файл** с правилами выбора префиксов |

**Ссылки:**
- RDF 1.1 Primer (W3C) — https://www.w3.org/TR/rdf11-primer/
- RDF Schema 1.1 (W3C) — https://www.w3.org/TR/rdf-schema/
- OWL 2 Overview (W3C) — https://www.w3.org/TR/owl2-overview/
- Turtle (W3C) — https://www.w3.org/TR/turtle/
