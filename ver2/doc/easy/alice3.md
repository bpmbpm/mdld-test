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

