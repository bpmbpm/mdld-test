// ============================================================================
// config.js — настройки проекта ver3.
//
// Подключается обычным <script src="config.js"> (а не fetch('config.json')),
// поэтому читается и через file:// без ошибок CORS. Приём взят из
// https://github.com/bpmbpm/family-tree/blob/main/ver7/config.js (см. doc/CORS.md).
// ============================================================================
window.CONFIG = {
  // Репозиторий GitHub, из которого режим «GitHub (raw)» читает актуальные файлы
  githubRepo: 'bpmbpm/mdld-test',
  githubBranch: 'main',
  githubBasePath: 'ver3',

  // Папки с данными (относительно папки проекта)
  notesDir: 'notes',
  sparqlDir: 'SPARQL',

  // Версии библиотек закреплены, чтобы обновление на CDN не ломало приложение
  libs: {
    mdldParse: 'https://cdn.jsdelivr.net/npm/mdld-parse@1.0.8/+esm',
    oxigraph:  'https://cdn.jsdelivr.net/npm/oxigraph@0.5.11/web.js',
    marked:    'https://cdn.jsdelivr.net/npm/marked@18.0.14/+esm',
    n3:        'https://cdn.jsdelivr.net/npm/n3@2.7.12/+esm',
    // CSS для режима «Markdown (GitHub)»
    githubCss: 'https://cdn.jsdelivr.net/npm/github-markdown-css@5.8.1/github-markdown-light.css'
  },

  // Трассировка вызовов библиотек в окне лога (false — только основные события)
  trace: true
};
