/* Codility trainer - topic "count" (Counting elements).
   Ladder: in / set / counting list / seen set -> FrogRiverOne, PermCheck,
   MissingInteger, MaxCounters, then counting with dicts and queries.
   See SPEC.md for the lesson shape. */
(function () {
  window.CODILITY = window.CODILITY || [];
  window.CODILITY.push(

  /* ---------------------------------------------------------------- 01 */
  { topic: 'count',
    id: 'count-01',
    title: 'Is X in the list?',
    idea: 'Python can ask "is this value somewhere in the list?" with one word: in. The expression X in A is True or False, so you can return it directly.',
    brief: 'You get a list of numbers A and a number X. Return True if X appears in A, otherwise return False. A can be empty. A has up to 100,000 numbers.',
    fn: 'solution',
    sig: 'def solution(A, X)',
    starter: 'def solution(A, X):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 1, 4], 4)', out: 'True' },
      { in: 'solution([3, 1, 4], 5)', out: 'False' }
    ],
    tests: [
      { call: 'solution([3, 1, 4], 4)', expect: 'True' },
      { call: 'solution([3, 1, 4], 5)', expect: 'False' },
      { call: 'solution([7], 7)', expect: 'True', name: 'one element' },
      { call: 'solution([], 1)', expect: 'False', name: 'empty' },
      { call: 'solution([2, 2, 2], 2)', expect: 'True', name: 'repeated value' },
      { call: 'solution(list(range(100000)), 99999)', expect: 'True', name: 'big input', hidden: true },
      { call: 'solution(list(range(100000)), 100000)', expect: 'False', name: 'big input, not there', hidden: true }
    ],
    hint: 'The whole answer is one in test.',
    solution: 'def solution(A, X):\n    return X in A\n',
    walk: 'X in A walks along A and stops as soon as it finds X. The result is already True or False, so you return it as it is. One thing to remember: in on a list may have to look at every element, so it costs O(N). That will matter in later lessons.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 02 */
  { topic: 'count',
    id: 'count-02',
    title: 'How many different values?',
    idea: 'A set keeps each value only once. set(A) throws away the repeats, and len() counts what is left.',
    brief: 'You get a list of numbers A. Return how many different values it contains. [2, 1, 1, 2, 3, 1] has three different values: 1, 2 and 3. A can be empty. A has up to 100,000 numbers.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([2, 1, 1, 2, 3, 1])', out: '3' }
    ],
    tests: [
      { call: 'solution([2, 1, 1, 2, 3, 1])', expect: '3' },
      { call: 'solution([5])', expect: '1', name: 'one element' },
      { call: 'solution([])', expect: '0', name: 'empty' },
      { call: 'solution([1, 1, 1, 1])', expect: '1', name: 'all the same' },
      { call: 'solution([1, 2, 3, 4])', expect: '4', name: 'all different' },
      { call: 'solution(list(range(50000)) * 2)', expect: '50000', name: 'big input', hidden: true }
    ],
    hint: 'Turn the list into a set, then measure its length.',
    solution: 'def solution(A):\n    return len(set(A))\n',
    walk: 'set(A) builds a collection with no duplicates: every value from A is in it exactly once. len() of that set is the number of different values. Building a set from N items is O(N) on average. Remember this pair: set to remove repeats, len to count.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 03 */
  { topic: 'count',
    id: 'count-03',
    title: 'The counting list',
    idea: 'When the values are small whole numbers 1..M, make a list of M+1 zeros and use the value itself as the index: count[v] += 1. This is the counting list, the key tool of the whole topic.',
    brief: 'You get a list A whose values are all between 1 and M, and the number M. Return a list count of length M+1 where count[v] is how many times v appears in A. count[0] stays 0. A can be empty. A has up to 100,000 numbers and M is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A, M)',
    starter: 'def solution(A, M):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1, 2, 1, 3], 3)', out: '[0, 2, 1, 1]' }
    ],
    setup: 'BIG = [(i * 7) % 100 + 1 for i in range(100000)]\nBIGC = [BIG.count(v) for v in range(101)]\n',
    tests: [
      { call: 'solution([1, 2, 1, 3], 3)', expect: '[0, 2, 1, 1]' },
      { call: 'solution([2], 2)', expect: '[0, 0, 1]', name: 'one element' },
      { call: 'solution([], 2)', expect: '[0, 0, 0]', name: 'empty' },
      { call: 'solution([3, 3, 3], 3)', expect: '[0, 0, 0, 3]', name: 'all the same' },
      { call: 'solution([1], 1)', expect: '[0, 1]', name: 'M = 1' },
      { call: 'solution(BIG, 100)', expect: 'BIGC', name: 'big input', hidden: true }
    ],
    hint: 'Start with [0] * (M + 1), then add 1 at position v for every v in A.',
    solution: 'def solution(A, M):\n    count = [0] * (M + 1)\n    for v in A:\n        count[v] += 1\n    return count\n',
    walk: '[0] * (M + 1) makes M+1 zeros, so the indexes run from 0 to M and every value v has its own slot. Each time you meet v you add 1 to count[v]. One pass over A, O(N). The trick to remember: the value is the index. You can only do this when the values are small whole numbers.',
    complexity: 'O(N + M)' },

  /* ---------------------------------------------------------------- 04 */
  { topic: 'count',
    id: 'count-04',
    title: 'The most common value',
    idea: 'Once you have the counting list, max(count) is the biggest tally and count.index(...) finds which value has it.',
    brief: 'You get a non-empty list A whose values are all between 1 and M, and the number M. Return the value that appears most often. If several values tie, return the smallest of them. A has up to 100,000 numbers and M is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A, M)',
    starter: 'def solution(A, M):\n    # build the counting list first\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1, 2, 2, 3], 3)', out: '2' },
      { in: 'solution([1, 2, 3], 3)', out: '1' }
    ],
    setup: 'BIG = [(i * 7) % 100 + 1 for i in range(100000)]\nBIG2 = BIG + [42]\n',
    tests: [
      { call: 'solution([1, 2, 2, 3], 3)', expect: '2' },
      { call: 'solution([1, 2, 3], 3)', expect: '1', name: 'tie, smallest wins' },
      { call: 'solution([5], 5)', expect: '5', name: 'one element' },
      { call: 'solution([3, 3, 1, 1, 1], 3)', expect: '1', name: 'last value is not the winner' },
      { call: 'solution([2, 1, 2, 1], 2)', expect: '1', name: 'tie of two' },
      { call: 'solution(BIG, 100)', expect: '1', name: 'big input, all tied', hidden: true },
      { call: 'solution(BIG2, 100)', expect: '42', name: 'big input, one winner', hidden: true }
    ],
    hint: 'max(count) tells you the highest tally; list.index gives the first position where it occurs.',
    solution: 'def solution(A, M):\n    count = [0] * (M + 1)\n    for v in A:\n        count[v] += 1\n    return count.index(max(count))\n',
    walk: 'Build the counting list as in the last lesson. max(count) is the largest number of times anything appeared. count.index(that number) returns the first index holding it, and since indexes go up from 0, the first one is the smallest value, which is exactly the tie rule. Index 0 is never picked because count[0] stays 0 and A is not empty.',
    complexity: 'O(N + M)' },

  /* ---------------------------------------------------------------- 05 */
  { topic: 'count',
    id: 'count-05',
    title: 'Does any value repeat?',
    idea: 'A seen set remembers the values you have met. Checking v in seen is instant for a set (unlike a list). The moment you find a repeat you can return, without finishing the loop.',
    brief: 'You get a list of numbers A. Return True if some value appears at least twice, otherwise False. The values can be any size. A can be empty. A has up to 100,000 numbers.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1, 2, 3, 1])', out: 'True' },
      { in: 'solution([1, 2, 3])', out: 'False' }
    ],
    tests: [
      { call: 'solution([1, 2, 3, 1])', expect: 'True' },
      { call: 'solution([1, 2, 3])', expect: 'False' },
      { call: 'solution([4])', expect: 'False', name: 'one element' },
      { call: 'solution([])', expect: 'False', name: 'empty' },
      { call: 'solution([2, 2])', expect: 'True', name: 'two equal' },
      { call: 'solution([1000000000, 5, 1000000000])', expect: 'True', name: 'huge values' },
      { call: 'solution(list(range(100000)))', expect: 'False', name: 'big input, no repeat', hidden: true },
      { call: 'solution(list(range(100000)) + [0])', expect: 'True', name: 'big input, repeat at the end', hidden: true }
    ],
    hint: 'Keep a set of values seen so far; if the next value is already in it, return True.',
    solution: 'def solution(A):\n    seen = set()\n    for v in A:\n        if v in seen:\n            return True\n        seen.add(v)\n    return False\n',
    walk: 'Walk along A. Before adding v to seen, ask whether it is already there. If yes, you have found a repeat and return True at once. If the loop finishes without that happening, return False. A set answers v in seen in O(1), so the whole thing is O(N). With a list instead of a set it would be O(N*N) and the big test would time out.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 06 */
  { topic: 'count',
    id: 'count-06',
    title: 'Where is the first repeat?',
    idea: 'enumerate(A) gives you the index and the value together, so you can return the position instead of just True.',
    brief: 'You get a list of numbers A. Return the index of the first element whose value has already appeared earlier in the list. If no value repeats, return -1. In [1, 2, 3, 2, 1] the answer is 3, because A[3] = 2 was already seen at index 1. A can be empty. A has up to 100,000 numbers.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # seen set, as before, but return the index\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1, 2, 3, 2, 1])', out: '3' },
      { in: 'solution([1, 2, 3])', out: '-1' }
    ],
    tests: [
      { call: 'solution([1, 2, 3, 2, 1])', expect: '3' },
      { call: 'solution([1, 2, 3])', expect: '-1', name: 'no repeat' },
      { call: 'solution([1, 1])', expect: '1', name: 'repeat at index 1' },
      { call: 'solution([9])', expect: '-1', name: 'one element' },
      { call: 'solution([])', expect: '-1', name: 'empty' },
      { call: 'solution([5, 5, 5])', expect: '1', name: 'first repeat, not the last' },
      { call: 'solution(list(range(100000)))', expect: '-1', name: 'big input, no repeat', hidden: true },
      { call: 'solution(list(range(100000)) + [0])', expect: '100000', name: 'big input, repeat at the end', hidden: true }
    ],
    hint: 'for k, v in enumerate(A) gives the index k and the value v; return k when v is already in seen.',
    solution: 'def solution(A):\n    seen = set()\n    for k, v in enumerate(A):\n        if v in seen:\n            return k\n        seen.add(v)\n    return -1\n',
    walk: 'Same loop as the last lesson, but enumerate hands you k (the index) next to v (the value). When v is already in seen, k is the position of the first repeat, so return k. If you reach the end, return -1. Returning early means you stop at the first repeat, which is what the task asks for.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 07 */
  { topic: 'count',
    id: 'count-07',
    title: 'When have we seen all of 1..X?',
    idea: 'A set never stores a value twice, so len(seen) is the number of different values met so far. When it reaches X, every number 1..X has appeared.',
    brief: 'You get a number X and a list A whose values are all between 1 and X. Return the first index k such that every number from 1 to X appears somewhere in A[0..k]. If that never happens, return -1. In X = 3, A = [1, 3, 1, 2, 3] the answer is 3: after index 3 we have seen 1, 3 and 2. A can be empty. X and the length of A are up to 100,000.',
    fn: 'solution',
    sig: 'def solution(X, A)',
    starter: 'def solution(X, A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(3, [1, 3, 1, 2, 3])', out: '3' },
      { in: 'solution(2, [1, 1, 1])', out: '-1' }
    ],
    tests: [
      { call: 'solution(3, [1, 3, 1, 2, 3])', expect: '3' },
      { call: 'solution(2, [1, 1, 1])', expect: '-1', name: 'never complete' },
      { call: 'solution(1, [1])', expect: '0', name: 'one element' },
      { call: 'solution(2, [])', expect: '-1', name: 'empty' },
      { call: 'solution(3, [3, 2, 1, 1])', expect: '2', name: 'complete before the end' },
      { call: 'solution(100000, list(range(1, 100001)))', expect: '99999', name: 'big input', hidden: true },
      { call: 'solution(100000, [1] * 100000)', expect: '-1', name: 'big input, never complete', hidden: true }
    ],
    hint: 'Add each value to a set and check len(seen) == X after each add.',
    solution: 'def solution(X, A):\n    seen = set()\n    for k, v in enumerate(A):\n        seen.add(v)\n        if len(seen) == X:\n            return k\n    return -1\n',
    walk: 'Add every value to seen. Repeats change nothing, so the size of the set only grows when a new number arrives. Because all values are between 1 and X, there are at most X different ones, and len(seen) == X means all of 1..X are present. The first k where that is true is the answer. O(N), one pass.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 08 */
  { topic: 'count',
    id: 'count-08',
    title: 'FrogRiverOne',
    idea: 'Nothing new in the code. The new skill is reading a story and seeing the task you already solved: river positions are the numbers 1..X, seconds are the indexes of A, and "the frog can cross" means every number has appeared. Codility tasks are usually a story wrapped around a simple pattern.',
    brief: 'This is the real Codility task. A frog sits on a river bank at position 0 and wants to reach the other bank at position X+1. Leaves fall on the river: at second k a leaf lands on position A[k] (A[k] is between 1 and X). The frog can cross only when every position from 1 to X has a leaf. Return the earliest second when the frog can cross, or -1 if it never can. N (the length of A) and X are up to 100,000.',
    fn: 'solution',
    sig: 'def solution(X, A)',
    starter: 'def solution(X, A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(5, [1, 3, 1, 4, 2, 3, 5, 4])', out: '6' }
    ],
    setup: 'BIG = list(range(1, 100001))\nBIGLATE = [1] * 50000 + list(range(1, 100001))\nBIGNEVER = [2] * 100000\n',
    tests: [
      { call: 'solution(5, [1, 3, 1, 4, 2, 3, 5, 4])', expect: '6' },
      { call: 'solution(5, [1, 3, 1, 4, 2, 3, 4])', expect: '-1', name: 'never crosses' },
      { call: 'solution(1, [1])', expect: '0', name: 'X = 1, one leaf' },
      { call: 'solution(2, [2, 2, 2, 1])', expect: '3', name: 'last leaf completes it' },
      { call: 'solution(3, [1, 2, 3])', expect: '2', name: 'exactly one leaf per position' },
      { call: 'solution(100000, BIG)', expect: '99999', name: 'big input', hidden: true },
      { call: 'solution(100000, BIGLATE)', expect: '149999', name: 'big input, slow start', hidden: true },
      { call: 'solution(3, BIGNEVER)', expect: '-1', name: 'big input, never crosses', hidden: true }
    ],
    hint: 'This is exactly the last lesson: positions are values, seconds are indexes.',
    solution: 'def solution(X, A):\n    seen = set()\n    for k, v in enumerate(A):\n        seen.add(v)\n        if len(seen) == X:\n            return k\n    return -1\n',
    walk: 'Each second k drops a leaf on position A[k]; add that position to seen. The frog needs all X positions, which is the same as len(seen) == X. The first second where that holds is the answer, and -1 if the loop ends first. In the example, after seconds 0..6 the set is {1, 3, 4, 2, 5}, size 5, so the answer is 6. One pass, O(N).',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 09 */
  { topic: 'count',
    id: 'count-09',
    title: 'Is it a permutation? (sorting version)',
    idea: 'A permutation of 1..N is the numbers 1 to N, each exactly once, in any order. The simplest check: sort A and compare it with list(range(1, N + 1)).',
    brief: 'You get a non-empty list A of N whole numbers. Return 1 if A is a permutation of 1..N (every number from 1 to N appears exactly once), otherwise return 0. Codility wants the numbers 1 and 0 here, not True and False. N is up to 100,000, values are up to 1,000,000,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([4, 1, 3, 2])', out: '1' },
      { in: 'solution([4, 1, 3])', out: '0' }
    ],
    tests: [
      { call: 'solution([4, 1, 3, 2])', expect: '1' },
      { call: 'solution([4, 1, 3])', expect: '0', name: 'missing 2' },
      { call: 'solution([1])', expect: '1', name: 'one element' },
      { call: 'solution([2])', expect: '0', name: 'one element, wrong value' },
      { call: 'solution([1, 1])', expect: '0', name: 'duplicate' },
      { call: 'solution([1, 2, 1000000000])', expect: '0', name: 'huge value' },
      { call: 'solution(list(range(100000, 0, -1)))', expect: '1', name: 'big input', hidden: true },
      { call: 'solution([1] * 100000)', expect: '0', name: 'big input, all ones', hidden: true }
    ],
    hint: 'Sorted, a permutation of 1..N must look exactly like [1, 2, ..., N].',
    solution: 'def solution(A):\n    N = len(A)\n    if sorted(A) == list(range(1, N + 1)):\n        return 1\n    return 0\n',
    walk: 'If A really contains 1..N once each, sorting it must give [1, 2, ..., N]. If anything is missing, repeated or too big, the sorted list differs somewhere, and the comparison fails. sorted() costs O(N log N), which is fast enough for 100,000 items. The next lesson does the same check without sorting.',
    complexity: 'O(N log N)' },

  /* ---------------------------------------------------------------- 10 */
  { topic: 'count',
    id: 'count-10',
    title: 'PermCheck in one pass',
    idea: 'You do not need to sort. N values that are all between 1 and N with no repeats must be exactly 1..N. A seen set catches the repeats, and a range check catches the bad values.',
    brief: 'This is the real Codility task PermCheck. You get a non-empty list A of N whole numbers. Return 1 if A is a permutation of 1..N, otherwise 0. Solve it in O(N) with a seen set: if a value is below 1, above N, or already seen, return 0 at once. N is up to 100,000, values are up to 1,000,000,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # N = len(A); a value is bad if it is < 1, > N, or already seen\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([4, 1, 3, 2])', out: '1' },
      { in: 'solution([4, 1, 3])', out: '0' }
    ],
    tests: [
      { call: 'solution([4, 1, 3, 2])', expect: '1' },
      { call: 'solution([4, 1, 3])', expect: '0', name: 'missing 2' },
      { call: 'solution([1])', expect: '1', name: 'one element' },
      { call: 'solution([2])', expect: '0', name: 'one element, wrong value' },
      { call: 'solution([1, 1])', expect: '0', name: 'duplicate' },
      { call: 'solution([0, 1, 2])', expect: '0', name: 'zero is not allowed' },
      { call: 'solution([3, 2, 1000000000])', expect: '0', name: 'huge value' },
      { call: 'solution(list(range(100000, 0, -1)))', expect: '1', name: 'big input', hidden: true },
      { call: 'solution(list(range(1, 100000)) + [1])', expect: '0', name: 'big input, repeat at the end', hidden: true }
    ],
    hint: 'Loop once; return 0 when v is out of range or in seen, else add it; return 1 at the end.',
    solution: 'def solution(A):\n    N = len(A)\n    seen = set()\n    for v in A:\n        if v < 1 or v > N or v in seen:\n            return 0\n        seen.add(v)\n    return 1\n',
    walk: 'There are N slots and N allowed values (1..N). If every value is allowed and none repeats, the N values must fill all N slots, so A is a permutation. The loop checks exactly those two things and stops at the first problem. Set lookups are O(1), so the whole check is O(N) and needs no sorting.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 11 */
  { topic: 'count',
    id: 'count-11',
    title: 'Smallest missing positive (first version)',
    idea: 'Put A into a set, then count up from 1 with a while loop: the first number that is not in the set is the answer.',
    brief: 'You get a list A of whole numbers, all 1 or larger. Return the smallest positive whole number (1, 2, 3, ...) that does not appear in A. For [1, 2, 4] the answer is 3. For [2, 3] the answer is 1. For an empty list the answer is 1. A has up to 100,000 numbers.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1, 2, 4])', out: '3' },
      { in: 'solution([2, 3])', out: '1' }
    ],
    setup: 'BIG = list(range(1, 100001))\nBIGHOLE = [v for v in range(1, 100001) if v != 777]\n',
    tests: [
      { call: 'solution([1, 2, 4])', expect: '3' },
      { call: 'solution([2, 3])', expect: '1', name: '1 is missing' },
      { call: 'solution([1, 2, 3])', expect: '4', name: 'nothing missing inside' },
      { call: 'solution([1])', expect: '2', name: 'one element' },
      { call: 'solution([])', expect: '1', name: 'empty' },
      { call: 'solution([5, 1, 1, 3, 2])', expect: '4', name: 'with repeats' },
      { call: 'solution(BIG)', expect: '100001', name: 'big input', hidden: true },
      { call: 'solution(BIGHOLE)', expect: '777', name: 'big input with a hole', hidden: true }
    ],
    hint: 'present = set(A); k = 1; while k in present: k += 1.',
    solution: 'def solution(A):\n    present = set(A)\n    k = 1\n    while k in present:\n        k += 1\n    return k\n',
    walk: 'The set makes "is k present?" an O(1) question. Start at k = 1 and move up while k is present; the first k that is absent is the smallest missing positive. The loop can run at most N+1 times, because A holds only N numbers, so the total is O(N).',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 12 */
  { topic: 'count',
    id: 'count-12',
    title: 'MissingInteger',
    idea: 'Now A can hold negatives and values up to a million. Nothing changes: those values sit in the set and k never reaches them. The answer is never larger than N+1, so the while loop still stops after at most N+1 steps.',
    brief: 'This is the real Codility task MissingInteger. You get a non-empty list A of N whole numbers, which can be negative, zero or up to 1,000,000. Return the smallest positive whole number (greater than 0) that does not occur in A. For [1, 3, 6, 4, 1, 2] the answer is 5. For [-1, -3] the answer is 1. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # set + while loop counting up from 1, as before\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1, 3, 6, 4, 1, 2])', out: '5' },
      { in: 'solution([1, 2, 3])', out: '4' },
      { in: 'solution([-1, -3])', out: '1' }
    ],
    setup: 'BIG = list(range(1, 100001))\nBIGHOLE = [v for v in range(1, 100001) if v != 54321]\nBIGNEG = [-v for v in range(1, 100001)]\n',
    tests: [
      { call: 'solution([1, 3, 6, 4, 1, 2])', expect: '5' },
      { call: 'solution([1, 2, 3])', expect: '4', name: 'nothing missing inside' },
      { call: 'solution([-1, -3])', expect: '1', name: 'only negatives' },
      { call: 'solution([2])', expect: '1', name: 'one element' },
      { call: 'solution([1000000])', expect: '1', name: 'one huge value' },
      { call: 'solution([0, -5, 1, 2, 1000000])', expect: '3', name: 'mixed values' },
      { call: 'solution(BIG)', expect: '100001', name: 'big input', hidden: true },
      { call: 'solution(BIGHOLE)', expect: '54321', name: 'big input with a hole', hidden: true },
      { call: 'solution(BIGNEG)', expect: '1', name: 'big input, all negative', hidden: true }
    ],
    hint: 'The code from the last lesson already works; think about why negatives do no harm.',
    solution: 'def solution(A):\n    present = set(A)\n    k = 1\n    while k in present:\n        k += 1\n    return k\n',
    walk: 'Negative numbers and zero can never equal a positive k, so they never move the loop. A huge value like 1,000,000 only matters if every number 1..999,999 is also present, which cannot happen with 100,000 items. So the loop still stops by N+1 at the latest. The lesson: when the limits look scary, check whether they change the answer at all. Here they do not.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 13 */
  { topic: 'count',
    id: 'count-13',
    title: 'Counters warm-up',
    idea: 'A list of N counters, all starting at 0. The value v in A means "increase counter number v", and counter number v lives at index v-1.',
    brief: 'You get a number N and a list A whose values are all between 1 and N. Start with N counters, all 0. For each value v in A, increase counter v by 1 (that is counters[v-1]). Return the list of counters at the end. A can be empty. N and the length of A are up to 100,000.',
    fn: 'solution',
    sig: 'def solution(N, A)',
    starter: 'def solution(N, A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(5, [3, 4, 4, 1, 4])', out: '[1, 0, 1, 3, 0]' }
    ],
    setup: 'from collections import Counter\nBIG = [(i * i) % 100000 + 1 for i in range(100000)]\n_c = Counter(BIG)\nBIGEXP = [_c[v] for v in range(1, 100001)]\n',
    tests: [
      { call: 'solution(5, [3, 4, 4, 1, 4])', expect: '[1, 0, 1, 3, 0]' },
      { call: 'solution(1, [1, 1, 1])', expect: '[3]', name: 'one counter' },
      { call: 'solution(3, [])', expect: '[0, 0, 0]', name: 'empty' },
      { call: 'solution(2, [2])', expect: '[0, 1]', name: 'one element' },
      { call: 'solution(3, [3, 3, 1])', expect: '[1, 0, 2]', name: 'last counter' },
      { call: 'solution(100000, BIG)', expect: 'BIGEXP', name: 'big input', hidden: true }
    ],
    hint: 'counters = [0] * N, then counters[v - 1] += 1 for each v.',
    solution: 'def solution(N, A):\n    counters = [0] * N\n    for v in A:\n        counters[v - 1] += 1\n    return counters\n',
    walk: 'This is the counting list again with one shift: counters are numbered 1..N but list indexes are 0..N-1, so counter v is counters[v-1]. Forgetting the -1 is the classic mistake here. One pass over A, O(N + M) where M is the length of A.',
    complexity: 'O(N + M)' },

  /* ---------------------------------------------------------------- 14 */
  { topic: 'count',
    id: 'count-14',
    title: 'Add the max counter rule (naive)',
    idea: 'A second kind of operation: the value N+1 means "set every counter to the current maximum". The obvious way is to compute max(counters) and rebuild the whole list. It is correct, but it does N work per max operation, which will be too slow in the next lesson.',
    brief: 'You get a number N and a list A. Values 1..N mean "increase that counter by 1", as before. The value N+1 means "max counter": set every counter to the largest value any counter has right now. Return the counters at the end. This lesson only has small inputs; write the straightforward version. With N = 5 and A = [3, 4, 4, 6, 1, 4, 4] the answer is [3, 2, 2, 4, 2].',
    fn: 'solution',
    sig: 'def solution(N, A)',
    starter: 'def solution(N, A):\n    # if v == N + 1: set every counter to max(counters)\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(5, [3, 4, 4, 6, 1, 4, 4])', out: '[3, 2, 2, 4, 2]' }
    ],
    setup: 'MED = []\nfor i in range(500):\n    MED.append(i + 1)\n    MED.append(1001)\nMEDEXP = [500] * 1000\n',
    tests: [
      { call: 'solution(5, [3, 4, 4, 6, 1, 4, 4])', expect: '[3, 2, 2, 4, 2]' },
      { call: 'solution(5, [6, 6, 6])', expect: '[0, 0, 0, 0, 0]', name: 'only max operations' },
      { call: 'solution(3, [1, 2, 3, 1])', expect: '[2, 1, 1]', name: 'no max operations' },
      { call: 'solution(1, [1, 2, 1])', expect: '[2]', name: 'one counter' },
      { call: 'solution(2, [3, 1, 3])', expect: '[1, 1]', name: 'max at the end' },
      { call: 'solution(3, [2, 4])', expect: '[1, 1, 1]', name: 'max lifts the others' },
      { call: 'solution(1000, MED)', expect: 'MEDEXP', name: 'medium input, 500 max operations', hidden: true }
    ],
    hint: 'Inside the loop: if v == N + 1, find the max and make a new list of N copies of it; else add 1 to counters[v - 1].',
    solution: 'def solution(N, A):\n    counters = [0] * N\n    for v in A:\n        if v == N + 1:\n            top = max(counters)\n            counters = [top] * N\n        else:\n            counters[v - 1] += 1\n    return counters\n',
    walk: 'Two cases per value. Increase: add 1 at index v-1. Max counter: find the largest counter and replace the whole list with N copies of it. In the example, after 3, 4, 4 the counters are [0, 0, 1, 2, 0]; the 6 lifts everyone to 2; then 1, 4, 4 give [3, 2, 2, 4, 2]. Each max operation touches all N counters, so with M operations the worst case is O(N * M). Fine for small inputs, far too slow for 100,000 of each.',
    complexity: 'O(N * M) - too slow for the real limits' },

  /* ---------------------------------------------------------------- 15 */
  { topic: 'count',
    id: 'count-15',
    title: 'MaxCounters',
    idea: 'Lazy max. Instead of touching every counter on a max operation, remember two numbers: base, the floor every counter is at least, and cur_max, the largest counter so far. A max operation just sets base = cur_max. A counter is lifted to base only when you next touch it, and all of them at the very end.',
    brief: 'This is the real Codility task MaxCounters. You get N and a list A of M values. Values 1..N increase that counter by 1; the value N+1 sets every counter to the current maximum. Return the final counters. N and M are up to 100,000, and the big test alternates increase and max operations, so a plain loop that rebuilds the list on every max operation is far too slow. Use the lazy idea: keep base and cur_max, and only lift a counter when you touch it.',
    fn: 'solution',
    sig: 'def solution(N, A)',
    starter: 'def solution(N, A):\n    # base = floor every counter is at least; cur_max = biggest counter so far\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(5, [3, 4, 4, 6, 1, 4, 4])', out: '[3, 2, 2, 4, 2]' }
    ],
    setup: 'BIGN = 100000\nBIG = []\nfor i in range(50000):\n    BIG.append(i + 1)\n    BIG.append(BIGN + 1)\nBIGEXP = [50000] * BIGN\nBIG2 = BIG + [5]\nBIG2EXP = [50000] * BIGN\nBIG2EXP[4] = 50001\nBIGINC = list(range(1, BIGN + 1))\n',
    tests: [
      { call: 'solution(5, [3, 4, 4, 6, 1, 4, 4])', expect: '[3, 2, 2, 4, 2]' },
      { call: 'solution(5, [6, 6, 6])', expect: '[0, 0, 0, 0, 0]', name: 'only max operations' },
      { call: 'solution(3, [1, 2, 3, 1])', expect: '[2, 1, 1]', name: 'no max operations' },
      { call: 'solution(1, [1, 2, 1])', expect: '[2]', name: 'one counter' },
      { call: 'solution(2, [3, 1, 3])', expect: '[1, 1]', name: 'max at the end' },
      { call: 'solution(3, [1, 1, 4, 2, 4, 3])', expect: '[3, 3, 4]', name: 'two max operations' },
      { call: 'solution(BIGN, BIG)', expect: 'BIGEXP', name: 'big input, alternating max operations', hidden: true },
      { call: 'solution(BIGN, BIG2)', expect: 'BIG2EXP', name: 'big input, increase after the last max', hidden: true },
      { call: 'solution(BIGN, BIGINC)', expect: '[1] * BIGN', name: 'big input, no max operations', hidden: true }
    ],
    hint: 'On v == N + 1 only do base = cur_max; when increasing a counter, first raise it to base if it is below, then add 1 and update cur_max; at the end return max(c, base) for every counter.',
    solution: 'def solution(N, A):\n    counters = [0] * N\n    base = 0\n    cur_max = 0\n    for v in A:\n        if v == N + 1:\n            base = cur_max\n        else:\n            if counters[v - 1] < base:\n                counters[v - 1] = base\n            counters[v - 1] += 1\n            if counters[v - 1] > cur_max:\n                cur_max = counters[v - 1]\n    return [max(c, base) for c in counters]\n',
    walk: 'A max operation promises "every counter is now at least cur_max". Writing that promise down as base costs O(1) instead of O(N). When you later increase a counter, you first honour the promise (lift it to base if it is lower), then add 1, and keep cur_max up to date. Counters that were never touched again still owe the lift, so the last line applies max(c, base) to all of them once. Every operation is O(1) and the final pass is O(N), so the total is O(N + M).',
    complexity: 'O(N + M)' },

  /* ---------------------------------------------------------------- 16 */
  { topic: 'count',
    id: 'count-16',
    title: 'How many are below X?',
    idea: 'A counter variable: start at 0 and add 1 every time a condition is true. Here the condition is v < X.',
    brief: 'You get a list of numbers A and a number X. Return how many values in A are strictly smaller than X. The values can be negative. A can be empty. A has up to 100,000 numbers.',
    fn: 'solution',
    sig: 'def solution(A, X)',
    starter: 'def solution(A, X):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1, 5, 2, 8], 5)', out: '2' }
    ],
    tests: [
      { call: 'solution([1, 5, 2, 8], 5)', expect: '2' },
      { call: 'solution([], 3)', expect: '0', name: 'empty' },
      { call: 'solution([3], 3)', expect: '0', name: 'equal does not count' },
      { call: 'solution([3], 4)', expect: '1', name: 'one element' },
      { call: 'solution([-1, 0, 1], 1)', expect: '2', name: 'negatives' },
      { call: 'solution(list(range(100000)), 50000)', expect: '50000', name: 'big input', hidden: true },
      { call: 'solution(list(range(100000)), 0)', expect: '0', name: 'big input, none below', hidden: true }
    ],
    hint: 'below = 0, then below += 1 for every v with v < X.',
    solution: 'def solution(A, X):\n    below = 0\n    for v in A:\n        if v < X:\n            below += 1\n    return below\n',
    walk: 'Look at each value once and add 1 to below when it is smaller than X. Strictly smaller means a value equal to X is not counted. This is the simplest counting pattern, and it is the shape of many bigger tasks: a counter plus a condition inside a loop. O(N).',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 17 */
  { topic: 'count',
    id: 'count-17',
    title: 'Values that appear exactly once',
    idea: 'A dict can count values of any size, no M needed. count.get(v, 0) reads the current tally and gives 0 when v is new. Count first, then filter the tallies.',
    brief: 'You get a list of numbers A. Return how many different values appear exactly once in A. In [1, 2, 2, 3, 3, 3, 4] the values 1 and 4 appear once, so the answer is 2. The values can be any size. A can be empty. A has up to 100,000 numbers.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1, 2, 2, 3, 3, 3, 4])', out: '2' }
    ],
    tests: [
      { call: 'solution([1, 2, 2, 3, 3, 3, 4])', expect: '2' },
      { call: 'solution([])', expect: '0', name: 'empty' },
      { call: 'solution([7])', expect: '1', name: 'one element' },
      { call: 'solution([5, 5])', expect: '0', name: 'nothing unique' },
      { call: 'solution([1, 2, 3])', expect: '3', name: 'all unique' },
      { call: 'solution([1000000000, -5, 1000000000])', expect: '1', name: 'huge and negative values' },
      { call: 'solution(list(range(50000)) + list(range(25000)))', expect: '25000', name: 'big input', hidden: true },
      { call: 'solution(list(range(100000)))', expect: '100000', name: 'big input, all unique', hidden: true }
    ],
    hint: 'First loop: count[v] = count.get(v, 0) + 1. Second loop: add 1 for every tally equal to 1.',
    solution: 'def solution(A):\n    count = {}\n    for v in A:\n        count[v] = count.get(v, 0) + 1\n    ones = 0\n    for v in count:\n        if count[v] == 1:\n            ones += 1\n    return ones\n',
    walk: 'A counting list needs the values to be small, because the value is the index. A dict has no such limit: the value is the key. count.get(v, 0) + 1 is the one-line way to add 1 to a tally that may not exist yet. Then loop over the dict and count the tallies that equal 1. Two passes, O(N).',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 18 */
  { topic: 'count',
    id: 'count-18',
    title: 'Counting equal pairs',
    idea: 'You do not need to look at pairs one by one. If a value appears c times, it makes c * (c - 1) // 2 pairs. Count first, then add that formula for every value.',
    brief: 'You get a list of numbers A. Return the number of pairs of positions (i, j) with i < j and A[i] == A[j]. In [1, 2, 1, 2] the pairs are (0, 2) and (1, 3), so the answer is 2. A can be empty. A has up to 100,000 numbers, and the big test has very few different values, so checking every pair would be 5,000,000,000 steps.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # count with a dict first, then use c * (c - 1) // 2 per value\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1, 2, 1, 2])', out: '2' },
      { in: 'solution([1, 1, 1])', out: '3' }
    ],
    tests: [
      { call: 'solution([1, 2, 1, 2])', expect: '2' },
      { call: 'solution([1, 1, 1])', expect: '3', name: 'three of a kind' },
      { call: 'solution([1, 2, 3])', expect: '0', name: 'no pairs' },
      { call: 'solution([])', expect: '0', name: 'empty' },
      { call: 'solution([5])', expect: '0', name: 'one element' },
      { call: 'solution([4, 4])', expect: '1', name: 'one pair' },
      { call: 'solution([i % 3 for i in range(100000)])', expect: '33334 * 33333 // 2 + 2 * (33333 * 33332 // 2)', name: 'big input, three values', hidden: true },
      { call: 'solution([7] * 100000)', expect: '100000 * 99999 // 2', name: 'big input, one value', hidden: true }
    ],
    hint: 'Count each value with a dict, then sum c * (c - 1) // 2 over the tallies.',
    solution: 'def solution(A):\n    count = {}\n    for v in A:\n        count[v] = count.get(v, 0) + 1\n    pairs = 0\n    for c in count.values():\n        pairs += c * (c - 1) // 2\n    return pairs\n',
    walk: 'Take one value that appears c times. Each of those c positions can pair with any of the other c-1, which counts every pair twice (once from each side), so there are c * (c - 1) // 2 pairs. Different values never pair with each other, so you simply add this up over all values. Counting is O(N) and the formula is O(1) per value, so the total is O(N), however many pairs there are.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 19 */
  { topic: 'count',
    id: 'count-19',
    title: 'Most frequent value, huge values',
    idea: 'Lesson 4 used a counting list because the values were at most M. Now values go up to 1,000,000,000, and a list with a billion slots will not fit in memory. A dict only stores the values that actually occur, so use a dict and pick the best entry by hand, with the tie rule written out.',
    brief: 'You get a non-empty list A of whole numbers, each between 0 and 1,000,000,000. Return the value that appears most often. If several values tie, return the smallest of them. A has up to 100,000 numbers.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # dict count, then choose: more often wins; on a tie the smaller value wins\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1000000000, 7, 1000000000, 7])', out: '7' },
      { in: 'solution([3, 3, 1, 1, 2])', out: '1' }
    ],
    setup: 'BIG = [(i % 50000) * 20000 + 1 for i in range(100000)]\nBIG2 = BIG + [999980001]\n',
    tests: [
      { call: 'solution([1000000000, 7, 1000000000, 7])', expect: '7' },
      { call: 'solution([3, 3, 1, 1, 2])', expect: '1', name: 'tie, smallest wins' },
      { call: 'solution([5])', expect: '5', name: 'one element' },
      { call: 'solution([2, 1, 2])', expect: '2', name: 'clear winner' },
      { call: 'solution([1000000000])', expect: '1000000000', name: 'largest allowed value' },
      { call: 'solution([0, 0, 9])', expect: '0', name: 'zero can win' },
      { call: 'solution(BIG)', expect: '1', name: 'big input, all tied', hidden: true },
      { call: 'solution(BIG2)', expect: '999980001', name: 'big input, huge winner', hidden: true }
    ],
    hint: 'Keep best; replace it when count[v] is bigger, or equal with v smaller.',
    solution: 'def solution(A):\n    count = {}\n    for v in A:\n        count[v] = count.get(v, 0) + 1\n    best = None\n    for v in count:\n        if best is None or count[v] > count[best] or (count[v] == count[best] and v < best):\n            best = v\n    return best\n',
    walk: 'Count with a dict as in the last two lessons. Then walk through the keys and keep the best one so far: a key replaces best if its tally is higher, or if the tally is equal and the key is smaller. Starting best at None and accepting the first key handles the beginning. The dict has at most N keys, so both loops are O(N). Memory is the point here: a counting list sized by the largest value would be 1,000,000,001 slots; a dict uses at most 100,000.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 20 */
  { topic: 'count',
    id: 'count-20',
    title: 'Answering many count queries',
    idea: 'When you have many questions about the same list, do the counting once and then answer each question with one lookup. Precompute, then query in O(1).',
    brief: 'You get a number N, a list A whose values are all between 0 and N, and a list of queries Q. For each query value q, you must say how many times q appears in A. Return a list with one answer per query, in query order. Calling A.count(q) for every query would be O(N) per query; with 100,000 values and 100,000 queries that is 10,000,000,000 steps. Build the counting list once instead. A and Q can be empty. N, the length of A and the length of Q are up to 100,000.',
    fn: 'solution',
    sig: 'def solution(N, A, Q)',
    starter: 'def solution(N, A, Q):\n    # build the counting list once, then look up each query\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(3, [0, 1, 1, 3], [1, 2, 3, 0])', out: '[2, 0, 1, 1]' }
    ],
    setup: 'from collections import Counter\nBIGN = 100000\nBIG = [(i * 7) % (BIGN + 1) for i in range(100000)]\nBIGQ = list(range(100000))\n_c = Counter(BIG)\nBIGEXP = [_c[q] for q in BIGQ]\nBIGQ0 = [0] * 100000\n',
    tests: [
      { call: 'solution(3, [0, 1, 1, 3], [1, 2, 3, 0])', expect: '[2, 0, 1, 1]' },
      { call: 'solution(2, [], [0, 1, 2])', expect: '[0, 0, 0]', name: 'empty A' },
      { call: 'solution(1, [1, 1], [])', expect: '[]', name: 'no queries' },
      { call: 'solution(0, [0, 0, 0], [0])', expect: '[3]', name: 'N = 0' },
      { call: 'solution(2, [2], [2, 2, 2])', expect: '[1, 1, 1]', name: 'same query repeated' },
      { call: 'solution(BIGN, BIG, BIGQ)', expect: 'BIGEXP', name: 'big input', hidden: true },
      { call: 'solution(BIGN, BIG, BIGQ0)', expect: '[_c[0]] * 100000', name: 'big input, one query repeated', hidden: true }
    ],
    hint: 'count = [0] * (N + 1) filled once; then return [count[q] for q in Q].',
    solution: 'def solution(N, A, Q):\n    count = [0] * (N + 1)\n    for v in A:\n        count[v] += 1\n    return [count[q] for q in Q]\n',
    walk: 'The counting list from lesson 3 answers "how many times does q appear?" in one lookup, count[q]. So build it once (O(N)) and then each query costs O(1), giving O(N + Q) in total instead of O(N * Q). This precompute-then-query shape is the bridge to the next topic, prefix sums, where the precomputed list answers range questions in the same way.',
    complexity: 'O(N + Q)' }

  );
})();
