/* Codility trainer — topic "basics": Python from the ground.
   25 lessons for someone who knows pandas but has never written a plain
   Python loop for real. Ladder: return → arithmetic (//, %) → if → loops
   (for, range, while) → indexing and slicing → enumerate → building lists
   → built-ins → strings → dicts → sets → tuples → nested loops and why
   they are slow → the one-pass lookup that replaces the inner loop.
   See SPEC.md for the lesson shape. */
(function () {
  window.CODILITY = window.CODILITY || [];
  window.CODILITY.push(

  /* ---------------------------------------------------------------- 01 */
  { topic: 'basics',
    id: 'basics-01',
    title: 'Return, not print',
    idea: 'Codility gives you a function called solution and only looks at what it returns. print shows text on the screen; return hands a value back. In a notebook you see the last line of a cell by itself. Here nothing is shown unless you return it.',
    brief: 'You get a number N. Return it unchanged. Do not print it. Replace the word pass with a return line.',
    fn: 'solution',
    sig: 'def solution(N)',
    starter: 'def solution(N):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(5)', out: '5' },
      { in: 'solution(-3)', out: '-3' }
    ],
    tests: [
      { call: 'solution(5)', expect: '5' },
      { call: 'solution(-3)', expect: '-3', name: 'negative' },
      { call: 'solution(0)', expect: '0', name: 'zero' },
      { call: 'solution(1)', expect: '1', name: 'one' },
      { call: 'solution(100000)', expect: '100000', name: 'big input', hidden: true },
      { call: 'solution(10 ** 18)', expect: '10 ** 18', name: 'very big number', hidden: true }
    ],
    hint: 'The whole body of the function is one line that starts with the word return.',
    solution: 'def solution(N):\n    return N\n',
    walk: 'The line return N ends the function and hands N back to whoever called it. A function with only pass returns None, which fails every test. Remember: Codility never reads your prints, only your return value.',
    complexity: 'O(1)' },

  /* ---------------------------------------------------------------- 02 */
  { topic: 'basics',
    id: 'basics-02',
    title: 'Add two numbers',
    idea: 'New: a function can take two arguments, and you can return the result of a calculation. Whole numbers are int, numbers with a decimal point are float. int + int gives an int; if either side is a float the answer is a float. In pandas you would write df["a"] + df["b"]; here it is just A + B.',
    brief: 'You get two numbers A and B. Return their sum.',
    fn: 'solution',
    sig: 'def solution(A, B)',
    starter: 'def solution(A, B):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(2, 3)', out: '5' },
      { in: 'solution(1.5, 2)', out: '3.5' }
    ],
    tests: [
      { call: 'solution(2, 3)', expect: '5' },
      { call: 'solution(1.5, 2)', expect: '3.5', name: 'float' },
      { call: 'solution(-4, 4)', expect: '0', name: 'negative' },
      { call: 'solution(0, 0)', expect: '0', name: 'zeros' },
      { call: 'solution(-7, -8)', expect: '-15', name: 'both negative' },
      { call: 'solution(10 ** 18, 1)', expect: '10 ** 18 + 1', name: 'big input', hidden: true }
    ],
    hint: 'return followed by the two names with a plus sign between them.',
    solution: 'def solution(A, B):\n    return A + B\n',
    walk: 'A + B is worked out first, then return hands that value back. Python ints never overflow, so 10 ** 18 + 1 is exact. Remember: mixing an int and a float gives a float, and Codility usually wants ints, so avoid / (true division) when you mean whole numbers.',
    complexity: 'O(1)' },

  /* ---------------------------------------------------------------- 03 */
  { topic: 'basics',
    id: 'basics-03',
    title: 'Integer division',
    idea: 'New: // divides and rounds DOWN to a whole number. 7 // 2 is 3, not 3.5. Rounding down also works for negatives: -7 // 2 is -4, not -3. Plain / always gives a float, which Codility does not want.',
    brief: 'You get a whole number N. Return N divided by 2, rounded down to a whole number. N can be negative.',
    fn: 'solution',
    sig: 'def solution(N)',
    starter: 'def solution(N):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(7)', out: '3' },
      { in: 'solution(-7)', out: '-4' }
    ],
    tests: [
      { call: 'solution(7)', expect: '3' },
      { call: 'solution(8)', expect: '4', name: 'even' },
      { call: 'solution(-7)', expect: '-4', name: 'negative odd' },
      { call: 'solution(-8)', expect: '-4', name: 'negative even' },
      { call: 'solution(0)', expect: '0', name: 'zero' },
      { call: 'solution(1)', expect: '0', name: 'one' },
      { call: 'solution(10 ** 18 + 1)', expect: '5 * 10 ** 17', name: 'big input', hidden: true }
    ],
    hint: 'Two slashes, not one.',
    solution: 'def solution(N):\n    return N // 2\n',
    walk: 'N // 2 gives the biggest whole number that is not above N / 2. For 7 that is 3. For -7 the value -3.5 rounds down to -4, because down means towards minus infinity. Remember: // keeps you in ints, / gives you floats.',
    complexity: 'O(1)' },

  /* ---------------------------------------------------------------- 04 */
  { topic: 'basics',
    id: 'basics-04',
    title: 'The remainder',
    idea: 'New: % gives the remainder after dividing. 17 % 10 is 7, so N % 10 is the last digit. In Python the result always has the sign of the right side: -7 % 10 is 3, because -7 = -1 * 10 + 3. In pandas you may have used df["x"] % 2 to find even rows; it is the same operator.',
    brief: 'You get a whole number N. Return N % 10, the remainder when N is divided by 10. For N of 0 or more this is the last digit. N can be negative; use the Python rule.',
    fn: 'solution',
    sig: 'def solution(N)',
    starter: 'def solution(N):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(17)', out: '7' },
      { in: 'solution(-7)', out: '3' }
    ],
    tests: [
      { call: 'solution(17)', expect: '7' },
      { call: 'solution(20)', expect: '0', name: 'divides exactly' },
      { call: 'solution(5)', expect: '5', name: 'smaller than 10' },
      { call: 'solution(0)', expect: '0', name: 'zero' },
      { call: 'solution(-7)', expect: '3', name: 'negative' },
      { call: 'solution(-10)', expect: '0', name: 'negative multiple' },
      { call: 'solution(10 ** 18 + 9)', expect: '9', name: 'big input', hidden: true }
    ],
    hint: 'The percent sign is the remainder operator.',
    solution: 'def solution(N):\n    return N % 10\n',
    walk: 'N % 10 is what is left after taking out as many tens as fit. 17 has one ten and 7 left over. For -7, Python takes out -1 tens (which is -10) and 3 is left, so the answer is 3, never negative. Remember: x % 2 == 0 is how you test for even, and it works for negatives too.',
    complexity: 'O(1)' },

  /* ---------------------------------------------------------------- 05 */
  { topic: 'basics',
    id: 'basics-05',
    title: 'if, elif, else',
    idea: 'New: if / elif / else picks one of several branches. Each branch is indented. The first condition that is true wins and the rest are skipped. In pandas you would reach for np.where or np.select; in plain Python you write the branches out.',
    brief: 'You get a number N. Return the string \'negative\' if N is below 0, \'zero\' if N is 0, and \'positive\' if N is above 0.',
    fn: 'solution',
    sig: 'def solution(N)',
    starter: 'def solution(N):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(-2)', out: "'negative'" },
      { in: 'solution(0)', out: "'zero'" },
      { in: 'solution(9)', out: "'positive'" }
    ],
    tests: [
      { call: 'solution(-2)', expect: "'negative'" },
      { call: 'solution(0)', expect: "'zero'" },
      { call: 'solution(9)', expect: "'positive'" },
      { call: 'solution(-1)', expect: "'negative'", name: 'minus one' },
      { call: 'solution(1)', expect: "'positive'", name: 'one' },
      { call: 'solution(0.5)', expect: "'positive'", name: 'small float' },
      { call: 'solution(-10 ** 18)', expect: "'negative'", name: 'big input', hidden: true }
    ],
    hint: 'Three branches: if N < 0, elif N == 0, else.',
    solution: 'def solution(N):\n    if N < 0:\n        return \'negative\'\n    elif N == 0:\n        return \'zero\'\n    else:\n        return \'positive\'\n',
    walk: 'Python checks N < 0 first. If that is true it returns and the function is over. Otherwise it checks N == 0. If that is also false, the else branch runs. Remember: == compares, = assigns. A return inside a branch ends the whole function right there.',
    complexity: 'O(1)' },

  /* ---------------------------------------------------------------- 06 */
  { topic: 'basics',
    id: 'basics-06',
    title: 'Codility wants 1 or 0, not True or False',
    idea: 'New: N % 2 == 0 is a boolean, True or False. Many Codility tasks ask for 1 or 0 instead, and the checker here is strict: True is not accepted where 1 is wanted. So return the int yourself, with an if or with the one-line form 1 if ... else 0.',
    brief: 'You get a whole number N. Return 1 if N is even and 0 if N is odd. Return the integers 1 and 0, not True and False.',
    fn: 'solution',
    sig: 'def solution(N)',
    starter: 'def solution(N):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(4)', out: '1' },
      { in: 'solution(7)', out: '0' }
    ],
    tests: [
      { call: 'solution(4)', expect: '1' },
      { call: 'solution(7)', expect: '0' },
      { call: 'solution(0)', expect: '1', name: 'zero is even' },
      { call: 'solution(-3)', expect: '0', name: 'negative odd' },
      { call: 'solution(-8)', expect: '1', name: 'negative even' },
      { call: 'solution(1)', expect: '0', name: 'one' },
      { call: 'solution(10 ** 18)', expect: '1', name: 'big input', hidden: true }
    ],
    hint: 'N % 2 == 0 tells you if N is even; now turn that answer into 1 or 0.',
    solution: 'def solution(N):\n    if N % 2 == 0:\n        return 1\n    return 0\n',
    walk: 'N % 2 is 0 for every even number, including 0 and negatives. If it is 0 we return 1, otherwise the function falls through to return 0. A shorter way is return 1 if N % 2 == 0 else 0. Remember: read the task; if it says return 1 or 0, do not return a boolean.',
    complexity: 'O(1)' },

  /* ---------------------------------------------------------------- 07 */
  { topic: 'basics',
    id: 'basics-07',
    title: 'A for loop with a running total',
    idea: 'New: for x in A: visits every element of the list, one at a time, and names it x. Keep a running total: start it at 0 before the loop and add x inside the loop. In pandas you would write df["x"].sum(); here you add it up yourself.',
    brief: 'You get a list of numbers A. Return the sum of all its elements. Do it with a for loop and a running total, not with sum(). A may be empty, in which case return 0. A has up to 100,000 elements.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1, 2, 3, 4])', out: '10' },
      { in: 'solution([])', out: '0' }
    ],
    tests: [
      { call: 'solution([1, 2, 3, 4])', expect: '10' },
      { call: 'solution([])', expect: '0', name: 'empty' },
      { call: 'solution([5])', expect: '5', name: 'one element' },
      { call: 'solution([-1, 1, -1, 1])', expect: '0', name: 'negatives' },
      { call: 'solution([0, 0, 0])', expect: '0', name: 'zeros' },
      { call: 'solution(list(range(100000)))', expect: 'sum(range(100000))', name: 'big input', hidden: true },
      { call: 'solution([-1] * 100000)', expect: '-100000', name: 'big negative', hidden: true }
    ],
    hint: 'total = 0 before the loop, total = total + x inside it, return total after it.',
    solution: 'def solution(A):\n    total = 0\n    for x in A:\n        total = total + x\n    return total\n',
    walk: 'total starts at 0. The loop runs once per element and each time adds that element to total. When the list is empty the loop body never runs and total is still 0, so return total is right there too. The return is outside the loop, at the same indent as the for. Remember: total += x is the short way to write total = total + x.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 08 */
  { topic: 'basics',
    id: 'basics-08',
    title: 'range: looping over numbers',
    idea: 'New: range(N) gives the numbers 0, 1, ..., N-1 (N numbers, stopping before N). range(1, N + 1) gives 1, 2, ..., N. A for loop over a range is how you count in plain Python. In pandas you would do np.arange(1, N + 1).sum(); here you loop.',
    brief: 'You get a whole number N of 0 or more. Return 1 + 2 + ... + N using a loop over a range. For N of 0 return 0. N is up to 100,000.',
    fn: 'solution',
    sig: 'def solution(N)',
    starter: 'def solution(N):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(4)', out: '10' },
      { in: 'solution(1)', out: '1' }
    ],
    tests: [
      { call: 'solution(4)', expect: '10' },
      { call: 'solution(1)', expect: '1', name: 'one' },
      { call: 'solution(0)', expect: '0', name: 'zero' },
      { call: 'solution(10)', expect: '55', name: 'ten' },
      { call: 'solution(2)', expect: '3', name: 'two' },
      { call: 'solution(100000)', expect: '100000 * 100001 // 2', name: 'big input', hidden: true }
    ],
    hint: 'for i in range(1, N + 1): adds the numbers 1 up to and including N.',
    solution: 'def solution(N):\n    total = 0\n    for i in range(1, N + 1):\n        total += i\n    return total\n',
    walk: 'range(1, N + 1) starts at 1 and stops just before N + 1, so the last value is N. For N of 0 the range is empty and total stays 0. The classic mistake is range(1, N), which misses N. Remember: the stop value in a range is never included.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 09 */
  { topic: 'basics',
    id: 'basics-09',
    title: 'while: loop until something is true',
    idea: 'New: a while loop keeps going as long as its condition is true. Use it when you do not know in advance how many steps you need. Something inside the loop must change, or it never ends. pandas has nothing like this; it is pure Python.',
    brief: 'You get a whole number N of 0 or more. Keep replacing N with N // 2 until N becomes 0. Return how many steps that took. For example 8 becomes 4, 2, 1, 0, which is 4 steps. For N of 0 return 0. N can be as big as 10 ** 18.',
    fn: 'solution',
    sig: 'def solution(N)',
    starter: 'def solution(N):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(8)', out: '4' },
      { in: 'solution(1)', out: '1' }
    ],
    tests: [
      { call: 'solution(8)', expect: '4' },
      { call: 'solution(1)', expect: '1', name: 'one' },
      { call: 'solution(0)', expect: '0', name: 'zero' },
      { call: 'solution(7)', expect: '3', name: 'odd' },
      { call: 'solution(1024)', expect: '11', name: 'power of two' },
      { call: 'solution(10 ** 18)', expect: 'len(bin(10 ** 18)) - 2', name: 'big input', hidden: true }
    ],
    hint: 'steps = 0, then while N > 0: halve N and add one to steps.',
    solution: 'def solution(N):\n    steps = 0\n    while N > 0:\n        N = N // 2\n        steps += 1\n    return steps\n',
    walk: 'Each pass through the loop halves N (rounding down) and counts one step. When N reaches 0 the condition N > 0 is false and the loop stops. For N of 0 the body never runs. The answer is the number of binary digits of N, which is why even 10 ** 18 needs only 60 steps. Remember: if you forget the line that changes N, the loop runs forever.',
    complexity: 'O(log N)' },

  /* ---------------------------------------------------------------- 10 */
  { topic: 'basics',
    id: 'basics-10',
    title: 'Indexing: first and last',
    idea: 'New: A[0] is the first element and A[-1] is the last. Python counts from 0, and negative positions count from the end. In pandas you used .iloc[0] and .iloc[-1]; a plain list uses square brackets directly.',
    brief: 'You get a list of numbers A with at least one element. Return the first element plus the last element. If A has only one element, that element is both first and last, so return twice its value.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 8, 9, 7, 6])', out: '9' },
      { in: 'solution([5])', out: '10' }
    ],
    tests: [
      { call: 'solution([3, 8, 9, 7, 6])', expect: '9' },
      { call: 'solution([5])', expect: '10', name: 'one element' },
      { call: 'solution([1, 2])', expect: '3', name: 'two elements' },
      { call: 'solution([-4, 0, 4])', expect: '0', name: 'negatives' },
      { call: 'solution([0, 9, 0])', expect: '0', name: 'zeros at the ends' },
      { call: 'solution(list(range(100000)))', expect: '99999', name: 'big input', hidden: true }
    ],
    hint: 'A[0] and A[-1]; no loop needed.',
    solution: 'def solution(A):\n    return A[0] + A[-1]\n',
    walk: 'A[0] reads the box at position 0 and A[-1] reads the last box, however long the list is. With one element both read the same box, so [5] gives 10. Reading one box takes the same time for any list size. Remember: the first element is A[0], not A[1].',
    complexity: 'O(1)' },

  /* ---------------------------------------------------------------- 11 */
  { topic: 'basics',
    id: 'basics-11',
    title: 'len and the last index',
    idea: 'New: len(A) is how many elements A has. Positions run from 0 to len(A) - 1, so the last element is A[len(A) - 1]. A[len(A)] is one past the end and crashes with IndexError. This off-by-one is the most common bug in index loops.',
    brief: 'You get a list of numbers A with at least one element. Return the last element, written with len(A), not with a negative index.',
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
      { call: 'solution([0])', expect: '0', name: 'zero' },
      { call: 'solution(list(range(100000)))', expect: '99999', name: 'big input', hidden: true }
    ],
    hint: 'The last position is one less than the length.',
    solution: 'def solution(A):\n    return A[len(A) - 1]\n',
    walk: 'A list of 5 elements has positions 0, 1, 2, 3, 4. len(A) is 5, so the last position is len(A) - 1, which is 4. Asking for A[5] crashes because there is no box there. A[-1] gives the same answer with less typing, but you need the len(A) - 1 form whenever you loop over positions. Remember: for i in range(len(A)) visits every valid position and never goes past the end.',
    complexity: 'O(1)' },

  /* ---------------------------------------------------------------- 12 */
  { topic: 'basics',
    id: 'basics-12',
    title: 'Slicing',
    idea: 'New: A[start:stop] is a new list from position start up to but not including stop. A[1:-1] drops the first and the last element. A slice never crashes; if there is nothing in the range you get an empty list. It is the same idea as df.iloc[1:-1], and the stop is excluded in both.',
    brief: 'You get a list of numbers A. Return a new list with the first and the last element removed. If A has fewer than three elements, return an empty list.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 8, 9, 7, 6])', out: '[8, 9, 7]' },
      { in: 'solution([1, 2])', out: '[]' }
    ],
    tests: [
      { call: 'solution([3, 8, 9, 7, 6])', expect: '[8, 9, 7]' },
      { call: 'solution([1, 2])', expect: '[]', name: 'two elements' },
      { call: 'solution([1])', expect: '[]', name: 'one element' },
      { call: 'solution([])', expect: '[]', name: 'empty' },
      { call: 'solution([1, 2, 3])', expect: '[2]', name: 'three elements' },
      { call: 'solution([-1, -2, -3, -4])', expect: '[-2, -3]', name: 'negatives' },
      { call: 'solution(list(range(100000)))', expect: 'list(range(1, 99999))', name: 'big input', hidden: true }
    ],
    hint: 'One slice with a start of 1 and a stop of -1.',
    solution: 'def solution(A):\n    return A[1:-1]\n',
    walk: 'A[1:-1] starts at position 1 (skipping the first element) and stops before the last one. For a list of 2 the start and stop meet, so the slice is empty. For a list of 1, or an empty list, the slice is empty too; slicing never raises an error. Remember: a slice is a copy, so A itself is not changed.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 13 */
  { topic: 'basics',
    id: 'basics-13',
    title: 'enumerate: the position and the value together',
    idea: 'New: for i, x in enumerate(A): gives you the position i and the value x at the same time. You need this whenever the answer is a position, not a value. It replaces the clumsy for i in range(len(A)): x = A[i]. Think of it as the index and the value of a Series in one loop.',
    brief: 'You get a list of numbers A and a number X. Return the position of the first element equal to X. If X is not in A, return -1. A may be empty. A has up to 100,000 elements.',
    fn: 'solution',
    sig: 'def solution(A, X)',
    starter: 'def solution(A, X):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([4, 7, 9, 7], 7)', out: '1' },
      { in: 'solution([4, 7, 9], 5)', out: '-1' }
    ],
    tests: [
      { call: 'solution([4, 7, 9, 7], 7)', expect: '1' },
      { call: 'solution([4, 7, 9], 5)', expect: '-1', name: 'not there' },
      { call: 'solution([], 1)', expect: '-1', name: 'empty' },
      { call: 'solution([3], 3)', expect: '0', name: 'one element' },
      { call: 'solution([1, 2, 3], 3)', expect: '2', name: 'last position' },
      { call: 'solution([0, 0, 0], 0)', expect: '0', name: 'first of many' },
      { call: 'solution(list(range(100000)), 99999)', expect: '99999', name: 'big input', hidden: true },
      { call: 'solution(list(range(100000)), -1)', expect: '-1', name: 'big input, missing', hidden: true }
    ],
    hint: 'Loop with enumerate; the moment x == X, return i. After the loop, return -1.',
    solution: 'def solution(A, X):\n    for i, x in enumerate(A):\n        if x == X:\n            return i\n    return -1\n',
    walk: 'enumerate hands out pairs (0, A[0]), (1, A[1]) and so on. The first time the value matches we return its position, which also stops the loop. If the loop finishes without returning, X was never found, and the line after the loop returns -1. Remember: return -1 goes after the loop, not inside the else of the if, or you would give up at the first non-match.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 14 */
  { topic: 'basics',
    id: 'basics-14',
    title: 'Building a list with append',
    idea: 'New: start with an empty list result = [] and add to it with result.append(x). This is how you build a filtered or transformed list in plain Python. In pandas you would write df[df["x"] % 2 == 0]; here you decide element by element.',
    brief: 'You get a list of whole numbers A. Return a new list that holds every even value of A, in the same order. If there are none, return an empty list. A has up to 100,000 elements.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1, 2, 3, 4, 6])', out: '[2, 4, 6]' },
      { in: 'solution([1, 3])', out: '[]' }
    ],
    tests: [
      { call: 'solution([1, 2, 3, 4, 6])', expect: '[2, 4, 6]' },
      { call: 'solution([1, 3])', expect: '[]', name: 'no evens' },
      { call: 'solution([])', expect: '[]', name: 'empty' },
      { call: 'solution([2])', expect: '[2]', name: 'one element' },
      { call: 'solution([0, -2, -3])', expect: '[0, -2]', name: 'zero and negatives' },
      { call: 'solution([4, 4, 1, 4])', expect: '[4, 4, 4]', name: 'repeats' },
      { call: 'solution(list(range(100000)))', expect: 'list(range(0, 100000, 2))', name: 'big input', hidden: true }
    ],
    hint: 'An empty list before the loop, append inside the if, return the list after the loop.',
    solution: 'def solution(A):\n    result = []\n    for x in A:\n        if x % 2 == 0:\n            result.append(x)\n    return result\n',
    walk: 'result starts empty. For every x that passes the even test we append it, so the order of A is kept. append changes the list in place and returns None, so never write result = result.append(x). Remember: the return goes after the loop, otherwise you return after the first element.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 15 */
  { topic: 'basics',
    id: 'basics-15',
    title: 'The same loop as a list comprehension',
    idea: 'New: [x for x in A if x % 2 == 0] builds the same list as the loop in one line. Read it left to right: take x, for each x in A, but only if the test holds. The result is a plain list. It is the closest plain Python gets to a pandas boolean filter.',
    brief: 'The same task as before: return a new list of every even value of A, in order. This time write it as a list comprehension.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # last time: result = [], a for loop, and append\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1, 2, 3, 4, 6])', out: '[2, 4, 6]' },
      { in: 'solution([])', out: '[]' }
    ],
    tests: [
      { call: 'solution([1, 2, 3, 4, 6])', expect: '[2, 4, 6]' },
      { call: 'solution([])', expect: '[]', name: 'empty' },
      { call: 'solution([1, 3, 5])', expect: '[]', name: 'no evens' },
      { call: 'solution([8])', expect: '[8]', name: 'one element' },
      { call: 'solution([-2, -1, 0])', expect: '[-2, 0]', name: 'negatives and zero' },
      { call: 'solution(list(range(100000)))', expect: 'list(range(0, 100000, 2))', name: 'big input', hidden: true }
    ],
    hint: 'Square brackets around: x for x in A if x % 2 == 0.',
    solution: 'def solution(A):\n    return [x for x in A if x % 2 == 0]\n',
    walk: 'The comprehension is the loop from the last lesson folded into one expression. The part before for is what goes into the new list, the if at the end is the filter. You can also transform: [x * 2 for x in A] doubles every element. Remember: a comprehension still visits every element, so it is O(N) like the loop, just shorter.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 16 */
  { topic: 'basics',
    id: 'basics-16',
    title: 'min, max and sum',
    idea: 'New: min(A), max(A) and sum(A) are built in and each walks the list once. min and max crash on an empty list, so check len(A) == 0 first. These are the plain-Python versions of .min(), .max() and .sum() on a Series.',
    brief: 'You get a list of numbers A. Return max(A) - min(A), the gap between the biggest and the smallest value. If A is empty, return 0. A has up to 100,000 elements.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 8, 1, 7])', out: '7' },
      { in: 'solution([])', out: '0' }
    ],
    tests: [
      { call: 'solution([3, 8, 1, 7])', expect: '7' },
      { call: 'solution([])', expect: '0', name: 'empty' },
      { call: 'solution([5])', expect: '0', name: 'one element' },
      { call: 'solution([-3, 3])', expect: '6', name: 'negatives' },
      { call: 'solution([2, 2, 2])', expect: '0', name: 'all equal' },
      { call: 'solution([-10, -4, -7])', expect: '6', name: 'all negative' },
      { call: 'solution(list(range(100000)))', expect: '99999', name: 'big input', hidden: true }
    ],
    hint: 'Handle the empty list with an if first, then one line with max and min.',
    solution: 'def solution(A):\n    if len(A) == 0:\n        return 0\n    return max(A) - min(A)\n',
    walk: 'The if catches the empty list before max is called on it. For one element max and min are the same value, so the gap is 0. max and min each walk the list once, so the whole thing is two passes, which is still O(N). Remember: if not A: is the short way to test for an empty list.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 17 */
  { topic: 'basics',
    id: 'basics-17',
    title: 'sorted() versus .sort()',
    idea: 'New: sorted(A) returns a NEW sorted list and leaves A alone. A.sort() sorts A in place and returns None. Mixing them up is a classic bug: x = A.sort() makes x None. In pandas, df.sort_values() returns a new frame by default; sorted() is the same habit.',
    brief: 'You get a list of numbers A. Return a new list with the same values in increasing order. A itself must not be changed; the tests check that. A has up to 100,000 elements.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 1, 2])', out: '[1, 2, 3]' },
      { in: 'solution([])', out: '[]' }
    ],
    tests: [
      { call: 'solution([3, 1, 2])', expect: '[1, 2, 3]' },
      { call: '(lambda a: (solution(a), a))([3, 1, 2])', expect: '([1, 2, 3], [3, 1, 2])', name: 'original unchanged' },
      { call: 'solution([])', expect: '[]', name: 'empty' },
      { call: 'solution([7])', expect: '[7]', name: 'one element' },
      { call: 'solution([2, -5, 0, -5])', expect: '[-5, -5, 0, 2]', name: 'negatives and repeats' },
      { call: 'solution([1, 2, 3])', expect: '[1, 2, 3]', name: 'already sorted' },
      { call: 'solution(list(range(100000, 0, -1)))', expect: 'list(range(1, 100001))', name: 'big input', hidden: true }
    ],
    hint: 'One built-in call that returns a list; not the method on the list.',
    solution: 'def solution(A):\n    return sorted(A)\n',
    walk: 'sorted(A) builds a fresh list, sorts it and returns it, so the caller still has the original A. If you wrote A.sort() and then return A you would pass the first test but fail the one that checks the original. Sorting costs O(N log N), which is fast enough for 100,000 items. Remember: sorted gives you a value, .sort() gives you None.',
    complexity: 'O(N log N)' },

  /* ---------------------------------------------------------------- 18 */
  { topic: 'basics',
    id: 'basics-18',
    title: 'Looping over a string',
    idea: 'New: a string is a sequence of characters, so for ch in S: visits each character and S[i] reads one. Comparing characters works with ==. In pandas you would write s.str.count("a"); here you walk the string and count.',
    brief: 'You get a string S and a string C of exactly one character. Return how many times C appears in S, using a loop. S may be empty. S has up to 100,000 characters.',
    fn: 'solution',
    sig: 'def solution(S, C)',
    starter: 'def solution(S, C):\n    # your code here\n    pass\n',
    examples: [
      { in: "solution('banana', 'a')", out: '3' },
      { in: "solution('banana', 'z')", out: '0' }
    ],
    tests: [
      { call: "solution('banana', 'a')", expect: '3' },
      { call: "solution('banana', 'z')", expect: '0', name: 'not there' },
      { call: "solution('', 'a')", expect: '0', name: 'empty' },
      { call: "solution('a', 'a')", expect: '1', name: 'one character' },
      { call: "solution('aaaa', 'a')", expect: '4', name: 'all matches' },
      { call: "solution('Aa', 'a')", expect: '1', name: 'case matters' },
      { call: "solution('ab' * 50000, 'a')", expect: '50000', name: 'big input', hidden: true }
    ],
    hint: 'count = 0, then for ch in S: add one when ch == C.',
    solution: 'def solution(S, C):\n    count = 0\n    for ch in S:\n        if ch == C:\n            count += 1\n    return count\n',
    walk: 'The loop looks at every character once and bumps count when it matches. An empty string means the loop body never runs and count stays 0. Upper and lower case are different characters, so A does not match a. Remember: S.count(C) does the same in one call, but knowing the loop is what you need for anything less standard.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 19 */
  { topic: 'basics',
    id: 'basics-19',
    title: 'Numbers to text and back',
    idea: 'New: str(N) turns a number into its digits as text, and int(ch) turns one digit back into a number. Looping over str(N) is the easy way to look at each digit. It is the plain version of s.astype(str) followed by work on the characters.',
    brief: 'You get a whole number N of 0 or more. Return the sum of its digits. For example 493 gives 4 + 9 + 3, which is 16.',
    fn: 'solution',
    sig: 'def solution(N)',
    starter: 'def solution(N):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(493)', out: '16' },
      { in: 'solution(0)', out: '0' }
    ],
    tests: [
      { call: 'solution(493)', expect: '16' },
      { call: 'solution(0)', expect: '0', name: 'zero' },
      { call: 'solution(7)', expect: '7', name: 'one digit' },
      { call: 'solution(1000)', expect: '1', name: 'zeros inside' },
      { call: 'solution(99)', expect: '18', name: 'carry' },
      { call: 'solution(10 ** 18)', expect: '1', name: 'nineteen digits' },
      { call: "solution(int('9' * 4000))", expect: '36000', name: 'big input', hidden: true }
    ],
    hint: 'for ch in str(N): and add int(ch) to a running total.',
    solution: 'def solution(N):\n    total = 0\n    for ch in str(N):\n        total += int(ch)\n    return total\n',
    walk: 'str(493) is the text "493". Looping over it gives the characters "4", "9", "3", and int turns each back into a number so it can be added. Adding the characters without int would glue text together, or crash. Remember: the other way to peel digits is N % 10 for the last digit and N // 10 to drop it, which you now also know.',
    complexity: 'O(number of digits)' },

  /* ---------------------------------------------------------------- 20 */
  { topic: 'basics',
    id: 'basics-20',
    title: 'Counting with a dict',
    idea: 'New: a dict maps keys to values, like {3: 2, 1: 1}. To count, write d[x] = d.get(x, 0) + 1: get returns the current count, or 0 if x is not there yet. This is value_counts() built by hand, and it is the heart of many Codility tasks.',
    brief: 'You get a list of whole numbers A. Return a dict where each distinct value of A is a key and its value is how many times it appears. For an empty list return an empty dict. A has up to 100,000 elements.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 1, 3])', out: '{3: 2, 1: 1}' },
      { in: 'solution([])', out: '{}' }
    ],
    tests: [
      { call: 'solution([3, 1, 3])', expect: '{3: 2, 1: 1}' },
      { call: 'solution([])', expect: '{}', name: 'empty' },
      { call: 'solution([5])', expect: '{5: 1}', name: 'one element' },
      { call: 'solution([2, 2, 2])', expect: '{2: 3}', name: 'all the same' },
      { call: 'solution([-1, 0, -1, 0, 1])', expect: '{-1: 2, 0: 2, 1: 1}', name: 'negatives and zero' },
      { call: 'solution([1, 2, 3])', expect: '{1: 1, 2: 1, 3: 1}', name: 'all distinct' },
      { call: 'solution([i % 100 for i in range(100000)])', expect: '{i: 1000 for i in range(100)}', name: 'big input', hidden: true }
    ],
    hint: 'd = {} before the loop; inside it d[x] = d.get(x, 0) + 1; return d after.',
    solution: 'def solution(A):\n    d = {}\n    for x in A:\n        d[x] = d.get(x, 0) + 1\n    return d\n',
    walk: 'The dict starts empty. For each x, d.get(x, 0) reads the count so far (0 the first time) and we store that plus one back under the key x. Reading and writing a dict key takes about the same time no matter how big the dict is, so counting 100,000 items is one fast pass. Remember: d[x] on a missing key crashes with KeyError; d.get(x, 0) does not.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 21 */
  { topic: 'basics',
    id: 'basics-21',
    title: 'Looping over a dict',
    idea: 'New: for key, count in d.items(): visits every key with its value. Use it to find the best entry by keeping the best so far and updating it when you find something better. It is value_counts().idxmax(), but you decide what happens on ties.',
    brief: 'You get a non-empty list of whole numbers A. Return the value that appears most often. If several values tie for the most, return the smallest of them. A has up to 100,000 elements.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # last time: d[x] = d.get(x, 0) + 1 built the counts\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([3, 1, 3, 2])', out: '3' },
      { in: 'solution([3, 1, 3, 1])', out: '1' }
    ],
    tests: [
      { call: 'solution([3, 1, 3, 2])', expect: '3' },
      { call: 'solution([3, 1, 3, 1])', expect: '1', name: 'tie, smallest wins' },
      { call: 'solution([7])', expect: '7', name: 'one element' },
      { call: 'solution([5, 4, 3])', expect: '3', name: 'all tie' },
      { call: 'solution([-2, -2, 9, 9, 9])', expect: '9', name: 'negatives' },
      { call: 'solution([0, 0, 1])', expect: '0', name: 'zero wins' },
      { call: 'solution(list(range(100000)) + [99999])', expect: '99999', name: 'big input', hidden: true },
      { call: 'solution([i % 100 for i in range(100000)])', expect: '0', name: 'big input, all tie', hidden: true }
    ],
    hint: 'Build the counts, then loop over d.items() and replace the best when count is higher, or equal with a smaller value.',
    solution: 'def solution(A):\n    d = {}\n    for x in A:\n        d[x] = d.get(x, 0) + 1\n    best = None\n    best_count = 0\n    for value, count in d.items():\n        if count > best_count or (count == best_count and value < best):\n            best = value\n            best_count = count\n    return best\n',
    walk: 'First pass: count every value into d. Second pass: walk the dict with .items(). We replace the best when the count is strictly higher, or when it is equal and the value is smaller, which is the tie rule. best starts as None with count 0, so the first entry always wins and we never compare a value with None. Remember: a dict loop visits each distinct value once, so this is still O(N).',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 22 */
  { topic: 'basics',
    id: 'basics-22',
    title: 'set: distinct values and fast membership',
    idea: 'New: set(A) keeps each value once, so len(set(A)) is the number of distinct values. The other big thing about a set: x in some_set is fast, about the same time whatever the size, while x in some_list walks the whole list. This is .nunique() and .isin() in plain Python.',
    brief: 'You get a list of whole numbers A. Return how many distinct values it has. For an empty list return 0. A has up to 100,000 elements.',
    fn: 'solution',
    sig: 'def solution(A)',
    starter: 'def solution(A):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([2, 1, 1, 2, 3, 1])', out: '3' },
      { in: 'solution([])', out: '0' }
    ],
    tests: [
      { call: 'solution([2, 1, 1, 2, 3, 1])', expect: '3' },
      { call: 'solution([])', expect: '0', name: 'empty' },
      { call: 'solution([4])', expect: '1', name: 'one element' },
      { call: 'solution([5, 5, 5, 5])', expect: '1', name: 'all the same' },
      { call: 'solution([-1, 1, 0])', expect: '3', name: 'negatives and zero' },
      { call: 'solution([i % 1000 for i in range(100000)])', expect: '1000', name: 'big input', hidden: true },
      { call: 'solution(list(range(100000)))', expect: '100000', name: 'big input, all distinct', hidden: true }
    ],
    hint: 'Turn the list into a set and take its length.',
    solution: 'def solution(A):\n    return len(set(A))\n',
    walk: 'set(A) throws away repeats, and len counts what is left. Building the set is one pass over A. Keep the second fact in mind for the last lessons: checking x in a set is one quick lookup, checking x in a list means scanning every element, and inside a loop that difference decides whether your code finishes in time. Remember: a set has no order and no duplicates.',
    complexity: 'O(N)' },

  /* ---------------------------------------------------------------- 23 */
  { topic: 'basics',
    id: 'basics-23',
    title: 'Tuples, swapping and unpacking',
    idea: 'New: a, b = b, a swaps two names in one line; Python builds the pair (b, a) and unpacks it. The same unpacking is what happens in for i, x in enumerate(A). A tuple is like a list you cannot change, written with round brackets.',
    brief: 'You get two numbers A and B. Return a list of the two numbers in swapped order: [B, A]. Do it by swapping the names with a, b = b, a and then returning the list.',
    fn: 'solution',
    sig: 'def solution(A, B)',
    starter: 'def solution(A, B):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution(1, 2)', out: '[2, 1]' },
      { in: 'solution(5, 5)', out: '[5, 5]' }
    ],
    tests: [
      { call: 'solution(1, 2)', expect: '[2, 1]' },
      { call: 'solution(5, 5)', expect: '[5, 5]', name: 'equal' },
      { call: 'solution(0, -3)', expect: '[-3, 0]', name: 'zero and negative' },
      { call: 'solution(-1, -2)', expect: '[-2, -1]', name: 'both negative' },
      { call: 'solution(2.5, 1)', expect: '[1, 2.5]', name: 'float' },
      { call: 'solution(10 ** 18, 1)', expect: '[1, 10 ** 18]', name: 'big input', hidden: true }
    ],
    hint: 'A, B = B, A on one line, then return [A, B].',
    solution: 'def solution(A, B):\n    A, B = B, A\n    return [A, B]\n',
    walk: 'The right side B, A is evaluated first into a tuple, then the two values are unpacked into A and B. Without this trick you would need a temporary: tmp = A; A = B; B = tmp. The same unpacking is why for i, x in enumerate(A) works: each item is a two-tuple that is split into i and x. Remember: swapping two list elements is A[i], A[j] = A[j], A[i], which you will use in sorting and rotating tasks.',
    complexity: 'O(1)' },

  /* ---------------------------------------------------------------- 24 */
  { topic: 'basics',
    id: 'basics-24',
    title: 'Nested loops: every pair',
    idea: 'New: a loop inside a loop. for i in range(len(A)): and inside it for j in range(i + 1, len(A)): visits every pair of positions with i < j exactly once. For N items that is about N * N / 2 pairs. This is called O(N squared), and it is the thing Codility punishes.',
    brief: 'You get a list of whole numbers A and a number K. Count the pairs of positions i < j where A[i] + A[j] equals K. Return the count. Use two nested loops. This is O(N squared): with 100,000 items it would be five billion steps and would time out, so there is no big test in this lesson. The next lesson fixes that.',
    fn: 'solution',
    sig: 'def solution(A, K)',
    starter: 'def solution(A, K):\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1, 2, 3, 4], 5)', out: '2' },
      { in: 'solution([2, 2, 2], 4)', out: '3' }
    ],
    tests: [
      { call: 'solution([1, 2, 3, 4], 5)', expect: '2' },
      { call: 'solution([2, 2, 2], 4)', expect: '3', name: 'all equal' },
      { call: 'solution([], 5)', expect: '0', name: 'empty' },
      { call: 'solution([5], 10)', expect: '0', name: 'one element, no pair' },
      { call: 'solution([1, 1, 2], 3)', expect: '2', name: 'repeated value' },
      { call: 'solution([-1, 1, 0], 0)', expect: '1', name: 'negatives' },
      { call: 'solution([1, 2, 3], 10)', expect: '0', name: 'no match' },
      { call: 'solution([1] * 500, 2)', expect: '500 * 499 // 2', name: 'medium input', hidden: true }
    ],
    hint: 'Outer loop over i, inner loop over j starting at i + 1, add one when A[i] + A[j] == K.',
    solution: 'def solution(A, K):\n    count = 0\n    for i in range(len(A)):\n        for j in range(i + 1, len(A)):\n            if A[i] + A[j] == K:\n                count += 1\n    return count\n',
    walk: 'The inner loop starts at i + 1, so each pair is seen once and a position is never paired with itself. For 4 items the inner loop runs 3, 2, 1, 0 times, 6 pairs in all. For 100,000 items that is about 5,000,000,000 checks, far more than the 10 second budget allows. Remember: whenever you write a loop inside a loop over the same list, ask whether the inner loop could be a lookup instead.',
    complexity: 'O(N^2)' },

  /* ---------------------------------------------------------------- 25 */
  { topic: 'basics',
    id: 'basics-25',
    title: 'One pass with a lookup instead of an inner loop',
    idea: 'New: walk the list once and remember what you have seen. For each x, the partner it needs is K - x; instead of searching for it with a second loop, look it up in what you have seen so far. A set answers "have I seen it?"; a dict of counts answers "how many times?". This is the whole game in Codility: replace the inner loop with a lookup.',
    brief: 'The same task: count the pairs of positions i < j with A[i] + A[j] equal to K. This time do it in one pass. Keep a dict of counts of the values seen so far; for each x add the count of K - x to the answer, then record x. A has up to 100,000 elements and the big test would take the nested loops hours.',
    fn: 'solution',
    sig: 'def solution(A, K)',
    starter: 'def solution(A, K):\n    # last time: two loops, one inside the other\n    # this time: one loop, and a dict of what you have seen so far\n    # your code here\n    pass\n',
    examples: [
      { in: 'solution([1, 2, 3, 4], 5)', out: '2' },
      { in: 'solution([2, 2, 2], 4)', out: '3' }
    ],
    tests: [
      { call: 'solution([1, 2, 3, 4], 5)', expect: '2' },
      { call: 'solution([2, 2, 2], 4)', expect: '3', name: 'all equal' },
      { call: 'solution([], 5)', expect: '0', name: 'empty' },
      { call: 'solution([5], 10)', expect: '0', name: 'one element, no pair' },
      { call: 'solution([1, 1, 2], 3)', expect: '2', name: 'repeated value' },
      { call: 'solution([-1, 1, 0], 0)', expect: '1', name: 'negatives' },
      { call: 'solution([1, 2, 3], 10)', expect: '0', name: 'no match' },
      { call: 'solution([1] * 100000, 2)', expect: '100000 * 99999 // 2', name: 'big input', hidden: true },
      { call: 'solution([i % 1000 for i in range(100000)], 999)', expect: '500 * 100 * 100', name: 'big input, mixed', hidden: true },
      { call: 'solution(list(range(100000)), -1)', expect: '0', name: 'big input, no pairs', hidden: true }
    ],
    hint: 'seen = {} and count = 0; for each x: count += seen.get(K - x, 0), then seen[x] = seen.get(x, 0) + 1.',
    solution: 'def solution(A, K):\n    seen = {}\n    count = 0\n    for x in A:\n        count += seen.get(K - x, 0)\n        seen[x] = seen.get(x, 0) + 1\n    return count\n',
    walk: 'When we reach x, every earlier element is already in seen. Each earlier copy of K - x forms one pair with x, so adding seen.get(K - x, 0) counts exactly the pairs where x is the later element. Then we record x so later elements can pair with it. Looking up and updating a dict key takes about the same time whatever its size, so 100,000 items take 100,000 steps instead of five billion. Remember: a nested loop asks "is there a partner?" by searching; a set or dict answers it by lookup. Spotting that swap is most of Codility.',
    complexity: 'O(N)' }

  );
})();
