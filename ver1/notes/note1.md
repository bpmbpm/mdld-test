[ex] <tag:example.org,2026:>

# Семантический Zettelkasten {=ex:note1 .schema:CreativeWork schema:name}

Вводная заметка о построении Zettelkasten на RDF.

## Определение {+ex:note1-sec1 ?schema:hasPart .schema:SectionHead schema:name}

Zettelkasten — это метод управления знаниями, при котором каждая заметка
атомарна и связана с другими.

### История {+ex:note1-sec1-1 ?schema:hasPart .schema:SectionHead schema:name}

Метод предложен социологом Никласом Луманом.

### Принципы {+ex:note1-sec1-2 ?schema:hasPart .schema:SectionHead schema:name}

- Атомарность
- Автономность
- Связность

## RDF и знания {+ex:note1-sec2 ?schema:hasPart .schema:SectionHead schema:name}

Использование RDF позволяет превратить Zettelkasten в граф знаний.

### Преимущества {+ex:note1-sec2-1 ?schema:hasPart .schema:SectionHead schema:name}

Связность данных и возможность SPARQL-запросов.

[Alice] {schema:author}
[2026-04-10] {schema:dateCreated}
