/* Simple Codility notes — topic: Running totals (prefix sums).
   Short, phone-friendly version of ../data_prefix.js, same order of ideas:
   slice sum → running total → one slice → many queries → running count →
   PassingCars → CountDiv → GenomicRangeQuery → average → MinAvgTwoSlice. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'prefix',
    name: 'Running totals (prefix sums)',
    tagline: 'Store the running total once. Then any slice sum is one subtraction.',
    cards: [
      { type: 'info', title: 'Sum of a slice',
        body: 'A slice is a piece of a list.\n`A[i:j]` is positions i up to j, not including j.\n`sum(A[i:j])` adds them up.\nOne step per item. Fine once, too slow many times.',
        code: 'def solution(A, i, j):\n    return sum(A[i:j])' },

      { type: 'info', title: 'Build the running total',
        body: '`pre[k]` is the sum of the first k items.\n`pre[0]` is 0. The last slot is the sum of everything.\nIt is `cumsum()` with a 0 in front.\nBuild it once.',
        code: 'pre = [0]\nfor x in A:\n    pre.append(pre[-1] + x)' },

      { type: 'predict', code: 'A = [2, 3, 7]\npre = [0]\nfor x in A:\n    pre.append(pre[-1] + x)\nprint(pre)', q: 'What prints?',
        choices: ['[0, 2, 5, 12]', '[2, 5, 12]', '[0, 2, 3, 7]'], why: 'Running totals: 0, then 2, 5, 12.' },

      { type: 'info', title: 'Any slice sum: one subtraction',
        body: 'Sum of `A[i..j]`, both ends included, is `pre[j+1] - pre[i]`.\n`pre[j+1]` holds everything up to j. `pre[i]` holds everything before i.\nTrap: Codility slices include both ends. That is why j + 1.',
        code: 'def solution(A, i, j):\n    pre = [0]\n    for x in A:\n        pre.append(pre[-1] + x)\n    return pre[j + 1] - pre[i]' },

      { type: 'quiz', q: 'You want A[2] + A[3] + A[4]. Which expression?',
        choices: ['pre[5] - pre[2]', 'pre[4] - pre[2]', 'pre[4] - pre[1]'],
        why: 'i is 2, j is 4. So pre[j+1] - pre[i].' },

      { type: 'info', title: 'Many questions: build once',
        body: 'Codility gives queries as two lists P and Q.\nQuery k is the slice `A[P[k]..Q[k]]`.\nSumming each slice again is 100,000 times 100,000 steps. Too slow.\nBuild `pre` once, before the loop. Each answer is one subtraction.',
        code: 'pre = [0]\nfor x in A:\n    pre.append(pre[-1] + x)\nres = []\nfor p, q in zip(P, Q):   # P[k], Q[k]\n    res.append(pre[q + 1] - pre[p])' },

      { type: 'info', title: 'Counting with a running total',
        body: 'A holds only 0s and 1s? The running total counts the 1s.\n`pre[k]` is how many 1s sit in the first k items.\nSame code, new meaning: count anything in any slice.',
        code: 'ones = [0]\nfor x in A:\n    ones.append(ones[-1] + x)\n# 1s in A[i..j]: ones[j + 1] - ones[i]' },

      { type: 'info', title: 'PassingCars',
        body: 'Asks: 0 is a car going east, 1 going west. Count pairs where a 0 comes before a 1. Over a billion? Return -1.\nTrick: keep `zeros`, the 0s seen so far. Each 1 passes exactly `zeros` cars.',
        code: 'zeros = total = 0\nfor x in A:\n    if x == 0: zeros += 1\n    else: total += zeros\n    if total > 1000000000: return -1\nreturn total' },

      { type: 'predict', code: 'zeros = total = 0\nfor x in [0, 1, 0, 1, 1]:\n    if x == 0: zeros += 1\n    else: total += zeros\nprint(total)', q: 'What prints?',
        choices: ['5', '3', '6'], why: 'The first 1 passes one 0. The next two pass two each.' },

      { type: 'info', title: 'Multiples up to B: no loop',
        body: 'How many numbers from 1 to B divide by K?\nExactly `B // K`. They are K, 2K, 3K and so on.\n`//` is whole-number division.\nB can be 2 billion, so a loop would never finish.',
        code: 'def solution(B, K):\n    return B // K' },

      { type: 'info', title: 'CountDiv',
        body: 'Asks: how many numbers from A to B divide by K?\nTrick: `B // K` minus `A // K`.\nThat drops A itself. If A divides by K, add 1 back.\nTrap: 0 divides by everything.',
        code: 'def solution(A, B, K):\n    count = B // K - A // K\n    if A % K == 0:\n        count += 1\n    return count' },

      { type: 'info', title: 'One count list per letter',
        body: 'A DNA string has letters A, C, G, T.\nKeep a running count for each letter.\n`ch == \'A\'` is True or False. Adding it adds 1 or 0.\nT is not needed. You will see why.',
        code: 'cA, cC, cG = [0], [0], [0]\nfor ch in S:\n    cA.append(cA[-1] + (ch == \'A\'))\n    cC.append(cC[-1] + (ch == \'C\'))\n    cG.append(cG[-1] + (ch == \'G\'))' },

      { type: 'info', title: 'GenomicRangeQuery',
        body: 'Asks: letters score A 1, C 2, G 3, T 4. For each slice, the smallest score present.\nTrick: a letter is in the slice when its count grew. Test A, then C, then G. Else it must be T.',
        code: 'res = []\nfor p, q in zip(P, Q):\n    if cA[q+1] - cA[p] > 0: res.append(1)\n    elif cC[q+1] - cC[p] > 0: res.append(2)\n    elif cG[q+1] - cG[p] > 0: res.append(3)\n    else: res.append(4)' },

      { type: 'info', title: 'Average of a slice',
        body: 'Average is sum divided by count.\n`A[i..j]` has `j - i + 1` items, not `j - i`. Off-by-one trap.\nSo divide `pre[j+1] - pre[i]` by `j - i + 1`.\nUse `/` to get a decimal.',
        code: 'def solution(A, i, j):\n    pre = [0]\n    for x in A:\n        pre.append(pre[-1] + x)\n    s = pre[j + 1] - pre[i]\n    return s / (j - i + 1)' },

      { type: 'info', title: 'MinAvgTwoSlice',
        body: 'Asks: the start of the slice with the smallest average. Length at least 2.\nTrick: any long slice splits into pairs and triples. One piece has an average no bigger than the whole.\nSo check only pairs and triples.',
        code: 'best, start = (A[0] + A[1]) / 2, 0\nfor i in range(len(A) - 1):\n    a = (A[i] + A[i+1]) / 2\n    if i + 2 < len(A):\n        a = min(a, (A[i]+A[i+1]+A[i+2])/3)\n    if a < best: best, start = a, i' },

      { type: 'quiz', q: 'MinAvgTwoSlice: which slice lengths must you check?',
        choices: ['Only 2 and 3', 'Every length up to N', 'Only 2'],
        why: 'Longer slices split into pairs and triples. One piece is as good.' },

      { type: 'quiz', q: 'For 50,000 slices, count the negative numbers in each. Which trick?',
        choices: ['Running count of a 0/1 list', 'Sum each slice with sum()', 'Check only pairs and triples'],
        why: 'Mark negatives as 1. Build once. Each answer is one subtraction.' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Build → `pre.append(pre[-1] + x)`\nSlice A[i..j] → `pre[j+1] - pre[i]`\nQueries → build once\nCount in slices → 0/1 total\nPassingCars → count `zeros`, cap 1 billion\nCountDiv → `B//K - A//K`, fix A\nMinAvgTwoSlice → pairs, triples' }
    ]
  });
})();
