/* DS Notes — a small flashcard app for one set of notes.
   Modes:  Read (flip cards)  |  Write (type the answer, marked out of 5 by Claude)
   Toggle: Show answer first  (see the answer before you answer)  */
(function () {
  'use strict';
  var app = document.getElementById('app');
  var DECKS = window.DECKS || [];

  /* ---------- tiny helpers ---------- */
  function h(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ls(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function hash(s) { var x = 5381; for (var i = 0; i < s.length; i++) x = ((x << 5) + x + s.charCodeAt(i)) | 0; return (x >>> 0).toString(36); }

  /* ---------- settings & progress ---------- */
  var S = ls('dsn_settings', {});
  if (S.mode !== 'write') S.mode = 'read';          // read | write
  if (typeof S.first !== 'boolean') S.first = false; // show answer first?
  if (S.order !== 'shuffle') S.order = 'order';     // order | shuffle
  function saveS() { lsSet('dsn_settings', S); }

  var P = ls('dsn_prog', {});                          // cardKey -> {ok, again, score, t}
  function saveP() { lsSet('dsn_prog', P); }
  function key(c) { return hash(c.q); }
  function rec(c) { return P[key(c)] || {}; }
  function known(c) { var r = rec(c); return r.last === 'ok'; }

  // The marking key is shared with DataSense (same browser, same origin).
  function apiKey() { try { return localStorage.getItem('ds_api_key') || ''; } catch (e) { return ''; } }
  function setApiKey(v) { try { if (v) localStorage.setItem('ds_api_key', v); else localStorage.removeItem('ds_api_key'); } catch (e) {} }

  /* ---------- cards ---------- */
  DECKS.forEach(function (d) {
    d.cards = d.cards.map(function (c) { return { q: c[0], a: c[1], deck: d.name, did: d.id }; });
  });
  function allCards() { var out = []; DECKS.forEach(function (d) { out = out.concat(d.cards); }); return out; }
  function deckDone(cards) { return cards.filter(known).length; }

  /* ---------- views ---------- */
  function clear() { app.innerHTML = ''; window.scrollTo(0, 0); }

  function home() {
    clear();
    app.appendChild(h('<div class="bar"><h1>DS Notes</h1><button class="ib" id="gear" aria-label="Settings">⚙︎</button></div>'));
    app.querySelector('#gear').onclick = settings;

    var opt = h('<div class="panel"><h2>How to study</h2>' +
      '<div class="row"><div><div class="lab">Mode</div><div class="help" id="modehelp"></div></div>' +
        '<div class="seg" id="mode"><button data-v="read">Read</button><button data-v="write">Write</button></div></div>' +
      '<div class="row"><div><div class="lab">Show answer first</div><div class="help">See the answer before you try</div></div>' +
        '<button class="sw" id="first" role="switch"></button></div>' +
      '<div class="row"><div><div class="lab">Order</div><div class="help">Cards go in a sensible order</div></div>' +
        '<div class="seg" id="order"><button data-v="order">In order</button><button data-v="shuffle">Shuffle</button></div></div>' +
      '</div>');
    app.appendChild(opt);
    function paint() {
      opt.querySelectorAll('#mode button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-v') === S.mode); });
      opt.querySelectorAll('#order button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-v') === S.order); });
      opt.querySelector('#first').classList.toggle('on', S.first);
      opt.querySelector('#modehelp').textContent = S.mode === 'read' ? 'Normal flashcards. Tap to flip.' : 'Type the answer. Claude marks it out of 5.';
    }
    opt.querySelectorAll('#mode button').forEach(function (b) { b.onclick = function () { S.mode = b.getAttribute('data-v'); saveS(); paint(); }; });
    opt.querySelectorAll('#order button').forEach(function (b) { b.onclick = function () { S.order = b.getAttribute('data-v'); saveS(); paint(); }; });
    opt.querySelector('#first').onclick = function () { S.first = !S.first; saveS(); paint(); };
    paint();

    var all = allCards();
    var allBtn = h('<button class="all"><div><b>All notes</b><span>' + all.length + ' cards · ' + deckDone(all) + ' known</span></div><span class="chev">›</span></button>');
    allBtn.onclick = function () { study(all, 'All notes'); };
    app.appendChild(allBtn);

    var list = h('<div class="panel"><h2>Topics</h2></div>');
    DECKS.forEach(function (d) {
      var n = deckDone(d.cards), tot = d.cards.length;
      var row = h('<div class="deck"><button class="eye" aria-label="Browse">☰</button>' +
        '<button class="n"><b>' + esc(d.name) + '</b><span>' + tot + ' cards · ' + n + ' known</span>' +
        '<div class="pbar"><i style="width:' + Math.round(100 * n / tot) + '%"></i></div></button>' +
        '<span class="chev">›</span></div>');
      row.querySelector('.n').onclick = function () { study(d.cards, d.name); };
      row.querySelector('.eye').onclick = function () { browse(d); };
      list.appendChild(row);
    });
    app.appendChild(list);
    app.appendChild(h('<div class="foot">Progress is saved on this phone.</div>'));
  }

  function browse(d) {
    clear();
    var bar = h('<div class="bar"><button class="back">‹ Back</button><div class="title"><b>' + esc(d.name) + '</b><span class="sub">' + d.cards.length + ' cards, read only</span></div></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);
    var p = h('<div class="panel"></div>');
    d.cards.forEach(function (c) { p.appendChild(h('<div class="bq"><b>' + esc(c.q) + '</b><p>' + esc(c.a) + '</p></div>')); });
    app.appendChild(p);
    var b = h('<div class="btns"><button class="btn p">Study this topic</button></div>');
    b.querySelector('.btn').onclick = function () { study(d.cards, d.name); };
    app.appendChild(b);
  }

  /* ---------- study session ---------- */
  function study(cards, name) {
    var queue = cards.slice();
    if (S.order === 'shuffle') shuffle(queue);
    var total = queue.length, done = 0, ok = 0, again = 0, misses = [];
    var i = 0;

    function next() {
      if (i >= queue.length) { finish(); return; }
      show(queue[i]);
    }
    function mark(c, result, score) {
      var r = P[key(c)] || { ok: 0, again: 0 };
      if (result === 'ok') { r.ok = (r.ok || 0) + 1; ok++; } else { r.again = (r.again || 0) + 1; again++; misses.push(c); }
      r.last = result; r.t = Date.now();
      if (score != null) r.score = score;
      P[key(c)] = r; saveP();
      done++;
      if (result === 'again') queue.push(c); // comes back at the end
      i++; next();
    }

    function show(c) {
      clear();
      var bar = h('<div class="bar"><button class="back">‹ Done</button><div class="title"><b>' + esc(name) + '</b><span class="sub">' + (Math.min(done, total)) + ' / ' + total + (queue.length > total ? ' · ' + (queue.length - total) + ' to redo' : '') + '</span></div></div>');
      bar.querySelector('.back').onclick = finish;
      app.appendChild(bar);
      app.appendChild(h('<div class="prog"><i style="width:' + Math.round(100 * Math.min(done, total) / total) + '%"></i></div>'));

      var card = h('<div class="card"><div class="tag">' + esc(c.deck) + '</div><div class="q">' + esc(c.q) + '</div></div>');
      app.appendChild(card);
      var btns = h('<div class="btns"></div>');
      app.appendChild(btns);

      if (S.mode === 'read') readFlow(c, card, btns); else writeFlow(c, card, btns);
    }

    function answerEl(c, ref) {
      return h('<div class="a' + (ref ? ' ref' : '') + '">' + (ref ? '<span class="lab">The notes say</span>' : '') + esc(c.a) + '</div>');
    }
    function rateBtns(c, btns) {
      btns.innerHTML = '';
      var b1 = h('<button class="btn bad">Again</button>'), b2 = h('<button class="btn good">Got it</button>');
      b1.onclick = function () { mark(c, 'again'); };
      b2.onclick = function () { mark(c, 'ok'); };
      btns.appendChild(b1); btns.appendChild(b2);
    }

    // READ: flip card. With "answer first" the answer is already open.
    function readFlow(c, card, btns) {
      if (S.first) { card.appendChild(answerEl(c)); rateBtns(c, btns); return; }
      card.appendChild(h('<div class="tapnote">Tap to see the answer</div>'));
      var reveal = function () {
        if (card.querySelector('.a')) return;
        card.querySelector('.tapnote').remove();
        card.appendChild(answerEl(c));
        rateBtns(c, btns);
      };
      card.onclick = reveal;
      var b = h('<button class="btn p">Show answer</button>'); b.onclick = reveal; btns.appendChild(b);
    }

    // WRITE: type the answer, Claude marks it. With "answer first" you read it, hide it, then write.
    function writeFlow(c, card, btns) {
      if (!apiKey()) { keyPanel(card, btns, function () { show(c); }); return; }
      if (S.first) {
        card.appendChild(answerEl(c));
        var hide = h('<button class="btn p">Hide it and write</button>');
        hide.onclick = function () { card.querySelector('.a').remove(); writeBox(); };
        btns.appendChild(hide);
      } else writeBox();

      function writeBox() {
        btns.innerHTML = '';
        var ta = h('<textarea class="ans" placeholder="Write the answer in your own words…" autocapitalize="sentences"></textarea>');
        card.appendChild(ta);
        setTimeout(function () { ta.focus(); }, 50);
        var skip = h('<button class="btn ghost">Show answer</button>'), go = h('<button class="btn p">Mark it</button>');
        skip.onclick = function () { ta.remove(); card.appendChild(answerEl(c)); rateBtns(c, btns); };
        go.onclick = function () {
          var txt = ta.value.trim();
          if (!txt) { ta.focus(); return; }
          go.disabled = true; skip.disabled = true; go.textContent = 'Marking…'; ta.readOnly = true;
          grade(c, txt, function (res) {
            if (res.error) {
              go.disabled = false; skip.disabled = false; go.textContent = 'Mark it'; ta.readOnly = false;
              var e = card.querySelector('.err'); if (e) e.remove();
              if (res.error === 'nokey') { keyPanel(card, btns, function () { show(c); }); return; }
              card.appendChild(h('<p class="err">' + esc(res.error === 'offline' ? 'You seem to be offline.' : res.error) + '</p>'));
              return;
            }
            var cls = res.score >= 4 ? 'hi' : (res.score <= 2 ? 'lo' : '');
            card.appendChild(h('<div class="score ' + cls + '"><div><b>' + res.score + '</b><small>out of 5</small></div><p>' + esc(res.feedback) + '</p></div>'));
            card.appendChild(answerEl(c, true));
            btns.innerHTML = '';
            var nx = h('<button class="btn p">Next</button>');
            nx.onclick = function () { mark(c, res.score >= 4 ? 'ok' : 'again', res.score); };
            var redo = h('<button class="btn sm">Redo later</button>');
            redo.onclick = function () { mark(c, 'again', res.score); };
            if (res.score >= 4) btns.appendChild(redo);
            btns.appendChild(nx);
            nx.focus();
          });
        };
        btns.appendChild(skip); btns.appendChild(go);
      }
    }

    function finish() {
      clear();
      app.appendChild(h('<div class="bar"><button class="back">‹ Home</button></div>'));
      app.querySelector('.back').onclick = home;
      var left = queue.length - i;
      var d = h('<div class="done"><div class="big">' + (again === 0 && done > 0 ? '🎉' : '📒') + '</div><h2>' + esc(name) + '</h2>' +
        '<p>' + (done === 0 ? 'Nothing marked yet.' : (left > 0 ? left + ' card' + (left === 1 ? '' : 's') + ' left unseen.' : 'All the way through.')) + '</p>' +
        '<div class="stats"><div class="stat"><b>' + ok + '</b><span>got it</span></div><div class="stat"><b>' + again + '</b><span>again</span></div></div></div>');
      app.appendChild(d);
      var btns = h('<div class="btns" style="flex-direction:column"></div>');
      var uniqMiss = []; misses.forEach(function (c) { if (uniqMiss.indexOf(c) < 0) uniqMiss.push(c); });
      if (uniqMiss.length) { var r = h('<button class="btn p">Redo the ' + uniqMiss.length + ' I missed</button>'); r.onclick = function () { study(uniqMiss, name + ' · misses'); }; btns.appendChild(r); }
      var a = h('<button class="btn">Study again</button>'); a.onclick = function () { study(cards, name); }; btns.appendChild(a);
      var hm = h('<button class="btn ghost">Home</button>'); hm.onclick = home; btns.appendChild(hm);
      app.appendChild(btns);
    }

    next();
  }

  /* ---------- marking (same approach as DataSense: your own key, straight to Anthropic) ---------- */
  function grade(c, answer, cb) {
    var key = apiKey();
    if (!key) { cb({ error: 'nokey' }); return; }
    var sys = "You are a supportive data-science tutor marking a beginner's short written answer to a flashcard. " +
      "Grade 0-5 on whether the learner captured the CORE idea in the reference answer. " +
      "Give 5 for a correct core answer, 4 if the core is right with a small gap or looser wording; wording need not match the reference. " +
      "The reference is ONE correct version, written as study notes; treat any answer that conveys the same core idea as fully correct. " +
      "Do NOT lower the score for missing minor details or extra bullet points unless the question clearly asked for a list of steps or items, in which case missing most of them is a gap. " +
      "Only give 0-2 for answers that are blank, off-topic, or actually wrong. When unsure between two scores, give the higher one. " +
      "Feedback: warm, specific and short (max 2 sentences), in plain English: what they got right, and at most one thing to add.";
    var user = "QUESTION:\n" + c.q + "\n\nREFERENCE ANSWER (from the learner's own notes):\n" + c.a +
      "\n\nLEARNER'S ANSWER:\n" + answer + "\n\nMark the learner's answer.";
    fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 300,
        system: sys,
        messages: [{ role: 'user', content: user }],
        output_config: { format: { type: 'json_schema', schema: {
          type: 'object',
          properties: { score: { type: 'integer' }, feedback: { type: 'string' } },
          required: ['score', 'feedback'],
          additionalProperties: false
        } } }
      })
    }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, status: r.status, j: j }; }); })
      .then(function (res) {
        var j = res.j || {};
        if (!res.ok) { cb({ error: (j.error && j.error.message) || ('Request failed (HTTP ' + res.status + ')') }); return; }
        if (j.stop_reason === 'refusal') { cb({ error: 'The marker declined that one.' }); return; }
        var txt = '';
        (j.content || []).forEach(function (b) { if (b.type === 'text') txt += b.text; });
        try {
          var out = JSON.parse(txt);
          cb({ score: Math.max(0, Math.min(5, Math.round(+out.score))), feedback: String(out.feedback || '') });
        } catch (e) { cb({ error: 'Could not read the marker reply.' }); }
      })
      .catch(function () { cb({ error: 'offline' }); });
  }

  function keyPanel(card, btns, after) {
    btns.innerHTML = '';
    var box = h('<div class="keybox a"><span class="lab">Connect Claude to mark your writing</span>' +
      '<p class="note">Write mode sends your answer to Anthropic’s Claude API to be marked. Paste your own API key (from console.anthropic.com). It is saved only on this phone and used only for marking. It is the same key DataSense uses.</p>' +
      '<input type="password" placeholder="sk-ant-…" autocomplete="off" autocapitalize="off" spellcheck="false"></div>');
    card.appendChild(box);
    var save = h('<button class="btn p">Save key</button>'), rd = h('<button class="btn ghost">Use Read mode instead</button>');
    save.onclick = function () { var v = box.querySelector('input').value.trim(); if (!v) return; setApiKey(v); after(); };
    rd.onclick = function () { S.mode = 'read'; saveS(); after(); };
    btns.appendChild(rd); btns.appendChild(save);
  }

  /* ---------- settings ---------- */
  function settings() {
    clear();
    var bar = h('<div class="bar"><button class="back">‹ Back</button><div class="title"><b>Settings</b></div></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);

    var k = h('<div class="panel keybox"><h2>Claude API key (for Write mode)</h2>' +
      '<p class="note">' + (apiKey() ? 'A key is saved on this phone.' : 'No key saved yet.') + ' Your answers are sent to Anthropic to be marked. The key is only stored in this browser.</p>' +
      '<input type="password" placeholder="sk-ant-…" autocomplete="off" autocapitalize="off" spellcheck="false">' +
      '<div class="btns" style="margin-top:4px"><button class="btn ghost" id="rm">Remove key</button><button class="btn p" id="sv">Save key</button></div></div>');
    k.querySelector('#sv').onclick = function () { var v = k.querySelector('input').value.trim(); if (!v) return; setApiKey(v); settings(); };
    k.querySelector('#rm').onclick = function () { setApiKey(''); settings(); };
    app.appendChild(k);

    var all = allCards();
    var p = h('<div class="panel"><h2>Progress</h2><p class="note">' + deckDone(all) + ' of ' + all.length + ' cards marked “got it” last time.</p>' +
      '<div class="btns"><button class="btn bad">Reset all progress</button></div></div>');
    p.querySelector('.btn').onclick = function () { if (confirm('Reset progress on every card?')) { P = {}; saveP(); settings(); } };
    app.appendChild(p);

    var about = h('<div class="panel"><h2>Add to Home Screen</h2><p class="note">In Safari tap Share, then “Add to Home Screen”. It then opens like an app and works offline (Read mode).</p></div>');
    app.appendChild(about);
  }

  home();
})();
