/* Codility Study — bite-sized teaching cards with quick checks. One card at a time. */
(function () {
  'use strict';
  var app = document.getElementById('app');
  var ORDER_IDS = ['iter', 'arr', 'count', 'prefix', 'sort', 'stack', 'window', 'lead', 'bsearch', 'numbers'];
  var RAW = window.STUDY || [];
  var TOPICS = ORDER_IDS.map(function (id) { return RAW.filter(function (t) { return t.topic === id; })[0]; }).filter(Boolean);
  TOPICS.forEach(function (t) { t.cards.forEach(function (c, i) { c.id = t.topic + '-' + (i + 1); c.topic = t.topic; c.tname = t.name; }); });
  function allCards() { var o = []; TOPICS.forEach(function (t) { o = o.concat(t.cards); }); return o; }
  function isCheck(c) { return c.type === 'quiz' || c.type === 'predict'; }

  /* ---------- helpers ---------- */
  function h(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ls(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function md(s) {
    return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .split(/\n\s*\n/).map(function (p) { return '<p>' + p.replace(/\n/g, '<br>') + '</p>'; }).join('');
  }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function highlightPy(src) {
    var re = /(#[^\n]*)|('''[\s\S]*?'''|"""[\s\S]*?"""|'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*")|(\b\d+\.?\d*(?:[eE][+-]?\d+)?\b)|(\b(?:def|return|if|elif|else|for|while|in|not|and|or|is|import|from|as|class|try|except|finally|raise|with|lambda|pass|break|continue|yield|None|True|False|print|len|range|max|min|sum|sorted|set|dict|list|abs)\b)|(\b[A-Za-z_]\w*\b)(?=\s*\()|(\b[A-Za-z_]\w*\b)/g;
    var out = '', last = 0, m;
    while ((m = re.exec(src))) {
      if (m.index > last) out += esc(src.slice(last, m.index));
      if (m[1] !== undefined) out += '<span class="tok-com">' + esc(m[1]) + '</span>';
      else if (m[2] !== undefined) out += '<span class="tok-str">' + esc(m[2]) + '</span>';
      else if (m[3] !== undefined) out += '<span class="tok-num">' + esc(m[3]) + '</span>';
      else if (m[4] !== undefined) out += '<span class="tok-kw">' + esc(m[4]) + '</span>';
      else if (m[5] !== undefined) out += '<span class="tok-fn">' + esc(m[5]) + '</span>';
      else out += '<span class="tok-var">' + esc(m[6]) + '</span>';
      last = re.lastIndex;
    }
    return out + esc(src.slice(last));
  }
  function codeEl(src) { var p = h('<pre class="code"></pre>'); p.innerHTML = highlightPy(src); return p; }

  /* ---------- progress ---------- */
  var P = ls('cst_prog', {});      // cardId -> {seen:1, ok:n, bad:n}
  function saveP() { lsSet('cst_prog', P); }
  function seen(c) { return !!(P[c.id] && P[c.id].seen); }
  function markSeen(c) { P[c.id] = P[c.id] || {}; P[c.id].seen = 1; saveP(); }
  function markAns(c, ok) { P[c.id] = P[c.id] || {}; P[c.id].seen = 1; if (ok) P[c.id].ok = (P[c.id].ok || 0) + 1; else P[c.id].bad = (P[c.id].bad || 0) + 1; P[c.id].last = ok ? 'ok' : 'bad'; saveP(); }
  function weak(c) { return isCheck(c) && P[c.id] && P[c.id].last === 'bad'; }
  function nextTopicPos() {
    for (var i = 0; i < TOPICS.length; i++) {
      var cs = TOPICS[i].cards; for (var j = 0; j < cs.length; j++) if (!seen(cs[j])) return { t: TOPICS[i], i: j };
    }
    return null;
  }

  /* ---------- views ---------- */
  function clear() { app.innerHTML = ''; window.scrollTo(0, 0); }

  function home() {
    clear();
    var all = allCards(), done = all.filter(seen).length;
    app.appendChild(h('<div class="bar"><h1>Codility Study</h1><span class="pill">' + all.length + ' cards</span></div>'));
    var np = nextTopicPos();
    if (np) {
      var c = h('<button class="cont"><div><b>' + (done ? 'Continue' : 'Start') + ': ' + esc(np.t.name) + '</b><span>card ' + (np.i + 1) + ' of ' + np.t.cards.length + '</span></div><span class="chev">›</span></button>');
      c.onclick = function () { study(np.t, np.i); };
      app.appendChild(c);
    } else if (all.length) app.appendChild(h('<div class="panel"><h2>All read</h2><p class="note">Every card is read. Quiz yourself, or reopen any topic.</p></div>'));

    var weakN = all.filter(weak).length;
    var r2 = h('<div class="row2"><button class="btn p">Quiz me (20 random)</button><button class="btn"' + (weakN ? '' : ' disabled') + '>Redo ' + weakN + ' I got wrong</button></div>');
    r2.children[0].onclick = function () { quizMe(shuffle(all.filter(isCheck)).slice(0, 20), 'Quiz me'); };
    r2.children[1].onclick = function () { quizMe(shuffle(all.filter(weak)), 'The ones I got wrong'); };
    app.appendChild(r2);

    var list = h('<div class="panel"><h2>Topics, in order</h2></div>');
    TOPICS.forEach(function (t, ti) {
      var n = t.cards.filter(seen).length;
      var row = h('<div class="topic"><span class="num">' + (ti + 1) + '</span><button class="n"><b>' + esc(t.name) + '</b><span>' + esc(t.tagline) + '</span><div class="pbar"><i style="width:' + Math.round(100 * n / t.cards.length) + '%"></i></div></button><span class="pct">' + n + ' / ' + t.cards.length + '</span><button class="sheet" title="Cheat sheet">☰</button></div>');
      row.querySelector('.n').onclick = function () { var first = t.cards.findIndex(function (c) { return !seen(c); }); study(t, first < 0 ? 0 : first); };
      row.querySelector('.sheet').onclick = function () { sheet(t); };
      list.appendChild(row);
    });
    app.appendChild(list);
    var f = h('<div class="foot">Want to code it? Open the <a href="../">Codility Trainer</a>. · <button class="btn ghost sm">Reset progress</button></div>');
    f.querySelector('button').onclick = function () { if (confirm('Reset reading and quiz progress?')) { P = {}; saveP(); home(); } };
    app.appendChild(f);
  }

  // One card at a time through a topic, starting at index i.
  function study(t, start) {
    var i = start || 0, cards = t.cards, got = 0, miss = 0;
    function show() {
      if (i >= cards.length) { finish(); return; }
      var c = cards[i];
      clear();
      var bar = h('<div class="bar"><button class="back">‹ Topics</button><div class="title"><b>' + esc(t.name) + '</b><span class="sub">card ' + (i + 1) + ' of ' + cards.length + '</span></div></div>');
      bar.querySelector('.back').onclick = home;
      app.appendChild(bar);
      app.appendChild(h('<div class="prog"><i style="width:' + Math.round(100 * i / cards.length) + '%"></i></div>'));
      var box = h('<div class="card"></div>'); app.appendChild(box);
      var btns = h('<div class="btns"></div>'); app.appendChild(btns);
      var prev = h('<button class="btn ghost sm">‹ Back</button>'); prev.disabled = i === 0; prev.onclick = function () { i--; show(); };
      if (c.type === 'info') {
        box.appendChild(h('<div class="tag">' + esc(t.name) + '</div>'));
        box.appendChild(h('<h3>' + esc(c.title) + '</h3>'));
        box.appendChild(h('<div class="body">' + md(c.body) + '</div>'));
        if (c.code) box.appendChild(codeEl(c.code));
        markSeen(c);
        var nx = h('<button class="btn p">' + (i + 1 < cards.length ? 'Next ›' : 'Finish') + '</button>');
        nx.onclick = function () { i++; show(); };
        btns.appendChild(prev); btns.appendChild(nx);
        box.onclick = function (e) { if (e.target.tagName !== 'PRE' && e.target.tagName !== 'CODE') nx.click(); };
      } else {
        renderCheck(c, box, btns, prev, function (ok) { if (ok) got++; else miss++; }, function () { i++; show(); });
      }
    }
    function finish() {
      clear();
      app.appendChild(h('<div class="bar"><button class="back">‹ Topics</button></div>'));
      app.querySelector('.back').onclick = home;
      app.appendChild(h('<div class="done"><div class="big">' + (miss === 0 ? '🎉' : '📒') + '</div><h2>' + esc(t.name) + ' done</h2><p>Checks this run:</p><div class="stats"><div class="stat"><b>' + got + '</b><span>right</span></div><div class="stat"><b>' + miss + '</b><span>wrong</span></div></div></div>'));
      var b = h('<div class="btns" style="flex-direction:column"></div>');
      var ti = TOPICS.indexOf(t), nt = TOPICS[ti + 1];
      if (nt) { var n1 = h('<button class="btn p">Next topic: ' + esc(nt.name) + ' ›</button>'); n1.onclick = function () { study(nt, 0); }; b.appendChild(n1); }
      var s1 = h('<button class="btn">Cheat sheet for this topic</button>'); s1.onclick = function () { sheet(t); }; b.appendChild(s1);
      var q1 = h('<button class="btn">Quiz me on this topic</button>'); q1.onclick = function () { quizMe(shuffle(t.cards.filter(isCheck)), t.name + ' quiz'); }; b.appendChild(q1);
      var hm = h('<button class="btn ghost">Home</button>'); hm.onclick = home; b.appendChild(hm);
      app.appendChild(b);
    }
    show();
  }

  // A quiz or predict card: pick, see right/wrong + why, then Next.
  function renderCheck(c, box, btns, prevBtn, onAnswer, onNext) {
    box.appendChild(h('<div class="tag q">' + (c.type === 'predict' ? 'Predict the output' : 'Quick check') + ' · ' + esc(c.tname) + '</div>'));
    if (c.code) box.appendChild(codeEl(c.code));
    box.appendChild(h('<h3>' + esc(c.q) + '</h3>'));
    var wrap = h('<div class="choices"></div>'); box.appendChild(wrap);
    var opts = c.choices.map(function (txt, k) { return { txt: txt, ok: k === 0 }; });
    shuffle(opts);
    var answered = false;
    opts.forEach(function (o) {
      var b = h('<button class="choice"></button>'); b.textContent = o.txt;
      b.onclick = function () {
        if (answered) return; answered = true;
        wrap.querySelectorAll('.choice').forEach(function (x, k) { x.classList.add(opts[k].ok ? 'right' : (x === b ? 'wrong' : 'dim')); });
        var w = h('<div class="why' + (o.ok ? '' : ' bad') + '"><b>' + (o.ok ? 'Right' : 'Not quite') + '</b>' + md(c.why) + '</div>');
        box.appendChild(w);
        markAns(c, o.ok); onAnswer(o.ok);
        btns.innerHTML = '';
        if (prevBtn) btns.appendChild(prevBtn);
        var nx = h('<button class="btn p">Next ›</button>'); nx.onclick = onNext; btns.appendChild(nx); nx.focus();
      };
      wrap.appendChild(b);
    });
    if (prevBtn) btns.appendChild(prevBtn);
    var skip = h('<button class="btn ghost">Skip</button>'); skip.onclick = onNext; btns.appendChild(skip);
  }

  // A run of checks only (random, weak ones, or a topic's).
  function quizMe(cards, name) {
    if (!cards.length) return home();
    var i = 0, got = 0, miss = 0;
    function show() {
      if (i >= cards.length) { finish(); return; }
      clear();
      var bar = h('<div class="bar"><button class="back">‹ Stop</button><div class="title"><b>' + esc(name) + '</b><span class="sub">' + (i + 1) + ' of ' + cards.length + ' · ' + got + ' right</span></div></div>');
      bar.querySelector('.back').onclick = home;
      app.appendChild(bar);
      app.appendChild(h('<div class="prog"><i style="width:' + Math.round(100 * i / cards.length) + '%"></i></div>'));
      var box = h('<div class="card"></div>'); app.appendChild(box);
      var btns = h('<div class="btns"></div>'); app.appendChild(btns);
      renderCheck(cards[i], box, btns, null, function (ok) { if (ok) got++; else miss++; }, function () { i++; show(); });
    }
    function finish() {
      clear();
      app.appendChild(h('<div class="bar"><button class="back">‹ Home</button></div>'));
      app.querySelector('.back').onclick = home;
      var pct = cards.length ? Math.round(100 * got / cards.length) : 0;
      app.appendChild(h('<div class="done"><div class="big">' + (pct >= 80 ? '🎉' : '📒') + '</div><h2>' + pct + '%</h2><p>' + got + ' right, ' + miss + ' wrong.</p></div>'));
      var b = h('<div class="btns" style="flex-direction:column"></div>');
      var weakNow = allCards().filter(weak);
      if (weakNow.length) { var r = h('<button class="btn p">Redo the ' + weakNow.length + ' I got wrong</button>'); r.onclick = function () { quizMe(shuffle(weakNow), 'The ones I got wrong'); }; b.appendChild(r); }
      var a = h('<button class="btn">Another 20</button>'); a.onclick = function () { quizMe(shuffle(allCards().filter(isCheck)).slice(0, 20), 'Quiz me'); }; b.appendChild(a);
      var hm = h('<button class="btn ghost">Home</button>'); hm.onclick = home; b.appendChild(hm);
      app.appendChild(b);
    }
    show();
  }

  // Every info card of a topic on one page, for a quick re-read.
  function sheet(t) {
    clear();
    var bar = h('<div class="bar"><button class="back">‹ Topics</button><div class="title"><b>' + esc(t.name) + '</b><span class="sub">cheat sheet · read only</span></div></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);
    var p = h('<div class="panel"></div>');
    t.cards.filter(function (c) { return c.type === 'info'; }).forEach(function (c) {
      var d = h('<div class="sheetcard"><b>' + esc(c.title) + '</b><p>' + md(c.body) + '</p></div>');
      if (c.code) d.appendChild(codeEl(c.code));
      p.appendChild(d);
    });
    app.appendChild(p);
    var b = h('<div class="btns"><button class="btn p">Study this topic card by card</button></div>');
    b.querySelector('.btn').onclick = function () { study(t, 0); };
    app.appendChild(b);
  }

  home();
})();
