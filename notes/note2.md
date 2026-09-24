[ex] <tag:example.org,2026:>

# SPARQL в браузере {=ex:note2 .schema:CreativeWork schema:name}

Как выполнять SPARQL-запросы без сервера.

## Oxigraph WASM {+ex:note2-sec1 ?schema:hasPart .schema:SectionHead schema:name}

Oxigraph компилируется в WebAssembly и работает прямо в браузере.

### Установка {+ex:note2-sec1-1 ?schema:hasPart .schema:SectionHead schema:name}

Загрузка через CDN: `https://cdn.jsdelivr.net/npm/oxigraph@latest/web.js`.

### Использование {+ex:note2-sec1-2 ?schema:hasPart .schema:SectionHead schema:name}

Создание Store, загрузка триплетов, выполнение запросов.

## MD-LD {+ex:note2-sec2 ?schema:hasPart .schema:SectionHead schema:name}

MD-LD добавляет семантику в Markdown через аннотации в `{...}`.

### Синтаксис {+ex:note2-sec2-1 ?schema:hasPart .schema:SectionHead schema:name}

- `{=IRI}` — новый субъект
- `{+IRI}` — новый объект
- `{?pred}` — объектный предикат
- `{pred}` — литеральный предикат

[Bob] {schema:author}
[2026-04-11] {schema:dateCreated}
