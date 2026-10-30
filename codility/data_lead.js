/* Codility trainer — topic "lead": Leader & max slice.
   Ladder: count -> more than half -> dict counts -> most common -> leader
   -> Boyer-Moore candidate -> verified leader -> Dominator -> EquiLeader
   -> min so far -> MaxProfit -> Kadane -> MaxSliceSum -> best slice indices
   -> length at least 2 -> MaxDoubleSliceSum -> max slice of length at most K. */
(function () {
  window.CODILITY = window.CODILITY || [];
  window.CODILITY.push(

  { topic: 'lead',
    id: 'lead-01',
    title: 'Count how often X appears',
    idea: 'Walk through the list once and add 1 to a counter each time you see X. This is the smallest building block of every leader task.',
    brief: 'You get a list A and a value X. Return how many times X appears in A. A can be empty. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A, X)',
    starter: 'def solution(A, X):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 4, 3, 2, 3, -1, 3, 3], 3)', out: '5' },
      { in: 'solution([1, 2], 7)', out: '0' }
    ],
    tests: [
      { call: 'solution([3, 4, 3, 2, 3, -1, 3, 3], 3)', expect: '5' },
      { call: 'solution([1, 2], 7)', expect: '0', name: 'not there' },
      { call: 'solution([7], 7)', expect: '1', name: 'one element' },
      { call: 'solution([], 7)', expect: '0', name: 'empty', hidden: true },
      { call: 'solution([-1, -1, 0], -1)', expect: '2', name: 'negative values' },
      { call: 'solution(BIG, 1)', expect: '33333', name: 'big input', hidden: true }
    ],
    setup: 'BIG = [i % 3 for i in range(100000)]\n',
    hint: 'Start a counter at 0 and add 1 inside the loop when the element equals X.',
    solution: 'def solution(A, X):\n    count = 0\n    for v in A:\n        if v == X:\n            count += 1\n    return count\n',
    walk: 'The loop looks at every element once. When the element equals X we add one to the counter. At the end the counter is the answer. (Python also has A.count(X), which does exactly this.)',
    complexity: 'O(N)' },

  { topic: 'lead',
    id: 'lead-02',
    title: 'Does X appear more than half the time?',
    idea: 'New: compare the count with half the length. "More than half" is strict: with 8 elements you need at least 5, and 4 out of 8 is not enough. In code: count > len(A) // 2.',
    brief: 'You get a list A and a value X. Return True if X appears MORE than half the time, otherwise False. For an empty list return False. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A, X)',
    starter: 'def solution(A, X):\n    # count X as in the last lesson, then compare\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 4, 3, 2, 3, -1, 3, 3], 3)', out: 'True' },
      { in: 'solution([1, 2], 1)', out: 'False' }
    ],
    tests: [
      { call: 'solution([3, 4, 3, 2, 3, -1, 3, 3], 3)', expect: 'True' },
      { call: 'solution([1, 2], 1)', expect: 'False', name: 'exactly half is not enough' },
      { call: 'solution([1, 1, 2], 1)', expect: 'True', name: '2 of 3' },
      { call: 'solution([5], 5)', expect: 'True', name: 'one element' },
      { call: 'solution([], 5)', expect: 'False', name: 'empty', hidden: true },
      { call: 'solution(BIG_YES, 5)', expect: 'True', name: 'big input', hidden: true },
      { call: 'solution(BIG_NO, 5)', expect: 'False', name: 'big input, exactly half', hidden: true }
    ],
    setup: 'BIG_YES = [5] * 50001 + [6] * 49999\nBIG_NO = [5] * 50000 + [6] * 50000\n',
    hint: 'Count X the way you did before, then return count > len(A) // 2.',
    solution: 'def solution(A, X):\n    count = 0\n    for v in A:\n        if v == X:\n            count += 1\n    return count > len(A) // 2\n',
    walk: 'len(A) // 2 is half the length rounded down. For 8 elements it is 4, so count must be at least 5. For 3 elements it is 1, so count must be at least 2. The strict > is the whole point: exactly half does not count. Remember this test, it defines a leader.',
    complexity: 'O(N)' },

  { topic: 'lead',
    id: 'lead-03',
    title: 'Count every value at once',
    idea: 'New: a dict as a counter. Instead of counting one value X, keep counts[v] for every value v you meet. counts.get(v, 0) gives 0 the first time you see v.',
    brief: 'You get a list A. Return a dict that maps each value in A to how many times it appears. For an empty list return an empty dict. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1, 2, 1])', out: '{1: 2, 2: 1}' },
      { in: 'solution([])', out: '{}' }
    ],
    tests: [
      { call: 'solution([1, 2, 1])', expect: '{1: 2, 2: 1}' },
      { call: 'solution([3, 4, 3, 2, 3, -1, 3, 3])', expect: '{3: 5, 4: 1, 2: 1, -1: 1}', name: 'several values' },
      { call: 'solution([7])', expect: '{7: 1}', name: 'one element' },
      { call: 'solution([])', expect: '{}', name: 'empty', hidden: true },
      { call: 'solution([2, 2, 2])', expect: '{2: 3}', name: 'all the same' },
      { call: 'solution(BIG)', expect: 'BIG_COUNTS', name: 'big input', hidden: true }
    ],
    setup: 'import collections\nBIG = [i % 100 for i in range(100000)]\nBIG_COUNTS = dict(collections.Counter(BIG))\n',
    hint: 'counts[v] = counts.get(v, 0) + 1 inside the loop.',
    solution: 'def solution(A):\n    counts = {}\n    for v in A:\n        counts[v] = counts.get(v, 0) + 1\n    return counts\n',
    walk: 'A dict lets you keep one counter per value. counts.get(v, 0) reads the current count, or 0 if v is new, and we store the count plus one. One pass over A fills every counter. The standard library has collections.Counter, which does the same thing.',
    complexity: 'O(N)' },

  { topic: 'lead',
    id: 'lead-04',
    title: 'The most common value',
    idea: 'New: read the answer out of the dict. Loop over the pairs (value, count) and keep the best one. On a tie, keep the smaller value.',
    brief: 'You get a non-empty list A. Return the value that appears most often. If two values appear equally often, return the smaller one. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # build the dict of counts first\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1, 2, 2, 3])', out: '2' },
      { in: 'solution([1, 2])', out: '1' }
    ],
    tests: [
      { call: 'solution([1, 2, 2, 3])', expect: '2' },
      { call: 'solution([1, 2])', expect: '1', name: 'tie, smaller wins' },
      { call: 'solution([5])', expect: '5', name: 'one element' },
      { call: 'solution([3, 3, 1, 1, 2])', expect: '1', name: 'tie not in first place' },
      { call: 'solution([-4, 9, -4])', expect: '-4', name: 'negative value' },
      { call: 'solution(BIG)', expect: '42', name: 'big input', hidden: true },
      { call: 'solution(BIG_TIE)', expect: '0', name: 'big input, all tied', hidden: true }
    ],
    setup: 'BIG = [i % 100 for i in range(100000)] + [42]\nBIG_TIE = [i % 100 for i in range(100000)]\n',
    hint: 'Keep best_value and best_count; replace them when a count is bigger, or equal with a smaller value.',
    solution: 'def solution(A):\n    counts = {}\n    for v in A:\n        counts[v] = counts.get(v, 0) + 1\n    best_value = None\n    best_count = 0\n    for v, c in counts.items():\n        if c > best_count or (c == best_count and v < best_value):\n            best_value = v\n            best_count = c\n    return best_value\n',
    walk: 'First build the counts as before. Then one more loop over counts.items() finds the pair with the largest count. The extra condition (c == best_count and v < best_value) handles ties by preferring the smaller value. Two passes, each linear, is still O(N).',
    complexity: 'O(N)' },

  { topic: 'lead',
    id: 'lead-05',
    title: 'The leader, using the dict',
    idea: 'New: a leader is a value that appears more than N // 2 times (lesson 2). At most one value can do that. Check the most common value against that bar, or return -1.',
    brief: 'You get a list A. Return the leader: the value that appears more than len(A) // 2 times. If there is no leader, return -1. An empty list has no leader. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # count with a dict, then test count > len(A) // 2\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 4, 3, 2, 3, -1, 3, 3])', out: '3' },
      { in: 'solution([1, 2])', out: '-1' }
    ],
    tests: [
      { call: 'solution([3, 4, 3, 2, 3, -1, 3, 3])', expect: '3' },
      { call: 'solution([1, 2])', expect: '-1', name: 'no leader' },
      { call: 'solution([1])', expect: '1', name: 'one element' },
      { call: 'solution([])', expect: '-1', name: 'empty', hidden: true },
      { call: 'solution([2, 2, 1, 1])', expect: '-1', name: 'exactly half' },
      { call: 'solution([-2, -2, 5])', expect: '-2', name: 'leader is negative', hidden: true },
      { call: 'solution(BIG_YES)', expect: '7', name: 'big input', hidden: true },
      { call: 'solution(BIG_NO)', expect: '-1', name: 'big input, no leader', hidden: true }
    ],
    setup: 'BIG_YES = [7 if i % 3 else i for i in range(100000)]\nBIG_NO = list(range(100000))\n',
    hint: 'Any value whose count is more than len(A) // 2 is the leader; if the loop over counts finds none, return -1.',
    solution: 'def solution(A):\n    counts = {}\n    for v in A:\n        counts[v] = counts.get(v, 0) + 1\n    for v, c in counts.items():\n        if c > len(A) // 2:\n            return v\n    return -1\n',
    walk: 'Two values cannot both appear more than half the time, so the first value whose count passes the bar is the only answer. If no value passes, there is no leader and we return -1. This works and is O(N), but it needs a dict with up to N entries. The next lessons do it with two variables.',
    complexity: 'O(N) time, O(N) memory' },

  { topic: 'lead',
    id: 'lead-06',
    title: 'The stack-size trick (one candidate)',
    idea: 'New: find a leader candidate with two variables instead of a dict. Keep a candidate and a size. Same value as the candidate: size + 1. Different value: size - 1. Size 0: the next value becomes the new candidate.',
    brief: 'You get a list A that is known to have a leader. Return the leader using only a candidate and a size, no dict. If A is empty return -1. (Warning: if A has no leader, this trick can return a wrong value. The next lesson fixes that.) N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # candidate = -1, size = 0, then one loop\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 4, 3, 2, 3, -1, 3, 3])', out: '3' },
      { in: 'solution([2, 2, 1])', out: '2' }
    ],
    tests: [
      { call: 'solution([3, 4, 3, 2, 3, -1, 3, 3])', expect: '3' },
      { call: 'solution([2, 2, 1])', expect: '2', name: 'leader first' },
      { call: 'solution([1, 2, 1, 2, 1])', expect: '1', name: 'alternating' },
      { call: 'solution([1])', expect: '1', name: 'one element' },
      { call: 'solution([])', expect: '-1', name: 'empty', hidden: true },
      { call: 'solution([5, 6, 7, 5, 5])', expect: '5', name: 'candidate changes twice' },
      { call: 'solution(BIG)', expect: '7', name: 'big input', hidden: true },
      { call: 'solution(BIG_MIX)', expect: '7', name: 'big input, alternating', hidden: true }
    ],
    setup: 'BIG = [7 if i % 3 else i for i in range(100000)]\nBIG_MIX = [1, 7] * 33333 + [7]\n',
    hint: 'Three cases in the loop: size == 0 (take v as candidate, size = 1), v == candidate (size += 1), else (size -= 1).',
    solution: 'def solution(A):\n    candidate = -1\n    size = 0\n    for v in A:\n        if size == 0:\n            candidate = v\n            size = 1\n        elif v == candidate:\n            size += 1\n        else:\n            size -= 1\n    return candidate\n',
    walk: 'Think of a stack: push a value if it matches the top, otherwise pop one. Each pop removes two different values. The leader has more copies than all other values together, so it can never be fully removed and survives as the final candidate. If there is no leader, whatever is left is just a guess, which is why the next lesson checks it.',
    complexity: 'O(N) time, O(1) memory' },

  { topic: 'lead',
    id: 'lead-07',
    title: 'Verify the candidate',
    idea: 'New: after the stack-size trick, count the candidate for real. Return it only if its count is more than N // 2, otherwise -1. Now the answer is always right, in O(N) time and O(1) extra memory.',
    brief: 'You get a list A. Return its leader or -1 if there is none. Use the candidate trick from the last lesson, then check the candidate with a real count. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # 1. find the candidate  2. count it  3. compare with len(A) // 2\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 4, 3, 2, 3, -1, 3, 3])', out: '3' },
      { in: 'solution([1, 2, 3])', out: '-1' }
    ],
    tests: [
      { call: 'solution([3, 4, 3, 2, 3, -1, 3, 3])', expect: '3' },
      { call: 'solution([1, 2, 3])', expect: '-1', name: 'no leader' },
      { call: 'solution([1, 2])', expect: '-1', name: 'exactly half' },
      { call: 'solution([2, 2, 1, 1])', expect: '-1', name: 'candidate is wrong' },
      { call: 'solution([1])', expect: '1', name: 'one element' },
      { call: 'solution([])', expect: '-1', name: 'empty', hidden: true },
      { call: 'solution(BIG)', expect: '7', name: 'big input', hidden: true },
      { call: 'solution(BIG_NO)', expect: '-1', name: 'big input, no leader', hidden: true },
      { call: 'solution(BIG_HALF)', expect: '-1', name: 'big input, exactly half', hidden: true }
    ],
    setup: 'BIG = [7 if i % 3 else i for i in range(100000)]\nBIG_NO = list(range(100000))\nBIG_HALF = [1, 2] * 50000\n',
    hint: 'After the loop, count how many times candidate appears (A.count(candidate) is fine) and compare with len(A) // 2.',
    solution: 'def solution(A):\n    candidate = -1\n    size = 0\n    for v in A:\n        if size == 0:\n            candidate = v\n            size = 1\n        elif v == candidate:\n            size += 1\n        else:\n            size -= 1\n    if A.count(candidate) > len(A) // 2:\n        return candidate\n    return -1\n',
    walk: 'If a leader exists, the trick finds it, so counting the candidate confirms it. If no leader exists, the candidate fails the count and we return -1. Two linear passes and two variables: this is the complete leader algorithm that Codility expects.',
    complexity: 'O(N) time, O(1) memory' },

  { topic: 'lead',
    id: 'lead-08',
    title: 'Dominator (Codility)',
    idea: 'New: return an index of the leader, not its value. After verifying the candidate, any position where A[i] == candidate is a correct answer.',
    brief: 'Codility task Dominator. The dominator of A is the value that appears in more than half of the elements. Return the index of ANY element that holds the dominator, or -1 if there is none. The checker accepts any valid index. N is from 0 to 100,000 and values are 32-bit integers.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # find and verify the candidate, then return a position of it\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 4, 3, 2, 3, -1, 3, 3]) in {0, 2, 4, 6, 7}', out: 'True' },
      { in: 'solution([1, 2])', out: '-1' }
    ],
    tests: [
      { call: 'solution([3, 4, 3, 2, 3, -1, 3, 3]) in {0, 2, 4, 6, 7}', expect: 'True', name: 'any index of 3' },
      { call: 'solution([])', expect: '-1', name: 'empty' },
      { call: 'solution([1])', expect: '0', name: 'one element' },
      { call: 'solution([1, 2])', expect: '-1', name: 'no dominator' },
      { call: 'solution([2, 1, 1]) in {1, 2}', expect: 'True', name: 'dominator at the end' },
      { call: 'solution([2147483647, -2147483648, 2147483647]) in {0, 2}', expect: 'True', name: 'extreme values', hidden: true },
      { call: 'solution(BIG) in BIG_IDX', expect: 'True', name: 'big input', hidden: true },
      { call: 'solution(BIG_NO)', expect: '-1', name: 'big input, no dominator', hidden: true }
    ],
    setup: 'BIG = [7 if i % 3 else i for i in range(100000)]\nBIG_IDX = set(i for i, v in enumerate(BIG) if v == 7)\nBIG_NO = list(range(100000))\n',
    hint: 'Once the candidate passes the count, A.index(candidate) is one valid position.',
    solution: 'def solution(A):\n    candidate = -1\n    size = 0\n    for v in A:\n        if size == 0:\n            candidate = v\n            size = 1\n        elif v == candidate:\n            size += 1\n        else:\n            size -= 1\n    if A.count(candidate) > len(A) // 2:\n        return A.index(candidate)\n    return -1\n',
    walk: 'This is lesson 7 with a different last line. A.index(candidate) returns the first position of the dominator, which is one of the accepted answers. The empty list falls out naturally: the count 0 is not more than 0, so we return -1.',
    complexity: 'O(N) time, O(1) memory' },

  { topic: 'lead',
    id: 'lead-09',
    title: 'Leaders to the left of each split',
    idea: 'New: a running count. For each position i, how many copies of the leader L are in A[0..i]? Append the running count to a list as you go.',
    brief: 'You get a list A and a value L (the leader). Return a list where position i holds how many times L appears in A[0..i] (both ends included). The result has the same length as A. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A, L)',
    starter: 'def solution(A, L):\n    # keep a counter and append it after each element\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([4, 3, 4, 4, 4, 2], 4)', out: '[1, 1, 2, 3, 4, 4]' }
    ],
    tests: [
      { call: 'solution([4, 3, 4, 4, 4, 2], 4)', expect: '[1, 1, 2, 3, 4, 4]' },
      { call: 'solution([4], 4)', expect: '[1]', name: 'one element' },
      { call: 'solution([1, 2], 4)', expect: '[0, 0]', name: 'L never appears' },
      { call: 'solution([], 4)', expect: '[]', name: 'empty', hidden: true },
      { call: 'solution([4, 4, 4], 4)', expect: '[1, 2, 3]', name: 'all L' },
      { call: 'solution(BIG, 4)', expect: 'BIG_PREFIX', name: 'big input', hidden: true }
    ],
    setup: 'import itertools\nBIG = [4 if i % 3 else i for i in range(100000)]\nBIG_PREFIX = list(itertools.accumulate(1 if v == 4 else 0 for v in BIG))\n',
    hint: 'seen += 1 when v == L, then out.append(seen) on every step.',
    solution: 'def solution(A, L):\n    out = []\n    seen = 0\n    for v in A:\n        if v == L:\n            seen += 1\n        out.append(seen)\n    return out\n',
    walk: 'The counter seen grows only when the element is L, and we record it after every element. So out[i] is the number of leaders in the left part A[0..i]. The number in the right part A[i+1..] is then total - out[i]. That is all EquiLeader needs.',
    complexity: 'O(N)' },

  { topic: 'lead',
    id: 'lead-10',
    title: 'EquiLeader (Codility)',
    idea: 'New: combine the leader with the running count. Both halves of a split can only share the leader of the whole list. At split S, the left part has S + 1 elements and left_count leaders; the right part has N - S - 1 elements and total - left_count leaders. Count the splits where both parts pass the "more than half" test.',
    brief: 'Codility task EquiLeader. An equi leader is an index S (0 <= S < N - 1) such that A[0..S] and A[S+1..N-1] have the same leader. Return the number of equi leaders. N is from 1 to 100,000 and values are 32-bit integers.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # 1. leader of the whole list (or return 0)\n    # 2. walk the splits with a running count\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([4, 3, 4, 4, 4, 2])', out: '2' },
      { in: 'solution([1, 2])', out: '0' }
    ],
    tests: [
      { call: 'solution([4, 3, 4, 4, 4, 2])', expect: '2' },
      { call: 'solution([1, 2])', expect: '0', name: 'no leader' },
      { call: 'solution([4, 4])', expect: '1', name: 'two equal' },
      { call: 'solution([1])', expect: '0', name: 'one element' },
      { call: 'solution([1, 2, 1, 2])', expect: '0', name: 'exactly half' },
      { call: 'solution([1, 1, 1, 1, 1, 1])', expect: '5', name: 'all the same' },
      { call: 'solution([1, 2, 1, 1, 2, 1])', expect: '3', name: 'several splits' },
      { call: 'solution(BIG)', expect: 'BIG_EXP', name: 'big input', hidden: true },
      { call: 'solution(BIG_SAME)', expect: '99999', name: 'big input, all the same', hidden: true }
    ],
    setup: 'def _equi(A):\n    N = len(A)\n    counts = {}\n    for v in A:\n        counts[v] = counts.get(v, 0) + 1\n    leader = None\n    for v, c in counts.items():\n        if c > N // 2:\n            leader = v\n    if leader is None:\n        return 0\n    total = counts[leader]\n    out = 0\n    left = 0\n    for S in range(N):\n        if A[S] == leader:\n            left += 1\n        if left * 2 > S + 1 and (total - left) * 2 > N - S - 1:\n            out += 1\n    return out\nBIG = [4 if i % 3 else i for i in range(100000)]\nBIG_EXP = _equi(BIG)\nBIG_SAME = [1] * 100000\n',
    hint: 'If the whole list has no leader, answer 0; otherwise test each split with left > (S + 1) // 2 and total - left > (N - S - 1) // 2.',
    solution: 'def solution(A):\n    N = len(A)\n    candidate = -1\n    size = 0\n    for v in A:\n        if size == 0:\n            candidate = v\n            size = 1\n        elif v == candidate:\n            size += 1\n        else:\n            size -= 1\n    total = A.count(candidate)\n    if total <= N // 2:\n        return 0\n    equi = 0\n    left = 0\n    for S in range(N):\n        if A[S] == candidate:\n            left += 1\n        right = total - left\n        if left > (S + 1) // 2 and right > (N - S - 1) // 2:\n            equi += 1\n    return equi\n',
    walk: 'If both parts have the same leader, that value is also the leader of the whole list, so we only need to test one value. We find it with the candidate trick and count it. Then a single pass keeps the running count on the left; the right count is total minus that. A split counts when both parts pass the strict more-than-half test. Note S = N - 1 never counts because the right part is empty.',
    complexity: 'O(N) time, O(1) memory' },

  { topic: 'lead',
    id: 'lead-11',
    title: 'Minimum so far',
    idea: 'New topic: slices. Start with the smallest value seen so far. Keep min_so_far and update it at every step; record it in a list.',
    brief: 'You get a list A. Return a list where position i holds the smallest value in A[0..i]. The result has the same length as A. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([5, 3, 4, 1, 2])', out: '[5, 3, 3, 1, 1]' }
    ],
    tests: [
      { call: 'solution([5, 3, 4, 1, 2])', expect: '[5, 3, 3, 1, 1]' },
      { call: 'solution([7])', expect: '[7]', name: 'one element' },
      { call: 'solution([])', expect: '[]', name: 'empty', hidden: true },
      { call: 'solution([1, 2, 3])', expect: '[1, 1, 1]', name: 'rising' },
      { call: 'solution([3, 2, 1])', expect: '[3, 2, 1]', name: 'falling' },
      { call: 'solution([-1, 0, -2])', expect: '[-1, -1, -2]', name: 'negative values' },
      { call: 'solution(BIG)', expect: 'BIG_EXP', name: 'big input', hidden: true }
    ],
    setup: 'import itertools\nBIG = [(i * 7919) % 100003 for i in range(100000)]\nBIG_EXP = list(itertools.accumulate(BIG, min))\n',
    hint: 'Start min_so_far at A[0] and use min_so_far = min(min_so_far, v) on every element.',
    solution: 'def solution(A):\n    out = []\n    min_so_far = None\n    for v in A:\n        if min_so_far is None or v < min_so_far:\n            min_so_far = v\n        out.append(min_so_far)\n    return out\n',
    walk: 'min_so_far only ever goes down. After each element we append the current minimum, so out[i] is the smallest value up to and including i. The same pattern, "one value that summarises everything to the left", drives the buy-and-sell task next.',
    complexity: 'O(N)' },

  { topic: 'lead',
    id: 'lead-12',
    title: 'Best profit with min so far',
    idea: 'New: use min_so_far to answer a question. Selling on day i after buying on the cheapest earlier day gives A[i] - min_so_far. Keep the biggest of these. The answer may be negative if prices only fall.',
    brief: 'A holds a share price for each day, with at least 2 days. Buy on one day and sell on a later day. Return the best possible A[sell] - A[buy] with buy < sell. It may be negative. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # min_so_far is the cheapest EARLIER day\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([23171, 21011, 21123, 21366, 21013, 21367])', out: '356' },
      { in: 'solution([5, 4, 3])', out: '-1' }
    ],
    tests: [
      { call: 'solution([23171, 21011, 21123, 21366, 21013, 21367])', expect: '356' },
      { call: 'solution([5, 4, 3])', expect: '-1', name: 'prices only fall' },
      { call: 'solution([1, 2])', expect: '1', name: 'two days' },
      { call: 'solution([3, 3])', expect: '0', name: 'no change' },
      { call: 'solution([8, 1, 9])', expect: '8', name: 'buy after a drop' },
      { call: 'solution([9, 1, 5, 0, 2])', expect: '4', name: 'minimum moves after the best sale' },
      { call: 'solution(BIG)', expect: 'BIG_EXP', name: 'big input', hidden: true },
      { call: 'solution(BIG_DOWN)', expect: '-1', name: 'big input, falling', hidden: true }
    ],
    setup: 'def _profit(A):\n    m = A[0]\n    best = A[1] - A[0]\n    for v in A[1:]:\n        best = max(best, v - m)\n        m = min(m, v)\n    return best\nBIG = [(i * 7919) % 200001 for i in range(100000)]\nBIG_EXP = _profit(BIG)\nBIG_DOWN = list(range(100000, 0, -1))\n',
    hint: 'For each day from index 1 on: first compare A[i] - min_so_far with best, then update min_so_far.',
    solution: 'def solution(A):\n    min_so_far = A[0]\n    best = A[1] - A[0]\n    for i in range(1, len(A)):\n        best = max(best, A[i] - min_so_far)\n        min_so_far = min(min_so_far, A[i])\n    return best\n',
    walk: 'To sell on day i for the most money you buy on the cheapest day before i, and min_so_far is exactly that price. The order inside the loop matters: compute the profit first, then let today join min_so_far, so you never buy and sell on the same day. One pass, two variables.',
    complexity: 'O(N)' },

  { topic: 'lead',
    id: 'lead-13',
    title: 'MaxProfit (Codility)',
    idea: 'New: never lose money. If no sale makes a profit you simply do not trade, so the answer is at least 0. Start best at 0, and the empty and one-day cases come out as 0 by themselves.',
    brief: 'Codility task MaxProfit. A[i] is the price of a share on day i. Return the maximum profit from one buy followed by one later sell, or 0 if no profit is possible. N is from 0 to 400,000 and prices are from 0 to 200,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # like the last lesson, but best starts at 0\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([23171, 21011, 21123, 21366, 21013, 21367])', out: '356' },
      { in: 'solution([5, 4, 3])', out: '0' }
    ],
    tests: [
      { call: 'solution([23171, 21011, 21123, 21366, 21013, 21367])', expect: '356' },
      { call: 'solution([5, 4, 3])', expect: '0', name: 'prices only fall' },
      { call: 'solution([])', expect: '0', name: 'empty' },
      { call: 'solution([1])', expect: '0', name: 'one day' },
      { call: 'solution([0, 200000])', expect: '200000', name: 'extreme prices' },
      { call: 'solution([3, 3, 3])', expect: '0', name: 'flat' },
      { call: 'solution(BIG)', expect: 'BIG_EXP', name: 'big input', hidden: true },
      { call: 'solution(BIG_DOWN)', expect: '0', name: 'big input, falling', hidden: true }
    ],
    setup: 'def _profit(A):\n    m = A[0] if A else 0\n    best = 0\n    for v in A:\n        best = max(best, v - m)\n        m = min(m, v)\n    return best\nBIG = [(i * 7919) % 200001 for i in range(400000)]\nBIG_EXP = _profit(BIG)\nBIG_DOWN = list(range(400000, 0, -1))\n',
    hint: 'best = 0 before the loop; then the usual two lines per day.',
    solution: 'def solution(A):\n    best = 0\n    min_so_far = A[0] if A else 0\n    for price in A:\n        best = max(best, price - min_so_far)\n        min_so_far = min(min_so_far, price)\n    return best\n',
    walk: 'Starting best at 0 means a losing trade is never chosen. Starting min_so_far at A[0] makes day 0 give a profit of 0, which is harmless. With no days or one day the loop produces nothing better than 0, so no special case is needed. 400,000 days is fine because the loop is linear.',
    complexity: 'O(N)' },

  { topic: 'lead',
    id: 'lead-14',
    title: 'Best slice ending exactly here',
    idea: 'New: the key line of the max slice problem. The best slice that ends at i either starts at i (just A[i]) or extends the best slice that ended at i - 1: ending_here = max(A[i], ending_here + A[i]).',
    brief: 'You get a list A. For every position i, compute the largest sum of a slice that ends exactly at i (a slice is a run of one or more neighbouring elements). Return the list of these values. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # ending_here = max(A[i], ending_here + A[i])\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 2, -6, 4, 0])', out: '[3, 5, -1, 4, 4]' }
    ],
    tests: [
      { call: 'solution([3, 2, -6, 4, 0])', expect: '[3, 5, -1, 4, 4]' },
      { call: 'solution([-10])', expect: '[-10]', name: 'one element' },
      { call: 'solution([])', expect: '[]', name: 'empty', hidden: true },
      { call: 'solution([-2, -3, -1])', expect: '[-2, -3, -1]', name: 'all negative' },
      { call: 'solution([1, 2, 3])', expect: '[1, 3, 6]', name: 'all positive' },
      { call: 'solution([2, -5, 3])', expect: '[2, -3, 3]', name: 'restart after a drop' },
      { call: 'solution(BIG)', expect: 'BIG_EXP', name: 'big input', hidden: true }
    ],
    setup: 'import itertools\nBIG = [(i * 7919) % 21 - 10 for i in range(100000)]\nBIG_EXP = list(itertools.accumulate(BIG, lambda e, v: max(v, e + v)))\n',
    hint: 'Start with ending_here = 0; at each element set ending_here = max(v, ending_here + v) and append it.',
    solution: 'def solution(A):\n    out = []\n    ending_here = 0\n    for v in A:\n        ending_here = max(v, ending_here + v)\n        out.append(ending_here)\n    return out\n',
    walk: 'A slice ending at i is either just A[i] or A[i] glued to a slice ending at i - 1, and the best such glue is the best slice ending at i - 1. If that previous best is negative it only hurts, so max(v, ending_here + v) drops it and starts fresh. Starting ending_here at 0 makes the first step give A[0].',
    complexity: 'O(N)' },

  { topic: 'lead',
    id: 'lead-15',
    title: 'MaxSliceSum (Codility)',
    idea: 'New: the answer to the whole problem is the largest ending_here. Keep a running best instead of a list. This is the Kadane algorithm.',
    brief: 'Codility task MaxSliceSum. Return the largest sum of any non-empty slice of A. All values may be negative, in which case the answer is the largest single element. N is from 1 to 1,000,000 (we test 100,000) and values are from -1,000,000 to 1,000,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # keep ending_here and best\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 2, -6, 4, 0])', out: '5' },
      { in: 'solution([-2, -3, -1])', out: '-1' }
    ],
    tests: [
      { call: 'solution([3, 2, -6, 4, 0])', expect: '5' },
      { call: 'solution([-10])', expect: '-10', name: 'one element' },
      { call: 'solution([-2, -3, -1])', expect: '-1', name: 'all negative' },
      { call: 'solution([1, 2, 3])', expect: '6', name: 'whole list' },
      { call: 'solution([5, -1, 5])', expect: '9', name: 'worth crossing a dip' },
      { call: 'solution([-1000000, 1000000])', expect: '1000000', name: 'extreme values', hidden: true },
      { call: 'solution(BIG)', expect: 'BIG_EXP', name: 'big input', hidden: true },
      { call: 'solution(BIG_NEG)', expect: '-1', name: 'big input, all negative', hidden: true }
    ],
    setup: 'import itertools\nBIG = [(i * 7919) % 21 - 10 for i in range(100000)]\nBIG_EXP = max(itertools.accumulate(BIG, lambda e, v: max(v, e + v)))\nBIG_NEG = [-(i % 50) - 1 for i in range(100000)]\n',
    hint: 'Start best at A[0] (not 0), so an all-negative list still gives the right answer.',
    solution: 'def solution(A):\n    ending_here = A[0]\n    best = A[0]\n    for v in A[1:]:\n        ending_here = max(v, ending_here + v)\n        best = max(best, ending_here)\n    return best\n',
    walk: 'Every slice ends somewhere, so the best slice is the best "ending here" value over all positions. We keep the running maximum instead of the list. Start best at A[0], not at 0: with only negative numbers the right answer is negative and a 0 start would hide it.',
    complexity: 'O(N)' },

  { topic: 'lead',
    id: 'lead-16',
    title: 'Where is the best slice?',
    idea: 'New: remember positions as well as sums. Keep run_start, the index where the current ending_here run began; it moves to i whenever we start fresh. When best improves, record [run_start, i].',
    brief: 'You get a non-empty list A. Return [start, end] of the slice with the largest sum. If several slices tie, return the one that ends first; if they also end at the same place, the one that starts first. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # start fresh only when ending_here < 0; update best only when strictly better\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 2, -6, 4, 0])', out: '[0, 1]' },
      { in: 'solution([-2, -3, -1])', out: '[2, 2]' }
    ],
    tests: [
      { call: 'solution([3, 2, -6, 4, 0])', expect: '[0, 1]' },
      { call: 'solution([-10])', expect: '[0, 0]', name: 'one element' },
      { call: 'solution([-2, -3, -1])', expect: '[2, 2]', name: 'all negative' },
      { call: 'solution([1, 2, 3])', expect: '[0, 2]', name: 'whole list' },
      { call: 'solution([1, -1, 1])', expect: '[0, 0]', name: 'tie, ends first' },
      { call: 'solution([0, 5])', expect: '[0, 1]', name: 'tie, starts first' },
      { call: 'solution([-1, 4, -2, 4, -9])', expect: '[1, 3]', name: 'crosses a dip' },
      { call: 'solution(BIG)', expect: 'BIG_EXP', name: 'big input', hidden: true }
    ],
    setup: 'def _where(A):\n    ending = A[0]\n    run_start = 0\n    best = A[0]\n    bs, be = 0, 0\n    for i in range(1, len(A)):\n        if ending < 0:\n            ending = A[i]\n            run_start = i\n        else:\n            ending += A[i]\n        if ending > best:\n            best = ending\n            bs, be = run_start, i\n    return [bs, be]\nBIG = [(i * 7919) % 21 - 10 for i in range(100000)]\nBIG_EXP = _where(BIG)\n',
    hint: 'Write the max(A[i], ending_here + A[i]) as an if: when ending_here < 0 start a new run at i, otherwise extend it.',
    solution: 'def solution(A):\n    ending_here = A[0]\n    run_start = 0\n    best = A[0]\n    best_start, best_end = 0, 0\n    for i in range(1, len(A)):\n        if ending_here < 0:\n            ending_here = A[i]\n            run_start = i\n        else:\n            ending_here += A[i]\n        if ending_here > best:\n            best = ending_here\n            best_start, best_end = run_start, i\n    return [best_start, best_end]\n',
    walk: 'The max from the last lesson hides a decision: extend the run or restart it. Written as an if, we can move run_start when we restart. Restarting only when ending_here is strictly negative keeps the earliest start on ties, and updating best only when strictly larger keeps the earliest end. Interviewers often ask for the positions, so know this version.',
    complexity: 'O(N)' },

  { topic: 'lead',
    id: 'lead-17',
    title: 'Best slice of length at least 2',
    idea: 'New: a slice ending at i with at least 2 elements is A[i] plus a slice of at least 1 element ending at i - 1. So the candidate at i is ending_here (from before) + A[i], computed BEFORE ending_here is updated.',
    brief: 'You get a list A with at least 2 elements. Return the largest sum of a slice that has at least 2 elements. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # best_pair = ending_here + A[i], then update ending_here\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 2, -6, 4, 0])', out: '5' },
      { in: 'solution([1, -2, 3])', out: '2' }
    ],
    tests: [
      { call: 'solution([3, 2, -6, 4, 0])', expect: '5' },
      { call: 'solution([1, -2, 3])', expect: '2', name: 'must cross the dip' },
      { call: 'solution([1, 2])', expect: '3', name: 'two elements' },
      { call: 'solution([-1, -2])', expect: '-3', name: 'both negative' },
      { call: 'solution([5, -10, 5])', expect: '0', name: 'whole list beats a pair' },
      { call: 'solution([4, -1, -1, 4])', expect: '6', name: 'crosses two dips' },
      { call: 'solution([10, -1, 10, -20, 1, 1])', expect: '19', name: 'ignore a lone peak' },
      { call: 'solution(BIG)', expect: 'BIG_EXP', name: 'big input', hidden: true }
    ],
    setup: 'def _atleast2(A):\n    P = [0]\n    for v in A:\n        P.append(P[-1] + v)\n    best = None\n    low = P[0]\n    for i in range(2, len(P)):\n        low = min(low, P[i - 2])\n        cand = P[i] - low\n        if best is None or cand > best:\n            best = cand\n    return best\nBIG = [(i * 7919) % 21 - 10 for i in range(100000)]\nBIG_EXP = _atleast2(BIG)\n',
    hint: 'Inside the loop over i from 1: first best = max(best, ending_here + A[i]), then ending_here = max(A[i], ending_here + A[i]).',
    solution: 'def solution(A):\n    ending_here = A[0]\n    best = A[0] + A[1]\n    for i in range(1, len(A)):\n        best = max(best, ending_here + A[i])\n        ending_here = max(A[i], ending_here + A[i])\n    return best\n',
    walk: 'ending_here is still the best slice of any length ending at i - 1. Adding A[i] to it forces the slice to reach back at least one step, so it has 2 or more elements. We record that candidate, and only then update ending_here for the next round. Order of the two lines is the whole trick.',
    complexity: 'O(N)' },

  { topic: 'lead',
    id: 'lead-18',
    title: 'Left array for the double slice',
    idea: 'New: a slice that may be empty. left[i] is the best sum of a slice ending at i, where the slice may be empty (sum 0) and may not include index 0. So left[0] = 0 and left[i] = max(0, left[i-1] + A[i]).',
    brief: 'You get a list A. Return the list left, same length as A, where left[i] is the largest sum of a slice that ends at i and does not use index 0; an empty slice (sum 0) is allowed, so left[i] is never negative and left[0] is 0. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # left[0] = 0; left[i] = max(0, left[i - 1] + A[i])\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 2, 6, -1, 4, 5, -1, 2])', out: '[0, 2, 8, 7, 11, 16, 15, 17]' }
    ],
    tests: [
      { call: 'solution([3, 2, 6, -1, 4, 5, -1, 2])', expect: '[0, 2, 8, 7, 11, 16, 15, 17]' },
      { call: 'solution([5])', expect: '[0]', name: 'one element' },
      { call: 'solution([])', expect: '[]', name: 'empty', hidden: true },
      { call: 'solution([-1, -1, -1])', expect: '[0, 0, 0]', name: 'all negative' },
      { call: 'solution([1, 2, 3])', expect: '[0, 2, 5]', name: 'index 0 is skipped' },
      { call: 'solution([2, -5, 3])', expect: '[0, 0, 3]', name: 'restart after a drop' },
      { call: 'solution(BIG)', expect: 'BIG_EXP', name: 'big input', hidden: true }
    ],
    setup: 'def _left(A):\n    out = [0] * len(A)\n    for i in range(1, len(A)):\n        out[i] = max(0, out[i - 1] + A[i])\n    return out\nBIG = [(i * 7919) % 21 - 10 for i in range(100000)]\nBIG_EXP = _left(BIG)\n',
    hint: 'Make a list of zeros of length N and fill positions 1 to N - 1 from left to right.',
    solution: 'def solution(A):\n    N = len(A)\n    left = [0] * N\n    for i in range(1, N):\n        left[i] = max(0, left[i - 1] + A[i])\n    return left\n',
    walk: 'In the double slice task the first slice sits strictly between X and Y, so it may be empty and can never contain A[0]. That is why we allow 0 and skip index 0. Apart from that it is lesson 14 with max(0, ...) instead of max(A[i], ...). The mirror image, filled from the right, gives the right array for the next lesson.',
    complexity: 'O(N)' },

  { topic: 'lead',
    id: 'lead-19',
    title: 'MaxDoubleSliceSum (Codility)',
    idea: 'New: do the same from the right and join the two arrays at the gap. right[i] is the best (possibly empty) slice starting at i that does not use the last index. The answer is the largest left[Y - 1] + right[Y + 1] over the middle positions Y.',
    brief: 'Codility task MaxDoubleSliceSum. A double slice is a triple (X, Y, Z) with 0 <= X < Y < Z < N, and its sum is A[X+1] + ... + A[Y-1] + A[Y+1] + ... + A[Z-1] (both parts may be empty). Return the largest double slice sum. N is from 3 to 100,000 and values are from -10,000 to 10,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # left[] as before, right[] from the other end, then max over Y of left[Y-1] + right[Y+1]\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 2, 6, -1, 4, 5, -1, 2])', out: '17' },
      { in: 'solution([5, 5, 5])', out: '0' }
    ],
    tests: [
      { call: 'solution([3, 2, 6, -1, 4, 5, -1, 2])', expect: '17' },
      { call: 'solution([0, 0, 0])', expect: '0', name: 'zeros' },
      { call: 'solution([-1, -1, -1])', expect: '0', name: 'all negative' },
      { call: 'solution([5, 5, 5])', expect: '0', name: 'N = 3, both parts empty' },
      { call: 'solution([5, 5, 5, 5])', expect: '5', name: 'N = 4' },
      { call: 'solution([1, 2, 3, 4, 5])', expect: '7', name: 'skip one in the middle' },
      { call: 'solution([-1, 10, -1, 10, -1])', expect: '20', name: 'the gap removes a dip' },
      { call: 'solution(BIG)', expect: 'BIG_EXP', name: 'big input', hidden: true }
    ],
    setup: 'def _double(A):\n    N = len(A)\n    left = [0] * N\n    right = [0] * N\n    for i in range(1, N):\n        left[i] = max(0, left[i - 1] + A[i])\n    for i in range(N - 2, -1, -1):\n        right[i] = max(0, right[i + 1] + A[i])\n    best = 0\n    for Y in range(1, N - 1):\n        best = max(best, left[Y - 1] + right[Y + 1])\n    return best\nBIG = [(i * 7919) % 20001 - 10000 for i in range(100000)]\nBIG_EXP = _double(BIG)\n',
    hint: 'Fill right with a loop from N - 2 down to 0 using right[i] = max(0, right[i + 1] + A[i]), then one more loop over Y from 1 to N - 2.',
    solution: 'def solution(A):\n    N = len(A)\n    left = [0] * N\n    right = [0] * N\n    for i in range(1, N):\n        left[i] = max(0, left[i - 1] + A[i])\n    for i in range(N - 2, -1, -1):\n        right[i] = max(0, right[i + 1] + A[i])\n    best = 0\n    for Y in range(1, N - 1):\n        best = max(best, left[Y - 1] + right[Y + 1])\n    return best\n',
    walk: 'Fix the gap Y. The first part is the best slice ending at Y - 1 (that is left[Y - 1]) and the second part is the best slice starting at Y + 1 (right[Y + 1]); both may be empty. Trying every Y and adding the two arrays gives the answer in three linear passes. Both parts empty is always allowed, so the answer is never below 0.',
    complexity: 'O(N) time, O(N) memory' },

  { topic: 'lead',
    id: 'lead-20',
    title: 'Best slice of length at most K',
    idea: 'New: prefix sums plus a sliding minimum. The sum of A[s..e] is P[e+1] - P[s]. For each end e we want the smallest P[s] with s in the last K positions. A deque (double-ended queue) keeps the candidates in increasing order: pop from the back any P that is not smaller than the new one, pop from the front anything that fell out of the window. The front is the minimum.',
    brief: 'You get a non-empty list A and a number K >= 1. Return the largest sum of a slice that has at most K elements. N is up to 100,000 and K may be as large as N. An O(N * K) double loop is too slow; aim for O(N).',
    fn: 'solution',
    sig: 'def solution(A, K)',
    starter: 'def solution(A, K):\n    # 1. prefix sums P (P[0] = 0)\n    # 2. for each i from 1 to N: best = max(best, P[i] - min of P[i-K..i-1])\n    #    keep that min with a deque\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 2, -6, 4, 0], 2)', out: '5' },
      { in: 'solution([1, 2, 3, 4], 2)', out: '7' }
    ],
    tests: [
      { call: 'solution([3, 2, -6, 4, 0], 2)', expect: '5' },
      { call: 'solution([3, 2, -6, 4, 0], 1)', expect: '4', name: 'K = 1 is the largest element' },
      { call: 'solution([-10], 1)', expect: '-10', name: 'one element' },
      { call: 'solution([1, 2, 3, 4], 2)', expect: '7', name: 'last two' },
      { call: 'solution([1, 2, 3, 4], 10)', expect: '10', name: 'K larger than N' },
      { call: 'solution([5, -1, 5], 2)', expect: '5', name: 'the dip does not fit' },
      { call: 'solution([5, -1, 5], 3)', expect: '9', name: 'the dip fits' },
      { call: 'solution([-3, -1, -2], 2)', expect: '-1', name: 'all negative' },
      { call: 'solution(BIG, 1000)', expect: 'BIG_EXP', name: 'big input', hidden: true },
      { call: 'solution(BIG, 100000)', expect: 'BIG_ALL', name: 'big input, K = N', hidden: true }
    ],
    setup: 'from collections import deque\ndef _atmost(A, K):\n    N = len(A)\n    P = [0] * (N + 1)\n    for i in range(N):\n        P[i + 1] = P[i] + A[i]\n    dq = deque([0])\n    best = A[0]\n    for i in range(1, N + 1):\n        while dq[0] < i - K:\n            dq.popleft()\n        best = max(best, P[i] - P[dq[0]])\n        while dq and P[dq[-1]] >= P[i]:\n            dq.pop()\n        dq.append(i)\n    return best\nBIG = [(i * 7919) % 21 - 10 for i in range(100000)]\nBIG_EXP = _atmost(BIG, 1000)\nBIG_ALL = _atmost(BIG, 100000)\n',
    hint: 'Store prefix INDEXES in the deque, keep their P values increasing from front to back, and drop the front while it is smaller than i - K.',
    solution: 'from collections import deque\n\ndef solution(A, K):\n    N = len(A)\n    P = [0] * (N + 1)\n    for i in range(N):\n        P[i + 1] = P[i] + A[i]\n    dq = deque([0])\n    best = A[0]\n    for i in range(1, N + 1):\n        while dq[0] < i - K:\n            dq.popleft()\n        best = max(best, P[i] - P[dq[0]])\n        while dq and P[dq[-1]] >= P[i]:\n            dq.pop()\n        dq.append(i)\n    return best\n',
    walk: 'P[i] is the sum of the first i elements, so a slice ending at index i - 1 with start s has sum P[i] - P[s], and length at most K means s >= i - K. For each i we need the smallest P[s] in that window. The deque holds indexes whose P values rise from front to back: a new P that is smaller than the back makes the back useless forever, so we pop it, and an index older than i - K has left the window, so we drop it from the front. Each index is pushed and popped at most once, so the whole thing is linear.',
    complexity: 'O(N) time, O(N) memory' }

  );
})();
