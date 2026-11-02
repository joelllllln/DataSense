/* Simple Codility notes - topic "sort" (Sorting & sets).
   Short phone-sized version of codility/study/data_sort.js: same ideas, same order, fewer words. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'sort',
    name: 'Sorting & sets',
    tagline: 'Sort once, then read answers off positions and neighbours. Use a set to drop repeats.',
    cards: [
      { type: 'info', title: 'Sort once, then read spots',
        body: 'Sorting puts the numbers in order, smallest first.\nAfter that, answers sit at fixed spots.\n`S[0]` is the smallest. `S[-1]` is the biggest.\n`S[1]` is second smallest. `S[-2]` is second biggest.\nMost tasks here start with one sort.',
        code: 'S = sorted(A)\nprint(S[0], S[-1])  # smallest, biggest' },

      { type: 'info', title: 'sorted makes a new list',
        body: '`sorted(A)` gives back a new list, in order.\n`A` itself does not change.\nWant biggest first? Add `reverse=True`.\nThink `df.sort_values()`, but for a plain list.',
        code: 'S = sorted(A)\nD = sorted(A, reverse=True)  # biggest first' },

      { type: 'info', title: 'Trap: .sort() returns None',
        body: '`A.sort()` sorts `A` in place and gives back `None`.\nSo `return A.sort()` returns nothing.\nAnd `B = A.sort()` makes `B` equal `None`.\nUse `sorted(A)` when you want the result.\nUse `A.sort()` alone on its own line.',
        code: 'A = [3, 1, 2]\nS = sorted(A)  # S is [1, 2, 3]\nA.sort()       # A is now [1, 2, 3]\nB = A.sort()   # B is None' },

      { type: 'predict', code: 'A = [3, 1, 2]\nB = A.sort()\nprint(B)', q: 'What prints?',
        choices: ['None', '[1, 2, 3]', '[3, 1, 2]'],
        why: '.sort() changes A in place and gives back None.' },

      { type: 'info', title: 'Why sort first: count steps',
        body: 'Sorting 100,000 numbers takes about 2 million steps. Fast enough.\nA loop inside a loop is 10 billion steps. Too slow.\nSo sort once, then do one simple loop.\nSorted neighbours tell you most of what you need.' },

      { type: 'info', title: 'Distinct: count different values',
        body: 'Distinct asks: how many different numbers are in `A`?\nTrick: a set keeps each value once. Repeats vanish.\n`len(set(A))` is the answer.\nLike `nunique()` in pandas.\nAn empty list gives 0 for free.',
        code: 'def solution(A):\n    return len(set(A))' },

      { type: 'info', title: 'A set answers "in" fast',
        body: '`x in B` on a list reads the whole list.\nInside a loop that is too slow.\n`x in set(B)` is one step.\nBuild the set once, before the loop.\nShared values: `set(A) & set(B)`.',
        code: 'seen = set(B)\ncount = 0\nfor x in A:\n    if x in seen:\n        count += 1' },

      { type: 'info', title: 'Equal values become neighbours',
        body: 'After sorting, equal values sit side by side.\nOne check finds every repeat: `A[i] == A[i - 1]`.\nSmallest repeated value? The first equal pair gives it.\nStart the loop at 1, not 0.',
        code: 'A = sorted(A)\nfor i in range(1, len(A)):\n    if A[i] == A[i - 1]:\n        return A[i]  # first repeat\nreturn -1' },

      { type: 'quiz', q: 'A is sorted. Where do two equal values end up?',
        choices: ['Right next to each other', 'At the two ends', 'Anywhere at all'],
        why: 'Sorting groups equal values, so one neighbour check finds every repeat.' },

      { type: 'info', title: 'MaxProductOfThree: two negatives win',
        body: 'MaxProductOfThree asks: the biggest product of any three numbers.\nTrick: the top three usually win.\nBut two negatives multiply to a positive.\nSo the two smallest times the biggest can beat them.\nWork out both. Return the bigger.',
        code: 'def solution(A):\n    S = sorted(A)\n    top = S[-1] * S[-2] * S[-3]\n    neg = S[0] * S[1] * S[-1]\n    return max(top, neg)' },

      { type: 'predict', code: 'S = sorted([-10, -10, 1, 2, 3])\ntop = S[-1] * S[-2] * S[-3]\nneg = S[0] * S[1] * S[-1]\nprint(max(top, neg))', q: 'What prints?',
        choices: ['300', '6', '-300'],
        why: 'Top three give 6. The two negatives times 3 give 300.' },

      { type: 'info', title: 'Triangle: test three neighbours',
        body: 'Triangle asks: can three numbers in `A` be triangle sides?\nRule: two shorter sides must add to more than the longest.\nTrick: sort. If a triangle exists, three neighbours form one.\nTest every neighbour triple.',
        code: 'def solution(A):\n    A = sorted(A)\n    for i in range(len(A) - 2):\n        if A[i] + A[i + 1] > A[i + 2]:\n            return 1\n    return 0' },

      { type: 'quiz', q: 'Triangle: A is sorted. Which triples do you test?',
        choices: ['Every three neighbours', 'Every possible triple', 'Only the three biggest'],
        why: 'If a triangle exists, some three neighbours in sorted order form one.' },

      { type: 'info', title: 'Discs: what each one covers',
        body: 'NumberOfDiscIntersections asks: how many pairs of discs touch?\nDisc i sits at i with radius `A[i]`.\nSo it covers from `i - A[i]` to `i + A[i]`.\nTwo discs touch when their ranges overlap.\nEvery pair is too slow.',
        code: 'left = i - A[i]\nright = i + A[i]' },

      { type: 'info', title: 'Discs: sort both ends, sweep',
        body: 'Trick: sort all left ends and all right ends.\nWalk the right ends in order.\n`j` counts discs started so far.\n`k + 1` have already ended, this one too.\nThe rest pair with it.\nOver 10,000,000? Return -1.',
        code: 'L = sorted(i - A[i] for i in range(len(A)))\nR = sorted(i + A[i] for i in range(len(A)))\nj = total = 0\nfor k, r in enumerate(R):\n    while j < len(L) and L[j] <= r: j += 1\n    total += j - k - 1' },

      { type: 'quiz', q: 'Disc sweep: j discs started, k + 1 ended. How many new pairs?',
        choices: ['j - k - 1', 'j', 'j - k'],
        why: 'The k + 1 ended discs add no new pairs.' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Order → `sorted(A)`, not `A.sort()`\nDifferent values → `len(set(A))`\nRepeats → sorted neighbours\nProduct of three → top three vs two negatives\nTriangle → sort, test three neighbours\nDiscs → sort ends, sweep, `j - k - 1`' }
    ]
  });
})();
