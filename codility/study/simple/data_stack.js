/* Simple Codility notes - topic "stack" (Stacks & queues).
   Short phone-sized version of codility/study/data_stack.js: same ideas, same order, fewer words. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'stack',
    name: 'Stacks & queues',
    tagline: 'A list used from one end remembers what is still open. Brackets, fish and walls become one pass.',
    cards: [
      { type: 'info', title: 'A list is a stack',
        body: 'A stack is a pile of plates.\nYou add on top and take from the top.\nIn Python a plain list is a stack.\n`append` adds to the end.\n`pop()` removes the last item and gives it back.',
        code: 'stack = []\nstack.append(1)\nstack.append(2)\ntop = stack.pop()  # 2, stack is [1]' },

      { type: 'predict', code: 'stack = []\nfor x in [1, 2, 3]:\n    stack.append(x)\nprint(stack.pop(), stack)', q: 'What prints?',
        choices: ['3 [1, 2]', '1 [2, 3]', '3 [1, 2, 3]'],
        why: 'pop() removes and returns the last item. The list keeps [1, 2].' },

      { type: 'info', title: 'Trap: an empty stack crashes',
        body: '`stack[-1]` reads the top without removing it.\nBut an empty list has no top.\n`stack[-1]` and `stack.pop()` both crash when empty.\nSo check first.\n`if stack:` is true only when it has items.',
        code: 'if stack:\n    top = stack[-1]\nwhile stack and stack[-1] > x:\n    stack.pop()' },

      { type: 'info', title: 'A queue uses deque',
        body: 'A queue is a line at a shop.\nFirst in, first out.\nTrap: `list.pop(0)` moves every item along. Too slow.\nUse `deque`. `append` joins at the back.\n`popleft` serves the front. Both are one step.',
        code: 'from collections import deque\nq = deque()\nq.append(5)          # join the back\nfront = q.popleft()  # serve the front' },

      { type: 'info', title: 'A stack remembers open things',
        body: 'A stack remembers what is still open.\nPush when something opens.\nPop when it closes.\nEach item goes on once, off once.\n100,000 items: about 200,000 steps. Fast enough.\nA loop in a loop is 10 billion. Too slow.' },

      { type: 'info', title: 'Nesting: count the balance',
        body: 'Nesting asks: is a string of `(` and `)` nested right?\nTrick: one number is enough.\nAdd 1 for `(`, take 1 for `)`.\nNever below zero, and zero at the end.\nReturn 1 or 0, not True or False.',
        code: 'def solution(S):\n    bal = 0\n    for c in S:\n        bal += 1 if c == "(" else -1\n        if bal < 0: return 0\n    return 1 if bal == 0 else 0' },

      { type: 'quiz', q: 'S = "())(" ends with balance 0. What does Nesting return?',
        choices: ['0, balance dropped below zero', '1, final balance is 0', '0, length is odd'],
        why: 'At the third character the balance is -1, so fail early.' },

      { type: 'info', title: 'Match a closer to its opener',
        body: 'With three bracket kinds, one number is not enough.\nYou must know which opener is waiting.\nA dict maps each closer to its opener.\n`c in pair` means c is a closer.\nAnything else is an opener.',
        code: 'pair = {")": "(", "]": "[", "}": "{"}\nif c in pair:\n    need = pair[c]  # the matching opener' },

      { type: 'info', title: 'Brackets: push openers, pop closers',
        body: 'Brackets asks: is a string of `()[]{}` nested right?\nTrick: push every opener.\nAt a closer, pop. It must match.\nEmpty stack at a closer means 0.\nLeftovers at the end mean 0.\n`pair` is the dict above.',
        code: 'stack = []\nfor c in S:\n    if c not in pair: stack.append(c)\n    elif not stack: return 0\n    elif stack.pop() != pair[c]: return 0\nreturn 1 if not stack else 0' },

      { type: 'predict', code: 'pair = {")": "(", "]": "[", "}": "{"}\nstack = ["(", "["]\nprint(stack.pop() == pair[")"])', q: 'What prints?',
        choices: ['False', 'True', 'an error'],
        why: 'The top is "[" but ")" needs "(". Brackets returns 0.' },

      { type: 'info', title: 'Fish: who meets whom',
        body: 'Fish swim in a river, in a line.\nA fish going down meets every upstream fish after it.\nWhen two meet, the bigger eats the smaller.\nAll sizes differ.\nTwo fish? Compare sizes. Many fish? Use a stack.' },

      { type: 'info', title: 'Fish: stack the downstream sizes',
        body: 'Fish asks: how many fish survive?\nSize `A[i]`, direction `B[i]`: 1 down, 0 up.\nTrick: stack the sizes of fish going down.\nAn upstream fish eats smaller ones off the top.\nEmpty stack? It lives. Answer `alive + len(st)`.',
        code: 'st, alive = [], 0\nfor s, d in zip(A, B):\n    if d == 1: st.append(s)\n    else:\n        while st and st[-1] < s: st.pop()\n        if not st: alive += 1' },

      { type: 'quiz', q: 'Fish: an upstream fish arrives and the stack is empty. What happens?',
        choices: ['It survives, add 1', 'The next fish eats it', 'Push it on the stack'],
        why: 'No fish ahead swims towards it, so it never meets one.' },

      { type: 'info', title: 'StoneWall: stack of open blocks',
        body: 'StoneWall asks: fewest blocks for a wall of heights `H`.\nTrick: stack the heights of open blocks.\nAt height h, pop every taller block.\nA taller block cannot go on.\nTop not h? Start a new block, count it.',
        code: 'st, blocks = [], 0\nfor h in H:\n    while st and st[-1] > h: st.pop()\n    if not st or st[-1] != h:\n        st.append(h)\n        blocks += 1' },

      { type: 'quiz', q: 'StoneWall: heights [8, 8, 5, 7, 5]. How many blocks?',
        choices: ['3', '4', '5'],
        why: 'Blocks start at 8, 5 and 7. The last 5 reuses the open 5.' },

      { type: 'info', title: 'Cheat sheet',
        body: 'Top → `stack[-1]`, guard empty\nOldest first → `deque.popleft()`\nNesting → balance never below 0, ends 0\nBrackets → push openers, pop must match\nFish → stack down sizes, up pops smaller\nStoneWall → pop taller, count new tops' }
    ]
  });
})();
