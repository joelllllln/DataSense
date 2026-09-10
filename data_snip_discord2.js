/* Quickfire cards — Discord bots, part 2: proper commands instead of if-statements,
   the arguments they take, and stopping the wrong person running them. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var CMD = 'Discord · prefix commands';
  var ARG = 'Discord · command arguments';
  var CHK = 'Discord · checks & errors';

  window.SNIPPETS.push(

    /* ---- prefix commands ---- */
    { id: 'dc-command', group: CMD, lvl: 1,
      ask: 'Make !ping reply with Pong!',
      a: "@bot.command()\nasync def ping(ctx):\n    await ctx.send('Pong!')",
      note: 'The function name IS the command name. This is the shape of every command you will ever write.' },

    { id: 'dc-command-name', group: CMD, lvl: 1,
      ask: 'Name a command something different from its function',
      a: "@bot.command(name='hello')\nasync def say_hello(ctx):\n    ...",
      note: 'Useful when the good name is a Python keyword, or already taken.' },

    { id: 'dc-command-aliases', group: CMD, lvl: 2,
      ask: 'Give a command two extra names',
      a: "@bot.command(aliases=['p', 'latency'])",
      note: '!ping, !p and !latency now all run the same function.' },

    { id: 'dc-ctx-send', group: CMD, lvl: 1,
      ask: 'Send a message back from inside a command',
      a: "await ctx.send('hello')",
      note: 'ctx is the context: who ran it, where, and how to answer. It is always the first parameter.' },

    { id: 'dc-ctx-author', group: CMD, lvl: 1,
      ask: 'Who ran the command',
      a: 'ctx.author',
      note: 'ctx.author.mention pings them, ctx.author.display_name is their name on this server.' },

    { id: 'dc-ctx-guild', group: CMD, lvl: 1,
      ask: 'The server and the channel the command was run in',
      a: 'ctx.guild\nctx.channel',
      note: 'ctx.guild is None in a direct message — check for it before using it.' },

    { id: 'dc-ctx-message', group: CMD, lvl: 2,
      ask: 'The original message that triggered the command',
      a: 'ctx.message',
      note: 'await ctx.message.delete() tidies the command away after it has run.' },

    { id: 'dc-command-help', group: CMD, lvl: 2,
      ask: 'Give a command a description for the help page',
      a: "@bot.command(help='Show the bot latency')",
      note: 'A docstring under the def does the same job and reads better.' },

    { id: 'dc-remove-help', group: CMD, lvl: 3,
      ask: 'Remove the built-in help command so you can write your own',
      a: "bot.remove_command('help')",
      note: 'Do it right after making the bot, before you define your version.' },

    { id: 'dc-group', group: CMD, lvl: 3,
      ask: 'Make !settings a command with sub-commands',
      a: '@bot.group()\nasync def settings(ctx):\n    ...\n\n@settings.command()\nasync def prefix(ctx):\n    ...',
      note: 'Now !settings prefix runs the second one. invoke_without_command=True stops the parent running too.' },

    { id: 'dc-hidden', group: CMD, lvl: 3,
      ask: 'Hide a command from the help list',
      a: '@bot.command(hidden=True)' },

    { id: 'dc-guild-only', group: CMD, lvl: 2,
      ask: 'Block a command from being used in direct messages',
      a: '@commands.guild_only()',
      note: 'Goes under @bot.command(). Anything that touches ctx.guild needs it.' },

    { id: 'dc-invoke', group: CMD, lvl: 3,
      ask: 'Run one command from inside another',
      a: "await ctx.invoke(bot.get_command('ping'))" },

    /* ---- command arguments ---- */
    { id: 'dc-arg-basic', group: ARG, lvl: 1,
      ask: 'A command that takes one word after it: !say hello',
      a: '@bot.command()\nasync def say(ctx, word):\n    await ctx.send(word)',
      note: 'Arguments are split on spaces. !say hello world would put only "hello" in word.' },

    { id: 'dc-arg-rest', group: ARG, lvl: 1,
      ask: 'Take everything after the command as one string',
      a: '@bot.command()\nasync def say(ctx, *, text):\n    await ctx.send(text)',
      note: 'The bare * means "the rest of the line goes in here". It must be the LAST parameter.' },

    { id: 'dc-arg-int', group: ARG, lvl: 1,
      ask: 'Take two numbers and add them: !add 2 3',
      a: '@bot.command()\nasync def add(ctx, a: int, b: int):\n    await ctx.send(a + b)',
      note: 'The `: int` is not decoration — the library converts the text for you, and errors if it cannot.' },

    { id: 'dc-arg-default', group: ARG, lvl: 1,
      ask: 'Give an argument a default so it can be left out',
      a: "@bot.command()\nasync def hi(ctx, name='friend'):\n    await ctx.send(f'hi {name}')" },

    { id: 'dc-arg-member', group: ARG, lvl: 1,
      ask: 'Take a member as an argument: !hug @Ann',
      a: '@bot.command()\nasync def hug(ctx, member: discord.Member):\n    ...',
      note: 'A mention, a user ID or a name all work — the library turns them into a Member object.' },

    { id: 'dc-arg-member-default', group: ARG, lvl: 2,
      ask: 'Default a member argument to whoever ran the command',
      a: '@bot.command()\nasync def avatar(ctx, member: discord.Member = None):\n    member = member or ctx.author',
      note: 'The standard shape of every profile/avatar/userinfo command.' },

    { id: 'dc-arg-channel', group: ARG, lvl: 2,
      ask: 'Take a channel as an argument',
      a: 'async def announce(ctx, channel: discord.TextChannel, *, text):' },

    { id: 'dc-arg-role', group: ARG, lvl: 2,
      ask: 'Take a role as an argument',
      a: 'async def give(ctx, member: discord.Member, role: discord.Role):' },

    { id: 'dc-arg-star', group: ARG, lvl: 3,
      ask: 'Take any number of members: !kick @a @b @c',
      a: 'async def kick(ctx, members: commands.Greedy[discord.Member]):',
      note: 'Greedy eats as many as it can convert, then stops and hands the rest on.' },

    { id: 'dc-arg-optional', group: ARG, lvl: 3,
      ask: 'An argument that may or may not be there, typed properly',
      a: 'from typing import Optional\nasync def clear(ctx, amount: Optional[int] = 10):' },

    { id: 'dc-arg-quotes', group: ARG, lvl: 2,
      ask: 'How a user passes an argument that contains spaces',
      a: '!say "two words"',
      note: 'Quotes group words into one argument. The alternative is the keyword-only * form.' },

    /* ---- checks & errors ---- */
    { id: 'dc-has-perms', group: CHK, lvl: 1,
      ask: 'Only let people who can kick members run a command',
      a: '@commands.has_permissions(kick_members=True)',
      note: 'Goes between @bot.command() and the def. Fails with MissingPermissions.' },

    { id: 'dc-bot-has-perms', group: CHK, lvl: 2,
      ask: 'Check the BOT has the permission before trying',
      a: '@commands.bot_has_permissions(manage_messages=True)',
      note: 'Catches the commonest support question: the bot\'s role is too low in the list.' },

    { id: 'dc-is-owner', group: CHK, lvl: 1,
      ask: 'Restrict a command to the bot owner',
      a: '@commands.is_owner()',
      note: 'The right guard for shutdown, reload and eval commands.' },

    { id: 'dc-has-role', group: CHK, lvl: 2,
      ask: 'Require a named role',
      a: "@commands.has_role('Moderator')",
      note: 'has_any_role("Mod", "Admin") accepts more than one.' },

    { id: 'dc-custom-check', group: CHK, lvl: 3,
      ask: 'Write your own check',
      a: 'def in_bots_channel(ctx):\n    return ctx.channel.name == \'bots\'\n\n@commands.check(in_bots_channel)',
      note: 'Any function that takes ctx and returns True or False.' },

    { id: 'dc-cooldown', group: CHK, lvl: 2,
      ask: 'Let each user run a command once every five seconds',
      a: '@commands.cooldown(1, 5, commands.BucketType.user)',
      note: 'BucketType.guild limits the whole server, .channel one channel, .default everyone together.' },

    { id: 'dc-max-concurrency', group: CHK, lvl: 3,
      ask: 'Stop one user running two copies of a slow command at once',
      a: '@commands.max_concurrency(1, commands.BucketType.user)' },

    { id: 'dc-on-command-error', group: CHK, lvl: 1,
      ask: 'Catch every command error in one place',
      a: '@bot.event\nasync def on_command_error(ctx, error):\n    ...',
      note: 'Without it, errors print to your console and the user sees silence.' },

    { id: 'dc-err-missing-arg', group: CHK, lvl: 2,
      ask: 'Tell the user they left an argument out',
      a: "if isinstance(error, commands.MissingRequiredArgument):\n    await ctx.send(f'Missing: {error.param.name}')" },

    { id: 'dc-err-notfound', group: CHK, lvl: 2,
      ask: 'Silently ignore an unknown command',
      a: 'if isinstance(error, commands.CommandNotFound):\n    return',
      note: 'Otherwise every typo on a busy server fills your logs.' },

    { id: 'dc-err-cooldown', group: CHK, lvl: 2,
      ask: 'Tell the user how long is left on a cooldown',
      a: "if isinstance(error, commands.CommandOnCooldown):\n    await ctx.send(f'Wait {error.retry_after:.0f}s')" },

    { id: 'dc-err-perms', group: CHK, lvl: 2,
      ask: 'Answer a permission failure politely',
      a: "if isinstance(error, commands.MissingPermissions):\n    await ctx.send('You cannot do that.')" },

    { id: 'dc-err-badarg', group: CHK, lvl: 2,
      ask: 'Catch "that is not a number" and "no such member"',
      a: 'if isinstance(error, commands.BadArgument):\n    ...',
      note: 'MemberNotFound and ChannelNotFound are BadArgument underneath, so this catches them too.' },

    { id: 'dc-err-command-invoke', group: CHK, lvl: 3,
      ask: 'Get at the real exception raised inside a command',
      a: 'error.original',
      note: 'The library wraps it in CommandInvokeError; .original is your actual traceback.' },

    { id: 'dc-local-error', group: CHK, lvl: 3,
      ask: 'Handle errors for one command only',
      a: '@ping.error\nasync def ping_error(ctx, error):\n    ...',
      note: 'Named after the command function. Runs before the global handler.' }

  );
})();
