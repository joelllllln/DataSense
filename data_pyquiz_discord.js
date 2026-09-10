/* "What does this print?" — the plain Python underneath a Discord bot.
   Nothing here imports discord: these are the string, number and dictionary moves the
   library is doing for you, run on their own so you can see them. Every snippet has
   been run; `correct` is its real output. */
(function () {
  window.PYQUIZ = window.PYQUIZ || [];
  var PARSE = 'Discord · parsing a command';
  var LOGIC = 'Discord · the logic underneath';

  window.PYQUIZ.push(

    /* ---- parsing a command by hand ---- */
    { id: 'dq-split', group: PARSE, lvl: 1,
      code: "msg = '!add 2 3'\nparts = msg.split()\nprint(parts[0])\nprint(parts[1:])",
      correct: "!add\n['2', '3']",
      wrong: ["!add\n['2 3']", "add\n['2', '3']", "['!add', '2', '3']\n['2', '3']"],
      explain: 'split() with no argument breaks on whitespace. This is exactly what discord.py does before handing you the arguments — which is why they all arrive as text.' },

    { id: 'dq-textargs', group: PARSE, lvl: 1,
      code: "a, b = '2', '3'\nprint(a + b)\nprint(int(a) + int(b))",
      correct: '23\n5',
      wrong: ['5\n5', '23\n23', "'23'\n5"],
      explain: 'Command arguments arrive as strings, so + joins them. The `a: int` hint on a command parameter is what makes the library convert first — without it, !add 2 3 answers 23.' },

    { id: 'dq-partition', group: PARSE, lvl: 2,
      code: "msg = '!say hello there world'\ncmd, _, rest = msg.partition(' ')\nprint(cmd)\nprint(rest)",
      correct: '!say\nhello there world',
      wrong: ['!say\nhello', "['!say', 'hello there world']\nhello", '!say hello\nthere world'],
      explain: 'partition splits once, on the first match. This is the keyword-only `*, text` parameter written out by hand: the command name, then the whole rest of the line.' },

    { id: 'dq-maxsplit', group: PARSE, lvl: 2,
      code: "print('!kick @ann being rude'.split(' ', 2))",
      correct: "['!kick', '@ann', 'being rude']",
      wrong: ["['!kick', '@ann', 'being', 'rude']", "['!kick', '@ann being rude']", "['!kick @ann', 'being rude']"],
      explain: 'The second argument is the number of SPLITS, not the number of pieces. Two splits give three parts, and the last one keeps its spaces — the shape of every kick-with-a-reason command.' },

    { id: 'dq-startswith', group: PARSE, lvl: 1,
      code: "msg = '!ping'\nprint(msg.startswith('!'))\nprint(msg[1:])",
      correct: 'True\nping',
      wrong: ['True\n!ping', 'False\nping', 'True\np'],
      explain: 'How a first bot finds its own commands. Slicing from 1 drops the prefix. Real commands do the same thing, and also handle aliases, arguments and errors for you.' },

    { id: 'dq-lower', group: PARSE, lvl: 1,
      code: "content = 'I love Python'\nprint('python' in content)\nprint('python' in content.lower())",
      correct: 'False\nTrue',
      wrong: ['True\nTrue', 'False\nFalse', 'True\nFalse'],
      explain: '`in` is case-sensitive, and users type however they like. Lowercase one side before testing, every time.' },

    { id: 'dq-removeprefix', group: PARSE, lvl: 2,
      code: "print('!add 2 3'.removeprefix('!'))\nprint('add 2 3'.removeprefix('!'))",
      correct: 'add 2 3\nadd 2 3',
      wrong: ['add 2 3\nErrorD', 'add 2 3\ndd 2 3', '!add 2 3\nadd 2 3'],
      explain: 'removeprefix strips it only if it is there, and does nothing otherwise. strip("!") would chew every leading exclamation mark instead, which is not the same job.' },

    { id: 'dq-mention', group: PARSE, lvl: 1,
      code: "user_id = 123456789\nprint(f'<@{user_id}>')",
      correct: '<@123456789>',
      wrong: ['<@user_id>', '@123456789', '<123456789>'],
      explain: 'That is literally all member.mention builds. Discord renders the pattern <@id> as a blue ping.' },

    /* ---- the logic underneath ---- */
    { id: 'dq-default-or', group: LOGIC, lvl: 1,
      code: "member = None\nauthor = 'Ann'\nprint(member or author)",
      correct: 'Ann',
      wrong: ['None', 'True', "'Ann'"],
      explain: '`or` gives back the first truthy value. That single line is how every command defaults an optional member argument to whoever ran it.' },

    { id: 'dq-roles-count', group: LOGIC, lvl: 1,
      code: "roles = ['@everyone', 'Member', 'Mod']\nprint(len(roles))\nprint(len(roles) - 1)",
      correct: '3\n2',
      wrong: ['3\n3', '2\n2', '2\n1'],
      explain: 'Everyone is silently in @everyone and the library counts it as a role. Subtract one or your role counts are always one too high.' },

    { id: 'dq-latency', group: LOGIC, lvl: 1,
      code: 'latency = 0.0421\nprint(round(latency * 1000))\nprint(round(latency, 2))',
      correct: '42\n0.04',
      wrong: ['42.1\n0.04', '42\n0.042', '0\n0.04'],
      explain: 'bot.latency is in seconds. Times 1000 and rounded is the whole of every !ping command.' },

    { id: 'dq-retry', group: LOGIC, lvl: 2,
      code: "retry_after = 3661.7\nprint(f'{retry_after:.0f}s')\nprint(f'{retry_after / 3600:.1f}h')",
      correct: '3662s\n1.0h',
      wrong: ['3661s\n1.0h', '3662s\n1.02h', '3661.7s\n1.0h'],
      explain: 'error.retry_after is the seconds left on a cooldown, as a float. Format it into something a human wants to read.' },

    { id: 'dq-chunks', group: LOGIC, lvl: 2,
      code: "text = 'x' * 4500\nprint(len(text))\nprint(len([text[i:i+2000] for i in range(0, len(text), 2000)]))",
      correct: '4500\n3',
      wrong: ['4500\n2', '4500\n4', '2000\n3'],
      explain: 'A Discord message is capped at 2000 characters. Anything longer has to be cut into pieces like this, or attached as a file.' },

    { id: 'dq-truncate', group: LOGIC, lvl: 2,
      code: "value = 'y' * 1100\nprint(len(value[:1024]))\nprint(len(value[:1024]) == len(value))",
      correct: '1024\nFalse',
      wrong: ['1100\nFalse', '1024\nTrue', '1024\nNone'],
      explain: 'An embed field value tops out at 1024 characters and send() raises if you go over. Slicing past the end is safe — it just gives you what there is.' },

    { id: 'dq-json-keys', group: LOGIC, lvl: 2,
      code: "import json\nsaved = json.loads(json.dumps({123: 'Ann'}))\nprint(saved)\nprint(list(saved)[0] == 123)",
      correct: "{'123': 'Ann'}\nFalse",
      wrong: ["{123: 'Ann'}\nTrue", "{'123': 'Ann'}\nTrue", "{123: 'Ann'}\nFalse"],
      explain: 'JSON keys are always text. Save a bot\'s data keyed by user ID and it comes back keyed by strings — the bug behind half the "my levels reset" reports.' },

    { id: 'dq-badarg', group: LOGIC, lvl: 1,
      code: "try:\n    print(int('two'))\nexcept ValueError:\n    print('BadArgument')",
      correct: 'BadArgument',
      wrong: ['two', '0', 'ValueError'],
      explain: 'This is what the library does behind an `a: int` parameter. The failed conversion becomes a BadArgument error, and your command function is never entered.' },

    { id: 'dq-select-values', group: LOGIC, lvl: 2,
      code: "values = ['red']\nprint(values[0])\nprint(len(values))",
      correct: 'red\n1',
      wrong: ["['red']\n1", 'red\n3', "r\n1"],
      explain: 'select.values from a drop-down is always a LIST, even when only one option can be chosen. Reading it without the [0] posts the brackets to your channel.' },

    { id: 'dq-timedelta', group: LOGIC, lvl: 2,
      code: 'import datetime\nprint(datetime.timedelta(minutes=10).total_seconds())',
      correct: '600.0',
      wrong: ['600', '10.0', '0:10:00'],
      explain: 'member.timeout wants a timedelta, not a number of minutes. total_seconds always comes back as a float.' },

    { id: 'dq-perm-get', group: LOGIC, lvl: 1,
      code: "perms = {'kick_members': True}\nprint(perms.get('kick_members', False))\nprint(perms.get('ban_members', False))",
      correct: 'True\nFalse',
      wrong: ['True\nTrue', 'True\nNone', 'KeyError'],
      explain: '.get with a default never raises. A permission the bot has not been granted simply reads as False, which is exactly how the real permission objects behave.' },

    { id: 'dq-emoji-len', group: LOGIC, lvl: 3,
      code: "e = '👍'\nprint(len(e))\nprint(len('<:custom:12345>'))",
      correct: '1\n15',
      wrong: ['2\n15', '1\n13', '4\n15'],
      explain: 'A standard emoji is one character to Python. A custom server emoji is not an emoji at all — it is the text <:name:id>, which is why it is so much longer.' }

  );
})();
