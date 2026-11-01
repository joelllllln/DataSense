/* Codility study cards — topic "window": Sliding window (caterpillar).
   Teaches the same ladder as codility/data_window.js, in the same order. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'window',
    name: 'Sliding window',
    tagline: 'Answer questions about every run of neighbours in one pass, by moving a window instead of rebuilding it.',
    cards: [

      { type: 'info', title: 'A window is a slice',
        body: 'A window is a run of numbers that sit next to each other.\nA window of length `K` that starts at index `P` is the slice `A[P:P+K]`.\nSlices stop just before the end index, so the window ends at `P+K`, not `P+K-1`.\n`sum()` adds it up.',
        code: 'A = [1, 2, 3, 4, 5]\nsum(A[:2])      # first window: 1 + 2 = 3\nsum(A[1:1 + 3])  # window at P=1, K=3: 2 + 3 + 4 = 9' },

      { type: 'predict', code: 'A = [1, 2, 3, 4, 5]\nP = 2\nK = 2\nprint(sum(A[P:P + K]))', q: 'What prints?',
        choices: ['7', '5', '12', '9'],
        why: 'A[2:4] is [3, 4], so the sum is 7.' },

      { type: 'info', title: 'Trap: re-summing every window is slow',
        body: 'There is a window at every start from `0` to `len(A) - K`.\nSumming each slice again costs about `N * K` additions.\nFor `N = 100,000` and `K = 50,000` that is 2,500,000,000 steps. Codility times out.\nThe window at `P+1` shares `K-1` numbers with the window at `P`. Do not add them twice.',
        code: 'for P in range(len(A) - K + 1):\n    result.append(sum(A[P:P + K]))   # O(N * K), too slow' },

      { type: 'info', title: 'Fixed window: slide, do not re-sum',
        body: 'When the window moves one step right, one number comes in on the right and one leaves on the left.\nKeep a running `total`: add `A[P + K]`, subtract `A[P]`.\nSum the first window once, then slide. One add and one subtract per step: O(N).',
        code: 'def solution(A, K):\n    total = sum(A[:K])\n    result = [total]\n    for P in range(len(A) - K):\n        total += A[P + K] - A[P]\n        result.append(total)\n    return result' },

      { type: 'quiz', q: 'A window of length K slides one step right. What changes in the running total?',
        choices: ['Add the new right value, subtract the old left value', 'Re-sum the whole window', 'Add the new right value only', 'Subtract the old left value only'],
        why: 'Exactly one number enters on the right and one leaves on the left.' },

      { type: 'info', title: 'Handle the first window before the loop',
        body: 'The loop only produces windows 1, 2, 3 and so on. Window 0 is special.\nStart `best` from the first window\'s sum, not from `0`: every sum could be negative.\nCounting windows that pass a test? Test the first window before the loop too.\nUse `>` so the first of equal windows keeps its index.',
        code: 'total = sum(A[:K])\nbest = total                 # not 0\nfor P in range(len(A) - K):\n    total += A[P + K] - A[P]\n    if total > best:\n        best = total' },

      { type: 'predict', code: 'A = [1, 3, 2, 6, -1, 4]\nK = 3\ntotal = sum(A[:K])\nbest = total\nfor P in range(len(A) - K):\n    total += A[P + K] - A[P]\n    best = max(best, total)\nprint(best)', q: 'What prints?',
        choices: ['11', '9', '6', '10'],
        why: 'The window sums are 6, 11, 7, 9; the best is 11 from [3, 2, 6].' },

      { type: 'info', title: 'Caterpillar: front moves forward, back catches up',
        body: 'Now the length is not fixed. Two ends, both only move right.\nThe `front` grows the window and adds `A[front]`.\nWhen the window breaks the rule (sum over `S`), the `back` moves right and removes numbers until it fits.\nThe window is `A[back..front]`, length `front - back + 1`.\nNumbers must be positive, so shrinking always helps.',
        code: 'total, back, best = 0, 0, 0\nfor front in range(len(A)):\n    total += A[front]\n    while total > S:\n        total -= A[back]\n        back += 1\n    best = max(best, front - back + 1)' },

      { type: 'info', title: 'Why the caterpillar is O(n)',
        body: 'There is a `while` inside a `for`, which looks like O(n squared). It is not.\n`front` moves forward at most `n` times in total. `back` also moves forward at most `n` times in total.\nNeither ever goes backwards.\nSo all the inner steps together are at most `n`. Total work: about `2n`, which is O(n).',
        code: '# front: 0 -> n   (n moves, ever)\n# back:  0 -> n   (n moves, ever)\n# total moves <= 2n' },

      { type: 'quiz', q: 'The caterpillar has a while loop inside a for loop. Why is it still O(n)?',
        choices: ['Each pointer only moves forward, at most n times in total', 'The while loop runs at most once per step', 'Python optimises nested loops', 'It is O(n squared); Codility just allows it'],
        why: 'Count pointer moves, not loop nesting: front and back each move at most n times, so about 2n steps in all.' },

      { type: 'predict', code: 'A = [3, 1, 2, 1, 1, 4]\nS = 5\ntotal, back, best = 0, 0, 0\nfor front in range(len(A)):\n    total += A[front]\n    while total > S:\n        total -= A[back]\n        back += 1\n    best = max(best, front - back + 1)\nprint(best)', q: 'Longest slice with sum at most 5. What prints?',
        choices: ['4', '3', '2', '6'],
        why: '[1, 2, 1, 1] has sum 5 and length 4; no longer slice fits.' },

      { type: 'info', title: 'Count slices: add front - back + 1',
        body: 'After the back catches up, `A[back..front]` is the longest good slice ending at `front`.\nEvery shorter slice ending at `front` is good too. They start at `back`, `back+1`, ..., `front`.\nThat is `front - back + 1` slices. Add it to a counter instead of taking a max.\nEach slice is counted once, by its right end.',
        code: 'count = 0\nfor front in range(len(A)):\n    total += A[front]\n    while total > S:\n        total -= A[back]\n        back += 1\n    count += front - back + 1' },

      { type: 'quiz', q: 'The caterpillar settles with back = 2 and front = 5. How many good slices end at index 5?',
        choices: ['4', '3', '5', '6'],
        why: 'Starts 2, 3, 4, 5 all work: front - back + 1 = 5 - 2 + 1 = 4.' },

      { type: 'info', title: 'Shortest slice: shrink while still good',
        body: 'Want the shortest slice with sum at least `S`? Flip the while.\nShrink from the back while the window is still good, recording each length.\nStop when it stops being good, then let the front move on.\nLongest: shrink while bad. Shortest: shrink while good.',
        code: 'for front in range(len(A)):\n    total += A[front]\n    while total >= S:\n        best = min(best, front - back + 1)\n        total -= A[back]\n        back += 1' },

      { type: 'info', title: 'The window state can be a set',
        body: 'The rule does not have to be a sum. For "no repeated value", keep a `set` of what is inside the window.\nBefore adding `A[front]`, shrink from the back while it is already in the set.\nAnything works as window state if you can add on the right and remove on the left.',
        code: 'seen, back, best = set(), 0, 0\nfor front in range(len(A)):\n    while A[front] in seen:\n        seen.remove(A[back])\n        back += 1\n    seen.add(A[front])\n    best = max(best, front - back + 1)' },

      { type: 'info', title: 'Window with a count dict',
        body: 'A set cannot say how many copies are inside. Use a dict of counts.\nValue enters: `counts[x] = counts.get(x, 0) + 1`.\nValue leaves: subtract one, and `del` the key when it hits zero.\nThen `len(counts)` is the number of distinct values in the window.',
        code: 'counts = {}\nfor i in range(K):\n    counts[A[i]] = counts.get(A[i], 0) + 1\nfor P in range(len(A) - K):\n    new, old = A[P + K], A[P]\n    counts[new] = counts.get(new, 0) + 1\n    counts[old] -= 1\n    if counts[old] == 0: del counts[old]' },

      { type: 'quiz', q: 'In the count-dict window, why delete the key when its count reaches 0?',
        choices: ['So len(counts) only counts values really inside the window', 'To save memory on big inputs', 'Because negative counts crash Python', 'Dicts cannot store 0'],
        why: 'A key with count 0 would still be counted by len(counts), giving too many distinct values.' },

      { type: 'info', title: 'CountDistinctSlices: the task',
        body: 'Given `M` and a list `A` (N up to 100,000), count the slices whose values are all different. Cap the answer at 1,000,000,000.\nKey insight: two ideas joined. The rule "no repeats" is the set caterpillar. The count is `front - back + 1` for each front.\n`M` is not needed in Python.',
        code: '# A = [3, 4, 5, 5, 2] -> 9 distinct slices\n# (0,0) (0,1) (0,2) (1,1) (1,2) (2,2) (3,3) (3,4) (4,4)' },

      { type: 'info', title: 'CountDistinctSlices: the code',
        body: 'Set caterpillar plus the counting line. Return `min(count, 1000000000)`.\nStopping early once `count` passes the cap also works.\nO(N): each value enters the set once and leaves at most once.',
        code: 'seen, back, count = set(), 0, 0\nfor front in range(len(A)):\n    while A[front] in seen:\n        seen.remove(A[back])\n        back += 1\n    seen.add(A[front])\n    count += front - back + 1\n# answer: min(count, 1000000000)' },

      { type: 'predict', code: 'A = [1, 2, 1, 2]\nseen, back, count = set(), 0, 0\nfor front in range(len(A)):\n    while A[front] in seen:\n        seen.remove(A[back])\n        back += 1\n    seen.add(A[front])\n    count += front - back + 1\nprint(count)', q: 'CountDistinctSlices on [1, 2, 1, 2]. What prints?',
        choices: ['7', '10', '4', '6'],
        why: 'Per front the window lengths are 1, 2, 2, 2, so 1 + 2 + 2 + 2 = 7.' },

      { type: 'info', title: 'AbsDistinct: the task',
        body: 'Given a sorted list `A` (N up to 100,000, values can be negative), count the distinct absolute values.\n`len(set(abs(x) for x in A))` works. The pattern to learn: two pointers that start at both ends.\nKey insight: in a sorted list the biggest absolute value is always at one of the two ends.',
        code: '# A = [-5, -3, -1, 0, 3, 6]\n# abs values 5, 3, 1, 0, 3, 6 -> distinct {0, 1, 3, 5, 6} -> 5' },

      { type: 'info', title: 'AbsDistinct: the code',
        body: 'Compare `abs(A[left])` with `abs(A[right])`. Take the bigger, count it once.\nMove every pointer whose absolute value equals it past all copies.\nEach round removes one distinct value; pointers only move inwards, so O(N) and no extra memory.',
        code: 'left, right, count = 0, len(A) - 1, 0\nwhile left <= right:\n    value = max(abs(A[left]), abs(A[right]))\n    count += 1\n    while left <= right and abs(A[left]) == value:\n        left += 1\n    while left <= right and abs(A[right]) == value:\n        right -= 1' },

      { type: 'info', title: 'MinAbsSumOfTwo: the task',
        body: 'Given `A` (N up to 100,000), return the smallest `abs(A[p] + A[q])` with `p <= q`. A number may pair with itself.\nKey insight: sort, then two end pointers. Move the pointer that pulls the sum towards zero.\nSum negative: `left` up (bigger number). Sum positive or zero: `right` down.\nSorting makes it O(N log N).',
        code: '# A = [1, 4, -3]   -> 1   (4 + -3)\n# A = [-5]         -> 10  (-5 + -5, p == q)' },

      { type: 'info', title: 'MinAbsSumOfTwo: the code',
        body: 'Sort first. Record `abs(total)` at every step and keep the minimum.\nLoop while `left <= right`, not `<`: `p` may equal `q`.\nReturn `best`.',
        code: 'A = sorted(A)\nleft, right = 0, len(A) - 1\nbest = abs(2 * A[0])\nwhile left <= right:\n    total = A[left] + A[right]\n    best = min(best, abs(total))\n    if total < 0: left += 1\n    else: right -= 1' },

      { type: 'quiz', q: 'Sorted A, two end pointers. A[left] + A[right] is -7. Which pointer moves?',
        choices: ['left moves up, to make the sum bigger', 'right moves down, to make the sum smaller', 'Both move inwards', 'Neither; record -7 and stop'],
        why: 'A negative sum gets closer to zero only with a bigger left number; the right number is already the largest available.' },

      { type: 'info', title: 'CountTriangles: the task',
        body: 'Given `A` (N up to 1,000), count triplets `P < Q < R` where every two sides beat the third.\nKey insight: sort. Then `A[R]` is the biggest, so only `A[P] + A[Q] > A[R]` needs checking.\nFix `P`, move `Q` right; `R` never moves back for the same `P`. O(N squared), fine for N = 1,000.',
        code: '# A = [10, 2, 5, 1, 8, 12] -> 4\n# (2,5,8) (5,8,10) (5,8,12) (8,10,12)' },

      { type: 'info', title: 'CountTriangles: the code',
        body: 'For each `(P, Q)`, push `R` forward while the two small sides beat `A[R]`.\nEvery index strictly between `Q` and `R` is a valid third side: `R - Q - 1` triplets.\nStart `R` at `P + 2` once per `P`, not per `Q`.',
        code: 'A = sorted(A)\nN, count = len(A), 0\nfor P in range(N - 2):\n    R = P + 2\n    for Q in range(P + 1, N - 1):\n        while R < N and A[P] + A[Q] > A[R]:\n            R += 1\n        count += R - Q - 1' },

      { type: 'quiz', q: 'In CountTriangles, for a fixed P and Q the while loop stops with R = 7 and Q = 3. How many triangles does this (P, Q) add?',
        choices: ['3', '4', '7', '1'],
        why: 'Valid R values are 4, 5, 6, which is R - Q - 1 = 7 - 3 - 1 = 3.' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Fixed window: `total += A[P + K] - A[P]`; window 0 before the loop.\nLongest slice: back removes `while bad`; max of `front - back + 1`.\nCount slices: `count += front - back + 1`.\nShortest slice: shrink `while good`.\nState: sum, set, or count dict (`del` at 0).\nSorted: two end pointers.\nThree indices: R only moves forward.' },

      { type: 'quiz', q: 'Which pattern fits: "count the slices of positive numbers whose sum is at most S"?',
        choices: ['Caterpillar, adding front - back + 1 at each front', 'Fixed window of length K', 'Two pointers from both ends of a sorted list', 'Count dict over a fixed window'],
        why: 'The length is not fixed and the rule is a sum, so the caterpillar settles per front and front - back + 1 good slices end there.' }
    ]
  });
})();
