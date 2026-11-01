/* Codility study cards - topic "stack" (Stacks & queues).
   Teaching side of codility/data_stack.js: same ladder, same names, same order. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'stack',
    name: 'Stacks & queues',
    tagline: 'A list used from one end remembers what is still open, so brackets, fish and walls become one pass.',
    cards: [
      { type: 'info', title: 'A list is a stack: push with append',
        body: 'A stack is a pile. You add to the top and take from the top.\nIn Python a plain list is a stack. `stack.append(x)` puts x on top, at the end of the list.\nThat is O(1).',
        code: 'def solution(A):\n    stack = []\n    for x in A:\n        stack.append(x)\n    return stack' },

      { type: 'info', title: 'pop() takes the top',
        body: '`stack.pop()` with no argument removes the LAST item and gives it back.\nLast in, first out (LIFO).\n`pop()` is O(1). `pop(0)` is not: it shifts the whole list.',
        code: 'def solution(A):\n    stack = []\n    for x in A:\n        stack.append(x)\n    return stack.pop()' },

      { type: 'predict', code: 'stack = []\nfor x in [1, 2, 3]:\n    stack.append(x)\nprint(stack.pop(), stack)', q: 'What prints?',
        choices: ['3 [1, 2]', '1 [2, 3]', '3 [1, 2, 3]', '[1, 2] 3'],
        why: 'pop() removes and returns the last item, 3; the list keeps [1, 2].' },

      { type: 'info', title: 'Peek: stack[-1], but check empty first',
        body: '`stack[-1]` reads the top without removing it.\nAn empty list has no `[-1]`: that raises IndexError.\nSo guard it: `if not stack: return -1`.',
        code: 'def solution(A):\n    if not A:\n        return -1\n    return A[-1]' },

      { type: 'info', title: 'Replay commands, and guard the pop',
        body: 'Simulate: split each command string into words. `int()` turns the text "3" into the number 3.\nTrap: `pop()` on an empty list crashes.\n`if stack:` is True only when the list has items, so pop only then.',
        code: 'stack = []\nfor cmd in A:\n    parts = cmd.split()\n    if parts[0] == "push":\n        stack.append(int(parts[1]))\n    elif stack:\n        stack.pop()\nreturn stack' },

      { type: 'predict', code: 'stack = []\nfor cmd in ["push 2", "pop", "pop", "push 5"]:\n    parts = cmd.split()\n    if parts[0] == "push":\n        stack.append(int(parts[1]))\n    elif stack:\n        stack.pop()\nprint(stack)', q: 'What prints?',
        choices: ['[5]', '[2, 5]', 'an error', '[]'],
        why: 'push 2, pop it, the second pop is skipped because the stack is empty, then push 5.' },

      { type: 'info', title: 'Brackets of one kind: count the balance',
        body: 'You do not always need to store the items.\nFor "(" and ")" one number is enough: add 1 for "(", subtract 1 for ")".\nThat number is the balance: how many brackets are open right now.',
        code: 'balance = 0\nfor c in S:\n    if c == "(":\n        balance += 1\n    else:\n        balance -= 1' },

      { type: 'info', title: 'The balance must never go below zero',
        body: 'Watch the balance as you go, not only at the end.\nIf it ever drops below zero, a ")" came before its "(". Fail at once.\nAt the end it must be exactly zero.',
        code: '        balance -= 1\n        if balance < 0:\n            return False\nreturn balance == 0' },

      { type: 'info', title: 'Nesting: the balance, returning 1 or 0',
        body: 'Codility task Nesting: S has only "(" and ")", length up to 1,000,000. Return 1 if properly nested, else 0.\nKey insight: it is the balance check from the last card.\nTrap: Codility wants 1 and 0, not True and False.',
        code: 'def solution(S):\n    balance = 0\n    for c in S:\n        balance += 1 if c == "(" else -1\n        if balance < 0:\n            return 0\n    return 1 if balance == 0 else 0' },

      { type: 'quiz', q: 'S = "())(" ends with balance 0. What does Nesting return?',
        choices: ['0: the balance drops to -1 at the third character', '1: the final balance is 0', '0: the length is odd', 'It depends on the stack size'],
        why: 'Going below zero at any point means a ")" has no "(" before it, so it fails early.' },

      { type: 'info', title: 'Nesting with a real stack',
        body: 'Same task with a list. Push on "(", pop on ")".\nA ")" with nothing to pop means failure.\nAfter the loop: `return 1 if not stack else 0`, because leftovers mean failure too.\nThis is the version that grows to three bracket kinds.',
        code: 'stack = []\nfor c in S:\n    if c == "(":\n        stack.append(c)\n    elif not stack:\n        return 0          # nothing to close\n    else:\n        stack.pop()' },

      { type: 'info', title: 'Match a closer to its opener',
        body: 'A dict maps each closing bracket to its opener.\n`pair[c]` is one fast step.\n`c in pair` tells you whether c is a closer at all; anything else is an opener.',
        code: 'pair = {")": "(", "]": "[", "}": "{"}\nif c in pair:      # c is a closer\n    opener = pair[c]' },

      { type: 'info', title: 'Brackets: three kinds, one stack',
        body: 'Codility task Brackets: S has ( ) [ ] { }, length up to 200,000.\nKey insight: push every opener. For a closer, the top must be its matching opener; pop it.\nReturn 0 on: empty stack at a closer, wrong top, or leftovers at the end (`return 1 if not stack else 0`).',
        code: 'pair = {")": "(", "]": "[", "}": "{"}\nstack = []\nfor c in S:\n    if c in pair:\n        if not stack or stack.pop() != pair[c]:\n            return 0\n    else:\n        stack.append(c)' },

      { type: 'predict', code: 'pair = {")": "(", "]": "[", "}": "{"}\nstack = ["(", "["]\nc = ")"\nprint(stack.pop() == pair[c])', q: 'What prints?',
        choices: ['False', 'True', '[', 'an error'],
        why: 'The top is "[" but ")" needs "(", so the comparison is False and Brackets would return 0.' },

      { type: 'quiz', q: 'Brackets: S = "(()" is scanned fully with no mismatch. What is returned?',
        choices: ['0: one "(" is left on the stack', '1: nothing mismatched', '0: S is too short', '1: leftovers are ignored'],
        why: 'Every opener must be closed, so a non-empty stack at the end means 0.' },

      { type: 'info', title: 'Fish: who eats whom',
        body: 'Fish i has size `A[i]` and direction `B[i]`: 1 downstream, 0 upstream.\nA downstream fish meets every upstream fish later in the line. The bigger one eats the smaller. All sizes differ.\nWith two fish that meet, the larger survives. With many, you need a stack.',
        code: 'def solution(A, B):   # two fish, B = [1, 0]\n    return 0 if A[0] > A[1] else 1' },

      { type: 'info', title: 'Fish: a stack of downstream sizes',
        body: 'Codility task Fish, N up to 100,000.\nKey insight: keep a stack of sizes of fish swimming downstream.\nWhen an upstream fish arrives it eats from the top while it is bigger.\nIf the stack empties, it survives. Answer: `alive + len(down)`.',
        code: 'down, alive = [], 0\nfor size, d in zip(A, B):\n    if d == 1:\n        down.append(size)\n    else:\n        while down and down[-1] < size:\n            down.pop()\n        if not down: alive += 1' },

      { type: 'quiz', q: 'Fish: an upstream fish arrives and the downstream stack is empty. What happens?',
        choices: ['It survives: add 1 to alive', 'It is eaten by the next fish', 'Push it onto the stack', 'Return 0'],
        why: 'Nothing ahead of it is swimming towards it, so it never meets another fish.' },

      { type: 'info', title: 'StoneWall: counting ups is not enough',
        body: 'Wall heights `H`, built from rectangular blocks. Fewest blocks?\nWarm-up: count positions where `H[i] > H[i - 1]`. Every rise needs a new block.\nBut it misses the first block and every new lower height, so it undercounts.\nYou must remember which heights are still open.',
        code: 'for i in range(1, len(H)):\n    if H[i] > H[i - 1]:\n        ups += 1' },

      { type: 'info', title: 'StoneWall: a stack of open blocks',
        body: 'Codility task StoneWall, N up to 100,000.\nKey insight: keep a stack of block heights still open (they could extend right).\nFor each height h: pop every block taller than h; it must end here.\nIf the top is not h, start a new block of height h and count it.',
        code: 'stack, blocks = [], 0\nfor h in H:\n    while stack and stack[-1] > h:\n        stack.pop()\n    if not stack or stack[-1] != h:\n        stack.append(h)\n        blocks += 1\nreturn blocks' },

      { type: 'predict', code: 'stack, blocks = [], 0\nfor h in [8, 8, 5, 7, 5]:\n    while stack and stack[-1] > h:\n        stack.pop()\n    if not stack or stack[-1] != h:\n        stack.append(h)\n        blocks += 1\nprint(blocks)', q: 'What prints?',
        choices: ['3', '4', '5', '2'],
        why: 'Blocks start at 8, 5 and 7. The second 8 reuses the top; the last 5 pops 7 and finds 5 already open.' },

      { type: 'info', title: 'A queue is FIFO: use deque',
        body: 'A queue is first in, first out, like a line at a shop.\nTrap: `list.pop(0)` shifts every item, O(N) per pop, and times out.\nUse `collections.deque`: `append` at the back, `popleft` from the front, both O(1).',
        code: 'from collections import deque\nq = deque()\nq.append(5)           # join at the back\nfront = q.popleft()   # serve the oldest' },

      { type: 'quiz', q: 'You must remove the oldest item 100,000 times. Which call?',
        choices: ['deque.popleft()', 'list.pop(0)', 'list.pop()', 'list.remove(0)'],
        why: 'popleft is O(1); pop(0) shifts the whole list every time.' },

      { type: 'info', title: 'Next greater element: a waiting stack of indexes',
        body: 'For each position, the first bigger value to its right.\nKey insight: keep a stack of indexes still waiting for an answer.\nA bigger value answers every waiting index with a smaller value: pop them, fill in.\nDays until warmer is the same; store the distance `i - j` instead.',
        code: 'def solution(A):\n    result = [-1] * len(A)\n    stack = []\n    for i in range(len(A)):\n        while stack and A[stack[-1]] < A[i]:\n            result[stack.pop()] = A[i]\n        stack.append(i)\n    return result' },

      { type: 'predict', code: 'A = [2, 5, 3, 7]\nresult, stack = [-1] * 4, []\nfor i in range(4):\n    while stack and A[stack[-1]] < A[i]:\n        result[stack.pop()] = A[i]\n    stack.append(i)\nprint(result)', q: 'What prints?',
        choices: ['[5, 7, 7, -1]', '[5, 7, 7, 7]', '[5, 3, 7, -1]', '[-1, 2, 5, 3]'],
        why: '5 answers 2; 7 answers both 5 and 3; nothing is right of 7.' },

      { type: 'info', title: 'Remove adjacent duplicates: build the answer on the stack',
        body: 'For each letter: if it equals the top, pop (the pair cancels); otherwise push.\nCancelling can expose a new pair, and the stack handles that for free.\nThe stack at the end IS the answer: `"".join(stack)`.',
        code: 'def solution(S):\n    stack = []\n    for c in S:\n        if stack and stack[-1] == c:\n            stack.pop()\n        else:\n            stack.append(c)\n    return "".join(stack)' },

      { type: 'predict', code: 'stack = []\nfor c in "abbaca":\n    if stack and stack[-1] == c:\n        stack.pop()\n    else:\n        stack.append(c)\nprint("".join(stack))', q: 'What prints?',
        choices: ['ca', 'aaca', 'abbaca', 'c'],
        why: '"bb" cancels, which exposes "aa", which cancels; "ca" remains.' },

      { type: 'info', title: 'Reverse Polish: a stack of numbers',
        body: 'Tokens like ["2", "1", "+", "3", "*"] mean (2 + 1) * 3.\nPush a number. An operator pops two, applies, pushes the result. The first pop is the RIGHT-hand side.\nTraps: test `tok in ("+", "-", "*", "/")`, not `tok in "+-*/"`, because "-3" is a number. Division truncates towards zero, unlike `//`.',
        code: 'b = stack.pop()\na = stack.pop()\nif tok == "+": stack.append(a + b)\nelif tok == "-": stack.append(a - b)\nelif tok == "*": stack.append(a * b)\nelse:   # "/" truncates towards zero\n    q = abs(a) // abs(b)\n    stack.append(-q if (a < 0) != (b < 0) else q)' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Stack: `append`, `pop()`, `stack[-1]`, guard `if stack:`\nNesting: balance never below 0, ends at 0\nBrackets: dict closer to opener; push openers, pop on closers, end empty\nFish: stack of downstream sizes; upstream pops while bigger\nStoneWall: stack of open heights; pop taller, count new tops\nQueue: `deque.popleft()`\nNext greater: waiting stack of indexes\nDuplicates: pop if equal else push' },

      { type: 'quiz', q: 'Which pattern: "for each day, how many days until a strictly higher price"?',
        choices: ['Waiting stack of indexes; pop when a bigger value arrives', 'Balance counter, never below zero', 'deque with popleft', 'Push every value, pop once'],
        why: 'It is next greater element with a distance: pop each waiting index j and store i - j.' }
    ]
  });
})();
