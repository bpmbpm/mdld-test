# mdld-test
mdld-test  
run https://bpmbpm.github.io/mdld-test/
# mdld-test — клиентский семантический Zettelkasten

Демонстрационный проект, показывающий, как построить семантическую вики на GitHub Pages **без сборки и без CLI**.  
Браузер сам загружает Markdown-файлы, парсит их в RDF и выполняет SPARQL-запросы.

## Как это работает

1. **Markdown-файлы** с MD-LD аннотациями лежат в папке `notes/`.
2. **`mdld-parse`** парсит их в RDF/JS quads прямо в браузере.
3. **Oxigraph WASM** загружает quads в in-memory store.
4. **SPARQL-запросы** выполняются через `store.query()`.

## Структура

- `index.html` — вся логика в одном файле.
- `notes/note1.md`, `notes/note2.md` — тестовые MD-LD заметки.

## Как воспроизвести

1. Форкните или клонируйте репозиторий.
2. Включите GitHub Pages: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
3. Откройте `https://bpmbpm.github.io/mdld-test/`.

## Синтаксис MD-LD

- `[текст] {предикат}` — создаёт триплет с литералом.
- `[текст] {=субъект .тип label}` — задаёт субъект, его тип и заголовок.
- `{?предикат}` — создаёт триплет с объектом (IRI).
- `{^^xsd:date}` — задаёт тип литерала.

## Ссылки

- MD-LD (спецификация) — https://mdld.js.org/
- mdld-parse (npm) — https://www.npmjs.com/package/mdld-parse
- Oxigraph (npm) — https://www.npmjs.com/package/oxigraph
- Oxigraph (GitHub) — https://github.com/oxigraph/oxigraph
- SPARQL 1.1 (W3C) — https://www.w3.org/TR/sparql11-query/

### note
- notes/manifest.json
- notes/note1.md  
- notes/note2.md
- SPARQL/manifest.json 
- SPARQL/01-all-triples.rq Первый в списке — вывод всех триплетов (?s ?p ?o).
- SPARQL/02-all-notes.rq
- SPARQL/03-notes-by-author.rq
