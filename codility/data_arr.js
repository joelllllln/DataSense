/* Codility trainer — topic "arr": Arrays & time complexity.
   Ladder: index → slice → rotate (CyclicRotation) → XOR (OddOccurrencesInArray)
   → arithmetic without loops (FrogJmp, PermMissingElem) → running totals (TapeEquilibrium). */
(function () {
  window.CODILITY = window.CODILITY || [];
  window.CODILITY.push(

  { topic: 'arr',
    id: 'arr-01',
    title: 'The first element',
    idea: 'A list is a row of boxes. The first box is A[0]. Python counts from 0, not from 1.',
    brief: 'A is a list of numbers. It is never empty. Return the first element of A.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 8, 9, 7, 6])', out: '3' },
      { in: 'solution([5])', out: '5' }
    ],
    tests: [
      { call: 'solution([3, 8, 9, 7, 6])', expect: '3' },
      { call: 'solution([5])', expect: '5', name: 'one element' },
      { call: 'solution([-1, 2])', expect: '-1', name: 'negative' },
      { call: 'solution([0, 0])', expect: '0', name: 'zeros' },
      { call: 'solution(list(range(7, 100007)))', expect: '7', name: 'big input', hidden: true }
    ],
    hint: 'Square brackets with a number inside pick one element: A[number].',
    solution: 'def solution(A):\n    return A[0]\n',
    walk: 'A[0] reads the box at position 0, which is the first one. Reading one box takes the same time no matter how long the list is. Remember: the first element is A[0], not A[1].',
    complexity: 'O(1)' },

  { topic: 'arr',
    id: 'arr-02',
    title: 'The last element',
    idea: 'New: negative positions count from the end. A[-1] is the last element, A[-2] is the one before it.',
    brief: 'A is a list of numbers. It is never empty. Return the last element of A.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 8, 9, 7, 6])', out: '6' },
      { in: 'solution([5])', out: '5' }
    ],
    tests: [
      { call: 'solution([3, 8, 9, 7, 6])', expect: '6' },
      { call: 'solution([5])', expect: '5', name: 'one element' },
      { call: 'solution([1, -2])', expect: '-2', name: 'negative' },
      { call: 'solution([4, 4, 4])', expect: '4', name: 'repeats' },
      { call: 'solution(list(range(100000)))', expect: '99999', name: 'big input', hidden: true }
    ],
    hint: 'You do not need len(A). A negative position counts from the end.',
    solution: 'def solution(A):\n    return A[-1]\n',
    walk: 'A[-1] is the last box. It is the same as A[len(A) - 1] but shorter and easier to get right. Remember: -1 is the last, -2 is the second from last.',
    complexity: 'O(1)' },

  { topic: 'arr',
    id: 'arr-03',
    title: 'First element, or 0 if empty',
    idea: 'New: check for an empty list before you index it. A[0] on an empty list crashes. len(A) is the number of elements.',
    brief: 'A is a list of numbers. It may be empty. Return the first element of A. If A is empty, return 0.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 8, 9])', out: '3' },
      { in: 'solution([])', out: '0' }
    ],
    tests: [
      { call: 'solution([3, 8, 9])', expect: '3' },
      { call: 'solution([])', expect: '0', name: 'empty' },
      { call: 'solution([7])', expect: '7', name: 'one element' },
      { call: 'solution([0, 5])', expect: '0', name: 'first is zero' },
      { call: 'solution([-4, 1])', expect: '-4', name: 'negative' },
      { call: 'solution(list(range(2, 100002)))', expect: '2', name: 'big input', hidden: true }
    ],
    hint: 'Use an if: when len(A) is 0, return 0; otherwise return A[0].',
    solution: 'def solution(A):\n    if len(A) == 0:\n        return 0\n    return A[0]\n',
    walk: 'Indexing an empty list raises IndexError, so we test the length first. len(A) == 0 is true only for an empty list. Many Python programmers write "if not A:" which means the same thing. Remember: always ask what happens when the input is empty.',
    complexity: 'O(1)' },

  { topic: 'arr',
    id: 'arr-04',
    title: 'Drop the first element',
    idea: 'New: a slice. A[1:] is a new list with everything from position 1 to the end. Slicing never crashes; on an empty list it just gives an empty list.',
    brief: 'A is a list of numbers. It may be empty. Return a new list that is A without its first element. If A is empty, return an empty list.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 8, 9, 7, 6])', out: '[8, 9, 7, 6]' },
      { in: 'solution([5])', out: '[]' }
    ],
    tests: [
      { call: 'solution([3, 8, 9, 7, 6])', expect: '[8, 9, 7, 6]' },
      { call: 'solution([5])', expect: '[]', name: 'one element' },
      { call: 'solution([])', expect: '[]', name: 'empty' },
      { call: 'solution([1, 2])', expect: '[2]', name: 'two elements' },
      { call: 'solution([0, 0, 0])', expect: '[0, 0]', name: 'zeros' },
      { call: 'solution(list(range(100000)))', expect: 'list(range(1, 100000))', name: 'big input', hidden: true }
    ],
    hint: 'A[start:] copies from position start to the end.',
    solution: 'def solution(A):\n    return A[1:]\n',
    walk: 'A[1:] means "from position 1 up to the end". It builds a new list and leaves A unchanged. If A has one element, A[1:] is empty; if A is empty, A[1:] is still empty, so no if is needed. Remember: slicing copies every element it keeps, so it takes time proportional to the list.',
    complexity: 'O(N)' },

  { topic: 'arr',
    id: 'arr-05',
    title: 'The last K elements',
    idea: 'New: a slice with a negative start. A[-K:] is the last K elements. The part before the colon can count from the end too.',
    brief: 'A is a list of numbers and K is a number with 1 <= K <= len(A). Return a new list with the last K elements of A, in their original order.',
    fn: 'solution',
    sig: 'def solution(A, K)',
    starter: 'def solution(A, K):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 8, 9, 7, 6], 2)', out: '[7, 6]' },
      { in: 'solution([3, 8, 9, 7, 6], 5)', out: '[3, 8, 9, 7, 6]' }
    ],
    tests: [
      { call: 'solution([3, 8, 9, 7, 6], 2)', expect: '[7, 6]' },
      { call: 'solution([3, 8, 9, 7, 6], 5)', expect: '[3, 8, 9, 7, 6]', name: 'K is the whole list' },
      { call: 'solution([5], 1)', expect: '[5]', name: 'one element' },
      { call: 'solution([1, 2, 3], 1)', expect: '[3]', name: 'just the last' },
      { call: 'solution([4, 4, 4, 4], 3)', expect: '[4, 4, 4]', name: 'repeats' },
      { call: 'solution(list(range(100000)), 50000)', expect: 'list(range(50000, 100000))', name: 'big input', hidden: true }
    ],
    hint: 'A[-2:] is the last two elements. Put K where the 2 is.',
    solution: 'def solution(A, K):\n    return A[-K:]\n',
    walk: 'A[-K:] starts K places before the end and runs to the end, so it is exactly the last K elements. Watch out for K = 0: -0 is just 0, so A[-0:] is the whole list, not an empty one. That is why this task promises K is at least 1. Remember that trap; it comes back in the rotation task.',
    complexity: 'O(K)' },

  { topic: 'arr',
    id: 'arr-06',
    title: 'Rotate right by one',
    idea: 'New: glue two slices together with +. The last element moves to the front: A[-1:] (the last one, as a list) + A[:-1] (everything except the last).',
    brief: 'A is a list of numbers with at least one element. Rotate it one place to the right: the last element becomes the first and every other element moves one place right. Return the new list.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 8, 9, 7, 6])', out: '[6, 3, 8, 9, 7]' },
      { in: 'solution([5])', out: '[5]' }
    ],
    tests: [
      { call: 'solution([3, 8, 9, 7, 6])', expect: '[6, 3, 8, 9, 7]' },
      { call: 'solution([5])', expect: '[5]', name: 'one element' },
      { call: 'solution([1, 2])', expect: '[2, 1]', name: 'two elements' },
      { call: 'solution([0, 0, 0])', expect: '[0, 0, 0]', name: 'all the same' },
      { call: 'solution([1, 2, 3, 4])', expect: '[4, 1, 2, 3]', name: 'four elements' },
      { call: 'solution(list(range(100000)))', expect: '[99999] + list(range(99999))', name: 'big input', hidden: true }
    ],
    hint: 'A[:-1] is everything except the last element. What goes in front of it?',
    solution: 'def solution(A):\n    return A[-1:] + A[:-1]\n',
    walk: 'A[-1:] is a one-element list holding the last value (a slice, not A[-1], so that + works). A[:-1] is the rest. Adding two lists joins them, so the last value lands at the front. Remember: list + list makes a new, longer list.',
    complexity: 'O(N)' },

  { topic: 'arr',
    id: 'arr-07',
    title: 'Rotate right by K',
    idea: 'New: the same two slices, but cut K from the end instead of 1. A[-K:] + A[:-K] rotates right by K places.',
    brief: 'A is a list of numbers and K is a number with 1 <= K <= len(A). Rotate A to the right K times (each time the last element moves to the front). Return the new list.',
    fn: 'solution',
    sig: 'def solution(A, K)',
    starter: 'def solution(A, K):\n    # rotating by one was A[-1:] + A[:-1]\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 8, 9, 7, 6], 3)', out: '[9, 7, 6, 3, 8]' },
      { in: 'solution([1, 2, 3, 4], 1)', out: '[4, 1, 2, 3]' }
    ],
    tests: [
      { call: 'solution([3, 8, 9, 7, 6], 3)', expect: '[9, 7, 6, 3, 8]' },
      { call: 'solution([3, 8, 9, 7, 6], 5)', expect: '[3, 8, 9, 7, 6]', name: 'K equals the length' },
      { call: 'solution([1, 2, 3, 4], 1)', expect: '[4, 1, 2, 3]', name: 'K is one' },
      { call: 'solution([5], 1)', expect: '[5]', name: 'one element' },
      { call: 'solution([1, 2, 3, 4], 2)', expect: '[3, 4, 1, 2]', name: 'half way' },
      { call: 'solution(list(range(100000)), 1)', expect: '[99999] + list(range(99999))', name: 'big input', hidden: true },
      { call: 'solution(list(range(100000)), 100000)', expect: 'list(range(100000))', name: 'big input, full turn', hidden: true }
    ],
    hint: 'The last K elements go to the front; the first len(A) - K elements follow them.',
    solution: 'def solution(A, K):\n    return A[-K:] + A[:-K]\n',
    walk: 'Rotating K times moves the last K elements, as a block, to the front. A[-K:] is that block and A[:-K] is everything before it. When K equals len(A), A[-K:] is the whole list and A[:-K] is empty, so the list comes back unchanged, which is right. Remember: do not loop K times rotating by one; one pair of slices does it.',
    complexity: 'O(N)' },

  { topic: 'arr',
    id: 'arr-08',
    title: 'Rotate when K is bigger than the list',
    idea: 'New: the remainder operator %. Rotating a list of length N by N places changes nothing, so rotating by K is the same as rotating by K % N.',
    brief: 'A is a list of numbers with at least one element. K is any number 0 or more; it may be much bigger than len(A). Rotate A to the right K times and return the new list.',
    fn: 'solution',
    sig: 'def solution(A, K)',
    starter: 'def solution(A, K):\n    # rotating by K (K <= len(A)) was A[-K:] + A[:-K]\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 8, 9, 7, 6], 8)', out: '[9, 7, 6, 3, 8]' },
      { in: 'solution([1, 2, 3, 4], 4)', out: '[1, 2, 3, 4]' }
    ],
    tests: [
      { call: 'solution([3, 8, 9, 7, 6], 8)', expect: '[9, 7, 6, 3, 8]' },
      { call: 'solution([1, 2, 3, 4], 4)', expect: '[1, 2, 3, 4]', name: 'full turn' },
      { call: 'solution([1, 2, 3, 4], 6)', expect: '[3, 4, 1, 2]', name: 'one and a half turns' },
      { call: 'solution([5], 100)', expect: '[5]', name: 'one element, big K' },
      { call: 'solution([1, 2], 0)', expect: '[1, 2]', name: 'K is zero' },
      { call: 'solution([1, 2, 3], 2)', expect: '[2, 3, 1]', name: 'K smaller than length' },
      { call: 'solution(list(range(100000)), 100001)', expect: '[99999] + list(range(99999))', name: 'big input', hidden: true }
    ],
    hint: 'Replace K with K % len(A) before slicing.',
    solution: 'def solution(A, K):\n    K = K % len(A)\n    return A[-K:] + A[:-K]\n',
    walk: 'K % len(A) is the remainder after taking out whole turns, so it is between 0 and len(A) - 1. Then the two slices from the last lesson do the work. If the remainder is 0, A[-0:] is the whole list and A[:-0] is empty, so A comes back unchanged, which is correct here. Remember: % turns a huge K into a small one in one step.',
    complexity: 'O(N)' },

  { topic: 'arr',
    id: 'arr-09',
    title: 'CyclicRotation (the real task)',
    idea: 'New: the empty case. K % len(A) divides by zero when A is empty, so return early for an empty list. Everything else is the last lesson.',
    brief: 'Codility task CyclicRotation. A is a list of N integers, N from 0 to 100, and K from 0 to 100. Rotate A to the right K times and return the result. A may be empty and K may be 0. (We also test with N = 100,000 so a slow answer shows up.)',
    fn: 'solution',
    sig: 'def solution(A, K)',
    starter: 'def solution(A, K):\n    # K % len(A) crashes when A is empty\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 8, 9, 7, 6], 3)', out: '[9, 7, 6, 3, 8]' },
      { in: 'solution([0, 0, 0], 1)', out: '[0, 0, 0]' },
      { in: 'solution([1, 2, 3, 4], 4)', out: '[1, 2, 3, 4]' }
    ],
    tests: [
      { call: 'solution([3, 8, 9, 7, 6], 3)', expect: '[9, 7, 6, 3, 8]' },
      { call: 'solution([0, 0, 0], 1)', expect: '[0, 0, 0]', name: 'all zeros' },
      { call: 'solution([1, 2, 3, 4], 4)', expect: '[1, 2, 3, 4]', name: 'full turn' },
      { call: 'solution([], 5)', expect: '[]', name: 'empty' },
      { call: 'solution([], 0)', expect: '[]', name: 'empty and K zero', hidden: true },
      { call: 'solution([1], 0)', expect: '[1]', name: 'one element, K zero' },
      { call: 'solution([1, 2, 3], 7)', expect: '[3, 1, 2]', name: 'K bigger than length' },
      { call: 'solution(list(range(100000)), 100003)', expect: 'list(range(99997, 100000)) + list(range(99997))', name: 'big input', hidden: true }
    ],
    hint: 'First: if A is empty, return it. Then do what you did in the last lesson.',
    solution: 'def solution(A, K):\n    if not A:\n        return A\n    K = K % len(A)\n    return A[-K:] + A[:-K]\n',
    walk: 'An empty list cannot be rotated and would make len(A) zero in the %, so we return it at once. For every other list, K % len(A) removes whole turns and two slices move the last K elements to the front. The whole answer copies the list once, so it is fast even for 100,000 elements. Remember: check the empty input first, then apply the formula.',
    complexity: 'O(N)' },

  { topic: 'arr',
    id: 'arr-10',
    title: 'Count a value',
    idea: 'New: a counting loop. Start a counter at 0, walk through A with a for loop, and add 1 each time you see X.',
    brief: 'A is a list of numbers (it may be empty) and X is a number. Return how many times X appears in A. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A, X)',
    starter: 'def solution(A, X):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 8, 9, 8, 6], 8)', out: '2' },
      { in: 'solution([1, 2, 3], 5)', out: '0' }
    ],
    tests: [
      { call: 'solution([3, 8, 9, 8, 6], 8)', expect: '2' },
      { call: 'solution([1, 2, 3], 5)', expect: '0', name: 'not present' },
      { call: 'solution([1, 1, 1], 1)', expect: '3', name: 'all match' },
      { call: 'solution([], 4)', expect: '0', name: 'empty' },
      { call: 'solution([7], 7)', expect: '1', name: 'one element' },
      { call: 'solution([i % 10 for i in range(100000)], 3)', expect: '10000', name: 'big input', hidden: true }
    ],
    hint: 'count = 0, then for every element: if it equals X, add 1 to count.',
    solution: 'def solution(A, X):\n    count = 0\n    for a in A:\n        if a == X:\n            count += 1\n    return count\n',
    walk: 'The loop looks at every element once and the counter grows by one for each match. Looking at N elements once is O(N), the speed most Codility tasks want. Python also has A.count(X), which does exactly this loop for you. Remember the pattern: start at 0, loop, add when a condition holds.',
    complexity: 'O(N)' },

  { topic: 'arr',
    id: 'arr-11',
    title: 'XOR of two numbers',
    idea: 'New: the ^ operator (XOR, "exclusive or"). It compares two numbers bit by bit and keeps a 1 where the bits differ. Two equal numbers give 0, and any number ^ 0 is itself.',
    brief: 'A is a list with exactly two whole numbers. Return A[0] ^ A[1], the XOR of the two numbers. For example 9 is 1001 in binary and 7 is 0111; the bits differ in every place, so 9 ^ 7 = 1110 = 14.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([9, 7])', out: '14' },
      { in: 'solution([5, 5])', out: '0' },
      { in: 'solution([0, 6])', out: '6' }
    ],
    tests: [
      { call: 'solution([9, 7])', expect: '14' },
      { call: 'solution([5, 5])', expect: '0', name: 'equal numbers' },
      { call: 'solution([0, 6])', expect: '6', name: 'xor with zero' },
      { call: 'solution([1, 2])', expect: '3', name: 'no shared bits' },
      { call: 'solution([12, 10])', expect: '6', name: 'some shared bits' },
      { call: 'solution([123456789, 987654321])', expect: '123456789 ^ 987654321', name: 'big input', hidden: true }
    ],
    hint: 'The operator is a caret: a ^ b.',
    solution: 'def solution(A):\n    return A[0] ^ A[1]\n',
    walk: 'XOR sets a result bit to 1 only where exactly one of the two inputs has a 1. So 12 (1100) ^ 10 (1010) = 0110 = 6. The two facts to remember: x ^ x = 0, and x ^ 0 = x. They are what makes the next two lessons work.',
    complexity: 'O(1)' },

  { topic: 'arr',
    id: 'arr-12',
    title: 'XOR of every element',
    idea: 'New: a running XOR. Just like a running total with +, start at 0 and do result ^= a for every element.',
    brief: 'A is a list of whole numbers (it may be empty). Return the XOR of all of them. The XOR of an empty list is 0. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([9, 3, 9])', out: '3' },
      { in: 'solution([1, 2, 3])', out: '0' }
    ],
    tests: [
      { call: 'solution([9, 3, 9])', expect: '3' },
      { call: 'solution([1, 2, 3])', expect: '0', name: 'three numbers' },
      { call: 'solution([5])', expect: '5', name: 'one element' },
      { call: 'solution([])', expect: '0', name: 'empty' },
      { call: 'solution([7, 7])', expect: '0', name: 'a pair' },
      { call: 'solution([4, 4, 4])', expect: '4', name: 'three of the same' },
      { call: 'solution(list(range(100000)))', expect: '0', name: 'big input', hidden: true },
      { call: 'solution(list(range(1, 100001)))', expect: '100000', name: 'big input, 1 to 100000', hidden: true }
    ],
    hint: 'result = 0, then for every element: result ^= a.',
    solution: 'def solution(A):\n    result = 0\n    for a in A:\n        result ^= a\n    return result\n',
    walk: 'Starting at 0 is safe because 0 ^ a = a. Each step folds one more element in. Order does not matter for XOR, and a value that appears twice cancels itself out: 9 ^ 3 ^ 9 = 3 ^ (9 ^ 9) = 3 ^ 0 = 3. Remember: a running XOR is one loop, one line.',
    complexity: 'O(N)' },

  { topic: 'arr',
    id: 'arr-13',
    title: 'OddOccurrencesInArray (the real task)',
    idea: 'New: using the cancelling trick on purpose. If every value appears an even number of times except one, the pairs all cancel to 0 and the running XOR is left holding the odd one out.',
    brief: 'Codility task OddOccurrencesInArray. A is a list of N positive integers, N is odd and up to 1,000,000. Every value appears an even number of times except for exactly one value, which appears an odd number of times. Return that value. A loop that counts each value with A.count would be O(N squared) and time out.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # x ^ x == 0 and x ^ 0 == x\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([9, 3, 9, 3, 9, 7, 9])', out: '7' },
      { in: 'solution([42])', out: '42' }
    ],
    tests: [
      { call: 'solution([9, 3, 9, 3, 9, 7, 9])', expect: '7' },
      { call: 'solution([42])', expect: '42', name: 'one element' },
      { call: 'solution([1, 1, 2])', expect: '2', name: 'odd one at the end' },
      { call: 'solution([2, 1, 1])', expect: '2', name: 'odd one at the start' },
      { call: 'solution([5, 5, 5, 5, 3])', expect: '3', name: 'a value four times' },
      { call: 'solution([1000000000, 7, 1000000000])', expect: '7', name: 'large values' },
      { call: 'solution([i for i in range(1, 500000)] * 2 + [777777])', expect: '777777', name: 'big input', hidden: true }
    ],
    hint: 'The running XOR from the last lesson already is the answer.',
    solution: 'def solution(A):\n    result = 0\n    for a in A:\n        result ^= a\n    return result\n',
    walk: 'XOR does not care about order, so imagine the list sorted: every pair x ^ x becomes 0, and 0 ^ 0 ^ ... ^ odd = odd. One pass, no extra memory. This is the classic O(N) answer and it is faster than any counting method. Remember: "everything appears twice except one" is a signal to think of XOR.',
    complexity: 'O(N)' },

  { topic: 'arr',
    id: 'arr-14',
    title: 'OddOccurrencesInArray with a dictionary',
    idea: 'New: counting with a dict. counts[x] = counts.get(x, 0) + 1 tallies every value in one pass, then a second pass finds the odd tally. Same task, a method that also works when XOR does not.',
    brief: 'The same task as the last lesson: A is a list of positive integers, N odd and up to 1,000,000, every value appears an even number of times except one. Return that value, but this time do not use XOR: count the values with a dictionary.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    counts = {}\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([9, 3, 9, 3, 9, 7, 9])', out: '7' },
      { in: 'solution([42])', out: '42' }
    ],
    tests: [
      { call: 'solution([9, 3, 9, 3, 9, 7, 9])', expect: '7' },
      { call: 'solution([42])', expect: '42', name: 'one element' },
      { call: 'solution([1, 1, 2])', expect: '2', name: 'odd one at the end' },
      { call: 'solution([2, 1, 1])', expect: '2', name: 'odd one at the start' },
      { call: 'solution([5, 5, 5, 5, 3])', expect: '3', name: 'a value four times' },
      { call: 'solution([6, 6, 6, 2, 2])', expect: '6', name: 'odd one appears three times' },
      { call: 'solution([i for i in range(1, 500000)] * 2 + [777777])', expect: '777777', name: 'big input', hidden: true }
    ],
    hint: 'After counting, loop over the dictionary and return the key whose count % 2 == 1.',
    solution: 'def solution(A):\n    counts = {}\n    for a in A:\n        counts[a] = counts.get(a, 0) + 1\n    for value in counts:\n        if counts[value] % 2 == 1:\n            return value\n',
    walk: 'counts.get(a, 0) reads the current tally or 0 if a is new, so the first loop builds a table of value to how many times it appears. The second loop scans the table for the one odd tally. Both loops are O(N), but this uses O(N) extra memory where XOR used none. Remember: a dict counter is the general tool; XOR is the special trick for this exact task.',
    complexity: 'O(N)' },

  { topic: 'arr',
    id: 'arr-15',
    title: 'Frog jumps, exact fit',
    idea: 'New: integer division //. When the distance divides exactly by the jump, the number of jumps is distance // D, with no loop at all.',
    brief: 'A frog sits at position X and wants to reach position Y, jumping D forward each time. X, Y and D are whole numbers, X <= Y, and Y - X is always a multiple of D. Return the number of jumps. Values go up to 1,000,000,000, so do not simulate jump by jump.',
    fn: 'solution',
    sig: 'def solution(X, Y, D)',
    starter: 'def solution(X, Y, D):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(10, 40, 10)', out: '3' },
      { in: 'solution(5, 5, 3)', out: '0' }
    ],
    tests: [
      { call: 'solution(10, 40, 10)', expect: '3' },
      { call: 'solution(5, 5, 3)', expect: '0', name: 'already there' },
      { call: 'solution(0, 100, 25)', expect: '4', name: 'from zero' },
      { call: 'solution(7, 19, 4)', expect: '3', name: 'odd start' },
      { call: 'solution(1, 1000000000, 1)', expect: '999999999', name: 'big input, jump of 1', hidden: true },
      { call: 'solution(1, 1000000000, 3)', expect: '333333333', name: 'big input, jump of 3', hidden: true }
    ],
    hint: 'How far is it? Divide that by D using //.',
    solution: 'def solution(X, Y, D):\n    return (Y - X) // D\n',
    walk: 'The distance is Y - X. Each jump covers D, so the count is the distance divided by D. We use // (whole-number division) so the answer is an int, not a float like 3.0. A loop adding D until you reach Y would do a billion steps for the big test; the division does one. Remember: arithmetic beats loops when a formula exists.',
    complexity: 'O(1)' },

  { topic: 'arr',
    id: 'arr-16',
    title: 'FrogJmp (the real task)',
    idea: 'New: rounding up with integer maths. (distance + D - 1) // D gives the ceiling of distance / D without floats and without a loop.',
    brief: 'Codility task FrogJmp. A frog starts at X and wants to reach a position greater than or equal to Y. It always jumps D forward. Return the minimal number of jumps. X, Y and D are whole numbers from 1 to 1,000,000,000 and X <= Y. Y - X need not divide by D.',
    fn: 'solution',
    sig: 'def solution(X, Y, D)',
    starter: 'def solution(X, Y, D):\n    # (Y - X) // D rounds down; you need to round up\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(10, 85, 30)', out: '3' },
      { in: 'solution(10, 10, 5)', out: '0' }
    ],
    tests: [
      { call: 'solution(10, 85, 30)', expect: '3' },
      { call: 'solution(10, 10, 5)', expect: '0', name: 'X equals Y' },
      { call: 'solution(10, 11, 30)', expect: '1', name: 'one short jump' },
      { call: 'solution(10, 40, 10)', expect: '3', name: 'exact fit' },
      { call: 'solution(1, 1000000000, 1)', expect: '999999999', name: 'big input, D is 1', hidden: true },
      { call: 'solution(1, 1000000000, 1000000000)', expect: '1', name: 'one giant jump', hidden: true },
      { call: 'solution(3, 1000000000, 7)', expect: '-(-(1000000000 - 3) // 7)', name: 'big input, inexact', hidden: true }
    ],
    hint: 'Add D - 1 to the distance before dividing by D.',
    solution: 'def solution(X, Y, D):\n    return (Y - X + D - 1) // D\n',
    walk: 'Dividing with // rounds down, but a partial jump still counts as a whole jump, so we need to round up. Adding D - 1 first pushes any remainder over the line: 75 // 30 is 2, but (75 + 29) // 30 is 3. When the distance divides exactly, the extra D - 1 is not enough to add a jump, so exact cases stay right. Remember: ceiling of a / b is (a + b - 1) // b.',
    complexity: 'O(1)' },

  { topic: 'arr',
    id: 'arr-17',
    title: 'Sum of 1 to N without a loop',
    idea: 'New: a closed formula. 1 + 2 + ... + N = N * (N + 1) // 2. One multiplication replaces N additions.',
    brief: 'N is a whole number from 0 to 1,000,000,000. Return the sum 1 + 2 + ... + N. For N = 0 the sum is 0. A loop would take far too long for the biggest N.',
    fn: 'solution',
    sig: 'def solution(N)',
    starter: 'def solution(N):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(4)', out: '10' },
      { in: 'solution(100)', out: '5050' }
    ],
    tests: [
      { call: 'solution(4)', expect: '10' },
      { call: 'solution(1)', expect: '1', name: 'N is one' },
      { call: 'solution(0)', expect: '0', name: 'N is zero' },
      { call: 'solution(100)', expect: '5050', name: 'one hundred' },
      { call: 'solution(100000)', expect: 'sum(range(100001))', name: 'checked against sum' },
      { call: 'solution(1000000000)', expect: '500000000500000000', name: 'big input', hidden: true }
    ],
    hint: 'Pair the first and last numbers: 1 + N, 2 + (N - 1), ... each pair sums to N + 1.',
    solution: 'def solution(N):\n    return N * (N + 1) // 2\n',
    walk: 'Write the numbers forwards and backwards and add the columns: every column is N + 1 and there are N columns, which counts every number twice. So the sum is N * (N + 1) / 2. One of N and N + 1 is even, so // gives an exact whole number. Remember this formula; the next lesson uses it to find a missing number.',
    complexity: 'O(1)' },

  { topic: 'arr',
    id: 'arr-18',
    title: 'PermMissingElem (the real task)',
    idea: 'New: find a missing number by subtraction. The sum 1..N+1 is known by formula; subtract sum(A) and what is left is the missing number.',
    brief: 'Codility task PermMissingElem. A is a list of N different integers, each between 1 and N + 1, so exactly one number from that range is missing. Return the missing number. N is from 0 to 100,000. An empty list means N = 0 and the missing number is 1.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # the sum 1..M is M * (M + 1) // 2\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([2, 3, 1, 5])', out: '4' },
      { in: 'solution([])', out: '1' }
    ],
    tests: [
      { call: 'solution([2, 3, 1, 5])', expect: '4' },
      { call: 'solution([])', expect: '1', name: 'empty' },
      { call: 'solution([1])', expect: '2', name: 'one element, last missing' },
      { call: 'solution([2])', expect: '1', name: 'one element, first missing' },
      { call: 'solution([1, 2, 3, 4, 5, 6, 7, 8, 10])', expect: '9', name: 'near the end' },
      { call: 'solution([3, 2])', expect: '1', name: 'unsorted' },
      { call: 'solution([i for i in range(1, 100002) if i != 54321])', expect: '54321', name: 'big input', hidden: true },
      { call: 'solution(list(range(1, 100001)))', expect: '100001', name: 'big input, last missing', hidden: true }
    ],
    hint: 'The full set would be 1..len(A) + 1. What is its sum, and what is the sum of A?',
    solution: 'def solution(A):\n    M = len(A) + 1\n    return M * (M + 1) // 2 - sum(A)\n',
    walk: 'If no number were missing the list would hold 1..M where M = len(A) + 1, and its sum is M * (M + 1) // 2. The real list is that set minus one number, so the difference between the two sums is exactly the missing number. sum(A) is one pass, so the whole thing is O(N). Remember: when exactly one item is missing from a known set, subtract the sums.',
    complexity: 'O(N)' },

  { topic: 'arr',
    id: 'arr-19',
    title: 'Running totals of the left part',
    idea: 'New: a running total. Keep one variable, add each element to it as you go, and record it. That gives the sum of every prefix in one pass instead of calling sum(A[:P]) again and again.',
    brief: 'A is a list of N integers, N at least 2 and up to 100,000. For every split point P from 1 to N - 1, the left part is A[0..P-1]. Return a list with the sum of the left part for each P, in order. So the result has N - 1 numbers.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 1, 2, 4, 3])', out: '[3, 4, 6, 10]' },
      { in: 'solution([1, 2])', out: '[1]' }
    ],
    tests: [
      { call: 'solution([3, 1, 2, 4, 3])', expect: '[3, 4, 6, 10]' },
      { call: 'solution([1, 2])', expect: '[1]', name: 'two elements' },
      { call: 'solution([-1000, 1000])', expect: '[-1000]', name: 'negative' },
      { call: 'solution([5, 5, 5])', expect: '[5, 10]', name: 'repeats' },
      { call: 'solution([0, 0, 0, 0])', expect: '[0, 0, 0]', name: 'zeros' },
      { call: 'solution(BIG)', expect: 'EXPECT_BIG', name: 'big input', hidden: true }
    ],
    setup: 'BIG = list(range(100000))\nEXPECT_BIG = [P * (P - 1) // 2 for P in range(1, 100000)]\n',
    hint: 'left = 0; for each element except the last: left += element, then append left to the answer.',
    solution: 'def solution(A):\n    sums = []\n    left = 0\n    for i in range(len(A) - 1):\n        left += A[i]\n        sums.append(left)\n    return sums\n',
    walk: 'Each left part is the previous left part plus one more element, so we never add things up from scratch. The loop stops one short of the end because the right part must keep at least one element. Calling sum(A[:P]) for every P would re-add up to 100,000 numbers 100,000 times and time out. Remember: a running total turns repeated sums into one pass.',
    complexity: 'O(N)' },

  { topic: 'arr',
    id: 'arr-20',
    title: 'TapeEquilibrium (the real task)',
    idea: 'New: get the right part for free. If you know the total, then right = total - left, so one running total gives both sides at every split and you keep the smallest difference.',
    brief: 'Codility task TapeEquilibrium. A is a list of N integers, N from 2 to 100,000, each value from -1,000 to 1,000. A split at P (1 <= P < N) makes a left part A[0..P-1] and a right part A[P..N-1]. The difference of a split is |sum(left) - sum(right)|. Return the smallest difference over all splits. Must run in O(N).',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # right part = total - left part\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 1, 2, 4, 3])', out: '1' },
      { in: 'solution([-1000, 1000])', out: '2000' }
    ],
    tests: [
      { call: 'solution([3, 1, 2, 4, 3])', expect: '1' },
      { call: 'solution([1, 2])', expect: '1', name: 'two elements' },
      { call: 'solution([-1000, 1000])', expect: '2000', name: 'extreme values' },
      { call: 'solution([5, 5])', expect: '0', name: 'two equal' },
      { call: 'solution([1, 1, 1, 1])', expect: '0', name: 'perfect middle split' },
      { call: 'solution([2, -2, 2])', expect: '2', name: 'negatives inside' },
      { call: 'solution([1000, -1000, 1000, -1000])', expect: '0', name: 'cancelling pairs', hidden: true },
      { call: 'solution(BIG)', expect: 'EXPECT_BIG', name: 'big input', hidden: true }
    ],
    setup: 'import itertools\nBIG = [(i * 7919) % 2001 - 1000 for i in range(100000)]\n_TOTAL = sum(BIG)\nEXPECT_BIG = min(abs(2 * s - _TOTAL) for s in itertools.accumulate(BIG[:-1]))\n',
    hint: 'Compute total = sum(A) once, then walk left to right keeping left; the difference at each step is abs(left - (total - left)).',
    solution: 'def solution(A):\n    total = sum(A)\n    left = 0\n    best = None\n    for i in range(len(A) - 1):\n        left += A[i]\n        diff = abs(left - (total - left))\n        if best is None or diff < best:\n            best = diff\n    return best\n',
    walk: 'Every element is on one side or the other, so the right sum is total minus the left sum; we never add up the right part. One pass grows left by one element at a time and checks the difference at each split, keeping the smallest. Two passes over the list (one for sum, one for the loop) is still O(N). Remember: when a quantity is total minus something you already track, do not recompute it.',
    complexity: 'O(N)' }

  );
})();
