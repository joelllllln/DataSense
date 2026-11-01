/* Codility study cards — topic: Counting elements.
   Teaches the ladder of codility/data_count.js in the same order:
   in → set → counting list → most common → seen set → first repeat → seen all 1..X →
   FrogRiverOne → PermCheck → smallest missing → MissingInteger → counters → naive max →
   MaxCounters (lazy max) → counter variable → dict counts → equal pairs → many queries. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'count',
    name: 'Counting elements',
    tagline: 'Tally the values once, then every question about them is a single lookup.',
    cards: [
      { type: 'info', title: 'Is X in the list? One word: in',
        body: 'The whole topic starts with one question: is this value in there?\nPython answers with `in`. `X in A` is already True or False, so return it directly.\nThis works, but keep it in mind: it is a hidden loop over the whole list.',
        code: 'def solution(A, X):\n    return X in A' },

      { type: 'info', title: 'How many different values? Use a set',
        body: 'A set keeps each value only once. `set(A)` throws away the repeats.\n`len()` then counts what is left.\nA set also answers `v in s` instantly, which matters later.',
        code: 'def solution(A):\n    return len(set(A))' },

      { type: 'predict', code: 'A = [2, 1, 1, 2, 3, 1]\nprint(len(set(A)))', q: 'What prints?',
        choices: ['3', '6', '4', '1'], why: 'The set is {1, 2, 3}: three different values.' },

      { type: 'info', title: 'The counting list',
        body: 'When values are small whole numbers 1..M, make a list of M+1 zeros.\nUse the value itself as the index: `count[v] += 1`.\nAfter one pass, `count[v]` is how many times v appears. This is the key tool of the topic.',
        code: 'def solution(A, M):\n    count = [0] * (M + 1)\n    for v in A:\n        count[v] += 1\n    return count' },

      { type: 'quiz', q: 'Values run from 1 to M. Why is the counting list `[0] * (M + 1)` and not `[0] * M`?',
        choices: ['So index M exists; index 0 is simply unused', 'To leave room for one extra value', 'Because lists start at 1', 'To store the total in the last slot'],
        why: 'A list of M slots has indexes 0..M-1, so `count[M]` would crash; the extra slot makes value M fit.' },

      { type: 'info', title: 'The most common value',
        body: 'With the counting list built, `max(count)` is the biggest tally.\n`count.index(...)` tells you which value owns it.\n`index` returns the FIRST position with that tally, so a tie goes to the smallest value for free.',
        code: 'def solution(A, M):\n    count = [0] * (M + 1)\n    for v in A:\n        count[v] += 1\n    return count.index(max(count))' },

      { type: 'quiz', q: 'A = [3, 1, 1, 3], M = 3. What does `count.index(max(count))` return?',
        choices: ['1', '3', '2', '0'],
        why: 'count is [0, 2, 0, 2]; the max 2 first appears at index 1, so the tie goes to the smaller value.' },

      { type: 'info', title: 'Trap: in on a list is O(n). Use a set',
        body: '`v in A` on a list walks the whole list. Inside a loop over A that is O(n squared): 100,000 items become 10,000,000,000 steps.\n`v in seen` on a set is instant.\nTo spot a repeat: remember what you have met in a set and return the moment you see it again.',
        code: 'def solution(A):\n    seen = set()\n    for v in A:\n        if v in seen:\n            return True\n        seen.add(v)\n    return False' },

      { type: 'info', title: 'Where is the first repeat? enumerate',
        body: '`enumerate(A)` hands you the index and the value together: `for k, v in enumerate(A)`.\nSame seen set, but now you can return the position k instead of just True.\nReturn -1 after the loop when nothing repeats.',
        code: 'def solution(A):\n    seen = set()\n    for k, v in enumerate(A):\n        if v in seen:\n            return k\n        seen.add(v)\n    return -1' },

      { type: 'predict', code: 'def solution(A):\n    seen = set()\n    for k, v in enumerate(A):\n        if v in seen:\n            return k\n        seen.add(v)\n    return -1\n\nprint(solution([1, 2, 3, 2, 1]))', q: 'What prints?',
        choices: ['3', '1', '4', '2'], why: 'A[3] = 2 is the first value already seen (at index 1), so k = 3 is returned.' },

      { type: 'info', title: 'When have we seen all of 1..X?',
        body: 'A set never stores a value twice, so `len(seen)` is the number of DIFFERENT values met so far.\nIf every value is between 1 and X, then `len(seen) == X` means all of 1..X have appeared.\nCheck it right after each add and return that index.',
        code: 'def solution(X, A):\n    seen = set()\n    for k, v in enumerate(A):\n        seen.add(v)\n        if len(seen) == X:\n            return k\n    return -1' },

      { type: 'info', title: 'FrogRiverOne: a story around the last card',
        body: 'Task: leaves fall at second k on position `A[k]` (1..X). Return the first second when every position 1..X has a leaf, else -1.\nInsight: positions are the values, seconds are the indexes, "the frog can cross" is `len(seen) == X`.\nNothing new in the code. The skill is seeing the pattern through the story.',
        code: 'def solution(X, A):\n    seen = set()\n    for k, v in enumerate(A):\n        seen.add(v)\n        if len(seen) == X:\n            return k\n    return -1' },

      { type: 'predict', code: 'def solution(X, A):\n    seen = set()\n    for k, v in enumerate(A):\n        seen.add(v)\n        if len(seen) == X:\n            return k\n    return -1\n\nprint(solution(3, [1, 3, 1, 2, 3]))', q: 'What prints?',
        choices: ['3', '2', '4', '-1'], why: 'After index 3 the set is {1, 3, 2}, size 3 == X, so the frog crosses at second 3.' },

      { type: 'info', title: 'PermCheck: is A a permutation of 1..N?',
        body: 'Task: A has N numbers. Return 1 if it is exactly the numbers 1..N, each once, in any order. Otherwise 0.\nSimplest check: `sorted(A) == list(range(1, N + 1))`. Correct, but sorting is O(N log N).\nTrap: Codility wants the numbers 1 and 0 here, not True and False.',
        code: 'def solution(A):\n    N = len(A)\n    if sorted(A) == list(range(1, N + 1)):\n        return 1\n    return 0' },

      { type: 'info', title: 'PermCheck in one pass',
        body: 'No sort needed. N values, all between 1 and N, with no repeats, must be exactly 1..N.\nA range check catches bad values. A seen set catches repeats.\nReturn 0 the moment either fails; return 1 after the loop. O(N).',
        code: 'def solution(A):\n    N = len(A)\n    seen = set()\n    for v in A:\n        if v < 1 or v > N or v in seen:\n            return 0\n        seen.add(v)\n    return 1' },

      { type: 'quiz', q: 'PermCheck gets A = [2, 2, 1]. What should `solution` return?',
        choices: ['0', '1', 'False', 'True'],
        why: 'The second 2 is already in seen, so it is not a permutation; Codility wants the number 0, not False.' },

      { type: 'info', title: 'Smallest missing positive',
        body: 'Put A into a set. Count up from 1 with a while loop.\nThe first number that is not in the set is the answer.\nFor [1, 2, 4] it is 3. For [2, 3] it is 1. For an empty list it is 1.',
        code: 'def solution(A):\n    present = set(A)\n    k = 1\n    while k in present:\n        k += 1\n    return k' },

      { type: 'info', title: 'MissingInteger: negatives do no harm',
        body: 'Task: N numbers, possibly negative, zero or up to 1,000,000. Return the smallest positive whole number missing from A.\nInsight: the same code works. Negatives just sit in the set; k never reaches them.\nThe answer is never above N+1, so the while loop stops after at most N+1 steps. O(N).',
        code: 'def solution(A):\n    present = set(A)\n    k = 1\n    while k in present:\n        k += 1\n    return k' },

      { type: 'predict', code: 'def solution(A):\n    present = set(A)\n    k = 1\n    while k in present:\n        k += 1\n    return k\n\nprint(solution([1, 3, 6, 4, 1, 2]))', q: 'What prints?',
        choices: ['5', '7', '0', '6'], why: '1, 2, 3, 4 are present; 5 is the first positive number that is not.' },

      { type: 'info', title: 'Counters warm-up',
        body: 'Start with N counters, all 0: `counters = [0] * N`.\nThe value v in A means "increase counter number v".\nCounter number v lives at index v-1, because counters are numbered from 1 and lists from 0.',
        code: 'def solution(N, A):\n    counters = [0] * N\n    for v in A:\n        counters[v - 1] += 1\n    return counters' },

      { type: 'info', title: 'The max counter rule, done the slow way',
        body: 'A second operation: the value N+1 means "set every counter to the current maximum".\nThe obvious code computes `max(counters)` and rebuilds the whole list.\nCorrect, but each max operation costs N steps. With 100,000 alternating operations that is 10,000,000,000 steps: far too slow.',
        code: 'for v in A:\n    if v == N + 1:\n        top = max(counters)\n        counters = [top] * N    # O(N) every time\n    else:\n        counters[v - 1] += 1' },

      { type: 'info', title: 'MaxCounters, part 1: lazy max',
        body: 'Task: N counters, M operations; 1..N increases a counter, N+1 raises all to the max. Return the final counters in O(N + M).\nInsight: do not touch every counter. Remember two numbers.\n`base`: the floor every counter is at least.\n`cur_max`: the tallest counter so far.\nA max operation only sets `base = cur_max`. One step.',
        code: 'counters = [0] * N\nbase = 0\ncur_max = 0\nfor v in A:\n    if v == N + 1:\n        base = cur_max        # O(1): touch nothing' },

      { type: 'info', title: 'MaxCounters, part 2: lift when touched',
        body: 'When you increase counter v-1, first lift it to `base` if it is below. Then add 1 and update `cur_max`.\nCounters you never touch again are lifted at the very end: `max(c, base)` for each.\nEvery operation is O(1), the final pass is O(N).',
        code: '    else:\n        if counters[v - 1] < base:\n            counters[v - 1] = base\n        counters[v - 1] += 1\n        if counters[v - 1] > cur_max:\n            cur_max = counters[v - 1]\nreturn [max(c, base) for c in counters]' },

      { type: 'predict', code: 'def solution(N, A):\n    counters = [0] * N\n    base = 0\n    cur_max = 0\n    for v in A:\n        if v == N + 1:\n            base = cur_max\n        else:\n            if counters[v - 1] < base:\n                counters[v - 1] = base\n            counters[v - 1] += 1\n            if counters[v - 1] > cur_max:\n                cur_max = counters[v - 1]\n    return [max(c, base) for c in counters]\n\nprint(solution(5, [3, 4, 4, 6, 1, 4, 4]))', q: 'What prints?',
        choices: ['[3, 2, 2, 4, 2]', '[1, 0, 1, 4, 0]', '[3, 2, 2, 2, 2]', '[2, 2, 2, 4, 2]'],
        why: 'After 3, 4, 4 the counters are [0, 0, 1, 2, 0]; 6 sets base = 2; then 1 lifts counter 1 to 3 and 4, 4 take counter 4 to 4; the rest are lifted to 2 at the end.' },

      { type: 'info', title: 'Values of any size: count with a dict',
        body: 'A counting list needs values up to M. With values up to 1,000,000,000 a list that long will not fit in memory.\nA dict stores only the values that occur. `count.get(v, 0)` reads the tally, giving 0 for a new value.\nCount first, then loop over the tallies (how many appear exactly once, which is most common, and so on).',
        code: 'def solution(A):\n    count = {}\n    for v in A:\n        count[v] = count.get(v, 0) + 1\n    ones = 0\n    for v in count:\n        if count[v] == 1:\n            ones += 1\n    return ones' },

      { type: 'info', title: 'Counting equal pairs with a formula',
        body: 'Pairs (i, j) with i < j and A[i] == A[j]. Checking every pair is O(n squared).\nIf a value appears c times, it forms `c * (c - 1) // 2` pairs.\nCount with a dict, then add the formula for every tally. `//` keeps it a whole number.',
        code: 'def solution(A):\n    count = {}\n    for v in A:\n        count[v] = count.get(v, 0) + 1\n    pairs = 0\n    for c in count.values():\n        pairs += c * (c - 1) // 2\n    return pairs' },

      { type: 'quiz', q: 'A value appears 4 times in A. How many equal pairs (i < j) does it make?',
        choices: ['6', '4', '8', '12'],
        why: '4 * 3 // 2 = 6: each of the 4 copies pairs with 3 others, and each pair is counted once.' },

      { type: 'info', title: 'Many queries: count once, answer in O(1)',
        body: 'Q questions about the same list? Do not call `A.count(q)` per question: that is O(N) each, so O(N * Q) in total.\nBuild the counting list once, then each answer is one lookup.\nPrecompute, then query. The prefix-sum topic uses the same move.',
        code: 'def solution(N, A, Q):\n    count = [0] * (N + 1)\n    for v in A:\n        count[v] += 1\n    return [count[q] for q in Q]' },

      { type: 'info', title: 'Cheat sheet',
        body: '`in` on a list is O(n): use a set.\nDistinct values: `len(set(A))`.\nValues 1..M: counting list `[0]*(M+1)`.\nAny values: dict, `count.get(v, 0) + 1`.\nRepeats: seen set.\nAll of 1..X: `len(seen) == X`.\nSmallest missing: count up from 1.\nMaxCounters: `base`, `cur_max`, lift when touched.\nEqual pairs: `c*(c-1)//2`.\nMany queries: count once.\nCondition tally: `below += 1`.' },

      { type: 'quiz', q: 'Problem: "Return the earliest index by which every number 1..K has appeared in A." Which pattern?',
        choices: ['Seen set, return when len(seen) == K', 'Counting list, then count.index(max(count))', 'Sort A and compare with range(1, K + 1)', 'Lazy max with base and cur_max'],
        why: 'It is FrogRiverOne: a set of values met so far reaches size K exactly when all of 1..K have appeared.' }
    ]
  });
})();
