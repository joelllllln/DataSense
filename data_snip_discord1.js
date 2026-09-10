/* Quickfire cards — Discord bots, part 1: getting a bot to log in at all, the events
   it can listen to, and everything you can do to a message.
   Library: discord.py 2.x, the standard Python library for Discord. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var SET = 'Discord · setup & login';
  var EVT = 'Discord · events';
  var MSG = 'Discord · messages';

  window.SNIPPETS.push(

    /* ---- setup & login ---- */
    { id: 'dc-install', group: SET, lvl: 1,
      ask: 'Install the Discord library from the command line',
      a: 'pip install -U discord.py',
      note: 'The package is discord.py but you import it as `discord`. -U upgrades an old copy.' },

    { id: 'dc-import', group: SET, lvl: 1,
      ask: 'The two import lines nearly every bot file starts with',
      a: 'import discord\nfrom discord.ext import commands',
      note: '`discord` holds the types (Embed, Member, Colour). `commands` holds the bot and the command decorators.' },

    { id: 'dc-intents-default', group: SET, lvl: 1,
      ask: 'Make a default set of intents',
      a: 'intents = discord.Intents.default()',
      note: 'Intents are the events you are asking Discord to send you. Default gets you most of them.' },

    { id: 'dc-intents-content', group: SET, lvl: 1,
      ask: 'Turn on the intent that lets you read what a message says',
      a: 'intents.message_content = True',
      note: 'Without it `message.content` is an empty string. It also has to be ticked on the Developer Portal.' },

    { id: 'dc-intents-members', group: SET, lvl: 2,
      ask: 'Turn on the intent for member joins and member lists',
      a: 'intents.members = True',
      note: 'Needed for on_member_join, member counts, and looking a member up by name.' },

    { id: 'dc-intents-all', group: SET, lvl: 2,
      ask: 'Ask for every intent at once',
      a: 'intents = discord.Intents.all()',
      note: 'Fine while learning. The three privileged ones still have to be ticked in the portal.' },

    { id: 'dc-bot-make', group: SET, lvl: 1,
      ask: 'Create a bot that answers commands starting with !',
      a: "bot = commands.Bot(command_prefix='!', intents=intents)",
      note: 'This one object is your whole bot: it holds the commands, the events and the connection.' },

    { id: 'dc-bot-mention-prefix', group: SET, lvl: 3,
      ask: 'Let the bot be triggered by ! OR by mentioning it',
      a: "bot = commands.Bot(command_prefix=commands.when_mentioned_or('!'), intents=intents)",
      note: 'Handy when several bots on a server have already taken the good prefixes.' },

    { id: 'dc-run', group: SET, lvl: 1,
      ask: 'Start the bot with the token in the variable TOKEN',
      a: 'bot.run(TOKEN)',
      note: 'The last line of the file. Nothing after it runs — it blocks until the bot stops.' },

    { id: 'dc-token-env', group: SET, lvl: 1,
      ask: 'Read the token out of an environment variable instead of typing it in the file',
      a: "TOKEN = os.getenv('DISCORD_TOKEN')",
      note: 'A token in your code is a token on GitHub. Discord scans for leaked ones and kills them.' },

    { id: 'dc-dotenv', group: SET, lvl: 1,
      ask: 'Load the variables from a .env file into the environment',
      a: 'from dotenv import load_dotenv\nload_dotenv()',
      note: 'pip install python-dotenv. Put DISCORD_TOKEN=... in .env, and .env in .gitignore.' },

    { id: 'dc-on-ready', group: SET, lvl: 1,
      ask: 'Print a line when the bot has finished logging in',
      a: "@bot.event\nasync def on_ready():\n    print(f'Logged in as {bot.user}')",
      note: 'on_ready can fire more than once if the connection drops — never put one-off setup here.' },

    { id: 'dc-setup-hook', group: SET, lvl: 3,
      ask: 'Run one-off setup once, before the bot connects',
      a: 'async def setup_hook():\n    await bot.tree.sync()\nbot.setup_hook = setup_hook',
      note: 'The right home for syncing commands, loading cogs and opening a database.' },

    { id: 'dc-latency', group: SET, lvl: 2,
      ask: "Get the bot's ping in whole milliseconds",
      a: 'round(bot.latency * 1000)',
      note: 'bot.latency is in seconds. This one line is the whole of every !ping command.' },

    { id: 'dc-presence', group: SET, lvl: 2,
      ask: 'Set the bot\'s status to "Playing with Python"',
      a: "await bot.change_presence(activity=discord.Game('with Python'))",
      note: 'discord.Activity(type=discord.ActivityType.listening, name="you") gives Listening to instead.' },

    { id: 'dc-close', group: SET, lvl: 3,
      ask: 'Shut the bot down cleanly from inside a command',
      a: 'await bot.close()',
      note: 'Guard it with @commands.is_owner() or anyone on the server can turn your bot off.' },

    /* ---- events ---- */
    { id: 'dc-event-decorator', group: EVT, lvl: 1,
      ask: 'The decorator that turns a function into an event handler',
      a: '@bot.event',
      note: 'The FUNCTION NAME is what picks the event. @bot.event on a function called on_ready listens for ready.' },

    { id: 'dc-on-message', group: EVT, lvl: 1,
      ask: 'Handle every message the bot can see',
      a: '@bot.event\nasync def on_message(message):\n    ...',
      note: 'Every event handler is `async def`, and everything inside it that talks to Discord is awaited.' },

    { id: 'dc-ignore-self', group: EVT, lvl: 1,
      ask: 'Stop the bot replying to its own messages',
      a: 'if message.author == bot.user:\n    return',
      note: 'The first two lines of on_message, always. Without them a bot that echoes will echo itself for ever.' },

    { id: 'dc-process-commands', group: EVT, lvl: 2,
      ask: 'Let commands still work after you have written your own on_message',
      a: 'await bot.process_commands(message)',
      note: 'Defining on_message replaces the built-in one, which is what normally dispatches commands. Last line of the handler.' },

    { id: 'dc-on-member-join', group: EVT, lvl: 1,
      ask: 'Do something when someone joins the server',
      a: '@bot.event\nasync def on_member_join(member):\n    ...',
      note: 'Needs the members intent. on_member_remove is the leaving half.' },

    { id: 'dc-on-message-delete', group: EVT, lvl: 2,
      ask: 'React when a message is deleted',
      a: '@bot.event\nasync def on_message_delete(message):\n    ...',
      note: 'Only fires for messages the bot has seen since it started. on_raw_message_delete catches the older ones.' },

    { id: 'dc-on-message-edit', group: EVT, lvl: 2,
      ask: 'React when a message is edited, with both versions',
      a: '@bot.event\nasync def on_message_edit(before, after):\n    ...',
      note: 'before is what it said, after is what it says now.' },

    { id: 'dc-on-reaction-add', group: EVT, lvl: 2,
      ask: 'React when someone adds a reaction',
      a: '@bot.event\nasync def on_reaction_add(reaction, user):\n    ...',
      note: 'reaction.emoji is the emoji, reaction.message is the message it is on.' },

    { id: 'dc-on-raw-reaction', group: EVT, lvl: 3,
      ask: 'Catch reactions on messages sent before the bot started',
      a: '@bot.event\nasync def on_raw_reaction_add(payload):\n    ...',
      note: 'The raw events give you IDs (payload.message_id, payload.user_id) instead of objects, because nothing is cached.' },

    { id: 'dc-on-guild-join', group: EVT, lvl: 2,
      ask: 'Do something when the bot is added to a new server',
      a: '@bot.event\nasync def on_guild_join(guild):\n    ...',
      note: 'A "guild" is what the API calls a server. The word server never appears in the library.' },

    { id: 'dc-on-typing', group: EVT, lvl: 3,
      ask: 'Know when somebody starts typing',
      a: '@bot.event\nasync def on_typing(channel, user, when):\n    ...' },

    /* ---- messages ---- */
    { id: 'dc-send', group: MSG, lvl: 1,
      ask: 'Send "hello" into the channel a message came from',
      a: "await message.channel.send('hello')",
      note: 'send is the workhorse. Every reply your bot ever makes is a version of this line.' },

    { id: 'dc-reply', group: MSG, lvl: 1,
      ask: 'Reply directly to a message, quoting it',
      a: "await message.reply('hello')",
      note: 'Add mention_author=False to reply without pinging them.' },

    { id: 'dc-content', group: MSG, lvl: 1,
      ask: 'Get the text of a message',
      a: 'message.content',
      note: 'Empty unless the message_content intent is on.' },

    { id: 'dc-author', group: MSG, lvl: 1,
      ask: 'Get who sent a message, and their display name',
      a: 'message.author\nmessage.author.display_name',
      note: 'author.name is the account name; display_name is their nickname on that server if they have one.' },

    { id: 'dc-mention', group: MSG, lvl: 1,
      ask: 'Ping a member inside a message',
      a: "await message.channel.send(f'hi {message.author.mention}')",
      note: '.mention builds the <@123...> text that Discord renders as a blue ping.' },

    { id: 'dc-startswith', group: MSG, lvl: 1,
      ask: 'Do something only if a message starts with !hello',
      a: "if message.content.startswith('!hello'):",
      note: 'How everybody writes their first bot. Real commands replace it — see the commands group.' },

    { id: 'dc-lower-contains', group: MSG, lvl: 1,
      ask: 'Check whether a message mentions "python", ignoring case',
      a: "if 'python' in message.content.lower():",
      note: 'Lowercase both sides before comparing, or HELLO and hello behave differently.' },

    { id: 'dc-add-reaction', group: MSG, lvl: 1,
      ask: 'Add a thumbs-up reaction to a message',
      a: "await message.add_reaction('👍')",
      note: "A custom server emoji goes in as '<:name:id>'." },

    { id: 'dc-delete', group: MSG, lvl: 1,
      ask: 'Delete a message',
      a: 'await message.delete()',
      note: 'Needs Manage Messages unless it is the bot\'s own message.' },

    { id: 'dc-delete-after', group: MSG, lvl: 2,
      ask: 'Send a message that deletes itself after five seconds',
      a: "await ctx.send('temporary', delete_after=5)",
      note: 'Perfect for error notes that would otherwise clutter the channel.' },

    { id: 'dc-edit', group: MSG, lvl: 2,
      ask: 'Send a message and then change what it says',
      a: "msg = await ctx.send('working...')\nawait msg.edit(content='done')",
      note: 'send gives you back the Message object, which is how you edit or delete it later.' },

    { id: 'dc-pin', group: MSG, lvl: 2,
      ask: 'Pin a message',
      a: 'await message.pin()',
      note: 'unpin() is the other half. A channel holds at most 50 pins.' },

    { id: 'dc-typing', group: MSG, lvl: 2,
      ask: 'Show the "bot is typing" indicator while slow work happens',
      a: 'async with ctx.typing():\n    ...',
      note: 'Buys you goodwill on anything that takes more than a second.' },

    { id: 'dc-history', group: MSG, lvl: 2,
      ask: 'Loop over the last 50 messages in a channel',
      a: 'async for msg in channel.history(limit=50):\n    ...',
      note: 'An `async for` — history arrives page by page from the API, not all at once.' },

    { id: 'dc-fetch-message', group: MSG, lvl: 3,
      ask: 'Get one message by its ID',
      a: 'msg = await channel.fetch_message(123456789)',
      note: 'get_* reads the cache and is instant; fetch_* asks Discord and is awaited.' },

    { id: 'dc-attachment-url', group: MSG, lvl: 2,
      ask: 'Get the link to the first file attached to a message',
      a: 'message.attachments[0].url',
      note: 'Check `if message.attachments:` first — the list is usually empty.' },

    { id: 'dc-send-file', group: MSG, lvl: 2,
      ask: 'Send a local image file into the channel',
      a: "await ctx.send(file=discord.File('chart.png'))",
      note: 'Several at once: files=[discord.File(a), discord.File(b)].' },

    { id: 'dc-save-attachment', group: MSG, lvl: 3,
      ask: 'Save an attachment somebody uploaded to disk',
      a: "await message.attachments[0].save('saved.png')" },

    { id: 'dc-limit-2000', group: MSG, lvl: 2,
      ask: 'The character limit on one Discord message',
      a: '2000',
      note: 'Longer and send raises HTTPException. Split it, or attach it as a file.' },

    { id: 'dc-codeblock', group: MSG, lvl: 2,
      ask: 'Send text as a Python code block',
      a: "await ctx.send(f'```python\\n{code}\\n```')",
      note: 'Three backticks, the language, a newline, the code, three backticks.' },

    { id: 'dc-suppress-mentions', group: MSG, lvl: 3,
      ask: 'Send text that cannot ping @everyone even if it contains it',
      a: 'await ctx.send(text, allowed_mentions=discord.AllowedMentions.none())',
      note: 'Always do this when you echo something a user typed.' }

  );
})();
