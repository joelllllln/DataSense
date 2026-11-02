/* Simple Codility notes — topic: Counting things.
   Short, phone-friendly version of ../data_count.js, same order of ideas:
   in → set → counting list → most common → speed → seen set → all of 1..X →
   FrogRiverOne → PermCheck → MissingInteger → MaxCounters (lazy max). */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'count',
    name: 'Counting things',
    tagline: 'Count each value once. Then every question is one quick lookup.',
    cards: [
      { type: 'info', title: 'Is X in the list?',
        body: 'Python asks with `in`.\n`X in A` is already True or False. Return it.\nHidden cost: Python walks the whole list to answer.',
        code: 'def solution(A, X):\n    return X in A' },

      { type: 'info', title: 'Different values: use a set',
        body: 'A set keeps each value once. Repeats vanish.\n`len(set(A))` counts the different values.\nLike `nunique()` in pandas.\nA set also answers `v in s` instantly.',
        code: 'def solution(A):\n    return len(set(A))' },

      { type: 'predict', code: 'A = [2, 1, 1, 2, 3, 1]\nprint(len(set(A)))', q: 'What prints?',
        choices: ['3', '6', '4'], why: 'The set is {1, 2, 3}. Three different values.' },

      { type: 'info', title: 'The counting list',
        body: 'Values are small whole numbers 1 to M.\nMake a list of M + 1 zeros.\nUse the value as the position: `count[v] += 1`.\nAfter one pass, `count[v]` says how often v appears.\nThis is `value_counts()` by hand.',
        code: 'count = [0] * (M + 1)\nfor v in A:\n    count[v] += 1' },

      { type: 'quiz', q: 'Values run 1 to M. Why `[0] * (M + 1)`, not `[0] * M`?',
        choices: ['So position M exists', 'To hold the total', 'Lists start at 1'],
        why: 'M slots give positions 0 to M - 1. Value M needs one more.' },

      { type: 'info', title: 'The most common value',
        body: '`max(count)` is the biggest tally.\n`count.index(...)` finds which value owns it.\n`index` returns the first match. So a tie goes to the smaller value.',
        code: 'def solution(A, M):\n    count = [0] * (M + 1)\n    for v in A:\n        count[v] += 1\n    return count.index(max(count))' },

      { type: 'info', title: 'Speed: count the steps',
        body: '`v in A` checks every item. One step each.\nInside a loop over A, that is a loop inside a loop.\n100,000 numbers times 100,000 is 10 billion steps. Too slow.\n`v in seen` on a set is one step.' },

      { type: 'info', title: 'Spot a repeat: seen set',
        body: 'Remember every value you have met in a set.\nBefore adding, ask if it is already there.\nIf yes, you found a repeat. Return at once.',
        code: 'seen = set()\nfor v in A:\n    if v in seen:\n        return True\n    seen.add(v)\nreturn False' },

      { type: 'info', title: 'All of 1 to X seen?',
        body: 'A set never stores a value twice.\nSo `len(seen)` is how many different values we met.\nWhen it reaches X, all of 1 to X are in.\n`enumerate` gives the position k with each value.',
        code: 'seen = set()\nfor k, v in enumerate(A):\n    seen.add(v)\n    if len(seen) == X:\n        return k\nreturn -1' },

      { type: 'info', title: 'FrogRiverOne',
        body: 'Asks: leaves fall at second k on spot `A[k]`. When is every spot 1 to X covered?\nTrick: the last card. Spots are values, seconds are positions.\nReturn -1 if it never happens.',
        code: 'seen = set()\nfor k, v in enumerate(A):\n    seen.add(v)\n    if len(seen) == X:\n        return k\nreturn -1' },

      { type: 'predict', code: 'seen, A = set(), [1, 3, 1, 2, 3]\nfor k, v in enumerate(A):\n    seen.add(v)\n    if len(seen) == 3: break\nprint(k)', q: 'X is 3. What prints?',
        choices: ['3', '2', '4'], why: 'After position 3 the set is {1, 3, 2}. Size 3.' },

      { type: 'info', title: 'PermCheck',
        body: 'Asks: is A exactly the numbers 1 to N, each once? Return 1 or 0, not True or False.\nTrick: N values, all between 1 and N, no repeats. That must be 1 to N.',
        code: 'seen = set()\nfor v in A:\n    if v < 1 or v > len(A) or v in seen:\n        return 0\n    seen.add(v)\nreturn 1' },

      { type: 'info', title: 'MissingInteger',
        body: 'Asks: the smallest positive number missing from A.\nTrick: put A in a set. Count up from 1 with a while loop.\nThe first number not in the set is the answer.\nNegatives do no harm. k never reaches them.',
        code: 'def solution(A):\n    present = set(A)\n    k = 1\n    while k in present:\n        k += 1\n    return k' },

      { type: 'info', title: 'MaxCounters: the slow way',
        body: 'N counters start at 0. Value v means add 1 to counter v.\nValue N + 1 means set all counters to the biggest.\nSlow way: rebuild the whole list each time.\n100,000 such moves is far too slow.',
        code: 'for v in A:\n    if v == N + 1:\n        c = [max(c)] * N   # slow\n    else:\n        c[v - 1] += 1      # counter v' },

      { type: 'info', title: 'MaxCounters: the lazy max',
        body: 'Trick: never touch every counter. Just two numbers.\n`base`: the floor all counters must reach.\n`top`: the tallest so far.\nA max move sets `base = top`.\nLift a counter to `base` before adding.\nAt the end lift them all.',
        code: 'for v in A:\n    if v == N + 1:\n        base = top\n    else:\n        c[v-1] = max(c[v-1], base) + 1\n        top = max(top, c[v-1])' },

      { type: 'quiz', q: 'MaxCounters: a max move arrives. What does the fast code do?',
        choices: ['Sets base = top, touches no counter', 'Rebuilds the whole list', 'Adds 1 to every counter'],
        why: 'One step. Counters are lifted later, only when touched.' },

      { type: 'quiz', q: 'Earliest position by which every number 1 to K appeared in A. Which trick?',
        choices: ['Seen set, stop when len is K', 'Counting list, then max', 'Sort and compare'],
        why: 'FrogRiverOne. The set reaches size K when all appeared.' },

      { type: 'info', title: 'Cheat sheet',
        body: 'In list? → `X in A`\nDifferent values → `len(set(A))`\nTallies → `count[v] += 1`\nRepeats → seen set\nAll seen → `len(seen) == X`\nSmallest missing → count from 1\nMaxCounters → `base`, `top`, lift when touched' }
    ]
  });
})();
