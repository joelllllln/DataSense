# Codility trainer — lesson file spec

Every topic is one file: `codility/data_<topic>.js`. It pushes lessons onto `window.CODILITY`.
Lessons run in the browser with real CPython (Pyodide). Tests are Python expressions.

## Shape of one lesson

```js
(function () {
  window.CODILITY = window.CODILITY || [];
  window.CODILITY.push(

  { topic: 'window',               // fixed topic id (see list below)
    id: 'window-01',               // '<topic>-NN', two digits, in ladder order
    title: 'Sum of the first k numbers',
    idea: 'ONE new idea in plain English. 1–3 short sentences. Say what is new compared with the last lesson.',
    brief: 'The task. Plain English. Short sentences. Say what the input is and what to return. Give the input limits if they matter (e.g. N up to 100,000).',
    fn: 'solution',                // the function the tests call (Codility always uses solution)
    sig: 'def solution(A, k)',
    starter: 'def solution(A, k):\n    # your code here\n    pass\n',
    examples: [ { in: 'solution([1, 2, 3, 4], 2)', out: '3' } ],   // 1–3 shown to the learner
    tests: [
      { call: 'solution([1, 2, 3, 4], 2)', expect: '3' },
      { call: 'solution([5], 1)', expect: '5', name: 'one element' },
      { call: 'solution([], 0)', expect: '0', name: 'empty', hidden: true },
      { call: 'solution(list(range(100000)), 50000)', expect: 'sum(range(50000))', name: 'big input', hidden: true }
    ],
    hint: 'One nudge. Not the answer.',
    solution: 'def solution(A, k):\n    return sum(A[:k])\n',
    walk: '2–4 short sentences: why the solution works, and the one thing to remember.',
    complexity: 'O(k)' }

  );
})();
```

Fields: all of the above are required except `hidden`/`name` on a test. Optional per lesson:
`unordered: true` (list order does not matter), `budget: 10` (seconds), `setup: '...'` (Python run before the learner's code).

## Rules

- **Ladder.** 20 lessons (18–22 is fine). Lesson N adds exactly ONE new idea over lesson N−1. The first lessons are tiny (one line of code). The last few are the real Codility tasks for the topic, at full difficulty, with the real input limits.
- **Plain English.** Short words, short sentences. No jargon without a one-line explanation. The learner is a beginner at algorithms but can write basic Python.
- **Function name is always `solution`.** Argument names match Codility: `A` for the array, `N` for a number, `S` for a string, `K` for a count/shift, `X`, `Y`, `D` for the frog problems, `P`, `Q` for query lists.
- **Tests.** 5–10 per lesson. Cover: the example, a one-element input, an empty input (if the task allows it), the boundary values, and at least one **big input** (n = 100,000 or the task's real limit) marked `hidden: true, name: 'big input'`, whose `expect` is a Python expression that computes the answer (e.g. `sum(range(…))`, `len(set(…))`) or a literal you have checked. The big test is what fails an O(n²) answer: the runner has a 10 second budget and Pyodide is roughly 3–5× slower than desktop CPython, so an O(n²) loop over 100,000 items will time out and an O(n) one will not. Keep expensive `expect` expressions O(n) too.
- `call` and `expect` are Python expressions evaluated in the learner's namespace, so `expect` may use builtins and the stdlib (`import math` first via `setup` if needed).
- **Starter** is the signature plus `# your code here` and `pass`. For later lessons it may include a comment reminding the previous idea, never the answer.
- **Solution** must pass every test, be the clean idiomatic O(n) (or stated) answer, and use the idea of the lesson, not a trick from a later lesson.
- **Hint** is one sentence. **Walk** explains the solution to someone who could not do it.
- Correct spelling and grammar. No emoji. Strings use single quotes; escape `'` inside as `\'` or use double quotes for that string.
- Run `node codility/validate.js codility/data_<topic>.js` and fix everything it reports until it prints `OK`.

## Topic ids and what each ladder must reach

| id | name | the ladder must end at these Codility tasks |
|---|---|---|
| basics | Python from the ground | plain-Python building blocks for someone who mostly knows pandas (24–26 lessons allowed) |
| iter | Loops & binary | BinaryGap (and variants: longest run of 1s, count set bits) |
| arr | Arrays & time complexity | CyclicRotation, OddOccurrencesInArray, FrogJmp, PermMissingElem, TapeEquilibrium |
| count | Counting elements | FrogRiverOne, PermCheck, MissingInteger, MaxCounters |
| prefix | Prefix sums | PassingCars, CountDiv, GenomicRangeQuery, MinAvgTwoSlice |
| sort | Sorting & sets | Distinct, MaxProductOfThree, Triangle, NumberOfDiscIntersections |
| stack | Stacks & queues | Brackets, Nesting, Fish, StoneWall |
| window | Sliding window (caterpillar) | fixed window max/sum, longest window with sum ≤ S, longest substring without repeats, AbsDistinct, CountDistinctSlices, MinAbsSumOfTwo, CountTriangles |
| lead | Leader & max slice | Dominator, EquiLeader, MaxProfit, MaxSliceSum, MaxDoubleSliceSum |
| bsearch | Binary search & greedy | binary search by hand, bisect, binary search on the answer (MinMaxDivision), TieRopes, MaxNonoverlappingSegments |
| numbers | Primes, gcd & Fibonacci | CountFactors, MinPerimeterRectangle, sieve, CountSemiprimes, ChocolatesByNumbers, CommonPrimeDivisors, Ladder, FibFrog |
