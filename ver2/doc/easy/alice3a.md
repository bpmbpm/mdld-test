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

Если у вас есть дополнительные вопросы по этим материалам, спрашивайте.
