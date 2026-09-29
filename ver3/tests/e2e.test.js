// E2E-тест в настоящем браузере (Playwright/Chromium): http:// и file://.
// Требует сеть (библиотеки грузятся с CDN). Пропускается, если E2E=0.
const test = require('node:test');
const assert = require('node:assert');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { ROOT } = require('./lib.js');

const SKIP = process.env.E2E === '0';
const SHOTS = process.env.SCREENSHOTS; // папка для скриншотов (необязательно)

const serve = () => new Promise((resolve) => {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
  const srv = http.createServer((req, res) => {
    const file = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': (types[path.extname(file)] || 'text/plain') + '; charset=utf-8' });
    fs.createReadStream(file).pipe(res);
  }).listen(0, () => resolve(srv));
});

const scenario = async (page, url, name) => {
  await page.goto(url);
  await page.waitForFunction(() => document.getElementById('log').textContent.includes('Приложение готово'), null, { timeout: 60000 });
  await page.selectOption('#note-select', 'note1.md');
  await page.waitForFunction(() => document.querySelector('#pane-2 pre.turtle'));
  assert.match(await page.textContent('#pane-0'), /\{=ex:alice/);           // raw
  assert.match(await page.innerHTML('#pane-1'), /<h1[^>]*>Алиса<\/h1>/);      // rendered
  assert.match(await page.textContent('#pane-2'), /schema:Person/);          // turtle
  await page.selectOption('#view-2', 'github');
  await page.waitForSelector('#pane-2 article.markdown-body');
  // сохранение вида
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#save-2')]);
  assert.strictEqual(dl.suggestedFilename(), 'note1.github.html');
  await page.selectOption('#view-2', 'turtle');
  // SPARQL
  await page.selectOption('#sparql-select', '05-hobbies.rq');
  await page.waitForFunction(() => document.getElementById('sparql-code').value.includes('knowsAbout'));
  await page.click('#run-sparql');
  await page.waitForSelector('#sparql-result table');
  assert.strictEqual(await page.locator('#sparql-result tbody tr').count(), 4);
  const [csv] = await Promise.all([page.waitForEvent('download'), page.click('#save-result')]);
  assert.strictEqual(csv.suggestedFilename(), '05-hobbies.result.csv');
  if (SHOTS) {
    fs.mkdirSync(SHOTS, { recursive: true });
    await page.setViewportSize({ width: 1600, height: 1300 });
    await page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: true });
  }
};

test('браузер: http:// и file://', { skip: SKIP, timeout: 180000 }, async (t) => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const srv = await serve();
  try {
    await t.test('http:// (как GitHub Pages)', async () => {
      const page = await browser.newPage({ acceptDownloads: true });
      await scenario(page, `http://localhost:${srv.address().port}/index.html`, 'ver3-http');
      assert.match(await page.textContent('#source-info'), /^Web/);
    });
    await t.test('file:// (desktop, источник data.js)', async () => {
      const page = await browser.newPage({ acceptDownloads: true });
      await scenario(page, 'file://' + path.join(ROOT, 'index.html'), 'ver3-file');
      assert.match(await page.textContent('#source-info'), /^data\.js/);
    });
  } finally {
    srv.close();
    await browser.close();
  }
});
