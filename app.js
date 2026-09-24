/* DataSense quiz shell — wrong answer → lab → quick check → try again */
(function () {
  'use strict';
  var app = document.getElementById('app');
  window.QUESTIONS = window.QUESTIONS || {};
  // Machine Learning Foundations is trimmed to just its definitions — the useful ML vocabulary —
  // and presented as "Core Definitions"; the rest of the fundamentals questions are dropped.
  (function () {
    var D = window.DEFS || {};
    var defs = (window.QUESTIONS.found1 || []).concat(window.QUESTIONS.found2 || [], window.QUESTIONS.found3 || [])
      .filter(function (q) { return D[q.q]; });
    window.QUESTIONS.founddef = defs;
    if (window.NOTES && window.NOTES.found) window.NOTES.found.name = 'Core Definitions';
  })();
  var TOPICS = [
    { key: 'found', no: '00', name: 'Core Definitions', desc: 'The essential ML vocabulary — the terms every other topic builds on.',
      levels: [{ qk: 'founddef', part: 'Part I', name: 'Definitions' }] },
    { key: 'knn', no: '01', name: 'k-Nearest Neighbours', desc: 'Classify by asking the most similar known examples to vote.',
      levels: [{ qk: 'easy', part: 'Part I', name: 'Foundations' }, { qk: 'medium', part: 'Part II', name: 'Practice' }, { qk: 'hard', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'logreg', no: '02', name: 'Logistic Regression', desc: 'Turn a weighted score into an honest probability.',
      levels: [{ qk: 'logreg1', part: 'Part I', name: 'Foundations' }, { qk: 'logreg2', part: 'Part II', name: 'Practice' }, { qk: 'logreg3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'bayes', no: '03', name: 'Naive Bayes', desc: 'Multiply the evidence, respect the base rate.',
      levels: [{ qk: 'bayes1', part: 'Part I', name: 'Foundations' }, { qk: 'bayes2', part: 'Part II', name: 'Practice' }, { qk: 'bayes3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'trees', no: '04', name: 'Decision Trees', desc: 'Ask the best yes/no questions, one after another.',
      levels: [{ qk: 'trees1', part: 'Part I', name: 'Foundations' }, { qk: 'trees2', part: 'Part II', name: 'Practice' }, { qk: 'trees3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'svm', no: '05', name: 'Support Vector Machines', desc: 'Draw the widest possible street between the classes.',
      levels: [{ qk: 'svm1', part: 'Part I', name: 'Foundations' }, { qk: 'svm2', part: 'Part II', name: 'Practice' }, { qk: 'svm3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'rf', no: '06', name: 'Random Forests & Bagging', desc: 'Bootstrap many unstable trees, average away the wobble.',
      levels: [{ qk: 'rf1', part: 'Part I', name: 'Foundations' }, { qk: 'rf2', part: 'Part II', name: 'Practice' }, { qk: 'rf3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'gboost', no: '07', name: 'Gradient Boosting & XGBoost', desc: 'Chain weak learners on the errors — then industrialise it.',
      levels: [{ qk: 'gb1', part: 'Part I', name: 'Foundations' }, { qk: 'gb2', part: 'Part II', name: 'Practice' }, { qk: 'gb3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'stacking', no: '08', name: 'Stacking & Voting', desc: 'Combine different models — by vote, by average, or by a learned chairperson.',
      levels: [{ qk: 'stack1', part: 'Part I', name: 'Foundations' }, { qk: 'stack2', part: 'Part II', name: 'Practice' }, { qk: 'stack3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'metrics', no: '09', name: 'Model Evaluation', desc: 'Precision, recall, F1, ROC-AUC and the confusion matrix.',
      levels: [{ qk: 'metrics1', part: 'Part I', name: 'Foundations' }, { qk: 'metrics2', part: 'Part II', name: 'Pragmatic Practice' }, { qk: 'metrics3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'perf', no: '10', name: 'Performance Optimisation', desc: 'Tune honestly: validation, regularisation, thresholds, baselines.',
      levels: [{ qk: 'perf1', part: 'Part I', name: 'Foundations' }, { qk: 'perf2', part: 'Part II', name: 'Practice' }, { qk: 'perf3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'sklearn', no: '11', name: 'Advanced Scikit-learn', desc: 'Pipelines, search, calibration, importances — the library, used properly.',
      levels: [{ qk: 'skl1', part: 'Part I', name: 'Foundations' }, { qk: 'skl2', part: 'Part II', name: 'Practice' }, { qk: 'skl3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'kmeans', no: '12', name: 'K-Means', desc: 'Assign, average, repeat — the workhorse clusterer.',
      levels: [{ qk: 'kmeans1', part: 'Part I', name: 'Foundations' }, { qk: 'kmeans2', part: 'Part II', name: 'Practice' }, { qk: 'kmeans3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'hier', no: '13', name: 'Hierarchical Clustering', desc: 'Merge the closest groups and draw the whole family tree.',
      levels: [{ qk: 'hier1', part: 'Part I', name: 'Foundations' }, { qk: 'hier2', part: 'Part II', name: 'Practice' }, { qk: 'hier3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'dbscan', no: '14', name: 'DBSCAN', desc: 'Clusters as dense crowds — any shape, noise allowed.',
      levels: [{ qk: 'dbscan1', part: 'Part I', name: 'Foundations' }, { qk: 'dbscan2', part: 'Part II', name: 'Practice' }, { qk: 'dbscan3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'pca', no: '15', name: 'PCA', desc: 'Find the directions that carry the story; drop the rest.',
      levels: [{ qk: 'pca1', part: 'Part I', name: 'Foundations' }, { qk: 'pca2', part: 'Part II', name: 'Practice' }, { qk: 'pca3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'tsne', no: '16', name: 't-SNE', desc: 'Flatten high-dimensional data into honest-if-you-read-them-right maps.',
      levels: [{ qk: 'tsne1', part: 'Part I', name: 'Foundations' }, { qk: 'tsne2', part: 'Part II', name: 'Practice' }, { qk: 'tsne3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'feng', no: '17', name: 'Feature Engineering', desc: 'Turn raw columns into features a model can actually use.',
      levels: [{ qk: 'feng1', part: 'Part I', name: 'Foundations' }, { qk: 'feng2', part: 'Part II', name: 'Practice' }, { qk: 'feng3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'fsel', no: '18', name: 'Feature Selection', desc: 'Keep the columns that carry signal; drop the rest.',
      levels: [{ qk: 'fsel1', part: 'Part I', name: 'Foundations' }, { qk: 'fsel2', part: 'Part II', name: 'Practice' }, { qk: 'fsel3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'msel', no: '19', name: 'Model Selection', desc: 'Choose and tune the right model without fooling yourself.',
      levels: [{ qk: 'msel1', part: 'Part I', name: 'Foundations' }, { qk: 'msel2', part: 'Part II', name: 'Practice' }, { qk: 'msel3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'xgb', no: '20', name: 'XGBoost', desc: 'Regularised gradient boosting, engineered for speed and accuracy.',
      levels: [{ qk: 'xgb1', part: 'Part I', name: 'Foundations' }, { qk: 'xgb2', part: 'Part II', name: 'Practice' }, { qk: 'xgb3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'scen', no: '21', name: 'Applied Scenarios', desc: 'Real situations, real trade-offs: pick the model, metric and fix that fit.',
      levels: [{ qk: 'scen1', part: 'Part I', name: 'Clear Calls' }, { qk: 'scen2', part: 'Part II', name: 'Weighing Trade-offs' }, { qk: 'scen3', part: 'Part III', name: 'Subtle Traps' }] },
    { key: 'interp', no: '22', name: 'Interpretability & Explainability', desc: 'Open the black box: explain what a model does, globally and case by case.',
      levels: [{ qk: 'interp', part: 'Part I', name: 'Definitions' }] },
    { key: 'imbal', no: '23', name: 'Class Imbalance', desc: 'When one class swamps the rest: resample, reweight, move the threshold.',
      levels: [{ qk: 'imbal', part: 'Part I', name: 'Definitions' }] },
    { key: 'evalx', no: '24', name: 'Extra Evaluation Metrics', desc: 'Beyond accuracy: balanced scores, agreement, calibration and PR-AUC.',
      levels: [{ qk: 'evalx', part: 'Part I', name: 'Definitions' }] },
    { key: 'regr', no: '25', name: 'Regression & Boosting', desc: 'Predicting numbers, plus the fast modern boosting libraries.',
      levels: [{ qk: 'regr', part: 'Part I', name: 'Definitions' }] },
    { key: 'valid', no: '26', name: 'Validation', desc: 'Split honestly: grouped, time-ordered and leave-one-out cross-validation.',
      levels: [{ qk: 'valid', part: 'Part I', name: 'Definitions' }] },
    { key: 'podcast', no: '31', name: 'Podcast', desc: 'Ideas from the commute: Markov chains, Bayesian belief, Benford’s law and Monte Carlo.',
      levels: [{ qk: 'podcast', part: 'Part I', name: 'Definitions' }] },
    { key: 'wcrypto', no: '27', name: 'Digital Assets & Smart Contracts', mode: 'work', desc: 'Blockchain, tokenization, stablecoins and smart-contract vocabulary.',
      levels: [{ qk: 'wcrypto', part: 'Part I', name: 'Definitions' }] },
    { key: 'wpay', no: '28', name: 'Payments & Fintech', mode: 'work', desc: 'Rails, open banking, APP fraud and the fintech words of the day job.',
      levels: [{ qk: 'wpay', part: 'Part I', name: 'Definitions' }] },
    { key: 'waws', no: '29', name: 'AWS & Cloud', mode: 'work', desc: 'Instances, spinning up, S3, IAM — the everyday cloud vocabulary.',
      levels: [{ qk: 'waws', part: 'Part I', name: 'Definitions' }] },
    { key: 'wai', no: '30', name: 'AI & Emerging Tech', mode: 'work', desc: 'LLMs, generative AI and the model-risk vocabulary of AI in regulation.',
      levels: [{ qk: 'wai', part: 'Part I', name: 'Definitions' }] }
  ];
  var GROUPS = [
    { label: 'Start here — core definitions', keys: ['found'] },
    { label: 'The algorithms', keys: ['knn', 'logreg', 'bayes', 'trees', 'svm'] },
    { label: 'Ensemble methods', keys: ['rf', 'gboost', 'stacking', 'xgb'] },
    { label: 'Features & model choice', keys: ['feng', 'fsel', 'msel'] },
    { label: 'Measuring & tuning', keys: ['metrics', 'perf', 'sklearn'] },
    { label: 'Unsupervised learning', keys: ['kmeans', 'hier', 'dbscan', 'pca', 'tsne'] },
    { label: 'Beyond the basics', keys: ['regr', 'imbal', 'evalx', 'valid', 'interp'] },
    { label: 'Putting it together', keys: ['scen'] },
    { label: 'Podcast corner', keys: ['podcast'] },
    { label: 'Innovation & the FCA', keys: ['wcrypto', 'wpay', 'waws', 'wai'], mode: 'work' }
  ];
  // ---- App mode: 'ds' (data science revision) · 'code' (coding drills) · 'ptest' (Python coding tests) · 'work' (FCA & innovation) ----
  function getMode() { var v = localStorage.getItem('ds_mode'); return (v === 'code' || v === 'work' || v === 'ptest' || v === 'course' || v === 'lib') ? v : 'ds'; }
  // Anything can be opened from the Library as well as from its own section, so the
  // back button says where you actually came from rather than assuming the course.
  function inLib() { return getMode() === 'lib'; }
  function backWord() { return inLib() ? '← Library' : '← Course'; }
  // Same idea for the screens whose back button normally returns to their own contents.
  function homeWord(usual) { return inLib() ? '← Library' : usual; }
  function setMode(v) { try { localStorage.setItem('ds_mode', v); } catch (e) {} }
  // Topics belong to 'ds' unless tagged; 'code' mode shows its own screen, so shares the ds topic set.
  // The Library is a superset of every section, so nothing is out of mode inside it.
  function topicInMode(t) { if (inLib()) return true; var m = getMode() === 'work' ? 'work' : 'ds'; return (t.mode || 'ds') === m; }
  var KEYMODE = {};
  TOPICS.forEach(function (t) { KEYMODE[t.key] = t.mode || 'ds'; });
  function keyInMode(k) { if (inLib()) return true; var m = getMode() === 'work' ? 'work' : 'ds'; return (KEYMODE[k] || 'ds') === m; }
  var UPCOMING = [
    { name: 'Regression', desc: 'Predicting quantities, done properly.' },
    { name: 'Neural Networks', desc: 'Layers of learned features.' }
  ];
  var LETTERS = 'ABCDE';
  var S = {};


  function h(html) { var d = document.createElement('div'); d.innerHTML = html; return d.firstElementChild; }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function bestKey(qk) { return (qk === 'easy' || qk === 'medium' || qk === 'hard') ? 'ds_best_knn_' + qk : 'ds_best_' + qk; }
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  /* ---------------- lifetime total + daily challenge ---------------- */
  function getTotal() { return +(localStorage.getItem('ds_total_correct') || 0); }
  function bumpTotal() { try { localStorage.setItem('ds_total_correct', getTotal() + 1); } catch (e) {} }
  function setTotal(v) { try { localStorage.setItem('ds_total_correct', Math.max(0, v)); } catch (e) {} }
  function today() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function todayLabel() { try { return new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' }); } catch (e) { return today(); } }
  var DAILY_OPTS = [5, 10, 25, 50];
  function dailyN() { var n; try { n = +localStorage.getItem('ds_daily_n'); } catch (e) {} return DAILY_OPTS.indexOf(n) >= 0 ? n : 10; }
  function setDailyN(n) { try { localStorage.setItem('ds_daily_n', String(n)); } catch (e) {} }
  function hashStr(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  // Index every question once, tagged with topic name, difficulty level (1/2/3), and whether it's a definition question.
  // "Definition" is an EXPLICIT curated set (window.DEFS from data_defs.js) — not a heuristic guess.
  var QINDEX = null;
  function buildIndex() {
    if (QINDEX) return QINDEX;
    QINDEX = [];
    TOPICS.forEach(function (t) {
      t.levels.forEach(function (L, li) {
        (QUESTIONS[L.qk] || []).forEach(function (q) {
          // A question is a "definition" iff it is in the explicit curated set (data_defs.js) — no heuristic guessing.
          var isDef = !!(window.DEFS && window.DEFS[q.q]);
          // Definition questions take their curated 1/2/3 rank as their level, so every
          // difficulty filter (daily, study, type-it) works on rank rather than part.
          var r = q.widget && q.widget.reveal;
          var lvl = (isDef && r && r.name && defRank(r.name)) || (li + 1);
          QINDEX.push({ q: q, topic: t.name, key: t.key, level: lvl, def: isDef });
        });
      });
    });
    return QINDEX;
  }
  var DEFAULT_FILTER = { type: 'both', diff: 'all' };
  function getFilter() {
    var f; try { f = JSON.parse(localStorage.getItem('ds_daily_filter') || 'null'); } catch (e) { f = null; }
    if (!f) return { type: 'both', diff: 'all' };
    return { type: (f.type === 'def' || f.type === 'q') ? f.type : 'both', diff: (f.diff === '1' || f.diff === '2' || f.diff === '3') ? f.diff : 'all' };
  }
  function setFilter(f) { try { localStorage.setItem('ds_daily_filter', JSON.stringify(f)); } catch (e) {} }
  // Definitions are Foundations-only, so the difficulty filter doesn't apply to them.
  function filterSig(f) { return f.type + ':' + (f.type === 'def' ? 'all' : f.diff); }
  function filterLabel(f) {
    if (f.type === 'def') return 'Definitions · Foundations';
    var t = f.type === 'q' ? 'Applied questions' : 'Definitions & questions';
    var d = f.diff === 'all' ? 'all levels' : 'Level ' + f.diff;
    return t + ' · ' + d;
  }
  function poolFor(f) {
    return buildIndex().filter(function (e) {
      if (!keyInMode(e.key)) return false;
      if (qHidden(e.q)) return false;
      if (f.type === 'def' && !e.def) return false;
      if (f.type === 'q' && e.def) return false;
      if (f.type !== 'def' && f.diff !== 'all' && e.level !== +f.diff) return false;
      return true;
    });
  }
  function dailyQuestions(f) {
    var pool = poolFor(f);
    var idx = pool.map(function (_, i) { return i; });
    var rnd = mulberry32(hashStr('datasense-daily::' + today() + '::' + filterSig(f)));
    for (var i = idx.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var tmp = idx[i]; idx[i] = idx[j]; idx[j] = tmp; }
    idx = idx.slice(0, Math.min(dailyN(), idx.length));
    return { qs: idx.map(function (k) { return pool[k].q; }), origins: idx.map(function (k) { return pool[k].topic; }) };
  }
  // Daily progress is stored per day, per filter signature: { date, sets: { 'sig': {pos,correct,results,done} } }
  function readDailyStore() {
    var raw; try { raw = JSON.parse(localStorage.getItem('ds_daily') || 'null'); } catch (e) { raw = null; }
    if (!raw || raw.date !== today() || typeof raw.sets !== 'object') return { date: today(), sets: {} };
    return raw;
  }
  function loadDaily(sig) {
    var store = readDailyStore();
    var s = store.sets[sig];
    return s ? { pos: s.pos || 0, correct: s.correct || 0, results: s.results || [] } : { pos: 0, correct: 0, results: [] };
  }
  function saveDaily(done) {
    try {
      var store = readDailyStore();
      store.sets[S.sig] = { pos: S.i, correct: S.correct, results: S.results, done: !!done };
      localStorage.setItem('ds_daily', JSON.stringify(store));
    } catch (e) {}
  }
  function startDaily() {
    var f = getFilter();
    var sig = filterSig(f);
    var d = loadDaily(sig);
    var dq = dailyQuestions(f);
    if (!dq.qs.length) return;
    if (d.pos >= dq.qs.length) {
      S = { daily: true, sig: sig, qs: dq.qs, origins: dq.origins, i: dq.qs.length, correct: d.correct, results: d.results, level: {}, topic: {} };
      return doneDaily();
    }
    begin({ name: 'Daily', no: '★', key: '__daily__' },
      { qk: '__daily__', part: 'Daily ' + dq.qs.length, name: todayLabel() },
      { qs: dq.qs, origins: dq.origins, mixed: true, modeLabel: 'Daily ' + dq.qs.length, daily: true, sig: sig, startAt: d.pos, startCorrect: d.correct, results: d.results });
  }

  // "Keep going": an extra, untracked batch from the same filter pool — a fresh
  // random draw each time, so you can do as many as you like past the daily.
  function startMore() {
    var f = getFilter();
    var pool = poolFor(f);
    if (!pool.length) return;
    var idx = shuffle(pool.map(function (_, i) { return i; }));
    idx = idx.slice(0, Math.min(dailyN(), idx.length));
    begin({ name: 'Keep going', no: '★', key: '__more__' },
      { qk: '__more__', part: 'Keep going', name: todayLabel() },
      { qs: idx.map(function (k) { return pool[k].q; }), origins: idx.map(function (k) { return pool[k].topic; }), mixed: true, modeLabel: 'Keep going', more: true });
  }

  /* ---------------- per-card history + adaptive review ---------------- */
  function dayNum() { return Math.floor(Date.now() / 86400000); }
  function cardId(q) { return 'c' + hashStr(q.q); }
  var CARDS = null;
  function loadCards() { if (CARDS) return CARDS; try { CARDS = JSON.parse(localStorage.getItem('ds_cards') || '{}') || {}; } catch (e) { CARDS = {}; } return CARDS; }
  function saveCards() { try { localStorage.setItem('ds_cards', JSON.stringify(CARDS)); } catch (e) {} }
  // A NON-writing attempt (multiple choice, flashcard self-rate, type-it, matching).
  // A correct one keeps the card in 'learning' — it does NOT advance toward know-it/mastery,
  // which come only from written answers. A miss resets the written streak → struggling.
  function recordCard(q, right) {
    var c = loadCards(), id = cardId(q);
    var r = c[id] || { box: 0, seen: 0, wrong: 0, last: 0 };
    r.seen++;
    if (right) { r.box = Math.min(5, r.box + 1); r.lastRight = 1; }
    else { r.wrong++; r.box = Math.max(0, r.box - 2); r.lastWrong = dayNum(); r.lastRight = 0; r.wstreak = 0; }
    r.last = dayNum();
    c[id] = r; saveCards();
  }
  function recordSeen(q) {
    var c = loadCards(), id = cardId(q);
    var r = c[id] || { box: 0, seen: 0, wrong: 0, last: 0 };
    r.seen++; r.last = dayNum(); c[id] = r; saveCards();
  }
  // A strong WRITTEN answer (>=4/5) — the ONLY thing that advances mastery. One → know it, two → mastered.
  function recordWrittenCorrect(q) {
    var c = loadCards(), id = cardId(q);
    var r = c[id] || { box: 0, seen: 0, wrong: 0, last: 0 };
    r.seen++; r.box = Math.min(5, r.box + 1); r.wstreak = (r.wstreak || 0) + 1; r.lastRight = 1; r.last = dayNum();
    c[id] = r; saveCards();
  }
  // A middling written answer (3/5): learning — not a miss, but it doesn't advance the written streak.
  function recordPartial(q) {
    var c = loadCards(), id = cardId(q);
    var r = c[id] || { box: 0, seen: 0, wrong: 0, last: 0 };
    r.seen++; r.wstreak = 0; r.lastRight = 1; r.last = dayNum(); c[id] = r; saveCards();
  }
  // Every study mode feeds the SAME per-card memory. Quizzes act on one question;
  // flashcards and the open-writing test act on a whole CONCEPT — so they update
  // every question that teaches that concept, and mastery/Smart Review/daily all
  // move together as one learning map.
  var CONCEPTIDX = null;
  function conceptIndex() {
    if (CONCEPTIDX) return CONCEPTIDX;
    var idx = {};
    buildIndex().forEach(function (e) {
      var names = [];
      if (e.q.widget && e.q.widget.reveal && e.q.widget.reveal.name) names.push(e.q.widget.reveal.name);
      var wf = widgetFor(e.q);
      if (wf && wf.reveal && wf.reveal.name) names.push(wf.reveal.name);
      names.forEach(function (n) { var k = normkey(n); (idx[k] || (idx[k] = [])).push(e.q); });
    });
    CONCEPTIDX = idx; return idx;
  }
  // outcome: 'right' (correct), 'wrong' (miss), 'partial' (3/5 written), 'seen' (touched).
  // wrote=true means it came from the marked WRITTEN test — the only correct that advances mastery.
  function recordConcept(name, outcome, wrote) {
    var qs = conceptIndex()[normkey(name)];
    if (!qs || !qs.length) return 0;
    var uniq = {}, n = 0;
    qs.forEach(function (q) {
      var id = cardId(q); if (uniq[id]) return; uniq[id] = 1; n++;
      if (outcome === 'seen') recordSeen(q);
      else if (outcome === 'partial') recordPartial(q);
      else if (outcome === 'right' && wrote) recordWrittenCorrect(q);   // written correct → advances
      else recordCard(q, outcome === 'right');                          // non-writing correct, or a miss
      if (wrote) { var r = loadCards()[id]; if (r) r.wrote = 1; }
    });
    if (wrote) saveCards();
    if (n) logActivity();
    return n;
  }
  // Written answers, everywhere: >=4/5 is the ONLY correct that advances toward mastery (+ lifetime total);
  // ==3/5 is 'learning' (partial); <=2/5 is a miss. Effort always logs consistency.
  function recordWritten(name, score) {
    var n = recordConcept(name, score >= 4 ? 'right' : (score <= 2 ? 'wrong' : 'partial'), score >= 4);
    if (!n) logActivity();
    if (score >= 4) bumpTotal();
    return n;
  }
  // The marked-writing result panel, shared by both writing modes. Includes a rebuttal control:
  // if you disagree with the AI's mark you can set your own score, and the mastery/total effect is
  // recomputed cleanly (the AI's effect is rolled back first, so adjusting is idempotent).
  function markResultEl(name, reference, res, onNext, onRedo) {
    var affected = (conceptIndex()[normkey(name)] || []).map(cardId);
    var snap = {}, cardsObj = loadCards();
    affected.forEach(function (id) { snap[id] = cardsObj[id] ? JSON.stringify(cardsObj[id]) : null; });
    var snapTotal = getTotal();
    function applyScore(sc) {
      var c = loadCards();
      affected.forEach(function (id) { if (snap[id] == null) delete c[id]; else c[id] = JSON.parse(snap[id]); });
      setTotal(snapTotal); saveCards();
      recordWritten(name, sc);
    }
    var edited = false;
    var el = h('<div class="wr-inner">' +
      '<div class="wr-scorerow"><div class="wr-score sc-' + res.score + '"><span class="wr-num">' + res.score + '</span><span class="wr-den">/ 5</span></div>' +
      '<div class="wr-meter"><div class="wr-fill sc-' + res.score + '" style="width:' + (res.score * 20) + '%"></div></div></div>' +
      '<div class="wr-fb"></div>' +
      '<div class="wr-model"><span class="wr-mtag">The answer</span><span class="wr-modeltext"></span></div>' +
      '<div class="wr-adjust"><span class="wr-adjlab">Think that mark is unfair? Set your own score:</span>' +
        '<span class="wr-adjbtns">' + [1, 2, 3, 4, 5].map(function (s) { return '<button class="wr-adj' + (s === res.score ? ' on' : '') + '" type="button" data-s="' + s + '">' + s + '</button>'; }).join('') + '</span>' +
        '<span class="wr-edited" hidden>✓ your score</span></div>' +
      '<div class="next-row"><button class="btn wr-next">Continue →</button><button class="btn ghost wr-redo">Rewrite</button></div></div>');
    el.querySelector('.wr-fb').textContent = res.feedback || '';
    el.querySelector('.wr-modeltext').textContent = reference;
    function setUI(sc) {
      el.querySelector('.wr-num').textContent = sc;
      el.querySelector('.wr-score').className = 'wr-score sc-' + sc;
      var fill = el.querySelector('.wr-fill'); fill.className = 'wr-fill sc-' + sc; fill.style.width = (sc * 20) + '%';
      el.querySelectorAll('.wr-adj').forEach(function (bt) { bt.classList.toggle('on', +bt.getAttribute('data-s') === sc); });
      el.querySelector('.wr-edited').hidden = !edited;
    }
    el.querySelectorAll('.wr-adj').forEach(function (bt) {
      bt.onclick = function () { var sc = +bt.getAttribute('data-s'); edited = true; applyScore(sc); setUI(sc); };
    });
    el.querySelector('.wr-next').onclick = onNext;
    el.querySelector('.wr-redo').onclick = onRedo;
    applyScore(res.score);   // record the AI's mark to start
    return el;
  }
  // Status: mastery comes only from written answers. 2 good written answers = mastered, 1 = "know it".
  // A miss (any mode) = struggling. Everything else — MC/flashcard/type/match corrects, a 3/5 written,
  // or just seen — is 'learning'. (Legacy cards that were written before start at "know it".)
  function cardStatus(q) {
    var r = loadCards()[cardId(q)];
    if (!r || !r.seen) return 'new';
    var w = (r.wstreak != null) ? r.wstreak : (r.wrote ? 1 : 0);
    if (w >= 2) return 'learnt';                  // mastered: two strong written answers
    if (w === 1) return 'ready';                  // "know it": one strong written answer
    if (r.lastRight === 0) return 'struggling';   // most recent attempt was a miss
    return 'learning';                            // MC/flashcard/type/match correct, 3/5 written, or seen
  }
  function masterySummary() {
    var s = { learnt: 0, ready: 0, learning: 0, struggling: 0, new: 0 };
    buildIndex().forEach(function (e) { s[cardStatus(e.q)]++; });
    return s;
  }
  function masteryByTopic() {
    var by = {};
    buildIndex().forEach(function (e) {
      var m = by[e.key] || (by[e.key] = { key: e.key, topic: e.topic, total: 0, learnt: 0, ready: 0, learning: 0, struggling: 0, new: 0 });
      m.total++; m[cardStatus(e.q)]++;
    });
    return TOPICS.filter(topicInMode).map(function (t) { return by[t.key] || { key: t.key, topic: t.name, total: 0, learnt: 0, ready: 0, learning: 0, struggling: 0, new: 0 }; });
  }
  function getMix() { var v = +(localStorage.getItem('ds_practice_mix')); return isNaN(v) ? 0.5 : Math.max(0, Math.min(1, v)); }
  function setMix(v) { try { localStorage.setItem('ds_practice_mix', v); } catch (e) {} }

  /* ---------------- activity log (for consistency analytics) ---------------- */
  function loadActivity() { try { return JSON.parse(localStorage.getItem('ds_activity') || '{}') || {}; } catch (e) { return {}; } }
  function logActivity() { try { var a = loadActivity(), d = today(); a[d] = (a[d] || 0) + 1; localStorage.setItem('ds_activity', JSON.stringify(a)); } catch (e) {} }
  function fmtDay(dt) { return dt.getFullYear() + '-' + ('0' + (dt.getMonth() + 1)).slice(-2) + '-' + ('0' + dt.getDate()).slice(-2); }

  /* ---------------- favourites + dislikes ---------------- */
  // Both stores hold ids: 'c<hash>' = a question (cardId), 'k<normkey>' = a concept/term,
  // 'o<normkey>' = an order-the-steps set, 't<key>' = a coding task. Favouriting floats an
  // item to the front of decks (and questions join the Favourites drill); disliking hides
  // it from future rounds. The two are mutually exclusive per item.
  var FAVS = null, HIDDEN = null;
  function loadFavs() { if (FAVS) return FAVS; try { FAVS = JSON.parse(localStorage.getItem('ds_favs') || '{}') || {}; } catch (e) { FAVS = {}; } return FAVS; }
  function saveFavs() { try { localStorage.setItem('ds_favs', JSON.stringify(FAVS)); } catch (e) {} }
  function loadHidden() { if (HIDDEN) return HIDDEN; try { HIDDEN = JSON.parse(localStorage.getItem('ds_hidden') || '{}') || {}; } catch (e) { HIDDEN = {}; } return HIDDEN; }
  function saveHidden() { try { localStorage.setItem('ds_hidden', JSON.stringify(HIDDEN)); } catch (e) {} }
  function cid(front) { return 'k' + normkey(front); }
  function isFavId(id) { return !!loadFavs()[id]; }
  function isDisId(id) { return !!loadHidden()[id]; }
  function toggleFavId(id) {
    var f = loadFavs();
    if (f[id]) delete f[id];
    else { f[id] = 1; var d = loadHidden(); if (d[id]) { delete d[id]; saveHidden(); } }
    saveFavs(); return !!f[id];
  }
  function toggleDisId(id) {
    var d = loadHidden();
    if (d[id]) delete d[id];
    else { d[id] = 1; var f = loadFavs(); if (f[id]) { delete f[id]; saveFavs(); } }
    saveHidden(); return !!d[id];
  }
  function isFav(q) { return isFavId(cardId(q)); }
  function toggleFav(q) { return toggleFavId(cardId(q)); }
  function favCount() { return Object.keys(loadFavs()).length; }
  function disCount() { return Object.keys(loadHidden()).length; }
  function clearHidden() { HIDDEN = {}; saveHidden(); }
  // The concept a question teaches (its reveal name) — dislike a concept and every question
  // that teaches it disappears with it, matching how flashcards/writing record progress.
  function qConcept(q) { var wf = widgetFor(q), r = (wf && wf.reveal) || (q.widget && q.widget.reveal); return (r && r.name) || ''; }
  function qHidden(q) { if (isDisId(cardId(q))) return true; var n = qConcept(q); return !!(n && isDisId(cid(n))); }
  function favQuestions() {
    var f = loadFavs();
    return buildIndex().filter(function (e) {
      if (qHidden(e.q)) return false;
      if (f[cardId(e.q)]) return true;
      var n = qConcept(e.q);
      return !!(n && f[cid(n)]);
    });
  }
  // After shuffling a deck, float favourites to the front (order within each half preserved).
  function favFirst(arr, idFn) { var fa = [], rest = []; arr.forEach(function (x) { (isFavId(idFn(x)) ? fa : rest).push(x); }); return fa.concat(rest); }
  // Vote filter for the Study picker: any combination of up-voted (★ saved), down-voted
  // (👎 disliked) and unvoted. The default matches the base behaviour — saved + unvoted
  // shown, disliked kept out — and selecting "down" is how you revisit disliked items.
  function getVoteFilter() {
    var f; try { f = JSON.parse(localStorage.getItem('ds_vote_filter') || 'null'); } catch (e) { f = null; }
    if (!f || typeof f !== 'object') return { up: 1, down: 0, none: 1 };
    var out = { up: f.up ? 1 : 0, down: f.down ? 1 : 0, none: f.none ? 1 : 0 };
    return (out.up || out.down || out.none) ? out : { up: 1, down: 0, none: 1 };
  }
  function setVoteFilter(f) { try { localStorage.setItem('ds_vote_filter', JSON.stringify(f)); } catch (e) {} }
  function voteOfId(id) { return isFavId(id) ? 'up' : (isDisId(id) ? 'down' : 'none'); }
  function voteOkId(id) { return !!getVoteFilter()[voteOfId(id)]; }
  // A question's vote: its own mark wins; otherwise it inherits its concept's mark.
  function qVote(q) {
    var id = cardId(q);
    if (isFavId(id)) return 'up';
    if (isDisId(id)) return 'down';
    var n = qConcept(q);
    if (n) { if (isFavId(cid(n))) return 'up'; if (isDisId(cid(n))) return 'down'; }
    return 'none';
  }
  function qVoteOk(q) { return !!getVoteFilter()[qVote(q)]; }
  // The ★ save / 👎 hide control pair shown on every question and card, in every mode.
  function rateCtl(id, opts) {
    opts = opts || {};
    var wrap = h('<span class="rate-ctl">' +
      (opts.noFav ? '' : '<button class="fav-btn" type="button"></button>') +
      '<button class="dis-btn" type="button"></button></span>');
    var fb = wrap.querySelector('.fav-btn'), db = wrap.querySelector('.dis-btn');
    function paint() {
      if (fb) {
        var f = isFavId(id);
        fb.textContent = f ? '★' : '☆';
        fb.classList.toggle('is-fav', f);
        fb.setAttribute('aria-pressed', f ? 'true' : 'false');
        fb.title = f ? 'Saved to favourites — tap to remove' : 'Save to favourites';
        fb.setAttribute('aria-label', fb.title);
      }
      var d = isDisId(id);
      db.textContent = '👎';
      db.classList.toggle('is-dis', d);
      db.setAttribute('aria-pressed', d ? 'true' : 'false');
      db.title = d ? 'Disliked — hidden from future rounds. Tap to restore' : 'Dislike — hide from future rounds';
      db.setAttribute('aria-label', db.title);
    }
    if (fb) fb.onclick = function (ev) { ev.stopPropagation(); toggleFavId(id); paint(); };
    db.onclick = function (ev) { ev.stopPropagation(); toggleDisId(id); paint(); };
    paint();
    wrap._paint = paint;   // lets the after-answer rating prompt refresh this control
    return wrap;
  }
  function repaintRateCtls() { document.querySelectorAll('.rate-ctl').forEach(function (w) { if (w._paint) w._paint(); }); }
  // After-answer nudge: if the item has no rating yet, ask for one — like, dislike, or
  // explicitly leave it unrated. Never blocks moving on; collapses once a choice is made.
  function ratePrompt(id, vote) {
    if ((vote || voteOfId(id)) !== 'none') return null;
    var el = h('<div class="rate-ask"><span class="ra-lab">Rate this one?</span>' +
      '<button class="btn ghost ra-like" type="button">★ Like</button>' +
      '<button class="btn ghost ra-dis" type="button">👎 Dislike</button>' +
      '<button class="ra-skip" type="button">Leave unrated</button></div>');
    function settle(msg) { el.innerHTML = '<span class="ra-done">' + msg + '</span>'; repaintRateCtls(); }
    el.querySelector('.ra-like').onclick = function () { if (!isFavId(id)) toggleFavId(id); settle('★ Saved to favourites'); };
    el.querySelector('.ra-dis').onclick = function () { if (!isDisId(id)) toggleDisId(id); settle('👎 Disliked — hidden from future rounds'); };
    el.querySelector('.ra-skip').onclick = function () { settle('Left unrated'); };
    return el;
  }
  function startFavourites() {
    var sel = shuffle(favQuestions());
    if (!sel.length) return;
    begin({ name: 'Favourites', no: '★', key: '__favs__' },
      { qk: '__favs__', part: 'Favourites', name: '' },
      { qs: sel.map(function (e) { return e.q; }), origins: sel.map(function (e) { return e.topic; }), mixed: true, modeLabel: 'Favourites', favourites: true });
  }

  /* ---------------- flashcards (concept → definition, flip to test) ---------------- */
  var FLASH = null;
  function normkey(s) { return (s || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
  // Curated 1/2/3 rank for definition concepts (data_defs_rank.js): 1 = simple/core,
  // 2 = standard, 3 = advanced/peripheral. Overrides a card's displayed level everywhere.
  function defRank(name) { var m = window.DEFRANK; return (m && m[normkey(name)]) || 0; }
  function flashDeck() {
    if (FLASH) return FLASH.filter(function (d) { return keyInMode(d.key) && voteOkId(cid(d.front)); });
    var at = {}, deck = [];
    buildIndex().forEach(function (e) {
      var r = e.q.widget && e.q.widget.reveal;
      if (!r || !r.name) return;
      var nk = normkey(r.name);
      var isDef = !!(window.DEFS && window.DEFS[e.q.q]);
      if (at[nk] != null) {
        var d = deck[at[nk]];
        if (isDef) d.def = true;
        if (e.level < d.level) d.level = e.level;   // a card's difficulty = the easiest level it appears in
        return;
      }
      at[nk] = deck.length;
      deck.push({ front: r.name, formula: r.formula || '', back: r.text || '', topic: e.topic, key: e.key, def: isDef, level: e.level });
    });
    deck.forEach(function (d) { var rk = defRank(d.front); if (rk) d.level = rk; });   // curated rank wins
    FLASH = deck;
    return FLASH.filter(function (d) { return keyInMode(d.key) && voteOkId(cid(d.front)); });
  }
  // Difficulty filter shared by every study mode. 0 = all levels, else 1/2/3.
  function getStudyDiff() { var d = +(localStorage.getItem('ds_study_diff')); return (d === 1 || d === 2 || d === 3) ? d : 0; }
  function setStudyDiff(d) { try { localStorage.setItem('ds_study_diff', d || 0); } catch (e) {} }
  function diffOk(lvl) { var d = getStudyDiff(); return !d || lvl === d; }
  // "Unseen only" filter: limit any study mode to concepts/questions you haven't touched yet.
  function getStudyNew() { return localStorage.getItem('ds_study_new') === 'new' ? 'new' : 'all'; }
  function setStudyNew(v) { try { localStorage.setItem('ds_study_new', v); } catch (e) {} }
  function qSeen(q, cards) { var r = cards[cardId(q)]; return !!(r && r.seen); }
  function conceptSeen(front, cards, cidx) { var qs = cidx[normkey(front)]; if (!qs) return false; for (var i = 0; i < qs.length; i++) { if (qSeen(qs[i], cards)) return true; } return false; }
  // pool filters honouring the "Unseen only" toggle — one for question entries (MC), one for concept cards.
  function newFilterQ(pool) { if (getStudyNew() !== 'new') return pool; var c = loadCards(); return pool.filter(function (e) { return !qSeen(e.q, c); }); }
  function newFilterC(deck) { if (getStudyNew() !== 'new') return deck; var c = loadCards(), idx = conceptIndex(); return deck.filter(function (card) { return !conceptSeen(card.front, c, idx); }); }
  function diffTag(lvl) { return '<span class="lvl-pip lvl-' + lvl + '" title="Difficulty ' + lvl + ' of 3">L' + lvl + '</span>'; }
  // Friendly stop when a topic+difficulty combination has nothing to study.
  function noContent(label) {
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back">' + homeWord('← Contents') + '</button><span class="exmeta">' + esc(label) + '</span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);
    app.appendChild(h('<article class="qcard"><h2 class="qtext">Nothing here yet</h2>' +
      '<p class="t-desc">No ' + esc(label.toLowerCase()) + ' match that topic and difficulty. Try “All levels” or a different topic.</p>' +
      '<div class="next-row"><button class="btn nc-back">← Back to Study</button></div></article>'));
    app.querySelector('.nc-back').onclick = home;
    window.scrollTo(0, 0);
  }
  function startFlashcards(topicKey, defsOnly) {
    var deck = favFirst(shuffle(newFilterC(flashDeck().filter(function (c) { return (!topicKey || c.key === topicKey) && (!defsOnly || c.def) && diffOk(c.level); }))), function (c) { return cid(c.front); });
    if (!deck.length) return noContent('Flashcards');
    var i = 0, flipped = false;
    function draw() {
      app.innerHTML = '';
      var bar = h('<div class="exbar"><button class="back">' + homeWord('← Contents') + '</button>' +
        '<div class="ruler"><div style="width:' + (100 * i / deck.length) + '%"></div></div>' +
        '<span class="exmeta">Card <b>' + (i + 1) + '</b> of ' + deck.length + '</span></div>');
      bar.querySelector('.back').onclick = home;
      app.appendChild(bar);
      var c = deck[i];
      var opts = '<option value="">All topics</option>' + TOPICS.filter(topicInMode).map(function (t) {
        return '<option value="' + t.key + '"' + (t.key === topicKey ? ' selected' : '') + '>' + esc(t.name) + '</option>';
      }).join('');
      var view = h('<div class="flash-view">' +
        '<select class="flash-topic">' + opts + '</select>' +
        '<div class="rate-row"></div>' +
        '<div class="flash-stage"><button class="flash-card' + (flipped ? ' flipped' : '') + '" aria-label="Flip card">' +
          '<div class="flash-face flash-front"><span class="flash-tag">Concept ' + diffTag(c.level) + '</span><div class="flash-term"></div><span class="flash-hint">tap to reveal the definition</span></div>' +
          '<div class="flash-face flash-back"><span class="flash-tag">Definition</span>' + (c.formula ? '<div class="flash-formula"></div>' : '') + '<div class="flash-def"></div><span class="flash-topictag">' + esc(c.topic) + ' ' + diffTag(c.level) + '</span></div>' +
        '</button></div>' +
        '<div class="flash-controls"><button class="btn ghost flash-prev">← Prev</button><button class="btn flash-flip">Flip</button><button class="btn ghost flash-next">Skip →</button></div>' +
        '<div class="flash-rate"><span class="fr-lab">How well did you know it?</span>' +
          '<button class="btn fr-good">✓ Got it</button><button class="btn ghost fr-again">↻ Review again</button></div>' +
        '<button class="flash-shuffle">↻ Shuffle deck</button>' +
      '</div>');
      view.querySelector('.rate-row').appendChild(rateCtl(cid(c.front)));
      view.querySelector('.flash-term').textContent = c.front;
      view.querySelector('.flash-def').textContent = c.back;
      if (c.formula) view.querySelector('.flash-formula').textContent = c.formula;
      var fc = view.querySelector('.flash-card');
      var prompted = false;
      function maybePrompt() {
        if (!flipped || prompted) return;
        prompted = true;
        var rp = ratePrompt(cid(c.front));
        if (rp) view.insertBefore(rp, view.querySelector('.flash-shuffle'));
      }
      function flip() { flipped = !flipped; fc.classList.toggle('flipped', flipped); maybePrompt(); }
      function advance() { i = (i + 1) % deck.length; flipped = false; draw(); }
      fc.onclick = flip;
      view.querySelector('.flash-flip').onclick = function (ev) { ev.stopPropagation(); flip(); };
      view.querySelector('.flash-prev').onclick = function () { i = (i - 1 + deck.length) % deck.length; flipped = false; draw(); };
      view.querySelector('.flash-next').onclick = function () { recordConcept(c.front, 'seen'); advance(); };
      // Self-rating feeds the shared learning map: 'Got it' strengthens every question
      // that teaches this concept; 'Review again' marks it for spaced review.
      view.querySelector('.fr-good').onclick = function () { recordConcept(c.front, 'right'); advance(); };
      view.querySelector('.fr-again').onclick = function () { recordConcept(c.front, 'wrong'); advance(); };
      view.querySelector('.flash-shuffle').onclick = function () { deck = shuffle(deck); i = 0; flipped = false; draw(); };
      view.querySelector('.flash-topic').onchange = function () { startFlashcards(this.value); };
      view.insertBefore(aiExplainConcept(c.front, c.back), view.querySelector('.flash-shuffle'));
      app.appendChild(view);
      window.scrollTo(0, 0);
    }
    draw();
  }

  /* ---------------- type the term: read the definition, recall the name ---------------- */
  // Forgiving match: exact after normalising, near-miss (1 edit) for longer terms, or the term's
  // significant words all present. Typing recall is harder than recognising, so we grade kindly.
  function editDist(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 99;
    var m = a.length, n = b.length, d = [];
    for (var i = 0; i <= m; i++) { d[i] = [i]; }
    for (var j = 1; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  function termMatches(guess, target) {
    var g = normkey(guess), t = normkey(target);
    if (!g) return false;
    if (g === t) return true;
    if (t.length >= 6 && editDist(g, t) <= (t.length >= 10 ? 2 : 1)) return true;
    // a parenthetical is a qualifier, not part of the term: accept "recall" for "Recall (sensitivity)"
    var main = normkey(target.replace(/\(.*?\)/g, ' '));
    if (main && main !== t) {
      if (g === main) return true;
      if (main.length >= 6 && editDist(g, main) <= (main.length >= 10 ? 2 : 1)) return true;
    }
    // accept "k nearest neighbours" for "k-Nearest Neighbours (k-NN)" style targets
    var words = target.toLowerCase().replace(/\(.*?\)/g, '').split(/[^a-z0-9]+/).filter(function (w) { return w.length > 2; });
    if (words.length >= 2 && words.every(function (w) { return g.indexOf(normkey(w)) >= 0; })) return true;
    return false;
  }
  function startTypeIt(topicKey) {
    var deck = favFirst(shuffle(newFilterC(flashDeck().filter(function (c) { return (!topicKey || c.key === topicKey) && c.back && c.back.length > 15 && diffOk(c.level); }))), function (c) { return cid(c.front); }).slice(0, 10);
    if (!deck.length) return noContent('Type-the-term cards');
    var i = 0, score = 0, viewIdx = null;
    // Read-only look back at an earlier card: definition + the term, no re-answering.
    function drawReview() {
      var c = deck[viewIdx];
      app.innerHTML = '';
      var bar = h('<div class="exbar"><button class="back">' + homeWord('← Contents') + '</button><span class="exmeta">Type the term · reviewing <b>' + (viewIdx + 1) + '</b> of ' + deck.length + '</span></div>');
      bar.querySelector('.back').onclick = home;
      app.appendChild(bar);
      var card = h('<article class="qcard type-card">' +
        '<div class="q-top"><div class="q-eyebrow">Review · ' + esc(c.topic) + ' ' + diffTag(c.level) + '</div></div>' +
        '<div class="type-def"><span class="p-label">The definition</span><p class="type-deftext"></p>' + (c.formula ? '<div class="type-formula"></div>' : '') + '</div>' +
        '<div class="type-result tr-good"><span class="tr-mark">The term</span><div class="tr-term"></div></div>' +
        '<div class="next-row">' + (viewIdx > 0 ? '<button class="btn ghost rev-prev">← Previous</button>' : '') +
        '<button class="btn rev-next">' + (viewIdx + 1 >= i ? 'Back to the card →' : 'Forward →') + '</button></div></article>');
      card.querySelector('.q-top').appendChild(rateCtl(cid(c.front)));
      card.querySelector('.type-deftext').textContent = c.back;
      if (c.formula) card.querySelector('.type-formula').textContent = c.formula;
      card.querySelector('.tr-term').textContent = c.front;
      var rp = card.querySelector('.rev-prev');
      if (rp) rp.onclick = function () { viewIdx--; draw(); };
      card.querySelector('.rev-next').onclick = function () { viewIdx++; draw(); };
      app.appendChild(card);
      window.scrollTo(0, 0);
    }
    function draw() {
      if (viewIdx != null) {
        if (viewIdx >= i) viewIdx = null;
        else return drawReview();
      }
      var c = deck[i];
      app.innerHTML = '';
      var bar = h('<div class="exbar"><button class="back">' + homeWord('← Contents') + '</button><span class="exmeta">Type the term · <b>' + (i + 1) + '</b> of ' + deck.length + ' · <b>' + score + '</b> right</span></div>');
      bar.querySelector('.back').onclick = home;
      app.appendChild(bar);
      var card = h('<article class="qcard type-card">' +
        '<div class="q-top"><div class="q-eyebrow">Type the term · ' + esc(c.topic) + ' ' + diffTag(c.level) + '</div></div>' +
        '<div class="type-def"><span class="p-label">The definition</span><p class="type-deftext"></p>' + (c.formula ? '<div class="type-formula"></div>' : '') + '</div>' +
        '<label class="type-lab" for="type-in">Which term is this?</label>' +
        '<form class="type-form"><input id="type-in" class="type-in" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="type the term…">' +
        '<button class="btn type-go" type="submit">Check</button>' +
        (i > 0 ? '<button class="btn ghost type-back" type="button">← Back</button>' : '') +
        '<button class="btn ghost type-skip" type="button">Skip →</button></form>' +
        '<div class="type-result" hidden></div></article>');
      card.querySelector('.q-top').appendChild(rateCtl(cid(c.front)));
      card.querySelector('.type-deftext').textContent = c.back;
      if (c.formula) card.querySelector('.type-formula').textContent = c.formula;
      var form = card.querySelector('.type-form');
      var input = card.querySelector('.type-in');
      var result = card.querySelector('.type-result');
      var answered = false;
      function goNext() {
        i++;
        if (i < deck.length) return draw();
        app.innerHTML = '';
        var doneCard = h('<div class="result-card"><div class="r-eyebrow">Type the term · ' + deck.length + ' definitions</div>' +
          '<div class="score-big">' + score + ' <small>/ ' + deck.length + '</small></div>' +
          '<p class="r-msg">Recalling a term cold is harder than recognising it — every one of these strengthened your learning map.</p>' +
          '<div class="next-row" style="justify-content:center"><button class="btn">Another round</button><button class="btn ghost">Contents</button></div></div>');
        doneCard.querySelector('.btn').onclick = function () { startTypeIt(topicKey); };
        doneCard.querySelector('.btn.ghost').onclick = home;
        app.appendChild(doneCard);
      }
      function reveal(outcome) {   // 'right' | 'wrong' | 'skip'
        if (answered) return;
        answered = true;
        var right = outcome === 'right';
        input.disabled = true;
        card.querySelector('.type-go').disabled = true;
        card.querySelector('.type-skip').disabled = true;
        if (right) score++;
        recordConcept(c.front, outcome === 'skip' ? 'seen' : (right ? 'right' : 'wrong'));
        result.hidden = false;
        result.className = 'type-result ' + (right ? 'tr-good' : (outcome === 'skip' ? '' : 'tr-bad'));
        result.innerHTML = '<span class="tr-mark">' + (right ? '✓ That\'s it' : (outcome === 'skip' ? 'Skipped — the term is' : '✗ Not quite')) + '</span>' +
          '<div class="tr-term"></div>' +
          '<div class="next-row"><button class="btn tr-next">' + (i + 1 < deck.length ? 'Next definition →' : 'See the score →') + '</button></div>';
        result.querySelector('.tr-term').textContent = c.front;
        result.insertBefore(aiExplainConcept(c.front, c.back), result.querySelector('.next-row'));
        var rp = ratePrompt(cid(c.front));
        if (rp) result.insertBefore(rp, result.querySelector('.next-row'));
        result.querySelector('.tr-next').onclick = goNext;
        input.blur();
      }
      form.onsubmit = function (ev) { ev.preventDefault(); reveal(termMatches(input.value, c.front) ? 'right' : 'wrong'); };
      var tb = card.querySelector('.type-back');
      if (tb) tb.onclick = function () { viewIdx = i - 1; draw(); };
      card.querySelector('.type-skip').onclick = function () { reveal('skip'); };
      app.appendChild(card);
      window.scrollTo(0, 0);
      setTimeout(function () { input.focus(); }, 50);
    }
    draw();
  }

  /* ---------------- matching: pair terms with definitions, then order algorithm steps ---------------- */
  function startMatching(topicKey) {
    var pool = favFirst(shuffle(newFilterC(flashDeck().filter(function (c) { return (!topicKey || c.key === topicKey) && c.back && c.back.length > 15 && diffOk(c.level); }))), function (c) { return cid(c.front); });
    var orders = getStudyNew() === 'new' ? [] : favFirst(shuffle((window.ORDERS || []).filter(function (o) { return (!topicKey || o.key === topicKey) && diffOk(o.level || 1) && voteOkId('o' + normkey(o.title)); })), function (o) { return 'o' + normkey(o.title); }).slice(0, 2);
    var PAIRS = 5, ROUNDS = Math.min(3, Math.floor(pool.length / PAIRS));
    if (!ROUNDS && !orders.length) return noContent('Match & order sets');
    var round = 0, orderIdx = 0, totalRight = 0, totalPairs = 0;
    function trim(s) { return s.length > 110 ? s.slice(0, 107).replace(/\s+\S*$/, '') + '…' : s; }
    function drawMatch() {
      var cards = pool.slice(round * PAIRS, round * PAIRS + PAIRS);
      app.innerHTML = '';
      var bar = h('<div class="exbar"><button class="back">' + homeWord('← Contents') + '</button><span class="exmeta">Match · round <b>' + (round + 1) + '</b> of ' + (ROUNDS + (orders.length ? orders.length : 0)) + '</span></div>');
      bar.querySelector('.back').onclick = home;
      app.appendChild(bar);
      var sec = h('<article class="qcard match-card"><div class="q-eyebrow">Match each term to its definition</div>' +
        '<div class="match-cols"><div class="match-terms"></div><div class="match-defs"></div></div>' +
        '<p class="match-note">Tap a term, then tap its definition.</p>' +
        '<div class="match-rate"><span class="mr-lab">Save ★ or hide 👎 a term for future rounds:</span></div>' +
        '<div class="next-row match-nav">' + (round > 0 ? '<button class="btn ghost mn-prev">← Previous round</button>' : '') +
        '<button class="btn ghost mn-skip">Skip round →</button></div></article>');
      var mrStrip = sec.querySelector('.match-rate');
      cards.forEach(function (c) {
        var chip = h('<span class="mr-item"><span class="mr-term"></span></span>');
        chip.querySelector('.mr-term').textContent = c.front;
        chip.appendChild(rateCtl(cid(c.front)));
        mrStrip.appendChild(chip);
      });
      var mnp = sec.querySelector('.mn-prev');
      if (mnp) mnp.onclick = function () { round--; drawMatch(); };
      sec.querySelector('.mn-skip').onclick = nextStage;
      var termsEl = sec.querySelector('.match-terms'), defsEl = sec.querySelector('.match-defs');
      var selTerm = null, solved = 0, errs = {};
      shuffle(cards.slice()).forEach(function (c) {
        var b = h('<button class="match-item mi-term" type="button"></button>');
        b.textContent = c.front;
        b._c = c;
        b.onclick = function () {
          if (b.classList.contains('mi-done')) return;
          termsEl.querySelectorAll('.mi-term').forEach(function (x) { x.classList.remove('mi-sel'); });
          b.classList.add('mi-sel'); selTerm = b;
        };
        termsEl.appendChild(b);
      });
      shuffle(cards.slice()).forEach(function (c) {
        var b = h('<button class="match-item mi-def" type="button"></button>');
        b.textContent = trim(c.back);
        b._c = c;
        b.onclick = function () {
          if (b.classList.contains('mi-done') || !selTerm) return;
          var t = selTerm._c;
          if (t === b._c) {
            selTerm.classList.remove('mi-sel'); selTerm.classList.add('mi-done'); b.classList.add('mi-done');
            selTerm.disabled = true; b.disabled = true;
            var right = !errs[normkey(t.front)];
            recordConcept(t.front, right ? 'right' : 'wrong');
            totalPairs++; if (right) totalRight++;
            selTerm = null; solved++;
            if (solved === cards.length) {
              // All pairs done: move straight on if every term is rated, otherwise pause
              // with a nudge so unrated terms can be saved or hidden before continuing.
              if (!cards.some(function (x) { return voteOfId(cid(x.front)) === 'none'; })) { setTimeout(nextStage, 450); }
              else {
                var ask = h('<div class="rate-ask match-ask"><span class="ra-lab">Round done ✓ — rate any of the terms above (★ / 👎), or carry on.</span>' +
                  '<button class="btn ra-cont" type="button">Continue →</button></div>');
                ask.querySelector('.ra-cont').onclick = nextStage;
                sec.insertBefore(ask, sec.querySelector('.match-nav'));
              }
            }
          } else {
            errs[normkey(t.front)] = 1;
            b.classList.add('mi-shake'); selTerm.classList.add('mi-shake');
            setTimeout(function () { b.classList.remove('mi-shake'); if (selTerm) selTerm.classList.remove('mi-shake'); }, 350);
          }
        };
        defsEl.appendChild(b);
      });
      app.appendChild(sec);
      window.scrollTo(0, 0);
    }
    function drawOrder() {
      var o = orders[orderIdx];
      app.innerHTML = '';
      var bar = h('<div class="exbar"><button class="back">' + homeWord('← Contents') + '</button><span class="exmeta">Order the steps · ' + esc(o.title) + '</span></div>');
      bar.querySelector('.back').onclick = home;
      app.appendChild(bar);
      var sec = h('<article class="qcard order-card"><div class="q-top"><div class="q-eyebrow">Put the steps in order ' + diffTag(o.level || 1) + '</div></div>' +
        '<h2 class="order-title">' + esc(o.title) + '</h2>' +
        '<p class="match-note">Tap the steps in the order they happen — first step first.</p>' +
        '<div class="order-list"></div><div class="order-done" hidden></div>' +
        '<div class="next-row match-nav">' + (orderIdx > 0 || ROUNDS > 0 ? '<button class="btn ghost mn-prev">← Back</button>' : '') +
        '<button class="btn ghost mn-skip">Skip →</button></div></article>');
      sec.querySelector('.q-top').appendChild(rateCtl('o' + normkey(o.title)));
      var onp = sec.querySelector('.mn-prev');
      if (onp) onp.onclick = function () {
        if (orderIdx > 0) { orderIdx--; drawOrder(); }
        else { round = ROUNDS - 1; drawMatch(); }
      };
      sec.querySelector('.mn-skip').onclick = function () { orderIdx++; nextStage(); };
      var list = sec.querySelector('.order-list');
      var expected = 0, wrongTaps = 0;
      shuffle(o.steps.map(function (s, i) { return { s: s, i: i }; })).forEach(function (it) {
        var b = h('<button class="order-item" type="button"><span class="oi-no"></span><span class="oi-text"></span></button>');
        b.querySelector('.oi-text').textContent = it.s;
        b.onclick = function () {
          if (b.classList.contains('oi-done')) return;
          if (it.i === expected) {
            b.classList.add('oi-done');
            b.querySelector('.oi-no').textContent = (expected + 1);
            expected++;
            if (expected === o.steps.length) {
              logActivity();
              var mn = sec.querySelector('.match-nav');
              if (mn) mn.remove();
              var d = sec.querySelector('.order-done');
              d.hidden = false;
              d.innerHTML = '<div class="banner good"><span class="b-label">' + (wrongTaps ? 'Ordered ✓ (' + wrongTaps + ' wrong tap' + (wrongTaps === 1 ? '' : 's') + ')' : 'Perfect order ✓') + '</span>Every step in its place.</div>' +
                '<div class="next-row"><button class="btn od-next">Continue →</button></div>';
              var orp = ratePrompt('o' + normkey(o.title));
              if (orp) d.insertBefore(orp, d.querySelector('.next-row'));
              d.querySelector('.od-next').onclick = function () { orderIdx++; nextStage(); };
            }
          } else {
            wrongTaps++;
            b.classList.add('mi-shake');
            setTimeout(function () { b.classList.remove('mi-shake'); }, 350);
          }
        };
        list.appendChild(b);
      });
      app.appendChild(sec);
      window.scrollTo(0, 0);
    }
    function nextStage() {
      round++;
      if (round <= ROUNDS - 1) return drawMatch();
      if (orderIdx < orders.length) return drawOrder();
      app.innerHTML = '';
      var doneCard = h('<div class="result-card"><div class="r-eyebrow">Match &amp; order</div>' +
        '<div class="score-big">' + totalRight + ' <small>/ ' + totalPairs + ' first-try</small></div>' +
        '<p class="r-msg">Pairs matched' + (orders.length ? ' and algorithm steps put in order' : '') + ' — all of it feeds your learning map.</p>' +
        '<div class="next-row" style="justify-content:center"><button class="btn">Another round</button><button class="btn ghost">Contents</button></div></div>');
      doneCard.querySelector('.btn').onclick = function () { startMatching(topicKey); };
      doneCard.querySelector('.btn.ghost').onclick = home;
      app.appendChild(doneCard);
    }
    if (ROUNDS) drawMatch(); else drawOrder();
  }

  /* ---------------- read + recall: read a note, then test yourself, over and over ---------------- */
  // The test after each note can be a flashcard, a multiple-choice question, an open written
  // answer (marked by Claude), or a mix — the learner chooses in the Study picker.
  function getLearnTest() { var v = localStorage.getItem('ds_learn_test'); return (v === 'card' || v === 'mc' || v === 'written') ? v : 'mix'; }
  function setLearnTest(v) { try { localStorage.setItem('ds_learn_test', v); } catch (e) {} }
  // How many concepts a single read+recall pass covers. 0 = the whole topic in one sitting.
  var LEARN_OPTS = [10, 25, 50, 0];
  function learnN() { var n; try { n = +localStorage.getItem('ds_learn_n'); } catch (e) {} return LEARN_OPTS.indexOf(n) >= 0 ? n : 25; }
  function setLearnN(n) { try { localStorage.setItem('ds_learn_n', String(n)); } catch (e) {} }
  // Scope of a read+recall pass: every concept, or just the tagged definitions.
  function getLearnScope() { return localStorage.getItem('ds_learn_scope') === 'defs' ? 'defs' : 'all'; }
  function setLearnScope(v) { try { localStorage.setItem('ds_learn_scope', v); } catch (e) {} }
  // Home layout: which "door" (Learn / Practice / Reference) is open, plus the collapsible progress
  // and connect-Claude panels. Keeps the home page to one focused area at a time instead of a long scroll.
  function getHomeDoor() { var v = localStorage.getItem('ds_home_door'); return (v === 'reference' || v === 'dashboard') ? v : 'study'; }
  function setHomeDoor(v) { try { localStorage.setItem('ds_home_door', v); } catch (e) {} }
  function getProgressOpen() { return localStorage.getItem('ds_home_prog') === '1'; }
  function setProgressOpen(v) { try { localStorage.setItem('ds_home_prog', v ? '1' : '0'); } catch (e) {} }
  function getApiOpen() { return localStorage.getItem('ds_home_api') === '1'; }
  function setApiOpen(v) { try { localStorage.setItem('ds_home_api', v ? '1' : '0'); } catch (e) {} }
  // Tokenise a title/definition for the read↔concept matching below (drops short/stop words).
  var LEARN_STOP = ['the', 'and', 'for', 'with', 'that', 'this', 'are', 'was', 'its', 'you', 'your', 'from', 'into', 'not', 'but', 'how', 'why', 'what', 'when', 'one', 'two', 'per', 'via', 'use', 'used', 'uses', 'each', 'they', 'them', 'has', 'have', 'can', 'all', 'any', 'set', 'get'];
  function learnTokens(s) { return (s || '').toLowerCase().split(/[^a-z0-9]+/).filter(function (w) { return w.length > 2 && LEARN_STOP.indexOf(w) < 0; }); }
  // The study note that IS the given concept — used as the richer READ material before recalling it.
  // A note qualifies only when its title genuinely names the concept: an exact match, or a ≥2-word
  // full containment either way (so "Manhattan distance" pairs with "Manhattan (city-block) distance",
  // but a generic single word like "Small"/"Large" never drags an adjacent note onto the wrong concept).
  // No qualifying note → we fall back to the concept's own definition, so read and test always agree.
  function bestNoteForConcept(concept, notes) {
    var cName = normkey(concept.front), cTok = learnTokens(concept.front);
    var exact = null, contained = null;
    notes.forEach(function (n) {
      if (exact) return;
      var nt = normkey(n.t);
      if (nt === cName) { exact = n; return; }
      if (contained) return;
      var ntTok = learnTokens(n.t);
      if (ntTok.length >= 2 && cTok.length >= 2 &&
        (ntTok.every(function (w) { return cTok.indexOf(w) >= 0; }) ||
         cTok.every(function (w) { return ntTok.indexOf(w) >= 0; }))) contained = n;
    });
    return exact || contained || null;
  }
  // Of a concept's questions, the one whose wording overlaps the note you just read the most —
  // so the multiple-choice step tests THAT note, not a random sibling question of the concept.
  function bestQuestionForNote(note, qs) {
    var ntok = learnTokens(note.t + ' ' + (note.d || ''));
    var best = qs[0], bestScore = -1;
    qs.forEach(function (q) {
      var qtok = learnTokens(q.q + ' ' + ((q.choices && q.choices[0]) || '') + ' ' + (q.explain || ''));
      var s = 0; qtok.forEach(function (w) { if (ntok.indexOf(w) >= 0) s++; });
      if (s > bestScore) { bestScore = s; best = q; }
    });
    return best;
  }
  // Every distinct concept in a topic that read+recall can cover: a study note where one names the
  // concept, otherwise the concept's own flashcard used as the thing to read. This is why finishing a
  // topic really does cover the whole topic — not just the handful of concepts a note happened to name.
  function learnConcepts(topicKey, scope) {
    var out = [];
    // Every topic that has study notes OR concept cards — not just those with a Notes-reader entry, so
    // note-less topics (e.g. Applied Scenarios) are still fully covered via their concept flashcards.
    TOPICS.forEach(function (t) {
      if (topicKey && t.key !== topicKey) return;
      if (!topicKey && !topicInMode(t)) return;
      var notes = [];
      var nt = window.NOTES && window.NOTES[t.key];
      if (nt) (nt.groups || []).forEach(function (g) {
        (g.items || []).forEach(function (it) { notes.push({ t: it.t, d: it.d, f: it.f, group: g.h, topic: t.name }); });
      });
      // Build the concept list from THIS topic's own questions. A concept can be shared across topics
      // (e.g. "feature scaling" in both kNN and Feature Engineering); the global flashcard deck assigns
      // it to just one topic, but the dashboard counts each question under its own topic — so a topic must
      // cover every concept its questions test, including ones "owned" elsewhere. Otherwise those
      // questions can never be marked seen by studying the topic they live in.
      var byConcept = {}, cardsMap = {};
      buildIndex().filter(function (e) { return e.key === t.key && diffOk(e.level); }).forEach(function (e) {
        var wf = widgetFor(e.q), r = wf && wf.reveal;
        if (!r || !r.name) return;
        var k = normkey(r.name);
        (byConcept[k] || (byConcept[k] = [])).push(e.q);
        var isDef = !!(window.DEFS && window.DEFS[e.q.q]);
        if (!cardsMap[k]) cardsMap[k] = { front: r.name, formula: r.formula || '', back: r.text || e.q.simple || e.q.explain || '', topic: t.name, key: t.key, level: e.level, def: isDef };
        else { if (e.level < cardsMap[k].level) cardsMap[k].level = e.level; if (isDef) cardsMap[k].def = true; }
      });
      var cards = Object.keys(cardsMap).map(function (k) { return cardsMap[k]; });
      cards.forEach(function (c) { var rk = defRank(c.front); if (rk) c.level = rk; });   // curated rank wins
      if (scope === 'defs') cards = cards.filter(function (c) { return c.def; });   // definitions-only pass
      cards = cards.filter(function (c) { return voteOkId(cid(c.front)); });   // honour the Votes filter
      if (!cards.length) return;
      // Concept-driven: one read → recall per concept. The read is ALWAYS titled with the concept being
      // tested; its body is a strongly-matching study note's explanation where one exists, otherwise the
      // concept's own definition. Read and test therefore describe the exact same thing — always aligned.
      cards.forEach(function (c) {
        var best = bestNoteForConcept(c, notes);
        var readNote = best
          ? { t: c.front, d: best.d, f: best.f || c.formula || '', group: 'From the notes', topic: t.name }
          : { t: c.front, d: c.back, f: c.formula || '', group: 'Key concept', topic: t.name };
        out.push({ note: readNote, concept: c, topic: t.name, byConcept: byConcept });
      });
    });
    return out;
  }
  // How far along a concept is, for prioritising the least-known first: lower = needs work more.
  function conceptRank(item) {
    var qs = item.concept && item.byConcept[normkey(item.concept.front)];
    var st = (qs && qs.length) ? cardStatus(qs[0]) : 'new';
    return st === 'learnt' ? 3 : st === 'ready' ? 2 : st === 'learning' ? 1 : 0;   // new / struggling first
  }
  function learnSequence(topicKey, testType, cap, scope) {
    var items = learnConcepts(topicKey, scope);
    // Split into testable concepts (deduped) and pure read-only notes (headings with no concept).
    var seenC = {}, concepts = [], readOnly = [];
    items.forEach(function (x) {
      if (!x.concept) { if (voteOkId(cid(x.note.t))) readOnly.push(x); return; }
      var k = normkey(x.concept.front);
      if (seenC[k]) return; seenC[k] = 1;   // a concept is tested once per pass; prefer its first (note) form
      concepts.push(x);
    });
    if (getStudyNew() === 'new') {   // "Unseen only": keep concepts you haven't touched yet
      var _c = loadCards(), _i = conceptIndex();
      concepts = concepts.filter(function (x) { return !conceptSeen(x.concept.front, _c, _i); });
      readOnly = [];
    }
    // Fresh order each Start, but least-mastered concepts first so short sessions hit what needs work
    // and repeated passes actually finish the topic instead of re-drilling what's already mastered.
    // Within the same mastery band, rank-1 (core/simple) concepts come before rank-2 and rank-3.
    concepts = shuffle(concepts);
    concepts.sort(function (a, b) {
      return (conceptRank(a) - conceptRank(b)) || ((a.concept.level || 2) - (b.concept.level || 2));
    });   // stable: keeps the shuffle within a band
    var plan;
    if (cap && cap > 0) { plan = concepts.slice(0, cap); }
    else { plan = shuffle(concepts.concat(readOnly)); }   // "whole topic": include the read-only notes too
    var seq = [];
    plan.forEach(function (x) {
      var n = x.note, concept = x.concept, byConcept = x.byConcept;
      seq.push({ type: 'read', note: n });
      if (!concept) return;
      var conceptQs = (byConcept[normkey(concept.front)] || []).filter(function (q) { return getVoteFilter().down || !isDisId(cardId(q)); });
      var testCard = { front: concept.front, back: concept.back, formula: concept.formula || '', topic: x.topic, record: concept.front, level: concept.level };
      var pick = testType;
      if (pick === 'mix') {
        var opts = ['card'];
        if (conceptQs.length) opts.push('mc');
        if (apiKey()) opts.push('written');
        pick = opts[Math.floor(Math.random() * opts.length)];
      }
      if (pick === 'mc' && conceptQs.length) seq.push({ type: 'mc', q: bestQuestionForNote(n, conceptQs), topic: x.topic, note: n, concept: concept.front });
      else if (pick === 'written') seq.push({ type: 'written', card: testCard });
      else seq.push({ type: 'card', card: testCard });
    });
    return seq;
  }
  function startLearn(topicKey) {
    var seq = learnSequence(topicKey, getLearnTest(), learnN(), getLearnScope());
    if (!seq.length) return noContent('Read + recall');
    var i = 0, seen = 0, known = 0;
    function advance() { i++; if (i >= seq.length) return finish(); draw(); }
    function goBack() { if (i > 0) { i--; draw(); } }
    // Skip this note AND its attached test (if any), jumping to the next note.
    function skipPair() { i += (seq[i + 1] && seq[i + 1].type !== 'read') ? 2 : 1; if (i >= seq.length) return finish(); draw(); }
    function bar() {
      var b = h('<div class="exbar"><button class="back">' + homeWord('← Contents') + '</button>' +
        '<div class="ruler"><div style="width:' + (100 * i / seq.length) + '%"></div></div>' +
        '<span class="exmeta">Read + recall · <b>' + (i + 1) + '</b> of ' + seq.length + '</span></div>');
      b.querySelector('.back').onclick = home;
      return b;
    }
    function draw() {
      var step = seq[i];
      if (step.type === 'mc') { drawMC(step); return; }   // begin() renders the full question UI (lab, skip, ladder, retry)
      app.innerHTML = '';
      app.appendChild(bar());
      if (step.type === 'read') drawRead(step.note);
      else if (step.type === 'written') drawWritten(step);
      else drawCard(step.card);
      window.scrollTo(0, 0);
    }
    function nextLabel() {
      var nx = seq[i + 1];
      if (!nx) return 'Next →';
      if (nx.type === 'mc') return 'Answer a question →';
      if (nx.type === 'written') return 'Explain it →';
      if (nx.type === 'card') return 'Recall a card →';
      return 'Next →';
    }
    function drawRead(n) {
      var card = h('<article class="qcard learn-read">' +
        '<div class="q-top"><div class="q-eyebrow">Read · ' + esc(n.topic) + ' · ' + esc(n.group) + '</div></div>' +
        '<div class="note-item lr-item"><div class="ni-t"></div><div class="ni-d"></div>' + (n.f ? '<div class="ni-f"></div>' : '') + '</div>' +
        '<div class="next-row">' + (i > 0 ? '<button class="btn ghost lr-back">← Back</button>' : '') +
        '<button class="btn lr-next">' + nextLabel() + '</button><button class="btn ghost lr-skip">Skip →</button></div></article>');
      card.querySelector('.q-top').appendChild(rateCtl(cid(n.t)));
      card.querySelector('.ni-t').textContent = n.t;
      card.querySelector('.ni-d').textContent = n.d;
      if (n.f) card.querySelector('.ni-f').textContent = n.f;
      card.appendChild(aiExplainConcept(n.t, n.d));
      var lrb = card.querySelector('.lr-back');
      if (lrb) lrb.onclick = goBack;
      card.querySelector('.lr-next').onclick = advance;
      card.querySelector('.lr-skip').onclick = skipPair;
      app.appendChild(card);
    }
    // Multiple-choice test step: the FULL question experience — lab bench, skip, plain-English
    // answer, break-it-down ladder and second attempt — then it returns to the read+recall loop.
    function drawMC(step) {
      begin({ name: 'Read + recall', no: '✎', key: '__learn__' },
        { qk: '__learn__', part: 'Read + recall', name: step.topic },
        { qs: [step.q], origins: [step.topic], mixed: true, modeLabel: 'Read + recall', learnNote: step.note, learnConcept: step.concept,
          learnBack: i > 0 ? goBack : null,
          learnNext: function (correct) { seen++; if (correct) known++; advance(); } });
    }
    // Open written test step: explain the concept; Claude Haiku marks it /5 (needs the user's key).
    function drawWritten(step) {
      var c = step.card;
      var reference = (c.formula ? c.formula + ' — ' : '') + c.back;
      var prompt = 'In your own words, explain: ' + c.front;
      var view = h('<article class="qcard learn-writeq">' +
        '<div class="q-top"><div class="q-eyebrow">Explain what you just read · ' + esc(c.topic) + (c.level ? ' ' + diffTag(c.level) : '') + '</div></div>' +
        '<h2 class="write-prompt"></h2>' +
        '<textarea class="write-ta" rows="5" placeholder="Write your explanation here… then press Mark it."></textarea>' +
        '<div class="write-actions">' + (i > 0 ? '<button class="btn ghost lw-back" type="button">← Back</button>' : '') +
        '<button class="btn write-mark">Mark it →</button><button class="btn ghost lw-skip">Skip →</button><button class="write-key-link" type="button">API key</button></div>' +
        '<div class="write-result" hidden></div></article>');
      view.querySelector('.q-top').appendChild(rateCtl(cid(c.record || c.front)));
      view.querySelector('.write-prompt').textContent = prompt;
      var ta = view.querySelector('.write-ta'), result = view.querySelector('.write-result'), mark = view.querySelector('.write-mark');
      var lwb = view.querySelector('.lw-back');
      if (lwb) lwb.onclick = goBack;
      view.querySelector('.lw-skip').onclick = advance;
      view.querySelector('.write-key-link').onclick = function () { showKeyPanel(result); };
      function runMark() {
        if (!apiKey()) { showKeyPanel(result, 'You need a Claude API key to mark writing.'); return; }
        mark.disabled = true; ta.disabled = true;
        result.hidden = false; result.className = 'write-result';
        result.innerHTML = '<div class="wr-load">Marking your answer with Claude Haiku…</div>';
        gradeWriting(prompt, reference, ta.value, function (res) {
          if (res.error) {
            mark.disabled = false; ta.disabled = false;
            if (res.error === 'nokey') { showKeyPanel(result); return; }
            if (res.error === 'offline') { result.innerHTML = '<div class="wr-err">No connection — marking needs the internet. The rest of DataSense works fully offline.</div>'; return; }
            result.innerHTML = '<div class="wr-err"><span>' + esc(res.error) + '</span> <button class="btn ghost wr-retry">Try again</button></div>';
            result.querySelector('.wr-retry').onclick = runMark;
            return;
          }
          seen++; if (res.score >= 4) known++;
          result.innerHTML = '';
          result.appendChild(markResultEl(c.record || c.front, reference, res,
            advance,
            function () { mark.disabled = false; ta.disabled = false; result.hidden = true; ta.focus(); }));
          var rp = ratePrompt(cid(c.record || c.front));
          if (rp) result.appendChild(rp);
        });
      }
      mark.onclick = runMark;
      view.appendChild(aiExplainConcept(c.front, c.back));
      app.appendChild(view);
      setTimeout(function () { ta.focus(); }, 60);
    }
    function drawCard(c) {
      var flipped = false;
      var view = h('<article class="qcard learn-cardq">' +
        '<div class="q-top"><div class="q-eyebrow">Recall what you just read · ' + esc(c.topic) + (c.level ? ' ' + diffTag(c.level) : '') + '</div></div>' +
        '<div class="flash-stage"><button class="flash-card" aria-label="Flip card">' +
          '<div class="flash-face flash-front"><span class="flash-tag">Can you explain it?</span><div class="flash-term"></div><span class="flash-hint">tap to reveal</span></div>' +
          '<div class="flash-face flash-back"><span class="flash-tag">Answer</span>' + (c.formula ? '<div class="flash-formula"></div>' : '') + '<div class="flash-def"></div></div>' +
        '</button></div>' +
        '<div class="flash-rate" hidden><span class="fr-lab">Did you get it?</span>' +
          '<button class="btn fr-good">✓ Got it</button><button class="btn ghost fr-again">↻ Not yet</button></div>' +
        '<div class="next-row lr-reveal">' + (i > 0 ? '<button class="btn ghost lr-back">← Back</button>' : '') +
        '<button class="btn lr-show">Show the answer →</button><button class="btn ghost lr-skip">Skip →</button></div></article>');
      view.querySelector('.q-top').appendChild(rateCtl(cid(c.record || c.front)));
      var crb = view.querySelector('.lr-back');
      if (crb) crb.onclick = goBack;
      view.querySelector('.flash-term').textContent = c.front;
      view.querySelector('.flash-def').textContent = c.back;
      if (c.formula) view.querySelector('.flash-formula').textContent = c.formula;
      var fc = view.querySelector('.flash-card');
      var rate = view.querySelector('.flash-rate');
      var revealRow = view.querySelector('.lr-reveal');
      var eli = aiExplainConcept(c.front, c.back); eli.hidden = true;
      function reveal() {
        if (flipped) return;
        flipped = true; fc.classList.add('flipped'); revealRow.hidden = true; rate.hidden = false; eli.hidden = false;
        var rp = ratePrompt(cid(c.record || c.front));
        if (rp) view.insertBefore(rp, eli);
      }
      fc.onclick = reveal;
      view.querySelector('.lr-show').onclick = reveal;
      view.querySelector('.lr-skip').onclick = function () { seen++; recordConcept(c.record || c.front, 'seen'); advance(); };
      view.querySelector('.fr-good').onclick = function () { seen++; known++; recordConcept(c.record || c.front, 'right'); advance(); };
      view.querySelector('.fr-again').onclick = function () { seen++; recordConcept(c.record || c.front, 'wrong'); advance(); };
      view.appendChild(eli);
      app.appendChild(view);
    }
    function finish() {
      app.innerHTML = '';
      var card = h('<div class="result-card"><div class="r-eyebrow">Read + recall · complete</div>' +
        '<div class="score-big">' + known + ' <small>/ ' + seen + ' recalled</small></div>' +
        '<p class="r-msg">You read the notes and tested yourself on each — the strongest way to make it stick. It all fed your learning map.</p>' +
        '<div class="next-row" style="justify-content:center"><button class="btn">Go again</button><button class="btn ghost">Contents</button></div></div>');
      card.querySelector('.btn').onclick = function () { startLearn(topicKey); };
      card.querySelector('.btn.ghost').onclick = home;
      app.appendChild(card);
      window.scrollTo(0, 0);
    }
    draw();
  }

  /* ---------------- unified study picker: one control, pick the mode ---------------- */
  function getStudyMode() { var m = localStorage.getItem('ds_study_mode'); return (m === 'written' || m === 'defs' || m === 'type' || m === 'match' || m === 'learn') ? m : 'mc'; }
  function setStudyMode(m) { try { localStorage.setItem('ds_study_mode', m); } catch (e) {} }
  function getStudyTopic() { return localStorage.getItem('ds_study_topic') || ''; }
  function setStudyTopic(k) { try { localStorage.setItem('ds_study_topic', k || ''); } catch (e) {} }
  // Multiple-choice study: N questions from the chosen topic scope (or all), fresh each time.
  function startQuiz(topicKey, n) {
    var pool = newFilterQ(buildIndex().filter(function (e) { return (!topicKey || e.key === topicKey) && diffOk(e.level) && qVoteOk(e.q); }));
    if (!pool.length) return noContent('Questions');
    // No count asked for means "a normal round" — slicing to NaN would empty the pool.
    pool = shuffle(pool).slice(0, Math.min(n || 12, pool.length));
    begin({ name: 'Study', no: '✎', key: '__study__' },
      { qk: '__study__', part: 'Study', name: todayLabel() },
      { qs: pool.map(function (e) { return e.q; }), origins: pool.map(function (e) { return e.topic; }), mixed: true, modeLabel: 'Study', more: true });
  }

  /* ---------------- search / lookup ---------------- */
  var SEARCHIDX = null;
  function searchIdx() {
    if (SEARCHIDX) return SEARCHIDX;
    SEARCHIDX = buildIndex().map(function (e) {
      var wf = widgetFor(e.q), rev = wf && wf.reveal;
      var hay = (e.q.q + ' ' + (e.q.choices ? e.q.choices.join(' ') : '') + ' ' + (e.q.explain || '') + ' ' +
        (e.q.simple || '') + ' ' + ((rev && rev.name) || '') + ' ' + ((rev && rev.text) || '')).toLowerCase();
      return { e: e, hay: hay, name: ((rev && rev.name) || '').toLowerCase(), stem: e.q.q.toLowerCase() };
    });
    return SEARCHIDX;
  }
  function searchHits(term) {
    var toks = term.toLowerCase().split(/\s+/).filter(Boolean);
    if (!toks.length) return [];
    var out = [];
    searchIdx().forEach(function (r) {
      if (!toks.every(function (t) { return r.hay.indexOf(t) >= 0; })) return;
      var score = 0;
      toks.forEach(function (t) {
        if (r.name.indexOf(t) >= 0) score += 6;
        if (r.stem.indexOf(t) >= 0) score += 3;
      });
      if (window.DEFS && window.DEFS[r.e.q.q]) score += 2;
      out.push({ e: r.e, score: score });
    });
    out.sort(function (a, b) { return b.score - a.score; });
    return out.map(function (o) { return o.e; });
  }
  // Reference view for a single concept: the answer, plain English, the lab, and a practice button.
  function showConcept(q, topic, level) {
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back">' + homeWord('← Contents') + '</button><span class="exmeta">Lookup · ' + esc(topic) + '</span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);
    var isDef = !!(window.DEFS && window.DEFS[q.q]);
    var card = h('<article class="qcard concept-card">' +
      '<div class="q-eyebrow">' + (isDef ? 'Definition' : 'Concept') + ' · ' + esc(topic) + (level ? ' ' + diffTag(level) : '') + '</div>' +
      '<h2 class="qtext"></h2>' +
      '<div class="concept-answer"><span class="ca-lab">Answer</span><div class="ca-text"></div>' + (q.simple ? '<p class="ca-simple"></p>' : '') + '</div>' +
      '<div class="explain concept-explain"></div></article>');
    card.querySelector('.qtext').textContent = q.q;
    card.querySelector('.ca-text').textContent = q.choices[0];
    if (q.simple) card.querySelector('.ca-simple').textContent = q.simple;
    card.querySelector('.concept-explain').innerHTML = q.explain || '';
    renderWidget(card, widgetFor(q));
    var row = h('<div class="next-row"><button class="btn cc-practice">Practice this →</button></div>');
    row.querySelector('.cc-practice').onclick = function () {
      begin({ name: 'Lookup', no: '🔎', key: '__look__' }, { qk: '__look__', part: 'Practice', name: '' },
        { qs: [q], origins: [topic], mixed: true, modeLabel: 'Practice', more: true });
    };
    row.appendChild(rateCtl(cardId(q)));
    card.appendChild(row);
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  /* ---------------- open writing: final test, marked /5 by Claude Haiku ---------------- */
  function apiKey() { try { return localStorage.getItem('ds_api_key') || ''; } catch (e) { return ''; } }
  function setApiKey(v) { try { if (v) localStorage.setItem('ds_api_key', v); else localStorage.removeItem('ds_api_key'); } catch (e) {} }
  function writingDeck() {
    return flashDeck().filter(function (c) { return c.back && c.back.length > 20; });
  }
  // Marks a free-text answer against the reference. Calls Claude Haiku directly from the
  // browser (the user supplies their own key; it never leaves this browser except to Anthropic).
  function gradeWriting(concept, reference, answer, cb) {
    var key = apiKey();
    if (!key) { cb({ error: 'nokey' }); return; }
    var sys = "You are a supportive machine-learning tutor marking a beginner's free-text explanation of a named concept. " +
      "The task is only to explain that CONCEPT — nothing more. Grade 0-5 on whether the learner captured the CORE idea of the concept. " +
      "Give 5 for a correct core explanation, 4 if the core is right with a small gap or looser wording; wording need not match the reference. " +
      "The reference answer is just ONE correct version — treat any explanation that conveys the same core idea as fully correct. " +
      "Do NOT lower the score for omitting extra details, examples, algorithm-specific points, or anything the concept's name did not explicitly ask for. " +
      "Only give 0-2 for answers that are blank, off-topic, or actually wrong. When unsure between two scores, give the higher one. " +
      "Keep feedback warm, specific and short: what they got right, and at most one thing to add.";
    var user = "CONCEPT TO EXPLAIN (this is the whole question):\n" + concept +
      "\n\nONE CORRECT REFERENCE (not the only right answer):\n" + reference +
      "\n\nLEARNER'S ANSWER:\n" + (answer && answer.trim() ? answer.trim() : '(blank)') +
      "\n\nMark the learner's answer on whether it explains the concept's core idea. Do not require anything the concept name didn't ask for.";
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
        max_tokens: 400,
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
        if (j.stop_reason === 'refusal') { cb({ error: 'The marker declined to answer that one.' }); return; }
        var txt = '';
        (j.content || []).forEach(function (b) { if (b.type === 'text') txt += b.text; });
        try {
          var out = JSON.parse(txt);
          cb({ score: Math.max(0, Math.min(5, Math.round(+out.score))), feedback: String(out.feedback || '') });
        } catch (e) { cb({ error: 'Could not read the marker response.' }); }
      })
      .catch(function () { cb({ error: 'offline' }); });
  }
  function showKeyPanel(container, note) {
    container.hidden = false;
    container.className = 'write-result';
    container.innerHTML =
      '<div class="wr-key">' +
        '<b>Connect Claude to mark your writing</b>' +
        '<p class="wr-keynote">' + (note ? esc(note) + ' ' : '') +
          'The open-writing test sends your answer to Anthropic’s Claude API to be marked. Paste your own API key (from console.anthropic.com) — it is stored only in this browser and used only for marking.</p>' +
        '<input class="wr-keyin" type="password" placeholder="sk-ant-…" autocomplete="off">' +
        '<div class="wr-keyrow"><button class="btn wr-keysave">Save key</button>' +
          (apiKey() ? '<button class="btn ghost wr-keyclear">Remove key</button>' : '') + '</div>' +
      '</div>';
    var input = container.querySelector('.wr-keyin');
    input.value = apiKey();
    container.querySelector('.wr-keysave').onclick = function () {
      setApiKey(input.value.trim());
      container.innerHTML = '<div class="wr-ok">Key saved. Write your answer, then press “Mark it”.</div>';
    };
    var clr = container.querySelector('.wr-keyclear');
    if (clr) clr.onclick = function () { setApiKey(''); container.innerHTML = '<div class="wr-ok">Key removed.</div>'; };
  }
  function startWriting(topicKey) {
    var deck = favFirst(shuffle(newFilterC(writingDeck().filter(function (c) { return (!topicKey || c.key === topicKey) && diffOk(c.level); }))), function (c) { return cid(c.front); });
    if (!deck.length) return noContent('Writing prompts');
    var i = 0;
    function draw() {
      app.innerHTML = '';
      var bar = h('<div class="exbar"><button class="back">' + homeWord('← Contents') + '</button>' +
        '<div class="ruler"><div style="width:' + (100 * i / deck.length) + '%"></div></div>' +
        '<span class="exmeta">Prompt <b>' + (i + 1) + '</b> of ' + deck.length + '</span></div>');
      bar.querySelector('.back').onclick = home;
      app.appendChild(bar);
      var c = deck[i];
      var reference = (c.formula ? c.formula + ' — ' : '') + c.back;
      var prompt = 'What is ' + c.front + '?';
      var opts = '<option value="">All topics</option>' + TOPICS.filter(topicInMode).map(function (t) {
        return '<option value="' + t.key + '"' + (t.key === topicKey ? ' selected' : '') + '>' + esc(t.name) + '</option>';
      }).join('');
      var view = h('<div class="write-view">' +
        '<select class="write-topic">' + opts + '</select>' +
        '<div class="write-card">' +
          '<div class="q-top"><span class="write-eyebrow">Final test · explain it in your own words · ' + esc(c.topic) + '</span></div>' +
          '<h2 class="write-prompt"></h2>' +
          '<textarea class="write-ta" rows="6" placeholder="Write your explanation here… then press Mark it."></textarea>' +
          '<div class="write-actions">' + (deck.length > 1 ? '<button class="btn ghost write-back" type="button">← Back</button>' : '') +
          '<button class="btn write-mark">Mark it →</button><button class="btn ghost write-skip">Skip →</button><button class="write-key-link" type="button">API key</button></div>' +
          '<div class="write-result" hidden></div>' +
        '</div>' +
        '<button class="flash-shuffle write-newset">↻ New set</button>' +
      '</div>');
      view.querySelector('.q-top').appendChild(rateCtl(cid(c.front)));
      view.querySelector('.write-prompt').textContent = prompt;
      var ta = view.querySelector('.write-ta');
      var result = view.querySelector('.write-result');
      var mark = view.querySelector('.write-mark');
      function nextPrompt() { i = (i + 1) % deck.length; draw(); }
      var wb = view.querySelector('.write-back');
      if (wb) wb.onclick = function () { i = (i - 1 + deck.length) % deck.length; draw(); };
      view.querySelector('.write-skip').onclick = nextPrompt;
      view.querySelector('.write-newset').onclick = function () { deck = shuffle(deck); i = 0; draw(); };
      view.querySelector('.write-topic').onchange = function () { startWriting(this.value); };
      view.querySelector('.write-key-link').onclick = function () { showKeyPanel(result); };
      function runMark() {
        if (!apiKey()) { showKeyPanel(result, 'You need a Claude API key to mark writing.'); return; }
        mark.disabled = true; ta.disabled = true;
        result.hidden = false; result.className = 'write-result';
        result.innerHTML = '<div class="wr-load">Marking your answer with Claude Haiku…</div>';
        gradeWriting(prompt, reference, ta.value, function (res) {
          if (res.error) {
            mark.disabled = false; ta.disabled = false;
            if (res.error === 'nokey') { showKeyPanel(result); return; }
            if (res.error === 'offline') { result.innerHTML = '<div class="wr-err">No connection — marking needs the internet. The rest of DataSense works fully offline.</div>'; return; }
            result.innerHTML = '<div class="wr-err"><span>' + esc(res.error) + '</span> <button class="btn ghost wr-retry">Try again</button></div>';
            result.querySelector('.wr-retry').onclick = runMark;
            return;
          }
          result.innerHTML = '';
          var el = markResultEl(c.front, reference, res,
            nextPrompt,
            function () { mark.disabled = false; ta.disabled = false; result.hidden = true; ta.focus(); });
          el.querySelector('.wr-next').textContent = 'Next prompt →';
          result.appendChild(el);
          var rp = ratePrompt(cid(c.front));
          if (rp) result.appendChild(rp);
        });
      }
      mark.onclick = runMark;
      app.appendChild(view);
      window.scrollTo(0, 0);
    }
    draw();
  }

  /* ---------------- back up / restore progress (all localStorage lives only in this browser) ---------------- */
  function exportProgress() {
    var data = {};
    for (var j = 0; j < localStorage.length; j++) { var k = localStorage.key(j); if (k && k.indexOf('ds_') === 0) data[k] = localStorage.getItem(k); }
    var payload = { app: 'DataSense', version: 1, exported: new Date().toISOString(), data: data };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a'); a.href = url; a.download = 'datasense-progress-' + today() + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }
  function importProgress(file, done) {
    var r = new FileReader();
    r.onload = function () {
      try {
        var obj = JSON.parse(r.result), data = obj && obj.data;
        if (!data || typeof data !== 'object') throw new Error('bad');
        var n = 0;
        Object.keys(data).forEach(function (k) { if (k.indexOf('ds_') === 0) { localStorage.setItem(k, data[k]); n++; } });
        done(n);
      } catch (e) { done(-1); }
    };
    r.onerror = function () { done(-1); };
    r.readAsText(file);
  }

  var PRACTICE_N = 20;
  // SM-2-style scheduling: each box has a target review interval; a card's priority grows with
  // how OVERDUE it is relative to that interval, its lifetime lapse rate, and — most urgently —
  // whether it failed in the last few days. Weak recent failures surface first, solid old cards last.
  var BOX_INTERVAL = [0.5, 1, 3, 7, 14, 30]; // days per box 0..5
  function getPracticeTopic() { return localStorage.getItem('ds_practice_topic') || ''; }
  function setPracticeTopic(k) { try { localStorage.setItem('ds_practice_topic', k || ''); } catch (e) {} }
  function practiceSelect(mix) {
    var c = loadCards(), day = dayNum(), tk = getPracticeTopic();
    var known = [], neu = [];
    buildIndex().forEach(function (e) { if (tk ? e.key !== tk : !keyInMode(e.key)) return; if (qHidden(e.q)) return; var r = c[cardId(e.q)]; if (r && r.seen) known.push({ e: e, r: r }); else neu.push(e); });
    known.forEach(function (k) {
      var r = k.r;
      var overdue = (day - r.last) / BOX_INTERVAL[Math.max(0, Math.min(5, r.box))];  // 1 = exactly due
      var lapse = r.seen ? (r.wrong / r.seen) : 0;                                    // lifetime failure rate
      var sinceFail = (r.lastWrong != null) ? (day - r.lastWrong) : 999;
      var recentFail = sinceFail <= 1 ? 14 : sinceFail <= 3 ? 9 : sinceFail <= 7 ? 4 : 0;
      k.p = Math.min(30, overdue * 10) + lapse * 15 + recentFail + (5 - r.box) * 2 + Math.random() * 2;
    });
    known.sort(function (a, b) { return b.p - a.p; });
    neu = shuffle(neu);
    var N = PRACTICE_N;
    var nc = Math.round(mix * N), kc = N - nc;
    if (kc > known.length) { nc += kc - known.length; kc = known.length; }
    if (nc > neu.length) { kc = Math.min(known.length, kc + (nc - neu.length)); nc = neu.length; }
    var sel = known.slice(0, kc).map(function (k) { return k.e; }).concat(neu.slice(0, nc));
    return shuffle(sel);
  }
  function startPractice() {
    var sel = practiceSelect(getMix());
    if (!sel.length) return;
    begin({ name: 'Smart Review', no: '⚡', key: '__practice__' },
      { qk: '__practice__', part: 'Smart Review', name: '' },
      { qs: sel.map(function (e) { return e.q; }), origins: sel.map(function (e) { return e.topic; }), mixed: true, modeLabel: 'Smart Review', practice: true });
  }

  // A question's visual may be overridden by a better-matched widget (data_widgets_*.js), keyed by stem.
  function widgetFor(q) { return (window.WIDGETS && window.WIDGETS[q.q]) || q.widget; }
  function rememberHTML(q) {
    var r = widgetFor(q) && widgetFor(q).reveal;
    if (!r) return '';
    return '<div class="remember"><span class="r-tag">Remember</span><b>' + r.name + '</b>' +
      (r.formula ? '<span class="r-formula">' + r.formula + '</span>' : '') + '</div>';
  }

  /* ---------------- why the wrong answers are wrong (data_why_*.js, keyed by stem) ---------------- */
  function whyFor(q) {
    var w = window.WHYNOT && window.WHYNOT[q.q];
    return (w && w.length === q.choices.length - 1) ? w : null;
  }
  // Collapsible list: every distractor with its one-line flaw. chosenOrig highlights the learner's pick.
  function whyOthersEl(q, chosenOrig, open) {
    var w = whyFor(q); if (!w) return null;
    var wrap = h('<div class="whywrap"><button class="why-toggle" type="button">Why the other options are wrong <span class="wt-arrow">▸</span></button><div class="why-list" hidden></div></div>');
    var list = wrap.querySelector('.why-list');
    q.choices.slice(1).forEach(function (c, i) {
      var mine = chosenOrig === i + 1;
      var row = h('<div class="why-row' + (mine ? ' why-mine' : '') + '">' +
        (mine ? '<span class="why-yours">your pick</span>' : '') +
        '<div class="why-opt"></div><div class="why-reason"></div></div>');
      row.querySelector('.why-opt').textContent = c;
      row.querySelector('.why-reason').textContent = w[i];
      list.appendChild(row);
    });
    var btn = wrap.querySelector('.why-toggle');
    btn.onclick = function () {
      list.hidden = !list.hidden;
      btn.querySelector('.wt-arrow').textContent = list.hidden ? '▸' : '▾';
    };
    if (open) btn.onclick();
    return wrap;
  }
  // Inline flaw for the specific option the learner just picked (first miss, before the retry).
  function whyPickEl(q, chosenOrig) {
    var w = whyFor(q); if (!w || chosenOrig < 1) return null;
    var el = h('<div class="why-pick"><span class="p-label">Why your pick misses</span><div class="wp-opt"></div><p class="wp-why"></p></div>');
    el.querySelector('.wp-opt').textContent = q.choices[chosenOrig];
    el.querySelector('.wp-why').textContent = w[chosenOrig - 1];
    return el;
  }

  /* ---------------- AI tutor: re-explain any answer simpler or deeper (user's own key) ---------------- */
  function rewriteExplain(q, mode, cb) {
    var key = apiKey();
    if (!key) { cb({ error: 'nokey' }); return; }
    var sys = mode === 'simpler'
      ? "You are a warm machine-learning tutor. Re-explain the idea for a complete beginner: everyday words, one concrete everyday analogy, no jargon unless you define it in-line. 120 words maximum. Output plain text only."
      : "You are a rigorous machine-learning tutor. Go one level deeper on the idea for a curious beginner: add the key nuance, edge case or formula intuition the short explanation leaves out. Stay concrete. 160 words maximum. Output plain text only.";
    var user = "QUESTION:\n" + q.q + "\n\nCORRECT ANSWER:\n" + q.choices[0] + "\n\nCURRENT EXPLANATION:\n" + (q.explain || '').replace(/<[^>]+>/g, '') +
      "\n\n" + (mode === 'simpler' ? "Re-explain this even more simply." : "Explain this more deeply.");
    fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({ model: 'claude-haiku-4-5', max_tokens: 500, system: sys, messages: [{ role: 'user', content: user }] })
    }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, status: r.status, j: j }; }); })
      .then(function (res) {
        if (!res.ok) { cb({ error: (res.j && res.j.error && res.j.error.message) || ('Request failed (HTTP ' + res.status + ')') }); return; }
        var txt = '';
        (res.j.content || []).forEach(function (b) { if (b.type === 'text') txt += b.text; });
        if (!txt.trim()) { cb({ error: 'Empty response.' }); return; }
        cb({ text: txt.trim() });
      })
      .catch(function () { cb({ error: 'You appear to be offline.' }); });
  }
  // ELI5 for a bare concept (flashcards, notes): reuse the same API-backed re-explainer.
  function aiExplainConcept(name, text) { return aiExplainEl({ q: name, choices: [text || name], explain: text || name }); }
  function aiExplainEl(q) {
    var el = h('<div class="eli5"><div class="eli5-btns"><span class="eli5-lab">AI tutor</span>' +
      '<button class="eli5-btn" type="button" data-m="simpler">🧸 Explain like I\'m 5</button>' +
      '<button class="eli5-btn" type="button" data-m="deeper">Go deeper</button></div>' +
      '<div class="eli5-out" hidden></div></div>');
    var out = el.querySelector('.eli5-out');
    el.querySelectorAll('.eli5-btn').forEach(function (b) {
      b.onclick = function () {
        var mode = b.getAttribute('data-m');
        if (!apiKey()) {
          out.hidden = false;
          out.innerHTML = '<span class="eli5-note">Add your Claude API key (Study → Written mode) to unlock the AI tutor.</span>';
          return;
        }
        out.hidden = false;
        out.innerHTML = '<span class="eli5-note">Thinking…</span>';
        el.querySelectorAll('.eli5-btn').forEach(function (x) { x.disabled = true; });
        rewriteExplain(q, mode, function (res) {
          el.querySelectorAll('.eli5-btn').forEach(function (x) { x.disabled = false; });
          if (res.error) { out.innerHTML = '<span class="eli5-note">' + esc(res.error === 'nokey' ? 'No API key saved.' : res.error) + '</span>'; return; }
          out.innerHTML = '<div class="eli5-tag">' + (mode === 'simpler' ? 'Simpler take' : 'Deeper dive') + '</div><p class="eli5-text"></p>';
          out.querySelector('.eli5-text').textContent = res.text;
        });
      };
    });
    return el;
  }

  /* ---------------- theme & text size (accessibility) ---------------- */
  function getTheme() { var t = localStorage.getItem('ds_theme'); return (t === 'light' || t === 'dark') ? t : 'auto'; }
  function setTheme(t) { try { localStorage.setItem('ds_theme', t); } catch (e) {} applyTheme(); }
  function applyTheme() {
    var pref = getTheme();
    var dark = pref === 'dark' || (pref === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }
  function getFont() { var v = +(localStorage.getItem('ds_font')); return (v === 1 || v === 2) ? v : 0; }
  function setFont(v) { try { localStorage.setItem('ds_font', v); } catch (e) {} applyFont(); }
  function applyFont() { document.documentElement.style.fontSize = [100, 110, 122][getFont()] + '%'; }

  /* ---------------- flags (one-off achievements) ---------------- */
  function loadFlags() { try { return JSON.parse(localStorage.getItem('ds_flags') || '{}') || {}; } catch (e) { return {}; } }
  function setFlag(k) { try { var f = loadFlags(); if (!f[k]) { f[k] = 1; localStorage.setItem('ds_flags', JSON.stringify(f)); } } catch (e) {} }
  function checkSessionFlags() {
    if (S.results && S.results.length >= 10 && S.results.every(function (r) { return r === true; })) setFlag('perfect10');
  }

  /* ---------------- badges & milestones ---------------- */
  function computeBadges() {
    var cards = loadCards(), ids = Object.keys(cards);
    var total = getTotal();
    var written = 0, anyReady = 0, mastered = 0;
    ids.forEach(function (id) { var r = cards[id]; if (r.wrote) written++; var w = (r.wstreak != null) ? r.wstreak : (r.wrote ? 1 : 0); if (w >= 1) anyReady++; if (w >= 2) mastered++; });
    var act = loadActivity();
    var d = new Date(); d.setHours(0, 0, 0, 0);
    var cur = 0; if (!act[fmtDay(d)]) d.setDate(d.getDate() - 1);
    while (act[fmtDay(d)]) { cur++; d.setDate(d.getDate() - 1); }
    var byTopic = masteryByTopic();
    var topicsDone = byTopic.filter(function (r) { return r.total > 0 && r.learnt === r.total; }).length;
    var topicsTouched = byTopic.filter(function (r) { return r.total > 0 && (r.total - r.new) > 0; }).length;
    var topicsWithQs = byTopic.filter(function (r) { return r.total > 0; }).length;
    var groupDone = GROUPS.some(function (g) {
      var rs = byTopic.filter(function (r) { return g.keys.indexOf(r.key) >= 0 && r.total > 0; });
      return rs.length && rs.every(function (r) { return r.learnt === r.total; });
    });
    var flags = loadFlags();
    function b(id, icon, name, desc, earned, prog) { return { id: id, icon: icon, name: name, desc: desc, earned: !!earned, prog: prog || '' }; }
    function p(nowV, target) { return Math.min(nowV, target) + '/' + target; }
    return [
      b('first', '✏️', 'First marks', 'Answer your first question correctly', total >= 1, p(total, 1)),
      b('c50', '📈', 'Half century', '50 lifetime correct answers', total >= 50, p(total, 50)),
      b('c250', '🎯', 'Sharpshooter', '250 lifetime correct answers', total >= 250, p(total, 250)),
      b('c1000', '🏆', 'The thousand', '1,000 lifetime correct answers', total >= 1000, p(total, 1000)),
      b('s3', '🔥', 'Warming up', 'Study 3 days in a row', cur >= 3, p(cur, 3)),
      b('s7', '⚡', 'One full week', 'Study 7 days in a row', cur >= 7, p(cur, 7)),
      b('s30', '🌟', 'The habit', 'Study 30 days in a row', cur >= 30, p(cur, 30)),
      b('ready10', '🧠', 'Solid ground', 'Get 10 concepts to "know it" or better', anyReady >= 10, p(anyReady, 10)),
      b('m1', '🎓', 'First mastery', 'Master a concept (answer it correctly twice)', mastered >= 1, p(mastered, 1)),
      b('m25', '📚', 'Scholar', 'Master 25 concepts', mastered >= 25, p(mastered, 25)),
      b('m100', '🧙', 'The professor', 'Master 100 concepts', mastered >= 100, p(mastered, 100)),
      b('w1', '🖋️', 'In your own words', 'Pass your first written test', written >= 1, p(written, 1)),
      b('w25', '📝', 'Essayist', 'Pass 25 written tests', written >= 25, p(written, 25)),
      b('topic1', '🗺️', 'Territory claimed', 'Master every concept in one topic', topicsDone >= 1, p(topicsDone, 1)),
      b('group1', '👑', 'Section complete', 'Master an entire section of the manual', groupDone, groupDone ? '1/1' : '0/1'),
      b('explorer', '🧭', 'Explorer', 'Try every topic at least once', topicsTouched >= topicsWithQs && topicsWithQs > 0, p(topicsTouched, topicsWithQs)),
      b('perfect', '💯', 'Perfect paper', 'Score 100% on a session of 10+ questions', flags.perfect10, flags.perfect10 ? '1/1' : '0/1'),
      b('fav5', '⭐', 'Curator', 'Save 5 favourite questions', favCount() >= 5, p(favCount(), 5))
    ];
  }

  /* ---------------- CSV export (per-question progress, human-readable) ---------------- */
  function exportStatsCSV() {
    var cards = loadCards();
    function cell(s) { s = String(s == null ? '' : s); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
    var rows = [['topic', 'level', 'question', 'status', 'box', 'times_seen', 'times_wrong', 'written', 'is_definition'].join(',')];
    buildIndex().forEach(function (e) {
      var r = cards[cardId(e.q)] || {};
      rows.push([cell(e.topic), e.level, cell(e.q.q), cardStatus(e.q), r.box || 0, r.seen || 0, r.wrong || 0, r.wrote ? 'yes' : 'no', e.def ? 'yes' : 'no'].join(','));
    });
    var blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a'); a.href = url; a.download = 'datasense-stats-' + today() + '.csv';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  /* ---------------- compare pages: side-by-side for commonly confused pairs ---------------- */
  function showCompare(idx) {
    var all = window.COMPARES || [];
    var c = all[idx]; if (!c) return;
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back">' + homeWord('← Contents') + '</button><span class="exmeta">Don’t confuse these · ' + (idx + 1) + ' of ' + all.length + '</span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);
    var card = h('<article class="qcard compare-card">' +
      '<div class="q-eyebrow">Side by side</div>' +
      '<h2 class="cmp-title"></h2><p class="cmp-tagline"></p>' +
      '<div class="cmp-heads"><div class="cmp-head cmp-a"><b></b><p></p></div><div class="cmp-head cmp-b"><b></b><p></p></div></div>' +
      '<div class="cmp-rows"></div>' +
      '<div class="cmp-callout cmp-confusion"><span class="p-label">The mix-up</span><p></p></div>' +
      '<div class="cmp-callout cmp-rule"><span class="p-label">Rule of thumb</span><p></p></div></article>');
    card.querySelector('.cmp-title').textContent = c.title;
    card.querySelector('.cmp-tagline').textContent = c.tagline;
    card.querySelector('.cmp-a b').textContent = c.a.name;
    card.querySelector('.cmp-a p').textContent = c.a.oneLiner;
    card.querySelector('.cmp-b b').textContent = c.b.name;
    card.querySelector('.cmp-b p').textContent = c.b.oneLiner;
    var rowsEl = card.querySelector('.cmp-rows');
    (c.rows || []).forEach(function (r) {
      var row = h('<div class="cmp-row"><div class="cmp-dim"></div><div class="cmp-cells"><div class="cmp-cell cmp-ca"></div><div class="cmp-cell cmp-cb"></div></div></div>');
      row.querySelector('.cmp-dim').textContent = r.dim;
      row.querySelector('.cmp-ca').textContent = r.a;
      row.querySelector('.cmp-cb').textContent = r.b;
      rowsEl.appendChild(row);
    });
    card.querySelector('.cmp-confusion p').textContent = c.confusion;
    card.querySelector('.cmp-rule p').textContent = c.rule;
    var nav = h('<div class="next-row"><button class="btn ghost cmp-prev">← Previous pair</button><button class="btn cmp-next">Next pair →</button></div>');
    nav.querySelector('.cmp-prev').onclick = function () { showCompare((idx - 1 + all.length) % all.length); };
    nav.querySelector('.cmp-next').onclick = function () { showCompare((idx + 1) % all.length); };
    card.appendChild(nav);
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  /* ---------------- study notes: bite-sized revision, read in order ---------------- */
  function notesTopics() { return TOPICS.filter(function (t) { return window.NOTES && window.NOTES[t.key]; }); }
  function showNotes(topicKey) {
    var list = notesTopics();
    if (!list.length) return;
    var idx = 0; list.forEach(function (t, i) { if (t.key === topicKey) idx = i; });
    var t = list[idx], n = window.NOTES[t.key];
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back">' + homeWord('← Contents') + '</button><span class="exmeta">Study notes · ' + (idx + 1) + ' of ' + list.length + '</span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);
    var jump = '<select class="notes-jump">' + list.map(function (x, i) {
      return '<option value="' + x.key + '"' + (i === idx ? ' selected' : '') + '>' + esc((x.no ? x.no + ' · ' : '') + x.name) + '</option>';
    }).join('') + '</select>';
    var card = h('<article class="qcard notes-card-read">' +
      '<div class="q-eyebrow">Revision notes · ' + esc(t.no || '') + '</div>' +
      '<h2 class="notes-h"></h2>' +
      (n.intro ? '<p class="notes-intro"></p>' : '') +
      '<div class="notes-jumprow"><span class="filt-lab">Jump to</span>' + jump + '</div>' +
      '<div class="notes-body"></div></article>');
    card.querySelector('.notes-h').textContent = n.name;
    if (n.intro) card.querySelector('.notes-intro').textContent = n.intro;
    var body = card.querySelector('.notes-body');
    (n.groups || []).forEach(function (g) {
      var gEl = h('<section class="note-group"><h3 class="note-group-h"></h3><div class="note-items"></div></section>');
      gEl.querySelector('.note-group-h').textContent = g.h;
      var itemsEl = gEl.querySelector('.note-items');
      (g.items || []).forEach(function (it) {
        var iEl = h('<div class="note-item"><div class="ni-t"></div><div class="ni-d"></div>' + (it.f ? '<div class="ni-f"></div>' : '') + '</div>');
        iEl.querySelector('.ni-t').textContent = it.t;
        iEl.querySelector('.ni-d').textContent = it.d;
        if (it.f) iEl.querySelector('.ni-f').textContent = it.f;
        itemsEl.appendChild(iEl);
      });
      body.appendChild(gEl);
    });
    var nav = h('<div class="next-row"><button class="btn ghost notes-prev">← ' + esc(list[(idx - 1 + list.length) % list.length].name) + '</button>' +
      '<button class="btn notes-next">' + esc(list[(idx + 1) % list.length].name) + ' →</button></div>');
    nav.querySelector('.notes-prev').onclick = function () { showNotes(list[(idx - 1 + list.length) % list.length].key); };
    nav.querySelector('.notes-next').onclick = function () { showNotes(list[(idx + 1) % list.length].key); };
    card.appendChild(nav);
    card.querySelector('.notes-jump').onchange = function () { showNotes(this.value); };
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  /* ---------------- contents page ---------------- */
  function totalExercises() {
    var n = 0;
    TOPICS.forEach(function (t) { t.levels.forEach(function (L) { n += (QUESTIONS[L.qk] || []).length; }); });
    return n;
  }
  /* ---------------- Coding mode: three levels per task — spot it, build it, write it ---------------- */
  function codeProg() { try { return JSON.parse(localStorage.getItem('ds_code_prog') || '{}'); } catch (e) { return {}; } }
  function setCodeDone(taskKey, level) {
    var p = codeProg(); p[taskKey] = p[taskKey] || {}; p[taskKey][level] = 1;
    try { localStorage.setItem('ds_code_prog', JSON.stringify(p)); } catch (e) {}
  }
  function codeTask(key) { var t = null; (window.CODETASKS || []).forEach(function (x) { if (x.key === key) t = x; }); return t; }
  /* A coding drill can be opened from the Coding section OR from a step inside a course
     unit. When it comes from the course, CODE_CTX remembers the way back so the learner
     is never stranded in another mode, and the step is ticked when they carry on — not
     the moment the screen opens. Cleared by home(). */
  var CODE_CTX = null;
  // Where a task opens by default. Some people want the worked example first; some
  // want to be thrown straight at the keyboard. Both are one tap away either way.
  function getCodeStart() {
    var v = localStorage.getItem('ds_code_start');
    return (v === 'see' || v === 'spot' || v === 'build' || v === 'write') ? v : 'see';
  }
  function setCodeStart(v) { try { localStorage.setItem('ds_code_start', v); } catch (e) {} }
  function startCodeTask(key, level) {
    var at = level || getCodeStart();
    if (at === 'write' || at === 3) return startCodeWrite(key);
    if (at === 'build' || at === 2) return startCodeOrder(key);
    if (at === 'spot' || at === 1) return startCodeMCQ(key);
    return startCodeExample(key);
  }
  function codeBackLabel() { return CODE_CTX ? CODE_CTX.backLabel : (inLib() ? '← Library' : '← Coding'); }
  function codeBackHome() { if (CODE_CTX) return CODE_CTX.back(); return home(); }
  // The "leave this drill" button, worded for wherever the learner came from.
  function codeHomeBtn() { return CODE_CTX ? CODE_CTX.homeLabel : (inLib() ? 'Back to the shelf' : 'Coding home'); }
  // Finish the step this drill belongs to, and move the run it came from on.
  function codeCourseDone() { var ctx = CODE_CTX; CODE_CTX = null; if (ctx) ctx.after(); }
  // Every level screen gets the same "carry on" offer when the drill came from a longer run.
  function codeCourseRow(after) {
    if (!CODE_CTX) return;
    var row = h('<div class="next-row"><button class="btn ghost code-course"></button></div>');
    row.querySelector('.code-course').textContent = CODE_CTX.tickLabel;
    row.querySelector('.code-course').onclick = codeCourseDone;
    after.appendChild(row);
  }
  // A drill or problem opened as one step of a longer run knows how to get back, what the
  // "carry on" buttons should say, and what to do once it is finished.
  function courseFlow(unitKey, i, after) {
    return { unitKey: unitKey, i: i, after: after,
      backLabel: '← Course', homeLabel: 'Back to the unit',
      tickLabel: 'Tick it off and carry on the course →', nextLabel: 'Continue the course →',
      back: function () { renderCourseUnitPage(unitKey); } };
  }
  function codeBar(task, levelLabel) {
    var bar = h('<div class="exbar"><button class="back">' + codeBackLabel() + '</button><span class="exmeta">' + esc(task.title) + ' ' + diffTag(task.lvl || 2) + ' · <b>' + levelLabel + '</b></span></div>');
    bar.querySelector('.back').onclick = codeBackHome;
    bar.appendChild(rateCtl('t' + task.key));
    return bar;
  }
  // Level 0 — See it: the worked example, line by line in plain English.
  function startCodeExample(key) {
    var t = codeTask(key); if (!t) return;
    app.innerHTML = '';
    app.appendChild(codeBar(t, 'See it · worked example'));
    var card = h('<article class="qcard code-card"><div class="q-eyebrow">Worked example</div>' +
      '<h2 class="code-ask"></h2><p class="code-why"></p><div class="code-walk"></div>' +
      '<div class="next-row"><button class="btn code-next">Level 1: spot it →</button><button class="btn ghost code-home">' + codeHomeBtn() + '</button></div></article>');
    card.querySelector('.code-ask').textContent = t.ask;
    card.querySelector('.code-why').textContent = t.why;
    var walkEl = card.querySelector('.code-walk');
    if (t.walk && t.walk.length) {
      t.walk.forEach(function (pair) {
        var row = h('<div class="cw-row"><pre class="cw-line"></pre><p class="cw-note"></p></div>');
        row.querySelector('.cw-line').textContent = pair[0];
        row.querySelector('.cw-note').textContent = pair[1];
        walkEl.appendChild(row);
      });
    } else {
      var sol = h('<div><div class="code-sol"><span class="p-label">The code</span><pre></pre></div><p class="cw-note cw-note-solo"></p></div>');
      sol.querySelector('pre').textContent = t.written.solution;
      sol.querySelector('.cw-note-solo').textContent = t.mcq.explain;
      walkEl.appendChild(sol);
    }
    card.querySelector('.code-next').onclick = function () { startCodeMCQ(t.key); };
    card.querySelector('.code-home').onclick = codeBackHome;
    var jump = h('<div class="next-row code-nav"><button class="btn ghost cn-write">Skip ahead — write it now →</button></div>');
    jump.querySelector('.cn-write').onclick = function () { startCodeWrite(t.key); };
    if (CODE_CTX && CODE_CTX.writeFirst) {
      // Reading the code then typing it is the whole rhythm of the library run, so the
      // spot-it and build-it levels become the optional detour rather than the main road.
      card.querySelector('.code-next').textContent = 'Now write it from memory →';
      card.querySelector('.code-next').onclick = function () { startCodeWrite(t.key); };
      jump.querySelector('.cn-write').textContent = 'Take the easier levels first';
      jump.querySelector('.cn-write').onclick = function () { startCodeMCQ(t.key); };
    }
    card.insertBefore(jump, card.querySelector('.next-row'));
    codeCourseRow(card);
    app.appendChild(card);
    window.scrollTo(0, 0);
  }
  // Level 1 — Spot it: which code is right?
  function startCodeMCQ(key) {
    var t = codeTask(key); if (!t) return;
    app.innerHTML = '';
    app.appendChild(codeBar(t, 'Level 1 · Spot it'));
    var card = h('<article class="qcard code-card"><div class="q-eyebrow">Spot the right code</div>' +
      '<h2 class="code-ask"></h2><p class="code-why"></p><p class="code-q"></p>' +
      '<div class="code-opts"></div><div class="code-after" hidden></div></article>');
    card.querySelector('.code-ask').textContent = t.title;
    card.querySelector('.code-why').textContent = t.why;
    card.querySelector('.code-q').textContent = t.mcq.q;
    var nav = h('<div class="next-row code-nav"><button class="btn ghost cn-back">← See it (worked example)</button>' +
      '<button class="btn ghost cn-skip">Skip to build it →</button>' +
      '<button class="btn ghost cn-write">Write it now →</button></div>');
    nav.querySelector('.cn-back').onclick = function () { startCodeExample(t.key); };
    nav.querySelector('.cn-skip').onclick = function () { startCodeOrder(t.key); };
    nav.querySelector('.cn-write').onclick = function () { startCodeWrite(t.key); };
    card.appendChild(nav);
    var opts = card.querySelector('.code-opts'), after = card.querySelector('.code-after');
    // Each wrong option can carry its own explanation (mcq.whyWrong, in the same order
    // as mcq.wrong). Picking one tells you what THAT answer would actually do.
    var choices = shuffle([{ c: t.mcq.correct, ok: true }].concat(t.mcq.wrong.map(function (w, wi) {
      return { c: w, ok: false, why: (t.mcq.whyWrong || [])[wi] };
    })));
    var answered = false;
    choices.forEach(function (ch, ci) {
      var b = h('<button class="code-opt" type="button"><span class="co-key"></span><pre></pre></button>');
      b.querySelector('.co-key').textContent = LETTERS[ci] || '·';
      b.querySelector('pre').textContent = ch.c;
      b.onclick = function () {
        if (answered) return;
        answered = true;
        logActivity();
        nav.remove();
        opts.querySelectorAll('.code-opt').forEach(function (o) { o.disabled = true; });
        b.classList.add(ch.ok ? 'co-right' : 'co-wrong');
        if (!ch.ok) opts.querySelectorAll('.code-opt').forEach(function (o, i) { if (choices[i].ok) o.classList.add('co-right'); });
        if (ch.ok) setCodeDone(t.key, 1);
        after.hidden = false;
        after.innerHTML = '<div class="banner ' + (ch.ok ? 'good' : 'bad') + '"><span class="b-label">' + (ch.ok ? 'Right ✓' : 'Not this one') + '</span>' +
          esc(ch.ok ? t.mcq.explain : (ch.why || t.mcq.explain)) + '</div>' +
          (ch.ok || !ch.why ? '' : '<div class="banner cw-right-note"><span class="b-label">The right answer</span>' + esc(t.mcq.explain) + '</div>') +
          '<div class="next-row"><button class="btn code-next">' + (ch.ok ? 'Level 2: build it →' : 'Try again') + '</button><button class="btn ghost code-home">' + codeHomeBtn() + '</button></div>';
        var crp = ratePrompt('t' + t.key);
        if (crp) after.insertBefore(crp, after.querySelector('.next-row'));
        after.querySelector('.code-next').onclick = function () { ch.ok ? startCodeOrder(t.key) : startCodeMCQ(t.key); };
        after.querySelector('.code-home').onclick = codeBackHome;
      codeCourseRow(after);
        after.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      };
      opts.appendChild(b);
    });
    app.appendChild(card);
    window.scrollTo(0, 0);
  }
  // Level 2 — Build it: tap the code lines into order; decoy lines must be avoided.
  function startCodeOrder(key) {
    var t = codeTask(key); if (!t) return;
    app.innerHTML = '';
    app.appendChild(codeBar(t, 'Level 2 · Build it'));
    var card = h('<article class="qcard code-card"><div class="q-eyebrow">Build the code</div>' +
      '<h2 class="code-ask"></h2><p class="match-note">Tap the lines in the order they should run — top line first. ' +
      (t.decoys && t.decoys.length ? 'Careful: <b>' + t.decoys.length + ' broken line' + (t.decoys.length === 1 ? '' : 's') + '</b> don\'t belong at all.' : '') + '</p>' +
      '<div class="code-built-wrap"><span class="cb-label">Your program · <b class="cb-count">0</b> of ' + t.lines.length + ' lines</span>' +
      '<pre class="code-built"></pre></div><div class="code-pool"></div><div class="code-after" hidden></div></article>');
    card.querySelector('.code-ask').textContent = t.ask;
    var nav = h('<div class="next-row code-nav"><button class="btn ghost cn-back">← Level 1: spot it</button><button class="btn ghost cn-skip">Skip to write it →</button></div>');
    nav.querySelector('.cn-back').onclick = function () { startCodeMCQ(t.key); };
    nav.querySelector('.cn-skip').onclick = function () { startCodeWrite(t.key); };
    card.appendChild(nav);
    var built = card.querySelector('.code-built'), pool = card.querySelector('.code-pool'), after = card.querySelector('.code-after');
    var cbCount = card.querySelector('.cb-count');
    var expected = 0, wrongTaps = 0, total = t.lines.length;
    var items = t.lines.map(function (s, i) { return { s: s, i: i, decoy: false }; })
      .concat((t.decoys || []).map(function (s) { return { s: s, i: -1, decoy: true }; }));
    shuffle(items).forEach(function (it) {
      var b = h('<button class="code-line" type="button"><span class="cl-no"></span><pre></pre></button>');
      b.querySelector('pre').textContent = it.s;
      b.onclick = function () {
        if (b.classList.contains('cl-done')) return;
        if (!it.decoy && it.i === expected) {
          b.classList.add('cl-done');
          b.querySelector('.cl-no').textContent = expected + 1;
          built.textContent += (built.textContent ? '\n' : '') + it.s;
          expected++;
          cbCount.textContent = expected;
          if (expected === total) {
            logActivity(); setCodeDone(t.key, 2);
            nav.remove();
            after.hidden = false;
            after.innerHTML = '<div class="banner good"><span class="b-label">' + (wrongTaps ? 'Built ✓ (' + wrongTaps + ' wrong tap' + (wrongTaps === 1 ? '' : 's') + ')' : 'Built perfectly ✓') + '</span>That\'s working code, in the right order.</div>' +
              '<div class="next-row"><button class="btn code-next">Level 3: write it →</button><button class="btn ghost code-home">' + codeHomeBtn() + '</button></div>';
            var crp = ratePrompt('t' + t.key);
            if (crp) after.insertBefore(crp, after.querySelector('.next-row'));
            after.querySelector('.code-next').onclick = function () { startCodeWrite(t.key); };
            after.querySelector('.code-home').onclick = codeBackHome;
      codeCourseRow(after);
            after.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        } else {
          wrongTaps++;
          b.classList.add('mi-shake');
          if (it.decoy) { b.classList.add('cl-decoy'); setTimeout(function () { b.classList.remove('cl-decoy'); }, 900); }
          setTimeout(function () { b.classList.remove('mi-shake'); }, 350);
        }
      };
      pool.appendChild(b);
    });
    app.appendChild(card);
    window.scrollTo(0, 0);
  }
  // Level 3 — Write it: type the code; graded kindly on the essential pieces, solution always shown.
  function startCodeWrite(key) {
    var t = codeTask(key); if (!t) return;
    app.innerHTML = '';
    app.appendChild(codeBar(t, 'Level 3 · Write it'));
    var card = h('<article class="qcard code-card"><div class="q-eyebrow">Write the code</div>' +
      '<h2 class="code-ask"></h2><p class="code-why"></p>' +
      '<p class="cw-prompt"></p>' +
      '<textarea class="code-write" rows="8" spellcheck="false" autocapitalize="off" autocomplete="off" placeholder="Type the code here…"></textarea>' +
      '<div class="next-row"><button class="btn code-check">Check my code</button>' +
      '<button class="btn ghost code-hint">Hint</button>' +
      '<button class="btn ghost code-peek">Show solution</button></div>' +
      '<div class="code-after" hidden></div></article>');
    // Arriving here cold — straight from the list or by skipping ahead — you still get
    // the whole question: what the task is, why it matters, and exactly what to type.
    card.querySelector('.code-ask').textContent = t.title;
    card.querySelector('.code-why').textContent = t.why;
    card.querySelector('.cw-prompt').textContent = t.written.prompt;
    var nav = h('<div class="next-row code-nav"><button class="btn ghost cn-see">← See it worked</button>' +
      '<button class="btn ghost cn-back">← Build it</button></div>');
    nav.querySelector('.cn-see').onclick = function () { startCodeExample(t.key); };
    nav.querySelector('.cn-back').onclick = function () { startCodeOrder(t.key); };
    card.appendChild(nav);
    var ta = card.querySelector('.code-write'), after = card.querySelector('.code-after');
    var peeked = false, hints = 0;
    // Comments are stripped before marking, so a required piece pasted into a comment
    // does not count as having written it.
    function norm(s) {
      return String(s).split('\n').map(function (ln) {
        var q = null, out = '';
        for (var i = 0; i < ln.length; i++) {
          var ch = ln[i];
          if (q) { out += ch; if (ch === q && ln[i - 1] !== '\\') q = null; continue; }
          if (ch === '"' || ch === "'") { q = ch; out += ch; continue; }
          if (ch === '#') break;
          out += ch;
        }
        return out;
      }).join('\n').toLowerCase().replace(/["']/g, "'").replace(/\s+/g, '');
    }
    // A hint gives away one missing piece at a time, cheapest first.
    card.querySelector('.code-hint').onclick = function () {
      var got = norm(ta.value);
      var still = t.written.must.filter(function (m) { return got.indexOf(norm(m)) < 0; });
      hints++;
      var line = still.length
        ? 'Next piece to get in: <code>' + esc(still[0]) + '</code>'
        : 'Every required piece is already in there — press <b>Check my code</b>.';
      var box = card.querySelector('.cw-hint');
      if (!box) { box = h('<p class="cw-hint"></p>'); card.insertBefore(box, card.querySelector('.next-row')); }
      box.innerHTML = line;
    };
    function showSolution(html) {
      after.hidden = false;
      after.innerHTML = html + '<div class="code-sol"><span class="p-label">Model solution</span><pre></pre></div>' +
        '<div class="next-row"><button class="btn ghost code-home">' + codeHomeBtn() + '</button></div>';
      after.querySelector('.code-sol pre').textContent = t.written.solution;
      after.querySelector('.code-home').onclick = codeBackHome;
      codeCourseRow(after);
      after.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    card.querySelector('.code-peek').onclick = function () {
      peeked = true;
      showSolution('<div class="banner"><span class="b-label">Solution</span>Read it, then try writing it from memory.</div>');
    };
    card.querySelector('.code-check').onclick = function () {
      var got = norm(ta.value);
      if (!got) { ta.focus(); return; }
      logActivity();
      var missing = t.written.must.filter(function (m) { return got.indexOf(norm(m)) < 0; });
      // Every required piece, ticked or not — far more useful than a single verdict.
      var checklist = '<ul class="cw-check">' + t.written.must.map(function (m) {
        var has = got.indexOf(norm(m)) >= 0;
        return '<li class="' + (has ? 'cw-yes' : 'cw-no') + '"><span>' + (has ? '✓' : '·') + '</span><code>' + esc(m) + '</code></li>';
      }).join('') + '</ul>';
      // Known wrong turns for this task: caught even when all the pieces are present.
      var slips = (t.written.avoid || []).filter(function (a) { return got.indexOf(norm(a[0])) >= 0; });
      var warn = slips.length ? slips.map(function (a) {
        return '<div class="banner bad cw-warn"><span class="b-label">Watch out</span>' + esc(a[1]) + '</div>';
      }).join('') : '';
      if (!missing.length && !slips.length) {
        if (!peeked && !hints) setCodeDone(t.key, 3);
        showSolution('<div class="banner good"><span class="b-label">All the pieces are there ✓</span>' +
          (peeked || hints ? 'Good — now try it cold next time, with no hint.' : 'Every essential part present and correct — compare against the model below.') + '</div>' + checklist);
      } else if (!missing.length) {
        showSolution(warn + checklist);
      } else {
        showSolution('<div class="banner bad"><span class="b-label">' + missing.length + ' piece' + (missing.length === 1 ? '' : 's') + ' still to go</span>' +
          'Keep what you have and add the ones without a tick.</div>' + warn + checklist);
      }
      var crp = ratePrompt('t' + t.key);
      if (crp) after.insertBefore(crp, after.querySelector('.next-row'));
    };
    // A real code cell: Enter indents, Ctrl/Cmd/Shift+Enter checks — you never have to reach for the mouse.
    wireEditor(ta, { onSubmit: function () { card.querySelector('.code-check').click(); } });
    app.appendChild(card);
    window.scrollTo(0, 0);
  }
  /* ---------------- Quickfire — one small ask, one line of code, typed from memory ----------------
     Data lives in data_snip_*.js as window.SNIPPETS entries:
       { id, group:'pandas · look at the data', lvl:1|2|3, ask, setup?, a, alts?[], note }
     The whole point is small bits: "how do I check the head of a data source?" → df.head(). */
  function snipAll() { return window.SNIPPETS || []; }
  function snipProg() { try { return JSON.parse(localStorage.getItem('ds_snip_prog') || '{}'); } catch (e) { return {}; } }
  function saveSnipProg(p) { try { localStorage.setItem('ds_snip_prog', JSON.stringify(p)); } catch (e) {} }
  // A card is "solid" once typed right from cold twice running; "shaky" if the last go was wrong.
  function snipMark(id, ok, peeked) {
    var p = snipProg(), r = p[id] || { n: 0, ok: 0, s: 0 };
    r.n = (r.n || 0) + 1;
    if (ok) { r.ok = (r.ok || 0) + 1; r.s = peeked ? (r.s || 0) : (r.s || 0) + 1; }
    else r.s = 0;
    r.last = ok ? 1 : 0;
    p[id] = r; saveSnipProg(p);
  }
  function snipState(r) {
    if (!r || !r.n) return 'new';
    if (r.s >= 2) return 'solid';
    if (r.last) return 'known';
    return 'shaky';
  }
  // Kind comparison: spacing, quote style, comments and a wrapping print() are all irrelevant.
  function snipNorm(s, keepCase) {
    var t = String(s == null ? '' : s).replace(/\r/g, '').trim();
    // Comments are noise — except on a card whose whole answer IS a comment.
    if (t.charAt(0) !== '#') t = t.replace(/#[^\n]*/g, '');
    t = t.replace(/["']/g, "'");
    t = t.replace(/\s+/g, ' ').trim();
    t = t.replace(/\s*([(),\[\]{}=:.<>+\-*/%!|&@])\s*/g, '$1');
    t = t.replace(/[;\s]+$/, '');
    return keepCase ? t : t.toLowerCase();
  }
  function snipAccepts(t, keepCase) {
    var out = [];
    [t.a].concat(t.alts || []).forEach(function (a) {
      var n = snipNorm(a, keepCase);
      if (!n) return;
      out.push(n);
      if (n.indexOf('print(') === 0 && /\)$/.test(n)) out.push(n.slice(6, -1));
      else out.push('print(' + n + ')');
    });
    return out;
  }
  function editDist(a, b) {
    if (Math.abs(a.length - b.length) > 3) return 99;
    var prev = [], cur = [], i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur[0] = i;
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
      }
      for (j = 0; j <= b.length; j++) prev[j] = cur[j];
    }
    return prev[b.length];
  }
  // 'right' · 'case' (right but capitals off) · 'close' (a typo away) · 'wrong'
  // Python cares about capitals, so a case slip is worth flagging. SQL does not —
  // its keywords are case-insensitive by definition — so those cards never nag.
  function snipCaseFree(t) { return !!t.nocase || /^SQL/.test(t.group || ''); }
  function snipCheck(t, input) {
    var got = snipNorm(input);
    if (!got) return 'empty';
    if (snipAccepts(t).indexOf(got) >= 0) {
      if (snipCaseFree(t)) return 'right';
      return snipAccepts(t, true).indexOf(snipNorm(input, true)) >= 0 ? 'right' : 'case';
    }
    var close = snipAccepts(t).some(function (a) { return editDist(a, got) <= (a.length > 24 ? 2 : 1); });
    return close ? 'close' : 'wrong';
  }
  function snipCats() {
    var order = [], by = {};
    snipAll().forEach(function (s) {
      var cat = (s.group || 'Other').split(' · ')[0];
      if (!by[cat]) { by[cat] = { order: [], by: {} }; order.push(cat); }
      var g = s.group || 'Other';
      if (!by[cat].by[g]) { by[cat].by[g] = []; by[cat].order.push(g); }
      by[cat].by[g].push(s);
    });
    return { order: order, by: by };
  }
  function snipStats(list) {
    var p = snipProg(), out = { solid: 0, known: 0, shaky: 0, "new": 0, total: list.length };
    list.forEach(function (s) { out[snipState(p[s.id])]++; });
    out.pct = list.length ? Math.round(100 * (out.solid + out.known * 0.55) / list.length) : 0;
    return out;
  }
  function getQuickSize() { var n = +(localStorage.getItem('ds_snip_size')); return (n === 8 || n === 12 || n === 20 || n === 40) ? n : 12; }
  function setQuickSize(n) { try { localStorage.setItem('ds_snip_size', n); } catch (e) {} }
  // Round builder: weakest first (shaky → new → known → solid), then a shuffle inside each band.
  function buildQuickRound(list, size, only) {
    var p = snipProg(), bands = { shaky: [], "new": [], known: [], solid: [] };
    list.forEach(function (s) { bands[snipState(p[s.id])].push(s); });
    var pick = [];
    (only ? [only] : ['shaky', 'new', 'known', 'solid']).forEach(function (b) { pick = pick.concat(shuffle(bands[b])); });
    return size ? pick.slice(0, size) : shuffle(pick);
  }
  function quickBar(label, meta, onBack) {
    var bar = h('<div class="exbar"><button class="back">' + homeWord('← Coding') + '</button><span class="exmeta"></span></div>');
    bar.querySelector('.back').onclick = onBack || home;
    if (onBack) bar.querySelector('.back').textContent = backWord();
    bar.querySelector('.exmeta').innerHTML = '<b>Quickfire</b> · ' + esc(label) + (meta ? ' · ' + meta : '');
    return bar;
  }
  function startQuick(list, label, onFinish, onBack, opts) {
    if (!list || !list.length) return home();
    opts = opts || {};
    var i = 0, right = 0, first = 0, missed = [], studied = {};
    step();
    function step() {
      if (i >= list.length) return done();
      // Learn mode: read the card first, then type it — the flashcard rhythm, one card at a time.
      if (opts.learn && !studied[i]) return studyThen(list[i], i);
      var t = list[i], peeked = false, tries = 0, hints = 0, settled = false;
      app.innerHTML = '';
      app.appendChild(quickBar(label, (i + 1) + ' of ' + list.length, onBack));
      var card = h('<article class="qcard code-card qf-card"><div class="q-eyebrow"><span class="qf-group"></span>' + diffTag(t.lvl || 1) + '</div>' +
        '<h2 class="qf-ask"></h2><p class="qf-setup" hidden></p>' +
        '<textarea class="code-write qf-in" rows="2" spellcheck="false" autocapitalize="off" autocorrect="off" autocomplete="off" placeholder="type the code…"></textarea>' +
        '<div class="qf-hint" hidden></div>' +
        '<div class="next-row qf-row"><button class="btn qf-check">Check</button><button class="btn ghost qf-hintb">Hint</button><button class="btn ghost qf-show">Show answer</button></div>' +
        '<div class="code-after qf-after" hidden></div></article>');
      card.querySelector('.qf-group').textContent = t.group || 'Quickfire';
      card.querySelector('.qf-ask').textContent = t.ask;
      if (t.setup) { var su = card.querySelector('.qf-setup'); su.hidden = false; su.textContent = t.setup; }
      var ta = card.querySelector('.qf-in'), after = card.querySelector('.qf-after'), row = card.querySelector('.qf-row');
      var hintEl = card.querySelector('.qf-hint');
      wireEditor(ta, { onSubmit: check });
      card.querySelector('.qf-check').onclick = check;
      card.querySelector('.qf-show').onclick = function () { peeked = true; reveal(false, 'Answer', 'Read it, then type it out once to make it stick.'); };
      card.querySelector('.qf-hintb').onclick = function () {
        hints++;
        hintEl.hidden = false;
        var a = t.a;
        if (hints === 1 && t.hint) hintEl.textContent = '💡 ' + t.hint;
        else if (hints <= 2) hintEl.textContent = '💡 Starts: ' + a.slice(0, Math.max(3, Math.ceil(a.length * 0.25))) + '…  (' + a.length + ' characters)';
        else hintEl.textContent = '💡 ' + a.slice(0, Math.ceil(a.length * 0.6)) + '…';
        peeked = true;
      };
      app.appendChild(card);
      ta.focus();
      window.scrollTo(0, 0);
      function check() {
        if (settled) return;
        var v = snipCheck(t, ta.value);
        if (v === 'empty') { ta.focus(); return; }
        if (v === 'close') {
          tries++;
          ta.classList.add('mi-shake');
          setTimeout(function () { ta.classList.remove('mi-shake'); }, 350);
          hintEl.hidden = false;
          hintEl.textContent = '👀 So close — that\'s a character or two out. Check the spelling and try again.';
          return;
        }
        logActivity();
        if (v === 'right' || v === 'case') {
          if (!peeked && !tries) first++;
          right++;
          snipMark(t.id, true, peeked);
          reveal(true, v === 'case' ? 'Right ✓ (watch the capitals)' : (peeked ? 'Correct ✓' : 'Nailed it ✓'),
            v === 'case' ? 'Python is case-sensitive — the letters matter as much as the words.'
              : (peeked ? 'Right, with a look. It only counts as solid when it comes cold.' : 'That is the line.'));
        } else {
          missed.push(t);
          snipMark(t.id, false, peeked);
          reveal(false, 'Not quite', 'Here is the line — read it; you can retake the ones you miss at the end of the round.');
        }
      }
      function reveal(ok, label, extra) {
        settled = true;
        row.remove();
        ta.disabled = true;
        hintEl.hidden = true;
        after.hidden = false;
        after.innerHTML = '<div class="banner ' + (ok ? 'good' : 'bad') + '"><span class="b-label">' + esc(label) + '</span>' + esc(extra || '') + '</div>' +
          '<div class="code-sol"><span class="p-label">The line</span><pre class="qf-ans"></pre></div>' +
          (t.alts && t.alts.length ? '<p class="qf-alts"><b>Also fine:</b> </p>' : '') +
          (t.note ? '<p class="qf-note"></p>' : '') +
          '<div class="next-row"><button class="btn qf-next"></button><button class="btn ghost qf-home">Coding home</button></div>';
        after.querySelector('.qf-ans').textContent = t.a;
        if (t.alts && t.alts.length) {
          var ap = after.querySelector('.qf-alts');
          t.alts.slice(0, 4).forEach(function (a, k) {
            var c = document.createElement('code'); c.textContent = a;
            if (k) ap.appendChild(document.createTextNode(' · '));
            ap.appendChild(c);
          });
        }
        if (t.note) after.querySelector('.qf-note').textContent = t.note;
        var nb = after.querySelector('.qf-next');
        nb.textContent = (i + 1 >= list.length) ? 'Finish round →' : 'Next →';
        nb.onclick = function () { i++; step(); };
        after.querySelector('.qf-home').onclick = home;
        after.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        nb.focus();
      }
    }
    function studyThen(t, idx) {
      app.innerHTML = '';
      app.appendChild(quickBar(label, 'learn · ' + (idx + 1) + ' of ' + list.length, onBack));
      var card = h('<article class="qcard code-card qf-card qf-learn"><div class="q-eyebrow"><span class="qf-group"></span>' + diffTag(t.lvl || 1) + '</div>' +
        '<h2 class="qf-ask"></h2><p class="qf-setup" hidden></p>' +
        '<div class="code-sol"><span class="p-label">The line</span><pre class="qf-ans"></pre></div>' +
        '<p class="qf-note" hidden></p>' +
        '<div class="next-row"><button class="btn ln-go">Now type it from memory →</button>' +
        '<button class="btn ghost ln-skip">Skip this card</button></div></article>');
      card.querySelector('.qf-group').textContent = t.group || '';
      card.querySelector('.qf-ask').textContent = t.ask;
      if (t.setup) { var su = card.querySelector('.qf-setup'); su.hidden = false; su.textContent = t.setup; }
      card.querySelector('.qf-ans').textContent = t.a;
      if (t.note) { var n = card.querySelector('.qf-note'); n.hidden = false; n.textContent = t.note; }
      card.querySelector('.ln-go').onclick = function () { studied[idx] = 1; step(); };
      card.querySelector('.ln-skip').onclick = function () { studied[idx] = 1; i++; step(); };
      app.appendChild(card);
      window.scrollTo(0, 0);
      card.querySelector('.ln-go').focus();
    }
    function done() {
      app.innerHTML = '';
      app.appendChild(quickBar(label, 'round complete', onBack));
      var pct = Math.round(100 * right / list.length);
      var card = h('<article class="qcard code-card"><div class="q-eyebrow">Round complete</div>' +
        '<h2 class="code-ask">' + right + ' of ' + list.length + ' right<span class="qf-pct"> · ' + pct + '%</span></h2>' +
        '<p class="code-why">' + (opts.learn ? first + ' typed correctly straight after reading it.' : first + ' typed correctly first go, cold.') +
        (missed.length ? ' ' + missed.length + ' to go again.' : ' Clean sweep.') +
        (opts.learn ? ' Come back to these cold later — that is the pass that counts.' : '') + '</p>' +
        '<div class="next-row"><button class="btn qf-again">Another round →</button>' +
        (missed.length ? '<button class="btn ghost qf-redo">Redo the ' + missed.length + ' I missed</button>' : '') +
        '<button class="btn ghost qf-home">' + (inLib() ? 'Back to the shelf' : 'Quickfire home') + '</button></div></article>');
      // opts.pool keeps "another round" inside the set you chose; without one it mixes everything.
      card.querySelector('.qf-again').onclick = function () {
        var pool = opts.pool && opts.pool.length ? opts.pool : snipAll();
        startQuick(buildQuickRound(pool, getQuickSize()), opts.pool ? label : 'mixed', onFinish, onBack, opts);
      };
      if (missed.length) card.querySelector('.qf-redo').onclick = function () { startQuick(shuffle(missed.slice()), label + ' · retry', onFinish, onBack); };
      card.querySelector('.qf-home').onclick = function () { if (!inLib()) setCodeDoor('quick'); home(); };
      if (onFinish) {
        var cont = h('<div class="next-row course-foot"><button class="btn qf-course">Continue the course →</button></div>');
        cont.querySelector('.qf-course').onclick = onFinish;
        card.insertBefore(cont, card.querySelector('.next-row'));
        card.querySelector('.qf-again').textContent = 'One more round first';
        card.querySelector('.qf-again').classList.add('ghost');
      }
      app.appendChild(card);
      window.scrollTo(0, 0);
    }
  }
  function renderCodeQuick() {
    var all = snipAll();
    if (!all.length) { app.appendChild(h('<section class="code-intro"><p class="code-intro-p">No quickfire cards loaded.</p></section>')); return; }
    var st = snipStats(all);
    // Name the categories from the data itself, so a new bank needs no copy edit.
    var cats0 = snipCats().order;
    var catList = cats0.length > 1 ? cats0.slice(0, -1).join(', ') + ' and ' + cats0[cats0.length - 1] : (cats0[0] || '');
    var intro = h('<section class="code-intro"><div class="review-eyebrow">Quickfire recall</div>' +
      '<p class="code-intro-p">One small ask, one line of code, typed from memory — <i>“how do I check the head of a data source?”</i> → <code>df.head()</code>. ' +
      'Spacing and quote style don\'t matter; the words do. ' + all.length + ' cards across ' + esc(catList) + '.</p>' +
      '<div class="code-progwrap"><div class="code-progbar"><span style="width:' + st.pct + '%"></span></div>' +
      '<span class="code-intro-count"><b>' + st.pct + '%</b> recalled</span></div>' +
      '<div class="mast-badges cdash-badges">' +
        '<span class="mb mb-learnt"><b>' + st.solid + '</b> solid</span>' +
        '<span class="mb mb-learning"><b>' + st.known + '</b> getting there</span>' +
        '<span class="mb mb-strug"><b>' + st.shaky + '</b> shaky</span>' +
        '<span class="mb mb-new"><b>' + st["new"] + '</b> not seen</span>' +
      '</div></section>');
    var sizeRow = h('<div class="code-diff-row"><span class="filt-lab">Round length</span></div>');
    [8, 12, 20, 40].forEach(function (n) {
      var b = h('<button class="cdf-chip' + (getQuickSize() === n ? ' cdf-on' : '') + '" type="button"></button>');
      b.textContent = n + ' cards';
      b.onclick = function () { setQuickSize(n); home(); };
      sizeRow.appendChild(b);
    });
    intro.appendChild(sizeRow);
    var startRow = h('<div class="next-row qf-start"><button class="btn qf-mixed">Test me — mixed round →</button>' +
      '<button class="btn ghost qf-learn">Learn: see it, then type it</button>' +
      '<button class="btn ghost qf-study">View a round first</button>' +
      '<button class="btn ghost qf-weak">Weak spots</button><button class="btn ghost qf-fresh">Cards I haven\'t seen</button></div>');
    startRow.querySelector('.qf-study').onclick = function () {
      startQuickStudy(buildQuickRound(all, getQuickSize()), 'mixed');
    };
    startRow.querySelector('.qf-learn').onclick = function () {
      startQuick(buildQuickRound(all, getQuickSize()), 'mixed', null, null, { learn: true });
    };
    startRow.querySelector('.qf-mixed').onclick = function () { startQuick(buildQuickRound(all, getQuickSize()), 'mixed'); };
    startRow.querySelector('.qf-weak').onclick = function () {
      var r = buildQuickRound(all, getQuickSize(), 'shaky');
      if (!r.length) r = buildQuickRound(all, getQuickSize());
      startQuick(r, 'weak spots');
    };
    startRow.querySelector('.qf-fresh').onclick = function () {
      var r = buildQuickRound(all, getQuickSize(), 'new');
      if (!r.length) r = buildQuickRound(all, getQuickSize());
      startQuick(r, 'new cards');
    };
    intro.appendChild(startRow);
    app.appendChild(intro);
    // Search across every card — doubles as the cheat-sheet.
    var searchCard = h('<section class="code-intro qf-searchwrap"><input class="cref-search qf-search" type="search" placeholder="Search the cards… e.g. groupby, fillna, enumerate" autocomplete="off"><div class="qf-results" hidden></div></section>');
    var searchIn = searchCard.querySelector('.qf-search'), results = searchCard.querySelector('.qf-results');
    searchIn.oninput = function () {
      var q = searchIn.value.trim().toLowerCase();
      results.innerHTML = '';
      results.hidden = !q;
      if (!q) return;
      var hits = all.filter(function (s) { return (s.ask + ' ' + s.a + ' ' + (s.note || '') + ' ' + s.group).toLowerCase().indexOf(q) >= 0; });
      results.appendChild(h('<div class="qf-rescount">' + hits.length + ' card' + (hits.length === 1 ? '' : 's') + '</div>'));
      hits.slice(0, 60).forEach(function (s) {
        var r = h('<div class="qf-res"><span class="qf-res-ask"></span><pre class="qf-res-a"></pre></div>');
        r.querySelector('.qf-res-ask').textContent = s.ask;
        r.querySelector('.qf-res-a').textContent = s.a;
        results.appendChild(r);
      });
      if (hits.length) {
        var go = h('<div class="next-row"><button class="btn ghost qf-drill">Test me on these ' + Math.min(hits.length, 40) + ' →</button>' +
          '<button class="btn ghost qf-viewhits">View them</button></div>');
        go.querySelector('.qf-drill').onclick = function () { startQuick(buildQuickRound(hits, 40), '“' + searchIn.value.trim() + '”'); };
        go.querySelector('.qf-viewhits').onclick = function () { startQuickSheet(hits.slice(0, 60), '“' + searchIn.value.trim() + '”'); };
        results.appendChild(go);
      }
    };
    app.appendChild(searchCard);
    // Category → group list, each with its own progress and a start button.
    var cats = snipCats(), p = snipProg();
    cats.order.forEach(function (cat) {
      var catList = [];
      cats.by[cat].order.forEach(function (g) { catList = catList.concat(cats.by[cat].by[g]); });
      var cs = snipStats(catList);
      var head = h('<div class="sec-label sec-sub qf-cat"><span></span><span class="qf-cat-pct">' + cs.pct + '% · ' + catList.length + ' cards</span></div>');
      head.querySelector('span').textContent = cat;
      app.appendChild(head);
      cats.by[cat].order.forEach(function (g) {
        var items = cats.by[cat].by[g], gs = snipStats(items);
        var sub = (g.split(' · ')[1] || g);
        var row = h('<div class="qf-grow qf-grow-split"><button class="qf-grow-main" type="button">' +
          '<span class="qf-grow-t"></span>' +
          '<span class="qf-grow-bar"><span style="width:' + gs.pct + '%"></span></span>' +
          '<span class="qf-grow-n">' + gs.pct + '% · ' + items.length + '</span></button>' +
          '<button class="sv-btn sv-learn" type="button" title="See each answer, then type it">Learn</button>' +
          '<button class="sv-btn" type="button" title="See these cards with their answers">View</button></div>');
        row.querySelector('.qf-grow-t').textContent = sub;
        row.querySelector('.qf-grow-main').onclick = function () { startQuick(buildQuickRound(items, getQuickSize()), sub); };
        row.querySelector('.sv-learn').onclick = function () { startQuick(buildQuickRound(items, getQuickSize()), sub, null, null, { learn: true }); };
        row.querySelectorAll('.sv-btn')[1].onclick = function () { startQuickSheet(items, sub); };
        app.appendChild(row);
      });
    });
  }
  /* ---------------- View mode — see it worked, then test yourself on the same set ----------------
     Every drill in the app has a matching "view": the quickfire cards with their answers
     showing, the quiz snippets with the output and the reason, and a problem walked through
     line by line. Viewing never ticks anything off — it is the help, not the test — and every
     view screen ends with the same offer: now test yourself on exactly this. */
  function studyBar(label, right, onBack) {
    var bar = h('<div class="exbar"><button class="back">← Back</button><span class="exmeta"></span></div>');
    bar.querySelector('.back').onclick = onBack || home;
    if (onBack) bar.querySelector('.back').textContent = backWord();
    bar.querySelector('.exmeta').innerHTML = '<b>View</b> · ' + esc(label) + (right ? ' · ' + right : '');
    return bar;
  }
  // Quickfire, with the answers showing. One card at a time, or the whole set as a list.
  function startQuickStudy(list, label, onFinish, onBack) {
    if (!list || !list.length) return home();
    var i = 0;
    step();
    function step() {
      if (i >= list.length) return done();
      var t = list[i];
      app.innerHTML = '';
      app.appendChild(studyBar(label, (i + 1) + ' of ' + list.length, onBack));
      var card = h('<article class="qcard code-card qf-card"><div class="q-eyebrow"><span class="qf-group"></span>' + diffTag(t.lvl || 1) + '</div>' +
        '<h2 class="qf-ask"></h2><p class="qf-setup" hidden></p>' +
        '<div class="code-sol"><span class="p-label">The line</span><pre class="qf-ans"></pre></div>' +
        '<p class="qf-alts" hidden><b>Also fine:</b> </p><p class="qf-note" hidden></p>' +
        '<div class="next-row"><button class="btn sv-next"></button><button class="btn ghost sv-prev">← Back</button>' +
        '<button class="btn ghost sv-test">Test me on these →</button></div></article>');
      card.querySelector('.qf-group').textContent = t.group || '';
      card.querySelector('.qf-ask').textContent = t.ask;
      if (t.setup) { var su = card.querySelector('.qf-setup'); su.hidden = false; su.textContent = t.setup; }
      card.querySelector('.qf-ans').textContent = t.a;
      if (t.alts && t.alts.length) {
        var ap = card.querySelector('.qf-alts');
        ap.hidden = false;
        t.alts.slice(0, 4).forEach(function (a, k) {
          var c = document.createElement('code'); c.textContent = a;
          if (k) ap.appendChild(document.createTextNode(' · '));
          ap.appendChild(c);
        });
      }
      if (t.note) { var n = card.querySelector('.qf-note'); n.hidden = false; n.textContent = t.note; }
      var nb = card.querySelector('.sv-next');
      nb.textContent = (i + 1 >= list.length) ? 'Finish reading →' : 'Next card →';
      nb.onclick = function () { i++; step(); };
      var pb = card.querySelector('.sv-prev');
      if (!i) pb.remove(); else pb.onclick = function () { i--; step(); };
      card.querySelector('.sv-test').onclick = function () { startQuick(buildQuickRound(list, 0), label, onFinish, onBack); };
      app.appendChild(card);
      window.scrollTo(0, 0);
      nb.focus();
    }
    function done() {
      app.innerHTML = '';
      app.appendChild(studyBar(label, 'read', onBack));
      var card = h('<article class="qcard code-card"><div class="q-eyebrow">Read through</div>' +
        '<h2 class="code-ask">' + list.length + ' card' + (list.length === 1 ? '' : 's') + ' read</h2>' +
        '<p class="code-why">Reading them is the easy half. Now cover them up: type each line from the question alone and the recall is real.</p>' +
        '<div class="next-row"><button class="btn sv-test">Test me on these →</button>' +
        '<button class="btn ghost sv-learn">Learn them one at a time</button>' +
        '<button class="btn ghost sv-again">Read them again</button>' +
        '<button class="btn ghost sv-home">Back</button></div></article>');
      card.querySelector('.sv-test').onclick = function () { startQuick(buildQuickRound(list, 0), label, onFinish, onBack); };
      card.querySelector('.sv-learn').onclick = function () { startQuick(buildQuickRound(list, 0), label, onFinish, onBack, { learn: true }); };
      card.querySelector('.sv-again').onclick = function () { i = 0; step(); };
      card.querySelector('.sv-home').onclick = onFinish || home;
      app.appendChild(card);
      window.scrollTo(0, 0);
    }
  }
  // Quickfire as a printed sheet — every card in the set at once, for scanning.
  function startQuickSheet(list, label) {
    if (!list || !list.length) return home();
    app.innerHTML = '';
    app.appendChild(studyBar(label, list.length + ' cards'));
    var head = h('<section class="code-intro"><div class="review-eyebrow">Cheat sheet</div>' +
      '<p class="code-intro-p">Every card in this set, answers showing. Read it, close it, then test yourself.</p>' +
      '<div class="next-row"><button class="btn sv-test">Test me on these →</button>' +
      '<button class="btn ghost sv-learn">Learn: see it, then type it</button>' +
      '<button class="btn ghost sv-cards">One card at a time</button></div></section>');
    head.querySelector('.sv-test').onclick = function () { startQuick(buildQuickRound(list, 0), label); };
    head.querySelector('.sv-learn').onclick = function () { startQuick(buildQuickRound(list, 0), label, null, null, { learn: true }); };
    head.querySelector('.sv-cards').onclick = function () { startQuickStudy(list, label); };
    app.appendChild(head);
    var lastGroup = null;
    list.forEach(function (t) {
      if (t.group !== lastGroup) {
        lastGroup = t.group;
        app.appendChild(h('<div class="sec-label sec-sub">' + esc(t.group) + '</div>'));
      }
      var row = h('<div class="sv-row"><span class="sv-ask"></span><pre class="sv-a"></pre><p class="sv-note" hidden></p></div>');
      row.querySelector('.sv-ask').textContent = t.ask;
      row.querySelector('.sv-a').textContent = t.a;
      if (t.note) { var n = row.querySelector('.sv-note'); n.hidden = false; n.textContent = t.note; }
      app.appendChild(row);
    });
  }
  // The output quiz, with the answer and the reason already given.
  function startQuizStudy(list, onFinish, onBack) {
    if (!list || !list.length) return home();
    var i = 0;
    step();
    function step() {
      if (i >= list.length) return done();
      var q = list[i];
      app.innerHTML = '';
      app.appendChild(studyBar('what this prints', (i + 1) + ' of ' + list.length, onBack));
      var card = h('<article class="qcard pt-card"><div class="q-eyebrow"><span class="pt-group"></span>' + diffTag(q.lvl || 1) + '</div>' +
        '<h2 class="pt-title"></h2><pre class="pt-quizcode"></pre>' +
        '<div class="code-sol"><span class="p-label">It prints</span><pre class="sv-out"></pre></div>' +
        '<p class="qf-note"></p>' +
        '<div class="next-row"><button class="btn sv-next"></button><button class="btn ghost sv-prev">← Back</button>' +
        '<button class="btn ghost sv-test">Test me on these →</button></div></article>');
      card.querySelector('.pt-group').textContent = q.group;
      card.querySelector('.q-eyebrow').appendChild(rateCtl('pq' + q.id));
      card.querySelector('.pt-title').textContent = q.q || 'What does this code print?';
      card.querySelector('.pt-quizcode').textContent = q.code;
      card.querySelector('.sv-out').textContent = q.correct;
      card.querySelector('.qf-note').textContent = q.explain;
      var nb = card.querySelector('.sv-next');
      nb.textContent = (i + 1 >= list.length) ? 'Finish reading →' : 'Next →';
      nb.onclick = function () { i++; step(); };
      var pb = card.querySelector('.sv-prev');
      if (!i) pb.remove(); else pb.onclick = function () { i--; step(); };
      card.querySelector('.sv-test').onclick = function () { startPyQuiz(shuffle(list.slice()), onFinish, onBack); };
      app.appendChild(card);
      window.scrollTo(0, 0);
      nb.focus();
    }
    function done() {
      app.innerHTML = '';
      app.appendChild(studyBar('what this prints', 'read', onBack));
      var card = h('<article class="qcard pt-card"><div class="q-eyebrow">Read through</div>' +
        '<h2 class="pt-title">' + list.length + ' snippet' + (list.length === 1 ? '' : 's') + ' read</h2>' +
        '<p class="pt-p">Now do them shuffled, with the answers hidden — predicting is the part that sticks.</p>' +
        '<div class="next-row"><button class="btn sv-test">Test me on these →</button><button class="btn ghost sv-home">Back</button></div></article>');
      card.querySelector('.sv-test').onclick = function () { startPyQuiz(shuffle(list.slice()), onFinish, onBack); };
      card.querySelector('.sv-home').onclick = onFinish || home;
      app.appendChild(card);
      window.scrollTo(0, 0);
    }
  }
  // A coding problem, worked: the brief, the model solution, why it is written that way,
  // and what each test is checking — then the same problem to solve yourself.
  function startProblemStudy(id, course) {
    var t = pyTest(id); if (!t) return home();
    app.innerHTML = '';
    var bar = studyBar(t.title, 'worked example');
    if (course) { bar.querySelector('.back').textContent = course.backLabel; bar.querySelector('.back').onclick = function () { course.back(); }; }
    else bar.querySelector('.back').onclick = function () { setTestDoor('practice'); home(); };
    app.appendChild(bar);
    var card = h('<article class="qcard pt-card"><div class="q-eyebrow"><span class="pt-group"></span>' + diffTag(t.lvl || 1) + '</div>' +
      '<h2 class="pt-title"></h2><div class="pt-brief"></div>' +
      '<div class="pt-sig-wrap" hidden><span class="p-label">The function</span><pre class="pt-sig"></pre></div>' +
      '<div class="pt-examples"></div>' +
      '<div class="code-sol"><span class="p-label">One good answer</span><pre class="sv-sol"></pre></div>' +
      '<p class="pt-walk" hidden></p><p class="pt-cx" hidden></p>' +
      '<div class="sv-cases"></div>' +
      '<div class="next-row"><button class="btn sv-try">Now solve it yourself →</button>' +
      '<button class="btn ghost sv-back">Back</button></div></article>');
    card.querySelector('.pt-group').textContent = t.group;
    card.querySelector('.pt-title').textContent = t.title;
    var brief = card.querySelector('.pt-brief');
    (t.brief || '').split('\n\n').forEach(function (para) {
      var p = document.createElement('p'); p.className = 'pt-p'; p.textContent = para; brief.appendChild(p);
    });
    if (t.sig) { card.querySelector('.pt-sig-wrap').hidden = false; card.querySelector('.pt-sig').textContent = t.sig; }
    var exWrap = card.querySelector('.pt-examples');
    (t.examples || []).forEach(function (ex, i) {
      var row = h('<div class="pt-ex"><span class="pt-ex-n">Example ' + (i + 1) + '</span><pre class="pt-ex-in"></pre><pre class="pt-ex-out"></pre></div>');
      row.querySelector('.pt-ex-in').textContent = ex.in;
      row.querySelector('.pt-ex-out').textContent = '→ ' + ex.out;
      exWrap.appendChild(row);
    });
    card.querySelector('.sv-sol').textContent = t.solution;
    if (t.walk) { var w = card.querySelector('.pt-walk'); w.hidden = false; w.textContent = t.walk; }
    if (t.complexity) { var c = card.querySelector('.pt-cx'); c.hidden = false; c.innerHTML = '<b>Complexity:</b> ' + esc(t.complexity); }
    // What the tests are actually checking — including the hidden ones, since this is the view.
    var cases = card.querySelector('.sv-cases');
    if ((t.tests || []).length) {
      cases.appendChild(h('<div class="pt-selfhead">What it is checked against</div>'));
      t.tests.forEach(function (c2) {
        var row = h('<div class="pt-res pt-res-self"><div class="pt-res-body"><pre class="pt-res-call"></pre><pre class="pt-res-exp"></pre></div></div>');
        row.querySelector('.pt-res-call').textContent = (c2.name ? c2.name + ':  ' : '') + c2.call;
        row.querySelector('.pt-res-exp').textContent = '→ ' + c2.expect;
        cases.appendChild(row);
      });
    }
    card.querySelector('.sv-try').onclick = function () { startPyProblem(id, null, course); };
    card.querySelector('.sv-back').onclick = function () {
      if (course) course.back(); else { setTestDoor('practice'); home(); }
    };
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  /* ================= The Course — one chronological path through everything =================
     Structure lives in data_course*.js as window.COURSE.stages:
       stage { key, no, name, blurb, units: [ unit { key, name, blurb, steps: [...] } ] }
     A step is one of:
       { t:'read',    title, body:[ 'paragraph' | ['code', src, note] ] }
       { t:'quick',   title, groups:[…] | ids:[…], size }      — quickfire recall round
       { t:'quiz',    title, ids:[…] | groups:[…], size }      — what-does-this-print round
       { t:'problem', id }                                     — one coding-test problem
       { t:'task',    key }                                    — one four-level coding drill
       { t:'mock',    n, mins, mix, pkg }                       — a timed sitting
     Nothing is locked: you can jump anywhere. But the path is ordered, one Continue
     button always knows what comes next, and units say what they assume you have done. */
  function courseStages() { return (window.COURSE && window.COURSE.stages) || []; }
  function courseUnits() {
    var out = [];
    courseStages().forEach(function (st) { (st.units || []).forEach(function (u) { out.push({ unit: u, stage: st }); }); });
    return out;
  }
  function courseUnit(key) {
    var found = null;
    courseUnits().forEach(function (row) { if (row.unit.key === key) found = row; });
    return found;
  }
  function courseProg() { try { return JSON.parse(localStorage.getItem('ds_course') || '{}'); } catch (e) { return {}; } }
  function saveCourseProg(p) { try { localStorage.setItem('ds_course', JSON.stringify(p)); } catch (e) {} }
  function courseStepId(unit, i) { return unit.key + ':' + i; }
  // Some steps report their own completion from elsewhere in the app, so a step is done
  // if it was ticked here OR if the thing it points at is finished.
  function courseStepDone(unit, i) {
    var step = unit.steps[i];
    if (!step) return false;
    if (courseProg()[courseStepId(unit, i)]) return true;
    if (step.t === 'problem') { var r = ptProg()[step.id]; return !!(r && r.solved); }
    if (step.t === 'task') { var c = codeProg()[step.key]; return !!(c && c[2]); }
    return false;
  }
  function courseTick(unit, i) {
    var p = courseProg();
    p[courseStepId(unit, i)] = 1;
    p._last = unit.key;
    saveCourseProg(p);
  }
  function unitStats(unit) {
    var total = (unit.steps || []).length, done = 0;
    for (var i = 0; i < total; i++) if (courseStepDone(unit, i)) done++;
    return { done: done, total: total, pct: total ? Math.round(100 * done / total) : 0, complete: total > 0 && done === total };
  }
  function stageStats(stage) {
    var done = 0, total = 0;
    (stage.units || []).forEach(function (u) { var s = unitStats(u); done += s.done; total += s.total; });
    return { done: done, total: total, pct: total ? Math.round(100 * done / total) : 0, complete: total > 0 && done === total };
  }
  function courseStats() {
    var done = 0, total = 0;
    courseStages().forEach(function (st) { var s = stageStats(st); done += s.done; total += s.total; });
    return { done: done, total: total, pct: total ? Math.round(100 * done / total) : 0 };
  }
  // The next unfinished step anywhere in the course — what Continue points at.
  function courseNext() {
    var rows = courseUnits();
    for (var r = 0; r < rows.length; r++) {
      var unit = rows[r].unit;
      for (var i = 0; i < (unit.steps || []).length; i++) {
        if (!courseStepDone(unit, i)) return { unit: unit, stage: rows[r].stage, i: i };
      }
    }
    return null;
  }
  function stepLabel(step) {
    if (step.t === 'read') return 'Read';
    if (step.t === 'quick') return 'Recall';
    if (step.t === 'quiz') return 'Predict';
    if (step.t === 'problem') return 'Solve';
    if (step.t === 'task') return 'Build';
    if (step.t === 'mock') return 'Sit the test';
    return 'Step';
  }
  function stepTitle(step) {
    if (step.title) return step.title;
    if (step.t === 'problem') { var t = pyTest(step.id); return t ? t.title : step.id; }
    if (step.t === 'task') { var c = codeTask(step.key); return c ? c.title : step.key; }
    if (step.t === 'mock') return 'Timed sitting · ' + step.n + ' questions, ' + step.mins + ' minutes';
    return step.t;
  }
  // Content selectors — a step names groups or ids, never copies content.
  function snipsForStep(step) {
    var all = snipAll(), picked = [];
    if (step.ids && step.ids.length) {
      var want = {};
      step.ids.forEach(function (id) { want[id] = 1; });
      picked = all.filter(function (s) { return want[s.id]; });
    } else if (step.groups && step.groups.length) {
      var g = {};
      step.groups.forEach(function (x) { g[x] = 1; });
      picked = all.filter(function (s) { return g[s.group]; });
    }
    if (step.lvl) picked = picked.filter(function (s) { return (s.lvl || 1) <= step.lvl; });
    return picked;
  }
  function quizForStep(step) {
    var all = pyQuiz();
    if (step.ids && step.ids.length) {
      var want = {};
      step.ids.forEach(function (id) { want[id] = 1; });
      return all.filter(function (q) { return want[q.id]; });
    }
    if (step.groups && step.groups.length) {
      var g = {};
      step.groups.forEach(function (x) { g[x] = 1; });
      return all.filter(function (q) { return g[q.group]; });
    }
    return [];
  }
  function courseBar(row, extra) {
    var bar = h('<div class="exbar"><button class="back">← Course</button><span class="exmeta"></span></div>');
    bar.querySelector('.back').onclick = function () { renderCourseUnitPage(row.unit.key); };
    bar.querySelector('.exmeta').innerHTML = '<b>' + esc(row.unit.name) + '</b>' + (extra ? ' · ' + extra : '');
    return bar;
  }
  // Run one step, then come back to the unit page with it ticked.
  // Can this step be viewed worked, as well as sat as a test?
  function stepHasView(step) { return step && (step.t === 'quick' || step.t === 'quiz' || step.t === 'problem'); }
  // How the main click on a step behaves. 'test' cold, 'learn' — see the answer, then type it,
  // card by card, the way the data-science flashcards work — or 'view' the whole thing worked.
  function getStepStyle() { var v = localStorage.getItem('ds_step_style'); return (v === 'learn' || v === 'view') ? v : 'test'; }
  function setStepStyle(v) { try { localStorage.setItem('ds_step_style', v); } catch (e) {} }
  function styleWord(style) { return style === 'learn' ? 'Learn' : style === 'view' ? 'View' : 'Test'; }
  function runCourseStep(unitKey, i, view) {
    var row = courseUnit(unitKey);
    if (!row) return home();
    var unit = row.unit, step = (unit.steps || [])[i];
    if (!step) return renderCourseUnitPage(unitKey);
    var after = function () { courseTick(unit, i); renderCourseUnitPage(unitKey, i + 1); };
    if (step.t === 'read') return runReadStep(row, i, step, after);
    if (step.t === 'quick') {
      var cards = snipsForStep(step);
      if (!cards.length) { after(); return; }
      var round = buildQuickRound(cards, step.size || Math.min(cards.length, 14));
      var back = function () { renderCourseUnitPage(unitKey); };
      var style = view ? 'view' : getStepStyle();
      if (style === 'view') return startQuickStudy(round, stepTitle(step), after, back);
      return startQuick(round, stepTitle(step), after, back, { learn: style === 'learn' });
    }
    if (step.t === 'quiz') {
      var qs = quizForStep(step);
      if (!qs.length) { after(); return; }
      var picked = shuffle(qs.slice()).slice(0, step.size || qs.length);
      var qback = function () { renderCourseUnitPage(unitKey); };
      var qstyle = view ? 'view' : getStepStyle();
      if (qstyle === 'view') return startQuizStudy(picked, after, qback);
      return startPyQuiz(picked, after, qback, { learn: qstyle === 'learn' });
    }
    if (step.t === 'problem') {
      var ctx = courseFlow(unitKey, i, after);
      if (view || getStepStyle() !== 'test') return startProblemStudy(step.id, ctx);
      return startPyProblem(step.id, null, ctx);
    }
    if (step.t === 'task') {
      // Ticked when the learner carries on, not the moment the drill opens.
      CODE_CTX = courseFlow(unitKey, i, after);
      return startCodeExample(step.key);
    }
    if (step.t === 'mock') {
      var problems = buildMock(step.n, step.mix || [1, 2, 2], !!step.pkg);
      if (!problems.length) { after(); return; }
      if (!confirm('Start a ' + step.mins + '-minute sitting with ' + problems.length + ' questions?')) return renderCourseUnitPage(unitKey);
      courseTick(unit, i);
      return startMock(problems, step.mins);
    }
    after();
  }
  // A reading step: the teaching bit, with code samples explained line by line.
  function runReadStep(row, i, step, after) {
    app.innerHTML = '';
    app.appendChild(courseBar(row, 'reading ' + (i + 1) + ' of ' + row.unit.steps.length));
    var card = h('<article class="qcard course-read"><div class="q-eyebrow">Read</div><h2 class="cr-title"></h2><div class="cr-body"></div></article>');
    card.querySelector('.cr-title').textContent = step.title || row.unit.name;
    renderReadBody(card.querySelector('.cr-body'), step.body || []);
    var row2 = h('<div class="next-row"><button class="btn cr-next">Got it — next step →</button><button class="btn ghost cr-back">Back to the unit</button></div>');
    row2.querySelector('.cr-next').onclick = after;
    row2.querySelector('.cr-back').onclick = function () { renderCourseUnitPage(row.unit.key); };
    card.appendChild(row2);
    app.appendChild(card);
    window.scrollTo(0, 0);
  }
  // The prose, code samples and asides of a lesson. Shared by the course's reading step
  // and by the library's reading rungs, so the two can never drift apart.
  function renderReadBody(body, parts) {
    (parts || []).forEach(function (part) {
      if (typeof part === 'string') {
        var p = document.createElement('p');
        p.className = 'cr-p';
        p.innerHTML = mdLite(part);
        body.appendChild(p);
      } else if (part && part[0] === 'code') {
        var block = h('<div class="cr-code"><pre></pre><p class="cr-note" hidden></p></div>');
        block.querySelector('pre').textContent = part[1];
        if (part[2]) { var n = block.querySelector('.cr-note'); n.hidden = false; n.innerHTML = mdLite(part[2]); }
        body.appendChild(block);
      } else if (part && part[0] === 'aside') {
        var a = h('<div class="cr-aside"></div>');
        a.innerHTML = mdLite(part[1]);
        body.appendChild(a);
      }
    });
  }
  // Tiny inline markup for lesson text: `code`, **bold**, *italic*. Everything is escaped first.
  function mdLite(s) {
    return esc(String(s || ''))
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/(^|[\s(])\*([^*]+)\*/g, '$1<i>$2</i>');
  }
  /* ---------------- The syllabus — everything, in the order the course meets it ----------------
     Not a drill: a document. Every card, every question and every problem the app can ask you,
     listed under the unit that introduces it, so the whole scope is visible in one scroll. */
  function syllabusRows() {
    var rows = [];
    courseStages().forEach(function (stage) {
      rows.push({ t: 'stage', stage: stage });
      (stage.units || []).forEach(function (unit) {
        var items = [], cards = 0, quiz = 0, probs = 0, drills = 0;
        (unit.steps || []).forEach(function (step) {
          if (step.t === 'read') items.push({ kind: 'read', title: step.title });
          else if (step.t === 'quick') {
            var cs = snipsForStep(step);
            cards += cs.length;
            items.push({ kind: 'quick', title: stepTitle(step), cards: cs });
          } else if (step.t === 'quiz') {
            var qs = quizForStep(step);
            quiz += qs.length;
            items.push({ kind: 'quiz', title: stepTitle(step), quiz: qs });
          } else if (step.t === 'problem') {
            probs++;
            items.push({ kind: 'problem', problem: pyTest(step.id) });
          } else if (step.t === 'task') {
            drills++;
            items.push({ kind: 'task', task: codeTask(step.key) });
          } else if (step.t === 'mock') {
            items.push({ kind: 'mock', title: stepTitle(step) });
          }
        });
        rows.push({ t: 'unit', unit: unit, stage: stage, items: items, cards: cards, quiz: quiz, probs: probs, drills: drills });
      });
    });
    return rows;
  }
  function renderSyllabus() {
    var rows = syllabusRows();
    var totals = { cards: 0, quiz: 0, probs: 0, drills: 0, reads: 0 };
    rows.forEach(function (r) {
      if (r.t !== 'unit') return;
      totals.cards += r.cards; totals.quiz += r.quiz; totals.probs += r.probs; totals.drills += r.drills;
      r.items.forEach(function (it) { if (it.kind === 'read') totals.reads++; });
    });
    var intro = h('<section class="code-intro"><div class="review-eyebrow">The syllabus</div>' +
      '<p class="code-intro-p">Everything the app can ask you, in the order the course meets it. ' +
      'Open a unit to see every card, every question and every problem inside it — this is the whole scope, on one page.</p>' +
      '<div class="mast-badges cdash-badges">' +
        '<span class="mb"><b>' + totals.reads + '</b> lessons</span>' +
        '<span class="mb"><b>' + totals.cards + '</b> cards</span>' +
        '<span class="mb"><b>' + totals.quiz + '</b> predict</span>' +
        '<span class="mb"><b>' + totals.probs + '</b> problems</span>' +
        '<span class="mb"><b>' + totals.drills + '</b> drills</span>' +
      '</div>' +
      '<input class="cref-search syl-search" type="search" placeholder="Search the whole syllabus… e.g. groupby, recursion, ROC" autocomplete="off"></section>');
    app.appendChild(intro);
    var searchIn = intro.querySelector('.syl-search');
    var results = h('<div class="syl-results" hidden></div>');
    app.appendChild(results);
    var body = h('<div class="syl-body"></div>');
    app.appendChild(body);

    rows.forEach(function (r) {
      if (r.t === 'stage') {
        var ss = stageStats(r.stage);
        var head = h('<section class="course-stage"><div class="cs-head"><span class="cs-no"></span><span class="cs-name"></span>' +
          '<span class="cs-pct">' + ss.pct + '%</span></div><p class="cs-blurb"></p></section>');
        head.querySelector('.cs-no').textContent = r.stage.no;
        head.querySelector('.cs-name').textContent = r.stage.name;
        head.querySelector('.cs-blurb').textContent = r.stage.blurb || '';
        body.appendChild(head);
        return;
      }
      var us = unitStats(r.unit);
      var det = h('<details class="syl-unit"><summary><span class="syl-u-name"></span>' +
        '<span class="syl-u-counts">' +
          (r.cards ? '<span>' + r.cards + ' cards</span>' : '') +
          (r.quiz ? '<span>' + r.quiz + ' predict</span>' : '') +
          (r.probs ? '<span>' + r.probs + ' problems</span>' : '') +
          (r.drills ? '<span>' + r.drills + ' drills</span>' : '') +
        '</span><span class="syl-u-pct">' + us.pct + '%</span></summary><div class="syl-inner"></div></details>');
      det.querySelector('.syl-u-name').textContent = r.unit.name;
      var inner = det.querySelector('.syl-inner');
      if (r.unit.blurb) inner.appendChild(h('<p class="syl-blurb">' + esc(r.unit.blurb) + '</p>'));
      r.items.forEach(function (it) {
        if (it.kind === 'read') {
          inner.appendChild(h('<div class="syl-step"><span class="syl-kind">Read</span><span class="syl-t">' + esc(it.title || '') + '</span></div>'));
        } else if (it.kind === 'quick') {
          inner.appendChild(h('<div class="syl-step"><span class="syl-kind">Recall</span><span class="syl-t">' + esc(it.title) + ' · ' + it.cards.length + '</span></div>'));
          it.cards.forEach(function (c) {
            var line = h('<div class="syl-card"><span class="syl-ask"></span><code class="syl-a"></code></div>');
            line.querySelector('.syl-ask').textContent = c.ask;
            line.querySelector('.syl-a').textContent = c.a;
            inner.appendChild(line);
          });
        } else if (it.kind === 'quiz') {
          inner.appendChild(h('<div class="syl-step"><span class="syl-kind">Predict</span><span class="syl-t">' + esc(it.title) + ' · ' + it.quiz.length + '</span></div>'));
          it.quiz.forEach(function (q) {
            var line = h('<div class="syl-card"><span class="syl-ask"></span></div>');
            line.querySelector('.syl-ask').textContent = (q.code || '').split('\n')[0] + ((q.code || '').indexOf('\n') > 0 ? ' …' : '');
            inner.appendChild(line);
          });
        } else if (it.kind === 'problem' && it.problem) {
          var pr = h('<button class="syl-item" type="button"><span class="syl-kind">Solve</span><span class="syl-t"></span>' + diffTag(it.problem.lvl || 1) + '</button>');
          pr.querySelector('.syl-t').textContent = it.problem.title;
          pr.onclick = function () { startProblemStudy(it.problem.id, null); };
          inner.appendChild(pr);
        } else if (it.kind === 'task' && it.task) {
          var tk = h('<button class="syl-item" type="button"><span class="syl-kind">Build</span><span class="syl-t"></span>' + diffTag(it.task.lvl || 2) + '</button>');
          tk.querySelector('.syl-t').textContent = it.task.title;
          tk.onclick = function () { startCodeExample(it.task.key); };
          inner.appendChild(tk);
        } else if (it.kind === 'mock') {
          inner.appendChild(h('<div class="syl-step"><span class="syl-kind">Sit</span><span class="syl-t">' + esc(it.title) + '</span></div>'));
        }
      });
      var go = h('<div class="next-row syl-go"><button class="btn ghost">Open this unit →</button></div>');
      go.querySelector('button').onclick = function () { renderCourseUnitPage(r.unit.key); };
      inner.appendChild(go);
      body.appendChild(det);
    });

    // One search over everything, answering "is X in here, and where?"
    searchIn.oninput = function () {
      var q = searchIn.value.trim().toLowerCase();
      results.innerHTML = '';
      results.hidden = !q;
      body.hidden = !!q;
      if (!q) return;
      var hits = [];
      rows.forEach(function (r) {
        if (r.t !== 'unit') return;
        r.items.forEach(function (it) {
          (it.cards || []).forEach(function (c) {
            if ((c.ask + ' ' + c.a + ' ' + (c.note || '')).toLowerCase().indexOf(q) >= 0) {
              hits.push({ unit: r.unit, stage: r.stage, kind: 'Recall', text: c.ask, code: c.a });
            }
          });
          (it.quiz || []).forEach(function (x) {
            if ((x.code + ' ' + x.explain).toLowerCase().indexOf(q) >= 0) {
              hits.push({ unit: r.unit, stage: r.stage, kind: 'Predict', text: (x.q || 'What does this print?'), code: (x.code || '').split('\n')[0] });
            }
          });
          if (it.problem && (it.problem.title + ' ' + it.problem.brief).toLowerCase().indexOf(q) >= 0) {
            hits.push({ unit: r.unit, stage: r.stage, kind: 'Solve', text: it.problem.title, id: it.problem.id });
          }
          if (it.title && it.title.toLowerCase().indexOf(q) >= 0 && it.kind === 'read') {
            hits.push({ unit: r.unit, stage: r.stage, kind: 'Read', text: it.title });
          }
        });
      });
      results.appendChild(h('<div class="qf-rescount">' + hits.length + ' place' + (hits.length === 1 ? '' : 's') + ' in the syllabus</div>'));
      hits.slice(0, 120).forEach(function (hit) {
        var row = h('<button class="syl-hit" type="button"><span class="syl-hit-where"></span>' +
          '<span class="syl-hit-what"><span class="syl-kind"></span><span class="syl-t"></span></span>' +
          (hit.code ? '<code class="syl-a"></code>' : '') + '</button>');
        row.querySelector('.syl-hit-where').textContent = hit.stage.no + ' · ' + hit.unit.name;
        row.querySelector('.syl-kind').textContent = hit.kind;
        row.querySelector('.syl-t').textContent = hit.text;
        if (hit.code) row.querySelector('.syl-a').textContent = hit.code;
        row.onclick = function () {
          if (hit.id) startProblemStudy(hit.id, null);
          else renderCourseUnitPage(hit.unit.key);
        };
        results.appendChild(row);
      });
    };
  }

  function getCourseDoor() { var v = localStorage.getItem('ds_course_door'); return v === 'syllabus' ? v : 'path'; }
  function setCourseDoor(v) { try { localStorage.setItem('ds_course_door', v); } catch (e) {} }
  function renderCourseHome() {
    var stages = courseStages();
    if (!stages.length) { app.appendChild(h('<section class="code-intro"><p class="code-intro-p">The course has not loaded.</p></section>')); return; }
    var door = getCourseDoor();
    var nav = h('<nav class="home-doors" role="tablist"></nav>');
    [{ v: 'path', t: 'The path', s: 'Take it in order, step by step' },
     { v: 'syllabus', t: 'Syllabus', s: 'Everything, in that order' }].forEach(function (d) {
      var b = h('<button class="door' + (d.v === door ? ' door-on' : '') + '" type="button" role="tab"><span class="door-t"></span><span class="door-s"></span></button>');
      b.querySelector('.door-t').textContent = d.t;
      b.querySelector('.door-s').textContent = d.s;
      b.onclick = function () { setCourseDoor(d.v); home(); };
      nav.appendChild(b);
    });
    app.appendChild(nav);
    if (door === 'syllabus') return renderSyllabus();
    var cs = courseStats(), next = courseNext();
    var intro = h('<section class="code-intro course-hero"><div class="review-eyebrow">The course</div>' +
      '<p class="code-intro-p">One path, in order, from <i>what a variable is</i> to sitting a timed Python test. ' +
      'Each unit reads you into the idea, drills the lines until you can type them cold, then makes you use them. ' +
      'Nothing is locked — but the order is the point.</p>' +
      '<div class="code-progwrap"><div class="code-progbar"><span style="width:' + cs.pct + '%"></span></div>' +
      '<span class="code-intro-count"><b>' + cs.pct + '%</b> · ' + cs.done + ' of ' + cs.total + ' steps</span></div></section>');
    var styleRow = h('<div class="code-diff-row"><span class="filt-lab">How steps run</span></div>');
    [{ v: 'test', t: 'Test me', d: 'straight in, nothing shown' },
     { v: 'learn', t: 'Learn it', d: 'see the answer, then type it — card by card' },
     { v: 'view', t: 'Just show me', d: 'read it worked, no test' }].forEach(function (c) {
      var b = h('<button class="cdf-chip' + (getStepStyle() === c.v ? ' cdf-on' : '') + '" type="button" title="' + esc(c.d) + '"></button>');
      b.textContent = c.t;
      b.onclick = function () { setStepStyle(c.v); home(); };
      styleRow.appendChild(b);
    });
    intro.appendChild(styleRow);
    intro.appendChild(h('<p class="cu-needs">' + esc(getStepStyle() === 'learn'
      ? 'Learn: every card shows you the answer first, then asks you to type it from memory — then the next card.'
      : getStepStyle() === 'view' ? 'Just show me: steps open worked through, and you can start the test from the end of any of them.'
      : 'Test me: steps open as questions with nothing shown. Any step can still be viewed worked with its View button.') + '</p>'));
    if (next) {
      var go = h('<div class="course-continue"><span class="cc-label">Next up</span>' +
        '<span class="cc-where"></span><span class="cc-what"></span>' +
        '<button class="btn cc-go">Continue →</button></div>');
      go.querySelector('.cc-where').textContent = next.stage.no + ' · ' + next.unit.name;
      go.querySelector('.cc-what').textContent = stepLabel(next.unit.steps[next.i]) + ': ' + stepTitle(next.unit.steps[next.i]) +
        (stepHasView(next.unit.steps[next.i]) ? '  ·  ' + styleWord(getStepStyle()) : '');
      go.querySelector('.cc-go').onclick = function () { runCourseStep(next.unit.key, next.i); };
      if (stepHasView(next.unit.steps[next.i])) {
        var vg = h('<button class="btn ghost cc-view">View it worked first</button>');
        vg.onclick = function () { runCourseStep(next.unit.key, next.i, true); };
        go.appendChild(vg);
      }
      intro.appendChild(go);
    } else {
      intro.appendChild(h('<div class="course-continue"><span class="cc-label">Finished</span><span class="cc-what">Every step of the course is done. Go round again — the quickfire cards keep score of what has gone stale.</span></div>'));
    }
    app.appendChild(intro);
    stages.forEach(function (stage) {
      var ss = stageStats(stage);
      var head = h('<section class="course-stage"><div class="cs-head"><span class="cs-no"></span><span class="cs-name"></span>' +
        '<span class="cs-pct">' + ss.pct + '%</span></div><p class="cs-blurb"></p>' +
        '<div class="code-progbar cs-bar"><span style="width:' + ss.pct + '%"></span></div></section>');
      head.querySelector('.cs-no').textContent = stage.no;
      head.querySelector('.cs-name').textContent = stage.name;
      head.querySelector('.cs-blurb').textContent = stage.blurb || '';
      app.appendChild(head);
      (stage.units || []).forEach(function (u, ui) {
        var us = unitStats(u);
        var state = us.complete ? 'done' : (us.done ? 'part' : 'new');
        var isNext = next && next.unit.key === u.key;
        var b = h('<button class="cu-row cu-' + state + (isNext ? ' cu-next' : '') + '" type="button">' +
          '<span class="cu-mark">' + (us.complete ? '✓' : (ui + 1)) + '</span>' +
          '<span class="cu-body"><span class="cu-name"></span><span class="cu-sub"></span></span>' +
          '<span class="cu-count">' + us.done + '/' + us.total + '</span></button>');
        b.querySelector('.cu-name').textContent = u.name;
        b.querySelector('.cu-sub').textContent = u.blurb || '';
        b.onclick = function () { renderCourseUnitPage(u.key); };
        app.appendChild(b);
      });
    });
  }
  function renderCourseUnitPage(unitKey, focus) {
    var row = courseUnit(unitKey);
    if (!row) return home();
    var unit = row.unit, us = unitStats(unit);
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back"></button><span class="exmeta"></span></div>');
    bar.querySelector('.back').textContent = backWord();
    bar.querySelector('.back').onclick = function () { if (!inLib()) setMode('course'); home(); };
    bar.querySelector('.exmeta').innerHTML = esc(row.stage.no + ' · ' + row.stage.name);
    app.appendChild(bar);
    var head = h('<section class="code-intro"><div class="review-eyebrow">Unit ' + esc(unit.key.toUpperCase()) + '</div>' +
      '<h2 class="cu-title"></h2><p class="code-intro-p cu-blurb"></p>' +
      '<div class="code-progwrap"><div class="code-progbar"><span style="width:' + us.pct + '%"></span></div>' +
      '<span class="code-intro-count"><b>' + us.done + '</b> of ' + us.total + ' steps</span></div></section>');
    head.querySelector('.cu-title').textContent = unit.name;
    head.querySelector('.cu-blurb').textContent = unit.blurb || '';
    if (unit.needs) head.appendChild(h('<p class="cu-needs">Assumes: ' + esc(unit.needs) + '</p>'));
    app.appendChild(head);
    var firstOpen = -1;
    (unit.steps || []).forEach(function (step, i) {
      var done = courseStepDone(unit, i);
      if (!done && firstOpen < 0) firstOpen = i;
      var b = h('<div class="cstep cstep-' + (done ? 'done' : 'open') + (stepHasView(step) ? ' cstep-split' : '') + '">' +
        '<button class="cstep-main" type="button"><span class="cstep-mark">' + (done ? '✓' : '') + '</span>' +
        '<span class="cstep-body"><span class="cstep-kind"></span><span class="cstep-title"></span></span></button>' +
        (stepHasView(step) ? '<button class="sv-btn" type="button" title="See it worked before you try it">View</button>' : '') + '</div>');
      b.querySelector('.cstep-kind').textContent = stepLabel(step);
      b.querySelector('.cstep-title').textContent = stepTitle(step);
      b.querySelector('.cstep-main').onclick = function () { runCourseStep(unitKey, i); };
      if (stepHasView(step)) b.querySelector('.sv-btn').onclick = function () { runCourseStep(unitKey, i, true); };
      app.appendChild(b);
    });
    var target = (typeof focus === 'number' && focus < (unit.steps || []).length) ? focus : firstOpen;
    var footer = h('<div class="next-row course-foot"></div>');
    if (target >= 0) {
      var go = h('<button class="btn cu-go"></button>');
      go.textContent = (us.done ? 'Carry on' : 'Start the unit') + ': ' + stepLabel(unit.steps[target]).toLowerCase() + ' →';
      go.onclick = function () { runCourseStep(unitKey, target); };
      footer.appendChild(go);
      if (stepHasView(unit.steps[target])) {
        var vb = h('<button class="btn ghost cu-view">View it worked first</button>');
        vb.onclick = function () { runCourseStep(unitKey, target, true); };
        footer.appendChild(vb);
      }
    } else {
      var nxt = courseNext();
      if (nxt) {
        var nb = h('<button class="btn cu-go">Unit complete — on to ' + esc(nxt.unit.name) + ' →</button>');
        nb.onclick = function () { renderCourseUnitPage(nxt.unit.key); };
        footer.appendChild(nb);
      } else {
        footer.appendChild(h('<span class="cu-alldone">Unit complete ✓</span>'));
      }
    }
    var back = h('<button class="btn ghost"></button>');
    back.textContent = inLib() ? 'Back to the shelf' : 'Course map';
    back.onclick = function () { if (!inLib()) setMode('course'); home(); };
    footer.appendChild(back);
    app.appendChild(footer);
    window.scrollTo(0, 0);
  }

  /* ================= Python coding tests — the mode that emulates a real hiring test =================
     Problems live in data_pytest_*.js as window.PYTESTS:
       { id, group, lvl, title, brief, fn, sig, starter, examples[], tests[], hint, solution, walk,
         unordered?, needs?:['pandas'], mins? }
     Answers are executed for real in the browser by Pyodide (CPython compiled to WebAssembly),
     loaded from a CDN on first use. With no network we fall back to self-check mode, and say so. */

  // Builds to try, in order. If a pinned build has gone from the CDN the next one is
  // tried rather than dropping the whole feature; window.PYODIDE_URL (a folder holding
  // pyodide.js) or window.PYODIDE_VERSION override the list entirely, which is what you
  // want if you ever self-host the runtime next to the app.
  var PYODIDE_VERSIONS = ['0.26.4', '0.25.1', '0.24.1'];
  var PY = { pyodide: null, promise: null, state: 'idle', error: null, packages: {}, indexUrl: null };
  function pyCandidateUrls() {
    if (window.PYODIDE_URL) return [window.PYODIDE_URL];
    var vs = window.PYODIDE_VERSION ? [window.PYODIDE_VERSION].concat(PYODIDE_VERSIONS) : PYODIDE_VERSIONS;
    return vs.map(function (v) { return 'https://cdn.jsdelivr.net/pyodide/v' + v + '/full/'; });
  }
  function loadRuntimeScript(src) {
    return new Promise(function (resolve, reject) {
      if (window.loadPyodide) return resolve();
      var s = document.createElement('script');
      s.src = src + 'pyodide.js'; s.async = true; s.setAttribute('data-py', '1');
      s.onload = function () { window.loadPyodide ? resolve() : reject(new Error('runtime script loaded but empty')); };
      s.onerror = function () { s.parentNode && s.parentNode.removeChild(s); reject(new Error('could not reach the Python runtime')); };
      document.head.appendChild(s);
    });
  }
  // Starts Python once and keeps it. onStatus gets human-readable progress lines.
  function pyStart(onStatus) {
    if (PY.state === 'ready') return Promise.resolve(PY.pyodide);
    if (PY.promise) { if (onStatus) onStatus('Starting Python…'); return PY.promise; }
    PY.state = 'loading';
    var urls = pyCandidateUrls(), attempt = 0;
    function tryNext() {
      if (attempt >= urls.length) throw (PY.error || new Error('could not reach the Python runtime'));
      var url = urls[attempt++];
      if (onStatus) onStatus(attempt === 1 ? 'Fetching Python (first time only — about 10 MB)…' : 'Trying another Python build…');
      return loadRuntimeScript(url)
        .then(function () {
          if (onStatus) onStatus('Booting the interpreter…');
          return window.loadPyodide({ indexURL: url });
        })
        .then(function (p) { PY.indexUrl = url; return p; })
        .catch(function (e) { PY.error = e; return tryNext(); });
    }
    PY.promise = Promise.resolve().then(tryNext)
      .then(function (p) {
        if (onStatus) onStatus('Setting up the test runner…');
        return p.runPythonAsync(window.PYHARNESS || '').then(function () {
          PY.pyodide = p; PY.state = 'ready';
          return p;
        });
      })
      .catch(function (e) {
        PY.state = 'failed'; PY.error = e; PY.promise = null;
        throw e;
      });
    return PY.promise;
  }
  function pyLoadPackages(names, onStatus) {
    if (!names || !names.length) return Promise.resolve();
    var todo = names.filter(function (n) { return !PY.packages[n]; });
    if (!todo.length) return Promise.resolve();
    if (onStatus) onStatus('Loading ' + todo.join(' and ') + ' (this one is a big download)…');
    return PY.pyodide.loadPackage(todo).then(function () {
      todo.forEach(function (n) { PY.packages[n] = 1; });
    });
  }
  // Run candidate code against a problem's cases. Resolves to the harness's report object.
  function pyRunTests(problem, code, cases, onStatus) {
    return pyStart(onStatus)
      .then(function () { return pyLoadPackages(problem.needs, onStatus); })
      .then(function () {
        if (onStatus) onStatus('Running your code…');
        var opts = { unordered: !!problem.unordered, tol: problem.tol || 1e-6, budget: problem.budget || 10, setup: problem.setup || '' };
        var fn = PY.pyodide.globals.get('_ds_run');
        var raw = fn(code, JSON.stringify(cases), JSON.stringify(opts));
        if (fn.destroy) { try { fn.destroy(); } catch (e) {} }
        return JSON.parse(raw);
      });
  }
  function pyTests() { return window.PYTESTS || []; }
  function pyTest(id) { var t = null; pyTests().forEach(function (x) { if (x.id === id) t = x; }); return t; }
  function ptProg() { try { return JSON.parse(localStorage.getItem('ds_pt_prog') || '{}'); } catch (e) { return {}; } }
  function savePtProg(p) { try { localStorage.setItem('ds_pt_prog', JSON.stringify(p)); } catch (e) {} }
  function ptMark(id, patch) {
    var p = ptProg(), r = p[id] || { runs: 0 };
    var wasSolved = !!r.solved;
    Object.keys(patch).forEach(function (k) { r[k] = patch[k]; });
    // Every solve stamps the date and bumps the count, so revision can be spaced out.
    if (patch.solved && !wasSolved) { r.solvedAt = Date.now(); r.solves = (r.solves || 0) + 1; }
    else if (patch.solved && wasSolved && patch.resolve) { r.solvedAt = Date.now(); r.solves = (r.solves || 0) + 1; }
    p[id] = r; savePtProg(p);
  }
  /* ---- Revision: what to come back to, and when ----
     Solve something once and it comes back in a few days; solve it again and the gap
     grows. Nothing here is clever — the point is only that "done" stops meaning
     "done for ever", so a problem you solved in March is offered again in April. */
  var PT_GAPS = [3, 10, 28, 90, 180];       // days before a solved problem is due again
  function ptGapDays(solves) { return PT_GAPS[Math.min((solves || 1) - 1, PT_GAPS.length - 1)]; }
  function ptDaysSince(r) {
    if (!r || !r.solvedAt) return null;
    return Math.floor((Date.now() - r.solvedAt) / 86400000);
  }
  function ptIsDue(r) {
    var days = ptDaysSince(r);
    if (days === null) return false;
    return days >= ptGapDays(r.solves);
  }
  // The five pools you can draw a random problem from.
  function ptPool(kind) {
    var p = ptProg();
    return pyTests().filter(function (t) {
      var r = p[t.id] || {};
      if (isDisId('pt' + t.id)) return false;             // hidden problems sit every round out
      if (kind === 'unsolved') return !r.solved;
      if (kind === 'solved') return !!r.solved;
      if (kind === 'fav') return isFavId('pt' + t.id);
      if (kind === 'due') return !!r.solved && ptIsDue(r);
      return true;                                        // 'all'
    });
  }
  function ptPoolLabel(kind) {
    return { all: 'anything', unsolved: 'not solved yet', solved: 'already solved',
      fav: 'your favourites', due: 'due for revision' }[kind] || 'anything';
  }
  function getPtPool() {
    var v = localStorage.getItem('ds_pt_pool');
    return (v === 'unsolved' || v === 'solved' || v === 'fav' || v === 'due') ? v : 'all';
  }
  function setPtPool(v) { try { localStorage.setItem('ds_pt_pool', v); } catch (e) {} }
  // Set while a random run is going, so "another one" keeps drawing from the same pool.
  var PT_RANDOM = null;
  function startRandomProblem(kind, avoidId) {
    var pool = ptPool(kind).filter(function (t) { return t.id !== avoidId; });
    if (!pool.length) pool = ptPool(kind);
    if (!pool.length) return renderTestReviseEmpty(kind);
    PT_RANDOM = kind;
    var pick = pool[Math.floor(Math.random() * pool.length)];
    startPyProblem(pick.id, null);
  }
  // Forget one problem, or all of them — "start fresh and try again in a few weeks".
  function ptForget(id) {
    var p = ptProg();
    if (p[id]) { delete p[id].solved; delete p[id].solvedAt; delete p[id].solves; savePtProg(p); }
  }
  function ptForgetAll() {
    var p = ptProg();
    Object.keys(p).forEach(function (id) { delete p[id].solved; delete p[id].solvedAt; delete p[id].solves; });
    savePtProg(p);
  }
  function ptCode(id) { try { return localStorage.getItem('ds_pt_code_' + id) || ''; } catch (e) { return ''; } }
  function savePtCode(id, code) { try { localStorage.setItem('ds_pt_code_' + id, code); } catch (e) {} }
  function ptMocks() { try { return JSON.parse(localStorage.getItem('ds_pt_mocks') || '[]'); } catch (e) { return []; } }
  function savePtMocks(m) { try { localStorage.setItem('ds_pt_mocks', JSON.stringify(m.slice(-40))); } catch (e) {} }
  function ptGroups(list) {
    var order = [], by = {};
    (list || pyTests()).forEach(function (t) { if (!by[t.group]) { by[t.group] = []; order.push(t.group); } by[t.group].push(t); });
    return { order: order, by: by };
  }
  function ptSolvedCount() {
    var p = ptProg(), n = 0;
    pyTests().forEach(function (t) { if (p[t.id] && p[t.id].solved) n++; });
    return n;
  }
  function fmtClock(secs) {
    secs = Math.max(0, Math.round(secs));
    var m = Math.floor(secs / 60), s = secs % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }
  // Lightweight Python token colouring for the code-cell overlay below.
  function highlightPy(src) {
    var re = /(#[^\n]*)|('''[\s\S]*?'''|"""[\s\S]*?"""|'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*')|(\b\d+\.?\d*(?:[eE][+-]?\d+)?\b)|(\b(?:def|return|if|elif|else|for|while|in|not|and|or|is|import|from|as|class|try|except|finally|raise|with|lambda|pass|break|continue|yield|None|True|False|self|global|nonlocal|assert|del|async|await)\b)|(\b[A-Za-z_]\w*\b)(?=\s*\()|(\b[A-Za-z_]\w*\b)/g;
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
    out += esc(src.slice(last));
    return out;
  }
  // Wraps a textarea with a highlighted overlay so it reads like a real Python cell,
  // without touching how the textarea itself is typed into or read.
  function mountHighlight(ta) {
    if (ta.dataset.pyCell) return;
    ta.dataset.pyCell = '1';
    var wrap = document.createElement('div');
    wrap.className = 'py-cell';
    ta.parentNode.insertBefore(wrap, ta);
    // The overlay lines up with ta's own box exactly, so move ta's outer margin onto
    // the wrapper and flush ta to the wrap's edge instead of leaving it in both places.
    var cs = getComputedStyle(ta);
    wrap.style.margin = cs.marginTop + ' ' + cs.marginRight + ' ' + cs.marginBottom + ' ' + cs.marginLeft;
    ta.style.margin = '0';
    var pre = document.createElement('pre');
    pre.className = ta.className + ' py-cell-hl';
    pre.setAttribute('aria-hidden', 'true');
    var code = document.createElement('code');
    pre.appendChild(code);
    wrap.appendChild(pre);
    wrap.appendChild(ta);
    ta.classList.add('py-cell-ta');
    function render() { code.innerHTML = highlightPy(ta.value) + '\n'; }
    function syncScroll() { pre.scrollTop = ta.scrollTop; pre.scrollLeft = ta.scrollLeft; }
    // Setting .value in JS (Reset to starter, Show solution, etc.) doesn't fire an
    // 'input' event, so re-render on every set too — not just on real typing.
    var proto = Object.getPrototypeOf(ta);
    var desc = Object.getOwnPropertyDescriptor(proto, 'value');
    if (desc && desc.configurable) {
      Object.defineProperty(ta, 'value', {
        get: function () { return desc.get.call(ta); },
        set: function (v) { desc.set.call(ta, v); render(); },
        configurable: true
      });
    }
    ta.addEventListener('input', render);
    ta.addEventListener('scroll', syncScroll);
    render();
  }
  // A textarea that behaves enough like a real Python cell: Tab indents, Enter keeps
  // the indent (and opens a new block after a closing colon) instead of submitting,
  // and Ctrl/Cmd/Shift+Enter runs it — like Jupyter, not a one-line answer box.
  function wireEditor(ta, opts) {
    opts = opts || {};
    ta.setAttribute('spellcheck', 'false');
    ta.setAttribute('autocapitalize', 'off');
    ta.setAttribute('autocomplete', 'off');
    ta.setAttribute('autocorrect', 'off');
    mountHighlight(ta);
    ta.onkeydown = function (e) {
      var v = ta.value, s = ta.selectionStart, en = ta.selectionEnd;
      if (e.key === 'Tab') {
        e.preventDefault();
        if (s !== en) {   // indent every selected line
          var a = v.lastIndexOf('\n', s - 1) + 1;
          var block = v.slice(a, en).split('\n').map(function (l) { return e.shiftKey ? l.replace(/^ {1,4}/, '') : '    ' + l; }).join('\n');
          ta.value = v.slice(0, a) + block + v.slice(en);
          ta.selectionStart = a; ta.selectionEnd = a + block.length;
        } else {
          ta.value = v.slice(0, s) + '    ' + v.slice(en);
          ta.selectionStart = ta.selectionEnd = s + 4;
        }
        ta.oninput && ta.oninput();
      } else if (e.key === 'Enter') {
        if (opts.onSubmit && (e.metaKey || e.ctrlKey || e.shiftKey)) {
          e.preventDefault(); opts.onSubmit(e); return;
        }
        var lineStart = v.lastIndexOf('\n', s - 1) + 1;
        var line = v.slice(lineStart, s);
        var indent = (line.match(/^\s*/) || [''])[0];
        if (/:\s*$/.test(line)) indent += '    ';
        if (indent) {
          e.preventDefault();
          ta.value = v.slice(0, s) + '\n' + indent + v.slice(en);
          ta.selectionStart = ta.selectionEnd = s + 1 + indent.length;
          ta.oninput && ta.oninput();
        }
      }
    };
  }
  function ptBar(label, right) {
    var bar = h('<div class="exbar"><button class="back"></button><span class="exmeta"></span></div>');
    bar.querySelector('.back').textContent = inLib() ? '← Library' : '← Tests';
    bar.querySelector('.back').onclick = home;
    bar.querySelector('.exmeta').innerHTML = label;
    if (right) bar.appendChild(right);
    return bar;
  }
  // The problem screen. ctx is null in practice, or the live mock-test session.
  function startPyProblem(id, ctx, course) {
    var t = pyTest(id); if (!t) return home();
    var mock = !!ctx;
    app.innerHTML = '';
    var bar = ptBar('<b>' + esc(t.title) + '</b> ' + diffTag(t.lvl || 1) + (mock ? ' · question ' + (ctx.idx + 1) + ' of ' + ctx.ids.length : ' · practice'),
      mock ? ctx.clockEl : null);
    if (mock) bar.querySelector('.back').textContent = '← Test menu';
    if (mock) bar.querySelector('.back').onclick = function () { if (confirm('Leave the test? Your answers are saved and you can resume.')) home(); };
    if (course) {
      bar.querySelector('.back').textContent = course.backLabel;
      bar.querySelector('.back').onclick = function () { course.back(); };
    }
    if (!mock) bar.appendChild(rateCtl('pt' + t.id));   // star it now, meet it again later
    app.appendChild(bar);

    var card = h('<article class="qcard pt-card">' +
      '<div class="q-eyebrow"><span class="pt-group"></span></div>' +
      '<h2 class="pt-title"></h2>' +
      '<div class="pt-brief"></div>' +
      '<div class="pt-sig-wrap" hidden><span class="p-label">Write this function</span><pre class="pt-sig"></pre></div>' +
      '<div class="pt-examples"></div>' +
      '<div class="pt-editor-wrap"><span class="p-label">Your solution</span>' +
      '<textarea class="pt-editor" rows="16"></textarea>' +
      '<div class="pt-editor-foot"><span class="pt-saved">saved as you type</span><button class="pt-reset" type="button">Reset to the starter code</button></div></div>' +
      '<div class="next-row pt-actions"></div>' +
      '<div class="pt-status" hidden></div>' +
      '<div class="pt-results" hidden></div>' +
      '<div class="pt-after" hidden></div></article>');
    card.querySelector('.pt-group').textContent = t.group;
    if (t.needs && t.needs.length) {
      var need = h('<span class="pt-needs"></span>');
      need.textContent = 'needs ' + t.needs.join(' + ');
      card.querySelector('.q-eyebrow').appendChild(need);
    }
    card.querySelector('.pt-title').textContent = t.title;
    var brief = card.querySelector('.pt-brief');
    (t.brief || '').split('\n\n').forEach(function (para) {
      var p = document.createElement('p'); p.className = 'pt-p'; p.textContent = para; brief.appendChild(p);
    });
    if (t.sig) {
      card.querySelector('.pt-sig-wrap').hidden = false;
      card.querySelector('.pt-sig').textContent = t.sig;
    }
    var exWrap = card.querySelector('.pt-examples');
    (t.examples || []).forEach(function (ex, i) {
      var row = h('<div class="pt-ex"><span class="pt-ex-n">Example ' + (i + 1) + '</span>' +
        '<pre class="pt-ex-in"></pre><pre class="pt-ex-out"></pre><p class="pt-ex-note" hidden></p></div>');
      row.querySelector('.pt-ex-in').textContent = ex.in;
      row.querySelector('.pt-ex-out').textContent = '→ ' + ex.out;
      if (ex.note) { var n = row.querySelector('.pt-ex-note'); n.hidden = false; n.textContent = ex.note; }
      exWrap.appendChild(row);
    });
    if (t.constraints) exWrap.appendChild(h('<p class="pt-constraints"><b>Constraints:</b> ' + esc(t.constraints) + '</p>'));

    var ta = card.querySelector('.pt-editor');
    var saved = mock ? (ctx.code[t.id] || '') : ptCode(t.id);
    ta.value = saved || t.starter;
    wireEditor(ta);
    ta.oninput = function () {
      if (mock) { ctx.code[t.id] = ta.value; ctx.save(); }
      else savePtCode(t.id, ta.value);
    };
    card.querySelector('.pt-reset').onclick = function () {
      if (!confirm('Replace your code with the starter stub?')) return;
      ta.value = t.starter; ta.oninput();
    };

    var actions = card.querySelector('.pt-actions');
    var statusEl = card.querySelector('.pt-status');
    var resultsEl = card.querySelector('.pt-results');
    var afterEl = card.querySelector('.pt-after');
    var runBtn = h('<button class="btn pt-run">Run tests ▶</button>');
    actions.appendChild(runBtn);
    // Ctrl/Cmd/Shift+Enter runs the tests, like running a real Python cell.
    ta.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey || e.shiftKey)) {
        e.preventDefault(); e.stopImmediatePropagation(); runBtn.click();
      }
    }, true);
    if (!mock) {
      var hintBtn = h('<button class="btn ghost pt-hint">Hint</button>');
      var solBtn = h('<button class="btn ghost pt-sol">Model solution</button>');
      actions.appendChild(hintBtn); actions.appendChild(solBtn);
      hintBtn.onclick = function () {
        statusEl.hidden = false;
        statusEl.className = 'pt-status pt-hint-box';
        statusEl.textContent = '💡 ' + (t.hint || 'Work through your own example by hand first, then write down the steps you did.');
      };
      solBtn.onclick = function () {
        ptMark(t.id, { peeked: 1 });
        showSolution('You looked at the solution — read it, then close it and write it out yourself.');
      };
      if (course) {
        var skip = h('<button class="btn ghost pt-skip">Move on for now</button>');
        skip.onclick = function () { course.after(); };
        actions.appendChild(skip);
      }
    } else {
      var navRow = h('<div class="pt-nav"></div>');
      ctx.ids.forEach(function (qid, i) {
        var b = h('<button class="pt-navb' + (i === ctx.idx ? ' pt-navb-on' : '') + (ctx.code[qid] && ctx.code[qid] !== pyTest(qid).starter ? ' pt-navb-done' : '') + '" type="button">Q' + (i + 1) + '</button>');
        b.onclick = function () { ctx.idx = i; ctx.save(); startPyProblem(qid, ctx); };
        navRow.appendChild(b);
      });
      var subBtn = h('<button class="btn ghost pt-submit">Finish & submit test</button>');
      subBtn.onclick = function () {
        if (confirm('Submit the whole test now? Every answer will be marked.')) ctx.submit();
      };
      navRow.appendChild(subBtn);
      actions.appendChild(navRow);
    }

    function showSolution(lead) {
      afterEl.hidden = false;
      afterEl.innerHTML = '<div class="banner"><span class="b-label">Model solution</span>' + esc(lead || '') + '</div>' +
        '<div class="code-sol"><span class="p-label">One good answer</span><pre class="pt-solcode"></pre></div>' +
        (t.walk ? '<p class="pt-walk"></p>' : '') +
        (t.complexity ? '<p class="pt-cx"><b>Complexity:</b> ' + esc(t.complexity) + '</p>' : '');
      afterEl.querySelector('.pt-solcode').textContent = t.solution;
      if (t.walk) afterEl.querySelector('.pt-walk').textContent = t.walk;
      afterEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function setStatus(msg, cls) {
      statusEl.hidden = false;
      statusEl.className = 'pt-status' + (cls ? ' ' + cls : '');
      statusEl.textContent = msg;
    }
    // Self-check mode: no Python available, so show what the tests expect and let them mark it.
    function offerSelfCheck(err) {
      setStatus('Python could not start in this browser (' + (err && err.message ? err.message : 'no connection') +
        '). Everything else still works — check your answer against the expected results below.', 'pt-status-warn');
      resultsEl.hidden = false;
      resultsEl.innerHTML = '<div class="pt-selfhead">What the tests expect</div>';
      (t.tests || []).forEach(function (c) {
        var row = h('<div class="pt-res pt-res-self"><pre class="pt-res-call"></pre><pre class="pt-res-exp"></pre></div>');
        row.querySelector('.pt-res-call').textContent = c.call;
        row.querySelector('.pt-res-exp').textContent = '→ ' + c.expect;
        resultsEl.appendChild(row);
      });
      if (!mock) {
        var b = h('<div class="next-row"><button class="btn ghost pt-selfsol">Show the model solution</button></div>');
        b.querySelector('.pt-selfsol').onclick = function () { showSolution('Compare it against what you wrote.'); };
        resultsEl.appendChild(b);
      }
    }

    runBtn.onclick = function () {
      runBtn.disabled = true;
      afterEl.hidden = true;
      resultsEl.hidden = true;
      setStatus('Starting…', 'pt-status-busy');
      var code = ta.value;
      var cases = (t.tests || []).map(function (c) { return { call: c.call, expect: c.expect, name: c.name || '', hidden: !!c.hidden, unordered: c.unordered }; });
      pyRunTests(t, code, cases, function (m) { setStatus(m, 'pt-status-busy'); })
        .then(function (report) { runBtn.disabled = false; showReport(report); })
        .catch(function (e) { runBtn.disabled = false; offerSelfCheck(e); });
    };

    function showReport(report) {
      logActivity();
      var prev = ptProg()[t.id] || {};
      resultsEl.hidden = false;
      resultsEl.innerHTML = '';
      if (report.error) {
        setStatus('Your code did not run.', 'pt-status-bad');
        resultsEl.appendChild(h('<pre class="pt-traceback"></pre>')).textContent = report.error;
      } else {
        var passed = report.results.filter(function (r) { return r.pass; }).length;
        var total = report.results.length;
        var allOk = passed === total && total > 0;
        setStatus(passed + ' of ' + total + ' tests passed' + (allOk ? ' — all green.' : '.'), allOk ? 'pt-status-good' : 'pt-status-bad');
        report.results.forEach(function (r, i) {
          var hide = mock && r.hidden;
          var row = h('<div class="pt-res ' + (r.pass ? 'pt-res-ok' : 'pt-res-bad') + '">' +
            '<span class="pt-res-mark">' + (r.pass ? '✓' : '✗') + '</span>' +
            '<div class="pt-res-body"><pre class="pt-res-call"></pre>' +
            '<div class="pt-res-cmp" hidden><pre class="pt-res-exp"></pre><pre class="pt-res-got"></pre></div>' +
            '<p class="pt-res-err" hidden></p></div></div>');
          row.querySelector('.pt-res-call').textContent = hide ? ('Hidden test ' + (i + 1)) : (r.name ? r.name + ':  ' + r.call : r.call);
          if (!hide) {
            var cmp = row.querySelector('.pt-res-cmp');
            cmp.hidden = false;
            cmp.querySelector('.pt-res-exp').textContent = 'expected  ' + r.expect;
            cmp.querySelector('.pt-res-got').textContent = 'you gave  ' + (r.got === null ? '—' : r.got);
            if (r.pass) cmp.hidden = true;
          }
          if (r.error && !hide) { var e = row.querySelector('.pt-res-err'); e.hidden = false; e.textContent = r.error; }
          resultsEl.appendChild(row);
        });
        if (report.stdout) {
          var out = h('<div class="pt-stdout"><span class="p-label">Anything you printed</span><pre></pre></div>');
          out.querySelector('pre').textContent = report.stdout;
          resultsEl.appendChild(out);
        }
        ptMark(t.id, { runs: (prev.runs || 0) + 1, best: Math.max(prev.best || 0, passed), total: total, solved: prev.solved || (allOk ? 1 : 0) });
        if (allOk && !mock) {
          var nb = h('<div class="next-row pt-donerow">' +
            (PT_RANDOM ? '<button class="btn pt-another">Another random one →</button>' : '<button class="btn pt-next">Next problem →</button>') +
            '<button class="btn ghost pt-showsol">Compare with the model solution</button>' +
            '<button class="btn ghost pt-forget" title="Clear the tick so it comes back as new">Forget this solve</button></div>');
          if (PT_RANDOM) nb.querySelector('.pt-another').onclick = function () { startRandomProblem(PT_RANDOM, t.id); };
          nb.querySelector('.pt-forget').onclick = function () { ptForget(t.id); nb.querySelector('.pt-forget').textContent = 'Forgotten — it counts as new again'; };
          nb.querySelector('.pt-showsol').onclick = function () { showSolution('Yours passes. Read this one for the shape and the complexity.'); };
          if (nb.querySelector('.pt-next')) nb.querySelector('.pt-next').onclick = function () {
            if (course) return course.after();
            var next = nextUnsolved(t.id);
            if (next) startPyProblem(next.id, null); else home();
          };
          if (course) nb.querySelector('.pt-next').textContent = course.nextLabel;
          resultsEl.appendChild(nb);
        }
      }
      resultsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    app.appendChild(card);
    window.scrollTo(0, 0);
    ta.focus();
  }
  function nextUnsolved(afterId) {
    var list = pyTests(), p = ptProg(), start = 0;
    list.forEach(function (t, i) { if (t.id === afterId) start = i + 1; });
    for (var k = 0; k < list.length; k++) {
      var t = list[(start + k) % list.length];
      if (!(p[t.id] && p[t.id].solved)) return t;
    }
    return null;
  }

  /* ---- Mock test: a timed sitting, marked at the end ---- */
  function mockState() { try { return JSON.parse(localStorage.getItem('ds_pt_mock') || 'null'); } catch (e) { return null; } }
  function saveMockState(s) { try { s ? localStorage.setItem('ds_pt_mock', JSON.stringify(s)) : localStorage.removeItem('ds_pt_mock'); } catch (e) {} }
  function buildMock(count, levelMix, withPackages) {
    var by = { 1: [], 2: [], 3: [] };
    pyTests().forEach(function (t) { if ((!t.noMock || withPackages) && !t.warmup) by[t.lvl || 2].push(t); });
    Object.keys(by).forEach(function (k) { by[k] = shuffle(by[k]); });
    var out = [];
    levelMix.forEach(function (L) { if (by[L] && by[L].length) out.push(by[L].shift()); });
    while (out.length < count) {
      var pool = shuffle(by[1].concat(by[2], by[3]));
      if (!pool.length) break;
      var pick = pool[0];
      by[pick.lvl || 2] = by[pick.lvl || 2].filter(function (x) { return x.id !== pick.id; });
      out.push(pick);
    }
    return out.slice(0, count);
  }
  function startMock(problems, minutes) {
    var s = {
      ids: problems.map(function (t) { return t.id; }),
      code: {}, idx: 0, minutes: minutes,
      endsAt: Date.now() + minutes * 60000, startedAt: Date.now()
    };
    problems.forEach(function (t) { s.code[t.id] = t.starter; });
    saveMockState(s);
    runMock(s);
  }
  var MOCK_TIMER = null;
  function stopMockTimer() { if (MOCK_TIMER) { clearInterval(MOCK_TIMER); MOCK_TIMER = null; } }
  function runMock(s) {
    stopMockTimer();
    var ctx = {
      ids: s.ids, code: s.code, idx: s.idx,
      save: function () { s.idx = ctx.idx; s.code = ctx.code; saveMockState(s); },
      submit: function () { stopMockTimer(); markMock(s); }
    };
    var clock = h('<span class="pt-clock"></span>');
    ctx.clockEl = clock;
    function tick() {
      var left = (s.endsAt - Date.now()) / 1000;
      clock.textContent = '⏱ ' + fmtClock(left);
      clock.classList.toggle('pt-clock-low', left < 300);
      if (left <= 0) { stopMockTimer(); alert('Time is up — your answers are being marked.'); markMock(s); }
    }
    MOCK_TIMER = setInterval(tick, 1000);
    tick();
    startPyProblem(s.ids[ctx.idx], ctx);
  }
  // Mark every answer, then show the report card.
  function markMock(s) {
    saveMockState(null);
    app.innerHTML = '';
    app.appendChild(ptBar('<b>Marking your test…</b>'));
    var card = h('<article class="qcard pt-card"><div class="q-eyebrow">Results</div>' +
      '<h2 class="pt-title">Marking…</h2><div class="pt-status pt-status-busy">Starting Python…</div>' +
      '<div class="pt-markrows"></div></article>');
    app.appendChild(card);
    var statusEl = card.querySelector('.pt-status'), rows = card.querySelector('.pt-markrows');
    var scores = [], i = 0;
    var mins = Math.round((Date.now() - s.startedAt) / 60000);
    function nextOne() {
      if (i >= s.ids.length) return finish();
      var t = pyTest(s.ids[i]);
      statusEl.textContent = 'Marking question ' + (i + 1) + ' of ' + s.ids.length + ' — ' + t.title;
      var cases = (t.tests || []).map(function (c) { return { call: c.call, expect: c.expect, name: c.name || '', hidden: !!c.hidden, unordered: c.unordered }; });
      pyRunTests(t, s.code[t.id] || '', cases, function (m) { statusEl.textContent = m; })
        .then(function (rep) {
          var passed = rep.error ? 0 : rep.results.filter(function (r) { return r.pass; }).length;
          scores.push({ t: t, passed: passed, total: (t.tests || []).length, error: rep.error, code: s.code[t.id] || '' });
          if (passed === (t.tests || []).length && passed > 0) ptMark(t.id, { solved: 1 });
          i++; nextOne();
        })
        .catch(function (e) {
          scores.push({ t: t, passed: null, total: (t.tests || []).length, error: 'Python unavailable: ' + (e.message || e), code: s.code[t.id] || '' });
          i++; nextOne();
        });
    }
    function finish() {
      var gradable = scores.filter(function (x) { return x.passed !== null; });
      var got = gradable.reduce(function (a, x) { return a + x.passed; }, 0);
      var tot = gradable.reduce(function (a, x) { return a + x.total; }, 0);
      var pct = tot ? Math.round(100 * got / tot) : 0;
      var solvedFully = scores.filter(function (x) { return x.passed === x.total && x.total; }).length;
      if (gradable.length) {
        var hist = ptMocks();
        hist.push({ at: Date.now(), pct: pct, solved: solvedFully, questions: scores.length, mins: mins });
        savePtMocks(hist);
      }
      app.innerHTML = '';
      app.appendChild(ptBar('<b>Test report</b>'));
      var head = h('<article class="qcard pt-card"><div class="q-eyebrow">Test report</div>' +
        '<h2 class="pt-title">' + pct + '% of tests passed</h2>' +
        '<p class="pt-p">' + solvedFully + ' of ' + scores.length + ' questions fully solved, in ' + (mins < 1 ? 'under a minute' : mins + ' minute' + (mins === 1 ? '' : 's')) + '. ' +
        (pct >= 80 ? 'That is a strong sitting.' : pct >= 50 ? 'A real pass mark is usually 70–80% — worth another round.' : 'Work back through the ones that failed; the model solutions are below.') + '</p>' +
        '<div class="code-progwrap"><div class="code-progbar"><span style="width:' + pct + '%"></span></div>' +
        '<span class="code-intro-count"><b>' + got + '</b> / ' + tot + ' tests</span></div>' +
        '<div class="next-row"><button class="btn pt-again">Sit another test →</button><button class="btn ghost pt-home">Back to tests</button></div></article>');
      head.querySelector('.pt-again').onclick = function () { setTestDoor('mock'); home(); };
      head.querySelector('.pt-home').onclick = home;
      app.appendChild(head);
      scores.forEach(function (x, n) {
        var ok = x.passed === x.total && x.total;
        var sec = h('<section class="qcard pt-card pt-report"><div class="q-eyebrow"><span class="pt-group">Question ' + (n + 1) + '</span>' + diffTag(x.t.lvl || 1) + '</div>' +
          '<h3 class="pt-rep-title"></h3>' +
          '<div class="banner ' + (ok ? 'good' : 'bad') + '"><span class="b-label">' +
          (x.passed === null ? 'Not marked' : x.passed + ' / ' + x.total + ' tests') + '</span>' +
          esc(x.error ? String(x.error).split('\n')[0] : (ok ? 'Full marks.' : 'Some cases came back wrong — compare the two answers below.')) + '</div>' +
          '<details class="pt-rep-det"><summary>Your answer</summary><pre class="pt-rep-code"></pre></details>' +
          '<details class="pt-rep-det" open><summary>Model solution</summary><pre class="pt-rep-sol"></pre></details>' +
          (x.t.walk ? '<p class="pt-walk"></p>' : '') +
          '<div class="next-row"><button class="btn ghost pt-retry">Retry this one in practice →</button></div></section>');
        sec.querySelector('.pt-rep-title').textContent = x.t.title;
        sec.querySelector('.pt-rep-code').textContent = x.code;
        sec.querySelector('.pt-rep-sol').textContent = x.t.solution;
        if (x.t.walk) sec.querySelector('.pt-walk').textContent = x.t.walk;
        sec.querySelector('.pt-retry').onclick = function () { startPyProblem(x.t.id, null); };
        app.appendChild(sec);
      });
      window.scrollTo(0, 0);
    }
    nextOne();
  }

  /* ---- "What does this print?" — the multiple-choice half of a real test ---- */
  function pyQuiz() { return window.PYQUIZ || []; }
  function quizBar(label, onBack) {
    var bar = ptBar(label);
    if (onBack) {
      bar.querySelector('.back').textContent = backWord();
      bar.querySelector('.back').onclick = onBack;
    }
    return bar;
  }
  function startPyQuiz(list, onFinish, onBack, opts) {
    if (!list.length) return home();
    opts = opts || {};
    var i = 0, right = 0, studied = {};
    step();
    function step() {
      if (i >= list.length) return done();
      if (opts.learn && !studied[i]) return studyThen(list[i], i);
      var q = list[i], answered = false;
      app.innerHTML = '';
      app.appendChild(quizBar('<b>What does this print?</b> · ' + (i + 1) + ' of ' + list.length, onBack));
      var card = h('<article class="qcard pt-card"><div class="q-eyebrow"><span class="pt-group"></span>' + diffTag(q.lvl || 1) + '</div>' +
        '<h2 class="pt-title"></h2><pre class="pt-quizcode"></pre><div class="code-opts"></div><div class="code-after" hidden></div></article>');
      card.querySelector('.pt-group').textContent = q.group;
      card.querySelector('.q-eyebrow').appendChild(rateCtl('pq' + q.id));
      card.querySelector('.pt-title').textContent = q.q || 'What does this code print?';
      card.querySelector('.pt-quizcode').textContent = q.code;
      var optBox = card.querySelector('.code-opts'), after = card.querySelector('.code-after');
      var choices = shuffle([{ c: q.correct, ok: true }].concat((q.wrong || []).map(function (w) { return { c: w, ok: false }; })));
      choices.forEach(function (ch, ci) {
        var b = h('<button class="code-opt" type="button"><span class="co-key"></span><pre></pre></button>');
        b.querySelector('.co-key').textContent = LETTERS[ci] || '·';
        b.querySelector('pre').textContent = ch.c;
        b.onclick = function () {
          if (answered) return;
          answered = true; logActivity();
          optBox.querySelectorAll('.code-opt').forEach(function (o, k) {
            o.disabled = true;
            if (choices[k].ok) o.classList.add('co-right');
          });
          if (!ch.ok) b.classList.add('co-wrong'); else right++;
          after.hidden = false;
          after.innerHTML = '<div class="banner ' + (ch.ok ? 'good' : 'bad') + '"><span class="b-label">' + (ch.ok ? 'Right ✓' : 'Not this one') + '</span>' + esc(q.explain) + '</div>' +
            '<div class="next-row"><button class="btn pq-next">' + (i + 1 >= list.length ? 'Finish →' : 'Next →') + '</button></div>';
          after.querySelector('.pq-next').onclick = function () { i++; step(); };
          after.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        };
        optBox.appendChild(b);
      });
      app.appendChild(card);
      window.scrollTo(0, 0);
    }
    function studyThen(q, idx) {
      app.innerHTML = '';
      app.appendChild(quizBar('<b>Learn</b> · ' + (idx + 1) + ' of ' + list.length, onBack));
      var card = h('<article class="qcard pt-card"><div class="q-eyebrow"><span class="pt-group"></span>' + diffTag(q.lvl || 1) + '</div>' +
        '<h2 class="pt-title"></h2><pre class="pt-quizcode"></pre>' +
        '<div class="code-sol"><span class="p-label">It prints</span><pre class="sv-out"></pre></div>' +
        '<p class="qf-note"></p>' +
        '<div class="next-row"><button class="btn ln-go">Now answer it →</button>' +
        '<button class="btn ghost ln-skip">Skip this one</button></div></article>');
      card.querySelector('.pt-group').textContent = q.group;
      card.querySelector('.q-eyebrow').appendChild(rateCtl('pq' + q.id));
      card.querySelector('.pt-title').textContent = q.q || 'What does this code print?';
      card.querySelector('.pt-quizcode').textContent = q.code;
      card.querySelector('.sv-out').textContent = q.correct;
      card.querySelector('.qf-note').textContent = q.explain;
      card.querySelector('.ln-go').onclick = function () { studied[idx] = 1; step(); };
      card.querySelector('.ln-skip').onclick = function () { studied[idx] = 1; i++; step(); };
      app.appendChild(card);
      window.scrollTo(0, 0);
      card.querySelector('.ln-go').focus();
    }
    function done() {
      app.innerHTML = '';
      app.appendChild(quizBar('<b>Round complete</b>', onBack));
      var card = h('<article class="qcard pt-card"><div class="q-eyebrow">Round complete</div>' +
        '<h2 class="pt-title">' + right + ' of ' + list.length + ' right</h2>' +
        '<div class="next-row"><button class="btn pq-again">Another round →</button><button class="btn ghost pq-home">Back to tests</button></div></article>');
      card.querySelector('.pq-again').onclick = function () { startPyQuiz(shuffle(pyQuiz().slice()).slice(0, 10), onFinish, onBack, opts); };
      card.querySelector('.pq-home').onclick = home;
      if (onFinish) {
        var cont = h('<div class="next-row course-foot"><button class="btn pq-course">Continue the course →</button></div>');
        cont.querySelector('.pq-course').onclick = onFinish;
        card.insertBefore(cont, card.querySelector('.next-row'));
        card.querySelector('.pq-again').textContent = 'One more round first';
        card.querySelector('.pq-again').classList.add('ghost');
      }
      app.appendChild(card);
      window.scrollTo(0, 0);
    }
  }

  /* ---- the Python-tests home ---- */
  function getTestDoor() { var v = localStorage.getItem('ds_pt_door'); return (v === 'mock' || v === 'output' || v === 'results' || v === 'revise') ? v : 'practice'; }
  function setTestDoor(v) { try { localStorage.setItem('ds_pt_door', v); } catch (e) {} }
  function renderTestHome() {
    var door = getTestDoor();
    var nav = h('<nav class="home-doors doors-4" role="tablist"></nav>');
    [{ v: 'practice', t: 'Practice', s: 'Problems, run for real' },
     { v: 'revise', t: 'Revise', s: 'Random, spaced out' },
     { v: 'mock', t: 'Mock test', s: 'Timed, marked at the end' },
     { v: 'output', t: 'Output quiz', s: 'What does this print?' },
     { v: 'results', t: 'Results', s: 'Scores & history' }].forEach(function (d) {
      var b = h('<button class="door' + (d.v === door ? ' door-on' : '') + '" type="button" role="tab"><span class="door-t"></span><span class="door-s"></span></button>');
      b.querySelector('.door-t').textContent = d.t;
      b.querySelector('.door-s').textContent = d.s;
      b.onclick = function () { setTestDoor(d.v); home(); };
      nav.appendChild(b);
    });
    app.appendChild(nav);
    // An unfinished sitting always gets offered back first.
    var live = mockState();
    if (live && live.endsAt > Date.now() && live.ids && live.ids.length) {
      var res = h('<section class="code-intro pt-resume"><div class="review-eyebrow">Test in progress</div>' +
        '<p class="code-intro-p">You have a test running with <b>' + fmtClock((live.endsAt - Date.now()) / 1000) + '</b> left.</p>' +
        '<div class="next-row"><button class="btn pt-resume-go">Resume the test →</button><button class="btn ghost pt-resume-drop">Abandon it</button></div></section>');
      res.querySelector('.pt-resume-go').onclick = function () { runMock(live); };
      res.querySelector('.pt-resume-drop').onclick = function () { if (confirm('Throw this test away?')) { saveMockState(null); home(); } };
      app.appendChild(res);
    }
    if (door === 'revise') return renderTestRevise();
    if (door === 'mock') return renderTestMock();
    if (door === 'output') return renderTestQuiz();
    if (door === 'results') return renderTestResults();
    renderTestPractice();
  }
  function pyEnvNote() {
    return '<p class="pt-envnote">Your code really runs: Python itself is downloaded into the browser the first time you press <b>Run tests</b> ' +
      '(about 10 MB, then cached). No connection? Everything still opens — you just mark your own answer against the expected results.</p>';
  }
  function renderTestPractice() {
    var all = pyTests();
    if (!all.length) { app.appendChild(h('<section class="code-intro"><p class="code-intro-p">No problems loaded.</p></section>')); return; }
    var p = ptProg(), solved = ptSolvedCount();
    var pct = Math.round(100 * solved / all.length);
    var intro = h('<section class="code-intro"><div class="review-eyebrow">Python coding test · practice</div>' +
      '<p class="code-intro-p">The kind of question a hiring test actually asks: a short brief, a function to write, and a set of test cases that either pass or do not. ' +
      'Write your answer, press run, read the failures, fix it — exactly as you will on the day.</p>' +
      '<p class="code-intro-p">Not ready to be tested on one? Every problem has a <b>View</b> button beside it: the worked solution, line by line, with the offer to solve it yourself at the end.</p>' +
      '<div class="code-progwrap"><div class="code-progbar"><span style="width:' + pct + '%"></span></div>' +
      '<span class="code-intro-count"><b>' + solved + '</b> of ' + all.length + ' solved</span></div>' + pyEnvNote() + '</section>');
    var startRow = h('<div class="next-row"><button class="btn pt-start">Next unsolved problem →</button>' +
      '<button class="btn ghost pt-start-random">Random one instead</button>' +
      '<button class="btn ghost pt-start-view">See one worked first, then solve it</button></div>');
    startRow.querySelector('.pt-start').onclick = function () { var t = nextUnsolved(null); if (t) startPyProblem(t.id, null); };
    startRow.querySelector('.pt-start-view').onclick = function () { var t = nextUnsolved(null); if (t) startProblemStudy(t.id, null); };
    startRow.querySelector('.pt-start-random').onclick = function () { startRandomProblem(getPtPool()); };
    intro.appendChild(startRow);
    app.appendChild(intro);
    var g = ptGroups(all);
    g.order.forEach(function (grp) {
      app.appendChild(h('<div class="sec-label sec-sub">' + esc(grp) + '</div>'));
      g.by[grp].forEach(function (t) {
        var r = p[t.id] || {};
        var state = r.solved ? 'done' : (r.runs ? 'part' : 'new');
        var row = h('<div class="pt-row pt-row-' + state + ' pt-row-split"><button class="pt-row-main" type="button">' +
          '<span class="pt-row-mark">' + (r.solved ? '✓' : (r.runs ? '·' : '')) + '</span>' +
          '<span class="pt-row-t"></span>' + diffTag(t.lvl || 1) +
          '<span class="pt-row-n">' + ((t.tests || []).length) + ' tests</span></button>' +
          '<button class="sv-btn" type="button" title="See it worked through first">View</button></div>');
        row.querySelector('.pt-row-t').textContent = t.title;
        row.querySelector('.pt-row-main').onclick = function () { startPyProblem(t.id, null); };
        row.querySelector('.sv-btn').onclick = function () { startProblemStudy(t.id, null); };
        row.appendChild(rateCtl('pt' + t.id, { noDis: false }));
        if (r.solved && r.solvedAt) {
          var d = ptDaysSince(r);
          row.querySelector('.pt-row-n').textContent = d === 0 ? 'solved today' : 'solved ' + d + 'd ago';
          if (ptIsDue(r)) row.querySelector('.pt-row-mark').textContent = '↻';
        }
        app.appendChild(row);
      });
    });
  }
  function renderTestReviseEmpty(kind) {
    home();
    var note = h('<section class="code-intro"><div class="review-eyebrow">Nothing in that pile</div>' +
      '<p class="code-intro-p">There is nothing ' + esc(ptPoolLabel(kind)) + ' right now. Try another pile — or solve a few more problems and come back in a week.</p></section>');
    app.appendChild(note);
  }
  // The Revise door: draw a random problem from whichever pile you choose, including
  // ones you have already solved — because the whole point is to meet them again later.
  function renderTestRevise() {
    var all = pyTests(), p = ptProg();
    var counts = { all: ptPool('all').length, unsolved: ptPool('unsolved').length,
      solved: ptPool('solved').length, fav: ptPool('fav').length, due: ptPool('due').length };
    var pool = getPtPool();
    var intro = h('<section class="code-intro"><div class="review-eyebrow">Revise</div>' +
      '<p class="code-intro-p">Pick a pile and get a random problem out of it. Solved ones count: something you got right in March is worth meeting again in April, ' +
      'and the gap between sightings grows each time you solve it again — 3 days, then 10, then 28, then three months.</p>' +
      '<div class="code-progwrap"><div class="code-progbar"><span style="width:' + (all.length ? Math.round(100 * counts.solved / all.length) : 0) + '%"></span></div>' +
      '<span class="code-intro-count"><b>' + counts.solved + '</b> of ' + all.length + ' solved · <b>' + counts.due + '</b> due for another go</span></div></section>');
    var chips = h('<div class="code-diff-row"><span class="filt-lab">Draw from</span></div>');
    [{ v: 'all', t: 'Anything' }, { v: 'unsolved', t: 'Not solved yet' }, { v: 'solved', t: 'Already solved' },
     { v: 'due', t: 'Due for revision' }, { v: 'fav', t: '★ Favourites' }].forEach(function (c) {
      var b = h('<button class="cdf-chip' + (pool === c.v ? ' cdf-on' : '') + '" type="button"></button>');
      b.textContent = c.t + ' · ' + counts[c.v];
      b.onclick = function () { setPtPool(c.v); home(); };
      chips.appendChild(b);
    });
    intro.appendChild(chips);
    var go = h('<div class="next-row"><button class="btn pt-random">Random problem →</button>' +
      '<button class="btn ghost pt-random-view">See one worked instead</button></div>');
    go.querySelector('.pt-random').onclick = function () { startRandomProblem(getPtPool()); };
    go.querySelector('.pt-random-view').onclick = function () {
      var list = ptPool(getPtPool());
      if (!list.length) return renderTestReviseEmpty(getPtPool());
      startProblemStudy(list[Math.floor(Math.random() * list.length)].id, null);
    };
    intro.appendChild(go);
    if (!counts[pool]) intro.appendChild(h('<p class="cu-needs">Nothing ' + esc(ptPoolLabel(pool)) + ' at the moment — pick another pile.</p>'));
    app.appendChild(intro);

    // What is due, oldest first, so you can pick deliberately rather than at random.
    var due = ptPool('due').map(function (t) { return { t: t, r: p[t.id] || {} }; })
      .sort(function (a, b) { return (a.r.solvedAt || 0) - (b.r.solvedAt || 0); });
    if (due.length) {
      app.appendChild(h('<div class="sec-label sec-sub">Due for another go</div>'));
      due.slice(0, 25).forEach(function (row) {
        var days = ptDaysSince(row.r);
        var el = h('<div class="pt-row pt-row-done pt-row-split"><button class="pt-row-main" type="button">' +
          '<span class="pt-row-mark">↻</span><span class="pt-row-t"></span>' + diffTag(row.t.lvl || 1) +
          '<span class="pt-row-n">' + days + ' day' + (days === 1 ? '' : 's') + ' ago</span></button>' +
          '<button class="sv-btn" type="button" title="Forget my solve, so it counts as new again">Reset</button></div>');
        el.querySelector('.pt-row-t').textContent = row.t.title;
        el.querySelector('.pt-row-main').onclick = function () { PT_RANDOM = 'due'; startPyProblem(row.t.id, null); };
        el.querySelector('.sv-btn').onclick = function () { ptForget(row.t.id); home(); };
        app.appendChild(el);
      });
    }

    // Favourites, listed, because a starred problem is one you asked to see again.
    var favs = ptPool('fav');
    if (favs.length) {
      app.appendChild(h('<div class="sec-label sec-sub">★ Your favourites</div>'));
      favs.slice(0, 25).forEach(function (t) {
        var r = p[t.id] || {}, days = ptDaysSince(r);
        var el = h('<div class="pt-row pt-row-' + (r.solved ? 'done' : 'new') + ' pt-row-split"><button class="pt-row-main" type="button">' +
          '<span class="pt-row-mark">★</span><span class="pt-row-t"></span>' + diffTag(t.lvl || 1) +
          '<span class="pt-row-n">' + (r.solved ? (days === null ? 'solved' : days + ' days ago') : 'not solved') + '</span></button>' +
          '<button class="sv-btn" type="button" title="See it worked through">View</button></div>');
        el.querySelector('.pt-row-t').textContent = t.title;
        el.querySelector('.pt-row-main').onclick = function () { PT_RANDOM = 'fav'; startPyProblem(t.id, null); };
        el.querySelector('.sv-btn').onclick = function () { startProblemStudy(t.id, null); };
        app.appendChild(el);
      });
    }

    // Start fresh — the whole point of coming back in a few weeks.
    var reset = h('<section class="code-intro"><div class="review-eyebrow">Start fresh</div>' +
      '<p class="code-intro-p">Coming back after a break? Mark everything unsolved and walk the whole set again. Your saved code stays where it is — only the ticks go.</p>' +
      '<div class="next-row"><button class="btn ghost pt-forget-all">Mark all ' + counts.solved + ' solved problems unsolved</button></div></section>');
    reset.querySelector('.pt-forget-all').onclick = function () {
      if (!confirm('Clear every solved tick so the whole set counts as new again? Your code is kept.')) return;
      ptForgetAll(); home();
    };
    app.appendChild(reset);
  }
  function renderTestMock() {
    var all = pyTests();
    var intro = h('<section class="code-intro"><div class="review-eyebrow">Mock test</div>' +
      '<p class="code-intro-p">A timed sitting, like the real thing: a mixed set of questions, a countdown, no hints and no solutions until you submit. ' +
      'Hidden test cases stay hidden while you work — you only see pass or fail. Leave the page and the test is still there when you come back.</p>' + pyEnvNote() + '</section>');
    app.appendChild(intro);
    [{ n: 3, m: 45, t: 'Short screen', d: '3 questions · 45 minutes', mix: [1, 2, 2] },
     { n: 4, m: 60, t: 'Standard test', d: '4 questions · 60 minutes', mix: [1, 2, 2, 3] },
     { n: 6, m: 90, t: 'Full sitting', d: '6 questions · 90 minutes', mix: [1, 1, 2, 2, 3, 3] },
     { n: 4, m: 60, t: 'Data test', d: '4 questions · 60 minutes · pandas questions included (bigger download)', mix: [1, 2, 2, 3], pkg: true }].forEach(function (cfg) {
      var card = h('<button class="pt-mockcard" type="button"><span class="pt-mock-t"></span><span class="pt-mock-d"></span></button>');
      card.querySelector('.pt-mock-t').textContent = cfg.t;
      card.querySelector('.pt-mock-d').textContent = cfg.d;
      card.onclick = function () {
        var problems = buildMock(cfg.n, cfg.mix, cfg.pkg);
        if (problems.length < cfg.n) { alert('Not enough problems loaded for that sitting yet.'); return; }
        if (confirm('Start a ' + cfg.m + '-minute test with ' + problems.length + ' questions?')) startMock(problems, cfg.m);
      };
      app.appendChild(card);
    });
    if (all.length) {
      var hist = ptMocks();
      if (hist.length) {
        app.appendChild(h('<div class="sec-label sec-sub">Recent sittings</div>'));
        hist.slice(-6).reverse().forEach(function (m) {
          var d = new Date(m.at);
          app.appendChild(h('<div class="pt-hist"><span class="pt-hist-d">' + d.toLocaleDateString() + '</span>' +
            '<span class="pt-hist-s"><b>' + m.pct + '%</b></span>' +
            '<span class="pt-hist-n">' + m.solved + '/' + m.questions + ' solved · ' + m.mins + ' min</span></div>'));
        });
      }
    }
  }
  function renderTestQuiz() {
    var qs = pyQuiz();
    var intro = h('<section class="code-intro"><div class="review-eyebrow">Output quiz</div>' +
      '<p class="code-intro-p">Nearly every Python test opens with these: a short snippet, four plausible outputs, one right answer. ' +
      'They are testing whether you know what the language actually does — mutable defaults, integer division, aliasing, truthiness.</p>' +
      '<div class="next-row"><button class="btn pq-start">Test me — a round of 10 →</button>' +
      '<button class="btn ghost pq-learn">Learn: see it, then answer it</button><button class="btn ghost pq-view">View 10 worked first</button>' +
      '<button class="btn ghost pq-all">Every question, in order</button>' +
      '<button class="btn ghost pq-favs">★ Just my favourites</button></div></section>');
    intro.querySelector('.pq-start').onclick = function () { startPyQuiz(shuffle(qs.slice()).slice(0, 10)); };
    intro.querySelector('.pq-all').onclick = function () { startPyQuiz(qs.slice()); };
    intro.querySelector('.pq-view').onclick = function () { startQuizStudy(shuffle(qs.slice()).slice(0, 10)); };
    intro.querySelector('.pq-learn').onclick = function () { startPyQuiz(shuffle(qs.slice()).slice(0, 10), null, null, { learn: true }); };
    intro.querySelector('.pq-favs').onclick = function () {
      var favs = qs.filter(function (q) { return isFavId('pq' + q.id); });
      if (!favs.length) {
        var b = intro.querySelector('.pq-favs');
        b.textContent = 'Tap ☆ on a question first';
        setTimeout(function () { b.textContent = '★ Just my favourites'; }, 1800);
        return;
      }
      startPyQuiz(shuffle(favs));
    };
    app.appendChild(intro);
    var g = ptGroups(qs);
    g.order.forEach(function (grp) {
      var items = g.by[grp];
      var row = h('<div class="qf-grow qf-grow-split"><button class="qf-grow-main" type="button">' +
        '<span class="qf-grow-t"></span><span class="qf-grow-n">' + items.length + '</span></button>' +
        '<button class="sv-btn sv-learn" type="button" title="See the output, then answer the same question">Learn</button>' +
        '<button class="sv-btn" type="button" title="See these snippets with their output">View</button></div>');
      row.querySelector('.qf-grow-t').textContent = grp;
      row.querySelector('.qf-grow-main').onclick = function () { startPyQuiz(shuffle(items.slice())); };
      row.querySelector('.sv-learn').onclick = function () { startPyQuiz(shuffle(items.slice()), null, null, { learn: true }); };
      row.querySelectorAll('.sv-btn')[1].onclick = function () { startQuizStudy(items.slice()); };
      app.appendChild(row);
    });
  }
  function renderTestResults() {
    var all = pyTests(), p = ptProg(), hist = ptMocks();
    var solved = ptSolvedCount(), attempted = all.filter(function (t) { return p[t.id] && p[t.id].runs; }).length;
    app.appendChild(h('<section class="code-intro"><div class="review-eyebrow">Your results</div>' +
      '<div class="mast-badges cdash-badges">' +
      '<span class="mb mb-learnt"><b>' + solved + '</b> solved</span>' +
      '<span class="mb mb-learning"><b>' + (attempted - solved) + '</b> attempted</span>' +
      '<span class="mb mb-new"><b>' + (all.length - attempted) + '</b> untouched</span>' +
      '<span class="mb"><b>' + hist.length + '</b> mock sittings</span></div></section>'));
    if (hist.length) {
      var best = hist.reduce(function (a, m) { return Math.max(a, m.pct); }, 0);
      var last = hist[hist.length - 1];
      app.appendChild(h('<section class="code-intro"><p class="code-intro-p">Best sitting <b>' + best + '%</b> · most recent <b>' + last.pct + '%</b> (' + last.solved + '/' + last.questions + ' solved).</p></section>'));
    }
    var g = ptGroups(all);
    g.order.forEach(function (grp) {
      var items = g.by[grp], done = items.filter(function (t) { return p[t.id] && p[t.id].solved; }).length;
      var gp = Math.round(100 * done / items.length);
      var row = h('<div class="qf-grow qf-grow-flat"><span class="qf-grow-t"></span>' +
        '<span class="qf-grow-bar"><span style="width:' + gp + '%"></span></span>' +
        '<span class="qf-grow-n">' + done + '/' + items.length + '</span></div>');
      row.querySelector('.qf-grow-t').textContent = grp;
      app.appendChild(row);
    });
    var reset = h('<div class="next-row"><button class="btn ghost pt-clear">Clear my saved answers &amp; scores</button></div>');
    reset.querySelector('.pt-clear').onclick = function () {
      if (!confirm('Delete your saved code, scores and mock history for the coding tests?')) return;
      try {
        localStorage.removeItem('ds_pt_prog'); localStorage.removeItem('ds_pt_mocks'); localStorage.removeItem('ds_pt_mock');
        all.forEach(function (t) { localStorage.removeItem('ds_pt_code_' + t.id); });
      } catch (e) {}
      home();
    };
    app.appendChild(reset);
  }

  // Coding mode has its own doors: Quickfire (type the line), Practice (the tasks),
  // Reference (solutions, searchable), Dashboard (progress). Mirrors the main home's structure.
  function getCodeDoor() { var v = localStorage.getItem('ds_code_door'); return (v === 'reference' || v === 'dashboard' || v === 'quick') ? v : 'practice'; }
  function setCodeDoor(v) { try { localStorage.setItem('ds_code_door', v); } catch (e) {} }
  function stageNo(group) { var m = /^(\d+)/.exec(group || ''); return m ? +m[1] : 99; }
  function codeGroups(list) {
    var tasks = list || window.CODETASKS || [], order = [], by = {};
    tasks.forEach(function (t) { if (!by[t.group]) { by[t.group] = []; order.push(t.group); } by[t.group].push(t); });
    // The coding section is one path, earliest stage first. A numbered group name decides
    // where it sits; anything unnumbered keeps its file order at the end.
    order.sort(function (a, b) { return stageNo(a) - stageNo(b) || order.indexOf(a) - order.indexOf(b); });
    return { order: order, by: by };
  }
  // The next unfinished level in the path, in stage order — within whatever the
  // difficulty filter is showing, so the button never points at a hidden task.
  function codeNext(list) {
    var g = codeGroups(list), prog = codeProg(), found = null;
    g.order.forEach(function (grp) {
      g.by[grp].forEach(function (t) {
        if (found) return;
        var p = prog[t.key] || {};
        for (var L = 1; L <= 3; L++) if (!p[L]) { found = { task: t, level: L }; return; }
      });
    });
    return found;
  }
  function codeLevelsDone(p) { return (p[1] ? 1 : 0) + (p[2] ? 1 : 0) + (p[3] ? 1 : 0); }
  // Difficulty filter for coding mode (task.lvl 1/2/3), shared by Practice and Reference.
  function getCodeDiff() { var d = +(localStorage.getItem('ds_code_diff')); return (d === 1 || d === 2 || d === 3) ? d : 0; }
  function setCodeDiff(d) { try { localStorage.setItem('ds_code_diff', d || 0); } catch (e) {} }
  function codeDiffChips() {
    var row = h('<div class="code-diff-row"><span class="filt-lab">Difficulty</span></div>');
    [{ v: 0, t: 'All' }, { v: 1, t: 'L1 · foundations' }, { v: 2, t: 'L2 · practice' }, { v: 3, t: 'L3 · advanced' }].forEach(function (c) {
      var b = h('<button class="cdf-chip' + (getCodeDiff() === c.v ? ' cdf-on' : '') + '" type="button"></button>');
      b.textContent = c.t;
      b.onclick = function () { setCodeDiff(c.v); home(); };
      row.appendChild(b);
    });
    return row;
  }
  function codeTasksFiltered() {
    var d = getCodeDiff();
    return (window.CODETASKS || []).filter(function (t) { return !d || (t.lvl || 2) === d; });
  }
  function startCodeLevel(key, L) { if (L === 0) startCodeExample(key); else if (L === 1) startCodeMCQ(key); else if (L === 2) startCodeOrder(key); else startCodeWrite(key); }
  /* ================= The Library =================
     One shelf per subject, and inside it one long chronological run of exercises that all
     work the same way: read the answer, then be asked the question, then type it out.

     Everything in the app that can be typed becomes one rung of that run — a quickfire
     card (type the line), an output question (type what it prints), a coding task (type
     the code), a coding-test problem (type the function and run it against its tests) —
     with the course's own reading laid in front of the rungs it teaches.

     The order is the course's order. The course is already the chronology, so the ladder
     walks its units and steps and expands each step into its individual rungs; anything
     the course never reaches is added to the end of the shelf it belongs to. */
  function libShelves() { return window.LIBRARY || []; }
  function libShelf(key) { var f = null; libShelves().forEach(function (t) { if (t.key === key) f = t; }); return f; }
  function getLibShelf() { try { return localStorage.getItem('ds_lib_shelf') || ''; } catch (e) { return ''; } }
  function setLibShelf(v) { try { if (v) localStorage.setItem('ds_lib_shelf', v); else localStorage.removeItem('ds_lib_shelf'); } catch (e) {} }
  function getLibKind() { try { return localStorage.getItem('ds_lib_kind') || 'all'; } catch (e) { return 'all'; } }
  function setLibKind(v) { try { localStorage.setItem('ds_lib_kind', v); } catch (e) {} }
  function getLibHide() { try { return localStorage.getItem('ds_lib_hide') === '1'; } catch (e) { return false; } }
  function setLibHide(v) { try { localStorage.setItem('ds_lib_hide', v ? '1' : '0'); } catch (e) {} }
  function libProg() { try { return JSON.parse(localStorage.getItem('ds_lib_prog') || '{}'); } catch (e) { return {}; } }
  function saveLibProg(p) { try { localStorage.setItem('ds_lib_prog', JSON.stringify(p)); } catch (e) {} }
  function libDone(id) { return !!libProg()[id]; }
  function libTick(id) { var p = libProg(); p[id] = 1; saveLibProg(p); }

  // The kinds of rung, and what typing one of them means.
  var LIB_KINDS = [
    { k: 'read', t: 'Read', v: 'The idea in plain English, before the rungs that drill it' },
    { k: 'card', t: 'Line', v: 'Read the line, then type it from memory' },
    { k: 'quiz', t: 'Output', v: 'Read what it prints, then type it from memory' },
    { k: 'task', t: 'Code', v: 'Read the worked code, then write it yourself' },
    { k: 'problem', t: 'Problem', v: 'Read the solution, then write it and run the tests' },
    { k: 'term', t: 'Term', v: 'Read the definition and its term, then name it from the definition' }
  ];
  function libKindName(k) { var n = k; LIB_KINDS.forEach(function (d) { if (d.k === k) n = d.t; }); return n; }

  // Which shelf each course unit sits on.
  var LIB_UNIT = null;
  function libUnitShelf() {
    if (LIB_UNIT) return LIB_UNIT;
    LIB_UNIT = {};
    libShelves().forEach(function (t) { t.units.forEach(function (u) { LIB_UNIT[u] = t.key; }); });
    return LIB_UNIT;
  }

  // The whole ladder, built once: every rung in teaching order, shelf by shelf.
  var LIB_LADDER = null;
  function libLadder() {
    if (LIB_LADDER) return LIB_LADDER;
    var rungs = [], seen = {}, onShelf = libUnitShelf();
    var units = {};
    courseUnits().forEach(function (row) { units[row.unit.key] = row; });
    function add(it) { if (seen[it.id]) return; seen[it.id] = 1; rungs.push(it); }
    function cardRung(c, shelf) {
      return { kind: 'card', id: 'c:' + c.id, shelf: shelf, card: c, lvl: c.lvl,
        title: c.ask, sub: c.group, find: c.ask + ' ' + c.a + ' ' + c.group };
    }
    function quizRung(q, shelf) {
      return { kind: 'quiz', id: 'q:' + q.id, shelf: shelf, q: q, lvl: q.lvl,
        title: q.q || 'What does this print?', sub: q.group, find: (q.q || '') + ' ' + q.code + ' ' + q.correct };
    }
    function taskRung(t, shelf) {
      return { kind: 'task', id: 't:' + t.key, shelf: shelf, key: t.key, lvl: t.lvl,
        title: t.title, sub: t.group, find: t.title + ' ' + t.ask + ' ' + t.group };
    }
    function probRung(t, shelf) {
      return { kind: 'problem', id: 'p:' + t.id, shelf: shelf, pid: t.id, lvl: t.lvl,
        title: t.title, sub: t.group, find: t.title + ' ' + t.brief + ' ' + (t.fn || '') };
    }

    libShelves().forEach(function (shelf) {
      // 1. the shelf's own course units, in course order, each step expanded into rungs
      courseUnits().forEach(function (row) {
        if (onShelf[row.unit.key] !== shelf.key) return;
        (row.unit.steps || []).forEach(function (step, si) {
          if (step.t === 'read') {
            add({ kind: 'read', id: 'r:' + row.unit.key + ':' + si, shelf: shelf.key,
              unitKey: row.unit.key, si: si, title: step.title || row.unit.name, sub: row.unit.name,
              find: (step.title || '') + ' ' + row.unit.name + ' ' + (row.unit.blurb || '') });
          } else if (step.t === 'quick') {
            snipsForStep(step).forEach(function (c) { add(cardRung(c, shelf.key)); });
          } else if (step.t === 'quiz') {
            quizForStep(step).forEach(function (q) { add(quizRung(q, shelf.key)); });
          } else if (step.t === 'problem') {
            var pt = pyTest(step.id); if (pt) add(probRung(pt, shelf.key));
          } else if (step.t === 'task') {
            var ct = codeTask(step.key); if (ct) add(taskRung(ct, shelf.key));
          }
        });
      });
      // 2. whatever the course never reached, in the order the shelf names it
      var bucket = libBuckets();
      shelf.cards.forEach(function (g) { (bucket.cards[g] || []).forEach(function (c) { add(cardRung(c, shelf.key)); }); });
      shelf.quizzes.forEach(function (g) { (bucket.quiz[g] || []).forEach(function (q) { add(quizRung(q, shelf.key)); }); });
      shelf.tasks.forEach(function (g) { (bucket.tasks[g] || []).forEach(function (t) { add(taskRung(t, shelf.key)); }); });
      (libProblemShelf().by[shelf.key] || []).forEach(function (t) { add(probRung(t, shelf.key)); });
      // 3. the data-science terms of this shelf's topics: the definition is the question,
      //    the term is the answer you type. Read from the whole deck, not the filtered
      //    view, because the ladder is the library and holds everything.
      if (shelf.ds.length) {
        var want = {};
        shelf.ds.forEach(function (k) { want[k] = 1; });
        flashDeck();
        (FLASH || []).forEach(function (c) {
          if (!want[c.key] || !c.back || c.back.length < 15) return;
          add({ kind: 'term', id: 'k:' + cid(c.front), shelf: shelf.key, term: c, lvl: c.level,
            title: c.front, sub: c.topic, find: c.front + ' ' + c.back });
        });
      }
    });
    rungs.forEach(function (r, n) { r.n = n; });
    LIB_LADDER = rungs;
    return rungs;
  }
  // Where each shelf starts and ends in the ladder, so a shelf is just a slice of it.
  var LIB_SPANS = null;
  function libSpans() {
    if (LIB_SPANS) return LIB_SPANS;
    var by = {};
    libLadder().forEach(function (r) {
      if (!by[r.shelf]) by[r.shelf] = { from: r.n, to: r.n, list: [] };
      by[r.shelf].to = r.n;
      by[r.shelf].list.push(r);
    });
    LIB_SPANS = by;
    return by;
  }
  function libSpan(key) { return libSpans()[key] || { from: 0, to: 0, list: [] }; }

  // Which shelf each coding-test problem belongs to — through the course unit that teaches it.
  var LIB_PROB = null;
  function libProblemShelf() {
    if (LIB_PROB) return LIB_PROB;
    var of = {}, by = {}, byUnit = libUnitShelf();
    courseUnits().forEach(function (row) {
      (row.unit.steps || []).forEach(function (st) {
        if (st.t === 'problem' && !of[st.id]) of[st.id] = byUnit[row.unit.key];
      });
    });
    pyTests().forEach(function (t) { var k = of[t.id]; if (k) (by[k] = by[k] || []).push(t); });
    LIB_PROB = { of: of, by: by };
    return LIB_PROB;
  }
  // The banks bucketed by group, built once.
  var LIB_BUCKETS = null;
  function libBuckets() {
    if (LIB_BUCKETS) return LIB_BUCKETS;
    var b = { cards: {}, quiz: {}, tasks: {} };
    snipAll().forEach(function (s2) { (b.cards[s2.group] = b.cards[s2.group] || []).push(s2); });
    pyQuiz().forEach(function (q) { (b.quiz[q.group] = b.quiz[q.group] || []).push(q); });
    (window.CODETASKS || []).forEach(function (t) { (b.tasks[t.group] = b.tasks[t.group] || []).push(t); });
    LIB_BUCKETS = b;
    return b;
  }

  /* ---- walking the ladder ---- */

  // Where you are. Kept per shelf as well as overall, so "carry on" means the right thing
  // whether you opened the library or opened one shelf.
  function getLibPos() { var n = +(localStorage.getItem('ds_lib_pos')); return isFinite(n) && n > 0 ? n : 0; }
  function setLibPos(n) { try { localStorage.setItem('ds_lib_pos', n); } catch (e) {} }
  // The next rung at or after n that is not done yet.
  function libNextUndone(from, stopAt) {
    var lad = libLadder(), end = stopAt === undefined ? lad.length : Math.min(stopAt + 1, lad.length), p = libProg();
    for (var i = Math.max(0, from); i < end; i++) if (!p[lad[i].id]) return i;
    return -1;
  }
  function libRunFrom(n) {
    var lad = libLadder();
    if (n < 0 || n >= lad.length) return libLadderEnd();
    setLibPos(n);
    var it = lad[n];
    var next = function () { libTick(it.id); libRunFrom(n + 1); };
    var back = function () { home(); };
    if (it.kind === 'read') return libReadRung(it, next, back);
    if (it.kind === 'card') return libAskRung(it, next, back);
    if (it.kind === 'quiz') return libAskRung(it, next, back);
    if (it.kind === 'term') return libAskRung(it, next, back);
    if (it.kind === 'task') { CODE_CTX = libFlow(next, back); return startCodeExample(it.key); }
    if (it.kind === 'problem') return startProblemStudy(it.pid, libFlow(next, back));
    return next();
  }
  // The context a coding drill or a problem gets when the ladder opened it.
  function libFlow(after, back) {
    return { after: after, back: back, unitKey: null, i: 0,
      backLabel: '← Library', homeLabel: 'Back to the library', writeFirst: true,
      tickLabel: 'Tick it off and carry on →', nextLabel: 'Next rung →' };
  }
  function libLadderEnd() {
    var lad = libLadder(), done = libLadderDone();
    app.innerHTML = '';
    app.appendChild(libRungBar(null, 'the end of the run'));
    var card = h('<article class="qcard code-card"><div class="q-eyebrow">That is the lot</div>' +
      '<h2 class="code-ask">You have reached the end of the library</h2>' +
      '<p class="code-why">' + done + ' of ' + lad.length + ' rungs ticked off. Nothing here ever expires — start again from the top in a few weeks and see how much is still there.</p>' +
      '<div class="next-row"><button class="btn lb-top">Back to the shelves</button>' +
      '<button class="btn ghost lb-again">Start again from rung 1</button></div></article>');
    card.querySelector('.lb-top').onclick = function () { home(); };
    card.querySelector('.lb-again').onclick = function () { setLibPos(0); libRunFrom(0); };
    app.appendChild(card);
    window.scrollTo(0, 0);
  }
  function libLadderDone() {
    var p = libProg(), n = 0;
    libLadder().forEach(function (r) { if (p[r.id]) n++; });
    return n;
  }
  // Every rung wears the same bar: where you are in the run, and the way out.
  function libRungBar(it, extra) {
    var lad = libLadder();
    var bar = h('<div class="exbar"><button class="back">← Library</button><span class="exmeta"></span></div>');
    bar.querySelector('.back').onclick = function () { home(); };
    bar.querySelector('.exmeta').innerHTML = it
      ? '<b>' + (it.n + 1) + '</b> of ' + lad.length + ' · ' + esc(libKindName(it.kind)) + (extra ? ' · ' + extra : '')
      : '<b>' + esc(extra || '') + '</b>';
    if (it) bar.appendChild(h('<div class="lb-ruler"><div style="width:' + (100 * (it.n + 1) / lad.length) + '%"></div></div>'));
    return bar;
  }

  // A reading rung: the course's own teaching, laid in front of the rungs it explains.
  function libReadRung(it, next, back) {
    var row = courseUnit(it.unitKey);
    var step = row && (row.unit.steps || [])[it.si];
    if (!step) return next();
    app.innerHTML = '';
    app.appendChild(libRungBar(it, esc(row.unit.name)));
    var card = h('<article class="qcard read-card"><div class="q-eyebrow">Read this first</div>' +
      '<h2 class="rd-title"></h2><div class="rd-body"></div>' +
      '<div class="next-row"><button class="btn lb-next">Got it — start the rungs →</button></div></article>');
    card.querySelector('.rd-title').textContent = step.title || row.unit.name;
    renderReadBody(card.querySelector('.rd-body'), step.body || []);
    card.querySelector('.lb-next').onclick = next;
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  /* A typing rung — the one format everything else in the library follows.
     Beat 1: the question WITH its answer, and why. Beat 2: the question alone.
     Beat 3: you type it, and it is marked. Cards and output questions share this
     screen exactly; coding tasks and problems keep their own editors because they
     need the piece-checker and the Python runtime, but follow the same three beats. */
  function libAskRung(it, next, back) {
    var shape = {
      card: { src: it.card, ask: it.card && it.card.ask, answer: it.card && it.card.a,
        note: it.card && it.card.note, code: it.card && it.card.setup,
        seen: 'The line', type: 'Type the line', rate: null },
      quiz: { src: it.q, ask: it.q && (it.q.q || 'What does this code print?'), answer: it.q && it.q.correct,
        note: it.q && it.q.explain, code: it.q && it.q.code,
        seen: 'It prints', type: 'Type what it prints', rate: it.q && ('pq' + it.q.id) },
      term: { src: it.term, ask: it.term && it.term.back, answer: it.term && it.term.front,
        note: '', code: it.term && it.term.formula,
        seen: 'The term', type: 'Name the term', rate: it.term && cid(it.term.front) }
    }[it.kind];
    var card = shape.src, ask = shape.ask, answer = shape.answer, note = shape.note, code = shape.code;
    var rateId = shape.rate, typeLabel = shape.type, seenLabel = shape.seen;
    show();

    function frame(beat) {
      app.innerHTML = '';
      app.appendChild(libRungBar(it, beat));
      var el = h('<article class="qcard lb-card"><div class="q-eyebrow"><span class="lb-group"></span>' + diffTag(it.lvl || 1) + '</div>' +
        '<h2 class="lb-ask"></h2><pre class="lb-code" hidden></pre></article>');
      el.querySelector('.lb-group').textContent = it.sub || '';
      if (rateId) el.querySelector('.q-eyebrow').appendChild(rateCtl(rateId));
      el.querySelector('.lb-ask').textContent = ask;
      if (code) { var pre = el.querySelector('.lb-code'); pre.hidden = false; pre.textContent = code; }
      app.appendChild(el);
      return el;
    }
    // Beat 1 — read the answer.
    function show() {
      var el = frame('read the answer');
      var box = h('<div class="code-sol"><span class="p-label"></span><pre class="lb-ans"></pre></div>');
      box.querySelector('.p-label').textContent = seenLabel;
      box.querySelector('.lb-ans').textContent = answer;
      el.appendChild(box);
      if (note) { var n = h('<p class="lb-note"></p>'); n.textContent = note; el.appendChild(n); }
      var row = h('<div class="next-row"><button class="btn lb-go">Now type it from memory →</button>' +
        '<button class="btn ghost lb-skip">Skip this one</button></div>');
      row.querySelector('.lb-go').onclick = function () { ask2(); };
      row.querySelector('.lb-skip').onclick = next;
      el.appendChild(row);
      window.scrollTo(0, 0);
      row.querySelector('.lb-go').focus();
    }
    // Beats 2 and 3 — the question on its own, and the box you type into.
    function ask2() {
      var el = frame('type it');
      var wrap = h('<div class="lb-type"><span class="p-label"></span>' +
        '<textarea class="code-write lb-in" rows="' + (it.kind === 'quiz' ? 3 : 2) + '" spellcheck="false" ' +
        'autocapitalize="off" autocorrect="off" autocomplete="off" placeholder="from memory…"></textarea></div>');
      wrap.querySelector('.p-label').textContent = typeLabel;
      el.appendChild(wrap);
      var out = h('<div class="lb-out"></div>');
      var row = h('<div class="next-row"><button class="btn lb-check">Check</button>' +
        '<button class="btn ghost lb-show">Show me again</button></div>');
      el.appendChild(row);
      el.appendChild(out);
      var input = wrap.querySelector('.lb-in'), peeked = false, tries = 0;
      wireEditor(input, { onSubmit: check });
      input.focus();
      row.querySelector('.lb-check').onclick = check;
      row.querySelector('.lb-show').onclick = function () { peeked = true; show(); };

      function right() {
        // Each kind feeds the same progress store its own section uses, so the library
        // and the section it came from always agree about what you know.
        if (it.kind === 'card') snipMark(card.id, !peeked && tries <= 1, peeked);
        if (it.kind === 'term') recordConcept(card.front, peeked ? 'seen' : 'right');
        logActivity();
        out.innerHTML = '';
        out.appendChild(h('<div class="banner good"><span class="b-label">Right ✓</span>' +
          (peeked ? 'You looked first — you will meet this one again.' : 'Typed from memory, first go.') + '</div>'));
        var nr = h('<div class="next-row"><button class="btn lb-next">Next rung →</button></div>');
        nr.querySelector('.lb-next').onclick = next;
        out.appendChild(nr);
        row.hidden = true;
        input.disabled = true;
        nr.querySelector('.lb-next').focus();
      }
      function wrong() {
        if (it.kind === 'card') snipMark(card.id, false, peeked);
        if (it.kind === 'term') recordConcept(card.front, 'wrong');
        out.innerHTML = '';
        var b = h('<div class="banner bad"><span class="b-label">Not quite</span></div>');
        b.appendChild(document.createTextNode(note || 'Look at it again, then type it out.'));
        out.appendChild(b);
        var sol = h('<div class="code-sol"><span class="p-label"></span><pre></pre></div>');
        sol.querySelector('.p-label').textContent = seenLabel;
        sol.querySelector('pre').textContent = answer;
        out.appendChild(sol);
        var nr = h('<div class="next-row"><button class="btn lb-retry">Try typing it again</button>' +
          '<button class="btn ghost lb-next">Move on →</button></div>');
        nr.querySelector('.lb-retry').onclick = function () { peeked = true; ask2(); };
        nr.querySelector('.lb-next').onclick = next;
        out.appendChild(nr);
      }
      function check() {
        var typed = input.value;
        if (!typed.trim()) { input.focus(); return; }
        tries++;
        // Cards go through quickfire's own marker, so a near miss or a capital out of
        // place is told apart from a wrong answer, exactly as it is in the drills.
        var verdict = it.kind === 'card' ? snipCheck(card, typed)
          : it.kind === 'term' ? (termMatches(typed, answer) ? 'right' : 'wrong')
          : (outputMatches(answer, typed) ? 'right' : 'wrong');
        if (verdict === 'right') right();
        else if (verdict === 'case') nearly('Right, but Python cares about capitals. Fix the case and check again.');
        else if (verdict === 'close') nearly('One character out. Read it back and check again.');
        else wrong();
        out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      // A near miss is not a wrong answer: the answer stays hidden and you fix it.
      function nearly(msg) {
        out.innerHTML = '';
        var b = h('<div class="banner warn"><span class="b-label">So close</span></div>');
        b.appendChild(document.createTextNode(msg));
        out.appendChild(b);
        input.focus();
      }
    }
  }
  // Printed output: blank lines and trailing spaces do not count, the characters do.
  function outputMatches(expected, typed) {
    function tidy(s) {
      return String(s == null ? '' : s).replace(/\r/g, '').split('\n')
        .map(function (l) { return l.replace(/\s+$/, ''); }).join('\n').replace(/\n+$/, '').trim();
    }
    return tidy(expected) === tidy(typed);
  }

  /* ---- the library's own screens ---- */

  function renderLibrary() {
    var shelves = libShelves(), lad = libLadder();
    if (!shelves.length || !lad.length) { app.appendChild(h('<section class="code-intro"><p class="code-intro-p">The library is empty.</p></section>')); return; }
    var openKey = getLibShelf(), shelf = openKey ? libShelf(openKey) : null;
    var kind = getLibKind(), hide = getLibHide(), term = '', prog = libProg();

    var head = h('<section class="code-intro lib-head"><div class="review-eyebrow">The library</div>' +
      '<p class="code-intro-p">Everything the app can teach you, on one ladder, in the order the course teaches it. ' +
      'Every rung works the same way: <b>read the answer, then be asked the question, then type it out</b> — ' +
      'a line, a printed output, a piece of code, or a whole function run against its tests.</p>' +
      '<input class="lib-search" type="search" placeholder="Search every rung — a word, a function, a method…" autocomplete="off" spellcheck="false" aria-label="Search the library">' +
      '<div class="lib-kinds"></div>' +
      '<label class="lib-hide"><input type="checkbox" class="lib-hide-in"> Hide the rungs I have done</label></section>');
    var kindBox = head.querySelector('.lib-kinds');
    [{ k: 'all', t: 'Everything' }].concat(LIB_KINDS).forEach(function (d) {
      var b = h('<button class="lib-chip' + (d.k === kind ? ' lib-chip-on' : '') + '" type="button"></button>');
      b.textContent = d.t;
      if (d.v) b.title = d.v;
      b.onclick = function () { setLibKind(d.k); home(); };
      kindBox.appendChild(b);
    });
    head.querySelector('.lib-hide-in').checked = hide;
    head.querySelector('.lib-hide-in').onchange = function () { setLibHide(this.checked); home(); };
    app.appendChild(head);
    app.appendChild(carryOn());

    var body = h('<div class="lib-body"></div>');
    app.appendChild(body);
    var search = head.querySelector('.lib-search'), timer = null;
    search.oninput = function () {
      clearTimeout(timer);
      var v = this.value;
      timer = setTimeout(function () { term = v.trim().toLowerCase(); paint(); }, 140);
    };
    search.onkeydown = function (e) { if (e.key === 'Escape') { this.value = ''; term = ''; paint(); } };
    paint();
    window.scrollTo(0, 0);

    // The one button that matters: pick the run back up where it stopped.
    function carryOn() {
      var doneN = libLadderDone(), pct = Math.round(100 * doneN / lad.length);
      var at = libNextUndone(getLibPos());
      if (at < 0) at = libNextUndone(0);
      var sec = h('<section class="lib-carry"><div class="lib-carry-top">' +
        '<span class="lib-carry-lab"></span><span class="lib-carry-n"></span></div>' +
        '<div class="code-progbar"><span style="width:' + pct + '%"></span></div>' +
        '<div class="next-row"><button class="btn lb-carry"></button>' +
        '<button class="btn ghost lb-restart">Start again from rung 1</button></div></section>');
      sec.querySelector('.lib-carry-n').textContent = doneN + ' of ' + lad.length + ' rungs · ' + pct + '%';
      if (at < 0) {
        sec.querySelector('.lib-carry-lab').textContent = 'You have been all the way through';
        sec.querySelector('.lb-carry').textContent = 'Go round again →';
        sec.querySelector('.lb-carry').onclick = function () { setLibPos(0); libRunFrom(0); };
      } else {
        var it = lad[at], sh = libShelf(it.shelf);
        sec.querySelector('.lib-carry-lab').textContent = (doneN ? 'Carry on at rung ' : 'Start at rung ') + (at + 1) +
          (sh ? ' · ' + sh.name : '');
        sec.querySelector('.lb-carry').textContent = (doneN ? 'Carry on' : 'Start the run') + ': ' + libKindName(it.kind).toLowerCase() + ' — ' + shortTitle(it.title) + ' →';
        sec.querySelector('.lb-carry').onclick = function () { libRunFrom(at); };
      }
      sec.querySelector('.lb-restart').onclick = function () { setLibPos(0); libRunFrom(0); };
      return sec;
    }
    function shortTitle(t) { t = String(t || ''); return t.length > 46 ? t.slice(0, 44) + '…' : t; }

    function keep(r) {
      if (kind !== 'all' && r.kind !== kind) return false;
      if (hide && prog[r.id]) return false;
      if (term && (r.find || r.title || '').toLowerCase().indexOf(term) < 0) return false;
      return true;
    }
    function paint() {
      body.innerHTML = '';
      if (term) return paintSearch();
      if (shelf) return paintShelf(shelf);
      paintIndex();
    }

    // The index: every shelf as a chapter of the one run, in order.
    function paintIndex() {
      var wrap = h('<div class="lib-grid"></div>');
      shelves.forEach(function (t) {
        var span = libSpan(t.key), rungs = span.list.filter(keep);
        if (!rungs.length) return;
        var doneN = span.list.filter(function (r) { return prog[r.id]; }).length;
        var by = {};
        span.list.forEach(function (r) { by[r.kind] = (by[r.kind] || 0) + 1; });
        var card = h('<button class="lib-card" type="button">' +
          '<span class="lib-card-r"></span><span class="lib-card-t"></span><span class="lib-card-b"></span>' +
          '<span class="lib-card-tags"></span>' +
          '<span class="lib-card-bar"><span></span></span><span class="lib-card-n"></span></button>');
        card.querySelector('.lib-card-r').textContent = 'rungs ' + (span.from + 1) + '–' + (span.to + 1);
        card.querySelector('.lib-card-t').textContent = t.name;
        card.querySelector('.lib-card-b').textContent = t.blurb;
        var tags = card.querySelector('.lib-card-tags');
        LIB_KINDS.forEach(function (d) {
          if (!by[d.k]) return;
          var tag = h('<span class="lib-tag lib-tag-' + d.k + '"></span>');
          tag.textContent = by[d.k] + ' ' + d.t.toLowerCase();
          tags.appendChild(tag);
        });
        card.querySelector('.lib-card-bar span').style.width = Math.round(100 * doneN / span.list.length) + '%';
        card.querySelector('.lib-card-n').textContent = doneN + ' of ' + span.list.length + ' done';
        card.onclick = function () { setLibShelf(t.key); home(); };
        wrap.appendChild(card);
      });
      if (!wrap.children.length) {
        body.appendChild(h('<section class="code-intro"><p class="code-intro-p">Nothing matches that filter. Try <b>Everything</b>, or untick "hide the rungs I have done".</p></section>'));
        return;
      }
      body.appendChild(h('<div class="sec-label sec-sub">' + lad.length + ' rungs, ' + wrap.children.length + ' shelves' +
        '<span class="lib-sec-v">in the order the course teaches them</span></div>'));
      body.appendChild(wrap);
    }

    // One shelf: its slice of the ladder, rung by rung, in order.
    function paintShelf(t) {
      var span = libSpan(t.key), rungs = span.list.filter(keep);
      var doneN = span.list.filter(function (r) { return prog[r.id]; }).length;
      var bar = h('<div class="exbar lib-bar"><button class="back">← All shelves</button><span class="exmeta"></span></div>');
      bar.querySelector('.back').onclick = function () { setLibShelf(''); home(); };
      bar.querySelector('.exmeta').innerHTML = '<b>' + esc(t.name) + '</b>';
      body.appendChild(bar);
      var at = libNextUndone(Math.max(span.from, getLibPos() >= span.from && getLibPos() <= span.to ? getLibPos() : span.from), span.to);
      if (at < 0) at = libNextUndone(span.from, span.to);
      var intro = h('<section class="code-intro"><h2 class="cu-title"></h2><p class="code-intro-p"></p>' +
        '<div class="code-progwrap"><div class="code-progbar"><span style="width:' + Math.round(100 * doneN / span.list.length) + '%"></span></div>' +
        '<span class="code-intro-count"><b>' + doneN + '</b> of ' + span.list.length + ' rungs</span></div>' +
        '<div class="next-row"><button class="btn lb-shelf-go"></button></div></section>');
      intro.querySelector('.cu-title').textContent = t.name;
      intro.querySelector('.code-intro-p').textContent = t.blurb;
      var go = intro.querySelector('.lb-shelf-go');
      if (at < 0) { go.textContent = 'Run this shelf again from the top →'; go.onclick = function () { libRunFrom(span.from); }; }
      else { go.textContent = (doneN ? 'Carry on at rung ' : 'Start at rung ') + (at + 1) + ' →'; go.onclick = function () { libRunFrom(at); }; }
      body.appendChild(intro);
      if (!rungs.length) {
        body.appendChild(h('<section class="code-intro"><p class="code-intro-p">No rung on this shelf matches the filter.</p></section>'));
      }
      // The list is a way in, not the way through — the run itself is the Carry on button.
      // So show a window of it around where you are rather than all several hundred rows.
      var WINDOW = 60, start = 0;
      if (rungs.length > WINDOW && at >= 0) {
        rungs.forEach(function (r, k) { if (r.n <= at) start = k; });
        start = Math.max(0, Math.min(start, rungs.length - WINDOW));
      }
      if (start > 0) body.appendChild(h('<div class="lib-more">' + start + ' earlier rungs on this shelf — search for one, or filter by kind, to reach it</div>'));
      rungs.slice(start, start + WINDOW).forEach(function (r) { body.appendChild(libRow(r)); });
      if (rungs.length > start + WINDOW) {
        body.appendChild(h('<div class="lib-more">…and ' + (rungs.length - start - WINDOW) + ' more rungs after these</div>'));
      }
      var jump = h('<div class="next-row lib-jump"></div>');
      var i = 0;
      shelves.forEach(function (x, n) { if (x.key === t.key) i = n; });
      if (i > 0) {
        var prev = h('<button class="btn ghost"></button>');
        prev.textContent = '← ' + shelves[i - 1].name;
        prev.onclick = function () { setLibShelf(shelves[i - 1].key); home(); };
        jump.appendChild(prev);
      }
      if (i < shelves.length - 1) {
        var nx = h('<button class="btn"></button>');
        nx.textContent = shelves[i + 1].name + ' →';
        nx.onclick = function () { setLibShelf(shelves[i + 1].key); home(); };
        jump.appendChild(nx);
      }
      body.appendChild(jump);
    }

    // Searching runs across the whole ladder and says which shelf each rung is on.
    function paintSearch() {
      var hits = 0;
      var note = h('<div class="sec-label sec-sub lib-hits"></div>');
      body.appendChild(note);
      shelves.forEach(function (t) {
        var group = libSpan(t.key).list.filter(keep);
        if (!group.length) return;
        var head2 = h('<button class="lib-shelfhead" type="button"></button>');
        head2.textContent = t.name + '  ·  ' + group.length;
        head2.onclick = function () { setLibShelf(t.key); search.value = ''; term = ''; paint(); };
        body.appendChild(head2);
        group.slice(0, 24).forEach(function (r) { body.appendChild(libRow(r)); hits++; });
        if (group.length > 24) body.appendChild(h('<div class="lib-more">…and ' + (group.length - 24) + ' more on this shelf</div>'));
      });
      note.textContent = hits ? hits + ' rungs match “' + term + '”' : 'Nothing matches “' + term + '”';
    }

    // One rung in a list. Tapping it starts the run from there.
    function libRow(r) {
      var done = !!prog[r.id];
      var row = h('<div class="lib-row lib-row-' + r.kind + (done ? ' lib-row-done' : '') + '">' +
        '<button class="lib-row-main" type="button"><span class="lib-row-mark"></span>' +
        '<span class="lib-row-text"><span class="lib-row-t"></span><span class="lib-row-s"></span></span>' +
        '<span class="lib-row-n"></span></button></div>');
      row.querySelector('.lib-row-mark').textContent = done ? '✓' : '';
      row.querySelector('.lib-row-t').textContent = shortTitle(r.title);
      row.querySelector('.lib-row-s').textContent = (r.n + 1) + ' · ' + (r.sub || '');
      row.querySelector('.lib-row-n').innerHTML = '<span class="lib-kindtag lib-tag-' + r.kind + '">' + esc(libKindName(r.kind)) + '</span>' +
        (r.lvl ? diffTag(r.lvl) : '');
      row.querySelector('.lib-row-main').onclick = function () { libRunFrom(r.n); };
      return row;
    }
  }

  function renderCodeHome() {
    var door = getCodeDoor();
    var nav = h('<nav class="home-doors doors-4" role="tablist"></nav>');
    [{ v: 'quick', t: 'Quickfire', s: 'Type the line, from memory' },
     { v: 'practice', t: 'Practice', s: 'The tasks, four levels each' },
     { v: 'reference', t: 'Reference', s: 'Every solution, searchable' },
     { v: 'dashboard', t: 'Dashboard', s: 'Progress & next up' }].forEach(function (d) {
      var b = h('<button class="door' + (d.v === door ? ' door-on' : '') + '" type="button" role="tab"><span class="door-t"></span><span class="door-s"></span></button>');
      b.querySelector('.door-t').textContent = d.t;
      b.querySelector('.door-s').textContent = d.s;
      b.onclick = function () { setCodeDoor(d.v); home(); };
      nav.appendChild(b);
    });
    app.appendChild(nav);
    if (door === 'quick') return renderCodeQuick();
    if (door === 'reference') return renderCodeReference();
    if (door === 'dashboard') return renderCodeDashboard();
    renderCodeTasks();
  }
  // Reference: the crib sheet — an import map plus every task's solution, collapsible and searchable.
  function renderCodeReference() {
    var tasks = codeTasksFiltered(), g = codeGroups(tasks);
    // Search box, filtering tasks by title / ask / code; difficulty chips share the Practice filter.
    var searchCard = h('<section class="code-intro"><div class="review-eyebrow">Code reference</div>' +
      '<p class="code-intro-p">Every task\'s model solution in one place. Search it, or open a task to read the code — then jump to its worked example.</p>' +
      '<input class="cref-search" type="search" placeholder="Search the code… e.g. stratify, predict_proba, KFold" autocomplete="off"></section>');
    searchCard.appendChild(codeDiffChips());
    var searchIn = searchCard.querySelector('.cref-search');
    app.appendChild(searchCard);
    // Import map: every import line used anywhere, deduplicated — "where everything lives".
    var imports = {};
    tasks.forEach(function (t) {
      (t.written.solution + '\n' + t.lines.join('\n')).split('\n').forEach(function (ln) {
        var s = ln.trim();
        if (/^(from|import)\s/.test(s) && s.indexOf('#') < 0) imports[s] = 1;
      });
    });
    var impCard = h('<section class="cref-item cref-imports"><details><summary><span class="cref-title">The import map — where everything lives</span><span class="cref-group">' + Object.keys(imports).length + ' imports</span></summary><pre class="cref-code"></pre></details></section>');
    impCard.querySelector('pre').textContent = Object.keys(imports).sort().join('\n');
    impCard._hay = ('import map where everything lives ' + Object.keys(imports).join(' ')).toLowerCase();
    app.appendChild(impCard);
    // One collapsible entry per task, grouped.
    var entries = [impCard];
    g.order.forEach(function (grp) {
      var head = h('<div class="sec-label sec-sub">' + esc(grp) + '</div>');
      app.appendChild(head);
      var groupEntries = [];
      g.by[grp].forEach(function (t) {
        var item = h('<section class="cref-item"><details><summary><span class="cref-title"></span><span class="cref-group">' + diffTag(t.lvl || 2) + '</span></summary>' +
          '<p class="cref-why"></p><pre class="cref-code"></pre>' +
          '<div class="next-row"><button class="btn ghost cref-see">Worked example →</button></div></details></section>');
        item.querySelector('.cref-title').textContent = t.title;
        item.querySelector('.cref-why').textContent = t.why;
        item.querySelector('.cref-code').textContent = t.written.solution;
        item.querySelector('.cref-see').onclick = function () { startCodeExample(t.key); };
        item._hay = (t.title + ' ' + t.ask + ' ' + t.why + ' ' + t.written.solution + ' ' + t.lines.join(' ')).toLowerCase();
        app.appendChild(item);
        entries.push(item); groupEntries.push(item);
      });
      head._entries = groupEntries;
      entries.push(head);
    });
    searchIn.oninput = function () {
      var q = searchIn.value.trim().toLowerCase();
      entries.forEach(function (el) {
        if (el._entries) {   // group heading: show if any of its tasks match
          el.style.display = (q && !el._entries.some(function (it) { return it._hay.indexOf(q) >= 0; })) ? 'none' : '';
        } else if (el._hay) {
          var hit = !q || el._hay.indexOf(q) >= 0;
          el.style.display = hit ? '' : 'none';
          el.querySelector('details').open = !!q && hit;   // auto-open matches, collapse on clear
        }
      });
    };
  }
  // Dashboard: level-by-level progress, per-group bars, and the next thing to do.
  function renderCodeDashboard() {
    // Quickfire first — it is the biggest thing in this mode by card count.
    var qAll = snipAll();
    if (qAll.length) {
      var qs = snipStats(qAll);
      var qcard = h('<section class="code-intro"><div class="review-eyebrow">Quickfire recall</div>' +
        '<div class="code-progwrap"><div class="code-progbar"><span style="width:' + qs.pct + '%"></span></div>' +
        '<span class="code-intro-count"><b>' + qs.pct + '%</b> of ' + qAll.length + ' cards</span></div>' +
        '<div class="mast-badges cdash-badges">' +
          '<span class="mb mb-learnt"><b>' + qs.solid + '</b> solid</span>' +
          '<span class="mb mb-learning"><b>' + qs.known + '</b> getting there</span>' +
          '<span class="mb mb-strug"><b>' + qs.shaky + '</b> shaky</span>' +
          '<span class="mb mb-new"><b>' + qs["new"] + '</b> not seen</span>' +
        '</div>' +
        '<div class="next-row"><button class="btn ghost cdash-qf">' + (qs.shaky ? 'Drill my ' + qs.shaky + ' shaky cards →' : 'Start a quickfire round →') + '</button></div></section>');
      qcard.querySelector('.cdash-qf').onclick = function () {
        var round = buildQuickRound(qAll, getQuickSize(), qs.shaky ? 'shaky' : null);
        startQuick(round.length ? round : buildQuickRound(qAll, getQuickSize()), qs.shaky ? 'weak spots' : 'mixed');
      };
      app.appendChild(qcard);
    }
    var tasks = window.CODETASKS || [], prog = codeProg(), g = codeGroups();
    var totLevels = tasks.length * 3, doneLevels = 0, full = 0, started = 0;
    var byLevel = { 1: 0, 2: 0, 3: 0 };
    tasks.forEach(function (t) {
      var p = prog[t.key] || {}, d = codeLevelsDone(p);
      doneLevels += d; if (d === 3) full++; else if (d > 0) started++;
      for (var L = 1; L <= 3; L++) if (p[L]) byLevel[L]++;
    });
    var pct = totLevels ? Math.round(100 * doneLevels / totLevels) : 0;
    // Headline: overall bar + the three key counts.
    app.appendChild(h('<section class="code-intro"><div class="review-eyebrow">Coding progress</div>' +
      '<div class="code-progwrap"><div class="code-progbar"><span style="width:' + pct + '%"></span></div>' +
      '<span class="code-intro-count"><b>' + pct + '%</b> of all levels</span></div>' +
      '<div class="mast-badges cdash-badges">' +
        '<span class="mb mb-learnt"><b>' + full + '</b> complete</span>' +
        '<span class="mb mb-learning"><b>' + started + '</b> in progress</span>' +
        '<span class="mb mb-new"><b>' + (tasks.length - full - started) + '</b> not started</span>' +
      '</div></section>'));
    // Per-level bars: how far through Spot / Build / Write across all tasks.
    var lv = h('<section class="mastery-card"><div class="review-eyebrow">By level</div><div class="cdash-levels"></div></section>');
    var lvHost = lv.querySelector('.cdash-levels');
    [{ L: 1, name: '1 · Spot it' }, { L: 2, name: '2 · Build it' }, { L: 3, name: '3 · Write it' }].forEach(function (x) {
      var n = byLevel[x.L], p = tasks.length ? Math.round(100 * n / tasks.length) : 0;
      lvHost.appendChild(h('<div class="cdash-lrow"><span class="cdash-lname">' + x.name + '</span>' +
        '<div class="code-progbar"><span style="width:' + p + '%"></span></div>' +
        '<span class="cdash-lcount">' + n + '/' + tasks.length + '</span></div>'));
    });
    app.appendChild(lv);
    // By difficulty: how far through L1/L2/L3 tasks (fully completed).
    var dv = h('<section class="mastery-card"><div class="review-eyebrow">By difficulty</div><div class="cdash-levels"></div></section>');
    var dvHost = dv.querySelector('.cdash-levels');
    [{ d: 1, name: 'L1 · foundations' }, { d: 2, name: 'L2 · practice' }, { d: 3, name: 'L3 · advanced' }].forEach(function (x) {
      var ts = tasks.filter(function (t) { return (t.lvl || 2) === x.d; });
      var f = ts.reduce(function (n, t) { return n + (codeLevelsDone(prog[t.key] || {}) === 3 ? 1 : 0); }, 0);
      var p = ts.length ? Math.round(100 * f / ts.length) : 0;
      dvHost.appendChild(h('<div class="cdash-lrow"><span class="cdash-lname cdash-wide">' + x.name + '</span>' +
        '<div class="code-progbar"><span style="width:' + p + '%"></span></div>' +
        '<span class="cdash-lcount">' + f + '/' + ts.length + '</span></div>'));
    });
    app.appendChild(dv);
    // Per-group mastery bars, clickable through to practice.
    var gc = h('<section class="mastery-card"><div class="review-eyebrow">By group</div><div class="mm-list"></div></section>');
    var list = gc.querySelector('.mm-list');
    g.order.forEach(function (grp) {
      var ts = g.by[grp], f = 0, s = 0;
      ts.forEach(function (t) { var d = codeLevelsDone(prog[t.key] || {}); if (d === 3) f++; else if (d > 0) s++; });
      var n = ts.length, u = n - f - s;
      function seg(cls, v) { return v ? '<span class="mm-seg ' + cls + '" style="flex:' + v + '"></span>' : ''; }
      var row = h('<button class="mm-row"><div class="mm-rowhead"><span class="mm-name">' + esc(grp) + '</span>' +
        '<span class="mm-pct">' + f + '/' + n + '</span></div>' +
        '<span class="mm-bar">' + seg('mm-learnt', f) + seg('mm-learning', s) + seg('mm-new', u) + '</span></button>');
      row.onclick = function () { setCodeDoor('practice'); home(); };
      list.appendChild(row);
    });
    app.appendChild(gc);
    // Next up: the first unfinished level, one tap away.
    var next = null;
    g.order.forEach(function (grp) {
      if (next) return;
      g.by[grp].forEach(function (t) {
        if (next || isDisId('t' + t.key)) return;
        var p = prog[t.key] || {};
        for (var L = 1; L <= 3; L++) if (!p[L]) { next = { t: t, L: L }; return; }
      });
    });
    if (next) {
      var names = { 1: 'Spot it', 2: 'Build it', 3: 'Write it' };
      var nu = h('<section class="fav-card"><div class="fav-info"><span class="fav-star">→</span>' +
        '<div><div class="fav-title">Next up</div><div class="fav-sub"></div></div></div>' +
        '<button class="btn nu-go">Start →</button></section>');
      nu.querySelector('.fav-sub').textContent = next.t.title + ' · Level ' + next.L + ' (' + names[next.L] + ')';
      nu.querySelector('.nu-go').onclick = function () { startCodeLevel(next.t.key, next.L); };
      app.appendChild(nu);
    } else {
      app.appendChild(h('<section class="fav-card"><div class="fav-info"><span class="fav-star">★</span>' +
        '<div><div class="fav-title">All 3 levels done on every task</div><div class="fav-sub">Random drill keeps them fresh — or come back after new tasks land.</div></div></div></section>'));
    }
  }
  // "Know the knobs": one page per model listing every hyperparameter — what it
  // means and what it does. The first breakdown on the Coding practice page.
  function showCodeHparams(idx) {
    var all = window.CODE_HPARAMS || [];
    var m = all[idx]; if (!m) return;
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back">' + homeWord('← Coding') + '</button><span class="exmeta">Know the knobs · <b>' + (idx + 1) + '</b> of ' + all.length + '</span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);
    var card = h('<article class="qcard hparam-card">' +
      '<div class="q-top"><div class="q-eyebrow">Hyperparameters · ' + esc(m.model) + '</div></div>' +
      '<h2 class="code-ask"></h2><p class="code-why"></p>' +
      '<div class="code-sol"><span class="p-label">The signature</span><pre></pre></div>' +
      '<div class="hp-list"></div></article>');
    card.querySelector('.q-top').appendChild(rateCtl('h' + m.key));
    card.querySelector('.code-ask').textContent = m.cls;
    card.querySelector('.code-why').textContent = m.intro;
    card.querySelector('.code-sol pre').textContent = m.imp + '\n' + m.sig;
    var list = card.querySelector('.hp-list');
    m.params.forEach(function (p) {
      var row = h('<div class="hp-row"><div class="hp-head"><code class="hp-name"></code><span class="hp-def"></span></div>' +
        '<p class="hp-txt hp-means"><b>What it means</b> <span></span></p>' +
        '<p class="hp-txt hp-does"><b>What it does</b> <span></span></p></div>');
      row.querySelector('.hp-name').textContent = p.name;
      row.querySelector('.hp-def').textContent = 'default: ' + p.def;
      row.querySelector('.hp-means span').textContent = p.means;
      row.querySelector('.hp-does span').textContent = p.does;
      list.appendChild(row);
    });
    var prev = all[(idx - 1 + all.length) % all.length], next = all[(idx + 1) % all.length];
    var nav = h('<div class="next-row"><button class="btn ghost hp-prev">← ' + esc(prev.model) + '</button>' +
      '<button class="btn hp-next">' + esc(next.model) + ' →</button></div>');
    nav.querySelector('.hp-prev').onclick = function () { showCodeHparams((idx - 1 + all.length) % all.length); };
    nav.querySelector('.hp-next').onclick = function () { showCodeHparams((idx + 1) % all.length); };
    card.appendChild(nav);
    app.appendChild(card);
    window.scrollTo(0, 0);
  }
  // The practice door: every task with its four levels and their done-states.
  function renderCodeTasks() {
    var prog = codeProg();
    var tasks = codeTasksFiltered();
    var diffLabel = getCodeDiff() ? ' at this difficulty' : '';
    var doneCount = tasks.reduce(function (n, t) { var p = prog[t.key] || {}; return n + (p[1] && p[2] && p[3] ? 1 : 0); }, 0);
    var intro = h('<section class="code-intro"><div class="review-eyebrow">How this works</div>' +
      '<p class="code-intro-p">Each task is one small piece of real code. Learn it in four short steps, easiest first:</p>' +
      '<ol class="hiw-steps">' +
        '<li class="hiw-step"><span class="hiw-badge">👀</span><div class="hiw-text"><b>See it</b>' +
          '<span class="hiw-sub">Just read. The finished code, with every line explained in plain English.</span></div></li>' +
        '<li class="hiw-step"><span class="hiw-badge">1</span><div class="hiw-text"><b>Spot it</b>' +
          '<span class="hiw-sub">Pick the correct code out of a few lookalikes.</span></div></li>' +
        '<li class="hiw-step"><span class="hiw-badge">2</span><div class="hiw-text"><b>Build it</b>' +
          '<span class="hiw-sub">Tap the lines into the order they should run.</span></div></li>' +
        '<li class="hiw-step"><span class="hiw-badge">3</span><div class="hiw-text"><b>Write it</b>' +
          '<span class="hiw-sub">Type it yourself — marked kindly, only on the parts that matter.</span></div></li>' +
      '</ol>' +
      '<p class="hiw-tip">New here? Open any task below and start with <b>See it</b>. A green ✓ means a level is done; finish levels 1–3 to complete the task.</p>' +
      '<div class="code-progwrap"><div class="code-progbar"><span style="width:' + (tasks.length ? Math.round(100 * doneCount / tasks.length) : 0) + '%"></span></div>' +
      '<span class="code-intro-count"><b>' + doneCount + '</b> of ' + tasks.length + ' tasks' + diffLabel + '</span></div>' +
      '<div class="next-row"><button class="btn code-go">Carry on the path →</button>' +
      '<button class="btn ghost code-drill">Random drill</button></div>' +
      '<p class="cc-what code-nextline"></p></section>');
    // Where tasks open — including straight at the keyboard.
    var startRow = h('<div class="code-diff-row"><span class="filt-lab">Tasks open at</span></div>');
    [{ v: 'see', t: 'See it' }, { v: 'spot', t: 'Spot it' }, { v: 'build', t: 'Build it' }, { v: 'write', t: 'Write it' }].forEach(function (c) {
      var b = h('<button class="cdf-chip' + (getCodeStart() === c.v ? ' cdf-on' : '') + '" type="button" title="Open every task at this level"></button>');
      b.textContent = c.t;
      b.onclick = function () { setCodeStart(c.v); home(); };
      startRow.appendChild(b);
    });
    intro.appendChild(startRow);
    // Carry on: the first level you have not finished, in stage order.
    var nextUp = codeNext(tasks);
    var goBtn = intro.querySelector('.code-go'), nextLine = intro.querySelector('.code-nextline');
    if (nextUp) {
      nextLine.textContent = nextUp.task.group + ' · ' + nextUp.task.title + '  ·  level ' + nextUp.level +
        ' (' + ['spot it', 'build it', 'write it'][nextUp.level - 1] + ')';
      goBtn.onclick = function () { startCodeTask(nextUp.task.key, nextUp.level); };
    } else {
      goBtn.textContent = 'Every level done ✓';
      nextLine.textContent = 'The whole path is finished. Random drill keeps it fresh.';
      goBtn.onclick = function () { intro.querySelector('.code-drill').click(); };
    }
    intro.appendChild(codeDiffChips());
    // Random drill: jump straight into a level you haven't completed yet (least-done tasks first).
    intro.querySelector('.code-drill').onclick = function () {
      // Disliked tasks sit the drill out; if any favourites still have work, draw from those first.
      var drillable = tasks.filter(function (t) { return !isDisId('t' + t.key); });
      if (!drillable.length) drillable = tasks;
      var todo = [];
      drillable.forEach(function (t) {
        var p = prog[t.key] || {};
        for (var L = 1; L <= 3; L++) if (!p[L]) todo.push({ key: t.key, l: L, fav: isFavId('t' + t.key) });
      });
      if (!todo.length) drillable.forEach(function (t) { todo.push({ key: t.key, l: 1 + Math.floor(Math.random() * 3), fav: isFavId('t' + t.key) }); });
      var favTodo = todo.filter(function (x) { return x.fav; });
      if (favTodo.length) todo = favTodo;
      var pick = todo[Math.floor(Math.random() * todo.length)];
      if (pick.l === 1) startCodeMCQ(pick.key); else if (pick.l === 2) startCodeOrder(pick.key); else startCodeWrite(pick.key);
    };
    app.appendChild(intro);
    // First breakdown: the hyperparameter guide — get familiar with every model's
    // knobs (what they mean, what they do) before drilling the code that sets them.
    var hp = window.CODE_HPARAMS || [];
    if (hp.length) {
      var hpSec = h('<section class="code-intro hp-guide"><div class="review-eyebrow">Know the knobs</div>' +
        '<p class="code-intro-p"><b>Hyperparameter guide</b> — every model\'s dials: what each one means, what it does, and which way to turn it. Read a model\'s knobs before you drill its code.</p>' +
        '<div class="cmp-chips hp-chips"></div></section>');
      var hpChips = hpSec.querySelector('.hp-chips');
      hp.forEach(function (mm, i) {
        var chip = h('<button class="cmp-chip" type="button"></button>');
        chip.textContent = mm.model;
        chip.onclick = function () { showCodeHparams(i); };
        hpChips.appendChild(chip);
      });
      app.appendChild(hpSec);
    }
    // Bucket by group, earliest stage first — the practice list IS the path.
    var grouped = codeGroups(tasks), groupOrder = grouped.order, byGroup = grouped.by;
    var ordered = [];
    groupOrder.forEach(function (g) { byGroup[g].forEach(function (t) { ordered.push(t); }); });
    function groupDoneCount(g) {
      return byGroup[g].reduce(function (n, t) { var p = prog[t.key] || {}; return n + (p[1] && p[2] && p[3] ? 1 : 0); }, 0);
    }
    var lastGroup = null;
    ordered.forEach(function (t) {
      if (t.group !== lastGroup) {
        var gd = groupDoneCount(t.group), gn = byGroup[t.group].length;
        app.appendChild(h('<div class="sec-label sec-sub code-group-head">' + esc(t.group) +
          '<span class="cg-count' + (gd === gn ? ' cg-full' : '') + '">' + gd + '/' + gn + (gd === gn ? ' ✓' : '') + '</span></div>'));
        lastGroup = t.group;
      }
      var p = prog[t.key] || {};
      var row = h('<section class="code-task">' +
        '<div class="ct-head"><h3></h3><span class="ct-meta">' + diffTag(t.lvl || 2) + '<span class="ct-done">' + (p[1] && p[2] && p[3] ? ' ✓ complete' : '') + '</span></span></div>' +
        '<p class="ct-ask"></p>' +
        '<div class="ct-levels">' +
          '<button class="btn ghost ct-l ct-see" data-l="0">See it</button>' +
          '<button class="btn ghost ct-l' + (p[1] ? ' ct-ok' : '') + '" data-l="1">' + (p[1] ? '✓ ' : '') + '1 · Spot it</button>' +
          '<button class="btn ghost ct-l' + (p[2] ? ' ct-ok' : '') + '" data-l="2">' + (p[2] ? '✓ ' : '') + '2 · Build it</button>' +
          '<button class="btn ghost ct-l' + (p[3] ? ' ct-ok' : '') + '" data-l="3">' + (p[3] ? '✓ ' : '') + '3 · Write it</button>' +
        '</div></section>');
      var titleBtn = h('<button class="ct-title-go" type="button"></button>');
      titleBtn.textContent = t.title;
      titleBtn.title = 'Open this task at your chosen level';
      titleBtn.onclick = function () { startCodeTask(t.key); };
      row.querySelector('h3').appendChild(titleBtn);
      row.querySelector('.ct-meta').appendChild(rateCtl('t' + t.key));
      row.querySelector('.ct-ask').textContent = t.ask;
      row.querySelectorAll('.ct-l').forEach(function (b) {
        b.onclick = function () {
          var L = +b.getAttribute('data-l');
          if (L === 0) startCodeExample(t.key); else if (L === 1) startCodeMCQ(t.key); else if (L === 2) startCodeOrder(t.key); else startCodeWrite(t.key);
        };
      });
      app.appendChild(row);
    });
  }

  function home() {
    stopMockTimer();
    CODE_CTX = null;
    PT_RANDOM = null;
    app.innerHTML = '';
    var mast = h(
      '<header class="masthead">' +
        '<div class="mast-rules"></div>' +
        '<div class="mast-eyebrow"><span>A field manual for practical machine learning</span><span class="mast-tools">' +
          '<button class="mt-btn mt-fav" type="button" title="Your saved favourites"></button>' +
          '<button class="mt-btn mt-key" type="button" title="Connect Claude"></button>' +
          '<button class="mt-btn mt-theme" type="button" title="Theme"></button>' +
          '<button class="mt-btn mt-font" type="button" title="Text size"></button></span></div>' +
        '<h1>DataSense</h1>' +
        '<p class="mast-sub"><b>Machine learning</b>, learned by doing: ' + totalExercises() + ' exercises across supervised classification, clustering and dimensionality reduction. Miss one and you get the answer in plain English, a lab bench, a quick check, and a second attempt.</p>' +
        '<div class="mast-foot">Multiple choice · questions & answers shuffle on every sitting · progress kept in this browser</div>' +
      '</header>');
    var themeBtn = mast.querySelector('.mt-theme'), fontBtn = mast.querySelector('.mt-font'), keyBtn = mast.querySelector('.mt-key'), favBtnM = mast.querySelector('.mt-fav');
    function themeLabel() { var t = getTheme(); themeBtn.textContent = t === 'auto' ? '◐ auto' : (t === 'light' ? '☀ light' : '☾ dark'); }
    function fontLabel() { fontBtn.textContent = ['A', 'A+', 'A++'][getFont()]; }
    function keyLabel() { keyBtn.textContent = '⚙ Settings'; keyBtn.classList.toggle('mt-on', !!apiKey()); }
    function favLabelM() { var n = favCount(); favBtnM.textContent = n ? '★ Favourites · ' + n : '☆ Favourites'; favBtnM.classList.toggle('mt-on', n > 0); }
    themeLabel(); fontLabel(); keyLabel(); favLabelM();
    themeBtn.onclick = function () { setTheme(getTheme() === 'auto' ? 'light' : getTheme() === 'light' ? 'dark' : 'auto'); themeLabel(); };
    fontBtn.onclick = function () { setFont((getFont() + 1) % 3); fontLabel(); };
    keyBtn.onclick = openSettings;
    favBtnM.onclick = function () {
      if (favQuestions().length) { startFavourites(); return; }
      favBtnM.textContent = 'Tap ☆ on any question first';
      setTimeout(favLabelM, 1700);
    };
    var MODE = getMode();
    if (MODE === 'code') {
      mast.querySelector('.mast-sub').innerHTML = '<b>Coding, unscrambled</b>: quickfire recall — one small ask, one line typed from memory — plus every task in three steps: spot the right code, build it from blocks, then write it yourself.';
      mast.querySelector('.mast-foot').textContent = 'Data-science code only · progress kept in this browser';
    } else if (MODE === 'course') {
      mast.querySelector('.mast-sub').innerHTML = '<b>The course</b>: one path, in order — from what a variable is, through pandas and scikit-learn, to sitting a timed Python test. Read the idea, drill the lines, then use them on a real problem.';
      mast.querySelector('.mast-foot').textContent = 'Take it in order · progress kept in this browser';
    } else if (MODE === 'ptest') {
      mast.querySelector('.mast-sub').innerHTML = '<b>Python coding tests</b>: the hiring-test half of the platform. Real problems, a real interpreter running in your browser, hidden test cases and a countdown clock.';
      mast.querySelector('.mast-foot').textContent = 'Practice · timed mocks · output quiz · progress kept in this browser';
    } else if (MODE === 'lib') {
      mast.querySelector('.mast-sub').innerHTML = '<b>The library</b>: everything the app can teach you, on one ladder, in the order the course teaches it. Every rung works the same way: <b>read the answer, then be asked the question, then type it out</b> — a line, a printed output, a piece of code, a whole function, or a term.';
      mast.querySelector('.mast-foot').textContent = 'One format, start to finish · your place is kept in this browser';
    } else if (MODE === 'work') {
      mast.querySelector('.mast-sub').innerHTML = '<b>Innovation vocabulary</b> for the day job: digital assets, payments & fintech, and the AWS words everyone assumes you know. Same drills — quiz, flashcards, read + recall.';
      mast.querySelector('.mast-foot').textContent = 'FCA & innovation topics · progress kept in this browser';
    }
    app.appendChild(mast);

    // Mode switch: Data Science revision · Coding drills · FCA & Innovation vocabulary.
    var tabs = h('<nav class="mode-tabs" aria-label="App mode"></nav>');
    [{ v: 'lib', t: 'Library' }, { v: 'course', t: 'Course' }, { v: 'ds', t: 'Data Science' }, { v: 'code', t: 'Coding' }, { v: 'ptest', t: 'Python tests' }, { v: 'work', t: 'FCA & Innovation' }].forEach(function (m) {
      var b = h('<button class="mode-tab' + (m.v === MODE ? ' mode-on' : '') + '" type="button"></button>');
      b.textContent = m.t;
      b.onclick = function () { if (m.v !== getMode()) { setMode(m.v); home(); } };
      tabs.appendChild(b);
    });
    app.appendChild(tabs);

    if (MODE === 'lib') { renderLibrary(); return; }
    if (MODE === 'course') { renderCourseHome(); return; }
    if (MODE === 'code') { renderCodeHome(); return; }
    if (MODE === 'ptest') { renderTestHome(); return; }

    // Three tabs: Study (learn + practice, one picker), Reference (look things up), Dashboard (all metrics).
    var door = getHomeDoor();
    renderDoors(door);
    if (door === 'reference') {
      renderSearch();
      renderNotes();
      renderCompares();
    } else if (door === 'dashboard') {
      renderDashboard();
    } else {
      renderStudy();
      renderPractice();
      renderFavourites();
      renderContents();
    }

    function renderDoors(active) {
      var defs = [
        { v: 'study', t: 'Study', s: 'Learn & practice, every mode' },
        { v: 'reference', t: 'Reference', s: 'Notes · compare · search' },
        { v: 'dashboard', t: 'Dashboard', s: 'Progress & metrics' }
      ];
      var nav = h('<nav class="home-doors" role="tablist"></nav>');
      defs.forEach(function (d) {
        var b = h('<button class="door' + (d.v === active ? ' door-on' : '') + '" type="button" role="tab"><span class="door-t"></span><span class="door-s"></span></button>');
        b.querySelector('.door-t').textContent = d.t;
        b.querySelector('.door-s').textContent = d.s;
        b.onclick = function () { setHomeDoor(d.v); home(); };
        nav.appendChild(b);
      });
      app.appendChild(nav);
    }

    // Dashboard tab: a compact strip of headline numbers up top (small space, lots of metrics),
    // then the bigger visuals — mastery map, consistency heatmap, and badges.
    function renderDashboard() {
      var cards = loadCards(), ids = Object.keys(cards), sum = masterySummary();
      var total = sum.learnt + sum.ready + sum.learning + sum.struggling + sum.new;
      var attempts = 0, wrong = 0, written = 0;
      ids.forEach(function (id) { var r = cards[id]; attempts += (r.seen || 0); wrong += (r.wrong || 0); if (r.wrote) written++; });
      var acc = attempts ? Math.round(100 * (attempts - wrong) / attempts) : 0;
      var pct = total ? Math.round(100 * (sum.learnt + sum.ready * 0.7 + sum.learning * 0.35 + sum.struggling * 0.15) / total) : 0;
      var act = loadActivity(), end = new Date(); end.setHours(0, 0, 0, 0);
      var d = new Date(end); if (!act[fmtDay(d)]) d.setDate(d.getDate() - 1);
      var cur = 0; while (act[fmtDay(d)]) { cur++; d.setDate(d.getDate() - 1); }
      var days = Object.keys(act).sort(), best = 0, run = 0, prev = null;
      days.forEach(function (ds) { if (prev && (Date.parse(ds) - Date.parse(prev)) === 86400000) run++; else run = 1; if (run > best) best = run; prev = ds; });
      // Progress ring: a donut of the mastery composition with overall progress % in the centre.
      var R = 56, CIRC = 2 * Math.PI * R, arcAcc = 0, arcs = '';
      [{ c: sum.learnt, k: 'a-learnt' }, { c: sum.ready, k: 'a-ready' }, { c: sum.learning, k: 'a-learning' }, { c: sum.strug || sum.struggling, k: 'a-strug' }, { c: sum.new, k: 'a-new' }].forEach(function (s) {
        if (!s.c) return;
        var frac = s.c / (total || 1), len = frac * CIRC, gap = len > 8 ? 2.5 : 0, shown = Math.max(0.4, len - gap);
        arcs += '<circle class="ring-arc ' + s.k + '" r="' + R + '" cx="75" cy="75" fill="none" stroke-width="15" transform="rotate(-90 75 75)" ' +
          'stroke-dasharray="' + shown + ' ' + (CIRC - shown) + '" stroke-dashoffset="' + (-arcAcc * CIRC) + '"></circle>';
        arcAcc += frac;
      });
      var ring = '<svg class="ring-svg" viewBox="0 0 150 150" aria-hidden="true">' +
        '<circle class="ring-track" r="' + R + '" cx="75" cy="75" fill="none" stroke-width="15"></circle>' + arcs + '</svg>';
      function stat(num, lab, cls) { return '<div class="dh-stat ' + (cls || '') + '"><b>' + num + '</b><span>' + lab + '</span></div>'; }
      function leg(k, n, lab) { return '<span class="dh-leg"><i class="mm-dot ' + k + '"></i><b>' + n + '</b> ' + lab + '</span>'; }
      function ks(num, lab) { return '<div class="ks"><span class="ks-n">' + num + '</span><span class="ks-l">' + lab + '</span></div>'; }
      app.appendChild(h('<section class="dash-hero">' +
        '<div class="dh-ringwrap">' + ring + '<div class="dh-center"><span class="dh-pct">' + pct + '%</span><span class="dh-pctl">progress</span></div></div>' +
        '<div class="dh-side">' +
          stat('🔥 ' + cur, cur === 1 ? 'day streak' : 'day streak', 'dh-streak') +
          stat(getTotal(), 'lifetime correct') +
          stat(acc + '%', 'accuracy') +
        '</div>' +
      '</section>'));
      app.appendChild(h('<div class="dh-legend">' +
        leg('mm-learnt', sum.learnt, 'mastered') + leg('mm-ready', sum.ready, 'know it') +
        leg('mm-learning', sum.learning, 'learning') + leg('mm-strug', sum.struggling, 'struggling') +
        leg('mm-new', sum.new, 'not started') +
      '</div>'));
      app.appendChild(h('<div class="dash-sub2">' +
        ks(best, 'best streak') + ks(days.length, 'days studied') + ks(written, 'written /5') + ks(total, 'concepts') +
      '</div>'));
      renderMastery();
      renderStats();
      renderBadges();
    }

    // Settings popup (masthead ⚙): connect Claude + back up / restore your progress.
    function openSettings() {
      var back = h('<div class="modal-back"></div>');
      var modal = h('<div class="modal" role="dialog" aria-modal="true" aria-label="Settings">' +
        '<div class="modal-head"><h2 class="modal-title">Settings</h2><button class="modal-x" type="button" aria-label="Close">✕</button></div>' +
        '<div class="modal-body"></div></div>');
      var body = modal.querySelector('.modal-body');
      renderApiKey(body);
      renderBackup(body);
      function close() { back.remove(); document.removeEventListener('keydown', onKey); }
      function onKey(e) { if (e.key === 'Escape') close(); }
      modal.querySelector('.modal-x').onclick = close;
      back.onclick = function (e) { if (e.target === back) close(); };
      document.addEventListener('keydown', onKey);
      back.appendChild(modal);
      document.body.appendChild(back);
    }

    // Connect Claude once, at the top of the home page. The key is saved in this browser
    // (localStorage ds_api_key) and reused everywhere — writing marks, Explain-like-I'm-5, etc.
    function renderApiKey(host) {
      var sec = h('<section class="apikey-card"></section>');
      function draw() {
        var has = !!apiKey();
        if (has) {
          sec.className = 'apikey-card ak-on';
          sec.innerHTML = '<div class="ak-row"><span class="ak-state">✓ Claude connected</span>' +
            '<span class="ak-note">Your key is saved in this browser and used for AI marking &amp; “Explain like I’m 5”.</span>' +
            '<div class="ak-btns"><button class="btn ghost ak-change">Change</button><button class="btn ghost ak-remove">Remove</button></div></div>';
          sec.querySelector('.ak-change').onclick = function () { setApiKey(''); draw(); };
          sec.querySelector('.ak-remove').onclick = function () { setApiKey(''); draw(); };
        } else {
          sec.className = 'apikey-card';
          sec.innerHTML = '<div class="ak-row"><div class="ak-lead"><b>Connect Claude</b>' +
            '<span class="ak-note">Paste your Anthropic API key to unlock AI marking &amp; “Explain like I’m 5”. It is stored only in this browser and sent only to Anthropic.</span></div>' +
            '<form class="ak-form"><input class="ak-in" type="password" placeholder="sk-ant-…" autocomplete="off" spellcheck="false" aria-label="Anthropic API key">' +
            '<button class="btn ak-save" type="submit">Save key</button></form></div>';
          var form = sec.querySelector('.ak-form'), input = sec.querySelector('.ak-in');
          form.onsubmit = function (ev) { ev.preventDefault(); var v = input.value.trim(); if (!v) return; setApiKey(v); draw(); keyLabel(); };
        }
      }
      draw();
      (host || app).appendChild(sec);
    }


    // Bite-sized revision notes covering every topic, in order (data_notes_*.js).
    function renderNotes() {
      var list = notesTopics();
      if (!list.length) return;
      var sec = h('<section class="notes-card"><div class="review-eyebrow">Quick reference</div>' +
        '<h2 class="review-title">Study notes</h2>' +
        '<p class="mm-sub">Short revision notes covering every topic in order, in tiny chunks. Read straight through or jump to any topic.</p>' +
        '<div class="notes-chips"></div>' +
        '<div class="next-row"><button class="btn notes-read-all">Read from the top →</button></div></section>');
      var chipsEl = sec.querySelector('.notes-chips');
      list.forEach(function (tp) {
        var chip = h('<button class="cmp-chip note-chip" type="button"></button>');
        chip.textContent = (tp.no ? tp.no + ' · ' : '') + tp.name;
        chip.onclick = function () { showNotes(tp.key); };
        chipsEl.appendChild(chip);
      });
      sec.querySelector('.notes-read-all').onclick = function () { showNotes(list[0].key); };
      app.appendChild(sec);
    }

    // Side-by-side pages for the pairs beginners mix up (data_compare.js).
    function renderCompares() {
      var all = window.COMPARES || [];
      if (!all.length) return;
      var sec = h('<section class="cmp-index"><div class="review-eyebrow">Quick reference</div>' +
        '<h2 class="review-title">Don’t confuse these</h2>' +
        '<p class="mm-sub">Side-by-side pages for the pairs everyone mixes up at first.</p>' +
        '<div class="cmp-chips"></div></section>');
      var chipsEl = sec.querySelector('.cmp-chips');
      all.forEach(function (c, i) {
        var chip = h('<button class="cmp-chip" type="button"></button>');
        chip.textContent = c.title;
        chip.onclick = function () { showCompare(i); };
        chipsEl.appendChild(chip);
      });
      app.appendChild(sec);
    }

    // Search everything: type a term, jump straight to any concept, definition or lab.
    // Results group by topic; ↑/↓ move the highlight, Enter opens, Esc clears, '/' focuses.
    function renderSearch() {
      var sec = h('<section class="search-card">' +
        '<input class="search-in" type="search" placeholder="Search topics, definitions, answers…  (press /)" autocomplete="off" spellcheck="false" aria-label="Search everything">' +
        '<div class="search-results" hidden></div></section>');
      var input = sec.querySelector('.search-in');
      var box = sec.querySelector('.search-results');
      var active = -1;
      function rows() { return [].slice.call(box.querySelectorAll('.sr-row')); }
      function setActive(n) {
        var rs = rows();
        if (!rs.length) return;
        if (active >= 0 && rs[active]) rs[active].classList.remove('sr-active');
        active = (n + rs.length) % rs.length;
        rs[active].classList.add('sr-active');
        rs[active].scrollIntoView({ block: 'nearest' });
      }
      function run() {
        active = -1;
        var term = input.value.trim();
        if (term.length < 2) { box.hidden = true; box.innerHTML = ''; return; }
        var hits = searchHits(term).slice(0, 30);
        box.hidden = false;
        if (!hits.length) { box.innerHTML = '<div class="sr-empty">No matches for “' + esc(term) + '”.</div>'; return; }
        box.innerHTML = '';
        var lastTopic = null;
        hits.forEach(function (e) {
          if (e.topic !== lastTopic) {
            box.appendChild(h('<div class="sr-group">' + esc(e.topic) + '</div>'));
            lastTopic = e.topic;
          }
          var wf = widgetFor(e.q), rev = wf && wf.reveal;
          var isDef = !!(window.DEFS && window.DEFS[e.q.q]);
          var kind = isDef ? 'Definition' : (rev && rev.name ? rev.name : 'Concept');
          var row = h('<button class="sr-row"><span class="sr-q"></span>' +
            '<span class="sr-meta">' + esc(kind) + ' ' + diffTag(e.level) + '</span></button>');
          row.querySelector('.sr-q').textContent = e.q.q;
          row.onclick = function () { showConcept(e.q, e.topic, e.level); };
          box.appendChild(row);
        });
      }
      input.oninput = run;
      input.onkeydown = function (ev) {
        if (ev.key === 'ArrowDown') { ev.preventDefault(); setActive(active + 1); }
        else if (ev.key === 'ArrowUp') { ev.preventDefault(); setActive(active - 1); }
        else if (ev.key === 'Enter') {
          var rs = rows();
          if (rs.length) { ev.preventDefault(); rs[active >= 0 ? active : 0].click(); }
        } else if (ev.key === 'Escape') { input.value = ''; run(); input.blur(); }
      };
      app.appendChild(sec);
    }

    // One picker: choose the study format (Multiple choice / Written / Definitions),
    // the topic scope, and how many. Smart Review stays a separate card below.
    function renderStudy(allowed) {
      var ALLOWED = allowed || ['learn', 'mc', 'written', 'defs', 'type', 'match'];
      var old = app.querySelector('.study-card');
      var mode = getStudyMode();
      if (ALLOWED.indexOf(mode) < 0) mode = ALLOWED[0];
      var learnOnly = ALLOWED.length === 1 && ALLOWED[0] === 'learn';
      var tkey = getStudyTopic();
      var diff = getStudyDiff();
      var curN = dailyN();
      function chips(kind, current, opts) {
        return opts.map(function (o) {
          return '<button class="filt-chip' + (o.v === current ? ' on' : '') + '" data-' + kind + '="' + o.v + '">' + o.t + '</button>';
        }).join('');
      }
      // How many items the current mode + topic + difficulty actually yields.
      function studyCount() {
        if (mode === 'mc') return newFilterQ(buildIndex().filter(function (e) { return (!tkey || e.key === tkey) && diffOk(e.level) && qVoteOk(e.q); })).length;
        if (mode === 'written') return newFilterC(writingDeck().filter(function (c) { return (!tkey || c.key === tkey) && diffOk(c.level); })).length;
        if (mode === 'defs') return newFilterC(flashDeck().filter(function (c) { return (!tkey || c.key === tkey) && c.def && diffOk(c.level); })).length;
        if (mode === 'learn') { var seenC = {}, n = 0, nc = loadCards(), ci = conceptIndex(), only = getStudyNew() === 'new'; learnConcepts(tkey, getLearnScope()).forEach(function (x) { if (x.concept) { var k = normkey(x.concept.front); if (!seenC[k]) { seenC[k] = 1; if (!only || !conceptSeen(x.concept.front, nc, ci)) n++; } } }); return n; }
        return newFilterC(flashDeck().filter(function (c) { return (!tkey || c.key === tkey) && c.back && c.back.length > 15 && diffOk(c.level); })).length;
      }
      var avail = studyCount();
      var topicOpts = '<option value="">All topics</option>' + TOPICS.filter(topicInMode).map(function (t) {
        return '<option value="' + t.key + '"' + (t.key === tkey ? ' selected' : '') + '>' + esc(t.name) + '</option>';
      }).join('');
      var scopeLabel = tkey ? (function () { var nm = tkey; TOPICS.forEach(function (t) { if (t.key === tkey) nm = t.name; }); return nm; })() : 'all topics';
      var vf = getVoteFilter();
      // Only call out the vote filter when it differs from the default (saved + unvoted).
      var voteLabel = (vf.up && !vf.down && vf.none) ? '' :
        ' · ' + [vf.up ? '★ saved' : '', vf.down ? '👎 disliked' : '', vf.none ? 'unvoted' : ''].filter(Boolean).join(' + ') + ' only';
      var diffLabel = (diff ? 'level ' + diff : 'all levels') + (getStudyNew() === 'new' ? ' · unseen only' : '') + voteLabel;
      var desc, startLabel;
      if (mode === 'mc') { desc = curN + ' multiple-choice questions · ' + esc(scopeLabel) + ' · ' + diffLabel; startLabel = 'Start ' + curN + ' →'; }
      else if (mode === 'written') { desc = 'Explain concepts in your own words · Claude marks each /5 · ' + esc(scopeLabel) + ' · ' + diffLabel + (apiKey() ? '' : ' · needs your API key'); startLabel = 'Start writing →'; }
      else if (mode === 'type') { desc = 'Read the definition, type the term from memory · ' + esc(scopeLabel) + ' · ' + diffLabel; startLabel = 'Start typing →'; }
      else if (mode === 'match') { desc = 'Pair terms with definitions, then order algorithm steps · ' + esc(scopeLabel) + ' · ' + diffLabel; startLabel = 'Start matching →'; }
      else if (mode === 'learn') { var lt = getLearnTest(); var ltName = lt === 'mc' ? 'multiple choice' : lt === 'written' ? 'a written answer' : lt === 'card' ? 'a flashcard' : 'mixed tests'; var ln = learnN(); var lnLabel = ln ? ln + ' concepts a session (least-known first)' : 'the whole topic in one go'; var scopeWord = getLearnScope() === 'defs' ? 'definitions only' : 'every concept'; desc = 'Read a note, then test yourself with ' + ltName + ' — ' + lnLabel + ' · ' + scopeWord + ' · ' + esc(scopeLabel) + ' · ' + diffLabel + (lt === 'written' && !apiKey() ? ' · needs your API key' : ''); startLabel = 'Start learning →'; }
      else { desc = 'Flip definition cards & self-rate · ' + esc(scopeLabel) + ' · ' + diffLabel; startLabel = 'Study cards →'; }
      desc += ' <span class="study-avail">' + avail + ' available</span>';
      var MODE_DEFS = [{ v: 'learn', t: 'Read + recall' }, { v: 'mc', t: 'Multiple choice' }, { v: 'written', t: 'Written' }, { v: 'defs', t: 'Definitions' }, { v: 'type', t: 'Type it' }, { v: 'match', t: 'Match & order' }];
      var modeChips = MODE_DEFS.filter(function (m) { return ALLOWED.indexOf(m.v) >= 0; });
      var studyTitle = learnOnly ? 'Read + recall' : 'Study';
      var sec = h('<section class="study-card">' +
        '<div class="daily-main">' +
          '<div class="daily-eyebrow">' + esc(studyTitle) + ' · ' + esc(todayLabel()) + '</div>' +
          '<h2 class="daily-title">' + esc(studyTitle) + '</h2>' +
          '<div class="daily-filters">' +
            (modeChips.length > 1 ?
            '<div class="filt-row"><span class="filt-lab">Mode</span>' +
              chips('mode', mode, modeChips) + '</div>' : '') +
            '<div class="filt-row"><span class="filt-lab">Topic</span><select class="study-topic">' + topicOpts + '</select></div>' +
            '<div class="filt-row"><span class="filt-lab">Difficulty</span>' +
              chips('diff', diff, [{ v: 0, t: 'All levels' }, { v: 1, t: '1' }, { v: 2, t: '2' }, { v: 3, t: '3' }]) + '</div>' +
            '<div class="filt-row"><span class="filt-lab">Show</span>' +
              chips('snew', getStudyNew(), [{ v: 'all', t: 'All' }, { v: 'new', t: 'Unseen only' }]) + '</div>' +
            '<div class="filt-row"><span class="filt-lab">Votes</span>' +
              [{ k: 'up', t: '★ Saved' }, { k: 'down', t: '👎 Disliked' }, { k: 'none', t: 'Unvoted' }].map(function (o) {
                return '<button class="filt-chip' + (vf[o.k] ? ' on' : '') + '" data-vote="' + o.k + '" aria-pressed="' + (vf[o.k] ? 'true' : 'false') + '">' + o.t + '</button>';
              }).join('') + '</div>' +
            (mode === 'learn' ?
            '<div class="filt-row"><span class="filt-lab">Cover</span>' +
              chips('lscope', getLearnScope(), [{ v: 'all', t: 'Every concept' }, { v: 'defs', t: 'Definitions only' }]) + '</div>' +
            '<div class="filt-row"><span class="filt-lab">Test with</span>' +
              chips('ltest', getLearnTest(), [{ v: 'mix', t: 'Mixed' }, { v: 'mc', t: 'Multiple choice' }, { v: 'written', t: 'Written' }, { v: 'card', t: 'Flashcards' }]) + '</div>' +
            '<div class="filt-row"><span class="filt-lab">How many</span>' +
              chips('lnum', learnN(), LEARN_OPTS.map(function (v) { return { v: v, t: v ? '' + v : 'Whole topic' }; })) + '</div>' : '') +
            (mode !== 'mc' && mode !== 'written' ? '' :
            '<div class="filt-row"><span class="filt-lab">How many</span>' +
              chips('num', curN, DAILY_OPTS.map(function (v) { return { v: v, t: '' + v }; })) + '</div>') +
          '</div>' +
          '<p class="daily-prog">' + desc + '</p>' +
        '</div>' +
        '<div class="daily-side">' +
          '<div class="daily-stat"><span class="ds-num">' + getTotal() + '</span><span class="ds-lab">lifetime<br>correct</span></div>' +
          '<div class="daily-btns"><button class="btn daily-go study-go"' + (avail ? '' : ' disabled') + '>' + startLabel + '</button></div>' +
        '</div></section>');
      sec.querySelectorAll('[data-mode]').forEach(function (b) {
        b.onclick = function () { setStudyMode(b.getAttribute('data-mode')); renderStudy(ALLOWED); };
      });
      sec.querySelectorAll('[data-num]').forEach(function (b) {
        b.onclick = function () { setDailyN(+b.getAttribute('data-num')); renderStudy(ALLOWED); };
      });
      sec.querySelectorAll('[data-lnum]').forEach(function (b) {
        b.onclick = function () { setLearnN(+b.getAttribute('data-lnum')); renderStudy(ALLOWED); };
      });
      sec.querySelectorAll('[data-lscope]').forEach(function (b) {
        b.onclick = function () { setLearnScope(b.getAttribute('data-lscope')); renderStudy(ALLOWED); };
      });
      sec.querySelectorAll('[data-diff]').forEach(function (b) {
        b.onclick = function () { setStudyDiff(+b.getAttribute('data-diff')); renderStudy(ALLOWED); };
      });
      sec.querySelectorAll('[data-snew]').forEach(function (b) {
        b.onclick = function () { setStudyNew(b.getAttribute('data-snew')); renderStudy(ALLOWED); };
      });
      // Votes chips multi-select: toggle each independently; the last one on can't be turned off.
      sec.querySelectorAll('[data-vote]').forEach(function (b) {
        b.onclick = function () {
          var f = getVoteFilter(), k = b.getAttribute('data-vote');
          f[k] = f[k] ? 0 : 1;
          if (!f.up && !f.down && !f.none) f[k] = 1;
          setVoteFilter(f); renderStudy(ALLOWED);
        };
      });
      sec.querySelectorAll('[data-ltest]').forEach(function (b) {
        b.onclick = function () { setLearnTest(b.getAttribute('data-ltest')); renderStudy(ALLOWED); };
      });
      sec.querySelector('.study-topic').onchange = function () { setStudyTopic(this.value); renderStudy(ALLOWED); };
      sec.querySelector('.study-go').onclick = function () {
        if (mode === 'mc') startQuiz(tkey, curN);
        else if (mode === 'written') startWriting(tkey);
        else if (mode === 'type') startTypeIt(tkey);
        else if (mode === 'match') startMatching(tkey);
        else if (mode === 'learn') startLearn(tkey);
        else startFlashcards(tkey, true);
      };
      if (old) app.replaceChild(sec, old); else app.appendChild(sec);
    }

    function renderPractice() {
      var ptk = getPracticeTopic();
      var sum = { learnt: 0, ready: 0, learning: 0, struggling: 0, new: 0 };
      buildIndex().forEach(function (e) { if (ptk ? e.key !== ptk : !keyInMode(e.key)) return; sum[cardStatus(e.q)]++; });
      var mixPct = Math.round(getMix() * 100);
      function splitFor(pct) {
        var m = pct / 100, N = PRACTICE_N;
        var seen = sum.struggling + sum.learning + sum.learnt;
        var nc = Math.round(m * N), kc = N - nc;
        if (kc > seen) { nc += kc - seen; kc = seen; }
        if (nc > sum.new) { kc = Math.min(seen, kc + (nc - sum.new)); nc = sum.new; }
        return { kc: kc, nc: nc };
      }
      function readoutText(pct) {
        var s = splitFor(pct);
        if (!s.kc && !s.nc) return 'No cards available yet — try a topic first.';
        return 'This session: ~' + s.kc + ' review (weakest first) · ~' + s.nc + ' new';
      }
      var review = h('<section class="review-card">' +
        '<div class="review-eyebrow">Adaptive · spaced repetition</div>' +
        '<h2 class="review-title">Smart Review</h2>' +
        '<div class="mast-badges">' +
          '<span class="mb mb-learnt"><b>' + sum.learnt + '</b> mastered</span>' +
          '<span class="mb mb-ready"><b>' + sum.ready + '</b> know it</span>' +
          '<span class="mb mb-learning"><b>' + sum.learning + '</b> learning</span>' +
          '<span class="mb mb-strug"><b>' + sum.struggling + '</b> struggling</span>' +
          '<span class="mb mb-new"><b>' + sum.new + '</b> new</span>' +
        '</div>' +
        '<div class="filt-row rev-topicrow"><span class="filt-lab">Topic</span><select class="rev-topic">' +
          '<option value="">All topics</option>' + TOPICS.filter(topicInMode).map(function (t) { return '<option value="' + t.key + '"' + (t.key === getPracticeTopic() ? ' selected' : '') + '>' + esc(t.name) + '</option>'; }).join('') +
        '</select></div>' +
        '<div class="dial-wrap">' +
          '<div class="dial-ends"><span>Review what I know</span><span>New material</span></div>' +
          '<input class="dial" type="range" min="0" max="100" step="5" value="' + mixPct + '" aria-label="Review to new mix">' +
          '<p class="dial-read">' + readoutText(mixPct) + '</p>' +
        '</div>' +
        '<div class="next-row"><button class="btn review-go">Start review →</button></div>' +
      '</section>');
      var dial = review.querySelector('.dial');
      var read = review.querySelector('.dial-read');
      dial.oninput = function () { read.textContent = readoutText(+dial.value); };
      dial.onchange = function () { setMix((+dial.value) / 100); };
      review.querySelector('.rev-topic').onchange = function () { setPracticeTopic(this.value); home(); };
      review.querySelector('.review-go').onclick = startPractice;
      app.appendChild(review);
    }

    function renderFavourites() {
      var n = favCount(), playable = favQuestions().length;
      var fav = h('<section class="fav-card">' +
        '<div class="fav-info"><span class="fav-star">' + (n ? '★' : '☆') + '</span>' +
        '<div><div class="fav-title">Favourites</div>' +
        '<div class="fav-sub">' + (n ? n + ' saved item' + (n === 1 ? '' : 's') + ' — saved cards & questions come up first' : 'Tap the ☆ on any question or card to save it here') + '</div></div></div>' +
        '<button class="btn ghost fav-go"' + (playable ? '' : ' disabled') + '>Review →</button></section>');
      if (playable) fav.querySelector('.fav-go').onclick = startFavourites;
      app.appendChild(fav);
      var hid = disCount();
      if (hid) {
        var dis = h('<section class="fav-card dis-card">' +
          '<div class="fav-info"><span class="fav-star dis-star">👎</span>' +
          '<div><div class="fav-title">Hidden</div>' +
          '<div class="fav-sub">' + hid + ' disliked item' + (hid === 1 ? '' : 's') + ' kept out of rounds — the Votes filter in Study can show them</div></div></div>' +
          '<button class="btn ghost dis-restore">Restore all</button></section>');
        dis.querySelector('.dis-restore').onclick = function () { clearHidden(); home(); };
        app.appendChild(dis);
      }
    }

    function renderMastery() {
      var rows = masteryByTopic();
      var tot = { learnt: 0, ready: 0, learning: 0, struggling: 0, new: 0, total: 0 };
      rows.forEach(function (r) { tot.learnt += r.learnt; tot.ready += r.ready; tot.learning += r.learning; tot.struggling += r.struggling; tot.new += r.new; tot.total += r.total; });
      // Progress that credits every stage, so an hour of study never reads 0%.
      function progressPct(r) { return r.total ? Math.round(100 * (r.learnt * 1 + r.ready * 0.7 + r.learning * 0.35 + r.struggling * 0.15) / r.total) : 0; }
      function count(cls, label, n) { return n ? '<span class="mmc ' + cls + '"><i class="mm-dot ' + cls.replace('mmc', 'mm') + '"></i>' + n + ' ' + label + '</span>' : ''; }
      var sec = h('<section class="mastery-card">' +
        '<div class="review-eyebrow">Your progress</div>' +
        '<h2 class="review-title">Mastery map</h2>' +
        '<p class="mm-sub">Written answers advance you: <b>4+/5</b> once = know it, twice = mastered. Everything else counts as <b>learning</b>; a miss is <b>struggling</b>.</p>' +
        '<div class="mm-list"></div></section>');
      var list = sec.querySelector('.mm-list');
      function seg(cls, n) { return n ? '<span class="mm-seg ' + cls + '" style="flex:' + n + '"></span>' : ''; }
      var byKey = {}; TOPICS.forEach(function (t) { byKey[t.key] = t; });
      // Started topics first (highest progress on top); untouched ones sink to a condensed list below.
      rows.forEach(function (r) { r.pct = progressPct(r); r.started = (r.learnt + r.ready + r.learning + r.struggling) > 0; });
      rows.sort(function (a, b) { if (a.started !== b.started) return a.started ? -1 : 1; return b.pct - a.pct; });
      var shownEmptyHeader = false;
      rows.forEach(function (r) {
        var T = byKey[r.key];
        if (!r.started) {
          if (!shownEmptyHeader) { list.appendChild(h('<div class="mm-empty-head">Not started yet</div>')); shownEmptyHeader = true; }
          var er = h('<button class="mm-row mm-row-empty"><span class="mm-name">' + esc(r.topic) + '</span><span class="mm-empty-go">Start →</span></button>');
          er.onclick = function () { start(T, T.levels[0]); };
          list.appendChild(er);
          return;
        }
        var counts = count('mmc-learnt', 'mastered', r.learnt) + count('mmc-ready', 'know it', r.ready) +
          count('mmc-learning', 'learning', r.learning) + count('mmc-strug', 'struggling', r.struggling) + count('mmc-new', 'new', r.new);
        var row = h('<button class="mm-row">' +
          '<div class="mm-rowhead"><span class="mm-name">' + esc(r.topic) + '</span><span class="mm-pct" title="overall progress">' + r.pct + '%</span></div>' +
          '<span class="mm-bar">' + seg('mm-learnt', r.learnt) + seg('mm-ready', r.ready) + seg('mm-learning', r.learning) + seg('mm-strug', r.struggling) + seg('mm-new', r.new) + '</span>' +
          '<div class="mm-counts">' + counts + '</div></button>');
        row.onclick = function () { start(T, T.levels[0]); };
        list.appendChild(row);
      });
      app.appendChild(sec);
    }

    function renderStats() {
      var cards = loadCards();
      var ids = Object.keys(cards);
      var sum = masterySummary();
      var totalConcepts = sum.learnt + sum.ready + sum.learning + sum.struggling + sum.new;
      var attempts = 0, wrong = 0, written = 0;
      ids.forEach(function (id) { var r = cards[id]; attempts += (r.seen || 0); wrong += (r.wrong || 0); if (r.wrote) written++; });
      var acc = attempts ? Math.round(100 * (attempts - wrong) / attempts) : 0;

      // consistency: streaks + heatmap over the last N weeks
      var act = loadActivity();
      var WEEKS = 20;
      var end = new Date(); end.setHours(0, 0, 0, 0);
      var cur = 0; var d = new Date(end);
      if (!act[fmtDay(d)]) d.setDate(d.getDate() - 1); // grace: today not done yet
      while (act[fmtDay(d)]) { cur++; d.setDate(d.getDate() - 1); }
      var sortedDays = Object.keys(act).sort();
      var best = 0, run = 0, prev = null;
      sortedDays.forEach(function (ds) {
        if (prev && (Date.parse(ds) - Date.parse(prev)) === 86400000) run++; else run = 1;
        if (run > best) best = run; prev = ds;
      });
      var activeDays = sortedDays.length;

      function tile(num, lab, cls) {
        return '<div class="stat-tile ' + (cls || '') + '"><span class="st-num">' + num + '</span><span class="st-lab">' + lab + '</span></div>';
      }
      var tiles =
        tile(cur + (cur === 1 ? ' day' : ' days'), 'current streak', 'st-streak') +
        tile(best + (best === 1 ? ' day' : ' days'), 'best streak', '') +
        tile(activeDays, 'days studied', '') +
        tile(getTotal(), 'lifetime correct', '') +
        tile(sum.learnt, 'mastered', 'st-good') +
        tile(written, 'written /5', '') +
        tile(acc + '%', 'accuracy', '');

      // heatmap grid: columns = weeks (Sun→Sat), shaded by activity bucket
      var start = new Date(end); start.setDate(start.getDate() - (WEEKS * 7 - 1)); start.setDate(start.getDate() - start.getDay());
      function bucket(c) { return c <= 0 ? 0 : c <= 2 ? 1 : c <= 5 ? 2 : c <= 10 ? 3 : 4; }
      var cols = '', cursor = new Date(start);
      var monthRow = '', lastMonth = -1;
      while (cursor <= end) {
        var cells = '';
        var colMonth = cursor.getMonth();
        for (var r = 0; r < 7; r++) {
          var ds = fmtDay(cursor);
          if (cursor > end) { cells += '<i class="hc hc-empty"></i>'; }
          else { var c = act[ds] || 0; cells += '<i class="hc hl' + bucket(c) + '" title="' + ds + ': ' + c + '"></i>'; }
          cursor.setDate(cursor.getDate() + 1);
        }
        var mlab = (colMonth !== lastMonth) ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][colMonth] : '';
        lastMonth = colMonth;
        monthRow += '<span class="hm-lab">' + mlab + '</span>';
        cols += '<div class="hcol">' + cells + '</div>';
      }

      // overall mastery bar
      function seg(cls, n) { return n ? '<span class="mm-seg ' + cls + '" style="flex:' + n + '"></span>' : ''; }
      var barTotal = totalConcepts || 1;
      var bar = seg('mm-learnt', sum.learnt) + seg('mm-ready', sum.ready) + seg('mm-learning', sum.learning) + seg('mm-strug', sum.struggling) + seg('mm-new', sum.new);

      var sec = h('<section class="stats-card">' +
        '<div class="review-eyebrow">Your analytics</div>' +
        '<h2 class="review-title">Consistency</h2>' +
        '<div class="heat-block"><div class="heat-head"><span>Last ' + WEEKS + ' weeks</span>' +
          '<span class="heat-legend">less <i class="hc hl0"></i><i class="hc hl1"></i><i class="hc hl2"></i><i class="hc hl3"></i><i class="hc hl4"></i> more</span></div>' +
          '<div class="heat-scroll"><div class="heat-months">' + monthRow + '</div><div class="heat-grid">' + cols + '</div></div></div>' +
        '<div class="stat-mm"><div class="stat-mm-head"><span>Overall mastery</span><span>' + sum.learnt + ' / ' + barTotal + ' mastered</span></div>' +
          '<div class="mm-bar stat-mm-bar">' + bar + '</div>' +
          '<div class="mm-legend"><span><i class="mm-dot mm-learnt"></i>mastered ' + sum.learnt + '</span><span><i class="mm-dot mm-ready"></i>know it ' + sum.ready + '</span><span><i class="mm-dot mm-learning"></i>learning ' + sum.learning + '</span><span><i class="mm-dot mm-strug"></i>struggling ' + sum.struggling + '</span><span><i class="mm-dot mm-new"></i>new ' + sum.new + '</span></div>' +
        '</div>' +
      '</section>');
      app.appendChild(sec);
    }

    function renderBackup(host) {
      var sec = h('<section class="data-card">' +
        '<div class="dc-text"><b>Back up your progress</b><span>Your streaks, mastery and favourites live only in this browser. Export a file to keep them safe or move to another device.</span></div>' +
        '<div class="dc-btns"><button class="dc-btn dc-export">⬇ Backup (JSON)</button><button class="dc-btn dc-csv">⬇ Stats (CSV)</button><button class="dc-btn dc-import">⬆ Restore</button>' +
        '<input type="file" accept="application/json,.json" class="dc-file" hidden></div></section>');
      sec.querySelector('.dc-export').onclick = exportProgress;
      sec.querySelector('.dc-csv').onclick = exportStatsCSV;
      var file = sec.querySelector('.dc-file');
      sec.querySelector('.dc-import').onclick = function () { file.click(); };
      file.onchange = function () {
        if (!file.files || !file.files[0]) return;
        importProgress(file.files[0], function (n) {
          if (n >= 0) { alert('Progress restored (' + n + ' items). Reloading.'); location.reload(); }
          else alert('Could not read that file — is it a DataSense backup?');
        });
      };
      (host || app).appendChild(sec);
    }

    // Browse every topic and jump straight into a specific level's questions (lives in the Study tab).
    function renderContents() {
      app.appendChild(h('<div class="sec-label">Browse all topics</div>'));
      GROUPS.forEach(function (g) {
        if ((g.mode || 'ds') !== (getMode() === 'work' ? 'work' : 'ds')) return;
        app.appendChild(h('<div class="sec-label sec-sub">' + g.label + '</div>'));
        g.keys.forEach(function (tk) {
          var T = null; TOPICS.forEach(function (t) { if (t.key === tk) T = t; });
          var total = 0; T.levels.forEach(function (L) { total += (QUESTIONS[L.qk] || []).length; });
          var topic = h('<section class="topic">' +
            '<div class="topic-head"><h3>' + T.name + '</h3><span class="t-index">Topic ' + T.no + ' · ' + total + ' exercises</span></div>' +
            '<p class="t-desc">' + T.desc + '</p><div class="toc"></div></section>');
          var toc = topic.querySelector('.toc');
          T.levels.forEach(function (L) {
            var qs = QUESTIONS[L.qk] || [];
            var best = localStorage.getItem(bestKey(L.qk));
            var meta = qs.length ? (best != null ? 'best ' + best + '/' + qs.length : qs.length + ' exercises') : 'in preparation';
            var row = h('<button class="toc-row" data-qk="' + L.qk + '">' +
              '<span class="toc-part">' + L.part + '</span>' +
              '<span class="toc-name">' + L.name + '</span>' +
              '<span class="toc-dots"></span>' +
              '<span class="toc-meta">' + meta + '</span>' +
              '<span class="toc-go" aria-hidden="true">→</span></button>');
            if (!qs.length) row.disabled = true;
            else row.onclick = function () { start(T, L); };
            toc.appendChild(row);
          });
          app.appendChild(topic);
        });
      });
      app.appendChild(h('<div class="sec-label">Forthcoming volumes</div>'));
      var grid = h('<div class="locked-grid"></div>');
      UPCOMING.forEach(function (t) {
        grid.appendChild(h('<div class="topic locked"><h3>' + t.name + '</h3>' +
          '<p class="t-desc">' + t.desc + '</p><span class="stamp">In preparation</span></div>'));
      });
      app.appendChild(grid);
    }

    function renderBadges() {
      var badges = computeBadges();
      var earned = badges.filter(function (b) { return b.earned; }).length;
      var sec = h('<section class="badge-card"><div class="review-eyebrow">Milestones</div>' +
        '<h2 class="review-title">Badges</h2>' +
        '<p class="mm-sub"><b>' + earned + '</b> of ' + badges.length + ' earned</p>' +
        '<div class="badge-grid"></div></section>');
      var grid = sec.querySelector('.badge-grid');
      badges.forEach(function (b) {
        var el = h('<div class="badge ' + (b.earned ? 'bd-earned' : 'bd-locked') + '">' +
          '<span class="bd-icon">' + b.icon + '</span><span class="bd-name"></span><span class="bd-desc"></span>' +
          (b.earned ? '' : '<span class="bd-prog"></span>') + '</div>');
        el.querySelector('.bd-name').textContent = b.name;
        el.querySelector('.bd-desc').textContent = b.desc;
        if (!b.earned) el.querySelector('.bd-prog').textContent = b.prog;
        grid.appendChild(el);
      });
      app.appendChild(sec);
    }
  }

  /* ---------------- ground definitions primer ---------------- */
  function start(topic, level) {
    var P = window.PRIMERS && window.PRIMERS[topic.key];
    if (!P) return begin(topic, level);
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back">' + homeWord('← Contents') + '</button>' +
      '<span class="exmeta">§ Topic ' + topic.no + ' · ' + esc(topic.name) + '</span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);
    var card = h('<article class="qcard primer">' +
      '<div class="q-eyebrow">Ground definitions · read once, then begin</div>' +
      '<h2 class="primer-title">' + esc(topic.name) + '</h2>' +
      '<p class="primer-note">Every exercise in this topic builds on these terms. Skim them now — each one returns in the labs.</p>' +
      '<dl class="terms"></dl>' +
      '<div class="next-row"><button class="btn primer-start">Begin ' + esc(level.part) + ' — ' + esc(level.name) + ' →</button></div></article>');
    var dl = card.querySelector('.terms');
    P.terms.forEach(function (tm, i) {
      var row = h('<div class="term"><dt><span class="term-no">' + (i < 9 ? '0' : '') + (i + 1) + '</span><span class="term-t"></span></dt><dd></dd></div>');
      row.querySelector('.term-t').textContent = tm.t;
      row.querySelector('dd').textContent = tm.d;
      dl.appendChild(row);
    });
    card.querySelector('.primer-start').onclick = function () { begin(topic, level); };
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  /* ---------------- exercise ---------------- */
  function begin(topic, level, opts) {
    opts = opts || {};
    S = {
      topic: topic, level: level,
      qs: opts.qs || shuffle(QUESTIONS[level.qk] || []),
      origins: opts.origins || null,
      daily: !!opts.daily, practice: !!opts.practice, mixed: !!opts.mixed, favourites: !!opts.favourites, more: !!opts.more,
      modeLabel: opts.modeLabel || '', sig: opts.sig || null, learnNext: opts.learnNext || null, learnNote: opts.learnNote || null, learnConcept: opts.learnConcept || null,
      learnBack: opts.learnBack || null, view: null,
      i: opts.startAt || 0, correct: opts.startCorrect || 0,
      results: opts.results ? opts.results.slice() : []
    };
    question(false);
  }

  function question(isRetry) {
    // Browsing backwards opens earlier questions read-only, so revisiting can't re-record
    // or re-score anything; stepping forward past the last answered one resumes the quiz.
    if (S.view != null) {
      if (S.view >= S.i) S.view = null;
      else return reviewQuestion();
    }
    var q = S.qs[S.i];
    var L = S.level;
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back">' + homeWord('← Contents') + '</button>' +
      '<div class="ruler" role="progressbar" aria-valuemin="0" aria-valuemax="' + S.qs.length + '" aria-valuenow="' + S.i + '"><div style="width:' + (100 * S.i / S.qs.length) + '%"></div></div>' +
      '<span class="exmeta">Exercise <b>' + (S.i + 1) + '</b> of ' + S.qs.length + ' · <b>' + S.correct + '</b> correct</span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);

    var eyebrow = S.mixed
      ? ('§ ' + esc(S.modeLabel || 'Mixed') + ' · ' + esc((S.origins && S.origins[S.i]) || 'Mixed'))
      : ('§ ' + esc(S.topic.name) + ' · ' + esc(L.part) + ' — ' + esc(L.name));
    var card = h('<article class="qcard">' +
      '<div class="q-top"><div class="q-eyebrow">' + eyebrow +
      (isRetry ? ' · <span class="retry-note">second attempt</span>' : '') + '</div>' +
      '</div>' +
      '<h2 class="qtext"></h2><div class="choices"></div></article>');
    card.querySelector('.q-top').appendChild(rateCtl(cardId(q)));
    card.querySelector('.qtext').textContent = q.q;
    if (S.learnNote) {
      var recall = h('<div class="lr-recall"><span class="lr-recall-tag">You just read</span><span class="lr-recall-t"></span></div>');
      recall.querySelector('.lr-recall-t').textContent = S.learnNote.t;
      card.insertBefore(recall, card.querySelector('.qtext'));
    }
    var box = card.querySelector('.choices');
    if (q.fig && window.renderFigure) {
      var figHost = document.createElement('div');
      card.insertBefore(figHost, box);
      renderFigure(figHost, widgetFor(q), q.fig.at, q.fig.cap);
    }
    var order = shuffle(q.choices.map(function (_, i) { return i; }));
    var btns = [];
    order.forEach(function (origIdx, pos) {
      var b = document.createElement('button');
      b.className = 'choice';
      var letter = document.createElement('span');
      letter.className = 'ch-letter'; letter.textContent = LETTERS[pos];
      var text = document.createElement('span');
      text.className = 'ch-text'; text.textContent = q.choices[origIdx];
      b.appendChild(letter); b.appendChild(text);
      b.onclick = function () { answer(q, origIdx, b, btns, card, isRetry); };
      btns.push({ b: b, orig: origIdx });
      box.appendChild(b);
    });
    if (!isRetry) {
      var navPrev = S.i > 0 ? '<button class="skip-btn nav-prev" type="button">← Previous</button>'
        : (S.learnBack ? '<button class="skip-btn nav-prev" type="button">← Back to the note</button>' : '');
      var skipRow = h('<div class="skip-row">' + navPrev + '<button class="skip-btn skip-go" type="button">Skip for now →</button></div>');
      skipRow.querySelector('.skip-go').onclick = skip;
      var np = skipRow.querySelector('.nav-prev');
      if (np) np.onclick = function () { if (S.i > 0) { S.view = S.i - 1; question(false); } else S.learnBack(); };
      card.appendChild(skipRow);
    }
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  // Read-only look at an already-answered (or skipped) question: the correct answer,
  // the explanation, and how you did — with ← / → to walk the whole set.
  function reviewQuestion() {
    var v = S.view, q = S.qs[v];
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back">' + homeWord('← Contents') + '</button>' +
      '<div class="ruler" role="progressbar" aria-valuemin="0" aria-valuemax="' + S.qs.length + '" aria-valuenow="' + S.i + '"><div style="width:' + (100 * S.i / S.qs.length) + '%"></div></div>' +
      '<span class="exmeta">Reviewing <b>' + (v + 1) + '</b> of ' + S.qs.length + '</span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);
    var res = S.results[v];
    var resLab = res === true ? 'You answered this one correctly ✓' : res === false ? 'You missed this one ✗' : 'You skipped this one';
    var eyebrow = 'Review · ' + (S.mixed ? esc((S.origins && S.origins[v]) || S.modeLabel || 'Mixed') : esc(S.topic.name));
    var card = h('<article class="qcard">' +
      '<div class="q-top"><div class="q-eyebrow">' + eyebrow + '</div></div>' +
      '<h2 class="qtext"></h2><div class="choices"></div></article>');
    card.querySelector('.q-top').appendChild(rateCtl(cardId(q)));
    card.querySelector('.qtext').textContent = q.q;
    var box = card.querySelector('.choices');
    shuffle(q.choices.map(function (_, i) { return i; })).forEach(function (origIdx, pos) {
      var b = document.createElement('button');
      b.className = 'choice ' + (origIdx === 0 ? 'is-correct' : 'dim');
      b.disabled = true;
      var letter = document.createElement('span');
      letter.className = 'ch-letter'; letter.textContent = LETTERS[pos];
      var text = document.createElement('span');
      text.className = 'ch-text'; text.textContent = q.choices[origIdx];
      b.appendChild(letter); b.appendChild(text);
      box.appendChild(b);
    });
    card.appendChild(h('<div class="banner ' + (res === true ? 'good' : res === false ? 'bad' : '') + '"><span class="b-label">' + resLab + '</span>' +
      '<div class="explain">' + q.explain + '</div></div>'));
    var nav = h('<div class="next-row">' +
      (v > 0 ? '<button class="btn ghost rev-prev">← Previous</button>' : '') +
      '<button class="btn rev-next">' + (v + 1 >= S.i ? 'Back to the question →' : 'Forward →') + '</button></div>');
    var rp = nav.querySelector('.rev-prev');
    if (rp) rp.onclick = function () { S.view--; question(false); };
    nav.querySelector('.rev-next').onclick = function () { S.view++; question(false); };
    card.appendChild(nav);
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  function skip() {
    S.results.push(null); // neutral: not recorded as right or wrong
    if (S.learnConcept) recordConcept(S.learnConcept, 'seen');   // a skipped read+recall concept still counts as seen
    S.i++;
    if (S.daily) saveDaily(S.i >= S.qs.length);
    if (S.i >= S.qs.length) { if (S.learnNext) return S.learnNext(); return done(); }
    question(false);
  }

  // A question has an interactive lab only if its widget declares a renderable type; definition/contrast
  // cards carry a reveal but no lab, so we must not promise one in the wrong-answer flow.
  function hasLab(q) { var w = widgetFor(q); return !!(w && w.type); }
  function markAll(btns, chosenBtn, right) {
    btns.forEach(function (x) {
      x.b.disabled = true;
      if (x.b !== chosenBtn && x.orig !== 0) x.b.classList.add('dim');
    });
    chosenBtn.classList.add(right ? 'is-correct' : 'picked-wrong');
  }
  function revealCorrect(btns) {
    btns.forEach(function (x) { if (x.orig === 0) { x.b.classList.add('is-correct'); x.b.classList.remove('dim'); } });
  }

  function dotsHTML(res) {
    return '<div class="dots">' + res.map(function (r, i) {
      var cls = r === null ? 'skip' : (r ? 'ok' : 'no');
      return '<span class="dot-q ' + cls + '">' + (i + 1) + '</span>';
    }).join('') + '</div>';
  }

  function answer(q, chosen, btn, btns, card, isRetry) {
    var right = chosen === 0;
    var sr = card.querySelector('.skip-row'); if (sr) sr.remove();
    markAll(btns, btn, right);
    // In read+recall the MC tests a whole concept, so record every question that teaches it (matching the
    // flashcard/written steps) — otherwise sibling questions stay "new" and the topic reads as half-seen.
    if (!isRetry) { S.results.push(right); if (S.learnConcept) recordConcept(S.learnConcept, right ? 'right' : 'wrong'); else { recordCard(q, right); logActivity(); } }

    if (right) {
      if (!isRetry) { S.correct++; bumpTotal(); }
      card.appendChild(h('<div class="banner good"><span class="b-label">' + (isRetry ? 'Correct on the second attempt ✓' : 'Correct ✓') + '</span>' +
        '<div class="explain">' + q.explain + '</div>' + rememberHTML(q) + '</div>'));
      var ww = whyOthersEl(q, null, false); if (ww) card.appendChild(ww);
      card.appendChild(aiExplainEl(q));
      var rp = ratePrompt(cardId(q), qVote(q));
      if (rp) card.appendChild(rp);
      var row = h('<div class="next-row"><button class="btn">Next exercise →</button>' +
        (isRetry || !hasLab(q) ? '' : '<button class="btn ghost">Open the lab anyway</button>') + '</div>');
      row.children[0].onclick = next;
      if (row.children[1]) row.children[1].onclick = function () { row.children[1].remove(); renderWidget(card, widgetFor(q)); };
      card.appendChild(row);
      return;
    }

    if (isRetry) {
      revealCorrect(btns);
      card.appendChild(h('<div class="banner good"><span class="b-label">The answer</span>' + esc(q.choices[0]) +
        '<div class="explain">' + q.explain + '</div>' + rememberHTML(q) + '</div>'));
      var ww2 = whyOthersEl(q, chosen, true); if (ww2) card.appendChild(ww2);
      card.appendChild(aiExplainEl(q));
      var rp2 = ratePrompt(cardId(q), qVote(q));
      if (rp2) card.appendChild(rp2);
      var row2 = h('<div class="next-row"><button class="btn">Next exercise →</button></div>');
      row2.children[0].onclick = next;
      card.appendChild(row2);
      return;
    }

    // first attempt, wrong → why THEIR pick fails → plain-English answer → (lab) → build-up → retry
    card.appendChild(h('<div class="banner bad"><span class="b-label">Marked ✗</span>' +
      (hasLab(q) ? 'Here\'s the answer in plain English. Then work the lab, build the answer up step by step, and take the question again.'
                 : 'Here\'s the answer in plain English. Read it, build the answer up step by step, and take the question again.') + '</div>'));
    var wp = whyPickEl(q, chosen); if (wp) card.appendChild(wp);
    card.appendChild(h('<div class="plain"><span class="p-label">The answer, in plain English</span>' +
      '<div class="p-answer">' + esc(q.choices[0]) + '</div>' +
      (q.simple ? '<p>' + q.simple + '</p>' : '') + '</div>'));
    renderWidget(card, widgetFor(q));
    var toCheck = h('<div class="next-row"><button class="btn">Break it down →</button></div>');
    toCheck.children[0].onclick = function () {
      toCheck.remove();
      quickCheck(q, card);
    };
    card.appendChild(toCheck);
  }

  /* ---------------- build-up: break the correct answer into easier parts ---------------- */
  function buildChecks(q) {
    // Preferred: authored step-by-step breakdown of the correct answer (inline, or from the STEPS map keyed by stem).
    var steps = q.steps || (window.STEPS && window.STEPS[q.q]);
    if (steps && steps.length) {
      return steps.map(function (s) { return { q: s.q, options: [s.ok].concat(s.no) }; });
    }
    // Fallback for any question without an authored breakdown yet: name the underlying idea.
    var r = q.widget && q.widget.reveal;
    if (r && r.name) {
      var names = S.qs.map(function (x) { return x.widget && x.widget.reveal && x.widget.reveal.name; })
        .filter(function (n) { return n && n !== r.name; });
      names = shuffle(names).slice(0, 2);
      if (names.length === 2) return [{ q: 'Which idea does the correct answer rest on?', options: [r.name, names[0], names[1]] }];
    }
    return [];
  }

  function quickCheck(q, card) {
    var checks = buildChecks(q);
    if (!checks.length) { question(true); return; }
    var wrap = h('<div class="checks"></div>');
    card.appendChild(wrap);
    var idx = 0;
    // Reveal the ground-up ladder ONE step at a time — the next step appears only once you've answered the current.
    function renderStep() {
      var c = checks[idx];
      var cc = h('<div class="check-card"><div class="check-label">Step ' + (idx + 1) + ' of ' + checks.length + '</div>' +
        '<div class="check-q"></div><div class="check-opts"></div></div>');
      cc.querySelector('.check-q').textContent = c.q;
      var opts = cc.querySelector('.check-opts');
      var order = shuffle(c.options.map(function (_, i) { return i; }));
      var obtns = [], advanced = false;
      order.forEach(function (orig) {
        var b = document.createElement('button');
        b.className = 'check-opt';
        var mark = document.createElement('span'); mark.className = 'co-mark'; mark.textContent = '○';
        var tx = document.createElement('span'); tx.textContent = c.options[orig];
        b.appendChild(mark); b.appendChild(tx);
        b.onclick = function () {
          obtns.forEach(function (x) {
            x.b.disabled = true;
            if (x.orig === 0) { x.b.classList.add('co-right'); x.b.querySelector('.co-mark').textContent = '✓'; }
            else if (x.b === b) { x.b.classList.add('co-wrong'); x.b.querySelector('.co-mark').textContent = '✗'; }
            else x.b.classList.add('co-dim');
          });
          if (advanced) return;
          advanced = true;
          idx++;
          if (idx < checks.length) { renderStep(); }
          else {
            var retry = h('<div class="next-row"><button class="btn">Take the question again →</button></div>');
            retry.children[0].onclick = function () { question(true); };
            wrap.appendChild(retry);
            retry.children[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        };
        obtns.push({ b: b, orig: orig });
        opts.appendChild(b);
      });
      wrap.appendChild(cc);
      cc.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    renderStep();
  }

  function next() {
    S.i++;
    if (S.daily) saveDaily(S.i >= S.qs.length);
    if (S.i >= S.qs.length) { if (S.learnNext) return S.learnNext(S.correct); return done(); }
    question(false);
  }

  /* ---------------- report card ---------------- */
  function doneDaily() {
    saveDaily(true);
    var n = S.qs.length, c = S.correct;
    var pct = n ? c / n : 0;
    var msg = pct >= 0.9 ? 'A stellar daily — today\'s target is done. Fancy a few more?' :
      pct >= 0.6 ? 'Solid daily run — every miss came with its own lab.' :
      'The daily mixes every topic; today\'s misses are tomorrow\'s strengths.';
    app.innerHTML = '';
    var card = h('<div class="result-card">' +
      '<div class="r-eyebrow">Daily ' + n + ' · ' + esc(todayLabel()) + '</div>' +
      '<div class="score-big">' + c + ' <small>/ ' + n + '</small></div>' +
      '<p class="r-msg">' + msg + ' <span class="small">Lifetime correct: <b>' + getTotal() + '</b></span></p>' +
      dotsHTML(S.results) +
      '<div class="next-row" style="justify-content:center"><button class="btn">Keep going →</button><button class="btn ghost">Contents</button></div></div>');
    card.querySelector('.btn').onclick = startMore;
    card.querySelector('.btn.ghost').onclick = home;
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  function doneMore() {
    var n = S.qs.length, c = S.correct;
    app.innerHTML = '';
    var card = h('<div class="result-card">' +
      '<div class="r-eyebrow">Keep going · ' + n + ' extra · ' + esc(todayLabel()) + '</div>' +
      '<div class="score-big">' + c + ' <small>/ ' + n + '</small></div>' +
      '<p class="r-msg">Extra practice beyond today\'s daily — this counts toward your history and lifetime total. <span class="small">Lifetime correct: <b>' + getTotal() + '</b></span></p>' +
      dotsHTML(S.results) +
      '<div class="next-row" style="justify-content:center"><button class="btn">Keep going →</button><button class="btn ghost">Contents</button></div></div>');
    card.querySelector('.btn').onclick = startMore;
    card.querySelector('.btn.ghost').onclick = home;
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  function donePractice() {
    var n = S.qs.length, c = S.correct;
    var sum = masterySummary();
    app.innerHTML = '';
    var card = h('<div class="result-card">' +
      '<div class="r-eyebrow">Smart Review · adaptive session</div>' +
      '<div class="score-big">' + c + ' <small>/ ' + n + '</small></div>' +
      '<p class="r-msg">History updated. <span class="small">Mastered <b>' + sum.learnt + '</b> · know it <b>' + sum.ready + '</b> · learning <b>' + sum.learning + '</b> · struggling <b>' + sum.struggling + '</b> · new <b>' + sum.new + '</b></span></p>' +
      dotsHTML(S.results) +
      '<div class="next-row" style="justify-content:center"><button class="btn">Another session</button><button class="btn ghost">Contents</button></div></div>');
    card.querySelector('.btn').onclick = startPractice;
    card.querySelector('.btn.ghost').onclick = home;
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  function doneFav() {
    var n = S.qs.length, c = S.correct;
    app.innerHTML = '';
    var card = h('<div class="result-card">' +
      '<div class="r-eyebrow">★ Favourites · ' + n + ' card' + (n === 1 ? '' : 's') + '</div>' +
      '<div class="score-big">' + c + ' <small>/ ' + n + '</small></div>' +
      '<p class="r-msg">Your saved questions, reviewed. <span class="small">Lifetime correct: <b>' + getTotal() + '</b></span></p>' +
      dotsHTML(S.results) +
      '<div class="next-row" style="justify-content:center"><button class="btn ghost">Contents</button></div></div>');
    card.querySelector('.btn.ghost').onclick = home;
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  function done() {
    checkSessionFlags();
    if (S.practice) return donePractice();
    if (S.daily) return doneDaily();
    if (S.more) return doneMore();
    if (S.favourites) return doneFav();
    var n = S.qs.length, c = S.correct;
    var L = S.level;
    var prev = +(localStorage.getItem(bestKey(L.qk)) || -1);
    if (c > prev) localStorage.setItem(bestKey(L.qk), c);
    var pct = c / n;
    var msg = pct === 1 ? 'A perfect paper. This level is yours.' :
      pct >= 0.8 ? 'Strong work — the marked squares below are your reading list.' :
      pct >= 0.5 ? 'A solid sitting. Every miss came with its own lab, which is the point.' :
      'This is how the manual is meant to be used: each miss taught you something a lecture couldn\'t.';
    app.innerHTML = '';
    var card = h('<div class="result-card">' +
      '<div class="r-eyebrow">Report · ' + L.part + ' — ' + L.name + ' · ' + S.topic.name + '</div>' +
      '<div class="score-big">' + c + ' <small>/ ' + n + '</small></div>' +
      '<p class="r-msg">' + msg + ' <span class="small">(first attempts only)</span></p>' +
      (c > prev && prev >= 0 ? '<div class="r-best">New personal best — previously ' + prev + '</div>' : '') +
      dotsHTML(S.results) +
      '<div class="next-row" style="justify-content:center"><button class="btn">Sit it again</button><button class="btn ghost">Contents</button></div></div>');
    card.querySelector('.btn').onclick = function () { begin(S.topic, S.level); };
    card.querySelector('.btn.ghost').onclick = home;
    app.appendChild(card);
  }

  applyTheme(); applyFont();
  if (window.matchMedia) {
    try { window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { if (getTheme() === 'auto') applyTheme(); }); } catch (e) {}
  }
  // '/' focuses the home search from anywhere on the contents page
  document.addEventListener('keydown', function (ev) {
    if (ev.key !== '/' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    var s = document.querySelector('.search-in');
    if (s) { ev.preventDefault(); s.focus(); }
  });
  home();
})();
