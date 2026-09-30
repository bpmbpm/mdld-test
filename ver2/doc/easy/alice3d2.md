## 1

Вы правы: в предыдущих версиях файлов я использовал `rdf:` и `onto:name`, что противоречит вашей архитектуре. Исправляю всё.

## 📌 Что меняется

| Было | Стало | Причина |
|---|---|---|
| `rdf2en.md` | **`rdf2.md`** | Единообразное именование |
| `rdfs2en.md` | **`rdfs2.md`** | Единообразное именование |
| `@prefix rdf:` | **`@prefix rdf2:`** | Используем собственный словарь |
| `onto:name` | **`onto:label`** | `rdfs:label` — стандартный аналог для меток |

`onto:label` определяется как `owl:equivalentProperty rdfs:label`. Это позволяет использовать его в данных, сохраняя совместимость со стандартными RDF-инструментами.

---

## 📄 1. `ver1/rdf2.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2.md`

```markdown
# RDF Vocabulary (документация)  

**Префикс:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2.md#`  
**Разделитель:** `#` (hash namespace)  
**Назначение:** Английские имена для стандартного пространства `rdf:` с русскими описаниями.  

@prefix rdf2: <https://github.com/bpmbpm/onto/blob/main/ver1/rdf2.md#> .  
@prefix owl: <http://www.w3.org/2002/07/owl#> .  
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .  
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .  

# Classes  

## Property  

rdf2:Property a owl:Class ;  
    rdfs:label "Property"@en ;  
    rdfs:label "Свойство"@ru ;  
    rdfs:comment "Класс, представляющий RDF-свойство (предикат)."@ru ;  
    owl:equivalentClass rdf:Property .  

## Statement  

rdf2:Statement a owl:Class ;  
    rdfs:label "Statement"@en ;  
    rdfs:label "Утверждение"@ru ;  
    rdfs:comment "Класс, представляющий RDF-утверждение (реифицированный триплет)."@ru ;  
    owl:equivalentClass rdf:Statement .  

## List  

rdf2:List a owl:Class ;  
    rdfs:label "List"@en ;  
    rdfs:label "Список"@ru ;  
    rdfs:comment "Класс RDF-списка."@ru ;  
    owl:equivalentClass rdf:List .  

# Properties  

## type  

rdf2:type a owl:ObjectProperty ;  
    rdfs:label "type"@en ;  
    rdfs:label "тип"@ru ;  
    rdfs:comment "Указывает, что ресурс является экземпляром класса."@ru ;  
    owl:equivalentProperty rdf:type .  

## subject  

rdf2:subject a owl:ObjectProperty ;  
    rdfs:label "subject"@en ;  
    rdfs:label "субъект"@ru ;  
    rdfs:comment "Субъект RDF-утверждения."@ru ;  
    owl:equivalentProperty rdf:subject .  

## predicate  

rdf2:predicate a owl:ObjectProperty ;  
    rdfs:label "predicate"@en ;  
    rdfs:label "предикат"@ru ;  
    rdfs:comment "Предикат RDF-утверждения."@ru ;  
    owl:equivalentProperty rdf:predicate .  

## object  

rdf2:object a owl:ObjectProperty ;  
    rdfs:label "object"@en ;  
    rdfs:label "объект"@ru ;  
    rdfs:comment "Объект RDF-утверждения."@ru ;  
    owl:equivalentProperty rdf:object .  

## first  

rdf2:first a owl:ObjectProperty ;  
    rdfs:label "first"@en ;  
    rdfs:label "первый"@ru ;  
    rdfs:comment "Первый элемент RDF-списка."@ru ;  
    owl:equivalentProperty rdf:first .  

## rest  

rdf2:rest a owl:ObjectProperty ;  
    rdfs:label "rest"@en ;  
    rdfs:label "остаток"@ru ;  
    rdfs:comment "Остаток RDF-списка."@ru ;  
    owl:equivalentProperty rdf:rest .  

## value  

rdf2:value a owl:DatatypeProperty ;  
    rdfs:label "value"@en ;  
    rdfs:label "значение"@ru ;  
    rdfs:comment "Значение свойства."@ru ;  
    owl:equivalentProperty rdf:value .  
```

---

## 📄 2. `ver1/rdfs2.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2.md`

```markdown
# RDFS Vocabulary (документация)  

**Префикс:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2.md#`  
**Разделитель:** `#` (hash namespace)  
**Назначение:** Английские имена для стандартного пространства `rdfs:` с русскими описаниями.  

@prefix rdfs2: <https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2.md#> .  
@prefix owl: <http://www.w3.org/2002/07/owl#> .  
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .  

# Classes  

## Resource  

rdfs2:Resource a owl:Class ;  
    rdfs:label "Resource"@en ;  
    rdfs:label "Ресурс"@ru ;  
    rdfs:comment "Всё, что может быть описано в RDF."@ru ;  
    owl:equivalentClass rdfs:Resource .  

## Class  

rdfs2:Class a owl:Class ;  
    rdfs:label "Class"@en ;  
    rdfs:label "Класс"@ru ;  
    rdfs:comment "Класс RDFS, определяющий группы ресурсов."@ru ;  
    owl:equivalentClass rdfs:Class .  

## Literal  

rdfs2:Literal a owl:Class ;  
    rdfs:label "Literal"@en ;  
    rdfs:label "Литерал"@ru ;  
    rdfs:comment "Класс литералов."@ru ;  
    owl:equivalentClass rdfs:Literal .  

## Datatype  

rdfs2:Datatype a owl:Class ;  
    rdfs:label "Datatype"@en ;  
    rdfs:label "Тип данных"@ru ;  
    rdfs:comment "Класс типов данных."@ru ;  
    owl:equivalentClass rdfs:Datatype .  

# Properties  

## subClassOf  

rdfs2:subClassOf a owl:ObjectProperty ;  
    rdfs:label "subClassOf"@en ;  
    rdfs:label "подкласс"@ru ;  
    rdfs:comment "Отношение между классом и его подклассом."@ru ;  
    owl:equivalentProperty rdfs:subClassOf .  

## subPropertyOf  

rdfs2:subPropertyOf a owl:ObjectProperty ;  
    rdfs:label "subPropertyOf"@en ;  
    rdfs:label "подсвойство"@ru ;  
    rdfs:comment "Отношение между свойством и его подсвойством."@ru ;  
    owl:equivalentProperty rdfs:subPropertyOf .  

## domain  

rdfs2:domain a owl:ObjectProperty ;  
    rdfs:label "domain"@en ;  
    rdfs:label "область определения"@ru ;  
    rdfs:comment "Область определения свойства."@ru ;  
    owl:equivalentProperty rdfs:domain .  

## range  

rdfs2:range a owl:ObjectProperty ;  
    rdfs:label "range"@en ;  
    rdfs:label "область значений"@ru ;  
    rdfs:comment "Область значений свойства."@ru ;  
    owl:equivalentProperty rdfs:range .  

## label  

rdfs2:label a owl:DatatypeProperty ;  
    rdfs:label "label"@en ;  
    rdfs:label "метка"@ru ;  
    rdfs:comment "Человекочитаемая метка ресурса."@ru ;  
    owl:equivalentProperty rdfs:label .  

## comment  

rdfs2:comment a owl:DatatypeProperty ;  
    rdfs:label "comment"@en ;  
    rdfs:label "комментарий"@ru ;  
    rdfs:comment "Комментарий к ресурсу."@ru ;  
    owl:equivalentProperty rdfs:comment .  

## seeAlso  

rdfs2:seeAlso a owl:ObjectProperty ;  
    rdfs:label "seeAlso"@en ;  
    rdfs:label "см. также"@ru ;  
    rdfs:comment "Ссылка на дополнительную информацию."@ru ;  
    owl:equivalentProperty rdfs:seeAlso .  

## isDefinedBy  

rdfs2:isDefinedBy a owl:ObjectProperty ;  
    rdfs:label "isDefinedBy"@en ;  
    rdfs:label "определён в"@ru ;  
    rdfs:comment "Указывает, где определён ресурс."@ru ;  
    owl:equivalentProperty rdfs:isDefinedBy .  

## member  

rdfs2:member a owl:ObjectProperty ;  
    rdfs:label "member"@en ;  
    rdfs:label "член"@ru ;  
    rdfs:comment "Член контейнера."@ru ;  
    owl:equivalentProperty rdfs:member .  
```

---

## 📄 3. `ver1/ontology1.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md`

```markdown
# Custom Ontology v1  

@prefix onto: <https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#> .  
@prefix owl: <http://www.w3.org/2002/07/owl#> .  
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .  
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .  
@prefix rdfs2: <https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2.md#> .  

# Classes  

## Person  

onto:Person a owl:Class ;  
    rdfs:label "Person"@en ;  
    rdfs:label "Персона"@ru ;  
    rdfs:comment "Человек или вымышленный персонаж."@ru ;  
    owl:equivalentClass <http://schema.org/Person> ,  
                        <http://xmlns.com/foaf/0.1/Person> ,  
                        <http://www.w3.org/2006/vcard/ns#Individual> ,  
                        <http://dbpedia.org/ontology/Person> ,  
                        <http://www.w3.org/ns/prov#Person> .  

## PostalAddress  

onto:PostalAddress a owl:Class ;  
    rdfs:label "PostalAddress"@en ;  
    rdfs:label "Почтовый адрес"@ru ;  
    rdfs:comment "Почтовый адрес."@ru ;  
    owl:equivalentClass <http://schema.org/PostalAddress> .  

## Hobby  

onto:Hobby a owl:Class ;  
    rdfs:label "Hobby"@en ;  
    rdfs:label "Увлечение"@ru ;  
    rdfs:comment "Увлечение или хобби."@ru ;  
    owl:equivalentClass <http://schema.org/Thing> .  

# Properties  

## label  

onto:label a owl:DatatypeProperty ;  
    rdfs:label "label"@en ;  
    rdfs:label "метка"@ru ;  
    rdfs:comment "Человекочитаемая метка ресурса."@ru ;  
    rdfs:domain onto:Person ;  
    rdfs:range xsd:string ;  
    owl:equivalentProperty rdfs:label .  

## hasAddress  

onto:hasAddress a owl:ObjectProperty ;  
    rdfs:label "hasAddress"@en ;  
    rdfs:label "имеет адрес"@ru ;  
    rdfs:comment "Связывает персону с её почтовым адресом."@ru ;  
    rdfs:domain onto:Person ;  
    rdfs:range onto:PostalAddress ;  
    owl:equivalentProperty <http://schema.org/address> .  

## streetAddress  

onto:streetAddress a owl:DatatypeProperty ;  
    rdfs:label "streetAddress"@en ;  
    rdfs:label "улица"@ru ;  
    rdfs:comment "Название улицы и номер дома."@ru ;  
    rdfs:domain onto:PostalAddress ;  
    rdfs:range xsd:string ;  
    owl:equivalentProperty <http://schema.org/streetAddress> .  

## addressLocality  

onto:addressLocality a owl:DatatypeProperty ;  
    rdfs:label "addressLocality"@en ;  
    rdfs:label "город"@ru ;  
    rdfs:comment "Название города или населённого пункта."@ru ;  
    rdfs:domain onto:PostalAddress ;  
    rdfs:range xsd:string ;  
    owl:equivalentProperty <http://schema.org/addressLocality> .  

## postalCode  

onto:postalCode a owl:DatatypeProperty ;  
    rdfs:label "postalCode"@en ;  
    rdfs:label "почтовый индекс"@ru ;  
    rdfs:comment "Почтовый индекс."@ru ;  
    rdfs:domain onto:PostalAddress ;  
    rdfs:range xsd:string ;  
    owl:equivalentProperty <http://schema.org/postalCode> .  

## addressCountry  

onto:addressCountry a owl:DatatypeProperty ;  
    rdfs:label "addressCountry"@en ;  
    rdfs:label "страна"@ru ;  
    rdfs:comment "Название страны."@ru ;  
    rdfs:domain onto:PostalAddress ;  
    rdfs:range xsd:string ;  
    owl:equivalentProperty <http://schema.org/addressCountry> .  

## hasHobby  

onto:hasHobby a owl:ObjectProperty ;  
    rdfs:label "hasHobby"@en ;  
    rdfs:label "увлекается"@ru ;  
    rdfs:comment "Связывает персону с её увлечением."@ru ;  
    rdfs:domain onto:Person ;  
    rdfs:range onto:Hobby ;  
    owl:equivalentProperty <http://schema.org/knowsAbout> .  
```

---

## 📄 4. `example1/test1.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/example1/test1.md`

```markdown
# Test Data: Alice and Bob  

@prefix ex: <https://github.com/bpmbpm/onto/blob/main/example1/test1.md#> .  
@prefix onto: <https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#> .  
@prefix rdf2: <https://github.com/bpmbpm/onto/blob/main/ver1/rdf2.md#> .  

# Alice  

ex:alice rdf2:type onto:Person ;  
    onto:label "Алиса" ;  
    onto:hasAddress ex:aliceAddress ;  
    onto:hasHobby ex:aliceHobbyPhoto , ex:aliceHobbyChess .  

ex:aliceAddress rdf2:type onto:PostalAddress ;  
    onto:label "Адрес Алисы" ;  
    onto:streetAddress "ул. Ленина, д. 10" ;  
    onto:addressLocality "Москва" ;  
    onto:postalCode "101000" ;  
    onto:addressCountry "Россия" .  

ex:aliceHobbyPhoto rdf2:type onto:Hobby ;  
    onto:label "Фотография" .  

ex:aliceHobbyChess rdf2:type onto:Hobby ;  
    onto:label "Шахматы" .  

# Bob  

ex:bob rdf2:type onto:Person ;  
    onto:label "Боб" ;  
    onto:hasAddress ex:bobAddress ;  
    onto:hasHobby ex:bobHobbyBike , ex:bobHobbyCode .  

ex:bobAddress rdf2:type onto:PostalAddress ;  
    onto:label "Адрес Боба" ;  
    onto:streetAddress "ул. Пушкина, д. 25" ;  
    onto:addressLocality "Химки" ;  
    onto:postalCode "141400" ;  
    onto:addressCountry "Россия" .  

ex:bobHobbyBike rdf2:type onto:Hobby ;  
    onto:label "Велоспорт" .  

ex:bobHobbyCode rdf2:type onto:Hobby ;  
    onto:label "Программирование" .  
```

---

## 📄 5. `anchor.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/anchor.md`

Файл остаётся без изменений — правила якорей не зависят от имён префиксов.

---

## ✅ Сводка изменений

| Файл | Что изменилось |
|---|---|
| `ver1/rdf2.md` | Переименован из `rdf2en.md`; префикс `rdf2:` |
| `ver1/rdfs2.md` | Переименован из `rdfs2en.md`; префикс `rdfs2:` |
| `ver1/ontology1.md` | `onto:name` → `onto:label`; `onto:label` эквивалентен `rdfs:label` |
| `example1/test1.md` | `rdf:` → `rdf2:`; `onto:name` → `onto:label` |

**Ссылки:**
- RDFS label (W3C) — https://www.w3.org/TR/rdf-schema/#ch_label
- OWL equivalentProperty — https://www.w3.org/TR/owl-ref/#equivalentProperty
