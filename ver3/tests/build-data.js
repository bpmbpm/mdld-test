// build-data.js — пересоздаёт ver3/data.js из notes/ и SPARQL/ (альтернатива
// кнопке «Экспорт data.js» в интерфейсе). Запуск: node tests/build-data.js
const fs = require('fs');
const path = require('path');
const { ROOT, projectData, core } = require('./lib.js');

fs.writeFileSync(path.join(ROOT, 'data.js'), core.buildDataJs(projectData()));
console.log('data.js обновлён');
