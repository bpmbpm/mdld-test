# Как реализовывалась ver3 (отчёт Hive Mind)

## Кто я
Эту работу выполнил **Hive Mind** — автоматический решатель GitHub-задач
([link-assistant/hive-mind](https://github.com/link-assistant/hive-mind)). Он получает ссылку на issue,
делает форк репозитория, создаёт ветку и черновой Pull Request, после чего ИИ-агент (Claude Code,
модель Claude Opus) исследует задачу, пишет код и тесты, запускает их и обновляет PR. Человек проверяет PR
и решает, сливать ли его.

## Где велась работа
* Issue: https://github.com/bpmbpm/mdld-test/issues/1
* Временный репозиторий (форк): https://github.com/konard/bpmbpm-mdld-test
* Ветка: [`issue-1-11b97696384f`](https://github.com/konard/bpmbpm-mdld-test/tree/issue-1-11b97696384f)
* Pull Request: https://github.com/bpmbpm/mdld-test/pull/2

## Общий алгоритм
1. Прочитал issue, `ver2/index.html`, заметки и запросы ver2; изучил [family-tree/ver7](https://github.com/bpmbpm/family-tree/tree/main/ver7)
   (config.js, index.html, service_foto_desktop.html, save.js) — выписал приёмы обхода CORS (doc/CORS.md).
2. **Воспроизвёл ошибку SPARQL** в Node.js: разобрал заметки ver2 теми же `mdld-parse@1.0.8` и `oxigraph@0.5.11`,
   что и в браузере, вывел граф через N3 в Turtle. Увидел IRI `<schema:Person>` и предупреждение
   `Undefined prefix "schema"` — корневая причина (doc/SPARQL_FIX.md). Запросы 04–07 вернули 0 строк.
3. Переписал заметки и запросы в `ver3/notes`, `ver3/SPARQL`; повторный прогон дал ожидаемые строки.
4. Разделил код: `js/core.js` (чистые функции) → `js/start.js` (инициализация) → `js/app.js` (исполнение);
   ES-модуль заменил на обычные скрипты, добавил `config.js` / `data.js` и 4 источника данных.
5. Добавил «Вид» + «Сохранить» в каждое окно (включая режим «Markdown (GitHub)»), «Сохранить» для кода и результата SPARQL.
6. Написал тесты, прогнал в настоящем браузере, сделал скриншоты, написал документацию.

## Как тестировал
Тесты в `ver3/tests` (Node.js `node:test`), запуск: `cd ver3/tests && npm install && npx playwright install chromium && npm test`.

| Файл | Что проверяет |
|------|---------------|
| `core.test.js` | 7 модульных тестов чистых функций (экранирование, имена файлов, CSV/HTML-таблицы, дедупликация квадов) |
| `sparql.test.js` | воспроизведение: на данных ver2 запросы 04–07 пусты; на ver3 — точные ожидаемые строки для 01–07; манифесты и `data.js` соответствуют папкам |
| `e2e.test.js` | Chromium (Playwright): страница по **http://** и по **file://** — загрузка, 4 вида, «Сохранить» (скачивание `note1.github.html`), SPARQL 05 → 4 строки, «Сохранить (CSV)» |

Результат локального прогона:
```
✔ escapeHtml экранирует спецсимволы
✔ saveFileName строит имя по виду
✔ NOTE_VIEWS содержит четыре вида, включая GitHub
✔ filesWithExt фильтрует, убирает дубли и сортирует
✔ bindingsToTable / tableToCsv / tableToHtml
✔ compactIri сокращает известные префиксы
✔ mergeQuads убирает дубликаты
▶ браузер: http:// и file://
  ✔ http:// (как GitHub Pages)
  ✔ file:// (desktop, источник data.js)
✔ ver2: запросы 04–07 пусты (воспроизведение ошибки)
✔ ver3: все запросы возвращают ожидаемые данные
✔ manifest.json совпадают с содержимым папок
✔ data.js синхронизирован с notes/ и SPARQL/
ℹ tests 14  pass 14  fail 0
```

Скриншоты, снятые тестом (`SCREENSHOTS=../doc/screenshots npm test`):
* file:// — [screenshots/ver3-file.png](screenshots/ver3-file.png)
* http:// — [screenshots/ver3-http.png](screenshots/ver3-http.png)

## Что не проверено автоматически
* Источник «GitHub (raw)» читает `bpmbpm/mdld-test@main/ver3` — эта папка появится только после слияния PR.
* Источник «Локальная папка» требует ручного выбора папки в системном диалоге (в автотесте не эмулировался).
