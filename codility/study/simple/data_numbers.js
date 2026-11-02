/* Simple Codility study cards — topic "numbers": Primes, gcd & Fibonacci.
   Short phone-friendly version of codility/study/data_numbers.js: same ideas, same order, fewer words. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'numbers',
    name: 'Primes, gcd & Fibonacci',
    tagline: 'Divisors up to the square root, a sieve for many primes at once, a remainder loop for gcd, two numbers for Fibonacci.',
    cards: [

      { type: 'info', title: 'Divisors come in pairs',
        body: '`N % D` is the remainder. Zero means D divides N. Divisors come in pairs: `i` with `N // i`. One of each pair is at most the square root. So loop while `i * i <= N`.',
        code: 'i = 1\nwhile i * i <= N:\n    if N % i == 0:\n        print(i, N // i)    # a pair\n    i += 1' },

      { type: 'info', title: 'Trap: no float square root',
        body: 'Every D up to 2 billion is 2 billion steps. Too slow. Up to the square root is 46,000 steps. Fast enough. Do not use `math.sqrt`, floats can round wrong. `i * i <= N` uses only whole numbers.' },

      { type: 'info', title: 'CountFactors',
        body: 'Task: how many divisors does N have? N up to 2 billion. Trick: each `i` found counts 2, itself and `N // i`. When `i * i == N` the partner is `i` itself. Then count 1.',
        code: 'count, i = 0, 1\nwhile i * i <= N:\n    if N % i == 0:\n        count += 1 if i * i == N else 2\n    i += 1\nreturn count' },

      { type: 'predict', code: 'count = 0\nfor i in range(1, 7):\n    if 36 % i == 0:\n        count += 1 if i * i == 36 else 2\nprint(count)',
        q: 'Counting divisors of 36. What prints?',
        choices: ['9', '10', '8'],
        why: 'Four pairs give 8. 6 pairs with itself, so add only 1.' },

      { type: 'info', title: 'MinPerimeterRectangle',
        body: 'Task: a rectangle with whole-number sides has area N. Return the smallest perimeter. Trick: the sides are a divisor pair, `i` and `N // i`. Perimeter is `2 * (i + N // i)`. Same loop, keep the smallest.',
        code: 'best, i = 2 * (1 + N), 1\nwhile i * i <= N:\n    if N % i == 0:\n        best = min(best, 2 * (i + N // i))\n    i += 1\nreturn best' },

      { type: 'info', title: 'Sieve: mark the multiples',
        body: 'To find all primes up to N, use a sieve. Go through `i` from 2. If `spf[i]` is still 0, `i` is prime. Mark its unmarked multiples with `i`, from `i * i`. `spf[k]` becomes the smallest prime factor.',
        code: 'spf = [0] * (N + 1)\nfor i in range(2, N + 1):\n    if spf[i] == 0:\n        spf[i] = i\n        for j in range(i * i, N + 1, i):\n            if spf[j] == 0: spf[j] = i' },

      { type: 'quiz', q: 'The sieve reaches i = 5. First number it marks?',
        choices: ['25', '10', '15'],
        why: '10, 15 and 20 were already marked by 2 and 3.' },

      { type: 'info', title: 'CountSemiprimes',
        body: 'Semiprime: two primes multiplied, like 4, 6, 9. Task: count semiprimes in many ranges. Trick: `r = k // spf[k]`. Semiprime when `r` is prime, so `spf[r] == r`. Running totals `pre` make each range one subtraction.',
        code: 'pre = [0] * (N + 1)\nfor k in range(2, N + 1):\n    r = k // spf[k]\n    pre[k] = pre[k - 1]\n    if r > 1 and spf[r] == r: pre[k] += 1\n# range P to Q: pre[Q] - pre[P - 1]' },

      { type: 'info', title: 'gcd: keep the remainder',
        body: 'The gcd is the biggest number that divides both. Trick: replace the pair by `M` and `N % M`. Stop when `M` is 0. `N` is the gcd. `gcd(x, 0)` is x, no special case. Fast even for huge numbers.',
        code: 'def gcd(N, M):\n    while M:\n        N, M = M, N % M\n    return N' },

      { type: 'predict', code: 'N, M = 12, 18\nwhile M:\n    N, M = M, N % M\nprint(N)',
        q: 'What prints?',
        choices: ['6', '2', '3'],
        why: 'The pair shrinks: 18, 12 then 12, 6 then 6, 0.' },

      { type: 'info', title: 'ChocolatesByNumbers',
        body: 'Task: N chocolates in a circle. Eat number 0, then every M-th one. Stop at an eaten one. How many eaten? N and M up to a billion: no chocolate loop. Trick: the answer is `N // gcd(N, M)`.',
        code: 'def solution(N, M):\n    a, b = N, M\n    while b:\n        a, b = b, a % b\n    return N // a' },

      { type: 'info', title: 'CommonPrimeDivisors',
        body: 'Task: count pairs `a`, `b` with the same set of prime divisors. Trick: `g = gcd(a, b)` holds the shared primes. Keep dividing `a` by `gcd(a, g)`. Reaching 1 means every prime is shared. Same for `b`.',
        code: 'def has_only(x, g):\n    while True:\n        d = gcd(x, g)\n        if d == 1: return x == 1\n        x = x // d\n# count pairs where a and b both pass' },

      { type: 'quiz', q: 'a = 10, b = 30. Same set of prime divisors?',
        choices: ['No, 30 has a 3', 'Yes, 10 divides 30', 'Yes, the gcd is 10'],
        why: 'g = 10. 30 // 10 = 3, and 3 does not divide 10.' },

      { type: 'info', title: 'Fibonacci: two numbers, one loop',
        body: '0, 1, 1, 2, 3, 5, 8. Each number is the sum of the two before. Keep two variables: `a, b = b, a + b`. Repeat N times, then `a` is the N-th number. Avoid recursion, it repeats work.',
        code: 'def fib(N):\n    a, b = 0, 1\n    for _ in range(N):\n        a, b = b, a + b\n    return a' },

      { type: 'info', title: 'Ladder',
        body: 'Task: climb `A[i]` rungs by 1 or 2 steps. How many ways, modulo `2 ** B[i]`? Trick: ways for n is the sum of the two before. That is Fibonacci. Build the list once, keeping numbers small with `% mod`.',
        code: 'mod = 2 ** max(B)\nways, ans = [1, 1], []\nfor _ in range(max(A)):\n    ways.append((ways[-1] + ways[-2]) % mod)\nfor a, b in zip(A, B):\n    ans.append(ways[a] % 2 ** b)' },

      { type: 'info', title: 'FibFrog',
        body: 'Task: frog at -1, leaves where `A[i]` is 1. Reach N with Fibonacci jumps. Fewest jumps, or -1. Trick: search in rounds. Round 1: all spots one jump away. Round 2: one jump further. First round reaching N wins.' },

      { type: 'quiz', q: 'Count primes between P and Q, for 30,000 questions. Which trick?',
        choices: ['Sieve once, then running totals', 'Test each number in each range', 'gcd of P and Q'],
        why: 'Same as CountSemiprimes: one table, then one subtraction per question.' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Divisors → loop while `i * i <= N`.\nAll primes → sieve.\nSemiprimes → spf, running totals.\nChocolatesByNumbers → `N // gcd`.\nCommonPrimeDivisors → divide by `gcd(a, g)`.\nLadder → Fibonacci, keep `% mod`.\nFibFrog → search in rounds.' }
    ]
  });
})();
