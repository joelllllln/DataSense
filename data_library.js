/* The Library — one shelf for everything in the app.

   The other modes are each organised by KIND: the course is a path, the tests are a
   list of problems, the coding section is a ladder of drills. The library is organised
   by SUBJECT instead, so everything about loops — the lesson, the recall drills, the
   what-does-it-print questions, the coding tasks and the test problems — sits together
   on one shelf.

   Nothing here holds content. A shelf only NAMES things that already exist:

     units    course unit keys        (window.COURSE.stages[].units[].key)
     cards    quickfire group names   (window.SNIPPETS[].group)
     quizzes  output-quiz group names (window.PYQUIZ[].group)
     tasks    coding task group names (window.CODETASKS[].group)
     ds       data-science topic keys (the TOPICS list in app.js — also brings that
                                       topic's study notes and order-the-steps)
     compares compare-page keys       (window.COMPARES[].key)

   Coding-test problems are not listed: every problem is placed in the course, so it
   inherits the shelf of the unit that teaches it. validate.js checks that every group,
   unit, task, topic and problem lands on exactly one shelf. */
(function () {
  window.LIBRARY = [];
  function T(key, name, blurb, spec) {
    spec = spec || {};
    window.LIBRARY.push({
      key: key, name: name, blurb: blurb,
      units: spec.units || [], cards: spec.cards || [], quizzes: spec.quizzes || [],
      tasks: spec.tasks || [], ds: spec.ds || [], compares: spec.compares || []
    });
  }

  /* ---------------- Python, from nothing ---------------- */

  T('first-lines', 'First lines', 'print, names and arithmetic — the very first things you type.', {
    units: ['s1', 's2', 's3', 'py1', 'py2'],
    cards: ['Step by step · printing', 'Step by step · names & values', 'Step by step · numbers',
            'First steps · printing & naming', 'First steps · types & converting', 'First steps · operators',
            'Python · numbers & maths'],
    quizzes: ['First steps', 'One step · printing and names', 'One step · numbers', 'Numbers'],
    tasks: ['01 · Your first lines']
  });

  T('text', 'Text', 'Quotes, methods, slicing and f-strings — everything you do to a string.', {
    units: ['s4', 's5', 'py6', 'c8'],
    cards: ['Step by step · text', 'Step by step · f-strings', 'Python · strings'],
    quizzes: ['One step · text', 'Strings']
  });

  T('choices', 'True, false and choosing', 'Comparisons, if / elif / else, and what Python counts as true.', {
    units: ['s6', 's7', 'py3'],
    cards: ['Step by step · true or false', 'Step by step · if'],
    quizzes: ['Numbers & truthiness']
  });

  T('lists', 'Lists', 'Making them, indexing them, changing them — and the traps that go with changing them.', {
    units: ['s8', 'py5'],
    cards: ['Step by step · lists, one step at a time', 'First steps · lists in practice', 'Python · lists'],
    quizzes: ['One step · lists', 'Lists & mutation'],
    tasks: ['02 · Lists and dictionaries']
  });

  T('loops', 'Loops', 'Walk the items, build something up, and stop when you have what you need.', {
    units: ['s9', 's10', 's11', 's12', 'sl1', 'sl2', 'sl3', 'sl4', 'py4'],
    cards: ['Step by step · the loop line', 'Step by step · inside the loop', 'Step by step · counting with a loop',
            'Step by step · collecting with a loop', 'First steps · loops in practice', 'Python · loops & conditions'],
    quizzes: ['One step · loops and ifs', 'Loops & iteration'],
    tasks: ['03 · Loops and functions']
  });

  T('dicts', 'Dictionaries, sets and tuples', 'Look things up by name instead of by position.', {
    units: ['s13', 'py7', 'c7'],
    cards: ['Step by step · dictionaries', 'First steps · dictionaries in practice', 'Python · dicts, sets & tuples'],
    quizzes: ['One step · dictionaries', 'Dicts & sets', 'Sets & membership', 'Collections']
  });

  T('functions', 'Functions of your own', 'def, return, arguments — and the small print that catches people out.', {
    units: ['s14', 'py8', 'c2'],
    cards: ['Step by step · functions', 'First steps · functions in practice', 'Python · functions'],
    quizzes: ['Functions & scope']
  });

  T('errors', 'Errors, files and input', 'Reading a traceback, try / except, and getting data in and out.', {
    units: ['s15', 's16', 'py9', 'c6'],
    cards: ['Step by step · asking the user', 'Step by step · when it goes wrong', 'Step by step · files and imports',
            'First steps · reading errors', 'Python · errors & files', 'Tooling · files, JSON & dates'],
    quizzes: ['Errors']
  });

  T('again', 'The same things, new scenarios', 'The whole of the basics again, in six different settings, until none of it is new.', {
    units: ['s17', 's18', 's19'],
    cards: ['Step by step · same idea, new scenario', 'Step by step · again, with a bank account',
            'Step by step · again, with a recipe', 'Step by step · again, with football scores',
            'Step by step · again, with a library', 'Step by step · again, with a step counter',
            'Step by step · the small things that catch people out']
  });

  T('pythonic', 'Writing it the Python way', 'Comprehensions, generators, and why a copy is not always a copy.', {
    units: ['py10', 'c3'],
    cards: ['Python · comprehensions', 'Python · iterators & generators'],
    quizzes: ['Comprehensions', 'Generators', 'Copying']
  });

  T('classes', 'Classes and modules', 'Your own types, and the standard library that saves you writing them.', {
    units: ['py11', 'c1'],
    cards: ['Python · classes & modules', 'Python · classes in depth', 'Python · standard library'],
    quizzes: ['Classes']
  });

  T('regex', 'Regular expressions', 'Patterns for finding, checking and pulling text apart.', {
    units: ['c4', 'c5'],
    cards: ['Regex · the basics', 'Regex · patterns worth knowing', 'Regex · in pandas'],
    quizzes: ['Regex']
  });

  T('craft', 'Testing, git and the command line', 'The habits around the code: assertions, version control, environments, notebooks.', {
    units: ['c9', 'c10', 'c11', 'c12', 'd10'],
    cards: ['Python · testing & assertions', 'Tooling · the command line', 'Tooling · git',
            'Tooling · environments & packages', 'Working habits · notebook & environment']
  });

  /* ---------------- Working with data ---------------- */

  T('tables-first', 'Your first table', 'pandas at walking pace — one column, one filter, one total at a time.', {
    units: ['s20', 's21', 's22', 's23'],
    cards: ['Step by step · first look at a table', 'Step by step · one column at a time', 'Step by step · picking rows',
            'Step by step · grouping', 'Step by step · tidying a column', 'Step by step · dates in a table',
            'Step by step · two tables', 'Step by step · arrays', 'Step by step · a first chart',
            'Step by step · again, with a spreadsheet of sales'],
    tasks: ['04 · What a DataFrame is']
  });

  T('numpy', 'NumPy arrays', 'The array thinking that pandas is built on.', {
    units: ['d1'],
    cards: ['NumPy · make & inspect arrays', 'NumPy · indexing & maths', 'NumPy · random & statistics'],
    quizzes: ['NumPy & pandas']
  });

  T('pandas-load', 'Loading data and the first look', 'Open the file, see its shape, and find out what you have been given.', {
    units: ['d2'],
    cards: ['pandas · load & save', 'pandas · look at the data'],
    tasks: ['05 · Open a file', '06 · Look at it', '07 · How big, and what is in it', '25 · The first look, all together']
  });

  T('pandas-select', 'Selecting, filtering and sorting', 'Get to the rows and columns you actually want.', {
    units: ['d3'],
    cards: ['pandas · select columns & rows', 'pandas · filter rows', 'pandas · sort & rank'],
    tasks: ['09 · One column at a time', '10 · Sums on a column', '11 · Keep some rows',
            '12 · More than one condition', '13 · Sort it and take the top', '26 · Selecting and filtering, together']
  });

  T('pandas-clean', 'Cleaning and new columns', 'Missing values, wrong types, messy text — and the columns you derive from them.', {
    units: ['d4'],
    cards: ['pandas · missing values', 'pandas · types & conversion', 'pandas · duplicates & replace', 'pandas · text columns'],
    tasks: ['08 · What is missing', '14 · Add a column', '15 · Tidy up the text', '16 · Fix the types',
            '27 · Cleaning, all together', '28 · New columns, all together']
  });

  T('pandas-group', 'Grouping and aggregating', 'Totals per group, cross-tabs, and the index that comes back to bite you.', {
    units: ['d5', 'd5b'],
    cards: ['pandas · group & aggregate', 'pandas · cross-tabs & summaries', 'pandas · the index & multi-index'],
    tasks: ['17 · Group and total', '18 · Two numbers per group', '29 · Grouping, all together']
  });

  T('pandas-join', 'Joining and reshaping', 'Two tables into one, and long into wide.', {
    units: ['d6'],
    cards: ['pandas · combine frames', 'pandas · reshape'],
    tasks: ['19 · Two tables', '20 · Change the shape', '30 · Joining and reshaping, together']
  });

  T('dates', 'Dates and time series', 'Real dates, the parts you pull out of them, and resampling.', {
    units: ['d7'],
    cards: ['pandas · dates & times', 'pandas · time series'],
    tasks: ['21 · Dates', '31 · Dates and time series, together']
  });

  T('pandas-deep', 'When pandas surprises you', 'Copies, views, the warning everybody ignores, and making it fast.', {
    units: ['d4b', 'd8b'],
    cards: ['pandas · gotchas & copies', 'pandas · speed & memory']
  });

  T('sql', 'SQL', 'Asking the database the same questions you ask a DataFrame.', {
    units: ['d6b', 'd6c', 'd6d', 'd6e'],
    cards: ['SQL · querying', 'SQL · grouping & aggregates', 'SQL · joins & subqueries',
            'SQL · window functions', 'SQL · dates, text & nulls', 'SQL · windows in depth', 'SQL · shaping & writing data']
  });

  T('charts', 'Charts', 'Drawing the thing you just worked out.', {
    units: ['d8'],
    cards: ['Plotting · matplotlib', 'Plotting · seaborn & pandas'],
    tasks: ['22 · A first chart', '32 · Charts, all together']
  });

  T('stats', 'Describing it honestly', 'Averages that mislead, spread, significance, and A/B tests.', {
    units: ['d9', 'd9b'],
    cards: ['Statistics · describe & test', 'Statistics · experiments & inference'],
    tasks: ['23 · Honest numbers', '33 · Describing it honestly']
  });

  /* ---------------- Machine learning ---------------- */

  T('features', 'Features', 'Turning raw columns into something a model can use — without leaking the answer.', {
    units: ['d7b', 'm2'],
    cards: ['Features · encoding & binning', 'Features · deriving columns', 'Features · selecting & leakage'],
    tasks: ['24 · Ready for a model', '34 · Getting data ready for a model'],
    ds: ['feng', 'fsel'],
    compares: ['standard-minmax']
  });

  T('sklearn', 'The modelling workflow', 'fit, predict, pipeline, search — scikit-learn used properly.', {
    units: ['m1', 'm4'],
    cards: ['scikit-learn · imports', 'scikit-learn · fit & predict', 'scikit-learn · preprocessing',
            'scikit-learn · evaluation & tuning'],
    tasks: ['35 · The core modelling workflow', '36 · Fitting models', '37 · Tuning', '38 · Evaluating',
            '39 · Unsupervised', '40 · Fix the bug', '41 · A whole project'],
    ds: ['sklearn', 'msel'],
    compares: ['grid-random', 'param-hyper', 'sup-unsup', 'clf-reg']
  });

  T('judging', 'Judging a model', 'Metrics, validation, thresholds, imbalance — the half where people fool themselves.', {
    units: ['m3', 'm3b', 'm6', 'm7'],
    cards: ['Modelling · choosing and reading a metric'],
    ds: ['metrics', 'evalx', 'valid', 'perf', 'imbal', 'interp'],
    compares: ['precision-recall', 'roc-pr', 'split-cv', 'over-under']
  });

  T('models', 'The models themselves', 'Every algorithm, one topic at a time — how it works and when it breaks.', {
    units: ['m5', 'm5b', 'm8', 'm9'],
    cards: ['Modelling · the ideas they ask about'],
    ds: ['found', 'knn', 'logreg', 'bayes', 'trees', 'svm', 'rf', 'gboost', 'stacking', 'xgb', 'regr',
         'kmeans', 'hier', 'dbscan', 'pca', 'tsne', 'scen'],
    compares: ['bag-boost', 'l1-l2', 'pca-tsne', 'tree-forest', 'kmeans-dbscan', 'euclid-manhattan']
  });

  /* ---------------- Sitting the test, and the day job ---------------- */

  T('coding-test', 'Sitting a coding test', 'Algorithms under time pressure, and what a real sitting feels like.', {
    units: ['t1', 't2', 't3', 't4', 't4b', 't4c', 't4d', 't4e', 't5', 't6', 't6b', 't7'],
    cards: ['Algorithms · cost & complexity', 'Algorithms · the structures', 'Algorithms · the patterns',
            'Algorithms · recursion & trees'],
    quizzes: ['Sorting & comparing']
  });

  T('work', 'The day job', 'Digital assets, payments, cloud and AI — the vocabulary everyone assumes you have.', {
    ds: ['wcrypto', 'wpay', 'waws', 'wai', 'podcast']
  });

  /* ---------------- Making Discord bots ---------------- */

  T('bot-first', 'A bot that logs in', 'The token, the intents, and the eight lines that put a bot online.', {
    units: ['b1', 'b2'],
    cards: ['Discord · setup & login'],
    tasks: ['D1 · Your first bot']
  });

  T('bot-listen', 'Hearing and answering', 'on_message, the other events, and everything you can do to a message.', {
    units: ['b3', 'b4'],
    cards: ['Discord · events', 'Discord · messages'],
    quizzes: ['Discord · parsing a command'],
    tasks: ['D2 · Listening and replying']
  });

  T('bot-commands', 'Commands and their arguments', 'Real commands instead of if-statements — and the converters that do the work.', {
    units: ['b5', 'b6'],
    cards: ['Discord · prefix commands', 'Discord · command arguments'],
    quizzes: ['Discord · the logic underneath'],
    tasks: ['D3 · Real commands']
  });

  T('bot-guards', 'Guards and errors', 'Who may run it, how often, and what the user sees when it fails.', {
    units: ['b7', 'b8'],
    cards: ['Discord · checks & errors'],
    tasks: ['D4 · Arguments and errors']
  });

  T('bot-slash', 'Slash commands', 'The kind Discord draws for you — options, ephemeral replies, and the sync.', {
    units: ['b9'],
    cards: ['Discord · slash commands'],
    tasks: ['D5 · Slash commands']
  });

  T('bot-look', 'Embeds, buttons and menus', 'The difference between a toy bot and one people trust.', {
    units: ['b10', 'b11'],
    cards: ['Discord · embeds', 'Discord · buttons & menus'],
    tasks: ['D6 · Embeds and buttons']
  });

  T('bot-people', 'Members, roles and moderation', 'Roles, kicks, bans, timeouts, channels — and the hierarchy rule behind every failure.', {
    units: ['b12', 'b13', 'b14'],
    cards: ['Discord · members, roles & moderation', 'Discord · channels & servers'],
    tasks: ['D7 · Roles and moderation']
  });

  T('bot-run', 'Cogs, jobs and keeping it running', 'Splitting the file up, work on a timer, saving data, and hosting it somewhere that stays on.', {
    units: ['b15', 'b16', 'b17', 'b18'],
    cards: ['Discord · background tasks & cogs', 'Discord · storage & hosting'],
    tasks: ['D8 · Background jobs and cogs', 'D9 · A whole bot']
  });
})();
