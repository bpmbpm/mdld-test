// lib.js — общие помощники тестов: чтение notes/ и SPARQL/ с диска.
const fs = require('fs');
const path = require('path');
const core = require('../js/core.js');

const ROOT = path.resolve(__dirname, '..');
const readDir = (dir, ext) =>
  core.filesWithExt(fs.readdirSync(path.join(ROOT, dir)), ext)
    .map((f) => [f, fs.readFileSync(path.join(ROOT, dir, f), 'utf8')]);

/** Содержимое папок проекта в формате window.MDLD_DATA. */
const projectData = () => ({
  notes: Object.fromEntries(readDir('notes', '.md')),
  SPARQL: Object.fromEntries(readDir('SPARQL', '.rq'))
});

module.exports = { ROOT, readDir, projectData, core };
