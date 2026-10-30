#!/usr/bin/env node
/* Validates one or more codility/data_*.js files:
   shape checks, then every lesson's solution is run against its tests with
   real CPython through the same harness the browser uses.
   Usage: node codility/validate.js codility/data_window.js [more files…]   */
const fs = require('fs'), vm = require('vm'), path = require('path'), cp = require('child_process');
const root = path.join(__dirname);
const w = {};
vm.runInNewContext(fs.readFileSync(path.join(root, 'harness.js'), 'utf8'), { window: w });
const HARNESS = w.PYHARNESS;
const files = process.argv.slice(2);
if (!files.length) { console.error('give me a data file'); process.exit(2); }
let problems = 0;
function bad(id, msg) { problems++; console.log('  ✗ ' + id + ': ' + msg); }
function warn(id, msg) { console.log('  ! ' + id + ': ' + msg); }
const REQ = ['topic', 'id', 'title', 'idea', 'brief', 'fn', 'sig', 'starter', 'examples', 'tests', 'hint', 'solution', 'walk', 'complexity'];
const TOPICS = ['basics', 'iter', 'arr', 'count', 'prefix', 'sort', 'stack', 'window', 'lead', 'bsearch', 'numbers'];

function runPy(code, cases, opts) {
  const py = HARNESS + '\nimport sys, json\n_d = json.load(open(sys.argv[1]))\nprint(_ds_run(_d["code"], json.dumps(_d["cases"]), json.dumps(_d["opts"])))\n';
  const tmp = path.join(require('os').tmpdir(), 'cod_' + process.pid + '.json');
  fs.writeFileSync(tmp, JSON.stringify({ code, cases, opts }));
  const r = cp.spawnSync('python3', ['-I', '-c', py, tmp], { encoding: 'utf8', timeout: 60000 });
  fs.unlinkSync(tmp);
  if (r.status !== 0) return { ok: false, error: (r.stderr || '').slice(-600) };
  try { return JSON.parse(r.stdout.trim().split('\n').pop()); } catch (e) { return { ok: false, error: 'bad runner output: ' + r.stdout.slice(-300) }; }
}

for (const f of files) {
  console.log(f);
  const win = { CODILITY: [] };
  try { vm.runInNewContext(fs.readFileSync(f, 'utf8'), { window: win }); }
  catch (e) { bad(f, 'does not load: ' + e.message); continue; }
  const L = win.CODILITY;
  if (L.length < 18 || L.length > 26) warn(f, L.length + ' lessons (want 18–22)');
  const ids = new Set();
  L.forEach((t, i) => {
    const id = t.id || ('#' + i);
    REQ.forEach(k => { if (t[k] === undefined || t[k] === '' || (Array.isArray(t[k]) && !t[k].length)) bad(id, 'missing ' + k); });
    if (TOPICS.indexOf(t.topic) < 0) bad(id, 'unknown topic ' + t.topic);
    if (!/^[a-z]+-\d\d$/.test(t.id || '')) bad(id, 'id must look like window-01');
    if (ids.has(t.id)) bad(id, 'duplicate id'); ids.add(t.id);
    const n = parseInt((t.id || '').split('-')[1], 10);
    if (n !== i + 1) bad(id, 'ids must be in order 01, 02, …');
    if (t.fn !== 'solution') bad(id, 'fn must be solution');
    if (t.sig && !/^def solution\(/.test(t.sig)) bad(id, 'sig must start with def solution(');
    if (t.starter && t.starter.indexOf(t.sig) !== 0) bad(id, 'starter must start with the sig');
    if (t.solution && t.solution.indexOf('def solution(') < 0) bad(id, 'solution must define solution');
    if ((t.tests || []).length < 5) bad(id, 'fewer than 5 tests');
    if (!(t.tests || []).some(c => c.hidden)) warn(id, 'no hidden test');
    if (!(t.tests || []).some(c => /big/i.test(c.name || ''))) warn(id, 'no "big input" test');
    (t.tests || []).forEach((c, j) => { if (!c.call || !c.expect) bad(id, 'test ' + j + ' needs call and expect'); });
    if (/[^\x00-\x7F]/.test(t.solution || '') || /[^\x00-\x7F]/.test(t.starter || '')) warn(id, 'non-ASCII in code');
    if ((t.idea || '').length > 400) warn(id, 'idea is long (' + t.idea.length + ' chars)');
    if (problems) return;
    const opts = { unordered: !!t.unordered, tol: t.tol || 1e-6, budget: t.budget || 10, setup: t.setup || '' };
    const t0 = Date.now();
    const res = runPy(t.solution, t.tests, opts);
    const ms = Date.now() - t0;
    if (!res.ok) bad(id, 'solution crashed: ' + res.error);
    else res.results.forEach(r => { if (!r.pass) bad(id, 'solution FAILS ' + (r.name || r.call) + ' → got ' + r.got + ', expected ' + r.expect + (r.error ? ' (' + r.error + ')' : '')); });
    if (ms > 3000) warn(id, 'solution took ' + ms + ' ms locally (browser is 3–5× slower; budget 10 s)');
    const st = runPy(t.starter, t.tests, opts);
    if (st.ok && st.results.every(r => r.pass)) bad(id, 'the starter already passes every test');
    (t.examples || []).forEach(ex => {
      const er = runPy(t.solution, [{ call: ex.in, expect: ex.out }], opts);
      if (!er.ok || !er.results[0].pass) bad(id, 'example ' + ex.in + ' does not give ' + ex.out + (er.ok ? ' (got ' + er.results[0].got + ')' : ''));
    });
  });
}
console.log(problems ? problems + ' problem(s)' : 'OK');
process.exit(problems ? 1 : 0);
