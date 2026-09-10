/* Coding tasks — Discord bots, layers three and four: proper commands with arguments,
   and handling the ways a user can get them wrong. */
(function () {
  window.CODETASKS = window.CODETASKS || [];
  var D3 = 'D3 · Real commands';
  var D4 = 'D4 · Arguments and errors';

  window.CODETASKS.push(

    { key: 'dcping', group: D3, lvl: 1, title: 'Your first command',
      ask: 'Make !ping reply with "Pong!" and the bot\'s latency in whole milliseconds.',
      why: 'The moment you stop reading message.content by hand. The library does the prefix, the name and the splitting for you.',
      mcq: {
        q: 'Which one is a working command?',
        correct: "@bot.command()\nasync def ping(ctx):\n    await ctx.send(f'Pong! {round(bot.latency * 1000)}ms')",
        wrong: [
          "@bot.command\nasync def ping(ctx):\n    await ctx.send('Pong!')",
          "@bot.command()\nasync def ping():\n    await ctx.send('Pong!')",
          "@bot.event\nasync def ping(ctx):\n    await ctx.send('Pong!')"],
        explain: "@bot.command() is called, with brackets. Every command takes ctx as its first parameter — without it there is nothing to answer with. And @bot.event listens for events named on_something; it does not make commands." },
      lines: [
        "@bot.command()",
        "async def ping(ctx):",
        "    ms = round(bot.latency * 1000)",
        "    await ctx.send(f'Pong! {ms}ms')"],
      decoys: [
        "@bot.command",
        "async def ping():"],
      written: {
        prompt: 'Write the command: !ping replies "Pong!" followed by bot.latency in whole milliseconds.',
        solution: "@bot.command()\nasync def ping(ctx):\n    ms = round(bot.latency * 1000)\n    await ctx.send(f'Pong! {ms}ms')",
        must: ['@bot.command()', 'async def ping', 'ctx', 'bot.latency', 'round', 'ctx.send'] },
      walk: [
        ["@bot.command()", "Registers the function below as a command. The brackets matter — without them you hand the decorator your function instead of calling it."],
        ["async def ping(ctx):", "The FUNCTION NAME is the command name, so this is !ping. ctx is the context: who ran it, where, and how to reply."],
        ["    ms = round(bot.latency * 1000)", "latency is the seconds between the bot and Discord's gateway. Times 1000 for milliseconds, rounded so it reads as a whole number."],
        ["    await ctx.send(f'Pong! {ms}ms')", "ctx.send posts in the channel the command came from. Everything that talks to Discord is awaited."]] },

    { key: 'dcsay', group: D3, lvl: 1, title: 'Take the rest of the line',
      ask: 'Make !say repeat everything typed after it, as one whole sentence.',
      why: 'The bare * is the single most useful piece of command syntax there is, and the one nobody guesses.',
      mcq: {
        q: 'Which signature puts the WHOLE sentence in text?',
        correct: 'async def say(ctx, *, text):',
        wrong: [
          'async def say(ctx, text):',
          'async def say(ctx, *text):',
          'async def say(ctx, text=*):'],
        explain: "The bare * means everything after this point is keyword-only, and discord.py reads that as 'give it the rest of the line'. A plain parameter gets one word; *text gets a TUPLE of words you would have to join yourself." },
      lines: [
        "@bot.command()",
        "async def say(ctx, *, text):",
        "    await ctx.message.delete()",
        "    await ctx.send(text)"],
      decoys: [
        "async def say(ctx, text):",
        "    await ctx.send(*text)"],
      written: {
        prompt: 'Write the command: !say takes the rest of the line, deletes the original message, then posts the text.',
        solution: "@bot.command()\nasync def say(ctx, *, text):\n    await ctx.message.delete()\n    await ctx.send(text)",
        must: ['@bot.command()', 'async def say', '*, text', 'ctx.message.delete', 'ctx.send'] },
      walk: [
        ["async def say(ctx, *, text):", "!say hello there world puts the whole thing in text. Without the star you would get 'hello' and lose the rest."],
        ["    await ctx.message.delete()", "Tidies away the command itself so only the repeated text is left. Needs Manage Messages."],
        ["    await ctx.send(text)", "In a real bot add allowed_mentions=discord.AllowedMentions.none() here, or !say @everyone becomes a weapon."]] },

    { key: 'dcadd', group: D3, lvl: 1, title: 'Typed arguments',
      ask: 'Make !add 2 3 answer 5 — with the conversion done for you.',
      why: 'A type hint on a command parameter is not documentation. The library actually converts, and rejects what will not convert.',
      mcq: {
        q: 'Which command adds the numbers rather than gluing the text?',
        correct: "@bot.command()\nasync def add(ctx, a: int, b: int):\n    await ctx.send(a + b)",
        wrong: [
          "@bot.command()\nasync def add(ctx, a, b):\n    await ctx.send(a + b)",
          "@bot.command()\nasync def add(ctx, a: int, b: int):\n    await ctx.send(int(a) + int(b))",
          "@bot.command()\nasync def add(ctx, *, nums: int):\n    await ctx.send(sum(nums))"],
        explain: "Arguments arrive as text, so without the hints !add 2 3 sends '23'. The third option works but converts twice for no reason. The fourth cannot work: the rest-of-line form is one string, and int() of '2 3' fails." },
      lines: [
        "@bot.command()",
        "async def add(ctx, a: int, b: int):",
        "    await ctx.send(f'{a} + {b} = {a + b}')"],
      decoys: [
        "async def add(ctx, a, b):",
        "    await ctx.send(a + ' ' + b)"],
      written: {
        prompt: 'Write the command: !add takes two ints and replies with the sum written out as a sum.',
        solution: "@bot.command()\nasync def add(ctx, a: int, b: int):\n    await ctx.send(f'{a} + {b} = {a + b}')",
        must: ['@bot.command()', 'async def add', 'a: int', 'b: int', 'a + b', 'ctx.send'] },
      walk: [
        ["async def add(ctx, a: int, b: int):", "The library calls int() on each word before your code runs. If it fails, your function is never entered and a BadArgument error is raised instead."],
        ["    await ctx.send(f'{a} + {b} = {a + b}')", "Showing the sum back is worth doing: it proves to the user which numbers the bot actually read."]] },

    { key: 'dcuserinfo', group: D3, lvl: 2, title: 'Take a member as an argument',
      ask: 'Make !userinfo @someone report their name, when they joined, and how many roles they have — defaulting to whoever asked.',
      why: 'discord.Member is the converter you will use most. A mention, a raw ID or a plain name all arrive as a real Member object.',
      mcq: {
        q: 'Which signature accepts a mention and defaults to the caller?',
        correct: 'async def userinfo(ctx, member: discord.Member = None):\n    member = member or ctx.author',
        wrong: [
          'async def userinfo(ctx, member = ctx.author):',
          'async def userinfo(ctx, member: discord.Member = ctx.author):',
          'async def userinfo(ctx, member: str = None):\n    member = member or ctx.author'],
        explain: "A default is evaluated when the file loads, and ctx does not exist yet — both middle options crash at import. Typing it as str would hand you the raw text '@Ann' with no joined_at to read." },
      lines: [
        "@bot.command()",
        "async def userinfo(ctx, member: discord.Member = None):",
        "    member = member or ctx.author",
        "    joined = member.joined_at.strftime('%d %b %Y')",
        "    roles = len(member.roles) - 1",
        "    await ctx.send(f'{member.display_name} joined {joined} · {roles} roles')"],
      decoys: [
        "async def userinfo(ctx, member: discord.Member = ctx.author):",
        "    roles = len(member.roles)"],
      written: {
        prompt: 'Write the command: !userinfo takes an optional Member, falls back to ctx.author, and reports display name, join date and role count (not counting @everyone).',
        solution: "@bot.command()\nasync def userinfo(ctx, member: discord.Member = None):\n    member = member or ctx.author\n    joined = member.joined_at.strftime('%d %b %Y')\n    roles = len(member.roles) - 1\n    await ctx.send(f'{member.display_name} joined {joined} · {roles} roles')",
        must: ['discord.Member', '= None', 'ctx.author', 'joined_at', 'member.roles', 'display_name', 'ctx.send'] },
      walk: [
        ["async def userinfo(ctx, member: discord.Member = None):", "= None makes it optional. The converter turns @Ann, 123456789 or Ann into the same Member object."],
        ["    member = member or ctx.author", "The standard fallback line. `or` takes the second value when the first is None."],
        ["    joined = member.joined_at.strftime('%d %b %Y')", "joined_at is a real datetime, so all the usual formatting works."],
        ["    roles = len(member.roles) - 1", "Everyone is silently in @everyone, and it counts as a role. Subtract one or your numbers look wrong."],
        ["    await ctx.send(f'{member.display_name} joined {joined} · {roles} roles')", "display_name is their nickname on this server if they have one, otherwise their username."]] },

    { key: 'dcerrors', group: D4, lvl: 2, title: 'One place for every command error',
      ask: 'Answer politely when a command is unknown, an argument is missing, an argument is the wrong type, or the user lacks permission.',
      why: 'Without a handler, errors go to your console and the user just sees the bot ignore them.',
      mcq: {
        q: 'Which handler is right?',
        correct: "@bot.event\nasync def on_command_error(ctx, error):\n    if isinstance(error, commands.CommandNotFound):\n        return\n    if isinstance(error, commands.MissingRequiredArgument):\n        await ctx.send(f'Missing: {error.param.name}')",
        wrong: [
          "@bot.event\nasync def on_command_error(ctx, error):\n    if error == commands.CommandNotFound:\n        return",
          "@bot.command()\nasync def on_command_error(ctx, error):\n    await ctx.send(error)",
          "@bot.event\nasync def on_error(ctx, error):\n    await ctx.send(error)"],
        explain: "error is an INSTANCE, so it is compared with isinstance, never == against the class. The handler is an event, not a command, and its name is on_command_error — on_error is the different, lower-level one." },
      lines: [
        "@bot.event",
        "async def on_command_error(ctx, error):",
        "    if isinstance(error, commands.CommandNotFound):",
        "        return",
        "    if isinstance(error, commands.MissingRequiredArgument):",
        "        await ctx.send(f'You missed the {error.param.name}.')",
        "    elif isinstance(error, commands.BadArgument):",
        "        await ctx.send('That is not the right kind of value.')",
        "    elif isinstance(error, commands.MissingPermissions):",
        "        await ctx.send('You are not allowed to do that.')",
        "    else:",
        "        raise error"],
      decoys: [
        "    if error == commands.CommandNotFound:",
        "        await ctx.send(error.param)"],
      written: {
        prompt: 'Write the handler: ignore CommandNotFound, name the missing parameter for MissingRequiredArgument, answer BadArgument and MissingPermissions, and re-raise anything else.',
        solution: "@bot.event\nasync def on_command_error(ctx, error):\n    if isinstance(error, commands.CommandNotFound):\n        return\n    if isinstance(error, commands.MissingRequiredArgument):\n        await ctx.send(f'You missed the {error.param.name}.')\n    elif isinstance(error, commands.BadArgument):\n        await ctx.send('That is not the right kind of value.')\n    elif isinstance(error, commands.MissingPermissions):\n        await ctx.send('You are not allowed to do that.')\n    else:\n        raise error",
        must: ['on_command_error', 'isinstance', 'CommandNotFound', 'MissingRequiredArgument', 'BadArgument', 'MissingPermissions', 'raise error'] },
      walk: [
        ["    if isinstance(error, commands.CommandNotFound):", "Every typo on a busy server raises this. Returning quietly is the only sane response."],
        ["    if isinstance(error, commands.MissingRequiredArgument):", "error.param is the parameter the library was waiting for, so you can name it in the message."],
        ["    elif isinstance(error, commands.BadArgument):", "Covers 'that is not a number' and 'no such member' — MemberNotFound and friends are all BadArgument underneath."],
        ["    else:", "The important half."],
        ["        raise error", "Anything you did not expect should still land in your console with a full traceback. Swallowing everything here is how bugs become invisible."]] },

    { key: 'dccooldown', group: D4, lvl: 2, title: 'Rate-limit a command',
      ask: 'Let each user run !daily once every 24 hours, and tell them how long is left if they try again.',
      why: 'Anything that gives out points, money or API calls needs a cooldown, or one bored user will run it four hundred times.',
      mcq: {
        q: 'Which pair sets a per-user daily cooldown and reports the wait?',
        correct: "@commands.cooldown(1, 86400, commands.BucketType.user)\n...\nif isinstance(error, commands.CommandOnCooldown):\n    await ctx.send(f'Wait {error.retry_after:.0f}s')",
        wrong: [
          "@commands.cooldown(86400, 1, commands.BucketType.user)\n...\nawait ctx.send(error.retry_after)",
          "@commands.cooldown(1, 86400)\n...\nawait ctx.send('Too soon')",
          "@bot.cooldown(1, 86400, commands.BucketType.user)\n...\nawait ctx.send('Too soon')"],
        explain: "The order is (uses, seconds, bucket) — swapping them gives 86400 uses per second. The bucket is not optional, and the decorator lives on commands, not on the bot." },
      lines: [
        "@bot.command()",
        "@commands.cooldown(1, 86400, commands.BucketType.user)",
        "async def daily(ctx):",
        "    await ctx.send('Here is your daily reward!')",
        "@daily.error",
        "async def daily_error(ctx, error):",
        "    if isinstance(error, commands.CommandOnCooldown):",
        "        hours = error.retry_after / 3600",
        "        await ctx.send(f'Come back in {hours:.1f} hours.')"],
      decoys: [
        "@commands.cooldown(86400, 1, commands.BucketType.user)",
        "@bot.error"],
      written: {
        prompt: 'Write it: !daily on a one-per-24-hours per-user cooldown, plus a local error handler that reports the hours left.',
        solution: "@bot.command()\n@commands.cooldown(1, 86400, commands.BucketType.user)\nasync def daily(ctx):\n    await ctx.send('Here is your daily reward!')\n\n@daily.error\nasync def daily_error(ctx, error):\n    if isinstance(error, commands.CommandOnCooldown):\n        hours = error.retry_after / 3600\n        await ctx.send(f'Come back in {hours:.1f} hours.')",
        must: ['commands.cooldown', '86400', 'BucketType.user', '@daily.error', 'CommandOnCooldown', 'retry_after'] },
      walk: [
        ["@bot.command()", "The command decorator goes on TOP. Decorators apply bottom-up, and this one must be last to run."],
        ["@commands.cooldown(1, 86400, commands.BucketType.user)", "One use, per 86400 seconds, per user. BucketType.guild would limit the whole server instead."],
        ["@daily.error", "A local handler, named after the command function. It runs before the global on_command_error."],
        ["        hours = error.retry_after / 3600", "retry_after is the seconds left as a float. Divide it into something a human wants to read."]] },

    { key: 'dcperms', group: D4, lvl: 2, title: 'Guard a command',
      ask: 'Let only people who can kick run !clear, and check the bot itself is allowed to delete messages.',
      why: 'Two different failures with the same symptom: the user is not allowed, or the bot is not allowed. Say which.',
      mcq: {
        q: 'Which stack of decorators is right?',
        correct: "@bot.command()\n@commands.has_permissions(manage_messages=True)\n@commands.bot_has_permissions(manage_messages=True)\nasync def clear(ctx, amount: int = 10):",
        wrong: [
          "@bot.command()\n@commands.has_permissions('manage_messages')\nasync def clear(ctx, amount: int = 10):",
          "@commands.has_permissions(manage_messages=True)\nasync def clear(ctx, amount: int = 10):",
          "@bot.command()\n@commands.has_role(manage_messages=True)\nasync def clear(ctx, amount: int = 10):"],
        explain: "Permissions are passed as keyword arguments, not strings. Leaving off @bot.command() means there is no command at all — just a guarded function nobody can call. has_role takes role names, not permissions." },
      lines: [
        "@bot.command()",
        "@commands.has_permissions(manage_messages=True)",
        "@commands.bot_has_permissions(manage_messages=True)",
        "async def clear(ctx, amount: int = 10):",
        "    deleted = await ctx.channel.purge(limit=amount + 1)",
        "    await ctx.send(f'Deleted {len(deleted) - 1} messages.', delete_after=5)"],
      decoys: [
        "@commands.has_permissions('manage_messages')",
        "    await ctx.channel.purge(amount)"],
      written: {
        prompt: 'Write the command: !clear defaults to 10, requires manage_messages from both the user and the bot, purges that many plus the command itself, and confirms with a self-deleting message.',
        solution: "@bot.command()\n@commands.has_permissions(manage_messages=True)\n@commands.bot_has_permissions(manage_messages=True)\nasync def clear(ctx, amount: int = 10):\n    deleted = await ctx.channel.purge(limit=amount + 1)\n    await ctx.send(f'Deleted {len(deleted) - 1} messages.', delete_after=5)",
        must: ['has_permissions', 'bot_has_permissions', 'manage_messages', 'purge', 'limit=', 'delete_after'] },
      walk: [
        ["@commands.has_permissions(manage_messages=True)", "Checks the person who typed it. Fails with MissingPermissions before the function body runs."],
        ["@commands.bot_has_permissions(manage_messages=True)", "Checks the bot. Catches the commonest support question of all: the bot's role sits too low in the server's role list."],
        ["    deleted = await ctx.channel.purge(limit=amount + 1)", "Plus one because the !clear message itself is in the channel too. purge gives back the list it deleted."],
        ["    await ctx.send(f'Deleted {len(deleted) - 1} messages.', delete_after=5)", "Minus one again so the count matches what the user asked for. delete_after tidies the confirmation away."]] }

  );
})();
