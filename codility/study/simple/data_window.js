/* Simple Codility notes — topic "window": Sliding window.
   Short phone-friendly version of ../data_window.js, same ideas, same order. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'window',
    name: 'Sliding window',
    tagline: 'Answer questions about every run of neighbours by moving a window, not rebuilding it.',
    cards: [

      { type: 'info', title: 'A window is a slice',
        body: 'A window is a few numbers side by side in a list.\n`A[1:4]` takes spots 1, 2 and 3. It stops before 4.\nIn pandas this is rolling. Here we move it by hand.',
        code: 'A = [1, 2, 3, 4, 5]\nA[1:4]        # [2, 3, 4]\nsum(A[1:4])   # 9' },

      { type: 'predict', code: 'A = [1, 2, 3, 4, 5]\nprint(sum(A[2:4]))', q: 'What prints?',
        choices: ['7', '5', '12'],
        why: 'A[2:4] is [3, 4]. Their sum is 7.' },

      { type: 'info', title: 'Too slow: add every window again',
        body: 'Summing each window from scratch repeats work.\nA loop inside a loop on 100,000 numbers is 10 billion steps. Too slow.\nThe next window shares most numbers with this one.\nDo not add them twice.',
        code: 'for P in range(len(A) - K + 1):\n    total = sum(A[P:P + K])   # too slow' },

      { type: 'info', title: 'Slide: add one, drop one',
        body: 'Move the window one step right.\nOne number comes in on the right. One leaves on the left.\nAdd the new one, take away the old one.\nThe total stays right and you never re-add.',
        code: 'A = [1, 2, 3, 4, 5]\ntotal = 1 + 2       # [1, 2] = 3\ntotal += 3 - 1      # [2, 3] = 5\ntotal += 4 - 2      # [3, 4] = 7\ntotal += 5 - 3      # [4, 5] = 9' },

      { type: 'info', title: 'The fixed window code',
        body: 'Sum the first window once. Then slide.\n`A[P + K]` comes in, `A[P]` goes out.\nStart `best` from the first window, not from 0.\nSums can be negative, so 0 would be wrong.',
        code: 'total = sum(A[:K])\nbest = total            # not 0\nfor P in range(len(A) - K):\n    total += A[P + K] - A[P]\n    best = max(best, total)' },

      { type: 'quiz', q: 'The window slides one step right. What changes in the running total?',
        choices: ['Add new right number, drop old left', 'Add the whole window again', 'Add the new right number only'],
        why: 'One number comes in on the right and one leaves on the left.' },

      { type: 'predict', code: 'A = [1, 3, 2, 6, -1, 4]\ntotal = sum(A[:3])\nfor P in range(3):\n    total += A[P + 3] - A[P]\nprint(total)', q: 'A window of length 3 slides to the end. What prints?',
        choices: ['9', '11', '6'],
        why: 'The last window is [6, -1, 4]. Its sum is 9.' },

      { type: 'info', title: 'Caterpillar: front moves, back catches up',
        body: 'Now the length is not fixed.\nThe front moves right and adds a number.\nIf the sum gets too big, the back catches up.\nIt drops numbers until the window fits again.\nBoth ends only ever move right.',
        code: '# A = [3, 1, 2, 4], sum at most 5\n# front 0: [3]           ok\n# front 1: [3, 1]        ok\n# front 2: [3, 1, 2] = 6 drop 3 -> [1, 2]\n# front 3: [1, 2, 4] = 7 drop 1, 2 -> [4]' },

      { type: 'info', title: 'The caterpillar code',
        body: 'Longest window with sum at most `S`.\nStart `total`, `back` and `best` at 0.\nThe while loop is the back catching up.\nWindow length is `front - back + 1`.\nNumbers must be positive, so dropping always helps.',
        code: 'for front in range(len(A)):\n    total += A[front]\n    while total > S:\n        total -= A[back]\n        back += 1\n    best = max(best, front - back + 1)' },

      { type: 'info', title: 'Why it is fast enough',
        body: 'A loop inside a loop looks slow. It is not.\nThe front only moves right, once per number.\nThe back only moves right too, at most once per number.\nAbout two moves per number in total. Fast enough.',
        code: '# front: at most len(A) moves, ever\n# back:  at most len(A) moves, ever' },

      { type: 'quiz', q: 'The caterpillar has a while inside a for. Why is it still fast enough?',
        choices: ['Both ends only move right, once per number', 'The while runs once at most', 'Python makes nested loops fast'],
        why: 'Count moves, not loops. Front and back each move at most len(A) times.' },

      { type: 'info', title: 'Count slices, do not max',
        body: 'Once the back catches up, the window fits.\nEvery shorter slice ending at `front` fits too.\nThey start at `back`, `back + 1`, up to `front`.\nThat is `front - back + 1` slices. Add it to a counter.',
        code: '    count += front - back + 1\n# A = [1, 2, 3], sum at most 3\n# front 0: [1]        adds 1\n# front 1: [1, 2]     adds 2\n# front 2: [3]        adds 1  -> 4 slices' },

      { type: 'info', title: 'CountDistinctSlices',
        body: 'Count slices with no repeated value.\nTrick: the window state is a set `seen`, not a sum.\nBefore adding `A[front]`, drop from the back while it is inside.\nThen count `front - back + 1`. Return `min(count, 1000000000)`.',
        code: 'for front in range(len(A)):\n    while A[front] in seen:\n        seen.remove(A[back])\n        back += 1\n    seen.add(A[front])\n    count += front - back + 1' },

      { type: 'info', title: 'AbsDistinct',
        body: 'Sorted list, numbers can be negative. Count the different absolute values.\nTrick: two pointers start at both ends.\nThe biggest absolute value is always at an end.\nTake it, count it once, skip all its copies.',
        code: 'l, r, count = 0, len(A) - 1, 0\nwhile l <= r:\n    v = max(abs(A[l]), abs(A[r]))\n    count += 1\n    while l <= r and abs(A[l]) == v: l += 1\n    while l <= r and abs(A[r]) == v: r -= 1' },

      { type: 'info', title: 'MinAbsSumOfTwo',
        body: 'Smallest `abs(A[p] + A[q])`. A number may pair with itself.\nTrick: sort, then two end pointers.\nSum below zero: move `l` up. Otherwise move `r` down.\nKeep the smallest abs seen. Loop while `l <= r`.',
        code: 'A = sorted(A)\nl, r, best = 0, len(A) - 1, abs(2 * A[0])\nwhile l <= r:\n    best = min(best, abs(A[l] + A[r]))\n    if A[l] + A[r] < 0: l += 1\n    else: r -= 1' },

      { type: 'info', title: 'CountTriangles',
        body: 'Count triples `P < Q < R` forming a triangle.\nTrick: sort, then only `A[P] + A[Q] > A[R]` matters.\nFix `P`, move `Q` right. `R` never moves back.\nEvery index between them works: `R - Q - 1`.',
        code: 'for P in range(N - 2):\n    R = P + 2\n    for Q in range(P + 1, N - 1):\n        while R < N and A[P] + A[Q] > A[R]:\n            R += 1\n        count += R - Q - 1' },

      { type: 'quiz', q: 'Which pattern fits: count the slices of positive numbers with sum at most S?',
        choices: ['Caterpillar, add front - back + 1', 'Fixed window of length K', 'Two pointers from both ends'],
        why: 'The length is not fixed, so the caterpillar settles at each front.' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Fixed window → add one, drop one.\nLongest slice → drop while bad.\nCount slices → add `front - back + 1`.\nNo repeats → a set.\nSorted pairs → two end pointers.\nTriangles → R never moves back.' }
    ]
  });
})();
