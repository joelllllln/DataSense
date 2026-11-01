/* Codility study cards - topic "sort" (Sorting & sets).
   Teaching side of codility/data_sort.js: same ladder, same names, same order. */
(function () {
  window.STUDY = window.STUDY || [];
  window.STUDY.push({
    topic: 'sort',
    name: 'Sorting & sets',
    tagline: 'Sort once, then read answers off positions and neighbours; use a set when you only care which values exist.',
    cards: [
      { type: 'info', title: 'sorted() gives a new list',
        body: 'Python sorts for you.\n`sorted(A)` returns a NEW list, smallest first, and leaves `A` untouched.\nIt is O(N log N): fast enough for 100,000 values.\nMost tasks in this topic start with this one line.',
        code: 'def solution(A):\n    return sorted(A)' },

      { type: 'info', title: 'Trap: .sort() returns None',
        body: '`A.sort()` sorts `A` in place and returns `None`.\nSo `return A.sort()` returns nothing, and `B = A.sort()` makes `B` equal to `None`.\nRule: `sorted(A)` when you want a copy. `A.sort()` on its own line when you want `A` itself changed.',
        code: 'A = [3, 1, 2]\nS = sorted(A)   # S is [1, 2, 3], A unchanged\nA.sort()        # A is now [1, 2, 3]\nB = A.sort()    # B is None' },

      { type: 'predict', code: 'A = [3, 1, 2]\nB = A.sort()\nprint(B)', q: 'What prints?',
        choices: ['None', '[1, 2, 3]', '[3, 1, 2]', 'an error'],
        why: '.sort() sorts A in place and returns None, so B is None.' },

      { type: 'info', title: 'Descending: reverse=True',
        body: '`sorted(A, reverse=True)` sorts biggest first.\nNo need to sort and then flip the list.',
        code: 'def solution(A):\n    return sorted(A, reverse=True)' },

      { type: 'info', title: 'After sorting, position is rank',
        body: 'In a sorted list the index tells you the rank.\n`S[0]` is the smallest, `S[1]` the second smallest.\n`S[-1]` is the biggest, `S[-2]` the second biggest.\nA slice gives several ranks at once: `sorted(A, reverse=True)[:2]` is the top two.',
        code: 'def solution(A):\n    return sorted(A)[1]   # second smallest' },

      { type: 'predict', code: 'print(sorted([5, 1, 4, 2], reverse=True)[:2])', q: 'What prints?',
        choices: ['[5, 4]', '[1, 2]', '[5, 1]', '[4, 5]'],
        why: 'Descending order is [5, 4, 2, 1]; the first two are 5 and 4.' },

      { type: 'info', title: 'Distinct: a set keeps each value once',
        body: 'Codility task Distinct: how many different values are in `A`?\n`set(A)` throws away duplicates. `len(set(A))` is the answer.\nAn empty list gives 0 for free.\nO(N), one line.',
        code: 'def solution(A):\n    return len(set(A))' },

      { type: 'info', title: 'Distinct by sorting: look at neighbours',
        body: 'The same task without a set.\nAfter sorting, equal values sit side by side.\nA new value starts exactly where `A[i] != A[i - 1]`.\nCount those changes, plus 1 for the first value. Guard the empty list first.',
        code: 'def solution(A):\n    if not A: return 0\n    A = sorted(A)\n    count = 1\n    for i in range(1, len(A)):\n        if A[i] != A[i - 1]:\n            count += 1\n    return count' },

      { type: 'quiz', q: 'A is sorted. Where do two equal values always end up?',
        choices: ['Right next to each other', 'At the two ends of the list', 'At the start of the list', 'Anywhere; sorting ignores duplicates'],
        why: 'Sorting groups equal values together, so one neighbour check finds every duplicate.' },

      { type: 'info', title: 'Same neighbour check, new questions',
        body: 'The neighbour test answers more than counting.\nAny duplicate? Return `True` at the first `A[i] == A[i - 1]`.\nSmallest repeated value? Sorting also puts small values first, so return `A[i]` at that first equal pair, or -1 if there is none.',
        code: 'def solution(A):\n    A = sorted(A)\n    for i in range(1, len(A)):\n        if A[i] == A[i - 1]:\n            return A[i]\n    return -1' },

      { type: 'info', title: 'Three largest: negative indexes',
        body: 'Product of the three largest positive values.\nSort ascending, then read from the end: `S[-1] * S[-2] * S[-3]`.\nPython integers never overflow, so big products are safe.',
        code: 'def solution(A):\n    S = sorted(A)\n    return S[-1] * S[-2] * S[-3]' },

      { type: 'info', title: 'MaxProductOfThree: the two-negatives trap',
        body: 'Codility task MaxProductOfThree: biggest product of any three values, negatives allowed.\nTwo negatives multiply to a positive. So the two smallest (most negative) values times the biggest can beat the top three.\nOnly two triples matter. Compute both, return the max.',
        code: 'def solution(A):\n    S = sorted(A)\n    top_three = S[-1] * S[-2] * S[-3]\n    two_negatives = S[0] * S[1] * S[-1]\n    return max(top_three, two_negatives)' },

      { type: 'predict', code: 'S = sorted([-10, -10, 1, 2, 3])\nprint(max(S[-1] * S[-2] * S[-3], S[0] * S[1] * S[-1]))', q: 'What prints?',
        choices: ['300', '6', '-300', '200'],
        why: 'Top three give 3 * 2 * 1 = 6; the two negatives times the biggest give -10 * -10 * 3 = 300.' },

      { type: 'info', title: 'Triangle test: three checks',
        body: 'Three lengths a, b, c form a triangle when every pair adds up to more than the third:\n`a + b > c`, `a + c > b`, `b + c > a`.\nZero or negative sides never pass.\nValues go up to 2,147,483,647, but Python sums never overflow.',
        code: 'def solution(A):\n    a, b, c = A\n    if a + b > c and a + c > b and b + c > a:\n        return 1\n    return 0' },

      { type: 'info', title: 'Sort first, check once',
        body: 'Sort the three sides so `a <= b <= c`.\nNow `a + c > b` and `b + c > a` are automatic, because `c` is the longest.\nOnly `a + b > c` can fail.\nSorting turns three checks into one.',
        code: 'def solution(A):\n    a, b, c = sorted(A)\n    return 1 if a + b > c else 0' },

      { type: 'info', title: 'Triangle: after sorting, check neighbours',
        body: 'Codility task Triangle: does ANY triple in `A` form a triangle? N up to 100,000.\nKey insight: if a triangle exists, three NEIGHBOURS in the sorted list form one. Sides closer in size make `a + b > c` easier, never harder.\nSo test `A[i] + A[i + 1] > A[i + 2]` for every i. O(N log N).',
        code: 'def solution(A):\n    A = sorted(A)\n    for i in range(len(A) - 2):\n        if A[i] + A[i + 1] > A[i + 2]:\n            return 1\n    return 0' },

      { type: 'quiz', q: 'Triangle: A is sorted. Which triples do you test?',
        choices: ['Every three neighbours: A[i], A[i + 1], A[i + 2]', 'Every possible triple', 'Only the three biggest values', 'Only the three smallest values'],
        why: 'If any triangle exists, some three neighbours in sorted order form one, so neighbours are enough.' },

      { type: 'info', title: 'Sort by a key, break ties with a tuple',
        body: '`sorted(A, key=lambda p: p[1])` compares items by their second field but returns the whole items.\nTies keep their original order (a stable sort).\nTo break ties, return a tuple: `key=lambda p: (p[1], p[0])` sorts by age, then by name.',
        code: 'def solution(A):   # A is [[name, age], ...]\n    ordered = sorted(A, key=lambda p: (p[1], p[0]))\n    return [p[0] for p in ordered]' },

      { type: 'predict', code: 'people = [["Al", 30], ["Bo", 25], ["Cy", 30]]\nprint([p[0] for p in sorted(people, key=lambda p: p[1])])', q: 'What prints?',
        choices: ['[\'Bo\', \'Al\', \'Cy\']', '[\'Al\', \'Bo\', \'Cy\']', '[\'Bo\', \'Cy\', \'Al\']', '[25, 30, 30]'],
        why: 'Sorted by age; Al and Cy tie at 30 and keep their original order.' },

      { type: 'info', title: 'Discs: the slow way first',
        body: 'Disc i sits at position i with radius `A[i]`, so it covers `i - A[i]` to `i + A[i]`.\nTwo ranges overlap when neither ends before the other starts: `l2 <= r1 and l1 <= r2`.\nChecking every pair is O(N squared): fine for 300 discs, hopeless for 100,000.',
        code: 'for i in range(n):\n    for j in range(i + 1, n):\n        if j - A[j] <= i + A[i] and i - A[i] <= j + A[j]:\n            count += 1' },

      { type: 'info', title: 'NumberOfDiscIntersections: sweep the sorted endpoints',
        body: 'Codility task NumberOfDiscIntersections: count overlapping pairs, N up to 100,000.\nKey insight: sort the left ends and the right ends separately.\nWalk the right ends in order. At the k-th right end, count discs that have started (left end <= it), then subtract the k + 1 discs already closed, this one included.',
        code: 'lefts = sorted(i - A[i] for i in range(len(A)))\nrights = sorted(i + A[i] for i in range(len(A)))\nstarted = total = 0\nfor k in range(len(A)):\n    while started < len(A) and lefts[started] <= rights[k]:\n        started += 1\n    total += started - (k + 1)\nreturn total' },

      { type: 'info', title: 'The 10,000,000 cap',
        body: 'The task says: if the count is more than 10,000,000, return -1.\nCheck inside the loop, right after adding, so you stop early.\nRadii go up to 2,147,483,647, so endpoints are huge numbers. Python does not care; there is no overflow.',
        code: '    total += started - (k + 1)\n    if total > 10000000:\n        return -1' },

      { type: 'quiz', q: 'Disc sweep: at the k-th right end, why subtract k + 1 from started?',
        choices: ['Those k + 1 discs are already closed, this one included; they add no new pairs', 'To make the count start at zero', 'Because lists are zero-based', 'To undo the sorting'],
        why: 'started counts every disc opened so far; the k + 1 that already finished must not be paired again.' },

      { type: 'predict', code: 'A = [1, 5, 2, 1, 4, 0]\nprint(sorted(i - A[i] for i in range(len(A))))', q: 'What prints?',
        choices: ['[-4, -1, 0, 0, 2, 5]', '[-1, -4, 0, 2, 0, 5]', '[0, 1, 2, 3, 4, 5]', '[1, 6, 4, 4, 8, 5]'],
        why: 'Left ends are i - A[i]: -1, -4, 0, 2, 0, 5. Then sorted.' },

      { type: 'info', title: 'Merge two sorted lists: two pointers',
        body: 'Two sorted lists become one sorted list in a single pass.\nKeep one pointer in each list and always take the smaller front value.\nThen `extend` with whatever is left.\nO(N + M), faster than sorting the joined list.',
        code: 'out, i, j = [], 0, 0\nwhile i < len(A) and j < len(B):\n    if A[i] <= B[j]:\n        out.append(A[i]); i += 1\n    else:\n        out.append(B[j]); j += 1\nout.extend(A[i:]); out.extend(B[j:])' },

      { type: 'info', title: 'K-th largest distinct: set, then sort',
        body: 'Combine the two tools.\n`sorted(set(A))` is the distinct values in order.\n`values[-K]` is the K-th from the top (K = 1 is the biggest).\nCheck `K > len(values)` first and return -1 if so.',
        code: 'def solution(A, K):\n    values = sorted(set(A))\n    if K > len(values):\n        return -1\n    return values[-K]' },

      { type: 'info', title: 'Values in common: set & set',
        body: '`set(A) & set(B)` is the set of values in both lists, each counted once.\n`len()` of it is how many values the lists share.\nTrap: `x in some_list` scans the whole list. Inside a loop that is O(N squared). `x in some_set` is one step.',
        code: 'def solution(A, B):\n    return len(set(A) & set(B))' },

      { type: 'quiz', q: 'You test `x in B` for every x in A. B is a list of 100,000 values. What happens?',
        choices: ['O(N squared): each test scans B. Use set(B) instead', 'O(N): in is always one step', 'A crash on big lists', 'Wrong answers when B has duplicates'],
        why: 'in on a list is a scan; in on a set is a hash lookup.' },

      { type: 'info', title: 'Cheat sheet',
        body: '`sorted(A)` new list; `A.sort()` in place, returns None\n`sorted(A, reverse=True)` biggest first\nRank by index: `S[1]`, `S[-1]`, `S[:2]`\nDistinct: `len(set(A))`\nDuplicates: sort, compare `A[i]` with `A[i - 1]`\nMaxProductOfThree: `max(S[-1]*S[-2]*S[-3], S[0]*S[1]*S[-1])`\nTriangle: sort, test three neighbours\nDiscs: sort lefts and rights, sweep, `started - (k + 1)`, cap at 10,000,000\nMerge sorted lists: two pointers\nShared values: `set(A) & set(B)`' },

      { type: 'quiz', q: 'Which pattern: "return 1 if any three values in A can be the sides of a triangle"?',
        choices: ['Sort, then test every three neighbours', 'len(set(A))', 'Sort lefts and rights, then sweep', 'Two pointers, one in each list'],
        why: 'Triangle: after sorting, a neighbour triple is enough to decide.' }
    ]
  });
})();
