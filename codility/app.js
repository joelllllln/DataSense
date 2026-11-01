/* Codility Trainer — 8 topics, ~20 one-idea lessons each, real Python in the browser (Pyodide). */
(function () {
  'use strict';
  var app = document.getElementById('app');

  var TOPICS = [
    { id: 'basics', name: 'Python from the ground', blurb: 'For pandas people: loops, // and %, slicing, enumerate, dicts, sets, and why a double loop is slow. No pandas in Codility.' },
    { id: 'iter', name: 'Loops & binary', blurb: 'for/while loops, running max, runs of 1s and 0s. Ends at BinaryGap.' },
    { id: 'arr', name: 'Arrays & time complexity', blurb: 'Slicing, rotation, XOR, maths instead of loops. CyclicRotation, OddOccurrences, FrogJmp, PermMissingElem, TapeEquilibrium.' },
    { id: 'count', name: 'Counting elements', blurb: 'Counting lists, sets, seen-so-far. FrogRiverOne, PermCheck, MissingInteger, MaxCounters.' },
    { id: 'prefix', name: 'Prefix sums', blurb: 'Running totals so any slice sum is instant. PassingCars, CountDiv, GenomicRangeQuery, MinAvgTwoSlice.' },
    { id: 'sort', name: 'Sorting & sets', blurb: 'sorted(), keys, neighbours after sorting. Distinct, MaxProductOfThree, Triangle, NumberOfDiscIntersections.' },
    { id: 'stack', name: 'Stacks & queues', blurb: 'append/pop, matching brackets, simulations. Brackets, Nesting, Fish, StoneWall.' },
    { id: 'window', name: 'Sliding window', blurb: 'Fixed windows, then the caterpillar (two pointers). Distinct slices, AbsDistinct, MinAbsSumOfTwo, CountTriangles.' },
    { id: 'lead', name: 'Leader & max slice', blurb: 'Dominator, EquiLeader, then Kadane. MaxProfit, MaxSliceSum, MaxDoubleSliceSum.' },
    { id: 'bsearch', name: 'Binary search & greedy', blurb: 'lo/hi/mid by hand, bisect, binary search on the answer. MinMaxDivision, TieRopes, MaxNonoverlappingSegments.' },
    { id: 'numbers', name: 'Primes, gcd & Fibonacci', blurb: 'Divisors in pairs, the sieve, Euclid. CountFactors, MinPerimeterRectangle, CountSemiprimes, ChocolatesByNumbers, Ladder, FibFrog.' }
  ];
  var ALL = (window.CODILITY || []).slice();
  function lessonsOf(tid) { return ALL.filter(function (l) { return l.topic === tid; }); }
  var ORDER = []; TOPICS.forEach(function (t) { ORDER = ORDER.concat(lessonsOf(t.id)); });

  /* ---------- helpers ---------- */
  function h(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ls(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function md(s) { // tiny inline markup: `code` and line breaks
    return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\n/g, '<br>');
  }

  var P = ls('cod_prog', {});          // id -> {solved, runs, at}
  function saveP() { lsSet('cod_prog', P); }
  function solved(l) { return !!(P[l.id] && P[l.id].solved); }
  function draftKey(id) { return 'cod_draft_' + id; }

  // The real Codility tasks, found by name in lesson titles. Used by the mock test.
  var REAL = ['BinaryGap', 'CyclicRotation', 'OddOccurrencesInArray', 'FrogJmp', 'PermMissingElem', 'TapeEquilibrium', 'FrogRiverOne', 'PermCheck',
    'MissingInteger', 'MaxCounters', 'PassingCars', 'CountDiv', 'GenomicRangeQuery', 'MinAvgTwoSlice', 'Distinct', 'MaxProductOfThree', 'Triangle',
    'NumberOfDiscIntersections', 'Brackets', 'Nesting', 'Fish', 'StoneWall', 'CountDistinctSlices', 'AbsDistinct', 'MinAbsSumOfTwo', 'CountTriangles',
    'Dominator', 'EquiLeader', 'MaxProfit', 'MaxSliceSum', 'MaxDoubleSliceSum', 'MinMaxDivision', 'TieRopes', 'MaxNonoverlappingSegments',
    'CountFactors', 'MinPerimeterRectangle', 'CountSemiprimes', 'ChocolatesByNumbers', 'CommonPrimeDivisors', 'Ladder', 'FibFrog'];
  function isReal(l) {
    var t = l.title || '';
    return REAL.some(function (n) {
      if (t.indexOf(n) !== 0) return false;
      var rest = t.slice(n.length).trim();
      return rest === '' || rest.charAt(0) === '(' || /^(with|in one pass|by sorting)/.test(rest);
    });
  }
  function realTasks() {
    var r = ALL.filter(function (l) { return l.topic !== 'basics' && isReal(l); });
    if (r.length >= 8) return r;
    var out = []; TOPICS.forEach(function (t) { out = out.concat(lessonsOf(t.id).slice(-3)); }); return out;
  }
  var EXAM_MINS = 60;
  function exam() { return ls('cod_exam', null); }
  function saveExam(e) { if (e) lsSet('cod_exam', e); else { try { localStorage.removeItem('cod_exam'); } catch (x) {} } }
  function newExam() {
    var pool = realTasks().slice(), picks = [], topics = {};
    for (var i = pool.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp; }
    pool.forEach(function (l) { if (picks.length < 3 && !topics[l.topic]) { picks.push(l.id); topics[l.topic] = 1; } });
    var e = { ids: picks, start: Date.now(), results: {}, done: false };
    picks.forEach(function (id) { try { localStorage.removeItem(draftKey(id)); } catch (x) {} });
    saveExam(e); return e;
  }
  function examLeftMs(e) { return Math.max(0, e.start + EXAM_MINS * 60000 - Date.now()); }
  function fmtMs(ms) { var s = Math.ceil(ms / 1000), m = Math.floor(s / 60); s = s % 60; return m + ':' + (s < 10 ? '0' : '') + s; }

  function nextUnsolved() { for (var i = 0; i < ORDER.length; i++) if (!solved(ORDER[i])) return ORDER[i]; return null; }

  /* ---------- Python runtime (same approach as DataSense) ---------- */
  var PYODIDE_VERSIONS = ['0.26.4', '0.25.1', '0.24.1'];
  var PY = { pyodide: null, promise: null, state: 'idle', error: null };
  function loadRuntimeScript(src) {
    return new Promise(function (resolve, reject) {
      if (window.loadPyodide) return resolve();
      var s = document.createElement('script');
      s.src = src + 'pyodide.js'; s.async = true;
      s.onload = function () { window.loadPyodide ? resolve() : reject(new Error('runtime script loaded but empty')); };
      s.onerror = function () { s.parentNode && s.parentNode.removeChild(s); reject(new Error('could not reach the Python runtime')); };
      document.head.appendChild(s);
    });
  }
  function pyStart(onStatus) {
    if (PY.state === 'ready') return Promise.resolve(PY.pyodide);
    if (PY.promise) { onStatus && onStatus('Starting Python…'); return PY.promise; }
    PY.state = 'loading';
    var urls = PYODIDE_VERSIONS.map(function (v) { return 'https://cdn.jsdelivr.net/pyodide/v' + v + '/full/'; }), attempt = 0;
    function tryNext() {
      if (attempt >= urls.length) throw (PY.error || new Error('could not reach the Python runtime'));
      var url = urls[attempt++];
      onStatus && onStatus(attempt === 1 ? 'Fetching Python (first time only, about 10 MB)…' : 'Trying another Python build…');
      return loadRuntimeScript(url)
        .then(function () { onStatus && onStatus('Booting the interpreter…'); return window.loadPyodide({ indexURL: url }); })
        .catch(function (e) { PY.error = e; return tryNext(); });
    }
    PY.promise = Promise.resolve().then(tryNext)
      .then(function (p) { onStatus && onStatus('Setting up the test runner…'); return p.runPythonAsync(window.PYHARNESS || '').then(function () { PY.pyodide = p; PY.state = 'ready'; return p; }); })
      .catch(function (e) { PY.state = 'failed'; PY.error = e; PY.promise = null; throw e; });
    return PY.promise;
  }
  function pyRun(lesson, code, onStatus) {
    return pyStart(onStatus).then(function () {
      onStatus && onStatus('Running your code…');
      var opts = { unordered: !!lesson.unordered, tol: lesson.tol || 1e-6, budget: lesson.budget || 10, setup: lesson.setup || '' };
      var fn = PY.pyodide.globals.get('_ds_run');
      var raw = fn(code, JSON.stringify(lesson.tests), JSON.stringify(opts));
      if (fn.destroy) { try { fn.destroy(); } catch (e) {} }
      return JSON.parse(raw);
    });
  }

  /* ---------- editor (highlight + tab + enter indent) ---------- */
  function highlightPy(src) {
    var re = /(#[^\n]*)|('''[\s\S]*?'''|"""[\s\S]*?"""|'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*")|(\b\d+\.?\d*(?:[eE][+-]?\d+)?\b)|(\b(?:def|return|if|elif|else|for|while|in|not|and|or|is|import|from|as|class|try|except|finally|raise|with|lambda|pass|break|continue|yield|None|True|False|self|global|nonlocal|assert|del)\b)|(\b[A-Za-z_]\w*\b)(?=\s*\()|(\b[A-Za-z_]\w*\b)/g;
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
  function wireEditor(ta, onSubmit) {
    ta.setAttribute('spellcheck', 'false'); ta.setAttribute('autocapitalize', 'off'); ta.setAttribute('autocomplete', 'off'); ta.setAttribute('autocorrect', 'off');
    var wrap = document.createElement('div'); wrap.className = 'py-cell';
    ta.parentNode.insertBefore(wrap, ta);
    var pre = document.createElement('pre'); pre.className = 'py-cell-hl'; pre.setAttribute('aria-hidden', 'true');
    var code = document.createElement('code'); pre.appendChild(code);
    wrap.appendChild(pre); wrap.appendChild(ta); ta.classList.add('py-cell-ta');
    function render() { code.innerHTML = highlightPy(ta.value) + '\n'; }
    function sync() { pre.scrollTop = ta.scrollTop; pre.scrollLeft = ta.scrollLeft; }
    var proto = Object.getPrototypeOf(ta), desc = Object.getOwnPropertyDescriptor(proto, 'value');
    if (desc && desc.configurable) Object.defineProperty(ta, 'value', { get: function () { return desc.get.call(ta); }, set: function (v) { desc.set.call(ta, v); render(); }, configurable: true });
    ta.addEventListener('input', render); ta.addEventListener('scroll', sync); render();
    ta.onkeydown = function (e) {
      var v = ta.value, s = ta.selectionStart, en = ta.selectionEnd;
      if (e.key === 'Tab') {
        e.preventDefault();
        if (s !== en) {
          var a = v.lastIndexOf('\n', s - 1) + 1;
          var block = v.slice(a, en).split('\n').map(function (l) { return e.shiftKey ? l.replace(/^ {1,4}/, '') : '    ' + l; }).join('\n');
          ta.value = v.slice(0, a) + block + v.slice(en); ta.selectionStart = a; ta.selectionEnd = a + block.length;
        } else { ta.value = v.slice(0, s) + '    ' + v.slice(en); ta.selectionStart = ta.selectionEnd = s + 4; }
        ta.dispatchEvent(new Event('input'));
      } else if (e.key === 'Enter') {
        if (onSubmit && (e.metaKey || e.ctrlKey || e.shiftKey)) { e.preventDefault(); onSubmit(); return; }
        var lineStart = v.lastIndexOf('\n', s - 1) + 1, line = v.slice(lineStart, s);
        var indent = (line.match(/^\s*/) || [''])[0];
        if (/:\s*$/.test(line)) indent += '    ';
        if (indent) { e.preventDefault(); ta.value = v.slice(0, s) + '\n' + indent + v.slice(en); ta.selectionStart = ta.selectionEnd = s + 1 + indent.length; ta.dispatchEvent(new Event('input')); }
      }
    };
  }

  /* ---------- views ---------- */
  function clear() { app.innerHTML = ''; window.scrollTo(0, 0); }

  function home() {
    clear();
    app.appendChild(h('<div class="bar"><h1>Codility Trainer</h1><span class="pill">' + ALL.length + ' lessons</span></div>'));
    var done = ALL.filter(solved).length;
    var nx = nextUnsolved();
    if (nx) {
      var t = TOPICS.filter(function (x) { return x.id === nx.topic; })[0];
      var c = h('<button class="cont"><div><b>' + (done ? 'Continue' : 'Start') + ': ' + esc(nx.title) + '</b><span>' + esc(t.name) + ' · lesson ' + nx.id.split('-')[1] + '</span></div><span class="chev">›</span></button>');
      c.onclick = function () { lesson(nx.id); };
      app.appendChild(c);
    } else if (ALL.length) {
      app.appendChild(h('<div class="panel solved"><h2>All done</h2><p>Every lesson is solved. Pick any topic to redo it.</p></div>'));
    }
    app.appendChild(h('<div class="stats"><div class="stat"><b>' + done + '</b><span>solved</span></div><div class="stat"><b>' + (ALL.length - done) + '</b><span>to go</span></div><div class="stat"><b>' + TOPICS.length + '</b><span>topics</span></div></div>'));

    var ex = exam();
    var mb = h('<div class="panel"><h2>Mock test</h2><p class="note">Three real tasks from three topics, ' + EXAM_MINS + ' minutes, no hints. Like the real thing.</p>' +
      '<div class="btns">' + (ex && !ex.done ? '<button class="btn p go">Resume test (' + fmtMs(examLeftMs(ex)) + ' left)</button><button class="btn sm quit">Abandon</button>' : '<button class="btn p go">Start a mock test</button>') +
      (ex && ex.done ? '<button class="btn sm last">Last result</button>' : '') + '</div></div>');
    mb.querySelector('.go').onclick = function () { if (!(ex && !ex.done)) ex = newExam(); examScreen(); };
    if (mb.querySelector('.quit')) mb.querySelector('.quit').onclick = function () { if (confirm('Abandon this test?')) { saveExam(null); home(); } };
    if (mb.querySelector('.last')) mb.querySelector('.last').onclick = examScreen;
    app.appendChild(mb);

    var list = h('<div class="panel"><h2>Topics, in order</h2></div>');
    TOPICS.forEach(function (t, ti) {
      var L = lessonsOf(t.id), n = L.filter(solved).length;
      var row = h('<div class="topic"><div class="head"><span class="num">' + (ti + 1) + '</span><div class="n"><b>' + esc(t.name) + '</b><span>' + esc(t.blurb) + '</span>' +
        '<div class="pbar"><i style="width:' + (L.length ? Math.round(100 * n / L.length) : 0) + '%"></i></div></div><span class="pct">' + n + ' / ' + L.length + '</span></div><div class="dots"></div></div>');
      var dots = row.querySelector('.dots');
      var firstOpen = L.filter(function (l) { return !solved(l); })[0];
      L.forEach(function (l, i) {
        var d = h('<button class="dot' + (solved(l) ? ' ok' : (l === firstOpen ? ' cur' : '')) + '" title="' + esc(l.title) + '">' + (i + 1) + '</button>');
        d.onclick = function () { lesson(l.id); };
        dots.appendChild(d);
      });
      if (!L.length) dots.appendChild(h('<span class="note">No lessons loaded for this topic.</span>'));
      list.appendChild(row);
    });
    app.appendChild(list);
    var r = h('<div class="foot"><a href="study/" style="color:var(--blue)">Study the ideas first (bite-sized cards) ›</a><br><button class="btn ghost sm">Reset all progress</button></div>');
    r.querySelector('button').onclick = function () { if (confirm('Reset progress on every lesson?')) { P = {}; saveP(); home(); } };
    app.appendChild(r);
  }

  function lesson(id, inExam) {
    var l = ALL.filter(function (x) { return x.id === id; })[0]; if (!l) return home();
    var t = TOPICS.filter(function (x) { return x.id === l.topic; })[0];
    var L = lessonsOf(l.topic), idx = L.indexOf(l);
    var gi = ORDER.indexOf(l), prev = ORDER[gi - 1], next = ORDER[gi + 1];
    clear();

    var bar = h('<div class="bar"><button class="back">‹ Topics</button><div class="title"><b>' + esc(l.title) + '</b><span class="sub">' + esc(t.name) + ' · lesson ' + (idx + 1) + ' of ' + L.length + '</span></div>' +
      (solved(l) && !inExam ? '<span class="pill ok">Solved</span>' : '') + '</div>');
    bar.querySelector('.back').onclick = inExam ? examScreen : home;
    if (inExam) {
      bar.querySelector('.back').textContent = '‹ Test';
      var clock = h('<span class="pill warn">' + fmtMs(examLeftMs(exam())) + '</span>'); bar.appendChild(clock);
      var tick = setInterval(function () { var e = exam(); if (!e || !document.body.contains(clock)) { clearInterval(tick); return; } clock.textContent = fmtMs(examLeftMs(e)); if (examLeftMs(e) <= 0) { clearInterval(tick); finishExam(); } }, 1000);
    }
    app.appendChild(bar);

    if (!inExam) app.appendChild(h('<div class="panel idea"><h2>New idea in this lesson</h2><p>' + md(l.idea) + '</p></div>'));

    var task = h('<div class="panel"><h2>Task</h2><p>' + md(l.brief) + '</p><div class="exs"></div></div>');
    var exs = task.querySelector('.exs');
    if (l.examples && l.examples.length) {
      exs.appendChild(h('<h2 style="margin-top:12px">Example' + (l.examples.length > 1 ? 's' : '') + '</h2>'));
      l.examples.forEach(function (ex) { exs.appendChild(h('<div class="ex">' + esc(ex.in) + '  <span class="arrow">→</span>  ' + esc(ex.out) + '</div>')); });
    }
    app.appendChild(task);

    var ed = h('<div class="panel"><h2>Your code</h2><div class="sig"></div><textarea class="code"></textarea>' +
      '<div class="btns"><button class="btn p run">Run tests</button><button class="btn sm hint">Hint</button><button class="btn sm sol">Show solution</button><button class="btn sm reset">Reset</button><span class="kbd">Ctrl/⌘ + Enter runs</span></div>' +
      '<div class="status"></div><div class="out"></div></div>');
    ed.querySelector('.sig').textContent = l.sig;
    var ta = ed.querySelector('textarea');
    ta.value = ls(draftKey(l.id), null) || l.starter;
    app.appendChild(ed);
    wireEditor(ta, run);
    ta.addEventListener('input', function () { lsSet(draftKey(l.id), ta.value); });
    var status = ed.querySelector('.status'), out = ed.querySelector('.out');
    if (inExam) { ed.querySelector('.hint').remove(); ed.querySelector('.sol').remove(); }

    var resPanel = h('<div class="panel"><h2>Tests</h2><table class="res"><thead><tr><th>Test</th><th>Expected</th><th>Got</th><th></th></tr></thead><tbody></tbody></table></div>');
    app.appendChild(resPanel);
    var tbody = resPanel.querySelector('tbody');
    function paintTests(results) {
      tbody.innerHTML = '';
      l.tests.forEach(function (c, i) {
        var r = results && results[i];
        var cls = r ? (r.pass ? 'pass' : 'fail') : 'wait';
        var label = c.hidden ? '<td class="name">' + esc(c.name || 'hidden test') + '</td>' : '<td>' + esc(c.call) + (c.name ? '<div class="name">' + esc(c.name) + '</div>' : '') + '</td>';
        var expect = c.hidden && !r ? '<td class="name">hidden</td>' : '<td>' + esc(r ? r.expect : c.expect) + '</td>';
        var got = r ? '<td>' + (r.error ? '<span style="color:var(--red)">' + esc(r.error) + '</span>' : esc(r.got)) + '</td>' : '<td class="name">—</td>';
        tbody.appendChild(h('<tr class="' + cls + '">' + label + expect + got + '<td class="s">' + (r ? (r.pass ? '✓ pass' : '✗ fail') : '·') + '</td></tr>'));
      });
    }
    paintTests(null);

    var after = h('<div></div>'); app.appendChild(after);
    var nav = h('<div class="navrow"><button class="btn ghost">‹ Previous</button><button class="btn p next">Next lesson ›</button></div>');
    nav.children[0].disabled = !prev; nav.children[0].onclick = function () { lesson(prev.id); };
    nav.children[1].disabled = !next; nav.children[1].onclick = function () { lesson(next.id); };
    if (!inExam) app.appendChild(nav);
    else { var bk = h('<div class="navrow"><span></span><button class="btn p">Back to the test ›</button></div>'); bk.querySelector('.btn').onclick = examScreen; app.appendChild(bk); }

    function showWalk(where) {
      if (after.querySelector('.walk')) return;
      after.appendChild(h('<div class="panel walk"><h2>Why it works</h2><p>' + md(l.walk) + '</p><p class="note" style="margin-top:8px">Time: ' + esc(l.complexity) + '</p></div>'));
    }
    if (ed.querySelector('.hint')) ed.querySelector('.hint').onclick = function () {
      if (after.querySelector('.hintbox')) return;
      after.insertBefore(h('<div class="panel hintbox"><h2>Hint</h2><p>' + md(l.hint) + '</p></div>'), after.firstChild);
    };
    if (ed.querySelector('.sol')) ed.querySelector('.sol').onclick = function () {
      if (after.querySelector('.solbox')) return;
      var b = h('<div class="panel solbox"><h2>Solution</h2><pre class="sol"><code></code></pre><div class="btns"><button class="btn sm">Put it in the editor</button></div></div>');
      b.querySelector('code').innerHTML = highlightPy(l.solution);
      b.querySelector('.btn').onclick = function () { ta.value = l.solution; lsSet(draftKey(l.id), l.solution); ta.focus(); };
      after.appendChild(b); showWalk();
    };
    ed.querySelector('.reset').onclick = function () { ta.value = l.starter; lsSet(draftKey(l.id), l.starter); out.innerHTML = ''; paintTests(null); status.textContent = ''; };

    var running = false;
    function run() {
      if (running) return; running = true;
      out.innerHTML = ''; status.textContent = '';
      var runBtn = ed.querySelector('.run'); runBtn.disabled = true; runBtn.textContent = 'Running…';
      pyRun(l, ta.value, function (s) { status.textContent = s; }).then(function (rep) {
        running = false; runBtn.disabled = false; runBtn.textContent = 'Run tests';
        P[l.id] = P[l.id] || { runs: 0 }; P[l.id].runs++;
        if (rep.error) { status.textContent = ''; out.appendChild(h('<div class="err"></div>')).textContent = rep.error; }
        if (rep.results && rep.results.length) paintTests(rep.results);
        if (rep.stdout) { var so = h('<div class="stdout"></div>'); so.textContent = rep.stdout; out.appendChild(so); }
        var all = rep.ok && rep.results.length === l.tests.length && rep.results.every(function (r) { return r.pass; });
        if (inExam) {
          var e = exam();
          if (e && !e.done) { e.results[l.id] = { pass: rep.ok ? rep.results.filter(function (r) { return r.pass; }).length : 0, total: l.tests.length, error: rep.error || null, code: ta.value }; saveExam(e); }
          status.textContent = all ? 'All tests pass. Go back to the test when you are ready.' : (rep.error ? '' : 'Some tests fail. In the real exam you would only see the examples; here you can see them all.');
          resPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return;
        }
        if (all) {
          var first = !P[l.id].solved;
          P[l.id].solved = true; P[l.id].at = Date.now(); saveP();
          status.textContent = '';
          var box = h('<div class="panel solved"><h2>All tests pass</h2><p>' + (first ? 'Nice. That idea is yours now.' : 'Still solid.') + '</p><div class="btns">' + (next ? '<button class="btn good">Next lesson ›</button>' : '<button class="btn good">Back to topics</button>') + '</div></div>');
          box.querySelector('.btn').onclick = function () { next ? lesson(next.id) : home(); };
          out.appendChild(box); showWalk();
          bar.querySelector('.pill') || bar.appendChild(h('<span class="pill ok">Solved</span>'));
        } else {
          saveP();
          var nf = (rep.results || []).filter(function (r) { return !r.pass; }).length;
          if (!rep.error) status.textContent = nf + ' test' + (nf === 1 ? '' : 's') + ' failing. Read the Got column, change one thing, run again.';
        }
        resPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }).catch(function (e) {
        running = false; runBtn.disabled = false; runBtn.textContent = 'Run tests';
        status.textContent = '';
        out.appendChild(h('<div class="err"></div>')).textContent = 'Python could not start: ' + (e && e.message ? e.message : e) + '\nYou need internet the first time so the browser can fetch Python (about 10 MB).';
      });
    }
    ed.querySelector('.run').onclick = run;
    ta.focus();
  }

  function examScreen() {
    var e = exam(); if (!e) return home();
    clear();
    var bar = h('<div class="bar"><button class="back">‹ Home</button><div class="title"><b>Mock test</b><span class="sub">3 tasks · ' + EXAM_MINS + ' minutes</span></div><span class="pill warn clock"></span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);
    var clock = bar.querySelector('.clock');
    function paintClock() { clock.textContent = e.done ? 'Finished' : fmtMs(examLeftMs(e)); }
    paintClock();
    if (!e.done) { var tick = setInterval(function () { e = exam() || e; if (!document.body.contains(clock) || e.done) { clearInterval(tick); return; } paintClock(); if (examLeftMs(e) <= 0) { clearInterval(tick); finishExam(); } }, 1000); }

    var p = h('<div class="panel"><h2>' + (e.done ? 'Result' : 'Tasks') + '</h2></div>');
    var total = 0, got = 0;
    e.ids.forEach(function (id, i) {
      var l = ALL.filter(function (x) { return x.id === id; })[0]; if (!l) return;
      var t = TOPICS.filter(function (x) { return x.id === l.topic; })[0];
      var r = e.results[id];
      total += l.tests.length; got += r ? r.pass : 0;
      var st = r ? (r.pass === r.total ? '<span class="pill ok">' + r.pass + ' / ' + r.total + '</span>' : '<span class="pill warn">' + r.pass + ' / ' + r.total + '</span>') : '<span class="pill">not run</span>';
      var row = h('<button class="topic"><div class="head"><span class="num">' + (i + 1) + '</span><div class="n"><b>' + esc(l.title) + '</b><span>' + esc(t.name) + '</span></div>' + st + '</div></button>');
      row.onclick = function () { e.done ? lesson(id) : lesson(id, true); };
      p.appendChild(row);
    });
    app.appendChild(p);
    if (e.done) {
      var pct = total ? Math.round(100 * got / total) : 0;
      app.appendChild(h('<div class="panel ' + (pct === 100 ? 'solved' : '') + '"><h2>Score</h2><p><b>' + pct + '%</b> of tests passed (' + got + ' of ' + total + '). Tap a task to see its solution and why it works.</p></div>'));
      var b = h('<div class="btns"><button class="btn p">New mock test</button><button class="btn ghost">Home</button></div>');
      b.children[0].onclick = function () { newExam(); examScreen(); }; b.children[1].onclick = home;
      app.appendChild(b);
    } else {
      app.appendChild(h('<p class="note">Open a task, write your code, run it, come back. Submit when you are done or when the clock runs out.</p>'));
      var sb = h('<div class="btns"><button class="btn p">Submit test</button></div>');
      sb.querySelector('.btn').onclick = function () { if (confirm('Submit now? You cannot change answers after this.')) finishExam(); };
      app.appendChild(sb);
    }
  }
  function finishExam() {
    var e = exam(); if (!e || e.done) { examScreen(); return; }
    e.done = true; e.end = Date.now(); saveExam(e);
    var hist = ls('cod_exam_hist', []); hist.push({ at: e.end, ids: e.ids, results: e.results }); lsSet('cod_exam_hist', hist.slice(-20));
    examScreen();
  }

  home();
})();
