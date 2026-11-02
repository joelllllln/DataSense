#!/usr/bin/env node
/* Shape checks for codility/study/data_*.js. Usage: node codility/study/validate.js <files…> */
const fs = require('fs'), vm = require('vm');
const SIMPLE = process.argv.includes('--simple');
const TOPICS = ['iter', 'arr', 'count', 'prefix', 'sort', 'stack', 'window', 'lead', 'bsearch', 'numbers'];
let problems = 0;
function bad(id, m) { problems++; console.log('  ✗ ' + id + ': ' + m); }
function warn(id, m) { console.log('  ! ' + id + ': ' + m); }
for (const f of process.argv.slice(2).filter(a => a !== '--simple')) {
  console.log(f);
  const w = { STUDY: [] };
  try { vm.runInNewContext(fs.readFileSync(f, 'utf8'), { window: w }); } catch (e) { bad(f, 'does not load: ' + e.message); continue; }
  w.STUDY.forEach(t => {
    const id = t.topic || '?';
    if (TOPICS.indexOf(t.topic) < 0) bad(id, 'unknown topic');
    if (!t.name || !t.tagline) bad(id, 'needs name and tagline');
    const C = t.cards || [];
    if (SIMPLE) { if (C.length < 13 || C.length > 18) bad(id, C.length + ' cards (want 13–18)'); }
    else if (C.length < 22 || C.length > 30) warn(id, C.length + ' cards (want 22–30)');
    let info = 0, quiz = 0, pred = 0;
    C.forEach((c, i) => {
      const cid = id + '#' + (i + 1);
      if (c.type === 'info') {
        info++;
        if (!c.title || !c.body) bad(cid, 'info needs title and body');
        const words = (c.body || '').split(/\s+/).length;
        if (SIMPLE) {
          if (words > 40) bad(cid, 'body is ' + words + ' words (max 40)');
          if ((c.title || '').split(/\s+/).length > 6) bad(cid, 'title over 6 words');
          (c.body || '').split(/(?<=[.!?])\s+|\n/).forEach(sn => { const n = sn.trim().split(/\s+/).filter(Boolean).length; if (n > 12) bad(cid, 'sentence over 12 words: "' + sn.trim().slice(0, 50) + '"'); });
          if (/;|\(/.test((c.body || '').replace(/`[^`]*`/g, ''))) warn(cid, 'semicolon or bracket in body');
          if (c.code) { const L = c.code.split('\n'); if (L.length > 6) bad(cid, 'code is ' + L.length + ' lines (max 6)'); L.forEach(l => { if (l.length > 44) bad(cid, 'code line over 44 chars: ' + l.trim().slice(0, 30)); }); }
        } else {
          if (words > 70) bad(cid, 'body is ' + words + ' words (max 60)'); else if (words > 60) warn(cid, 'body is ' + words + ' words');
          if (c.code && c.code.split('\n').length > 9) warn(cid, 'code is ' + c.code.split('\n').length + ' lines');
        }
      } else if (c.type === 'quiz' || c.type === 'predict') {
        if (c.type === 'quiz') quiz++; else pred++;
        if (!c.q || !c.why) bad(cid, c.type + ' needs q and why');
        if (SIMPLE) {
          if ((c.q || '').split(/\s+/).length > 16) bad(cid, 'question over 16 words');
          if ((c.why || '').split(/\s+/).length > 15) bad(cid, 'why over 15 words');
          if (c.type === 'quiz' && (c.choices || []).length !== 3) bad(cid, 'quiz needs exactly 3 choices');
          (c.choices || []).forEach(ch => { if (String(ch).split(/\s+/).length > 8) bad(cid, 'choice over 8 words: ' + ch); });
          if (c.type === 'predict' && c.code && c.code.split('\n').length > 5) bad(cid, 'predict code over 5 lines');
        }
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
    const checks = quiz + pred;
    if (SIMPLE) {
      const last = C[C.length - 1] || {};
      if (!(last.type === 'info' && /^cheat sheet$/i.test(last.title || ''))) bad(id, 'last card must be the Cheat sheet info card');
      if (C.length > 1 && C[C.length - 2].type !== 'quiz') bad(id, 'card before Cheat sheet must be a quiz');
      if (checks < 3 || checks > 5) bad(id, checks + ' checks (want 3–5)');
    } else {
      if (C.length && C[C.length - 1].type !== 'quiz') warn(id, 'last card should be a quiz');
      if (!C.some(c => c.type === 'info' && /cheat sheet/i.test(c.title || ''))) warn(id, 'no Cheat sheet card');
      if (C.length && checks / C.length < 0.3) warn(id, 'only ' + checks + ' checks in ' + C.length + ' cards');
    }
    if (/[^\x00-\x7F]/.test(JSON.stringify(C.map(c => c.code || '')))) warn(id, 'non-ASCII in code');
  });
}
console.log(problems ? problems + ' problem(s)' : 'OK');
process.exit(problems ? 1 : 0);
