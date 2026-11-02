/* Simple Codility notes — topic "lead": Leader & best slice.
   Short phone-friendly version of ../data_lead.js, same ideas, same order. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'lead',
    name: 'Leader & best slice',
    tagline: 'Find the value that owns more than half the list, and the run of neighbours with the biggest sum.',
    cards: [

      { type: 'info', title: 'A leader is more than half',
        body: 'The leader is the value that fills more than half the list.\n8 numbers need 5 copies. 4 out of 8 is not enough.\nIn code: `count > len(A) // 2`.\nAt most one value can do this.',
        code: 'A = [3, 4, 3, 2, 3]\nA.count(3)                 # 3\nlen(A) // 2                # 2\nA.count(3) > len(A) // 2   # True, leader' },

      { type: 'quiz', q: 'A has 8 numbers and the value 3 appears 4 times. Is 3 the leader?',
        choices: ['No, 4 is exactly half', 'Yes, it is the most common', 'Yes, 4 is at least 8 // 2'],
        why: 'len(A) // 2 is 4. The count must be more than 4.' },

      { type: 'info', title: 'Count with a dict',
        body: 'In pandas you would use value_counts.\nIn plain Python, use a dict.\n`counts.get(v, 0) + 1` adds one, even the first time.\nThen find the value with count over half.\nIt works, but it needs extra memory.',
        code: 'counts = {}\nfor v in A:\n    counts[v] = counts.get(v, 0) + 1\nfor v, c in counts.items():\n    if c > len(A) // 2:\n        return v' },

      { type: 'info', title: 'One guess and a size',
        body: 'Find a leader guess with two variables.\nSame value as `cand`: size goes up one.\nDifferent value: size goes down one.\nSize is 0: the next value becomes `cand`.\nWhatever is left at the end is the guess.',
        code: 'cand, size = -1, 0\nfor v in A:\n    if size == 0: cand, size = v, 1\n    elif v == cand: size += 1\n    else: size -= 1' },

      { type: 'info', title: 'Why the leader survives',
        body: 'Each size down step throws out a pair of different values.\nThe leader has more copies than all the others together.\nSo it can never be thrown out completely.\nTrap: with no leader, `cand` is only a guess.',
        code: '# [3, 4, 3, 2, 3]\n# pair (3, 4) out, pair (3, 2) out\n# one 3 is left -> cand = 3' },

      { type: 'predict', code: 'cand, size = -1, 0\nfor v in [2, 2, 1, 1, 3]:\n    if size == 0: cand, size = v, 1\n    else: size += 1 if v == cand else -1\nprint(cand)', q: 'No value is a leader here. What prints?',
        choices: ['3', '2', '-1'],
        why: 'The two 2s cancel the two 1s. Then 3 becomes cand.' },

      { type: 'info', title: 'Always check the guess',
        body: 'After the loop, count `cand` for real.\nReturn it only if `A.count(cand) > len(A) // 2`.\nOtherwise return -1.\nGuess plus check is the whole leader trick. Fast enough, no extra memory.',
        code: 'if A.count(cand) > len(A) // 2:\n    return cand\nreturn -1' },

      { type: 'info', title: 'Dominator',
        body: 'Return any index of the leader, or -1.\nTrick: guess plus check, then `A.index(cand)`.\nAn empty list gives -1 on its own.',
        code: 'cand, size = -1, 0\nfor v in A:\n    if size == 0: cand, size = v, 1\n    else: size += 1 if v == cand else -1\nok = A.count(cand) > len(A) // 2\nreturn A.index(cand) if ok else -1' },

      { type: 'info', title: 'EquiLeader',
        body: 'Count splits `S` where both sides share the same leader.\nTrick: that value is the leader of the whole list.\nFind and check it, else return 0.\nWalk `S` with a running `left` count. Right is `total - left`.',
        code: 'total, left, equi = A.count(lead), 0, 0\nfor S in range(N):\n    if A[S] == lead: left += 1\n    ok_l = left > (S + 1) // 2\n    ok_r = total - left > (N - S - 1) // 2\n    if ok_l and ok_r: equi += 1' },

      { type: 'quiz', q: 'EquiLeader: the left side has S + 1 numbers and L leaders. Which test?',
        choices: ['L > (S + 1) // 2', 'L >= (S + 1) // 2', 'L > S // 2'],
        why: 'A leader needs strictly more than half of its own side.' },

      { type: 'info', title: 'Min so far',
        body: 'Now slices. Keep one number that sums up everything to the left.\n`min_so_far` is the smallest value seen so far.\nIt only ever goes down. In pandas this is cummin.',
        code: 'min_so_far = A[0]\nfor v in A:\n    min_so_far = min(min_so_far, v)\n# [5, 3, 4, 1, 2] -> 5, 3, 3, 1, 1' },

      { type: 'info', title: 'MaxProfit',
        body: 'Prices by day. Buy once, sell later. Best profit, or 0.\nTrick: sell today, buy at `min_so_far`.\nProfit first, then let today join the min.\nSwap those two lines and you buy and sell the same day.',
        code: 'best = 0\nmin_so_far = A[0] if A else 0\nfor price in A:\n    best = max(best, price - min_so_far)\n    min_so_far = min(min_so_far, price)\nreturn best' },

      { type: 'predict', code: 'best, low = 0, 9\nfor price in [9, 1, 5, 0, 2]:\n    best = max(best, price - low)\n    low = min(low, price)\nprint(best)', q: 'What prints?',
        choices: ['4', '2', '8'],
        why: 'Buy at 1, sell at 5. The later 0 only reaches 2.' },

      { type: 'info', title: 'Best slice ending here',
        body: 'A slice is a run of neighbours.\nBest slice ending at `i`: start fresh, or extend the last one.\nOne line: `here = max(v, here + v)`.\nA negative past only hurts, so max drops it.',
        code: '# A    = [3, 2, -6, 4, 0]\n# here =  3, 5, -1, 4, 4' },

      { type: 'info', title: 'MaxSliceSum',
        body: 'Largest sum of any non-empty slice.\nTrick: the answer is the biggest `here`.\nTrap: start `best` at `A[0]`, not 0.\nAll negatives: the answer is the biggest single number, which is negative.',
        code: 'here = best = A[0]\nfor v in A[1:]:\n    here = max(v, here + v)\n    best = max(best, here)\nreturn best' },

      { type: 'info', title: 'MaxDoubleSliceSum',
        body: 'Pick `X < Y < Z`. Sum what sits between them.\nTrick: `L[i]` is the best slice ending at `i`, may be empty.\n`R[i]` mirrors it from the right. Try every middle `Y`.\nStart `L`, `R`, `best` at zero.',
        code: 'for i in range(1, N):\n    L[i] = max(0, L[i - 1] + A[i])\nfor i in range(N - 2, -1, -1):\n    R[i] = max(0, R[i + 1] + A[i])\nfor Y in range(1, N - 1):\n    best = max(best, L[Y - 1] + R[Y + 1])' },

      { type: 'quiz', q: 'Which pattern fits: largest sum of a run of neighbours, values may be negative?',
        choices: ['Best slice ending here, best = A[0]', 'Guess and check the leader', 'Min so far, price minus min'],
        why: 'The best slice is the biggest here. A[0] keeps all-negatives right.' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Leader → over half.\nFind it → guess, size, then check.\nEquiLeader → left count, test both sides.\nMaxProfit → price minus min so far.\nMaxSliceSum → `max(v, here + v)`.\nDouble slice → L, R, join at Y.' }
    ]
  });
})();
