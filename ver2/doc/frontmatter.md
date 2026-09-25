## 1
**Frontmatter** — это специальный блок в самом начале файла (чаще всего Markdown), где вы указываете **метаданные** документа. То есть не сам текст статьи или заметки, а информацию о ней: заголовок, описание (например, для SEO), автор, даты, теги, настройки отображения и так далее. [```1```](https://www.markdownlang.com/ru/advanced/frontmatter.html)[```19```](http://dimayakovlev.ru/blog/front-matter-in-markdown/)[```14```](https://dev.to/dailydevtips1/what-exactly-is-frontmatter-123g)

## Как это выглядит

Блок выделяют специальными разделителями. Чаще всего используют три дефиса (`---`) в начале и в конце. Внутри пишут структурированные данные — обычно в формате YAML, но иногда встречаются и другие варианты (TOML, JSON). [```1```](https://www.markdownlang.com/ru/advanced/frontmatter.html)[```7```](https://tr-page.yandex.ru/translate?lang=en-ru&url=https%3A%2F%2Fgithub.com%2FKernix13%2Fmarkdown-cheatsheet%2Fblob%2Fmaster%2Ffrontmatter.md)[```6```](https://docs.gitlab.com/user/markdown/)[```19```](http://dimayakovlev.ru/blog/front-matter-in-markdown/)

**Пример:**
```markdown
---
title: Мой документ
author: Иван Иванов
date: 2025-06-25
tags: [markdown, tutorial]
---

# Мой документ

Здесь начинается основное содержание...
```

**Важные нюансы:**
* Блок должен быть **самым первым** в файле — перед ним не должно быть никаких пустых строк или текста. [```8```](https://marktext.me/docs/markdown-syntax)[```4```](https://docs.modx.pro/guide/frontmatter)
* Поскольку внутри используется YAML, **отступы имеют значение**. [```7```](https://tr-page.yandex.ru/translate?lang=en-ru&url=https%3A%2F%2Fgithub.com%2FKernix13%2Fmarkdown-cheatsheet%2Fblob%2Fmaster%2Ffrontmatter.md)[```14```](https://dev.to/dailydevtips1/what-exactly-is-frontmatter-123g)
* После второй тройки дефисов сразу начинается основное содержимое файла. [```14```](https://dev.to/dailydevtips1/what-exactly-is-frontmatter-123g)

## Зачем это нужно

Идея в том, чтобы отделить данные (метаинформацию) от самого текста. Это удобно, когда вы работаете с контентом в файловой системе или используете генераторы статических сайтов (Jekyll, Hugo), системы управления контентом (CMS) или плагины. Инструменты могут парсить этот блок, извлекать из него данные и на их основе формировать HTML-страницу, генерировать оглавление, метатеги, карточки для соцсетей и т.п.. [```1```](https://www.markdownlang.com/ru/advanced/frontmatter.html)[```19```](http://dimayakovlev.ru/blog/front-matter-in-markdown/)

## Примеры использования
* В документации Grafana frontmatter помогает структурировать содержание, строить оглавление и улучшать поиск. [```13```](https://grafana.com/docs/writers-toolkit/write/front-matter/)
* В GitLab Frontmatter отображается в специальном блоке в верхней части Markdown-файлов и страниц вики. [```6```](https://docs.gitlab.com/user/markdown/)
* В плагинах для редакторов (например, Ultimate Markdown для WordPress) через frontmatter настраивают параметры публикации. [```16```](https://tr-page.yandex.ru/translate?lang=en-ru&url=https%3A%2F%2Fwordpress.org%2Fplugins%2Fultimate-markdown%2F)
* В Obsidian плагины вроде Dataview умеют строить таблицы и отчёты прямо на основе полей frontmatter. [```17```](https://prohomelab.com/posts/obsidian-plugins/)

Так что если вы работаете с Markdown и вам нужно привязать к статье какие-то технические или организационные метаданные — frontmatter станет вашим помощником. [```1```](https://www.markdownlang.com/ru/advanced/frontmatter.html)[```19```](http://dimayakovlev.ru/blog/front-matter-in-markdown/)

## 1.1

Github как то их специально обрабатывает? Есть стандарт на Frontmatter?

## Как использовать

Суть в том, чтобы поместить блок с метаданными прямо в начало Markdown-файла, **до основного текста**. Для выделения блока используют разделители. Чаще всего берут три дефиса (`---`). Внутри пишут данные — обычно в формате YAML, но также поддерживают TOML (тогда разделитель — `+++`) или JSON (разделитель — `;;;` или `{}`). [```2```](https://www.markdownlang.com/advanced/frontmatter.html)[```24```](http://dimayakovlev.ru/blog/front-matter-in-markdown/)

**Пример с YAML:**
```markdown
---
title: Мой документ
author: Иван Иванов
date: 2026-09-25
tags: [markdown, frontmatter]
---

# Заголовок документа

А здесь — сам текст...
```

## Обрабатывает ли GitHub их как-то особо?

**Сама платформа GitHub (просмотр файлов, вики) не парсит frontmatter.** Если вы просто откроете файл в браузере на GitHub, блок с `---` отобразится как обычный текст. [```16```](https://docs.gitlab.com/user/markdown/)

Но есть важный нюанс: **GitHub Docs** (раздел документации для разработчиков) активно использует frontmatter. Там определённые поля имеют специальное значение:
* `title` — заголовок страницы;
* `versions` — указывает, для каких версий продукта предназначена страница;
* `redirect_from` — список URL, которые должны перенаправлять на эту страницу;
* `showMiniToc` — можно установить в `false`, чтобы отключить автогенерируемое мини-оглавление;
* `children` — для файлов-индексов (index.md) задаёт список дочерних страниц. [```17```](https://docs.github.com/en/contributing/writing-for-github-docs/using-yaml-frontmatter)[```8```](https://docs.github.com/ru/contributing/writing-for-github-docs/using-yaml-frontmatter)

При этом для GitHub Docs даже есть своя схема валидации: система проверяет, все ли обязательные поля заполнены и корректны ли типы значений. [```17```](https://docs.github.com/en/contributing/writing-for-github-docs/using-yaml-frontmatter)[```18```](https://deepwiki.com/github/docs/5.1-content-structure-and-frontmatter)

## Есть ли стандарт?

**Единого универсального стандарта нет**. Идея использовать блок метаданных в начале файла — это скорее распространённое соглашение (convention), которое подхватили разные инструменты. [```2```](https://www.markdownlang.com/advanced/frontmatter.html)[```17```](https://docs.github.com/en/contributing/writing-for-github-docs/using-yaml-frontmatter)[```24```](http://dimayakovlev.ru/blog/front-matter-in-markdown/)

Разные системы и генераторы статических сайтов «приняли» этот подход и добавили свою логику:
* Jekyll (часто используется с GitHub Pages);
* Hugo;
* Astro;
* Obsidian (для фильтрации и сортировки заметок);
* MkDocs. [```1```](https://zerodep.readthedocs.io/en/latest/modules/frontmatter/)[```17```](https://docs.github.com/en/contributing/writing-for-github-docs/using-yaml-frontmatter)[```13```](https://anti-magic.com/guides/0100-obsidian.html)

У каждого инструмента может быть свой набор «магических» полей, которые он распознаёт и использует при сборке сайта или рендеринге. Поэтому, если вы работаете с конкретным инструментом (например, настраиваете свой сайт на Astro), имеет смысл заглянуть в его документацию — там будет список поддерживаемых полей и их смысл. [```17```](https://docs.github.com/en/contributing/writing-for-github-docs/using-yaml-frontmatter)[```8```](https://docs.github.com/ru/contributing/writing-for-github-docs/using-yaml-frontmatter)[```15```](https://v4.docs.astro.build/ru/guides/markdown-content/)

## Практический совет

Не перегружайте frontmatter сразу всеми возможными полями. Начните с самого нужного (например, `title`, `date`, `tags`), а остальные добавляйте по мере необходимости. И помните: если вы используете поля, специфичные для какого-то инструмента, убедитесь, что этот инструмент действительно их поддерживает. [```13```](https://anti-magic.com/guides/0100-obsidian.html)[```17```](https://docs.github.com/en/contributing/writing-for-github-docs/using-yaml-frontmatter)

