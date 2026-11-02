/* Simple Codility notes — topic "iter": Loops & binary.
   Short phone-friendly version of codility/study/data_iter.js: same ideas, same order, fewer words.
   Shape and rules: see codility/study/simple/SPEC.md. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'iter',
    name: 'Loops & binary',
    tagline: 'Loops, counters and running bests, then reading a number bit by bit.',
    cards: [

      { type: 'info', title: 'Every answer is def solution',
        body: 'Codility runs a function named `solution` and checks what it returns.\nForget `return` and it gives back `None`. Every test fails.\nThe name is always `solution`.',
        code: 'def solution(N):\n    return N' },

      { type: 'info', title: 'Loop from 1 to N',
        body: 'Pandas hides loops. Here you write them.\n`range(1, N + 1)` gives 1, 2, up to N.\nIt stops just before the second number. The `+ 1` includes N.\nStart `total` at 0 and add inside the loop.',
        code: 'def solution(N):\n    total = 0\n    for i in range(1, N + 1):\n        total += i\n    return total' },

      { type: 'predict', code: 'total = 0\nfor i in range(1, 4):\n    total += i\nprint(total)', q: 'What prints?',
        choices: ['6', '10', '3'], why: 'range(1, 4) is 1, 2, 3. The 4 is left out.' },

      { type: 'info', title: 'Count with an if',
        body: 'A counter is a total that grows by 1.\nIt grows only when the `if` is true.\n`i % 2` is the remainder after dividing by 2.\nZero remainder means i is even.',
        code: 'def solution(N):\n    count = 0\n    for i in range(1, N + 1):\n        if i % 2 == 0:\n            count += 1\n    return count' },

      { type: 'info', title: 'Best so far starts at A[0]',
        body: '`best` holds the biggest number seen so far.\nReplace it when a bigger one appears.\nStart it at `A[0]`, a real number from the list.\nTrap: starting at 0 fails when every number is negative.',
        code: 'def solution(A):\n    best = A[0]\n    for x in A:\n        if x > best:\n            best = x\n    return best' },

      { type: 'quiz', q: '`A = [-5, -2, -9]` and `best` starts at 0. What is returned?',
        choices: ['0, which is not in the list', '-2', '-9'],
        why: 'Nothing beats 0, so best never changes. Start at A[0].' },

      { type: 'info', title: 'A counter that resets',
        body: '`run` counts the 1s in a row just seen.\nA 1 makes it longer. A 0 sets it back to 0.\nAfter the loop, `run` is the length of the last run.',
        code: 'run = 0\nfor x in A:\n    if x == 1:\n        run += 1\n    else:\n        run = 0' },

      { type: 'info', title: 'Longest run: counter plus best',
        body: 'Add a `best` to the resetting counter.\nEach time `run` grows, keep the bigger of the two.\nA 0 resets `run` but leaves `best` alone.\nMost "longest" questions use this pair.',
        code: 'run = best = 0\nfor x in A:\n    if x == 1:\n        run += 1\n        best = max(best, run)\n    else: run = 0' },

      { type: 'info', title: 'Binary digits: bin(N)[2:]',
        body: '`bin(5)` is the text `\'0b101\'`.\nThe `0b` only says "this is binary".\n`[2:]` cuts off those first two letters.\nSo `bin(N)[2:]` is the binary digits of N, as text.',
        code: 'def solution(N):\n    return bin(N)[2:]' },

      { type: 'info', title: 'Compare text with quotes',
        body: '`for ch in bin(N)[2:]` visits one letter at a time.\nEach `ch` is text. Compare with `\'1\'` in quotes.\nTrap: `ch == 1` is never true. The count stays 0 and nothing warns you.',
        code: 'def solution(N):\n    count = 0\n    for ch in bin(N)[2:]:\n        if ch == \'1\':\n            count += 1\n    return count' },

      { type: 'info', title: 'Only a closed gap counts',
        body: 'A gap is 0s with a 1 each side.\nUpdate `best` on a `\'1\'`, not while the run grows.\nEnd zeros never meet a closing 1, so never count.\nThe last line saves the run, then resets it.',
        code: 'run = best = 0\nfor ch in S:\n    if ch == \'0\':\n        run += 1\n    else:\n        best, run = max(best, run), 0' },

      { type: 'info', title: 'BinaryGap',
        body: 'Asks: longest run of 0s in binary N, with 1s both sides.\nTrick: binary always starts with 1, so use the closed-gap loop.\n529 is 1000010001, gap 4. 32 is 100000, gap 0.',
        code: 'def solution(N):\n    run = best = 0\n    for ch in bin(N)[2:]:\n        if ch == \'0\': run += 1\n        else: best, run = max(best, run), 0\n    return best' },

      { type: 'predict', code: 'run = best = 0\nfor ch in bin(20)[2:]:\n    if ch == \'0\': run += 1\n    else: best, run = max(best, run), 0\nprint(best)', q: 'What prints?',
        choices: ['1', '2', '0'],
        why: '20 is 10100. The last two zeros are never closed.' },

      { type: 'info', title: 'Read bits with % and //',
        body: '`N % 2` is the last bit. `N //= 2` drops it.\nA `while N > 0` loop reads the bits right to left.\nThis counts the 1 bits. N = 0 skips the loop and returns 0.',
        code: 'def solution(N):\n    count = 0\n    while N > 0:\n        count += N % 2\n        N //= 2\n    return count' },

      { type: 'info', title: 'Digits: % 10 and // 10',
        body: 'Swap 2 for 10 and the same loop walks decimal digits.\n`N % 10` is the last digit. `N //= 10` drops it.\nTrap: 0 never enters the loop, but 0 has one digit.',
        code: 'count = 0\nwhile N > 0:\n    count += 1   # one more digit\n    N //= 10' },

      { type: 'quiz', q: 'Daily 0/1 flags, 1 means rain. Longest rainy streak? Which pattern?',
        choices: ['Run counter plus best', 'Count the 1s', 'bin(N)[2:] and compare'],
        why: 'A streak is a run. The best survives each reset.' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Sum → `total += i`\nCount → `+= 1` inside `if`\nBiggest → start `best` at `A[0]`\nStreak → run resets, `best = max(best, run)`\nGap → update `best` on a `\'1\'`\nBinary → `bin(N)[2:]` or `N % 2`' }

    ]
  });
})();
