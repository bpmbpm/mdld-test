// Интеграционный тест: заметки → mdld-parse → Oxigraph → SPARQL.
// Воспроизводит проблему ver2 (пустые результаты 04–07) и проверяет исправление в ver3.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { ROOT, readDir, core } = require('./lib.js');

const buildStore = async (notesDir) => {
  const mdld = await import('mdld-parse');
  const ox = require('oxigraph');
  const store = new ox.Store();
  const files = core.filesWithExt(fs.readdirSync(notesDir), '.md');
  const quads = core.mergeQuads(files.map((f) => mdld.parse({ text: fs.readFileSync(path.join(notesDir, f), 'utf8') }).quads));
  quads.forEach((q) => store.add(q));
  return store;
};
const query = (store, text) => core.bindingsToTable(store.query(text));

test('ver2: запросы 04–07 пусты (воспроизведение ошибки)', async () => {
  const store = await buildStore(path.join(ROOT, '..', 'ver2', 'notes'));
  for (const f of ['04-persons.rq', '05-hobbies.rq', '06-worksfor.rq', '07-distance.rq']) {
    const q = fs.readFileSync(path.join(ROOT, '..', 'ver2', 'SPARQL', f), 'utf8');
    assert.strictEqual(query(store, q).rows.length, 0, f);
  }
});

test('ver3: все запросы возвращают ожидаемые данные', async () => {
  const store = await buildStore(path.join(ROOT, 'notes'));
  const q = Object.fromEntries(readDir('SPARQL', '.rq'));
  const rows = (f) => query(store, q[f]).rows;

  assert.ok(rows('01-all-triples.rq').length > 30);
  assert.strictEqual(rows('02-all-notes.rq').length, 10);
  assert.ok(rows('03-notes-by-author.rq').some((r) => r.type === 'http://schema.org/Person' && r.count === '2'));
  assert.deepStrictEqual(rows('04-persons.rq').map((r) => [r.name, r.city]), [['Алиса', 'Москва'], ['Боб', 'Химки']]);
  assert.deepStrictEqual(rows('05-hobbies.rq').map((r) => `${r.personName}:${r.hobbyName}`),
    ['Алиса:Фотография', 'Алиса:Шахматы', 'Боб:Велоспорт', 'Боб:Программирование']);
  assert.deepStrictEqual(rows('06-worksfor.rq').map((r) => `${r.personName}:${r.orgName}`),
    ['Алиса:Example Corp', 'Боб:Example Corp']);
  assert.deepStrictEqual(rows('07-distance.rq'), [{ fromName: 'Алиса', toName: 'Боб', value: '11', unit: 'km' }]);
});

test('manifest.json совпадают с содержимым папок', () => {
  for (const [dir, ext] of [['notes', '.md'], ['SPARQL', '.rq']]) {
    const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, dir, 'manifest.json'), 'utf8'));
    assert.deepStrictEqual(core.filesWithExt(manifest, ext), readDir(dir, ext).map(([f]) => f), dir);
  }
});

test('data.js синхронизирован с notes/ и SPARQL/ (иначе: node tests/build-data.js)', () => {
  const { projectData } = require('./lib.js');
  assert.strictEqual(fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8'), core.buildDataJs(projectData()));
});
