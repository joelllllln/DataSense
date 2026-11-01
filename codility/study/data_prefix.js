/* Codility study cards — topic: Prefix sums.
   Teaches the ladder of codility/data_prefix.js in the same order:
   slice sum → prefix list → one query → many queries → prefix counts → PassingCars →
   CountDiv → GenomicRangeQuery → MinAvgTwoSlice → zero prefixes → slices with sum K →
   row sums → best slice of length K. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'prefix',
    name: 'Prefix sums',
    tagline: 'Store the running total once, then the sum of any slice is one subtraction.',
    cards: [
      { type: 'info', title: 'Sum of a slice',
        body: 'A slice is a piece of a list. `A[i:j]` is the items from position i up to, but not including, j.\n`sum(A[i:j])` adds them. If i == j the slice is empty and the sum is 0.\nThis costs one step per item in the slice. Fine once, too slow many times.',
        code: 'def solution(A, i, j):\n    return sum(A[i:j])' },

      { type: 'info', title: 'Build the running total: pre',
        body: 'The prefix sum list `pre` stores running totals.\n`pre[k]` is the sum of the first k items, so `pre[0] = 0` and `pre[len(A)]` is the sum of everything.\nIt has one more slot than A. Build it once, in O(N).',
        code: 'def solution(A):\n    pre = [0]\n    for x in A:\n        pre.append(pre[-1] + x)\n    return pre' },

      { type: 'predict', code: 'A = [2, 3, 7]\npre = [0]\nfor x in A:\n    pre.append(pre[-1] + x)\nprint(pre)', q: 'What prints?',
        choices: ['[0, 2, 5, 12]', '[2, 5, 12]', '[0, 2, 3, 7]', '[2, 3, 7, 12]'],
        why: 'Running totals: 0, then 0+2, 2+3, 5+7. The leading 0 is the empty prefix.' },

      { type: 'info', title: 'One slice sum: pre[j+1] - pre[i]',
        body: 'The sum of `A[i..j]`, both ends included, is `pre[j+1] - pre[i]`.\n`pre[j+1]` holds everything up to j; `pre[i]` holds everything before i. Subtract.\nTrap: Codility slices (i, j) include both ends, which is why it is j+1, not j.',
        code: 'def solution(A, i, j):\n    pre = [0]\n    for x in A:\n        pre.append(pre[-1] + x)\n    return pre[j + 1] - pre[i]' },

      { type: 'quiz', q: 'You want the sum of A[2], A[3] and A[4]. Which expression gives it?',
        choices: ['pre[5] - pre[2]', 'pre[4] - pre[2]', 'pre[4] - pre[1]', 'pre[5] - pre[3]'],
        why: 'The slice is i = 2, j = 4, both ends included, so it is pre[j+1] - pre[i] = pre[5] - pre[2].' },

      { type: 'info', title: 'Many queries: build once, answer in O(1)',
        body: 'Codility gives queries as two lists P and Q: query k is the slice `A[P[k]..Q[k]]`.\nBuild `pre` once, BEFORE the loop over the queries. Each answer is then one subtraction.\nTotal O(N + M). Summing each slice on its own is O(N * M), too slow at 100,000 each.',
        code: 'def solution(A, P, Q):\n    pre = [0]\n    for x in A:\n        pre.append(pre[-1] + x)\n    answers = []\n    for k in range(len(P)):\n        answers.append(pre[Q[k] + 1] - pre[P[k]])\n    return answers' },

      { type: 'info', title: 'A prefix sum of 0s and 1s is a prefix count',
        body: 'If A holds only 0s and 1s, adding a 1 raises the total by one and a 0 leaves it alone.\nSo `pre[k]` is how many 1s sit in the first k items.\nSame code, new meaning: count how many of something are in any slice.',
        code: 'def solution(A):\n    count = [0]\n    for x in A:\n        count.append(count[-1] + x)\n    return count' },

      { type: 'info', title: 'Passing cars: one running number',
        body: '0 is a car going east, 1 a car going west. A pair p < q with `A[p] = 0`, `A[q] = 1` is a passing pair.\nNo list needed. Walk once and keep `zeros`, the 0s seen so far.\nEach 1 you meet passes exactly `zeros` cars: add that to the total.',
        code: 'def solution(A):\n    zeros = 0\n    total = 0\n    for x in A:\n        if x == 0:\n            zeros += 1\n        else:\n            total += zeros\n    return total' },

      { type: 'info', title: 'PassingCars: the 1,000,000,000 cap',
        body: 'Task: count the passing pairs, but return -1 if the count is greater than 1,000,000,000.\nInsight: check the cap right after each add and return -1 at once.\nOverflow is not a Python problem; the cap is a rule of the task, not a limit of the language.',
        code: 'def solution(A):\n    zeros = total = 0\n    for x in A:\n        if x == 0: zeros += 1\n        else:      total += zeros\n        if total > 1000000000:\n            return -1       # the cap\n    return total' },

      { type: 'predict', code: 'def solution(A):\n    zeros = total = 0\n    for x in A:\n        if x == 0:\n            zeros += 1\n        else:\n            total += zeros\n            if total > 1000000000:\n                return -1\n    return total\n\nprint(solution([0, 1, 0, 1, 1]))', q: 'What prints?',
        choices: ['5', '3', '6', '4'],
        why: 'The first 1 passes one 0 (total 1); the next two 1s each pass two 0s (total 1 + 2 + 2 = 5).' },

      { type: 'info', title: 'Multiples of K up to B: a formula, no loop',
        body: 'Among 1, 2, ..., B exactly `B // K` numbers divide by K: they are K, 2K, 3K, ... up to `(B // K) * K`.\n`//` is whole-number division.\nB can be 2,000,000,000, so a loop would never finish. Counting by formula is O(1).',
        code: 'def solution(B, K):\n    return B // K' },

      { type: 'info', title: 'CountDiv: the A = 0 trap',
        body: 'Task: how many i with A <= i <= B divide by K? A, B up to 2,000,000,000.\nInsight: prefix idea, formula version. `B // K - A // K` counts multiples in (A, B], left end excluded. If A divides by K, add 1.\nTrap: 0 divides by every K, so A = 0, B = 0 gives 1.',
        code: 'def solution(A, B, K):\n    count = B // K - A // K\n    if A % K == 0:\n        count += 1\n    return count' },

      { type: 'quiz', q: 'CountDiv with A = 0, B = 0, K = 11. What is the answer?',
        choices: ['1', '0', '11', '-1'],
        why: '0 % 11 == 0, so 0 is a multiple of 11; the range [0, 0] holds exactly that one number.' },

      { type: 'info', title: 'Count one letter in a slice',
        body: 'Prefix counts work on strings too. Treat each letter as 1 where it is `A` and 0 elsewhere.\nBuild the count list in one pass, and the number of As in `S[i..j]` is `count[j+1] - count[i]`.\nSame subtraction as before.',
        code: 'def solution(S, i, j):\n    count = [0]\n    for ch in S:\n        count.append(count[-1] + (1 if ch == \'A\' else 0))\n    return count[j + 1] - count[i]' },

      { type: 'info', title: 'Four prefix counts for DNA',
        body: 'A DNA string has four letters: A, C, G, T.\nKeep one prefix count per letter: `cA, cC, cG, cT`, each starting as `[0]`.\nOne pass over S appends to all four, adding 1 only to the list of the current letter.',
        code: 'cA, cC, cG, cT = [0], [0], [0], [0]\nfor ch in S:\n    cA.append(cA[-1] + (1 if ch == \'A\' else 0))\n    cC.append(cC[-1] + (1 if ch == \'C\' else 0))\n    cG.append(cG[-1] + (1 if ch == \'G\' else 0))\n    cT.append(cT[-1] + (1 if ch == \'T\' else 0))' },

      { type: 'info', title: 'GenomicRangeQuery: smallest factor present',
        body: 'Task: factors A = 1, C = 2, G = 3, T = 4. For each slice `S[P[k]..Q[k]]` return the smallest factor present. N 100,000, M 50,000: must be O(N + M).\nInsight: a letter is present when its `count[q+1] - count[p] > 0`. Test A, then C, then G. Otherwise it must be T.',
        code: 'answers = []\nfor k in range(len(P)):\n    p, q = P[k], Q[k] + 1\n    if cA[q] - cA[p] > 0:   answers.append(1)\n    elif cC[q] - cC[p] > 0: answers.append(2)\n    elif cG[q] - cG[p] > 0: answers.append(3)\n    else:                   answers.append(4)\nreturn answers' },

      { type: 'quiz', q: 'In GenomicRangeQuery, why is `cT` never checked when answering a query?',
        choices: ['If A, C and G are absent, the slice can only hold T', 'T has no impact factor', 'T never appears in Codility tests', 'The T count is always zero'],
        why: 'Every letter is one of four; a non-empty slice with no A, C or G is all T, so the answer is 4 by default.' },

      { type: 'info', title: 'Average of a slice',
        body: 'An average is a sum divided by a count.\n`A[i..j]` has `j - i + 1` items, not `j - i`. Off-by-one trap.\nSo the average is `(pre[j+1] - pre[i]) / (j - i + 1)`. Use `/` so the result is a float.',
        code: 'def solution(A, i, j):\n    pre = [0]\n    for x in A:\n        pre.append(pre[-1] + x)\n    return (pre[j + 1] - pre[i]) / (j - i + 1)' },

      { type: 'info', title: 'Same length: compare sums, skip the division',
        body: 'Among slices of the same length, the smallest sum has the smallest average.\nSo for the best pair of neighbours, compare `A[i] + A[i+1]` only.\nTriples work the same with three terms. Replace the best only on a strict `<`, so ties keep the smallest i.',
        code: 'def solution(A):\n    best_sum, best_i = A[0] + A[1], 0\n    for i in range(1, len(A) - 1):\n        s = A[i] + A[i + 1]\n        if s < best_sum:\n            best_sum, best_i = s, i\n    return best_i' },

      { type: 'info', title: 'MinAvgTwoSlice: only length 2 or 3 matters',
        body: 'Task: return the start of the slice (length at least 2) with the smallest average. N up to 100,000.\nInsight: any longer slice can be cut into pieces of length 2 and 3. One of those pieces has an average no bigger than the whole.\nSo the best slice is always a pair or a triple. Check only those: O(N).' },

      { type: 'info', title: 'MinAvgTwoSlice: the code',
        body: 'At each start i: the pair average, and the triple average if a third item exists.\nKeep the smallest seen so far. Use a strict `<` so a tie keeps the earlier start.\nLengths differ now, so divide: compare averages, not sums.',
        code: 'def solution(A):\n    best, best_i = (A[0] + A[1]) / 2, 0\n    for i in range(len(A) - 1):\n        a = (A[i] + A[i + 1]) / 2\n        if i + 2 < len(A):\n            a = min(a, (A[i] + A[i + 1] + A[i + 2]) / 3)\n        if a < best: best, best_i = a, i\n    return best_i' },

      { type: 'predict', code: 'def solution(A):\n    best, best_i = (A[0] + A[1]) / 2, 0\n    for i in range(len(A) - 1):\n        a = (A[i] + A[i + 1]) / 2\n        if i + 2 < len(A):\n            a = min(a, (A[i] + A[i + 1] + A[i + 2]) / 3)\n        if a < best: best, best_i = a, i\n    return best_i\n\nprint(solution([4, 2, 2, 5, 1, 5, 8]))', q: 'What prints?',
        choices: ['1', '3', '0', '4'],
        why: 'The pair (2, 2) starting at index 1 has average 2.0, smaller than any other pair or triple.' },

      { type: 'info', title: 'Count the zero prefix sums',
        body: 'A running total that comes back to 0 means the items so far add up to nothing.\nYou do not need the whole `pre` list: keep the running total and a counter.\nAdd 1 each time the running total is exactly 0.',
        code: 'def solution(A):\n    running = count = 0\n    for x in A:\n        running += x\n        if running == 0:\n            count += 1\n    return count' },

      { type: 'info', title: 'Count slices with sum K: a dict of prefix sums',
        body: 'Slice `A[i..j]` sums to K exactly when `pre[i] == pre[j+1] - K`.\nWalk once. At each step ask a dict how many earlier prefix sums equal `running - K`, then record `running`.\nTrap: start with `seen = {0: 1}` so slices starting at 0 count. Dict lookup is O(1); a list `in` would be O(n).',
        code: 'def solution(A, K):\n    seen = {0: 1}\n    running = total = 0\n    for x in A:\n        running += x\n        total += seen.get(running - K, 0)\n        seen[running] = seen.get(running, 0) + 1\n    return total' },

      { type: 'predict', code: 'def solution(A, K):\n    seen = {0: 1}\n    running = total = 0\n    for x in A:\n        running += x\n        total += seen.get(running - K, 0)\n        seen[running] = seen.get(running, 0) + 1\n    return total\n\nprint(solution([1, 1, 1], 2))', q: 'What prints?',
        choices: ['2', '1', '3', '0'],
        why: 'Prefix sums are 0, 1, 2, 3; slices [0..1] and [1..2] both sum to 2, found as 2-2=0 and 3-2=1 in seen.' },

      { type: 'info', title: 'Sums on a grid: row with the largest sum',
        body: 'A matrix is a list of rows, and each row is a list. `sum(row)` gives one row total.\nLoop over the rows with their index and keep the biggest total.\nReplace only on a strict `>` so a tie keeps the smallest index.',
        code: 'def solution(A):\n    best_sum, best_i = sum(A[0]), 0\n    for i in range(1, len(A)):\n        s = sum(A[i])\n        if s > best_sum:\n            best_sum, best_i = s, i\n    return best_i' },

      { type: 'info', title: 'Best slice of length K',
        body: 'The sum of the K items starting at i is `pre[i+K] - pre[i]`.\nSlide i across the list and keep the largest. Each window is O(1), so the scan is O(N) however big K is.\nThe last window starts at `len(A) - K`, so i runs over `range(len(A) - K + 1)`.',
        code: 'def solution(A, K):\n    pre = [0]\n    for x in A:\n        pre.append(pre[-1] + x)\n    best = pre[K] - pre[0]\n    for i in range(1, len(A) - K + 1):\n        best = max(best, pre[i + K] - pre[i])\n    return best' },

      { type: 'predict', code: 'def solution(A, K):\n    pre = [0]\n    for x in A:\n        pre.append(pre[-1] + x)\n    best = pre[K] - pre[0]\n    for i in range(1, len(A) - K + 1):\n        best = max(best, pre[i + K] - pre[i])\n    return best\n\nprint(solution([1, 2, 3, 4, 5], 2))', q: 'What prints?',
        choices: ['9', '15', '7', '5'],
        why: 'Pairs of neighbours sum to 3, 5, 7, 9; the last window (4, 5) is the largest.' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Build: `pre = [0]`, `pre.append(pre[-1] + x)`.\nSlice A[i..j]: `pre[j+1] - pre[i]`.\nMany queries: build once.\n0/1 list: prefix count; one per letter.\nPassingCars: running `zeros`, cap 1,000,000,000.\nCountDiv: `B//K - A//K`, +1 if `A % K == 0`.\nMinAvgTwoSlice: pairs and triples only.\nSlices summing to K: dict, `seen = {0: 1}`.\nLength K window: `pre[i+K] - pre[i]`.' },

      { type: 'quiz', q: 'Problem: "Given A and 50,000 queries (p, q), return how many negative numbers lie in each A[p..q]." Which pattern?',
        choices: ['Prefix count of a 0/1 list, then count[q+1] - count[p] per query', 'Running total with a dict seen = {0: 1}', 'Compare only pairs and triples', 'A formula with // and no loop'],
        why: 'Mark negatives as 1, build the prefix count once, and each query is one subtraction: O(N + M).' }
    ]
  });
})();
