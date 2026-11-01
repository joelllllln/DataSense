# Codility study cards — content spec

One file per topic: `codility/study/data_<topic>.js`, pushing onto `window.STUDY`.
This is the TEACHING side (read + quick checks). The coding practice lives in `codility/data_<topic>.js`
(read that file first: your cards must teach the same ideas, in the same order, using the same names).

```js
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'window',                      // same topic id as the trainer
    name: 'Sliding window',
    tagline: 'One sentence: what this topic is for.',
    cards: [
      { type: 'info', title: 'Fixed window: slide, do not re-sum',
        body: 'Max 60 words. Short sentences. One idea. Use `code` for names. Use a new line between points.',
        code: 'cur = sum(A[:K])\nbest = cur\nfor i in range(K, len(A)):\n    cur += A[i] - A[i - K]\n    best = max(best, cur)' },   // code optional, max 8 lines
      { type: 'quiz', q: 'A window of length K slides one step right. What changes?',
        choices: ['Add the new right value, subtract the old left value', 'Re-sum the whole window', 'Add the new right value only', 'Nothing until the end'],
        why: 'One line: why the first choice is right.' },
      { type: 'predict', code: 'A = [1, 2, 3, 4]\nK = 2\nprint(sum(A[:K]))', q: 'What prints?',
        choices: ['3', '1', '6', '10'], why: 'A[:2] is [1, 2].' }
    ]
  });
})();
```

## Rules
- **choices[0] is always the correct one.** The app shuffles. 3–4 choices, each short, no "all of the above".
- 22–30 cards per topic. Roughly: 60% info, 25% quiz, 15% predict. Never two quizzes in a row at the start; a check should come right after the info it tests.
- Card order = the topic's ladder: the core idea → the pattern code → the trap → each real Codility task (one card: the task in one line + the key insight; one card: the pattern code; one check).
- Every real task of the topic gets covered by name (BinaryGap, CyclicRotation, …). Include the input limits only when they matter for the complexity.
- Each info card has ONE title and ONE idea. Max 60 words in body. Code max 8 lines, real Python, Codility style (`def solution(A)`).
- Plain English. Short sentences. No jargon without a 3-word gloss. The learner knows pandas well and plain Python a little.
- Traps to include where true: off-by-one, empty input, 1/0 not True/False, overflow is not a Python problem, O(n²) hidden in `in` on a list, `sorted()` vs `.sort()`, negatives in `%` and `//`.
- End each topic with 1 `info` card titled 'Cheat sheet' whose body lists the patterns of the topic as short lines (one per line), and 1 final quiz that asks which pattern fits a one-line problem.
- Single-quoted JS strings; escape `'` as `\'`. No emoji.
- Run `node codility/study/validate.js codility/study/data_<topic>.js` until it prints OK.
