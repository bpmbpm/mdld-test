## 1

1 Создай собственную онтологию, адрес по адресу https://bpmbpm.github.io/onto/ver1/ontology1.md
Не используй, стандартные: 
```
@prefix schema: <http://schema.org/>.
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
```
и другие.
Объекты (вне онтологии) Алиса и т.п. – имеют id в пространстве имен:  
https://bpmbpm.github.io/onto/example1/test1.md

В онтологии укажи аналоги из других онтологий, например, для класса Person перечисленных тут https://github.com/bpmbpm/mdld-test/blob/main/ver2/doc/easy/alice.md#-%D0%B4%D1%80%D1%83%D0%B3%D0%B8%D0%B5-%D0%BE%D0%BD%D1%82%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D0%B8-%D0%B4%D0%BB%D1%8F-%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D1%8F-%D0%BF%D0%B5%D1%80%D1%81%D0%BE%D0%BD

Разделитель через # (т.е. классический вариант для словарей, публикуемых одним файлом.)

2 Переделай файл триплетов и создай онтологию для фрагмента:
```
@prefix ex: <tag:example.org,2026:>.
@prefix schema: <http://schema.org/>.
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

ex:alice a schema:Person;
    schema:name "Алиса";
    schema:address ex:alice-addr;
    schema:knowsAbout ex:alice-hobby-photo, ex:alice-hobby-chess.
ex:alice-addr a schema:PostalAddress;
    schema:name "Адрес Алисы";
    schema:streetAddress "ул. Ленина, д. 10";
    schema:addressLocality "Москва";
    schema:postalCode "101000";
    schema:addressCountry "Россия".
ex:alice-hobby-photo a schema:Thing;
    schema:name "Фотография".
ex:alice-hobby-chess a schema:Thing;
    schema:name "Шахматы".
ex:bob a schema:Person;
    schema:name "Боб";
    schema:address ex:bob-addr;
    schema:knowsAbout ex:bob-hobby-bike, ex:bob-hobby-code.
ex:bob-addr a schema:PostalAddress;
    schema:name "Адрес Боба";
    schema:streetAddress "ул. Пушкина, д. 25";
    schema:addressLocality "Химки";
    schema:postalCode "141400";
    schema:addressCountry "Россия".
ex:bob-hobby-bike a schema:Thing;
    schema:name "Велоспорт".
ex:bob-hobby-code a schema:Thing;
    schema:name "Программирование".
```

Все имена (объекты, субъекты, предикаты) – на русском, на английском только сокращения префиксов ex: для сокращения https://bpmbpm.github.io/onto/example1/test1.md, а onto: для https://bpmbpm.github.io/onto/ver1/ontology1.md

3 Найди русскоязычные онтологии, где сущности и предикаты на русском.

## r

Выполняю ваши задания по порядку: создание онтологии, переработка триплетов и поиск русскоязычных онтологий.

### 1. Создание собственной онтологии (`ontology1.md`)

Ниже представлен код онтологии, который нужно разместить по адресу `https://bpmbpm.github.io/onto/ver1/ontology1.md`. В нём используется префикс `onto:`, разделитель `#` и указаны аналоги из других словарей (на основе данных из вашего файла `alice.md`).

```turtle
# Онтология для описания персон и их атрибутов
# Префикс: https://bpmbpm.github.io/onto/ver1/ontology1.md#
# Разделитель: # (hash namespace)

@prefix onto: <https://bpmbpm.github.io/onto/ver1/ontology1.md#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .

# --- Классы ---

# Класс "Персона"
onto:Персона a owl:Class ;
    rdfs:label "Персона"@ru ;
    rdfs:comment "Класс, представляющий человека или вымышленный персонаж."@ru ;
    # Аналоги из других онтологий:
    owl:equivalentClass <http://schema.org/Person> ,
                        <http://xmlns.com/foaf/0.1/Person> ,
                        <http://www.w3.org/2006/vcard/ns#Individual> ,
                        <http://dbpedia.org/ontology/Person> ,
                        <http://www.w3.org/ns/prov#Person> .

# Класс "ПочтовыйАдрес"
onto:ПочтовыйАдрес a owl:Class ;
    rdfs:label "Почтовый адрес"@ru ;
    rdfs:comment "Класс для описания почтового адреса."@ru ;
    owl:equivalentClass <http://schema.org/PostalAddress> .

# Класс "Увлечение"
onto:Увлечение a owl:Class ;
    rdfs:label "Увлечение"@ru ;
    rdfs:comment "Класс для описания хобби или увлечения."@ru ;
    owl:equivalentClass <http://schema.org/Thing> .

# --- Свойства (Properties) ---

# Свойство "имя"
onto:имя a owl:DatatypeProperty ;
    rdfs:label "имя"@ru ;
    rdfs:comment "Полное имя персоны."@ru ;
    rdfs:domain onto:Персона ;
    rdfs:range <http://www.w3.org/2001/XMLSchema#string> ;
    owl:equivalentProperty <http://schema.org/name> ,
                           <http://xmlns.com/foaf/0.1/name> .

# Свойство "имеетАдрес"
onto:имеетАдрес a owl:ObjectProperty ;
    rdfs:label "имеет адрес"@ru ;
    rdfs:comment "Связывает персону с её почтовым адресом."@ru ;
    rdfs:domain onto:Персона ;
    rdfs:range onto:ПочтовыйАдрес ;
    owl:equivalentProperty <http://schema.org/address> .

# Свойство "улица"
onto:улица a owl:DatatypeProperty ;
    rdfs:label "улица"@ru ;
    rdfs:comment "Название улицы и номер дома."@ru ;
    rdfs:domain onto:ПочтовыйАдрес ;
    rdfs:range <http://www.w3.org/2001/XMLSchema#string> ;
    owl:equivalentProperty <http://schema.org/streetAddress> .

# Свойство "город"
onto:город a owl:DatatypeProperty ;
    rdfs:label "город"@ru ;
    rdfs:comment "Название города."@ru ;
    rdfs:domain onto:ПочтовыйАдрес ;
    rdfs:range <http://www.w3.org/2001/XMLSchema#string> ;
    owl:equivalentProperty <http://schema.org/addressLocality> .

# Свойство "почтовыйИндекс"
onto:почтовыйИндекс a owl:DatatypeProperty ;
    rdfs:label "почтовый индекс"@ru ;
    rdfs:comment "Почтовый индекс."@ru ;
    rdfs:domain onto:ПочтовыйАдрес ;
    rdfs:range <http://www.w3.org/2001/XMLSchema#string> ;
    owl:equivalentProperty <http://schema.org/postalCode> .

# Свойство "страна"
onto:страна a owl:DatatypeProperty ;
    rdfs:label "страна"@ru ;
    rdfs:comment "Название страны."@ru ;
    rdfs:domain onto:ПочтовыйАдрес ;
    rdfs:range <http://www.w3.org/2001/XMLSchema#string> ;
    owl:equivalentProperty <http://schema.org/addressCountry> .

# Свойство "увлекается"
onto:увлекается a owl:ObjectProperty ;
    rdfs:label "увлекается"@ru ;
    rdfs:comment "Связывает персону с её увлечением."@ru ;
    rdfs:domain onto:Персона ;
    rdfs:range onto:Увлечение ;
    owl:equivalentProperty <http://schema.org/knowsAbout> .
```

### 2. Переработанный файл триплетов для Алисы и Боба

Ниже — файл `test1.md` (размещается по адресу `https://bpmbpm.github.io/onto/example1/test1.md`), в котором данные переведены на русский язык и используют созданную онтологию.

```turtle
@prefix ex: <https://bpmbpm.github.io/onto/example1/test1.md#> .
@prefix onto: <https://bpmbpm.github.io/onto/ver1/ontology1.md#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# --- Алиса ---
ex:алиса rdf:type onto:Персона ;
    onto:имя "Алиса" ;
    onto:имеетАдрес ex:адрес_алисы ;
    onto:увлекается ex:увлечение_алисы_фотография , ex:увлечение_алисы_шахматы .

ex:адрес_алисы rdf:type onto:ПочтовыйАдрес ;
    onto:имя "Адрес Алисы" ;
    onto:улица "ул. Ленина, д. 10" ;
    onto:город "Москва" ;
    onto:почтовыйИндекс "101000" ;
    onto:страна "Россия" .

ex:увлечение_алисы_фотография rdf:type onto:Увлечение ;
    onto:имя "Фотография" .

ex:увлечение_алисы_шахматы rdf:type onto:Увлечение ;
    onto:имя "Шахматы" .

# --- Боб ---
ex:боб rdf:type onto:Персона ;
    onto:имя "Боб" ;
    onto:имеетАдрес ex:адрес_боба ;
    onto:увлекается ex:увлечение_боба_велоспорт , ex:увлечение_боба_программирование .

ex:адрес_боба rdf:type onto:ПочтовыйАдрес ;
    onto:имя "Адрес Боба" ;
    onto:улица "ул. Пушкина, д. 25" ;
    onto:город "Химки" ;
    onto:почтовыйИндекс "141400" ;
    onto:страна "Россия" .

ex:увлечение_боба_велоспорт rdf:type onto:Увлечение ;
    onto:имя "Велоспорт" .

ex:увлечение_боба_программирование rdf:type onto:Увлечение ;
    onto:имя "Программирование" .
```

### 3. Русскоязычные онтологии

Вот несколько известных русскоязычных онтологий и лингвистических ресурсов, где сущности и предикаты описаны на русском языке.

| Онтология | Краткое описание | Ссылка |
| :--- | :--- | :--- |
| **Russian WordNet (Русский WordNet)** | Лексическая база данных для русского языка, конвертированная в RDF/OWL. | `http://www.labinform.ru/pub/ruthes/` |
| **RuThes (Тезаурус РуТез)** | Лингвистическая онтология, содержащая более 158 тысяч слов и выражений, структурированных в 53,5 тысячи понятий. | `http://www.labinform.ru/pub/ruthes/` |
| **RuWordNet** | Тезаурус русского языка, созданный на основе RuThes, с 115 тысячами уникальных слов и фраз. | `https://ruwordnet.ru` |
| **RTLOD (Russian Thesauri as Linked Open Data)** | Проект по преобразованию русских лексических ресурсов в формат Открытых связанных данных с использованием RDFS, OWL, SKOS, lemon. | `https://github.com/nlpub/rtlod` |
| **OntoMathPRO** | Онтология профессиональной математики, реализованная на языке OWL-DL для классификации математических знаний. | `http://ontology.itlab.ru/ontomathpro` |
| **RussNet** | Лингвистический ресурс, построенный путём лексико-статистического подхода, также доступен в формате RDF. | `http://project.phil.spbu.ru/RussNet/` |

Эти ресурсы показывают, что создание онтологий с русскоязычными именами классов и свойств — это устоявшаяся практика, особенно в области лингвистики и обработки естественного языка.

## 2

Создаю два словаря-онтологии, которые определяют русскоязычные аналоги для основных сущностей RDF и RDFS. Они будут доступны по указанным вами адресам и использовать разделитель `#`.

### 1. Онтология `rdf2ru`

**Адрес размещения:** `https://bpmbpm.github.io/onto/ver1/rdf2ru`

```turtle
# Словарь русскоязычных аналогов для RDF
# Префикс: https://bpmbpm.github.io/onto/ver1/rdf2ru#
# Разделитель: # (hash namespace)

@prefix rdf2ru: <https://bpmbpm.github.io/onto/ver1/rdf2ru#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

# --- Классы ---

rdf2ru:Свойство a owl:Class ;
    rdfs:label "Свойство"@ru ;
    rdfs:comment "Класс, представляющий RDF-свойство (предикат)."@ru ;
    owl:equivalentClass rdf:Property .

rdf2ru:Утверждение a owl:Class ;
    rdfs:label "Утверждение"@ru ;
    rdfs:comment "Класс, представляющий RDF-утверждение (триплет с reification)."@ru ;
    owl:equivalentClass rdf:Statement .

rdf2ru:Список a owl:Class ;
    rdfs:label "Список"@ru ;
    rdfs:comment "Класс RDF-списка (rdf:List)."@ru ;
    owl:equivalentClass rdf:List .

rdf2ru:Мешок a owl:Class ;
    rdfs:label "Мешок"@ru ;
    rdfs:comment "Неупорядоченная коллекция (rdf:Bag)."@ru ;
    owl:equivalentClass rdf:Bag .

rdf2ru:Последовательность a owl:Class ;
    rdfs:label "Последовательность"@ru ;
    rdfs:comment "Упорядоченная коллекция (rdf:Seq)."@ru ;
    owl:equivalentClass rdf:Seq .

rdf2ru:Альтернатива a owl:Class ;
    rdfs:label "Альтернатива"@ru ;
    rdfs:comment "Коллекция альтернатив (rdf:Alt)."@ru ;
    owl:equivalentClass rdf:Alt .

# --- Свойства ---

rdf2ru:тип a owl:ObjectProperty ;
    rdfs:label "тип"@ru ;
    rdfs:comment "Указывает, что ресурс является экземпляром класса (rdf:type)."@ru ;
    owl:equivalentProperty rdf:type .

rdf2ru:субъект a owl:ObjectProperty ;
    rdfs:label "субъект"@ru ;
    rdfs:comment "Субъект RDF-утверждения (rdf:subject)."@ru ;
    owl:equivalentProperty rdf:subject .

rdf2ru:предикат a owl:ObjectProperty ;
    rdfs:label "предикат"@ru ;
    rdfs:comment "Предикат RDF-утверждения (rdf:predicate)."@ru ;
    owl:equivalentProperty rdf:predicate .

rdf2ru:объект a owl:ObjectProperty ;
    rdfs:label "объект"@ru ;
    rdfs:comment "Объект RDF-утверждения (rdf:object)."@ru ;
    owl:equivalentProperty rdf:object .

rdf2ru:значение a owl:DatatypeProperty ;
    rdfs:label "значение"@ru ;
    rdfs:comment "Значение свойства (rdf:value)."@ru ;
    owl:equivalentProperty rdf:value .

rdf2ru:первый a owl:ObjectProperty ;
    rdfs:label "первый"@ru ;
    rdfs:comment "Первый элемент RDF-списка (rdf:first)."@ru ;
    owl:equivalentProperty rdf:first .

rdf2ru:остаток a owl:ObjectProperty ;
    rdfs:label "остаток"@ru ;
    rdfs:comment "Остаток RDF-списка (rdf:rest)."@ru ;
    owl:equivalentProperty rdf:rest .

rdf2ru:пустойСписок a owl:Individual ;
    rdfs:label "пустой список"@ru ;
    rdfs:comment "Пустой RDF-список (rdf:nil)."@ru ;
    owl:sameAs rdf:nil .

rdf2ru:языковойЛитерал a owl:DatatypeProperty ;
    rdfs:label "языковой литерал"@ru ;
    rdfs:comment "Литерал с языковой меткой (rdf:langString)."@ru ;
    owl:equivalentProperty rdf:langString .

rdf2ru:HTML a owl:DatatypeProperty ;
    rdfs:label "HTML"@ru ;
    rdfs:comment "Литерал HTML (rdf:HTML)."@ru ;
    owl:equivalentProperty rdf:HTML .

rdf2ru:XMLЛитерал a owl:DatatypeProperty ;
    rdfs:label "XML-литерал"@ru ;
    rdfs:comment "Литерал XML (rdf:XMLLiteral)."@ru ;
    owl:equivalentProperty rdf:XMLLiteral .
```

### 2. Онтология `rdfs2ru`

**Адрес размещения:** `https://bpmbpm.github.io/onto/ver1/rdfs2ru`

```turtle
# Словарь русскоязычных аналогов для RDFS
# Префикс: https://bpmbpm.github.io/onto/ver1/rdfs2ru#
# Разделитель: # (hash namespace)

@prefix rdfs2ru: <https://bpmbpm.github.io/onto/ver1/rdfs2ru#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

# --- Классы ---

rdfs2ru:Ресурс a owl:Class ;
    rdfs:label "Ресурс"@ru ;
    rdfs:comment "Всё, что может быть описано в RDF (rdfs:Resource)."@ru ;
    owl:equivalentClass rdfs:Resource .

rdfs2ru:Класс a owl:Class ;
    rdfs:label "Класс"@ru ;
    rdfs:comment "Класс RDFS, определяющий группы ресурсов (rdfs:Class)."@ru ;
    owl:equivalentClass rdfs:Class .

rdfs2ru:Литерал a owl:Class ;
    rdfs:label "Литерал"@ru ;
    rdfs:comment "Класс литералов (rdfs:Literal)."@ru ;
    owl:equivalentClass rdfs:Literal .

rdfs2ru:ТипДанных a owl:Class ;
    rdfs:label "Тип данных"@ru ;
    rdfs:comment "Класс типов данных (rdfs:Datatype)."@ru ;
    owl:equivalentClass rdfs:Datatype .

rdfs2ru:Контейнер a owl:Class ;
    rdfs:label "Контейнер"@ru ;
    rdfs:comment "Класс контейнеров RDF (rdfs:Container)."@ru ;
    owl:equivalentClass rdfs:Container .

rdfs2ru:СвойствоЧленстваВКонтейнере a owl:Class ;
    rdfs:label "Свойство членства в контейнере"@ru ;
    rdfs:comment "Класс свойств членства в контейнере (rdfs:ContainerMembershipProperty)."@ru ;
    owl:equivalentClass rdfs:ContainerMembershipProperty .

# --- Свойства ---

rdfs2ru:подкласс a owl:ObjectProperty ;
    rdfs:label "подкласс"@ru ;
    rdfs:comment "Отношение между классом и его подклассом (rdfs:subClassOf)."@ru ;
    owl:equivalentProperty rdfs:subClassOf .

rdfs2ru:подсвойство a owl:ObjectProperty ;
    rdfs:label "подсвойство"@ru ;
    rdfs:comment "Отношение между свойством и его подсвойством (rdfs:subPropertyOf)."@ru ;
    owl:equivalentProperty rdfs:subPropertyOf .

rdfs2ru:областьОпределения a owl:ObjectProperty ;
    rdfs:label "область определения"@ru ;
    rdfs:comment "Домен свойства (rdfs:domain)."@ru ;
    owl:equivalentProperty rdfs:domain .

rdfs2ru:областьЗначений a owl:ObjectProperty ;
    rdfs:label "область значений"@ru ;
    rdfs:comment "Диапазон свойства (rdfs:range)."@ru ;
    owl:equivalentProperty rdfs:range .

rdfs2ru:метка a owl:DatatypeProperty ;
    rdfs:label "метка"@ru ;
    rdfs:comment "Человекочитаемая метка ресурса (rdfs:label)."@ru ;
    owl:equivalentProperty rdfs:label .

rdfs2ru:комментарий a owl:DatatypeProperty ;
    rdfs:label "комментарий"@ru ;
    rdfs:comment "Комментарий к ресурсу (rdfs:comment)."@ru ;
    owl:equivalentProperty rdfs:comment .

rdfs2ru:смТакже a owl:ObjectProperty ;
    rdfs:label "см. также"@ru ;
    rdfs:comment "Ссылка на дополнительную информацию (rdfs:seeAlso)."@ru ;
    owl:equivalentProperty rdfs:seeAlso .

rdfs2ru:определенВ a owl:ObjectProperty ;
    rdfs:label "определён в"@ru ;
    rdfs:comment "Указывает, где определён ресурс (rdfs:isDefinedBy)."@ru ;
    owl:equivalentProperty rdfs:isDefinedBy .

rdfs2ru:член a owl:ObjectProperty ;
    rdfs:label "член"@ru ;
    rdfs:comment "Член контейнера (rdfs:member)."@ru ;
    owl:equivalentProperty rdfs:member .
```

### 3. Пример использования

Теперь вместо стандартных префиксов `rdf:` и `rdfs:` можно использовать `rdf2ru:` и `rdfs2ru:`. Пример триплетов для Алисы и Боба, переписанный с использованием новых словарей:

```turtle
@prefix ex: <https://bpmbpm.github.io/onto/example1/test1.md#> .
@prefix onto: <https://bpmbpm.github.io/onto/ver1/ontology1.md#> .
@prefix rdf2ru: <https://bpmbpm.github.io/onto/ver1/rdf2ru#> .
@prefix rdfs2ru: <https://bpmbpm.github.io/onto/ver1/rdfs2ru#> .

# --- Алиса ---
ex:алиса rdf2ru:тип onto:Персона ;
    onto:имя "Алиса" ;
    onto:имеетАдрес ex:адрес_алисы ;
    onto:увлекается ex:увлечение_алисы_фотография , ex:увлечение_алисы_шахматы .

ex:адрес_алисы rdf2ru:тип onto:ПочтовыйАдрес ;
    onto:имя "Адрес Алисы" ;
    onto:улица "ул. Ленина, д. 10" ;
    onto:город "Москва" ;
    onto:почтовыйИндекс "101000" ;
    onto:страна "Россия" .

ex:увлечение_алисы_фотография rdf2ru:тип onto:Увлечение ;
    rdfs2ru:метка "Фотография" .

ex:увлечение_алисы_шахматы rdf2ru:тип onto:Увлечение ;
    rdfs2ru:метка "Шахматы" .

# --- Боб ---
ex:боб rdf2ru:тип onto:Персона ;
    onto:имя "Боб" ;
    onto:имеетАдрес ex:адрес_боба ;
    onto:увлекается ex:увлечение_боба_велоспорт , ex:увлечение_боба_программирование .

ex:адрес_боба rdf2ru:тип onto:ПочтовыйАдрес ;
    onto:имя "Адрес Боба" ;
    onto:улица "ул. Пушкина, д. 25" ;
    onto:город "Химки" ;
    onto:почтовыйИндекс "141400" ;
    onto:страна "Россия" .

ex:увлечение_боба_велоспорт rdf2ru:тип onto:Увлечение ;
    rdfs2ru:метка "Велоспорт" .

ex:увлечение_боба_программирование rdf2ru:тип onto:Увлечение ;
    rdfs2ru:метка "Программирование" .
```

Здесь `rdf2ru:тип` семантически эквивалентен `rdf:type`, а `rdfs2ru:метка` — `rdfs:label`, что обеспечивается объявлениями `owl:equivalentProperty`. Это позволяет использовать русскоязычные термины, сохраняя полную совместимость со стандартными RDF/RDFS-инструментами.

**Ссылки на использованные стандарты:**
- RDF 1.1 Primer (W3C) — https://www.w3.org/TR/rdf11-primer/
- RDF Schema 1.1 (W3C) — https://www.w3.org/TR/rdf-schema/
- OWL 2 Web Ontology Language (W3C) — https://www.w3.org/TR/owl2-overview/

## 3

Файлы планируется хранить в markdown, но при публикации на github pages ссылки на конкретную сущность не сработают.  
Так же как и https://www.w3.org/1999/02/22-rdf-syntax-ns#type  
Как можно обеспечить хранение в одном файле, но с доступом по якорю для ссылки на конкретную сущность?

Проблема, с которой вы столкнулись, фундаментальна и связана с тем, как работает веб в целом. Когда вы переходите по ссылке вида `https://bpmbpm.github.io/onto/ver1/ontology1.md#Персона`, ваш браузер **отправляет на сервер только часть до решётки** — то есть запрашивает файл `ontology1.md`. Часть после `#` (фрагмент) **обрабатывается исключительно браузером** и на сервер не передаётся. GitHub Pages, будучи статическим хостингом, отдаёт файл как есть, и браузер пытается найти элемент с `id="Персона"` внутри уже загруженного документа. Если такого `id` нет — ссылка «не срабатывает».

Для внешних онтологий (например, `https://www.w3.org/1999/02/22-rdf-syntax-ns#type`) ситуация ещё сложнее: там нужен **content negotiation** — сервер должен уметь возвращать разные форматы (HTML, Turtle, JSON-LD) в зависимости от заголовка `Accept`. GitHub Pages этого не умеет.

Однако задачу можно решить. Вот несколько подходов, от простого к сложному.

---

## 1. Явные HTML-якоря внутри Markdown

Самый простой способ — **вручную расставить HTML-теги с `id`** в том месте Markdown-файла, где определяется сущность. GitHub позволяет использовать ограниченный набор HTML-тегов, и `id` в них не удаляется (в отличие от некоторых других атрибутов).

**Пример `ontology1.md`:**

```markdown
# Онтология

<a id="Персона"></a>
## Персона

Класс, представляющий человека.

<a id="ПочтовыйАдрес"></a>
## ПочтовыйАдрес

Класс для описания адреса.
```

Теперь ссылка `https://bpmbpm.github.io/onto/ver1/ontology1.md#Персона` приведёт браузер к нужному месту документа. То же самое можно сделать для свойств:

```markdown
<a id="имя"></a>
### Свойство «имя»

Полное имя персоны.
```

**Преимущества:** работает «из коробки», не требует JavaScript.
**Недостатки:** `id` нужно расставлять вручную; при редактировании текста легко забыть обновить якорь.

---

## 2. Пользовательские ID для заголовков (если рендерер поддерживает)

Некоторые Markdown-процессоры (например, Mintlify, VitePress) поддерживают синтаксис `{#custom-id}` для заголовков:

```markdown
## Персона {#Персона}
```

Однако **GitHub Pages по умолчанию не поддерживает этот синтаксис** — он использует собственный алгоритм генерации `id` из текста заголовка (с приведением к нижнему регистру и заменой пробелов на дефисы). Поэтому для GitHub Pages этот вариант не подходит, если вы не используете генератор статических сайтов (Jekyll, Hugo и т.д.), который умеет обрабатывать такие расширения.

---

## 3. Отдельные файлы с редиректами (для внешних онтологий)

Для ссылок на **внешние** онтологии (W3C RDF, FOAF и т.д.) проблема в том, что их серверы могут не поддерживать content negotiation или быть недоступными. Здесь поможет **локальное зеркало** с редиректами.

Вы можете создать в своём репозитории папки, имитирующие структуру внешних пространств имён:

```
/onto/ver1/
  rdf2ru.md          # документация
  rdf2ru.ttl         # RDF-файл
  rdf2ru/
    index.html       # перенаправление на rdf2ru.md#...
```

Файл `rdf2ru/index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0; url=../rdf2ru.md#тип">
</head>
<body>
  <p>Перенаправление…</p>
</body>
</html>
```

Теперь ссылка `https://bpmbpm.github.io/onto/ver1/rdf2ru/#тип` перенаправит браузер на `rdf2ru.md#тип`.

**Преимущества:** работает для любых фрагментов, не требует JavaScript.
**Недостатки:** нужно создавать отдельную папку для каждого «пространства имён»; не решает проблему content negotiation для машинных клиентов.

---

## 4. Страница 404 как маршрутизатор (SPA-подход)

Если вы хотите, чтобы **любая** ссылка с фрагментом на любой `.md` файл открывала нужный якорь, можно использовать **кастомную страницу 404** с JavaScript, которая перехватывает запрос и перенаправляет браузер.

Создайте файл `404.html` в корне репозитория:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Перенаправление…</title>
</head>
<body>
  <script>
    // Получаем путь из URL
    var path = window.location.pathname;
    var hash = window.location.hash;
    
    // Если путь заканчивается на .md — заменяем на .html и добавляем хеш
    if (path.endsWith('.md')) {
      var newPath = path.slice(0, -3) + '.html' + hash;
      window.location.replace(newPath);
    } else {
      // Иначе — перенаправляем на главную
      window.location.replace('/');
    }
  </script>
  <p>Перенаправление…</p>
</body>
</html>
```

**Как это работает:**
1. GitHub Pages при запросе несуществующего `.html` файла (потому что `.md` файлы не рендерятся как HTML) отдаёт `404.html`.
2. Скрипт на `404.html` видит, что запрошен `.md` файл, и перенаправляет браузер на `.html` версию (если она существует) с сохранением хеша.
3. Браузер загружает HTML-версию и переходит к нужному якорю.

**Преимущества:** работает для всех `.md` файлов сразу, не нужно расставлять якоря вручную (если HTML-версия генерируется автоматически).
**Недостатки:** требует, чтобы `.html` версии файлов существовали (то есть нужно использовать генератор статических сайтов, который конвертирует `.md` → `.html`). Если у вас «сырые» `.md` файлы на GitHub Pages, они не отображаются как HTML — GitHub Pages отдаёт их как plain text или как `404`.

---

## 5. Content negotiation через внешний редирект (w3id.org)

Для **внешних** онтологий (W3C RDF, FOAF) лучше всего использовать **сервис постоянных идентификаторов**, например [w3id.org](https://w3id.org/). Вы регистрируете там свой префикс (например, `https://w3id.org/bpmbpm/`), и настраиваете правила редиректа:

```apache
# .htaccess на w3id.org
RewriteCond %{HTTP_ACCEPT} text/turtle
RewriteRule ^onto/ver1/rdf2ru$ https://bpmbpm.github.io/onto/ver1/rdf2ru.ttl [R=303,L]

RewriteCond %{HTTP_ACCEPT} application/rdf\+xml
RewriteRule ^onto/ver1/rdf2ru$ https://bpmbpm.github.io/onto/ver1/rdf2ru.rdf [R=303,L]

RewriteRule ^onto/ver1/rdf2ru$ https://bpmbpm.github.io/onto/ver1/rdf2ru.md [R=303,L]
```

Тогда ссылка `https://w3id.org/bpmbpm/onto/ver1/rdf2ru#тип` будет работать для машин (Turtle/RDF/XML) и для людей (Markdown→HTML).

**Преимущества:** решает проблему content negotiation, даёт стабильные идентификаторы.
**Недостатки:** требует регистрации на w3id.org и настройки правил; не работает для внутренних ссылок на `bpmbpm.github.io`.

---

## 💎 Итог

| Подход | Для чего | Сложность | Работает на GitHub Pages? |
|---|---|---|---|
| **HTML-якоря `<a id="...">`** | Внутренние ссылки на сущности в `.md` | Низкая | ✅ Да |
| **Пользовательские ID заголовков `{#id}`** | Внутренние ссылки | Низкая | ❌ Нет (по умолчанию) |
| **Отдельные папки с `index.html`** | Внешние пространства имён | Средняя | ✅ Да |
| **Страница 404 + JS** | Массовое перенаправление | Средняя | ✅ Да (если есть `.html` версии) |
| **w3id.org + редиректы** | Внешние онтологии с content negotiation | Высокая | ✅ Да (через внешний сервис) |

Для вашего случая — хранения онтологии в одном `.md` файле с доступом по якорям — **самый надёжный и простой путь** это **явные HTML-якоря** (`<a id="Персона"></a>`). Они гарантированно работают на GitHub Pages и не требуют ни JavaScript, ни дополнительных сервисов. Для внешних онтологий (W3C, FOAF) рекомендую использовать **w3id.org** или локальные зеркала с редиректами.

**Ссылки:**
- GitHub Markdown anchor links — https://stackoverflow.com/questions/72536973
- GitHub Pages 404 redirect — https://github.com/rafgraph/spa-github-pages
- w3id.org — https://w3id.org/
- Content negotiation on GitHub Pages — https://mfhepp.github.io/test_mime_types/
- Fragment identifier (W3C) — https://www.w3.org/TR/cooluris/#rdfhash

## 4

Вы правы — единообразие важно, и `.md` действительно даёт возможность красиво оформить онтологию на GitHub Pages. Но здесь есть техническая тонкость, которую нужно учесть, чтобы ссылки с якорями **реально работали**.

## 🧩 Проблема: почему `.md#фрагмент` не работает «из коробки»

Когда браузер запрашивает `https://bpmbpm.github.io/onto/ver1/ontology1.md#Персона`:

1. На сервер уходит **только** `https://bpmbpm.github.io/onto/ver1/ontology1.md` — часть после `#` **не передаётся**.
2. Сервер (GitHub Pages) отдаёт файл `ontology1.md` **как plain text** (по умолчанию, без Jekyll).
3. Браузер получает текст, но в нём **нет HTML-элемента с `id="Персона"`** — потому что это сырой Markdown, а не HTML.
4. Переход к якорю не происходит.

**Решение:** нужно, чтобы GitHub Pages **отрендерил** Markdown в HTML и в этом HTML были явные якоря.

## 🛠️ Как это сделать

### Шаг 1. Единый префикс для всех онтологий

Приводим оба словаря к формату с `.md`:

```turtle
@prefix onto:    <https://bpmbpm.github.io/onto/ver1/ontology1.md#> .
@prefix rdf2ru:  <https://bpmbpm.github.io/onto/ver1/rdf2ru.md#> .
@prefix rdfs2ru: <https://bpmbpm.github.io/onto/ver1/rdfs2ru.md#> .
```

### Шаг 2. Расставить HTML-якоря в Markdown

Внутри `rdf2ru.md` перед каждым определением сущности добавьте `<a id="...">`:

```markdown
# Словарь русскоязычных аналогов для RDF

<a id="Свойство"></a>
## Свойство

Класс, представляющий RDF-свойство (предикат).

**Эквивалент:** `rdf:Property`

<a id="тип"></a>
## тип

Указывает, что ресурс является экземпляром класса.

**Эквивалент:** `rdf:type`

<a id="субъект"></a>
## субъект

Субъект RDF-утверждения.

**Эквивалент:** `rdf:subject`

...
```

Теперь браузер, загрузив HTML-версию файла, найдёт `<a id="тип">` и перейдёт к нему.

### Шаг 3. Обеспечить рендеринг `.md` → HTML

GitHub Pages **по умолчанию** не рендерит `.md` в HTML, если не включён Jekyll. Есть три пути:

**Путь A. Включить Jekyll на GitHub Pages**

Если в репозитории есть файл `_config.yml`, GitHub Pages автоматически обрабатывает `.md` через Jekyll. Тогда:
- `https://bpmbpm.github.io/onto/ver1/rdf2ru.md` → отдаётся как HTML-страница.
- `https://bpmbpm.github.io/onto/ver1/rdf2ru` → тоже HTML (без расширения).
- Якоря работают.

Создайте `_config.yml` в корне репозитория:

```yaml
theme: jekyll-theme-minimal
markdown: kramdown
```

**Путь B. Использовать `.html` как целевой формат**

Хранить источник в `.md`, но генерировать `.html` через GitHub Actions (Jekyll, Hugo, Eleventy). Тогда префикс будет:

```turtle
@prefix rdf2ru: <https://bpmbpm.github.io/onto/ver1/rdf2ru.html#> .
```

Минус: префикс содержит `.html`, что визуально менее приятно, но зато **гарантированно работает**.

**Путь C. Использовать «чистые» URL без расширения**

Если Jekyll включён, GitHub Pages отдаёт `rdf2ru.md` как HTML по адресу `https://bpmbpm.github.io/onto/ver1/rdf2ru` (без `.md`). Тогда префикс:

```turtle
@prefix rdf2ru: <https://bpmbpm.github.io/onto/ver1/rdf2ru#> .
```

Это самый «чистый» вариант семантически, но он **не даёт ссылку на сам файл `.md`** — пользователь не сможет скачать исходник по этому URL.

### Шаг 4. Обновлённые файлы онтологий

**`rdf2ru.md` (фрагмент):**

```markdown
# Словарь русскоязычных аналогов для RDF

Префикс: `https://bpmbpm.github.io/onto/ver1/rdf2ru.md#`
Разделитель: `#` (hash namespace)

<a id="Свойство"></a>
## Свойство

Класс, представляющий RDF-свойство (предикат).

- **Эквивалент:** `rdf:Property`
- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2ru.md#Свойство`

<a id="тип"></a>
## тип

Указывает, что ресурс является экземпляром класса.

- **Эквивалент:** `rdf:type`
- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2ru.md#тип`

<a id="субъект"></a>
## субъект

Субъект RDF-утверждения.

- **Эквивалент:** `rdf:subject`
- **URI:** `https://bpmbpm.github.io/onto/ver1/rdf2ru.md#субъект`

...
```

**`rdfs2ru.md` (фрагмент):**

```markdown
# Словарь русскоязычных аналогов для RDFS

Префикс: `https://bpmbpm.github.io/onto/ver1/rdfs2ru.md#`
Разделитель: `#` (hash namespace)

<a id="Ресурс"></a>
## Ресурс

Всё, что может быть описано в RDF.

- **Эквивалент:** `rdfs:Resource`

<a id="Класс"></a>
## Класс

Класс RDFS, определяющий группы ресурсов.

- **Эквивалент:** `rdfs:Class`

<a id="подкласс"></a>
## подкласс

Отношение между классом и его подклассом.

- **Эквивалент:** `rdfs:subClassOf`

...
```

## ⚠️ Ограничение: content negotiation не работает

Даже если якоря заработают, **машинные клиенты** (SPARQL-движки, RDF-парсеры) не смогут получить Turtle-версию онтологии по адресу `rdf2ru.md#тип`. GitHub Pages не поддерживает content negotiation — он всегда отдаёт HTML (или Markdown), но не Turtle.

Для машинного доступа нужно:
1. **Дублировать онтологию** в `.ttl` файл: `rdf2ru.ttl`.
2. **Использовать внешний редирект-сервис** (w3id.org) для content negotiation.
3. Или **указать в HTML-версии ссылку** на `.ttl` файл:

```html
<link rel="alternate" type="text/turtle" href="rdf2ru.ttl">
```

Это не решит проблему автоматически, но даст машинам подсказку.

## 💎 Итог

| Аспект | Решение |
|---|---|
| **Единый формат префиксов** | Оба словаря с `.md`: `rdf2ru.md#`, `rdfs2ru.md#`, `ontology1.md#` |
| **Работа якорей на GitHub Pages** | Явные `<a id="...">` + включённый Jekyll (`_config.yml`) |
| **Чистый URL без `.md`** | Возможен через Jekyll: `rdf2ru#тип` |
| **Машинный доступ к Turtle** | Дублировать в `rdf2ru.ttl`; для content negotiation — w3id.org |
| **Красивое оформление** | Markdown + Jekyll + явные якоря |

**Рекомендация:** используйте **`.md` с явными HTML-якорями** и включите Jekyll. Это даст:
- Красиво оформленную онтологию на GitHub Pages.
- Работающие ссылки вида `https://bpmbpm.github.io/onto/ver1/rdf2ru.md#тип`.
- Возможность скачать исходник `.md`.
- Дублирование в `.ttl` для машин.

**Ссылки:**
- Jekyll на GitHub Pages — https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll
- GitHub Pages и Markdown — https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll
- Fragment identifier (W3C) — https://www.w3.org/TR/cooluris/#rdfhash
- Content negotiation — https://www.w3.org/TR/cooluris/

## 5

Вы правы: `https://www.w3.org/1999/02/22-rdf-syntax-ns#` действительно не имеет расширения `.ttl`. И это не ошибка, а принципиально иной механизм работы сервера. Разница между W3C и GitHub Pages — это разница между **динамическим сервером с content negotiation** и **статическим хостингом**.

### 🌐 Как работает W3C (и любой «правильный» сервер онтологий)

Когда браузер или RDF-клиент запрашивает `https://www.w3.org/1999/02/22-rdf-syntax-ns#`:

1.  **Фрагмент (`#`) отбрасывается.** На сервер уходит только `https://www.w3.org/1999/02/22-rdf-syntax-ns`. Это требование протокола HTTP.
2.  **Сервер смотрит на заголовок `Accept`.** Этот заголовок сообщает серверу, какой формат предпочитает клиент.
3.  **Сервер выбирает представление:**
    *   Если клиент — браузер (обычно просит `text/html`), сервер возвращает **HTML-страницу** с документацией.
    *   Если клиент — RDF-парсер (просит `text/turtle` или `application/rdf+xml`), сервер возвращает **файл Turtle** или **RDF/XML**.

Это называется **content negotiation** (согласование содержимого). Один и тот же URI (`.../rdf-syntax-ns`) отдаёт **разные файлы** в зависимости от того, кто и что запрашивает. Именно поэтому у URI нет расширения — расширение было бы «жёстко» привязано к одному формату.

### 🚫 Почему так не работает на GitHub Pages

GitHub Pages — это **статический хостинг**. У него нет серверной логики, которая могла бы проанализировать заголовок `Accept` и выбрать файл. Он просто отдаёт файл, соответствующий пути в URL, и определяет MIME-тип по расширению:

*   `/ontology.md` → отдаётся как `text/markdown` или `text/html` (если Jekyll включён).
*   `/ontology.ttl` → отдаётся как `text/turtle`.
*   `/ontology` (без расширения) → **не существует** как файл, поэтому будет 404.

Попытка запросить `https://bpmbpm.github.io/onto/ver1/rdf2ru` с заголовком `Accept: text/turtle` вернёт **тот же самый HTML**, а не Turtle. GitHub Pages не умеет «переключаться» между форматами.

### 💡 Что это значит для вашей онтологии

Вы не можете воспроизвести поведение W3C на GitHub Pages «из коробки». Но у вас есть три практических пути:

**Путь 1. Дублирование файлов (самый простой)**

Храните онтологию в двух файлах с разными расширениями:

```
onto/ver1/rdf2ru.md      ← для людей (красивая документация)
onto/ver1/rdf2ru.ttl     ← для машин (RDF-граф)
```

В префиксе используйте `.md#`, чтобы ссылки на якоря работали в браузере:

```turtle
@prefix rdf2ru: <https://bpmbpm.github.io/onto/ver1/rdf2ru.md#> .
```

Машинные клиенты, которым нужен Turtle, будут запрашивать `rdf2ru.ttl` напрямую. Это работает, но URI для человека и для машины — разные.

**Путь 2. w3id.org (ближе к «правильному» семантическому вебу)**

Сервис [w3id.org](https://w3id.org/) предоставляет постоянные идентификаторы с поддержкой content negotiation. Вы регистрируете префикс (например, `https://w3id.org/bpmbpm/`) и настраиваете правила: если клиент просит HTML — перенаправлять на `.md`, если Turtle — на `.ttl`.

Тогда вы сможете использовать «чистый» URI без расширения:

```turtle
@prefix rdf2ru: <https://w3id.org/bpmbpm/onto/ver1/rdf2ru#> .
```

Но это требует настройки внешнего сервиса, а не просто загрузки файлов на GitHub.

**Путь 3. Смириться с `.md#` и дублировать в `.ttl`**

Самый прагматичный вариант для вашего проекта: используйте `.md#` как основной URI (потому что вы хотите красивую документацию на GitHub Pages), а для машинной обработки предоставьте отдельный `.ttl` файл. В HTML-версии можно добавить ссылку:

```html
<link rel="alternate" type="text/turtle" href="rdf2ru.ttl">
```

Это не решит проблему content negotiation автоматически, но даст машинам подсказку, где искать RDF.

### 💎 Итог

| Аспект | W3C | GitHub Pages |
|---|---|---|
| **Content negotiation** | ✅ Есть | ❌ Нет |
| **URI без расширения** | ✅ Работает | ❌ Не работает (404) |
| **Один URI → HTML и RDF** | ✅ Да | ❌ Нет |
| **Расширение в URI** | Не нужно | Необходимо (`.md`, `.ttl`) |

W3C может позволить себе URI без расширения, потому что за ним стоит **динамический сервер**, который решает, что отдать. GitHub Pages — **статический хостинг**, поэтому вы вынуждены либо указывать расширение, либо использовать внешний сервис вроде w3id.org для эмуляции content negotiation.

**Ссылки:**
- W3C: Content negotiation — https://www.w3.org/TR/swbp-vocab-pub/
- GitHub Pages и content negotiation (эксперимент) — https://mfhepp.github.io/test_mime_types/
- w3id.org — https://w3id.org/
- Stack Overflow: Content negotiation на GitHub Pages — https://stackoverflow.com/questions/28745224
  

