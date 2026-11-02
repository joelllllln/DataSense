/* Simple Codility study cards — topic "bsearch": Binary search & greedy.
   Short phone-friendly version of codility/study/data_bsearch.js: same ideas, same order, fewer words. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'bsearch',
    name: 'Binary search & greedy',
    tagline: 'Throw away half the list per look, or take the obvious choice and never look back.',
    cards: [

      { type: 'info', title: 'Look in the middle',
        body: 'A sorted list. Want to know if X is in it. Look at the middle item. X is smaller: X must be on the left. X is bigger: on the right. One look throws away half the list.',
        code: 'mid = len(A) // 2\nif X == A[mid]: print(\'found\')\nelif X < A[mid]: print(\'look left\')\nelse: print(\'look right\')' },

      { type: 'info', title: 'Why it is fast enough',
        body: 'Checking every item of 1,000,000 numbers is 1,000,000 steps. Too slow for many searches. Halving takes about 20 looks. Fast enough. Doubling the list adds just one more look.' },

      { type: 'info', title: 'The lo, hi, mid loop',
        body: '`lo` and `hi` fence the part that may still hold X. Look at `mid`. Found: return it. X is bigger: move `lo` past `mid`. X is smaller: move `hi` below `mid`. Loop ends with nothing: return -1.',
        code: 'lo, hi = 0, len(A) - 1\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    if A[mid] == X: return mid\n    if A[mid] < X: lo = mid + 1\n    else: hi = mid - 1' },

      { type: 'quiz', q: 'A sorted list has 1,000 items. At most how many looks?',
        choices: ['About 10', '500', '1,000'],
        why: 'Each look halves the list. 1,000 halves down to 1 in 10 looks.' },

      { type: 'info', title: 'Trap: step past mid',
        body: 'With `lo <= hi`, always move past `mid`. Write `hi = mid - 1` and `lo = mid + 1`. Writing `hi = mid` can loop forever. Also use `//`, not `/`. A decimal index is an error.' },

      { type: 'info', title: 'First spot not below X',
        body: 'Often you want the first index with `A[i] >= X`. It works with repeats. Three changes. Loop while `lo < hi`. Start `hi = len(A)`. Go left with `hi = mid`. The answer is `lo`.',
        code: 'lo, hi = 0, len(A)\nwhile lo < hi:\n    mid = (lo + hi) // 2\n    if A[mid] < X: lo = mid + 1\n    else: hi = mid\nreturn lo' },

      { type: 'info', title: 'Count copies with bisect',
        body: 'Python has this built in. `bisect_left` gives the first spot not below X. `bisect_right` gives the first spot above X. Subtract them to count the copies of X. The list must be sorted first.',
        code: 'import bisect\ndef count(A, X):\n    r = bisect.bisect_right(A, X)\n    return r - bisect.bisect_left(A, X)' },

      { type: 'predict', code: 'import bisect\nA = [1, 2, 2, 2, 3]\nr = bisect.bisect_right(A, 2)\nprint(r - bisect.bisect_left(A, 2))',
        q: 'What prints?',
        choices: ['3', '4', '1'],
        why: 'The first 2 is at index 1, the first 3 at 4.' },

      { type: 'info', title: 'Search the answer itself',
        body: 'Sometimes there is no list. The candidates are the answers: 0, 1, 2, up to N. Write `works(value)`: True or False. If a value works, every bigger value must work too. The loop below finds the first True.',
        code: 'lo, hi = smallest, biggest\nwhile lo < hi:\n    mid = (lo + hi) // 2\n    if works(mid): hi = mid    # try smaller\n    else: lo = mid + 1         # go bigger\nreturn lo' },

      { type: 'quiz', q: 'For search on the answer, what must `works()` promise?',
        choices: ['Once True, True for all bigger values', 'It runs in one step', 'It returns a number'],
        why: 'Only a one-way switch, no then yes, keeps the answers sorted.' },

      { type: 'info', title: 'The greedy block count',
        body: 'Can A be cut into K blocks, each sum at most `cap`? Greedy: keep adding to the block. Would the next item go over? Start a new block. Count the blocks. True if at most K. This is `works`.',
        code: 'blocks, cur = 1, 0\nfor a in A:\n    if cur + a > cap:\n        blocks, cur = blocks + 1, 0\n    cur += a\nreturn blocks <= K' },

      { type: 'predict', code: 'blocks, cur = 1, 0\nfor a in [2, 1, 5, 1, 2, 2, 2]:\n    if cur + a > 6: blocks, cur = blocks + 1, 0\n    cur += a\nprint(blocks)',
        q: 'Blocks may sum to at most 6. What prints?',
        choices: ['3', '2', '4'],
        why: '[2, 1] then [5, 1] then [2, 2, 2]. Three blocks.' },

      { type: 'info', title: 'MinMaxDivision',
        body: 'Task: cut A into K blocks, side by side. Make the biggest block sum as small as possible. Trick: the answer is a cap. Search caps from `max(A)` to `sum(A)`. Test each cap with the greedy block count.',
        code: 'lo, hi = max(A), sum(A)\nwhile lo < hi:\n    mid = (lo + hi) // 2\n    if works(A, K, mid): hi = mid\n    else: lo = mid + 1\nreturn lo' },

      { type: 'info', title: 'Greedy: grab now, never undo',
        body: 'Greedy means take the best choice now and never look back. Right only when that choice never hurts later. Coins 1, 3 and 4, amount 6. Greedy takes 4, 1, 1. But 3 and 3 is better.' },

      { type: 'info', title: 'TieRopes',
        body: 'Task: ropes in a row, lengths in A. Tie neighbours together. Return the most ropes of length at least K. Trick: add lengths left to right. Reaching K: count one rope and start fresh. Extra length is never needed.',
        code: 'count, length = 0, 0\nfor a in A:\n    length += a\n    if length >= K:\n        count, length = count + 1, 0\nreturn count' },

      { type: 'info', title: 'MaxNonoverlappingSegments',
        body: 'Task: segments from `A[i]` to `B[i]`, sorted by end. Pick the most that share no point. Trick: take a segment when it starts after the last taken end. Ending early leaves the most room. Touching counts as overlap.',
        code: 'count, end = 0, -1\nfor i in range(len(A)):\n    if A[i] > end:\n        count += 1\n        end = B[i]\nreturn count' },

      { type: 'quiz', q: 'Segments 1 to 5 and 5 to 9. How many can you take?',
        choices: ['1', '2', '0'],
        why: 'They share point 5. Start 5 > end 5 is False, so skip.' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Find X → lo, hi, mid.\nCount copies → bisect right minus left.\nSmallest that works → search the answers.\nMinMaxDivision → search cap, greedy blocks.\nTieRopes → cut at length K.\nSegments → take if start > last end.' }
    ]
  });
})();
