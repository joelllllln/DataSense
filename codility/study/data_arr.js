/* Codility study cards — topic "arr": Arrays & time complexity.
   Teaching side of codility/data_arr.js: same ladder, same names, same order.
   Shape and rules: see codility/study/SPEC.md. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'arr',
    name: 'Arrays & time complexity',
    tagline: 'Index, slice and XOR a list in one pass, and know why one pass matters.',
    cards: [

      { type: 'info', title: 'A list is a row of boxes',
        body: 'Python counts from 0: the first element is `A[0]`, not `A[1]`.\nNegative positions count from the end: `A[-1]` is the last, `A[-2]` the one before it.\nReading one box takes the same time however long the list is: O(1).',
        code: 'def solution(A):\n    return A[-1]' },

      { type: 'info', title: 'Slices copy; A[-0:] is everything',
        body: 'A slice is a new list. `A[1:]` drops the first item. `A[-K:]` is the last K. `A[:-K]` is everything before them.\nSlicing never crashes: on an empty list it gives `[]`. It copies, so it costs O(N).\nTrap: `-0` is just 0, so `A[-0:]` is the whole list, not empty.',
        code: 'A = [3, 8, 9, 7, 6]\nA[1:]    # [8, 9, 7, 6]\nA[-2:]   # [7, 6]\nA[:-2]   # [3, 8, 9]' },

      { type: 'predict', code: 'A = [1, 2, 3]\nK = 0\nprint(A[-K:])', q: 'What prints?',
        choices: ['[1, 2, 3]', '[]', '[3]', 'It crashes'],
        why: '-0 is 0, and A[0:] is the whole list. This is why K = 0 needs thought in rotation.' },

      { type: 'info', title: 'Rotate right by K: two slices',
        body: 'Rotating right moves the last element to the front. K times moves the last K elements, as a block, to the front.\n`A[-K:]` is that block, `A[:-K]` is the rest, and `+` joins two lists.\nDo not loop K times rotating by one; one pair of slices does it in O(N).',
        code: 'def solution(A, K):\n    return A[-K:] + A[:-K]' },

      { type: 'info', title: 'K bigger than the list: use %',
        body: 'Rotating a list of length N by N places changes nothing.\nSo rotate by `K % len(A)`, the remainder after taking out whole turns. It is between 0 and N - 1.\nRemainder 0 gives `A[-0:] + A[:-0]`: the whole list plus nothing, which is right.',
        code: 'def solution(A, K):\n    K = K % len(A)\n    return A[-K:] + A[:-K]' },

      { type: 'quiz', q: '`[1, 2, 3, 4]` rotated right 6 times?',
        choices: ['[3, 4, 1, 2]', '[1, 2, 3, 4]', '[4, 1, 2, 3]', '[2, 3, 4, 1]'],
        why: '6 % 4 is 2: one full turn, then two more places. The last two elements move to the front.' },

      { type: 'info', title: 'CyclicRotation',
        body: 'The task: rotate A right K times. N and K are 0 to 100. A may be empty and K may be 0.\nKey insight: it is `K % len(A)` plus two slices, except that `len(A)` is 0 for an empty list and `%` by 0 crashes. Check the empty input first.' },

      { type: 'info', title: 'CyclicRotation: the code',
        body: '`if not A` is true only for an empty list; return it as is.\nThen take out whole turns and join the two slices.\nOne copy of the list: O(N). `[1, 2, 3]` with K = 7: 7 % 3 is 1, so `[3, 1, 2]`.',
        code: 'def solution(A, K):\n    if not A:\n        return A\n    K = K % len(A)\n    return A[-K:] + A[:-K]' },

      { type: 'quiz', q: 'Without the `if not A` line, what does `solution([], 5)` do?',
        choices: ['Crashes: % by zero', 'Returns []', 'Returns [5]', 'Loops forever'],
        why: 'len([]) is 0, and 5 % 0 raises ZeroDivisionError.' },

      { type: 'info', title: 'O(n) versus O(n²)',
        body: 'O(n): the work grows with the list. One pass over 100,000 items is about 100,000 steps: fine.\nO(n²): a loop inside a loop. 100,000 items means 100,000 x 100,000 = 10 billion steps: it times out.\nHidden O(n²): `x in A` and `A.count(x)` each walk the whole list, so inside a loop they are a loop inside a loop.' },

      { type: 'quiz', q: 'A has 100,000 items. `for x in A: if A.count(x) == 1: ...` Roughly how many steps?',
        choices: ['About 10 billion: it times out', 'About 100,000', 'About 200,000', 'One per distinct value'],
        why: 'count walks all 100,000 items for each of the 100,000 values of x: n times n.' },

      { type: 'info', title: 'XOR: the ^ operator',
        body: '`^` compares two numbers bit by bit and keeps a 1 where the bits differ.\n9 is `1001`, 7 is `0111`: every bit differs, so `9 ^ 7` is `1110`, which is 14.\nTwo facts to remember: `x ^ x` is 0 and `x ^ 0` is x.',
        code: 'def solution(A):\n    return A[0] ^ A[1]' },

      { type: 'predict', code: 'print(9 ^ 7, 5 ^ 5, 0 ^ 6)', q: 'What prints?',
        choices: ['14 0 6', '16 10 6', '2 0 6', '14 25 0'],
        why: '1001 ^ 0111 is 1110 = 14. Equal numbers give 0. Anything ^ 0 is itself.' },

      { type: 'info', title: 'Running XOR cancels pairs',
        body: 'Like a running total with `+`: start at 0, then `result ^= a` for every element. 0 is safe because `0 ^ a` is a.\nOrder does not matter, and a value that appears twice cancels itself: `9 ^ 3 ^ 9` is `3 ^ (9 ^ 9)`, which is `3 ^ 0`, which is 3.',
        code: 'result = 0\nfor a in A:\n    result ^= a\n# [9, 3, 9]: result goes 9, 10, 3' },

      { type: 'info', title: 'OddOccurrencesInArray',
        body: 'The task: N is odd and up to 1,000,000. Every value appears an even number of times except one. Return that one.\nKey insight: XOR ignores order, so all the pairs cancel to 0 and the running XOR is left holding the odd one out. One pass, no extra memory.\n`A.count` in a loop is O(n²) and times out.' },

      { type: 'info', title: 'OddOccurrencesInArray: the code',
        body: 'The running XOR already is the answer. `[9, 3, 9, 3, 9, 7, 9]`: the 3s cancel, the four 9s cancel, 7 remains.\nThe general tool is a dict counter: `counts[a] = counts.get(a, 0) + 1`, then return the key with an odd count. Also O(N), but it uses O(N) memory.',
        code: 'def solution(A):\n    result = 0\n    for a in A:\n        result ^= a\n    return result' },

      { type: 'quiz', q: 'Running XOR of `[5, 5, 5, 5, 3]`?',
        choices: ['3', '5', '0', '8'],
        why: 'The four 5s cancel in pairs: 5 ^ 5 is 0, twice. Only 3 is left.' },

      { type: 'info', title: 'FrogJmp',
        body: 'The task: a frog at X jumps D each time and must reach Y or beyond. Return the fewest jumps. X, Y and D go up to 1,000,000,000.\nKey insight: do not simulate a billion jumps. The distance is `Y - X`; divide by D and round up, because a partial jump is still a whole jump.' },

      { type: 'info', title: 'FrogJmp: round up with integers',
        body: '`//` rounds down: 75 // 30 is 2, but the frog needs 3 jumps.\nAdd `D - 1` first: (75 + 29) // 30 is 3, while (60 + 29) // 30 stays 2.\nUse `//`, not `/`: `/` gives a float like 3.0.\nCeiling of a / b: `(a + b - 1) // b`.',
        code: 'def solution(X, Y, D):\n    return (Y - X + D - 1) // D' },

      { type: 'predict', code: 'print((85 - 10 + 30 - 1) // 30, (85 - 10) // 30)', q: 'What prints?',
        choices: ['3 2', '2 2', '3 3', '2.5 2'],
        why: '75 // 30 rounds down to 2. Adding 29 first gives 104 // 30, which is 3: the partial jump counts.' },

      { type: 'info', title: 'Sum 1..N by formula; ints never overflow',
        body: '`1 + 2 + ... + N` is `N * (N + 1) // 2`. Pair first with last: each pair is N + 1. One of N, N + 1 is even, so `//` is exact.\nN = 1,000,000,000 gives 500000000500000000, 18 digits. Python ints never overflow: no int64 limit, no special case, not a Python problem.',
        code: 'def solution(N):\n    return N * (N + 1) // 2' },

      { type: 'info', title: 'PermMissingElem',
        body: 'The task: A holds N different numbers from 1 to N + 1, so exactly one is missing. Return it. N is 0 to 100,000; an empty A means 1 is missing.\nKey insight: the full set 1..M, with M = len(A) + 1, has a known sum. Subtract `sum(A)` and the missing number is what is left.' },

      { type: 'info', title: 'PermMissingElem: the code',
        body: '`[2, 3, 1, 5]`: M is 5, the full sum is 15, `sum(A)` is 11, so 4 is missing.\nEmpty A: M is 1, the full sum is 1, `sum([])` is 0, answer 1. No special case needed.\n`sum(A)` is one pass: O(N).',
        code: 'def solution(A):\n    M = len(A) + 1\n    return M * (M + 1) // 2 - sum(A)' },

      { type: 'quiz', q: '`A = [3, 2]`. What does PermMissingElem return?',
        choices: ['1', '4', '0', '3'],
        why: 'M is 3, the full sum is 6, sum(A) is 5, so 1 is missing. The order of A does not matter.' },

      { type: 'info', title: 'Running total of the left part',
        body: 'For every split P the left part is `A[:P]`. Calling `sum(A[:P])` for each P re-adds up to 100,000 numbers 100,000 times: O(n²).\nInstead keep `left` and add one element per step: each prefix is the previous one plus one item.\nStop one short of the end so the right part keeps an element.',
        code: 'def solution(A):\n    sums = []\n    left = 0\n    for i in range(len(A) - 1):\n        left += A[i]\n        sums.append(left)\n    return sums' },

      { type: 'info', title: 'TapeEquilibrium',
        body: 'The task: split A (N from 2 to 100,000, values -1,000 to 1,000) at P, with 1 <= P < N. Return the smallest `|sum(left) - sum(right)|` over all splits.\nKey insight: every element is on one side, so `right = total - left`. One `sum(A)` plus one running `left` gives both sides at every split.' },

      { type: 'info', title: 'TapeEquilibrium: the code',
        body: '`abs()` makes the difference positive. Start `best` at the first split\'s difference, not at 0: the answer may never reach 0.\nTwo passes, `sum` and the loop, is still O(N).\n`[3, 1, 2, 4, 3]`: left sums 3, 4, 6, 10 against total 13 give 7, 5, 1, 7. Answer 1.',
        code: 'def solution(A):\n    total, left = sum(A), 0\n    best = abs(A[0] - (total - A[0]))\n    for i in range(len(A) - 1):\n        left += A[i]\n        best = min(best, abs(left - (total - left)))\n    return best' },

      { type: 'predict', code: 'A = [3, 1, 2, 4, 3]\ntotal = sum(A)\nleft = 0\nbest = 10 ** 9\nfor i in range(len(A) - 1):\n    left += A[i]\n    best = min(best, abs(left - (total - left)))\nprint(best)', q: 'What prints?',
        choices: ['1', '0', '7', '13'],
        why: 'The splits give |3-10|, |4-9|, |6-7|, |10-3|: 7, 5, 1, 7. The smallest is 1.' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Index: `A[0]` first, `A[-1]` last\nEmpty: `if not A`\nRotate: `K %= len(A)`, `A[-K:] + A[:-K]`\nOdd one out: `result ^= a`\nCounting: `counts.get(a, 0) + 1`\nCeiling: `(a+b-1) // b`\nSum 1..N: `N*(N+1) // 2`\nMissing one: full sum minus `sum(A)`\nSplits: `left` runs, `right = total - left`\nSpeed: one pass O(n), loop in loop O(n²)' },

      { type: 'quiz', q: 'One-line problem: "Every ticket number appears twice except one. Find it, N up to a million." Which pattern?',
        choices: ['Running XOR', 'Two slices and %', 'Full sum minus sum(A)', 'Running left and total - left'],
        why: 'Pairs cancel under XOR, so one pass leaves only the unpaired value, with no extra memory.' }

    ]
  });
})();
