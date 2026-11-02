/* Simple Codility notes — topic "arr": Arrays & speed.
   Short phone-friendly version of codility/study/data_arr.js: same ideas, same order, fewer words.
   Shape and rules: see codility/study/simple/SPEC.md. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'arr',
    name: 'Arrays & speed',
    tagline: 'Index, slice and XOR a list in one pass, and why one pass matters.',
    cards: [

      { type: 'info', title: 'A list counts from 0',
        body: 'The first item is `A[0]`, not `A[1]`.\nNegative positions count from the end. `A[-1]` is the last item.\nLike `.iloc`, but on a plain list.\nReading one item is one step, however long the list.',
        code: 'def solution(A):\n    return A[-1]' },

      { type: 'info', title: 'Slices make a new list',
        body: '`A[1:]` drops the first item. `A[-K:]` is the last K items.\n`A[:-K]` is everything before them.\nA slice never crashes. On an empty list it gives `[]`.\nTrap: `-0` is just 0, so `A[-0:]` is the whole list.',
        code: 'A = [3, 8, 9, 7, 6]\nA[1:]    # [8, 9, 7, 6]\nA[-2:]   # [7, 6]\nA[:-2]   # [3, 8, 9]' },

      { type: 'predict', code: 'A = [1, 2, 3]\nK = 0\nprint(A[-K:])', q: 'What prints?',
        choices: ['[1, 2, 3]', '[]', '[3]'],
        why: '-0 is 0, and A[0:] is the whole list.' },

      { type: 'info', title: 'Rotate right: two slices',
        body: 'Rotating right moves the last item to the front.\nK times moves the last K items.\n`A[-K:]` is the block, `A[:-K]` is the rest. `+` joins them.\nA full turn changes nothing, so use `K % len(A)`.',
        code: 'def solution(A, K):\n    K = K % len(A)\n    return A[-K:] + A[:-K]' },

      { type: 'info', title: 'CyclicRotation',
        body: 'Asks: rotate the list right K times. The list may be empty.\nTrick: `K % len(A)` plus two slices. But `%` by 0 crashes.\nCheck the empty list first. `if not A` is true only then.',
        code: 'def solution(A, K):\n    if not A:\n        return A\n    K = K % len(A)\n    return A[-K:] + A[:-K]' },

      { type: 'info', title: 'Why one pass matters',
        body: 'One pass over 100,000 numbers: 100,000 steps. Fast enough.\nA loop in a loop is 100,000 times 100,000. 10 billion steps. Too slow.\nCodility calls these `O(N)` and `O(N*N)`.\nTrap: `x in A` and `A.count(x)` walk the whole list.' },

      { type: 'info', title: 'XOR: ^ cancels pairs',
        body: '`^` is XOR. `5 ^ 5` is 0, and `x ^ 0` is x.\nXOR a whole list like a running total.\nOrder does not matter. Any value seen twice cancels itself.\n`9 ^ 3 ^ 9` is 3.',
        code: 'result = 0\nfor a in A:\n    result ^= a\n# [9, 3, 9]: result goes 9, 10, 3' },

      { type: 'info', title: 'OddOccurrencesInArray',
        body: 'Asks: every value appears twice except one. Return that one.\nTrick: the running XOR. Pairs cancel to 0, the odd one remains.\n`[9, 3, 9, 3, 7]`: pairs cancel, 7 is left.\n`A.count` in a loop is too slow.',
        code: 'def solution(A):\n    result = 0\n    for a in A:\n        result ^= a\n    return result' },

      { type: 'quiz', q: 'Running XOR of `[5, 5, 5, 5, 3]`?',
        choices: ['3', '5', '0'],
        why: 'The four 5s cancel in pairs. Only 3 is left.' },

      { type: 'info', title: 'FrogJmp',
        body: 'Asks: frog at X, jumps D, fewest jumps to reach Y?\nTrick: no loop. Divide the distance by D and round up.\n`//` rounds down, so add `D - 1` first.\n75 over 30 needs 3 jumps, not 2.',
        code: 'def solution(X, Y, D):\n    # 75 // 30 is 2, (75 + 29) // 30 is 3\n    return (Y - X + D - 1) // D' },

      { type: 'predict', code: 'print((75 + 30 - 1) // 30)', q: 'What prints?',
        choices: ['3', '2', '2.5'],
        why: '75 // 30 rounds down to 2. Adding 29 first gives 3.' },

      { type: 'info', title: 'Sum 1 to N by formula',
        body: 'Sum 1..N is `N * (N + 1) // 2`.\nNo loop needed. Pair first with last, each pair is N + 1.\n`//` keeps it a whole number.\nBig results are fine. Python numbers never overflow.',
        code: 'def solution(N):\n    return N * (N + 1) // 2' },

      { type: 'info', title: 'PermMissingElem',
        body: 'Asks: the numbers 1 to N + 1, one missing. Which?\nTrick: the formula sum minus `sum(A)`.\n`[2, 3, 1, 5]`: full sum 15, list sum 11, missing 4.\nEmpty list: full sum 1, missing 1. No special case.',
        code: 'def solution(A):\n    M = len(A) + 1\n    return M * (M + 1) // 2 - sum(A)' },

      { type: 'info', title: 'Left sum runs, right follows',
        body: 'Split the list at P: left is `A[:P]`.\n`sum(A[:P])` for every P re-adds the list each time. Too slow.\nInstead grow `left` by one item per step.\nEvery number is on one side, so `right = total - left`.',
        code: 'total, left = sum(A), 0\nfor i in range(len(A) - 1):\n    left += A[i]\n    right = total - left' },

      { type: 'info', title: 'TapeEquilibrium',
        body: 'Asks: split the list, smallest gap between the two sums?\nTrick: one `sum(A)`, then a running `left`. Right is `total - left`.\nStop one short, so the right part keeps a number.\nStart `best` big, not at 0.',
        code: 'total, left, best = sum(A), 0, 10 ** 9\nfor x in A[:-1]:\n    left += x\n    right = total - left\n    best = min(best, abs(left - right))\nreturn best' },

      { type: 'quiz', q: '`A = [3, 1, 2, 4, 3]`, total 13, left 6. The right sum?',
        choices: ['7', '6', '13'],
        why: 'Every number is on one side. Right is total minus left.' },

      { type: 'quiz', q: 'Every ticket number appears twice except one. Find it fast. Which pattern?',
        choices: ['Running XOR', 'Two slices and %', 'Formula sum minus sum(A)'],
        why: 'Pairs cancel under XOR, so one pass leaves the odd one.' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Empty → `if not A`\nRotate → `K % len(A)`, two slices\nOdd one out → `result ^= a`\nRound up → `(a+b-1) // b`\nMissing → formula sum minus `sum(A)`\nSplit → `left` grows, `right = total - left`' }

    ]
  });
})();
