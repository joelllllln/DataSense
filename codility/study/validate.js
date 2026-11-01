#!/usr/bin/env node
/* Shape checks for codility/study/data_*.js. Usage: node codility/study/validate.js <files…> */
const fs = require('fs'), vm = require('vm');
const TOPICS = ['iter', 'arr', 'count', 'prefix', 'sort', 'stack', 'window', 'lead', 'bsearch', 'numbers'];
let problems = 0;
function bad(id, m) { problems++; console.log('  ✗ ' + id + ': ' + m); }
function warn(id, m) { console.log('  ! ' + id + ': ' + m); }
for (const f of process.argv.slice(2)) {
  console.log(f);
  const w = { STUDY: [] };
  try { vm.runInNewContext(fs.readFileSync(f, 'utf8'), { window: w }); } catch (e) { bad(f, 'does not load: ' + e.message); continue; }
  w.STUDY.forEach(t => {
    const id = t.topic || '?';
    if (TOPICS.indexOf(t.topic) < 0) bad(id, 'unknown topic');
    if (!t.name || !t.tagline) bad(id, 'needs name and tagline');
    const C = t.cards || [];
    if (C.length < 22 || C.length > 30) warn(id, C.length + ' cards (want 22–30)');
    let info = 0, quiz = 0, pred = 0;
    C.forEach((c, i) => {
      const cid = id + '#' + (i + 1);
      if (c.type === 'info') {
        info++;
        if (!c.title || !c.body) bad(cid, 'info needs title and body');
        const words = (c.body || '').split(/\s+/).length;
        if (words > 70) bad(cid, 'body is ' + words + ' words (max 60)'); else if (words > 60) warn(cid, 'body is ' + words + ' words');
        if (c.code && c.code.split('\n').length > 9) warn(cid, 'code is ' + c.code.split('\n').length + ' lines');
      } else if (c.type === 'quiz' || c.type === 'predict') {
        if (c.type === 'quiz') quiz++; else pred++;
        if (!c.q || !c.why) bad(cid, c.type + ' needs q and why');
        if (c.type === 'predict' && !c.code) bad(cid, 'predict needs code');
        if (!Array.isArray(c.choices) || c.choices.length < 3 || c.choices.length > 4) bad(cid, 'needs 3–4 choices');
        else if (new Set(c.choices.map(x => String(x).trim())).size !== c.choices.length) bad(cid, 'duplicate choices');
        if (c.type === 'predict') {
          // run the snippet with python and check its printed output equals choices[0]
          const cp = require('child_process');
          const r = cp.spawnSync('python3', ['-I', '-c', c.code], { encoding: 'utf8', timeout: 20000 });
          const out = (r.stdout || '').trim();
          if (r.status !== 0) bad(cid, 'predict code crashes: ' + (r.stderr || '').trim().split('\n').pop());
          else if (out !== String(c.choices[0]).trim()) bad(cid, 'predict prints ' + JSON.stringify(out) + ' but choices[0] is ' + JSON.stringify(c.choices[0]));
        }
      } else bad(cid, 'unknown type ' + c.type);
    });
    if (C.length && C[C.length - 1].type !== 'quiz') warn(id, 'last card should be a quiz');
    if (!C.some(c => c.type === 'info' && /cheat sheet/i.test(c.title || ''))) warn(id, 'no Cheat sheet card');
    const checks = quiz + pred;
    if (C.length && checks / C.length < 0.3) warn(id, 'only ' + checks + ' checks in ' + C.length + ' cards');
    if (/[^\x00-\x7F]/.test(JSON.stringify(C.map(c => c.code || '')))) warn(id, 'non-ASCII in code');
  });
}
console.log(problems ? problems + ' problem(s)' : 'OK');
process.exit(problems ? 1 : 0);
