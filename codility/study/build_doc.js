#!/usr/bin/env node
/* Builds the single-page "Codility Notes" document (phone-first) from the simple study decks.
   Usage: node codility/study/build_doc.js [srcDir] [out.html]
   Default src: codility/study/simple   Default out: /tmp/codility-notes.html            */
const fs = require('fs'), vm = require('vm'), path = require('path');
const src = process.argv[2] || path.join(__dirname, 'simple');
const out = process.argv[3] || '/tmp/codility-notes.html';
const ORDER = ['iter', 'arr', 'count', 'prefix', 'sort', 'stack', 'window', 'lead', 'bsearch', 'numbers'];
const w = { STUDY: [] };
ORDER.forEach(id => { const f = path.join(src, 'data_' + id + '.js'); if (fs.existsSync(f)) vm.runInNewContext(fs.readFileSync(f, 'utf8'), { window: w }); });
const T = ORDER.map(id => w.STUDY.find(t => t.topic === id)).filter(Boolean);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const md = s => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
  .split(/\n\s*\n/).map(p => '<p>' + p.replace(/\n/g, '<br>') + '</p>').join('');
const total = T.reduce((a, t) => a + t.cards.length, 0);

let home = T.map((t, i) => `<a class="row" href="#${t.topic}"><span class="num">${i + 1}</span><span class="rt"><b>${esc(t.name)}</b><small>${esc(t.tagline)}</small></span><span class="chev">›</span></a>`).join('');
let views = '';
T.forEach((t, i) => {
  let cards = '';
  t.cards.forEach(c => {
    if (c.type === 'info') {
      const cheat = /cheat sheet/i.test(c.title);
      cards += `<article class="card${cheat ? ' cheat' : ''}"><h3>${esc(c.title)}</h3>${md(c.body)}${c.code ? `<pre><code>${esc(c.code)}</code></pre>` : ''}</article>`;
    } else {
      cards += `<details class="check"><summary><span class="lab">${c.type === 'predict' ? 'What prints?' : 'Quick check'}</span>${c.code ? `<pre><code>${esc(c.code)}</code></pre>` : ''}<span class="q">${esc(c.q)}</span><span class="tap">Tap for the answer</span></summary><div class="ans"><p><b>${esc(c.choices[0])}</b></p><p>${md(c.why).replace(/^<p>|<\/p>$/g, '')}</p></div></details>`;
    }
  });
  const next = T[i + 1];
  views += `<section class="view" id="${t.topic}" hidden><nav class="top"><a href="#" class="back">‹ Topics</a><span class="where">${i + 1} of ${T.length}</span></nav><h2>${esc(t.name)}</h2><p class="tag">${esc(t.tagline)}</p>${cards}<div class="nextrow">${next ? `<a class="next" href="#${next.topic}">Next: ${esc(next.name)} ›</a>` : `<a class="next" href="#">Back to topics ›</a>`}</div></section>`;
});

const html = `<title>Codility Notes</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
/* Layout: phone-first. A list of topics; tap one and you get that topic alone, cards stacked, big type. */
:root{--bg:#F7F6F2;--sheet:#FFFFFF;--fg:#1D2430;--muted:#66727F;--rule:#E0E3E8;--accent:#1D4ED8;--accent-soft:#E7EDFC;--code-bg:#EEF0EB;--check:#9A5B00;--check-soft:#FFF5E1;--ok:#1B7A3B;
  --display:'Source Serif 4',Georgia,serif;--body:-apple-system,BlinkMacSystemFont,'SF Pro Text','Segoe UI',Arial,sans-serif;--mono:'SF Mono',Menlo,Consolas,monospace}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#14171C;--sheet:#1C2127;--fg:#E8E7E2;--muted:#A2ABB6;--rule:#333A43;--accent:#8FA8F6;--accent-soft:#222B45;--code-bg:#121518;--check:#F0B55C;--check-soft:#3A2E17;--ok:#7BCB83;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#14171C;--sheet:#1C2127;--fg:#E8E7E2;--muted:#A2ABB6;--rule:#333A43;--accent:#8FA8F6;--accent-soft:#222B45;--code-bg:#121518;--check:#F0B55C;--check-soft:#3A2E17;--ok:#7BCB83;color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font-family:var(--body);font-size:18px;line-height:1.5;padding-block:18px 70px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));-webkit-text-size-adjust:100%}
main{max-width:560px;margin:0 auto}
h1{font-family:var(--display);font-size:2rem;line-height:1.15;margin:4px 0 6px;text-wrap:balance}
.lede{color:var(--muted);margin:0 0 20px;font-size:1rem}
.list{display:flex;flex-direction:column;gap:8px}
.row{display:flex;align-items:center;gap:12px;padding:14px 14px;border-radius:14px;background:var(--sheet);border:1px solid var(--rule);color:var(--fg);text-decoration:none;min-height:60px}
.row:active{border-color:var(--accent)}
.rt{display:flex;flex-direction:column;min-width:0;flex:1}
.rt b{font-size:1.05rem}
.rt small{color:var(--muted);font-size:.9rem;line-height:1.35}
.num{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;background:var(--accent-soft);color:var(--accent);font-weight:700;font-size:14px;flex:none}
.chev{color:var(--muted);font-size:1.4rem}
.top{display:flex;justify-content:space-between;align-items:center;min-height:44px;margin-bottom:4px}
.back{color:var(--accent);text-decoration:none;font-weight:600;font-size:1.05rem;padding:8px 8px 8px 0}
.where{color:var(--muted);font-size:.9rem}
h2{font-family:var(--display);font-size:1.75rem;line-height:1.15;margin:0 0 4px;text-wrap:balance}
.tag{color:var(--muted);margin:0 0 16px;font-size:1rem}
.card,.check{background:var(--sheet);border:1px solid var(--rule);border-radius:14px;padding:16px;margin:0 0 12px;min-width:0}
.card h3{font-size:1.2rem;line-height:1.3;margin:0 0 8px}
.card p{margin:0}.card p+p{margin-top:8px}
.card.cheat{border-color:var(--accent);background:var(--accent-soft)}
.card.cheat h3{color:var(--accent)}
code{font-family:var(--mono);font-size:.92em;background:var(--code-bg);padding:1px 6px;border-radius:6px}
pre{margin:12px 0 0;background:var(--code-bg);border-radius:10px;padding:12px 14px;overflow-x:auto}
pre code{background:none;padding:0;font-size:.95rem;line-height:1.5}
.check{border-left:4px solid var(--check);padding:0}
.check summary{cursor:pointer;padding:14px 16px;list-style:none;display:flex;flex-direction:column;gap:6px}
.check summary::-webkit-details-marker{display:none}
.check .lab{font-size:.75rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--check)}
.check .q{font-weight:600;font-size:1.05rem;line-height:1.35}
.check .tap{color:var(--muted);font-size:.9rem}
.check[open] .tap{display:none}
.check summary pre{margin:4px 0}
.ans{margin:0 16px 16px;padding:12px 14px;background:var(--check-soft);border-radius:10px}
.ans p{margin:0}.ans p:first-child{color:var(--ok);font-size:1.05rem}.ans p+p{margin-top:4px}
.nextrow{margin-top:18px}
.next{display:flex;align-items:center;justify-content:center;min-height:54px;border-radius:14px;background:var(--accent);color:#fff;text-decoration:none;font-weight:600;font-size:1.05rem;padding:12px 16px;text-align:center}
.foot{color:var(--muted);font-size:.9rem;margin-top:28px;border-top:1px solid var(--rule);padding-top:12px}
.foot a{color:var(--accent)}
a:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
</style>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,600&display=swap">
<main>
<section class="view" id="home">
<h1>Codility Notes</h1>
<p class="lede">${total} short notes. One idea each. Pick a topic. Read it top to bottom, then go practise it in the trainer.</p>
<div class="list">${home}</div>
<p class="foot">Practise the code: <a href="https://joelllllln.github.io/DataSense/codility/">Codility Trainer</a>.</p>
</section>
${views}
</main>
<script>
(function () {
  var ids = ${JSON.stringify(T.map(t => t.topic))};
  function show() {
    var id = (location.hash || '#').slice(1);
    if (ids.indexOf(id) < 0) id = 'home';
    document.querySelectorAll('.view').forEach(function (v) { v.hidden = v.id !== id; });
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', show);
  show();
})();
</script>`;
fs.writeFileSync(out, html);
console.log('wrote', out, T.length + ' topics', total + ' cards', html.length + ' bytes');
