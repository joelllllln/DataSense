/* Codility study cards — topic "bsearch": Binary search & greedy.
   Teaching side of codility/data_bsearch.js: same ladder, same names, same order. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'bsearch',
    name: 'Binary search & greedy',
    tagline: 'Throw away half the candidates per look, or take the obvious choice and never look back.',
    cards: [

      { type: 'info', title: 'Search: look at the middle, not the front',
        body: 'Searching asks "where is X?". A plain loop checks every item: O(N), a million looks for a million items.\nIf the list is sorted, look at the middle item instead. One compare tells you which half can hold X. The other half is gone.\nThe middle index is `len(A) // 2`.',
        code: 'def solution(A, X):\n    mid = A[len(A) // 2]\n    if X == mid:\n        return "found"\n    if X < mid:\n        return "left"\n    return "right"' },

      { type: 'quiz', q: 'A has 4 items. What is `len(A) // 2`, the middle index the search starts from?',
        choices: ['2', '1', '1.5', '3'],
        why: '4 // 2 is 2: whole-number division, the right-hand one of the two middle items.' },

      { type: 'info', title: 'The lo/hi/mid loop',
        body: '`lo` and `hi` mark the part of the list that may still hold X.\nEach turn: look at `mid`. Found: return it. X smaller: `hi = mid - 1`. X bigger: `lo = mid + 1`.\nLoop while `lo <= hi`. When `lo` passes `hi`, X is not there: return -1.',
        code: 'def solution(A, X):\n    lo, hi = 0, len(A) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if A[mid] == X: return mid\n        if X < A[mid]: hi = mid - 1\n        else: lo = mid + 1\n    return -1' },

      { type: 'info', title: 'Why it is log n',
        body: 'Every look halves the part left to search.\n5 items: at most 3 looks. 1,023 items: 10. A million: about 20. Doubling the list adds one look.\nThat is O(log N). A plain loop doubles its work when the list doubles.\nWhen N is up to a million and the list is sorted, this is the tool.' },

      { type: 'quiz', q: 'A sorted list has 1,023 items. At most how many middle items does binary search look at?',
        choices: ['10', '512', '1,023', '32'],
        why: 'Each look halves the list: 1,023 halves down to 1 item in 10 steps, since 2**10 is 1,024.' },

      { type: 'info', title: 'Trap: off-by-one in lo and hi',
        body: 'With `lo <= hi`, both moves must step past `mid`: `hi = mid - 1` and `lo = mid + 1`. Writing `hi = mid` here loops forever once `lo == hi`.\n`hi` starts at `len(A) - 1`, the last index.\nEmpty list: `lo = 0`, `hi = -1`, the loop never runs, return -1. No special case needed.' },

      { type: 'info', title: 'Trap: mid overflow is not a Python problem',
        body: '`mid = (lo + hi) // 2` is fine in Python. Integers grow as big as needed.\nIn Java or C, `lo + hi` can overflow a 32-bit int, so people write `lo + (hi - lo) // 2`. Both forms give the same `mid`.\nDo not use `/`: it gives a float, and `A[2.0]` is an error.' },

      { type: 'predict', code: 'A = [1, 3, 5, 7, 9]\nlo, hi, looks = 0, 4, 0\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    looks += 1\n    if A[mid] == 9:\n        break\n    lo = mid + 1\nprint(looks)',
        q: 'How many middle items does this look at before it finds 9?',
        choices: ['3', '5', '2', '4'],
        why: 'It looks at 5, then 7, then 9: three looks for the last item of five.' },

      { type: 'info', title: 'Lower bound: first item not below X',
        body: 'The lower bound is the smallest index `i` with `A[i] >= X`. It works with repeats and when X is missing: it is where X would be inserted.\nThree changes: loop while `lo < hi`, start `hi = len(A)`, and the "go left" move is `hi = mid`, which keeps `mid` as a candidate.\nReturn `lo`.',
        code: 'def lower(A, X):\n    lo, hi = 0, len(A)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if A[mid] < X: lo = mid + 1\n        else: hi = mid\n    return lo' },

      { type: 'info', title: 'Upper bound: first item above X',
        body: 'Change one character: `A[mid] <= X` instead of `A[mid] < X`. Now the answer is the first index with `A[i] > X`, just past the last copy of X.\nAll copies of X sit between the two bounds, so `upper - lower` counts them. Two searches, O(log N), even with a hundred thousand copies.',
        code: 'def upper(A, X):\n    lo, hi = 0, len(A)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if A[mid] <= X: lo = mid + 1\n        else: hi = mid\n    return lo\n# copies of X = upper(A, X) - lower(A, X)' },

      { type: 'quiz', q: 'A = [1, 2, 2, 2, 3], X = 2. What are the lower bound and the upper bound?',
        choices: ['1 and 4', '1 and 3', '0 and 4', '2 and 4'],
        why: 'The first 2 is at index 1; the first item above 2 is the 3 at index 4. 4 - 1 = 3 copies.' },

      { type: 'info', title: 'The bisect module',
        body: 'Python has both bounds built in. `bisect.bisect_left(A, X)` is the lower bound. `bisect.bisect_right(A, X)` is the upper bound. Both run in fast C code.\nThe names mean "where would I insert X": left of its copies, or right of them.\nThe list must be sorted. On an unsorted list you get nonsense and no error.',
        code: 'import bisect\n\ndef solution(A, X):\n    return bisect.bisect_right(A, X) - bisect.bisect_left(A, X)' },

      { type: 'predict', code: 'import bisect\nA = [1, 3, 5, 7]\nprint(bisect.bisect_left(A, 4), bisect.bisect_right(A, 4))',
        q: 'What prints?',
        choices: ['2 2', '1 2', '2 3', '-1 -1'],
        why: '4 is missing, so both bounds land on the same spot: index 2, where 4 would be inserted. Their difference, the count, is 0.' },

      { type: 'info', title: 'Binary search on the answer',
        body: 'Sometimes there is no list. The candidates are the answers themselves: 0, 1, 2, ... N.\nAsk each a yes/no question. If the answers look like no, no, no, yes, yes, they are "sorted": the lower bound loop finds the first yes without building any list.\nExample: smallest K with `K * K >= N`, about 60 steps for 10**18.',
        code: 'def solution(N):\n    lo, hi = 0, N\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if mid * mid >= N: hi = mid\n        else: lo = mid + 1\n    return lo' },

      { type: 'info', title: 'The feasible() recipe',
        body: 'Three parts, every time:\n1. A range `lo..hi` that surely holds the answer.\n2. `feasible(mid)`: can we do it with this value? True or False.\n3. The lower bound loop: True means `hi = mid`, False means `lo = mid + 1`.\n`feasible` runs about log(hi - lo) times, so it may cost a full pass over the data.',
        code: 'lo, hi = smallest_possible, largest_possible\nwhile lo < hi:\n    mid = (lo + hi) // 2\n    if feasible(mid):\n        hi = mid          # works: try smaller\n    else:\n        lo = mid + 1      # fails: must be bigger\nreturn lo' },

      { type: 'quiz', q: 'What must be true of `feasible()` for binary search on the answer to work?',
        choices: ['Once it is True for a value, it stays True for every bigger value', 'It must run in O(1)', 'It must return a number, not True or False', 'It must be True for the middle value'],
        why: 'A one-way switch (no, no, yes, yes) is what makes the answers "sorted"; without it, halving can skip the real answer.' },

      { type: 'info', title: 'A greedy check: K blocks of sum at most cap',
        body: 'Can A be cut into at most K neighbouring blocks, each summing to at most `cap`?\nGreedy: keep adding to the current block; start a new one only when the next item would push it over `cap`. Filling blocks as full as possible uses the fewest, so compare that count with K.\nIt returns True or False: a `feasible()`.',
        code: 'def can_split(A, K, cap):\n    blocks, cur = 1, 0\n    for a in A:\n        if cur + a > cap:\n            blocks, cur = blocks + 1, a\n        else:\n            cur += a\n    return blocks <= K' },

      { type: 'predict', code: 'A, cap = [2, 1, 5, 1, 2, 2, 2], 6\nblocks, cur = 1, 0\nfor a in A:\n    if cur + a > cap:\n        blocks, cur = blocks + 1, a\n    else:\n        cur += a\nprint(blocks)',
        q: 'How many blocks does the greedy pass make with cap 6?',
        choices: ['3', '2', '4', '7'],
        why: '[2, 1] | [5, 1] | [2, 2, 2]: a new block starts whenever the next item would pass 6.' },

      { type: 'info', title: 'MinMaxDivision',
        body: 'Task: cut A into K neighbouring blocks so that the biggest block sum is as small as possible. Return that sum. N and K up to 100,000.\nKey insight: the answer is a `cap`. No cap below `max(A)` works; `sum(A)` always works. If a cap works, every bigger cap works too. Binary search the cap, test each with `can_split`.' },

      { type: 'info', title: 'MinMaxDivision: the code',
        body: 'About 20 to 30 tries, each one greedy pass over A: O(N log(sum(A))).\nBecause `lo` starts at `max(A)`, every item fits in some block, so the check needs no `a > cap` test.\nK = 1 gives `sum(A)`; K >= N gives `max(A)`. Both fall out of the loop by themselves.',
        code: 'def solution(K, M, A):\n    lo, hi = max(A), sum(A)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if can_split(A, K, mid): hi = mid\n        else: lo = mid + 1\n    return lo' },

      { type: 'info', title: 'Greedy: best choice now, never look back',
        body: 'A greedy algorithm picks the choice that looks best right now and never undoes it.\nChange with coins 50, 20, 10, 5, 2, 1: always take the biggest coin that fits. Six steps, whatever N is.\nGreedy is not always right. Coins 1, 3, 4, amount 6: greedy takes 4 + 1 + 1, but 3 + 3 is better.',
        code: 'def solution(N):\n    coins = 0\n    for c in [50, 20, 10, 5, 2, 1]:\n        coins += N // c\n        N = N % c\n    return coins' },

      { type: 'quiz', q: 'When is a greedy "take it now" choice safe?',
        choices: ['When the choice made now can never hurt the choices still to come', 'Always: greedy is always optimal', 'Only when the list is sorted', 'Only when N is small'],
        why: 'Greedy needs the local choice to cost nothing later; the coin set 1, 3, 4 shows what happens when it does.' },

      { type: 'info', title: 'TieRopes',
        body: 'Task: ropes in a line, lengths in A. You may tie neighbours together. Return the most ropes of length at least K you can end with.\nKey insight: scan left to right with a running length. The moment it reaches K, count it and start fresh. A rope that is long enough gains nothing from more ties.',
        code: 'def solution(K, A):\n    count, length = 0, 0\n    for a in A:\n        length += a\n        if length >= K:\n            count += 1\n            length = 0\n    return count' },

      { type: 'predict', code: 'K, A = 4, [1, 2, 3, 4, 1, 1, 3]\ncount, length = 0, 0\nfor a in A:\n    length += a\n    if length >= K:\n        count += 1\n        length = 0\nprint(count)',
        q: 'What prints?',
        choices: ['3', '2', '4', '7'],
        why: '[1, 2, 3] makes 6, [4] is enough alone, [1, 1, 3] makes 5: three ropes. A leftover that never reaches K is dropped.' },

      { type: 'info', title: 'MaxNonoverlappingSegments',
        body: 'Task: segments `A[i]..B[i]` on a line, already sorted by right end B. Segments overlap if they share even one point. Return the most segments with no overlap. N up to 30,000.\nKey insight: take the segment that ends first, then the next one that starts after it ends. Ending early leaves the most room. Strict `>`: touching counts as overlap.',
        code: 'def solution(A, B):\n    count, last_end = 0, -1\n    for i in range(len(A)):\n        if A[i] > last_end:\n            count += 1\n            last_end = B[i]\n    return count' },

      { type: 'quiz', q: 'Segments [1, 5] and [5, 9], sorted by right end. How many can you pick?',
        choices: ['1', '2', '0', 'Depends on which you take first'],
        why: 'They share the point 5, so they overlap: `A[i] > last_end` is 5 > 5, False, and the second one is skipped.' },

      { type: 'info', title: 'More shapes of the same search',
        body: 'Minimum speed to finish in time: search the speed; the check sums ceilings `(a + v - 1) // v`, no floats.\nPeak in an unsorted list: `A[mid] < A[mid + 1]` means go right, else keep `mid`.\nRotated sorted list: one half is always sorted, range-test it.\nThe real need: a yes/no question that splits the range.' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Find X: `lo <= hi`, `hi = mid - 1`, `lo = mid + 1`, else -1.\nLower bound: `lo < hi`, `hi = mid`, start `hi = len(A)`.\nCount copies: `bisect_right - bisect_left`.\nSmallest value that works: `feasible(mid)` + lower bound loop.\nMinMaxDivision: cap in max(A)..sum(A), greedy blocks.\nTieRopes: cut when length >= K.\nMaxNonoverlappingSegments: take when start > last_end.' },

      { type: 'quiz', q: 'Find the smallest crane capacity so that N boxes, kept in order, fit onto K barges. Which pattern?',
        choices: ['Binary search on the answer with a greedy feasible() check', 'Lower bound with bisect on the box weights', 'Greedy: take the earliest-ending segment', 'Linear search over the boxes'],
        why: 'It is MinMaxDivision in disguise: a capacity that works keeps working when bigger, and one greedy pass tests a capacity.' }
    ]
  });
})();
