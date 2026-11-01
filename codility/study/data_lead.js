/* Codility study cards — topic "lead": Leader & max slice.
   Teaches the same ladder as codility/data_lead.js, in the same order. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'lead',
    name: 'Leader & max slice',
    tagline: 'Find the value that owns more than half the list, and the run of neighbours with the biggest sum, each in one pass.',
    cards: [

      { type: 'info', title: 'A leader appears more than half the time',
        body: 'The leader of `A` is a value that appears MORE than half the time.\nStrict: with 8 elements you need at least 5. 4 out of 8 is not a leader.\nIn code: `count > len(A) // 2`.\nAt most one value can do this. An empty list has no leader.',
        code: 'count = 0\nfor v in A:\n    if v == X:\n        count += 1\nis_leader = count > len(A) // 2' },

      { type: 'quiz', q: 'A has 8 elements and the value 3 appears 4 times. Is 3 the leader?',
        choices: ['No, 4 is exactly half, not more', 'Yes, it is the most common value', 'Yes, 4 >= 8 // 2', 'Only if 3 is the first element'],
        why: 'len(A) // 2 is 4 and the test is count > 4, so 4 copies fail.' },

      { type: 'info', title: 'Count every value with a dict',
        body: 'One counter per value: `counts[v] = counts.get(v, 0) + 1`.\n`get(v, 0)` returns `0` the first time you meet `v`.\nThen loop over `counts.items()` and return the value with `c > len(A) // 2`, or `-1`.\nCorrect and O(N) time, but it needs O(N) memory. The next cards do it with two variables.',
        code: 'counts = {}\nfor v in A:\n    counts[v] = counts.get(v, 0) + 1\nfor v, c in counts.items():\n    if c > len(A) // 2:\n        return v\nreturn -1' },

      { type: 'predict', code: 'A = [3, 4, 3, 2, 3]\ncounts = {}\nfor v in A:\n    counts[v] = counts.get(v, 0) + 1\nprint(counts)', q: 'What prints?',
        choices: ['{3: 3, 4: 1, 2: 1}', '{3: 2, 4: 1, 2: 1}', '{2: 1, 3: 3, 4: 1}', '[3, 4, 3, 2, 3]'],
        why: 'Keys appear in first-seen order; 3 is seen three times, 4 and 2 once each.' },

      { type: 'info', title: 'Boyer-Moore: one candidate and a size',
        body: 'Find a leader candidate with two variables.\nSame value as `cand`: `size + 1`. Different value: `size - 1`.\n`size` is 0: the next value becomes the new `cand`.\nThink of a stack: push a match, pop on a mismatch.\nWhatever is left is the candidate.',
        code: 'def solution(A):\n    cand, size = -1, 0\n    for v in A:\n        if size == 0: cand, size = v, 1\n        elif v == cand: size += 1\n        else: size -= 1\n    return cand' },

      { type: 'info', title: 'Why the leader always survives',
        body: 'Each `size - 1` step removes a pair of two DIFFERENT values.\nThe leader has more copies than all other values together.\nSo it can never be paired away completely, and it is the final candidate.\nTrap: if there is no leader, the final candidate is just a guess. It must be checked.',
        code: '# [3, 4, 3, 2, 3]: pairs (3,4) and (3,2) cancel\n# one 3 is left -> candidate 3' },

      { type: 'predict', code: 'A = [2, 2, 1, 1, 3]\ncand, size = -1, 0\nfor v in A:\n    if size == 0: cand, size = v, 1\n    elif v == cand: size += 1\n    else: size -= 1\nprint(cand)', q: 'There is no leader here. What prints?',
        choices: ['3', '2', '1', '-1'],
        why: 'Both 2s cancel against both 1s, size is 0, and the last value 3 becomes the candidate although it appears once.' },

      { type: 'info', title: 'Verify the candidate',
        body: 'After the candidate loop, count the candidate for real.\nReturn it only if `A.count(cand) > len(A) // 2`, otherwise `-1`.\nNow the answer is always right: O(N) time, O(1) extra memory.\nThis candidate-plus-check pair is the complete leader algorithm.',
        code: '    # ... candidate loop as before\n    if A.count(cand) > len(A) // 2:\n        return cand\n    return -1' },

      { type: 'quiz', q: 'A has no leader. What does candidate + verify return?',
        choices: ['-1, because the candidate fails the count', 'The candidate, which is the most common value', 'The last element of A', 'It raises an error'],
        why: 'Without a leader no value passes count > len(A) // 2, so the check fails and -1 is returned.' },

      { type: 'info', title: 'Dominator: the task',
        body: 'Codility Dominator: return the INDEX of any element holding the leader, or `-1`. N from 0 to 100,000.\nKey insight: it is candidate + verify with a different last line.\nAfter the check passes, `A.index(cand)` is one valid position. Any index of the leader is accepted.',
        code: '# A = [3, 4, 3, 2, 3, -1, 3, 3] -> 0, 2, 4, 6 or 7\n# A = [1, 2]                     -> -1' },

      { type: 'info', title: 'Dominator: the code',
        body: 'Empty list falls out by itself: `A.count(-1)` is 0, which is not more than 0, so `-1`.\n`A.count` and `A.index` are each one pass, so the whole thing stays O(N).',
        code: 'def solution(A):\n    cand, size = -1, 0\n    for v in A:\n        if size == 0: cand, size = v, 1\n        elif v == cand: size += 1\n        else: size -= 1\n    ok = A.count(cand) > len(A) // 2\n    return A.index(cand) if ok else -1' },

      { type: 'info', title: 'EquiLeader: the task',
        body: 'Codility EquiLeader: count the splits `S` where `A[0..S]` and `A[S+1..N-1]` have the SAME leader. N from 1 to 100,000.\nKey insight: if both parts share a leader, that value is also the leader of the whole list.\nSo find and verify one leader; if there is none, return 0.',
        code: '# A = [4, 3, 4, 4, 4, 2] -> 2\n# S = 0: [4] | [3,4,4,4,2]      S = 2: [4,3,4] | [4,4,2]' },

      { type: 'info', title: 'EquiLeader: running count per split',
        body: 'Walk the splits with a running count `left` of leaders in `A[0..S]`.\nThe right part has `total - left` leaders and `N - S - 1` elements.\nA split counts when both parts pass the strict more-than-half test.\n`S = N - 1` never counts: the right part is empty.',
        code: 'total = A.count(leader)   # leader verified, else return 0\nequi, left = 0, 0\nfor S in range(N):\n    if A[S] == leader: left += 1\n    right = total - left\n    if left > (S + 1) // 2 and right > (N - S - 1) // 2:\n        equi += 1' },

      { type: 'quiz', q: 'In EquiLeader, at split S the left part has S + 1 elements and L leaders. Which test does the left part need?',
        choices: ['L > (S + 1) // 2', 'L >= (S + 1) // 2', 'L > S // 2', 'L * 2 == S + 1'],
        why: 'A leader needs strictly more than half of the elements in its part, and the left part has S + 1 of them.' },

      { type: 'info', title: 'Min so far: a new kind of pass',
        body: 'Now slices. Start with one value that summarises everything to the left.\n`min_so_far` is the smallest value seen up to here. It only ever goes down.\nUpdate it at every step. Questions about "the cheapest earlier day" read straight off it.',
        code: 'min_so_far = A[0]\nfor v in A:\n    min_so_far = min(min_so_far, v)\n# [5, 3, 4, 1, 2] -> 5, 3, 3, 1, 1' },

      { type: 'info', title: 'MaxProfit: the task',
        body: 'Codility MaxProfit: `A[i]` is a share price on day `i`. Buy once, sell later. Return the best profit, or 0 if none. N from 0 to 400,000.\nKey insight: selling on day `i` is best after buying at `min_so_far`. Profit is `price - min_so_far`.\n`best` starts at 0: a losing trade is never taken.',
        code: '# [23171, 21011, 21123, 21366, 21013, 21367] -> 356\n# buy 21011, sell 21367' },

      { type: 'info', title: 'MaxProfit: the code',
        body: 'Two lines per day, in this order: profit first, then let today join `min_so_far`.\nSwap them and you buy and sell on the same day.\nEmpty list and one day both give 0 with no special case.',
        code: 'def solution(A):\n    best = 0\n    min_so_far = A[0] if A else 0\n    for price in A:\n        best = max(best, price - min_so_far)\n        min_so_far = min(min_so_far, price)\n    return best' },

      { type: 'predict', code: 'A = [9, 1, 5, 0, 2]\nbest = 0\nmin_so_far = A[0]\nfor price in A:\n    best = max(best, price - min_so_far)\n    min_so_far = min(min_so_far, price)\nprint(best)', q: 'What prints?',
        choices: ['4', '2', '8', '9'],
        why: 'Buy at 1, sell at 5 gives 4; the later minimum 0 only reaches 2.' },

      { type: 'quiz', q: 'In the MaxProfit loop, why compute the profit before updating min_so_far?',
        choices: ['So you never buy and sell on the same day', 'So min_so_far starts at 0', 'It makes the loop O(1)', 'The order does not matter'],
        why: 'If today joined min_so_far first, price - min_so_far could be 0 from buying and selling on the same day.' },

      { type: 'info', title: 'Kadane: best slice ending here',
        body: 'A slice is a run of one or more neighbours.\nThe best slice ending at `i` either starts at `i` (just `A[i]`) or extends the best slice ending at `i - 1`.\nOne line: `ending_here = max(A[i], ending_here + A[i])`.\nIf the previous best is negative, it only hurts, so the max drops it and restarts.',
        code: '# [3, 2, -6, 4, 0]\n# ending_here: 3, 5, -1, 4, 4' },

      { type: 'info', title: 'MaxSliceSum: the code',
        body: 'Codility MaxSliceSum: the largest sum of any non-empty slice. N up to 1,000,000.\nEvery slice ends somewhere, so the answer is the largest `ending_here`.\nKeep a running `best` instead of a list.',
        code: 'def solution(A):\n    ending_here = best = A[0]\n    for v in A[1:]:\n        ending_here = max(v, ending_here + v)\n        best = max(best, ending_here)\n    return best' },

      { type: 'info', title: 'Trap: all negatives',
        body: 'Start `best` at `A[0]`, not at `0`.\nWith only negative numbers the right answer is the largest single element, which is negative.\nA `best = 0` start would hide it and return 0, a slice that does not exist (the slice must be non-empty).',
        code: '# [-2, -3, -1] -> -1   (just the slice [-1])\n# best = 0 start would wrongly give 0' },

      { type: 'predict', code: 'A = [-2, -3, -1]\nending_here = best = A[0]\nfor v in A[1:]:\n    ending_here = max(v, ending_here + v)\n    best = max(best, ending_here)\nprint(best)', q: 'What prints?',
        choices: ['-1', '0', '-6', '-2'],
        why: 'Each step restarts with the single value, and the largest single value is -1.' },

      { type: 'quiz', q: 'MaxSliceSum on [5, -1, 5]. What is the answer, and why?',
        choices: ['9, crossing the dip still pays', '5, a negative number ends the slice', '10, skip the -1', '4, the dip is subtracted twice'],
        why: 'ending_here goes 5, 4, 9: extending through -1 keeps 4, which beats restarting at 5.' },

      { type: 'info', title: 'MaxDoubleSliceSum: the task',
        body: 'Codility MaxDoubleSliceSum: pick `X < Y < Z`. Sum `A[X+1..Y-1]` plus `A[Y+1..Z-1]`, skipping the three edges. N from 3 to 100,000.\nKey insight: fix the gap `Y`. Left part is the best slice ending at `Y - 1`; right part the best slice starting at `Y + 1`.\nBoth parts may be EMPTY, so the answer is never below 0.',
        code: '# [3, 2, 6, -1, 4, 5, -1, 2] -> 17\n# X=0, Y=3, Z=6: (2 + 6) + (4 + 5) = 17' },

      { type: 'info', title: 'The left array: slices may be empty',
        body: '`left[i]` is the best sum of a slice ending at `i` that may be empty.\nKadane with `max(0, ...)` instead of `max(A[i], ...)`.\n`left[0]` stays 0: index 0 is always an edge `X`, never inside a part.',
        code: 'N = len(A)\nleft = [0] * N\nfor i in range(1, N):\n    left[i] = max(0, left[i - 1] + A[i])\n# [3, 2, 6, -1, 4, 5, -1, 2] -> [0, 2, 8, 7, 11, 16, 15, 17]' },

      { type: 'info', title: 'MaxDoubleSliceSum: the code',
        body: 'Mirror the left array from the right end: `right[i]` is the best slice starting at `i`, `right[N-1]` stays 0.\nThen try every middle `Y` from 1 to `N - 2` and add `left[Y - 1] + right[Y + 1]`.\nThree linear passes: O(N) time, O(N) memory.',
        code: 'right = [0] * N\nfor i in range(N - 2, -1, -1):\n    right[i] = max(0, right[i + 1] + A[i])\nbest = 0\nfor Y in range(1, N - 1):\n    best = max(best, left[Y - 1] + right[Y + 1])\nreturn best' },

      { type: 'quiz', q: 'MaxDoubleSliceSum on [5, 5, 5]. What is the answer?',
        choices: ['0, both parts are empty', '5, the middle value', '10, two of the three', '15, the whole list'],
        why: 'With N = 3 the only triple is (0, 1, 2); all three indices are edges, so both parts are empty and sum to 0.' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Leader: `count > len(A) // 2`, strict.\nBoyer-Moore: match +1, mismatch -1, 0 means new cand. Then VERIFY.\nDominator: verified cand, `A.index(cand)`.\nEquiLeader: running `left`, `right = total - left`, strict test twice.\nMaxProfit: `price - min_so_far`, profit first, `best = 0`.\nKadane: `max(v, ending_here + v)`, `best = A[0]`.\nDouble slice: `left`, `right` with `max(0, ...)`, join at `Y`.' },

      { type: 'quiz', q: 'Which pattern fits: "return the largest sum of a run of neighbours, where every value may be negative"?',
        choices: ['Kadane, with best starting at A[0]', 'Boyer-Moore candidate and verify', 'Min so far and price minus minimum', 'Left and right arrays joined at a gap'],
        why: 'The best slice is the largest ending_here; starting best at A[0] keeps the all-negative case right.' }
    ]
  });
})();
