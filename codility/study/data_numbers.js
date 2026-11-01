/* Codility study cards — topic "numbers": Primes, gcd & Fibonacci.
   Teaching side of codility/data_numbers.js: same ladder, same names, same order. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'numbers',
    name: 'Primes, gcd & Fibonacci',
    tagline: 'Divisors up to the square root, a sieve for many numbers at once, Euclid for gcd, and a two-variable loop for Fibonacci.',
    cards: [

      { type: 'info', title: 'Does D divide N?',
        body: '`N % D` is the remainder: what is left over after dividing.\nD divides N exactly when `N % D == 0`. A divisor of N is any such D: 24 has eight (1, 2, 3, 4, 6, 8, 12, 24).\nTrying every D up to N finds them all, but that is O(N): hopeless near two billion.',
        code: 'def solution(N, D):\n    return 1 if N % D == 0 else 0' },

      { type: 'info', title: 'Divisors come in pairs up to sqrt',
        body: 'If `i` divides N, so does `N // i`; one of the pair is at most sqrt(N).\nSo loop `i` only while `i * i <= N`: 46,000 steps for two billion. Use `i * i`, not a float square root: floats round.\nNo hit from `i = 2` up: N is prime (N < 2 is not).' },

      { type: 'quiz', q: 'N = 24. Which values of `i` does the loop `while i * i <= N` try?',
        choices: ['1, 2, 3, 4', '1 to 24', '1 to 12', '1 to 5'],
        why: '5 * 5 = 25 is past 24, so the loop stops after i = 4; the big divisors 6, 8, 12, 24 come as partners.' },

      { type: 'info', title: 'CountFactors',
        body: 'Task: return how many positive divisors N has. N up to 2,147,483,647.\nKey insight: count 2 for every divisor `i` found below the square root (itself and its partner `N // i`). When `i * i == N` the partner is the same number, so count 1.\nO(sqrt(N)).',
        code: 'def solution(N):\n    count, i = 0, 1\n    while i * i <= N:\n        if N % i == 0:\n            count += 1 if i * i == N else 2\n        i += 1\n    return count' },

      { type: 'predict', code: 'def solution(N):\n    count, i = 0, 1\n    while i * i <= N:\n        if N % i == 0:\n            count += 1 if i * i == N else 2\n        i += 1\n    return count\n\nprint(solution(36))',
        q: 'What prints?',
        choices: ['9', '10', '8', '6'],
        why: 'Pairs (1, 36), (2, 18), (3, 12), (4, 9) give 8, and 6 * 6 == 36 adds just one: 9.' },

      { type: 'info', title: 'MinPerimeterRectangle',
        body: 'Task: N is the area of a rectangle with whole-number sides. Return the smallest possible perimeter.\nKey insight: the sides are a divisor `i` and `N // i`, perimeter `2 * (i + N // i)`. The closer the sides, the smaller the perimeter. Same loop as CountFactors; keep the minimum. A prime gives 1 by N.',
        code: 'def solution(N):\n    best, i = 2 * (1 + N), 1\n    while i * i <= N:\n        if N % i == 0:\n            best = min(best, 2 * (i + N // i))\n        i += 1\n    return best' },

      { type: 'quiz', q: 'N = 30. What does MinPerimeterRectangle return?',
        choices: ['22', '62', '26', '34'],
        why: 'Divisors up to the square root: 1, 2, 3, 5. Sides 5 and 6 are the closest: 2 * (5 + 6) = 22.' },

      { type: 'info', title: 'The sieve: all primes up to N at once',
        body: 'Trial division tests one number. To know "is k prime?" for every k up to N, use the Sieve of Eratosthenes.\nStart with `is_prime = [True] * (N + 1)`, set 0 and 1 to False. For each `i` still True, cross out its multiples. What stays True is prime.\nCost O(N log log N), close to linear.',
        code: 'def solution(N):\n    is_prime = [True] * (N + 1)\n    is_prime[0] = is_prime[1] = False\n    for i in range(2, N + 1):\n        if is_prime[i]:\n            for j in range(i * i, N + 1, i):\n                is_prime[j] = False\n    return is_prime' },

      { type: 'info', title: 'Trap: the sieve starts at i * i',
        body: 'Cross out from `i * i`, not from `2 * i`: smaller multiples such as `3 * 5` were already crossed out by the smaller prime 3.\nSo the outer loop can stop once `i * i > N`.\nFor N near a million use a slice, which runs in C: `is_prime[i*i::i] = [False] * len(range(i*i, N+1, i))`.' },

      { type: 'quiz', q: 'The sieve reaches i = 5. Which multiple of 5 is the first one it crosses out?',
        choices: ['25', '10', '5', '15'],
        why: '10, 15 and 20 were already crossed out by 2 and 3; the first multiple nobody has touched is 5 * 5.' },

      { type: 'predict', code: 'N = 10\nis_prime = [True] * (N + 1)\nis_prime[0] = is_prime[1] = False\nfor i in range(2, N + 1):\n    if is_prime[i]:\n        for j in range(i * i, N + 1, i):\n            is_prime[j] = False\nprint(sum(is_prime))',
        q: 'What prints?',
        choices: ['4', '5', '3', '10'],
        why: '2, 3, 5 and 7 are the primes up to 10; sum() counts each True as 1.' },

      { type: 'info', title: 'Smallest-prime-factor table',
        body: 'A small change to the sieve stores more: instead of False, record the prime that crossed k out first. `spf[k]` is the smallest prime factor of k.\nWrite `spf[j]` only if it is still 0, so the smallest prime wins.\n`spf[k] == k` means k is prime. `spf[0]` and `spf[1]` stay 0.',
        code: 'def solution(N):\n    spf = [0] * (N + 1)\n    for i in range(2, N + 1):\n        if spf[i] == 0:\n            spf[i] = i\n            for j in range(i * i, N + 1, i):\n                if spf[j] == 0: spf[j] = i\n    return spf' },

      { type: 'info', title: 'Factorise with the table',
        body: 'With `spf`, split any k up to N into primes: while `k > 1`, write down `spf[k]` and divide k by it.\nEach step removes one prime factor, so it takes about log k steps. Factors come out smallest first.\nk = 1 gives an empty list: the loop never runs.\nBuild the table once, factorise many numbers.',
        code: 'factors = []\nwhile k > 1:\n    factors.append(spf[k])\n    k = k // spf[k]\n# 60 -> [2, 2, 3, 5]' },

      { type: 'info', title: 'Semiprime: two primes multiplied',
        body: 'A semiprime is a product of two primes, equal ones allowed: 4, 6, 9, 10, 14, 15, ...\nWith `spf`: take the smallest prime out, `r = k // spf[k]`. If `r` is prime (`r > 1 and spf[r] == r`), k is a semiprime. `r == 1` means k was prime; otherwise three or more prime factors.',
        code: 'count = 0\nfor k in range(4, N + 1):\n    r = k // spf[k]\n    if r > 1 and spf[r] == r:\n        count += 1' },

      { type: 'info', title: 'CountSemiprimes',
        body: 'Task: M questions `P[i]..Q[i]`: how many semiprimes lie in each range? N up to 50,000, M up to 30,000.\nKey insight: counting inside every range is O(N * M), too slow. Build a prefix count: `pre[k]` = semiprimes up to k. Each question is `pre[Q] - pre[P - 1]`. `pre[0] = 0` handles P = 1.',
        code: 'pre = [0] * (N + 1)\nfor k in range(1, N + 1):\n    pre[k] = pre[k - 1]\n    if k >= 4:\n        r = k // spf[k]\n        if r > 1 and spf[r] == r:\n            pre[k] += 1\nreturn [pre[q] - pre[p - 1] for p, q in zip(P, Q)]' },

      { type: 'quiz', q: '`pre[k]` counts semiprimes up to k. How many semiprimes lie between P and Q, both ends included?',
        choices: ['pre[Q] - pre[P - 1]', 'pre[Q] - pre[P]', 'pre[Q - P]', 'pre[Q] + pre[P]'],
        why: 'Everything up to Q, minus everything before P. Subtracting pre[P] would drop P itself.' },

      { type: 'info', title: 'Euclid: gcd with the remainder',
        body: 'The gcd (greatest common divisor) is the biggest number dividing both.\nAny divisor of N and M also divides N - M, so subtracting keeps the gcd. But gcd(10000, 1) needs 9,999 subtractions.\n`N % M` does them all at once. Loop `N, M = M, N % M` while M is not 0: under 90 steps for 18-digit numbers.',
        code: 'def gcd(N, M):\n    while M:\n        N, M = M, N % M\n    return N' },

      { type: 'info', title: 'Trap: gcd(0, x), order, and lcm',
        body: 'The loop stops when M is 0 and returns N. So `gcd(0, x)` is x and `gcd(x, 0)` is x: the one-liner handles both. Do not add a special case.\nIf N < M, the first step just swaps them.\nlcm (least common multiple) is `N * M // gcd(N, M)`. Use `//`. N * M cannot overflow in Python.' },

      { type: 'predict', code: 'N, M = 0, 7\nwhile M:\n    N, M = M, N % M\nprint(N)',
        q: 'What prints?',
        choices: ['7', '0', '1', 'Error'],
        why: 'M is 7, so one step gives N, M = 7, 0 % 7 = 0; the loop ends and N is 7. gcd(0, x) is x.' },

      { type: 'info', title: 'ChocolatesByNumbers',
        body: 'Task: N chocolates in a circle. Eat number 0, then every M-th one, and stop at an eaten one. Return how many you eat. N and M up to 1,000,000,000: no loop over chocolates.\nKey insight: you visit exactly the multiples of gcd(N, M), and the first repeat is 0 after whole laps. Answer: `N // gcd(N, M)`.',
        code: 'def solution(N, M):\n    a, b = N, M\n    while b:\n        a, b = b, a % b\n    return N // a' },

      { type: 'quiz', q: 'N = 10, M = 4. How many chocolates are eaten?',
        choices: ['5', '4', '10', '2'],
        why: '0, 4, 8, 2, 6, then 0 again: five, which is 10 // gcd(10, 4) = 10 // 2.' },

      { type: 'info', title: 'CommonPrimeDivisors: the gcd trick',
        body: 'Task: for each pair A[i], B[i] (values up to two billion), do both have the same set of prime divisors? Count the pairs that do.\nKey insight: never factorise. `g = gcd(a, b)` holds exactly the shared primes. Divide a by `gcd(a, g)` until that gcd is 1. If a reached 1, all its primes were shared. Same for b.',
        code: 'def has_only(x, g):\n    while True:\n        d = gcd(x, g)\n        if d == 1:\n            return x == 1\n        x //= d\n\n# count pairs with has_only(a, g) and has_only(b, g), g = gcd(a, b)' },

      { type: 'quiz', q: 'a = 10, b = 30. Same set of prime divisors?',
        choices: ['No: 30 has the prime 3 that 10 lacks', 'Yes: 10 divides 30', 'Yes: the gcd is 10, bigger than 1', 'No: they are not equal'],
        why: 'g = 10; 30 // 10 = 3 and gcd(3, 10) = 1, so b is stuck above 1 and the pair does not count.' },

      { type: 'info', title: 'Fibonacci, iteratively',
        body: 'F(0) = 0, F(1) = 1, each next is the sum of the two before: 0, 1, 1, 2, 3, 5, 8.\nTwo variables, one loop: `a, b = b, a + b`, N times. Then `a` is F(N).\nNever write it recursively: the same values get recomputed over and over.\nPython integers grow as needed: F(10000) has 2,090 digits.',
        code: 'def solution(N):\n    a, b = 0, 1\n    for _ in range(N):\n        a, b = b, a + b\n    return a' },

      { type: 'info', title: 'Ladder: Fibonacci modulo 2**B',
        body: 'Task: ways to climb A[i] rungs taking 1 or 2 at a time, modulo `2**B[i]`, B up to 30.\nKey insight: ways(n) = ways(n - 1) + ways(n - 2) = F(n + 1). Build the list once modulo `2**max(B)` so numbers stay small. `x & ((1 << b) - 1)` keeps the lowest b bits: x mod 2**b.',
        code: 'def solution(A, B):\n    mod = 1 << max(B)\n    fib = [0, 1]\n    for _ in range(max(A) + 1):\n        fib.append((fib[-1] + fib[-2]) % mod)\n    return [fib[a + 1] & ((1 << b) - 1) for a, b in zip(A, B)]' },

      { type: 'predict', code: 'fib = [0, 1]\nfor _ in range(6):\n    fib.append((fib[-1] + fib[-2]) % 8)\nprint(fib[6])',
        q: 'A ladder of 5 rungs has F(6) = 8 ways. What prints for the answer modulo 2**3?',
        choices: ['0', '8', '5', '1'],
        why: '8 % 8 is 0: the modulus can wipe the whole answer out, and that is the expected result.' },

      { type: 'info', title: 'FibFrog: fewest jumps means BFS',
        body: 'Task: a frog at -1 must reach N (up to 100,000). Each jump is a Fibonacci length and lands on a leaf (`A[i] == 1`) or on N. Return the fewest jumps, or -1.\nKey insight: fewest moves means breadth-first search: explore round by round. Only about 25 Fibonacci numbers reach 100,001, so each position tries at most 25 jumps.',
        code: 'fibs = []\na, b = 1, 2            # skip 0 and the repeated 1\nwhile a <= N + 1:\n    fibs.append(a)\n    a, b = b, a + b' },

      { type: 'info', title: 'FibFrog: the code',
        body: 'Shift positions by one: `R[0]` is the bank, `R[N + 1]` the far bank, both landable.\n`dist[q]` is the fewest jumps to q, -1 if unseen. `for p in queue` keeps going as the queue grows: that is the BFS. Each position enters the queue once: about N * 25 work.\nUnreached far bank: `dist[N + 1]` stays -1.',
        code: 'R = [1] + A + [1]\ndist, queue = [0] + [-1] * (N + 1), [0]\nfor p in queue:\n    for f in fibs:\n        q = p + f\n        if q <= N + 1 and R[q] == 1 and dist[q] == -1:\n            dist[q] = dist[p] + 1; queue.append(q)\nreturn dist[N + 1]' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Divisors: loop while `i*i <= N`, pair i with `N//i` (CountFactors, MinPerimeterRectangle).\nSieve: cross out from `i*i`.\nspf table: `spf[k]==k` is prime; divide out to factorise.\nCountSemiprimes: `k//spf[k]` prime, `pre[Q]-pre[P-1]`.\ngcd: `while M: N, M = M, N%M`; gcd(0,x)=x; lcm=`N*M//gcd`.\nChocolatesByNumbers: `N//gcd`.\nCommonPrimeDivisors: divide by `gcd(a,g)` until 1.\nFibonacci: `a, b = b, a+b`; Ladder: F(n+1) mod 2**B; FibFrog: BFS.' },

      { type: 'quiz', q: 'For 30,000 queries, how many primes lie between P and Q, with Q up to 50,000? Which pattern?',
        choices: ['Sieve once, then a prefix count: pre[Q] - pre[P - 1]', 'Trial division for every number in every range', 'Euclid gcd of P and Q', 'A Fibonacci list up to Q'],
        why: 'It is CountSemiprimes with "prime" in place of "semiprime": one table, then one subtraction per query.' }
    ]
  });
})();
