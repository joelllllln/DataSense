# Simple Codility notes — content spec

Same file shape as ../SPEC.md (window.STUDY.push({topic, name, tagline, cards:[...]})), same card types
(info / quiz / predict, choices[0] correct), but MUCH simpler and shorter. These are read on an iPhone.

Hard rules (the validator enforces them):
- 13–18 cards per topic. 10–13 info, 3–5 checks (quiz or predict). Last card is the Cheat sheet info card
  (title exactly 'Cheat sheet'), and the card before it is a quiz.
- info body: max 40 words. Every sentence max 12 words. One idea per card. No semicolons, no brackets.
- info title: max 6 words, plain words (e.g. 'Slide the window', not 'Fixed window: slide, do not re-sum').
- code: optional, max 6 lines, max 44 characters per line, real Python. Prefer 3–5 lines. Add a short
  comment only when it helps.
- quiz: question max 16 words, 3 choices, each max 8 words. why: max 15 words.
- predict: code max 5 lines, prints one simple value. why: max 15 words.
- Words: say 'list' not 'array', 'number' not 'integer', 'fast enough' / 'too slow' not 'O(n)' except in ONE
  card per topic that explains speed as 'steps' (e.g. 'A loop inside a loop on 100,000 numbers is 10 billion
  steps. Too slow.'). No 'iterate', 'invariant', 'amortised', 'monotonic'. If a word needs explaining, that IS the card.
- Content: the topic's core trick, the pattern code, the one trap, then each real Codility task of the topic in
  ONE card: what it asks in one line + the trick in one line + code (max 6 lines). Skip side tasks.
- Checks test the trick, not trivia.
- Cheat sheet body: 4–7 short lines, one pattern each, written as 'Problem → trick'.
- Single-quoted JS strings; escape ' as \'. ASCII code. No emoji.
- Validate: node codility/study/validate.js --simple codility/study/simple/data_<topic>.js  until OK.
