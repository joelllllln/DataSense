/* Coding tasks — Discord bots, the first two layers: a file that logs in at all,
   and a bot that notices messages and answers them.
   Same four steps as every other task: see it, spot it, build it, write it. */
(function () {
  window.CODETASKS = window.CODETASKS || [];
  var D1 = 'D1 · Your first bot';
  var D2 = 'D2 · Listening and replying';

  window.CODETASKS.push(

    { key: 'dcskeleton', group: D1, lvl: 1, title: 'The smallest bot that logs in',
      ask: 'Write the whole file: imports, intents, a bot with the prefix !, a message when it is ready, and run it.',
      why: 'Every bot you ever write starts as these six lines. Nothing else works until this does.',
      mcq: {
        q: 'Which version logs in correctly?',
        correct: "intents = discord.Intents.default()\nbot = commands.Bot(command_prefix='!', intents=intents)\nbot.run(TOKEN)",
        wrong: [
          "bot = commands.Bot(command_prefix='!')\nbot.run(TOKEN)",
          "bot = commands.Bot('!', intents=discord.Intents)\nbot.start(TOKEN)",
          "bot = discord.Bot(command_prefix='!', intents=intents)\nbot.run()"],
        explain: "intents is required in discord.py 2.x — leaving it out raises a TypeError. Intents.default() makes the object; the bare Intents class is not one. The bot lives in commands, not in discord, and run() needs the token." },
      lines: [
        "import discord",
        "from discord.ext import commands",
        "intents = discord.Intents.default()",
        "bot = commands.Bot(command_prefix='!', intents=intents)",
        "@bot.event",
        "async def on_ready():",
        "    print(f'Logged in as {bot.user}')",
        "bot.run(TOKEN)"],
      decoys: [
        "bot = discord.Bot(command_prefix='!')",
        "def on_ready():"],
      written: {
        prompt: 'Write the whole file: import discord and commands, default intents, a bot with prefix !, an on_ready that prints the bot user, and bot.run(TOKEN).',
        solution: "import discord\nfrom discord.ext import commands\n\nintents = discord.Intents.default()\nbot = commands.Bot(command_prefix='!', intents=intents)\n\n@bot.event\nasync def on_ready():\n    print(f'Logged in as {bot.user}')\n\nbot.run(TOKEN)",
        must: ['import discord', 'from discord.ext import commands', 'Intents.default', 'commands.Bot', 'command_prefix', '@bot.event', 'async def on_ready', 'bot.run'] },
      walk: [
        ["import discord", "The types live here: Embed, Member, Colour, Intents. You will use this import in every file."],
        ["from discord.ext import commands", "The bot itself and the command decorators live in the ext package, not in discord."],
        ["intents = discord.Intents.default()", "Intents are the events you are asking Discord to send. Since 2.x you must say, and the default set covers most of it."],
        ["bot = commands.Bot(command_prefix='!', intents=intents)", "One object holds everything: your commands, your events and the connection."],
        ["@bot.event", "Turns the function below into an event handler. Which event? The library reads the FUNCTION NAME."],
        ["async def on_ready():", "async because everything in a bot is asynchronous. on_ready fires once the login has finished."],
        ["    print(f'Logged in as {bot.user}')", "The only line that tells you it worked. bot.user is None until this point."],
        ["bot.run(TOKEN)", "The last line of the file. It blocks for ever — nothing written after it will ever run."]] },

    { key: 'dctoken', group: D1, lvl: 1, title: 'Keep the token out of the code',
      ask: 'Read the bot token from a .env file instead of writing it in the source.',
      why: 'A token pasted into a file ends up on GitHub. Anyone who has it owns your bot.',
      mcq: {
        q: 'Which version keeps the token safe?',
        correct: "load_dotenv()\nTOKEN = os.getenv('DISCORD_TOKEN')\nbot.run(TOKEN)",
        wrong: [
          "TOKEN = 'MTIzNDU2Nzg5.GhIjKl.abcdef'\nbot.run(TOKEN)",
          "TOKEN = os.getenv(DISCORD_TOKEN)\nbot.run(TOKEN)",
          "TOKEN = open('.env').read()\nbot.run(TOKEN)"],
        explain: "load_dotenv reads the .env file into the environment, then getenv pulls the value out by NAME — a string, so it needs quotes. Reading the raw file hands run() the whole line, DISCORD_TOKEN= included." },
      lines: [
        "import os",
        "from dotenv import load_dotenv",
        "load_dotenv()",
        "TOKEN = os.getenv('DISCORD_TOKEN')",
        "bot.run(TOKEN)"],
      decoys: [
        "TOKEN = 'MTIzNDU2Nzg5.GhIjKl.abcdef'",
        "TOKEN = os.getenv(DISCORD_TOKEN)"],
      written: {
        prompt: 'Write the code: import os, load the .env file, read DISCORD_TOKEN out of the environment, and run the bot with it.',
        solution: "import os\nfrom dotenv import load_dotenv\n\nload_dotenv()\nTOKEN = os.getenv('DISCORD_TOKEN')\nbot.run(TOKEN)",
        must: ['import os', 'load_dotenv', 'os.getenv', 'DISCORD_TOKEN', 'bot.run'] },
      walk: [
        ["import os", "os.getenv is the standard way to read an environment variable in Python."],
        ["from dotenv import load_dotenv", "pip install python-dotenv. It is not part of discord.py, but every bot tutorial uses it."],
        ["load_dotenv()", "Reads a file called .env in the same folder and puts each NAME=value line into the environment."],
        ["TOKEN = os.getenv('DISCORD_TOKEN')", "The name in quotes must match the name in .env exactly. A typo gives you None and a confusing login error."],
        ["bot.run(TOKEN)", "Now the file is safe to commit — and .env goes in .gitignore so the secret never leaves your machine."]] },

    { key: 'dcintents', group: D1, lvl: 1, title: 'Turn on the intents you need',
      ask: 'Ask Discord for the default events plus message content and the member list.',
      why: 'Two of the three privileged intents are off by default, and the symptom is silence: message.content comes back empty and on_member_join never fires.',
      mcq: {
        q: 'Which version can actually read what people type?',
        correct: "intents = discord.Intents.default()\nintents.message_content = True\nintents.members = True",
        wrong: [
          "intents = discord.Intents.default()\nintents.message_content == True",
          "intents = discord.Intents()\nintents.message_content = True",
          "intents = discord.Intents.default(message_content=True, members=True)"],
        explain: "Set the flags with a single =; a double == just asks a question and throws the answer away. Intents() with no default turns EVERYTHING off, so the bot would see almost nothing. And default() takes no keyword arguments." },
      lines: [
        "intents = discord.Intents.default()",
        "intents.message_content = True",
        "intents.members = True",
        "bot = commands.Bot(command_prefix='!', intents=intents)"],
      decoys: [
        "intents.message_content == True",
        "intents = discord.Intents()"],
      written: {
        prompt: 'Write the code: default intents, switch on message_content and members, then build the bot with them.',
        solution: "intents = discord.Intents.default()\nintents.message_content = True\nintents.members = True\nbot = commands.Bot(command_prefix='!', intents=intents)",
        must: ['Intents.default', 'message_content = True', 'members = True', 'intents=intents'] },
      walk: [
        ["intents = discord.Intents.default()", "Everything Discord will give you without asking permission: messages arriving, reactions, channels changing."],
        ["intents.message_content = True", "Privileged. Without it every message.content is an empty string and prefix commands silently stop working."],
        ["intents.members = True", "Privileged. Needed for on_member_join, member counts, and looking members up by name."],
        ["bot = commands.Bot(command_prefix='!', intents=intents)", "Setting the flags is only half of it — you must also tick the same two boxes on the Developer Portal, under Bot → Privileged Gateway Intents."]] },

    { key: 'dcecho', group: D2, lvl: 1, title: 'Reply to a message',
      ask: 'When somebody says "hello", have the bot answer in the same channel — without answering itself.',
      why: 'The self-check is the first bug every bot author writes. A bot that replies to "hello" and says "hello" will talk to itself until Discord rate-limits it.',
      mcq: {
        q: 'Which handler is safe?',
        correct: "@bot.event\nasync def on_message(message):\n    if message.author == bot.user:\n        return\n    if message.content == 'hello':\n        await message.channel.send('hi there')",
        wrong: [
          "@bot.event\nasync def on_message(message):\n    if message.content == 'hello':\n        await message.channel.send('hello')",
          "@bot.event\ndef on_message(message):\n    message.channel.send('hi there')",
          "@bot.event\nasync def on_message(message):\n    if message.author == bot.user:\n        await message.channel.send('hi there')"],
        explain: "The self-check must come first and must return. The second option loops for ever, the third is not async and never awaits, and the fourth replies ONLY to itself — the check is backwards." },
      lines: [
        "@bot.event",
        "async def on_message(message):",
        "    if message.author == bot.user:",
        "        return",
        "    if message.content.lower() == 'hello':",
        "        await message.channel.send('hi there')",
        "    await bot.process_commands(message)"],
      decoys: [
        "    if message.author is bot:",
        "        message.channel.send('hi there')"],
      written: {
        prompt: 'Write the handler: ignore the bot\'s own messages, reply "hi there" to a lowercase "hello", and still let commands run.',
        solution: "@bot.event\nasync def on_message(message):\n    if message.author == bot.user:\n        return\n    if message.content.lower() == 'hello':\n        await message.channel.send('hi there')\n    await bot.process_commands(message)",
        must: ['async def on_message', 'message.author == bot.user', 'return', 'message.channel.send', 'process_commands'] },
      walk: [
        ["@bot.event", "The decorator; the name on_message picks the event."],
        ["async def on_message(message):", "Fires for every message the bot can see, in every channel of every server it is in."],
        ["    if message.author == bot.user:", "bot.user is the bot's own account."],
        ["        return", "Stop here. Two lines that save you from an infinite conversation with yourself."],
        ["    if message.content.lower() == 'hello':", "Lowercase before comparing, or Hello and HELLO slip past."],
        ["        await message.channel.send('hi there')", "message.channel is where it was said, so the answer lands in the right place."],
        ["    await bot.process_commands(message)", "The sting in the tail: writing your own on_message replaces the built-in one that dispatches commands. Without this line every ! command stops working."]] },

    { key: 'dcreact', group: D2, lvl: 1, title: 'React instead of replying',
      ask: 'Add a 👍 reaction to any message that contains the word "python".',
      why: 'A reaction is the quietest thing a bot can do — no message, no ping, no clutter.',
      mcq: {
        q: 'Which line adds the reaction?',
        correct: "await message.add_reaction('👍')",
        wrong: [
          "message.add_reaction('👍')",
          "await message.react('👍')",
          "await message.channel.add_reaction('👍')"],
        explain: "The method is add_reaction, it lives on the MESSAGE, and it must be awaited — without await nothing is sent and Python warns about a coroutine that was never run." },
      lines: [
        "@bot.event",
        "async def on_message(message):",
        "    if message.author == bot.user:",
        "        return",
        "    if 'python' in message.content.lower():",
        "        await message.add_reaction('👍')",
        "    await bot.process_commands(message)"],
      decoys: [
        "        message.add_reaction('👍')",
        "    if 'python' in message.content:"],
      written: {
        prompt: 'Write the handler: ignore the bot itself, add a 👍 to any message mentioning python in any case, and keep commands working.',
        solution: "@bot.event\nasync def on_message(message):\n    if message.author == bot.user:\n        return\n    if 'python' in message.content.lower():\n        await message.add_reaction('👍')\n    await bot.process_commands(message)",
        must: ['async def on_message', 'bot.user', "'python' in", 'lower()', 'add_reaction', 'process_commands'] },
      walk: [
        ["    if 'python' in message.content.lower():", "`in` tests for the word anywhere in the message; .lower() makes the test case-blind."],
        ["        await message.add_reaction('👍')", "Any standard emoji goes in as a normal character in a string. A custom server emoji goes in as '<:name:id>'."],
        ["    await bot.process_commands(message)", "Same rule as before. Every on_message you write ends with this line."]] },

    { key: 'dcwelcome', group: D2, lvl: 1, title: 'Welcome a new member',
      ask: 'When somebody joins, greet them by mention in the channel called welcome.',
      why: 'The first real event that is not about messages — and the first time the members intent earns its keep.',
      mcq: {
        q: 'Which handler greets a joiner in #welcome?',
        correct: "@bot.event\nasync def on_member_join(member):\n    channel = discord.utils.get(member.guild.text_channels, name='welcome')\n    if channel:\n        await channel.send(f'Welcome {member.mention}!')",
        wrong: [
          "@bot.event\nasync def on_member_join(member):\n    await member.channel.send(f'Welcome {member.mention}!')",
          "@bot.event\nasync def on_join(member):\n    channel = bot.get_channel('welcome')\n    await channel.send('Welcome!')",
          "@bot.event\nasync def on_member_join(member):\n    channel = discord.utils.get(member.guild.channels, 'welcome')\n    await channel.send('Welcome!')"],
        explain: "A member has no channel of their own, and the event is called on_member_join. get_channel takes an ID number, not a name. discord.utils.get needs the attribute NAMED — name='welcome' — because it can search on any attribute." },
      lines: [
        "@bot.event",
        "async def on_member_join(member):",
        "    channel = discord.utils.get(member.guild.text_channels, name='welcome')",
        "    if channel is None:",
        "        return",
        "    await channel.send(f'Welcome {member.mention}!')"],
      decoys: [
        "    channel = bot.get_channel('welcome')",
        "    await member.channel.send('Welcome!')"],
      written: {
        prompt: 'Write the handler: on a member joining, find the text channel named welcome, and if it exists send a message mentioning them.',
        solution: "@bot.event\nasync def on_member_join(member):\n    channel = discord.utils.get(member.guild.text_channels, name='welcome')\n    if channel is None:\n        return\n    await channel.send(f'Welcome {member.mention}!')",
        must: ['on_member_join', 'discord.utils.get', 'text_channels', "name='welcome'", 'member.mention', 'channel.send'] },
      walk: [
        ["async def on_member_join(member):", "Only fires if intents.members is True and the box is ticked in the portal. This is the single most common 'my bot does nothing' cause."],
        ["    channel = discord.utils.get(member.guild.text_channels, name='welcome')", "member.guild is the server they joined. utils.get searches a list by any attribute and returns None if nothing matches."],
        ["    if channel is None:", "Never assume a channel exists. Someone renames it and your bot starts crashing on every join."],
        ["    await channel.send(f'Welcome {member.mention}!')", "member.mention builds the <@id> text that Discord renders as a blue ping."]] }

  );
})();
