## 1

Вы абсолютно правы. Проблема реальна: RDF-парсер не понимает ` ```turtle ... ``` `, а без code fence Markdown «склеивает» строки в один абзац. Решение — использовать **два пробела в конце каждой строки** (hard line break в CommonMark) и **`#` как заголовки Markdown, которые одновременно являются комментариями Turtle**.

### 🧩 Ключевые принципы

1. **Никаких code fences.** Содержимое `.md` — это «сырой» Turtle.
2. **Два пробела в конце каждой строки** — чтобы GitHub отрисовал перенос строки, а не склеил всё в абзац.
3. **`#` в начале строки** — заголовок Markdown и **комментарий Turtle** одновременно. Для парсера RDF — игнорируется, для человека — структура.
4. **`##`, `###`** — работают так же: в Turtle это комментарий (первый `#` открывает комментарий до конца строки), в Markdown — разные уровни заголовков.
5. **Только `#` как комментарий.** Никаких `//` или `/* */`.
6. **`<IRI>`** в Turtle — GitHub отрендерит как автолинк (без угловых скобок). Это приемлемо: читатель видит кликабельную ссылку, парсер читает полный IRI.

> ⚠️ **Важно:** в этом ответе два пробела в конце строк могут быть не видны визуально. Если вы копируете файл — убедитесь, что каждая строка (кроме пустых) заканчивается **ровно двумя пробелами**. В редакторе включите отображение пробелов (`View → Render Whitespace` в VS Code).

---

## 📄 `example1/test1.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/example1/test1.md`

Содержимое (каждая строка данных заканчивается двумя пробелами):

```markdown
# Test Data: Alice and Bob

@prefix ex: <https://github.com/bpmbpm/onto/blob/main/example1/test1.md#> .  
@prefix onto: <https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#> .  
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .  

# Alice  

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

# Bob  

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

**Что видит RDF-парсер (сырой текст):**
- `# Test Data: Alice and Bob` — комментарий.
- `@prefix ...` — объявления префиксов.
- `# Alice` — комментарий.
- `ex:alice rdf:type onto:Person ;` — начало триплета.
- Продолжение через `;` — на следующих строках.
- Завершение `.` — конец триплета.

**Что видит человек на GitHub:**
- Заголовок H1 «Test Data: Alice and Bob».
- Строки Turtle с принудительными переносами (благодаря двум пробелам).
- Заголовок H1 «Alice» (но визуально он выглядит как заголовок, а для RDF это комментарий).
- URIs в `<...>` отображаются как кликабельные ссылки.

---

## 📄 `ver1/ontology1.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md`

Содержимое в том же формате — «сырой» Turtle с `#`-заголовками:

```markdown
# Custom Ontology v1  

@prefix onto: <https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#> .  
@prefix owl: <http://www.w3.org/2002/07/owl#> .  
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .  
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .  

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

## name  

onto:name a owl:DatatypeProperty ;  
    rdfs:label "name"@en ;  
    rdfs:label "имя"@ru ;  
    rdfs:comment "Полное имя персоны."@ru ;  
    rdfs:domain onto:Person ;  
    rdfs:range xsd:string ;  
    owl:equivalentProperty <http://schema.org/name> ,  
                           <http://xmlns.com/foaf/0.1/name> .  

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

**Важно:** весь файл — валидный Turtle (комментарии + триплеты). Никаких «висящих» текстовых описаний. Вся документация перенесена в `rdfs:label` и `rdfs:comment`.

---

## 📄 `ver1/rdf2en.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md`

Аналогично — валидный Turtle с русскими `rdfs:comment`:

```markdown
# RDF English Vocabulary  

@prefix rdf2en: <https://github.com/bpmbpm/onto/blob/main/ver1/rdf2en.md#> .  
@prefix owl: <http://www.w3.org/2002/07/owl#> .  
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .  
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .  

# Classes  

## Property  

rdf2en:Property a owl:Class ;  
    rdfs:label "Property"@en ;  
    rdfs:label "Свойство"@ru ;  
    rdfs:comment "Класс, представляющий RDF-свойство (предикат)."@ru ;  
    owl:equivalentClass rdf:Property .  

## Statement  

rdf2en:Statement a owl:Class ;  
    rdfs:label "Statement"@en ;  
    rdfs:label "Утверждение"@ru ;  
    rdfs:comment "Класс, представляющий RDF-утверждение (реифицированный триплет)."@ru ;  
    owl:equivalentClass rdf:Statement .  

## List  

rdf2en:List a owl:Class ;  
    rdfs:label "List"@en ;  
    rdfs:label "Список"@ru ;  
    rdfs:comment "Класс RDF-списка."@ru ;  
    owl:equivalentClass rdf:List .  

# Properties  

## type  

rdf2en:type a owl:ObjectProperty ;  
    rdfs:label "type"@en ;  
    rdfs:label "тип"@ru ;  
    rdfs:comment "Указывает, что ресурс является экземпляром класса."@ru ;  
    owl:equivalentProperty rdf:type .  

## subject  

rdf2en:subject a owl:ObjectProperty ;  
    rdfs:label "subject"@en ;  
    rdfs:label "субъект"@ru ;  
    rdfs:comment "Субъект RDF-утверждения."@ru ;  
    owl:equivalentProperty rdf:subject .  

## predicate  

rdf2en:predicate a owl:ObjectProperty ;  
    rdfs:label "predicate"@en ;  
    rdfs:label "предикат"@ru ;  
    rdfs:comment "Предикат RDF-утверждения."@ru ;  
    owl:equivalentProperty rdf:predicate .  

## object  

rdf2en:object a owl:ObjectProperty ;  
    rdfs:label "object"@en ;  
    rdfs:label "объект"@ru ;  
    rdfs:comment "Объект RDF-утверждения."@ru ;  
    owl:equivalentProperty rdf:object .  

## first  

rdf2en:first a owl:ObjectProperty ;  
    rdfs:label "first"@en ;  
    rdfs:label "первый"@ru ;  
    rdfs:comment "Первый элемент RDF-списка."@ru ;  
    owl:equivalentProperty rdf:first .  

## rest  

rdf2en:rest a owl:ObjectProperty ;  
    rdfs:label "rest"@en ;  
    rdfs:label "остаток"@ru ;  
    rdfs:comment "Остаток RDF-списка."@ru ;  
    owl:equivalentProperty rdf:rest .  

## value  

rdf2en:value a owl:DatatypeProperty ;  
    rdfs:label "value"@en ;  
    rdfs:label "значение"@ru ;  
    rdfs:comment "Значение свойства."@ru ;  
    owl:equivalentProperty rdf:value .  
```

---

## 📄 `ver1/rdfs2en.md`

**URL:** `https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md`

```markdown
# RDFS English Vocabulary  

@prefix rdfs2en: <https://github.com/bpmbpm/onto/blob/main/ver1/rdfs2en.md#> .  
@prefix owl: <http://www.w3.org/2002/07/owl#> .  
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .  

# Classes  

## Resource  

rdfs2en:Resource a owl:Class ;  
    rdfs:label "Resource"@en ;  
    rdfs:label "Ресурс"@ru ;  
    rdfs:comment "Всё, что может быть описано в RDF."@ru ;  
    owl:equivalentClass rdfs:Resource .  

## Class  

rdfs2en:Class a owl:Class ;  
    rdfs:label "Class"@en ;  
    rdfs:label "Класс"@ru ;  
    rdfs:comment "Класс RDFS, определяющий группы ресурсов."@ru ;  
    owl:equivalentClass rdfs:Class .  

## Literal  

rdfs2en:Literal a owl:Class ;  
    rdfs:label "Literal"@en ;  
    rdfs:label "Литерал"@ru ;  
    rdfs:comment "Класс литералов."@ru ;  
    owl:equivalentClass rdfs:Literal .  

## Datatype  

rdfs2en:Datatype a owl:Class ;  
    rdfs:label "Datatype"@en ;  
    rdfs:label "Тип данных"@ru ;  
    rdfs:comment "Класс типов данных."@ru ;  
    owl:equivalentClass rdfs:Datatype .  

# Properties  

## subClassOf  

rdfs2en:subClassOf a owl:ObjectProperty ;  
    rdfs:label "subClassOf"@en ;  
    rdfs:label "подкласс"@ru ;  
    rdfs:comment "Отношение между классом и его подклассом."@ru ;  
    owl:equivalentProperty rdfs:subClassOf .  

## subPropertyOf  

rdfs2en:subPropertyOf a owl:ObjectProperty ;  
    rdfs:label "subPropertyOf"@en ;  
    rdfs:label "подсвойство"@ru ;  
    rdfs:comment "Отношение между свойством и его подсвойством."@ru ;  
    owl:equivalentProperty rdfs:subPropertyOf .  

## domain  

rdfs2en:domain a owl:ObjectProperty ;  
    rdfs:label "domain"@en ;  
    rdfs:label "область определения"@ru ;  
    rdfs:comment "Область определения свойства."@ru ;  
    owl:equivalentProperty rdfs:domain .  

## range  

rdfs2en:range a owl:ObjectProperty ;  
    rdfs:label "range"@en ;  
    rdfs:label "область значений"@ru ;  
    rdfs:comment "Область значений свойства."@ru ;  
    owl:equivalentProperty rdfs:range .  

## label  

rdfs2en:label a owl:DatatypeProperty ;  
    rdfs:label "label"@en ;  
    rdfs:label "метка"@ru ;  
    rdfs:comment "Человекочитаемая метка ресурса."@ru ;  
    owl:equivalentProperty rdfs:label .  

## comment  

rdfs2en:comment a owl:DatatypeProperty ;  
    rdfs:label "comment"@en ;  
    rdfs:label "комментарий"@ru ;  
    rdfs:comment "Комментарий к ресурсу."@ru ;  
    owl:equivalentProperty rdfs:comment .  

## seeAlso  

rdfs2en:seeAlso a owl:ObjectProperty ;  
    rdfs:label "seeAlso"@en ;  
    rdfs:label "см. также"@ru ;  
    rdfs:comment "Ссылка на дополнительную информацию."@ru ;  
    owl:equivalentProperty rdfs:seeAlso .  

## isDefinedBy  

rdfs2en:isDefinedBy a owl:ObjectProperty ;  
    rdfs:label "isDefinedBy"@en ;  
    rdfs:label "определён в"@ru ;  
    rdfs:comment "Указывает, где определён ресурс."@ru ;  
    owl:equivalentProperty rdfs:isDefinedBy .  

## member  

rdfs2en:member a owl:ObjectProperty ;  
    rdfs:label "member"@en ;  
    rdfs:label "член"@ru ;  
    rdfs:comment "Член контейнера."@ru ;  
    owl:equivalentProperty rdfs:member .  
```

---

## 📄 `anchor.md` — правила обработки якорей

**URL:** `https://github.com/bpmbpm/onto/blob/main/anchor.md`

```markdown
# Правила обработки якорей на GitHub

GitHub автоматически генерирует `id` для каждого заголовка Markdown при рендеринге. Алгоритм основан на библиотеке `github-slugger`.

## Основные правила

1. Приведение к нижнему регистру.  
2. Пробелы заменяются на дефисы.  
3. Дефисы сохраняются.  
4. Знаки препинания удаляются.  
5. Кириллица сохраняется и приводится к нижнему регистру.  
6. Коллизии разрешаются суффиксом `-1`, `-2` и т.д.  

## Примеры

### Person  

Сгенерированный id: person  
Ссылка: #person  

### PostalAddress  

Сгенерированный id: postaladdress  
Ссылка: #postaladdress  

### hasAddress  

Сгенерированный id: hasaddress  
Ссылка: #hasaddress  

### Exe1-1  

Сгенерированный id: exe1-1  
Ссылка: #exe1-1  

### Алиса  

Сгенерированный id: алиса  
Ссылка: #алиса  

## Обработка дубликатов

Если в файле два заголовка дают одинаковый id, первый получает id без суффикса, второй — с `-1`.

Пример:

### exe  

Первый раздел.  

### Exe  

Второй раздел.  

GitHub сгенерирует `id="exe"` для первого и `id="exe-1"` для второго. Ссылка `#Exe` нормализуется в `#exe` и откроет первый раздел. Чтобы попасть во второй — `#exe-1`.

## Кириллица и percent-encoding

Кириллические символы в URL должны быть percent-encoded. Браузеры обычно делают это автоматически.

Пример:  
Заголовок `### Алиса` → id `алиса`.  
Ссылка `#алиса` работает.  
Percent-encoded: `#%D0%B0%D0%BB%D0%B8%D1%81%D0%B0`.  

## Ссылки

- GitHub: создание якорей — https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#section-links  
- github-slugger (npm) — https://www.npmjs.com/package/github-slugger  
```

---

## 📊 Сводка

| Аспект | Решение |
|---|---|
| **Code fences** | Не используются. Содержимое `.md` — «сырой» Turtle. |
| **Перенос строк в Markdown** | Два пробела в конце каждой строки → `<br>` |
| **Заголовки** | `#`, `##`, `###` — одновременно заголовок Markdown и комментарий Turtle |
| **Комментарии Turtle** | Начинаются с `#`. Совпадают с заголовками Markdown |
| **URIs в `<...>`** | GitHub отрендерит как автолинки. Парсер читает полный IRI |
| **Документация** | Перенесена в `rdfs:label` и `rdfs:comment` |
| **Кириллица в якорях** | Работает, если только нижний регистр |

### ⚠️ Ограничения

1. **Trailing spaces могут быть утеряны** при копировании через некоторые редакторы/буферы. Проверьте файл после коммита.
2. **GitHub отрендерит `<...>` как ссылку.** Если это нежелательно — используйте percent-encoded `<` и `>` (`%3C`, `%3E`), но тогда Turtle не распарсится. Компромисс неизбежен.
3. **`*` в тексте** может запустить курсив в Markdown. В Turtle `*` не используется, так что проблемы нет.
4. **`_` в именах** может запустить курсив. Мы используем camelCase — проблема не возникает.

**Ссылки:**
- CommonMark: hard line breaks — https://spec.commonmark.org/0.31.2/#hard-line-breaks
- Turtle: комментарии — https://www.w3.org/TR/turtle/#sec-grammar-grammar
- GitHub: автолинки — https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#autolinked-references-and-urls

## 2

Эта строка — корректное объявление префикса `rdf:` в Turtle. Но в контексте «сырого Turtle внутри `.md`» у неё есть **две тонкости**, которые стоит учесть.

### 🧩 Тонкость 1. Два пробела в конце

Чтобы GitHub не склеил строку со следующей, после `.` нужно поставить **два пробела**:

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .··
```

(где `··` — два пробела). Иначе следующая строка прильнёт к этой.

### 🧩 Тонкость 2. Завершающий `#` в IRI

IRI `http://www.w3.org/1999/02/22-rdf-syntax-ns#` заканчивается на `#`. Это **правильно** с точки зрения RDF: `#` — часть пространства имён (hash namespace), и именно к нему «приклеиваются» локальные имена (`rdf:type` → `http://www.w3.org/1999/02/22-rdf-syntax-ns#type`).

Но при рендеринге GitHub возможны два поведения:

| Что делает GitHub | Как выглядит |
|---|---|
| **Автолинк** `<...>` | `http://www.w3.org/1999/02/22-rdf-syntax-ns#` превращается в кликабельную ссылку |
| **Якорь** `#` внутри страницы | В некоторых рендерерах `#` после URL может интерпретироваться как фрагмент |

На практике GitHub обрабатывает `<http://...>` как **автолинк** и оставляет `#` в составе URL. Парсеру RDF это не мешает — он читает исходный текст, а не отрендеренный HTML.

### ✅ Как выглядит полный блок префиксов

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .··
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .··
@prefix owl: <http://www.w3.org/2002/07/owl#> .··
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .··
@prefix onto: <https://github.com/bpmbpm/onto/blob/main/ver1/ontology1.md#> .··
@prefix ex: <https://github.com/bpmbpm/onto/blob/main/example1/test1.md#> .··
```

### 💡 Рекомендация

Если вас смущает «голый» `#` в конце IRI на отрендеренной странице — есть обходной приём: **percent-encoded `#`** (`%23`).

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns%23> .··
```

**Но:** RDF-парсеры **не декодируют** percent-encoding в IRI — для них `%23` останется `%23`, а не `#`. Это **сломает** все триплеты с префиксом `rdf:`. Поэтому **не делайте так**.

Правильный подход: оставить `#` как есть. Это стандарт для hash-namespace, и все RDF-инструменты (Protégé, Jena, rdflib) именно так и работают.

### 📊 Итог

| Вопрос | Ответ |
|---|---|
| Синтаксис `@prefix rdf: <...rdf-syntax-ns#> .` корректен? | ✅ Да |
| Нужны ли два пробела в конце? | ✅ Да, иначе Markdown склеит строки |
| `#` в конце IRI — это правильно? | ✅ Да, это стандарт hash-namespace |
| Заменять `#` на `%23`? | ❌ Нет, это сломает парсер |
| GitHub отрендерит как ссылку? | ⚠️ Да, но парсер читает исходный текст |

**Ссылки:**
- Turtle: IRI references — https://www.w3.org/TR/turtle/#sec-iri-references
- Hash namespaces vs slash namespaces (W3C) — https://www.w3.org/TR/cooluris/#hashvs
- CommonMark: hard line breaks — https://spec.commonmark.org/0.31.2/#hard-line-breaks
