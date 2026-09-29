// Модульные тесты чистых функций js/core.js
const test = require('node:test');
const assert = require('node:assert');
const core = require('../js/core.js');

test('escapeHtml экранирует спецсимволы', () => {
  assert.strictEqual(core.escapeHtml('<a href="x">&</a>'), '&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;');
});

test('saveFileName строит имя по виду', () => {
  assert.strictEqual(core.saveFileName('note1.md', 'turtle'), 'note1.turtle.ttl');
  assert.strictEqual(core.saveFileName('note1.md', 'github'), 'note1.github.html');
  assert.strictEqual(core.saveFileName('note1.md', 'raw'), 'note1.raw.md');
});

test('NOTE_VIEWS содержит четыре вида, включая GitHub', () => {
  assert.deepStrictEqual(core.NOTE_VIEWS.map((v) => v.id), ['raw', 'rendered', 'turtle', 'github']);
});

test('filesWithExt фильтрует, убирает дубли и сортирует', () => {
  assert.deepStrictEqual(core.filesWithExt(['b.md', 'a.md', 'x.json', 'a.md'], '.md'), ['a.md', 'b.md']);
});

test('bindingsToTable / tableToCsv / tableToHtml', () => {
  const term = (value) => ({ value });
  const results = [new Map([['name', term('Алиса')], ['city', term('Москва, центр')]])];
  const table = core.bindingsToTable(results);
  assert.deepStrictEqual(table, { vars: ['name', 'city'], rows: [{ name: 'Алиса', city: 'Москва, центр' }] });
  assert.strictEqual(core.tableToCsv(table), 'name,city\nАлиса,"Москва, центр"\n');
  assert.match(core.tableToHtml(table), /<td>Алиса<\/td>/);
  assert.strictEqual(core.tableToHtml({ vars: [], rows: [] }), '<em>Нет результатов</em>');
});

test('compactIri сокращает известные префиксы', () => {
  assert.strictEqual(core.compactIri('http://schema.org/Person'), 'schema:Person');
  assert.strictEqual(core.compactIri('urn:x'), 'urn:x');
});

test('mergeQuads убирает дубликаты', () => {
  const t = (v) => ({ termType: 'NamedNode', value: v });
  const q = { subject: t('s'), predicate: t('p'), object: t('o'), graph: { termType: 'DefaultGraph', value: '' } };
  assert.strictEqual(core.mergeQuads([[q], [{ ...q }]]).length, 1);
});
