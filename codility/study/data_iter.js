/* Codility study cards — topic "iter": Loops & binary.
   Teaching side of codility/data_iter.js: same ladder, same names, same order.
   Shape and rules: see codility/study/SPEC.md. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'iter',
    name: 'Loops & binary',
    tagline: 'Loops, counters and running bests, up to reading a number bit by bit.',
    cards: [

      { type: 'info', title: 'Every answer is def solution',
        body: 'Codility calls a function named `solution` and checks what it returns.\nForget `return` and it hands back `None`: every test fails.\nThe name is always `solution`. The input is the only argument.',
        code: 'def solution(N):\n    return N' },

      { type: 'info', title: 'for over range: 1 to N',
        body: '`range(1, N + 1)` gives 1, 2, ..., N. It stops just before the second number, so the `+ 1` is what includes N.\nA running total starts at 0 and grows inside the loop.\nThis is the off-by-one to check first.',
        code: 'def solution(N):\n    total = 0\n    for i in range(1, N + 1):\n        total += i\n    return total' },

      { type: 'predict', code: 'total = 0\nfor i in range(1, 4):\n    total += i\nprint(total)', q: 'What prints?',
        choices: ['6', '10', '3', '0'], why: 'range(1, 4) is 1, 2, 3. The 4 is not included. 1 + 2 + 3 is 6.' },

      { type: 'info', title: 'A counter with an if',
        body: 'A counter is a total that grows by 1, and only when a condition holds.\n`i % 2 == 0` means the remainder after dividing by 2 is 0, so i is even.\nThe loop is unchanged; the `if` decides when to count.',
        code: 'def solution(N):\n    count = 0\n    for i in range(1, N + 1):\n        if i % 2 == 0:\n            count += 1\n    return count' },

      { type: 'info', title: 'Running best: start at A[0]',
        body: '`best` holds the biggest value seen so far. Replace it whenever something bigger appears.\nStart it at `A[0]`, a real value from the list.\nTrap: starting at 0 is wrong when every number is negative. The answer would be 0, which is not in the list.',
        code: 'def solution(A):\n    best = A[0]\n    for x in A:\n        if x > best:\n            best = x\n    return best' },

      { type: 'quiz', q: '`A = [-5, -2, -9]`. The loop starts with `best = 0`. What does it return?',
        choices: ['0, which is not even in the list', '-2', '-9', 'It crashes'],
        why: 'Nothing is bigger than 0, so best never changes. Start best at A[0].' },

      { type: 'info', title: 'A counter that resets',
        body: '`run` counts the 1s in a row you have just seen.\nA 1 makes it longer. A 0 sets it back to 0.\nAfter the loop, `run` is the length of the final run of 1s.\nResetting is how a loop forgets what came before a break.',
        code: 'def solution(A):\n    run = 0\n    for x in A:\n        if x == 1:\n            run += 1\n        else:\n            run = 0\n    return run' },

      { type: 'info', title: 'Longest run: counter plus best',
        body: 'Add a `best` to the resetting counter.\nEach time `run` grows, keep the bigger of `run` and `best`.\nA 0 resets `run` but leaves `best` alone, so nothing is lost.\nThis pair is behind most "longest" questions.',
        code: 'run = best = 0\nfor x in A:\n    if x == 1:\n        run += 1\n        best = max(best, run)\n    else:\n        run = 0\nreturn best' },

      { type: 'predict', code: 'run = best = 0\nfor x in [1, 1, 0, 1, 1, 1, 0, 1]:\n    if x == 1:\n        run += 1\n        best = max(best, run)\n    else:\n        run = 0\nprint(best)', q: 'What prints?',
        choices: ['3', '1', '2', '6'], why: 'The runs are 2, 3 and 1. best keeps the biggest, 3. The final reset does not touch it.' },

      { type: 'info', title: 'bin(N)[2:]: the binary digits',
        body: '`bin(5)` is the text `\'0b101\'`. The `0b` just says "this is binary".\nSlicing with `[2:]` keeps everything from position 2 on, so only the digits remain.\n`bin(N)[2:]` is the one-liner for "binary digits of N".',
        code: 'def solution(N):\n    return bin(N)[2:]' },

      { type: 'info', title: 'Looping over a string gives text',
        body: '`for ch in bin(N)[2:]` visits one character at a time.\nEach `ch` is text, so compare with `\'1\'` in quotes, not the number 1.\nTrap: `ch == 1` is never true, so the counter stays at 0 and no error tells you why.',
        code: 'def solution(N):\n    count = 0\n    for ch in bin(N)[2:]:\n        if ch == \'1\':\n            count += 1\n    return count' },

      { type: 'quiz', q: 'The loop above is changed to `if ch == 1:` (no quotes). What does `solution(7)` return?',
        choices: ['0', '3', '7', 'It crashes'],
        why: 'ch is the text \'1\'. It never equals the number 1, so nothing is counted.' },

      { type: 'predict', code: 'N = 0\nprint(bin(N)[2:].count(\'0\'))', q: 'What prints?',
        choices: ['1', '0', '2', 'It crashes'],
        why: 'bin(0) is \'0b0\'. Its digits are the single character \'0\'. Always ask what the smallest input looks like.' },

      { type: 'info', title: 'The run pattern works on strings',
        body: 'Longest run of 0s in a string `S`: the same `run` and `best`.\nOnly the test changes: `ch == \'0\'` grows the run, anything else resets it.\nThe pattern does not care whether the items are numbers or characters.',
        code: 'run = best = 0\nfor ch in S:\n    if ch == \'0\':\n        run += 1\n        best = max(best, run)\n    else:\n        run = 0\nreturn best' },

      { type: 'info', title: 'Only a closed gap counts',
        body: 'A gap is a run of 0s with a 1 on both sides.\nSo update `best` when you meet a `\'1\'`, not while the run grows.\nZeros at the very end never meet a closing 1, so they are never counted.\nWhere you update `best` decides which runs count.',
        code: 'run = best = 0\nfor ch in S:\n    if ch == \'0\':\n        run += 1\n    else:\n        best = max(best, run)\n        run = 0\nreturn best' },

      { type: 'quiz', q: '`S = \'10100\'`. What is the longest closed gap?',
        choices: ['1', '2', '3', '0'],
        why: 'The single 0 between the 1s is closed. The two zeros at the end never meet a closing 1.' },

      { type: 'info', title: 'BinaryGap',
        body: 'The task: N is a positive whole number up to 2,147,483,647. Return the longest run of 0s in its binary form with 1s on both sides, or 0 if there is none.\nKey insight: `bin(N)[2:]` always starts with 1, so every run of zeros is opened. Only the closing 1 is in doubt. It is exactly the closed-gap loop.' },

      { type: 'info', title: 'BinaryGap: the code',
        body: '529 is `1000010001`: gap 4. 20 is `10100`: gap 1, the trailing zeros stay in `run`. 32 is `100000`: no gap, return 0.\n`best, run = max(best, run), 0` closes the run and resets it in one line.\nAt most 31 characters, so this is O(log N): fast.',
        code: 'def solution(N):\n    run = best = 0\n    for ch in bin(N)[2:]:\n        if ch == \'1\':\n            best, run = max(best, run), 0\n        else:\n            run += 1\n    return best' },

      { type: 'predict', code: 'run = best = 0\nfor ch in bin(20)[2:]:\n    if ch == \'0\':\n        run += 1\n    else:\n        best = max(best, run)\n        run = 0\nprint(best)', q: 'What prints?',
        choices: ['1', '2', '0', '3'],
        why: '20 is 10100. The single 0 is closed by a 1. The last two zeros are never closed, so best stays 1.' },

      { type: 'info', title: 'Reading bits without bin()',
        body: '`N % 2` is the last bit. `N //= 2` drops it. A `while N > 0` loop sees the bits right to left.\nFor BinaryGap, first strip the trailing zeros with `while N % 2 == 0`; they can never be in a gap. Then the plain run-and-best loop works.',
        code: 'while N % 2 == 0:\n    N //= 2\nwhile N > 0:\n    bit = N % 2\n    # a 0 bit grows run, a 1 bit closes it\n    N //= 2' },

      { type: 'info', title: 'Count the 1 bits with while',
        body: 'The same loop, used for counting. `N % 2` is 1 for a 1 bit and 0 for a 0 bit, so add it to the counter each pass.\nThe loop runs once per bit, about 31 times for the biggest N. N = 0 never enters the loop and returns 0.',
        code: 'def solution(N):\n    count = 0\n    while N > 0:\n        count += N % 2\n        N //= 2\n    return count' },

      { type: 'quiz', q: 'N is 13 (binary 1101). After one pass of `count += N % 2` and `N //= 2`, what are count and N?',
        choices: ['count 1, N 6', 'count 1, N 7', 'count 0, N 6', 'count 1, N 12'],
        why: '13 % 2 is 1, the last bit. 13 // 2 is 6, binary 110: that last bit is gone.' },

      { type: 'info', title: 'Power of two: N & (N - 1)',
        body: 'A power of two has one 1 bit: 8 is `1000`.\nSubtracting 1 flips that bit and everything below: 7 is `0111`.\n`&` keeps a 1 only where both have a 1, so `8 & 7` is 0. But `6 & 5` (`110`, `101`) is `100`, not 0.\nGuard with `N > 0`: 0 is not a power of two.',
        code: 'def solution(N):\n    return N > 0 and N & (N - 1) == 0' },

      { type: 'quiz', q: 'Why does the power-of-two check need `N > 0`?',
        choices: ['0 & -1 is 0, but 0 is not a power of two', 'Negative N would crash', '& does not work on 1', 'It stops the loop'],
        why: 'Without the guard, N = 0 passes the & test and wrongly returns True.' },

      { type: 'info', title: 'Decimal digits: % 10 and // 10',
        body: 'Swap 2 for 10 and the same loop walks decimal digits.\n`N % 10` is the last digit; `N //= 10` drops it.\nCount the passes for the number of digits. Add `N % 10` to a total for the digit sum.\nTrap: 0 never enters the loop, but 0 has one digit. Handle it first.',
        code: 'def solution(N):\n    if N == 0:\n        return 1\n    count = 0\n    while N > 0:\n        count += 1\n        N //= 10\n    return count' },

      { type: 'info', title: 'Reverse the digits, keep a copy',
        body: 'Peel the last digit with `% 10` and glue it onto `rev` with `rev * 10 + digit`. 123 becomes 3, then 32, then 321.\nThe loop eats N, so copy it first if you need it later.\nPalindrome check: reverse, then `rev == original`. 10 reverses to 1, so it is not one.',
        code: 'def solution(N):\n    original = N\n    rev = 0\n    while N > 0:\n        rev = rev * 10 + N % 10\n        N //= 10\n    return rev == original' },

      { type: 'predict', code: 'N = 120\nrev = 0\nwhile N > 0:\n    rev = rev * 10 + N % 10\n    N //= 10\nprint(rev)', q: 'What prints?',
        choices: ['21', '021', '12', '120'],
        why: 'The digits come off as 0, 2, 1. rev goes 0, 2, 21. A leading zero is not stored in a number.' },

      { type: 'info', title: 'A loop inside a loop',
        body: '"For each number from 1 to N, count its 1 bits": put the loop you know in a helper and call it from a `for`.\nWork is N times the bits per number, about 17 for N = 100,000: O(N log N), fast enough.\nA helper keeps the nesting readable.',
        code: 'def solution(N):\n    result = 0\n    for i in range(1, N + 1):\n        if count_ones(i) % 2 == 0:\n            result += 1\n    return result' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Total: `total += i`\nCounter: `+= 1` in an `if`\nBest: start at `A[0]`\nRun: grow or reset\nLongest run: `best = max(best, run)`\nClosed gap: update best on a 1\nBinary: `bin(N)[2:]`, compare `\'1\'`\nBits: `N % 2`, `N //= 2`\nDigits: `N % 10`, `N //= 10`\nPower of two: `N & (N - 1) == 0`' },

      { type: 'quiz', q: 'One-line problem: "A list of daily 0/1 flags, 1 means rain. Longest streak of rainy days?" Which pattern?',
        choices: ['Run counter plus running best', 'Count the 1s', 'bin(N)[2:] and slice', 'Reverse the digits'],
        why: 'A streak is a run; the longest one needs the run counter and a best that survives the resets.' }

    ]
  });
})();
