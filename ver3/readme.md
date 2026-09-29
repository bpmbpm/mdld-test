## MD-LD Semantic Zettelkasten — ver3

run:
- GitHub Pages: https://bpmbpm.github.io/mdld-test/ver3/
- desktop: `git clone` (см. [doc/SYNC.md](doc/SYNC.md)) и открыть `ver3/index.html` (file://) — см. [doc/CORS.md](doc/CORS.md)

Структура:
- `js/start.js` — инициализация; `js/app.js` — исполнение (работа пользователя); `js/core.js` — чистые функции
- `notes/` — заметки MD-LD, `SPARQL/` — запросы, `doc/` — инструкции и описание, `tests/` — автотесты

doc:
- [ARCHITECTURE.md](doc/ARCHITECTURE.md) — описание программы, схемы mermaid, основные функции
- [FP.md](doc/FP.md) — что переписано в функциональном стиле
- [SPARQL_FIX.md](doc/SPARQL_FIX.md) — почему запросы 04–07 были пустыми
- [CORS.md](doc/CORS.md) — работа по file://
- [SYNC.md](doc/SYNC.md) — синхронизация через git
- [HIVE_MIND.md](doc/HIVE_MIND.md) — как это реализовывалось и тестировалось

Тесты: `cd tests && npm install && npx playwright install chromium && npm test`
