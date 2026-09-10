/* Coding tasks — Discord bots, the modern layers: slash commands, embeds and buttons,
   moderation, background jobs, cogs, and one whole bot at the end. */
(function () {
  window.CODETASKS = window.CODETASKS || [];
  var D5 = 'D5 · Slash commands';
  var D6 = 'D6 · Embeds and buttons';
  var D7 = 'D7 · Roles and moderation';
  var D8 = 'D8 · Background jobs and cogs';
  var D9 = 'D9 · A whole bot';

  window.CODETASKS.push(

    { key: 'dcslash', group: D5, lvl: 2, title: 'Your first slash command',
      ask: 'Make /ping, and sync it to one test server so it appears immediately.',
      why: 'Slash commands are what Discord wants bots to use. The catch nobody warns you about is the sync.',
      mcq: {
        q: 'Which one actually appears in the client?',
        correct: "@bot.tree.command(name='ping', description='Check I am alive')\nasync def ping(interaction: discord.Interaction):\n    await interaction.response.send_message('Pong!')\n# and, once: await bot.tree.sync()",
        wrong: [
          "@bot.tree.command(name='ping')\nasync def ping(interaction):\n    await interaction.send('Pong!')",
          "@bot.command()\nasync def ping(interaction: discord.Interaction):\n    await interaction.response.send_message('Pong!')",
          "@bot.tree.command(name='ping')\nasync def ping(ctx):\n    await ctx.send('Pong!')"],
        explain: "A slash command answers through interaction.response.send_message — an interaction has no bare .send. @bot.command() makes a prefix command instead, and a slash command is handed an Interaction, never a ctx. Nothing shows up in the client until tree.sync() has run at least once." },
      lines: [
        "@bot.tree.command(name='ping', description='Check I am alive')",
        "async def ping(interaction: discord.Interaction):",
        "    ms = round(bot.latency * 1000)",
        "    await interaction.response.send_message(f'Pong! {ms}ms')",
        "async def setup_hook():",
        "    guild = discord.Object(id=GUILD_ID)",
        "    bot.tree.copy_global_to(guild=guild)",
        "    await bot.tree.sync(guild=guild)",
        "bot.setup_hook = setup_hook"],
      decoys: [
        "    await interaction.send('Pong!')",
        "    await bot.tree.sync(GUILD_ID)"],
      written: {
        prompt: 'Write it: a /ping slash command that reports latency, plus a setup_hook that copies the global commands to one guild and syncs there.',
        solution: "@bot.tree.command(name='ping', description='Check I am alive')\nasync def ping(interaction: discord.Interaction):\n    ms = round(bot.latency * 1000)\n    await interaction.response.send_message(f'Pong! {ms}ms')\n\nasync def setup_hook():\n    guild = discord.Object(id=GUILD_ID)\n    bot.tree.copy_global_to(guild=guild)\n    await bot.tree.sync(guild=guild)\n\nbot.setup_hook = setup_hook",
        must: ['bot.tree.command', 'discord.Interaction', 'interaction.response.send_message', 'setup_hook', 'discord.Object', 'tree.sync'] },
      walk: [
        ["@bot.tree.command(name='ping', description='Check I am alive')", "The description is not optional decoration — it is the text people read in the client while typing."],
        ["async def ping(interaction: discord.Interaction):", "interaction replaces ctx. interaction.user, .channel and .guild are the same ideas under new names."],
        ["    await interaction.response.send_message(f'Pong! {ms}ms')", "You get exactly one response per interaction, and three seconds to give it. Add ephemeral=True to show it only to the caller."],
        ["    guild = discord.Object(id=GUILD_ID)", "A lightweight stand-in for a server when all you have is its ID."],
        ["    bot.tree.copy_global_to(guild=guild)", "Copies your global commands into that one server's list."],
        ["    await bot.tree.sync(guild=guild)", "A guild sync is instant. A global sync can take up to an hour to appear, which is why everyone develops against one test server."]] },

    { key: 'dcslashopt', group: D5, lvl: 2, title: 'Slash options, described and limited',
      ask: 'Make /roll take a number of sides, describe it in the client, and default to 6.',
      why: 'The whole point of slash commands: the user cannot type the wrong thing, because Discord will not let them.',
      mcq: {
        q: 'Which one gives a described, optional, numeric option?',
        correct: "@bot.tree.command(name='roll')\n@app_commands.describe(sides='How many sides the die has')\nasync def roll(interaction: discord.Interaction, sides: int = 6):",
        wrong: [
          "@bot.tree.command(name='roll')\nasync def roll(interaction, sides='How many sides'):",
          "@bot.tree.command(name='roll', describe='How many sides')\nasync def roll(interaction, sides: int = 6):",
          "@app_commands.describe(sides='How many sides')\nasync def roll(interaction: discord.Interaction, sides: int = 6):"],
        explain: "describe is its own decorator from app_commands, keyed by parameter name, and tree.command has no describe argument. Without @bot.tree.command there is no command registered at all." },
      lines: [
        "@bot.tree.command(name='roll', description='Roll a die')",
        "@app_commands.describe(sides='How many sides the die has')",
        "async def roll(interaction: discord.Interaction, sides: int = 6):",
        "    if sides < 2:",
        "        await interaction.response.send_message('Need at least 2 sides.', ephemeral=True)",
        "        return",
        "    result = random.randint(1, sides)",
        "    await interaction.response.send_message(f'🎲 {result} (d{sides})')"],
      decoys: [
        "@bot.tree.command(name='roll', describe='How many sides')",
        "    await interaction.send(result)"],
      written: {
        prompt: 'Write it: /roll with a described optional int option defaulting to 6, an ephemeral complaint if it is under 2, otherwise a random result.',
        solution: "@bot.tree.command(name='roll', description='Roll a die')\n@app_commands.describe(sides='How many sides the die has')\nasync def roll(interaction: discord.Interaction, sides: int = 6):\n    if sides < 2:\n        await interaction.response.send_message('Need at least 2 sides.', ephemeral=True)\n        return\n    result = random.randint(1, sides)\n    await interaction.response.send_message(f'🎲 {result} (d{sides})')",
        must: ['tree.command', 'app_commands.describe', 'sides: int = 6', 'ephemeral=True', 'random.randint', 'send_message'] },
      walk: [
        ["@app_commands.describe(sides='How many sides the die has')", "One keyword per parameter. It is the difference between a command people can use and one they have to guess at."],
        ["async def roll(interaction: discord.Interaction, sides: int = 6):", "The int hint makes Discord itself reject non-numbers before your code ever runs. The default makes the option optional."],
        ["        await interaction.response.send_message('Need at least 2 sides.', ephemeral=True)", "ephemeral means only the person who ran it sees the message. The polite way to say no."],
        ["        return", "You get one response per interaction. Without the return you would try to answer twice and raise InteractionResponded."]] },

    { key: 'dcembed', group: D6, lvl: 2, title: 'Build an embed',
      ask: 'Answer !profile with a coloured embed: their avatar, two fields, and a footer.',
      why: 'The visible difference between a first bot and a real one. It is all one object with methods hung off it.',
      mcq: {
        q: 'Which builds and sends the embed?',
        correct: "embed = discord.Embed(title='Profile', colour=discord.Colour.blue())\nembed.add_field(name='Joined', value=joined, inline=True)\nawait ctx.send(embed=embed)",
        wrong: [
          "embed = discord.Embed(title='Profile')\nembed.add_field('Joined', joined)\nawait ctx.send(embed)",
          "embed = discord.Embed(title='Profile')\nembed = embed.add_field(name='Joined', value=joined)\nawait ctx.send(embed=embed)",
          "embed = discord.Embed(title='Profile', field='Joined')\nawait ctx.send(embed=embed)"],
        explain: "add_field takes name= and value= by keyword, and the embed must be passed as embed= or it is sent as text. add_field does return the embed so chaining works, but reassigning it adds nothing — and Embed() has no field argument." },
      lines: [
        "@bot.command()",
        "async def profile(ctx, member: discord.Member = None):",
        "    member = member or ctx.author",
        "    embed = discord.Embed(title=member.display_name, colour=discord.Colour.blurple())",
        "    embed.set_thumbnail(url=member.display_avatar.url)",
        "    embed.add_field(name='Joined', value=member.joined_at.strftime('%d %b %Y'), inline=True)",
        "    embed.add_field(name='Roles', value=len(member.roles) - 1, inline=True)",
        "    embed.set_footer(text=f'Asked by {ctx.author.display_name}')",
        "    await ctx.send(embed=embed)"],
      decoys: [
        "    embed.add_field('Joined', member.joined_at)",
        "    await ctx.send(embed)"],
      written: {
        prompt: 'Write the command: !profile takes an optional member, builds a blurple embed with their name, avatar thumbnail, Joined and Roles fields inline, a footer naming the asker, and sends it.',
        solution: "@bot.command()\nasync def profile(ctx, member: discord.Member = None):\n    member = member or ctx.author\n    embed = discord.Embed(title=member.display_name, colour=discord.Colour.blurple())\n    embed.set_thumbnail(url=member.display_avatar.url)\n    embed.add_field(name='Joined', value=member.joined_at.strftime('%d %b %Y'), inline=True)\n    embed.add_field(name='Roles', value=len(member.roles) - 1, inline=True)\n    embed.set_footer(text=f'Asked by {ctx.author.display_name}')\n    await ctx.send(embed=embed)",
        must: ['discord.Embed', 'colour', 'set_thumbnail', 'display_avatar', 'add_field', 'name=', 'value=', 'set_footer', 'embed=embed'] },
      walk: [
        ["    embed = discord.Embed(title=member.display_name, colour=discord.Colour.blurple())", "colour and color both work — the library accepts either spelling. A raw hex like 0x5865F2 works too."],
        ["    embed.set_thumbnail(url=member.display_avatar.url)", "The small image in the top corner. set_image is the big one across the bottom."],
        ["    embed.add_field(name='Joined', value=..., inline=True)", "Two inline fields sit side by side; three fill the row. inline=False gives a field its own line."],
        ["    embed.set_footer(text=f'Asked by {ctx.author.display_name}')", "Small print at the bottom. An embed allows 25 fields and 6000 characters in total."],
        ["    await ctx.send(embed=embed)", "The keyword is what makes it an embed rather than text. You can send content and an embed in the same call."]] },

    { key: 'dcbutton', group: D6, lvl: 3, title: 'A message with buttons',
      ask: 'Ask a yes/no question with two buttons, only the asker may press them, and grey them out once answered.',
      why: 'Views are the modern way to ask a question. The three things everyone forgets are the timeout, the check and disabling afterwards.',
      mcq: {
        q: 'Which button callback has the right signature for discord.py 2.x?',
        correct: "@discord.ui.button(label='Yes', style=discord.ButtonStyle.success)\nasync def yes(self, interaction: discord.Interaction, button: discord.ui.Button):",
        wrong: [
          "@discord.ui.button(label='Yes')\nasync def yes(self, button: discord.ui.Button, interaction: discord.Interaction):",
          "@discord.ui.button(label='Yes')\ndef yes(self, interaction, button):",
          "@discord.ui.button(label='Yes')\nasync def yes(interaction, button):"],
        explain: "In 2.x the order is interaction FIRST, then button — it was the other way round in 1.x, which is why old tutorials break. The callback is a method on the View, so it takes self, and it must be async." },
      lines: [
        "class Confirm(discord.ui.View):",
        "    def __init__(self, author):",
        "        super().__init__(timeout=30)",
        "        self.author = author",
        "    async def interaction_check(self, interaction):",
        "        return interaction.user == self.author",
        "    @discord.ui.button(label='Yes', style=discord.ButtonStyle.success)",
        "    async def yes(self, interaction: discord.Interaction, button: discord.ui.Button):",
        "        for item in self.children:",
        "            item.disabled = True",
        "        await interaction.response.edit_message(content='Confirmed.', view=self)",
        "        self.stop()"],
      decoys: [
        "    async def yes(self, button, interaction):",
        "        super().__init__(timeout='30')"],
      written: {
        prompt: 'Write the View: a 30-second timeout, an interaction_check restricting it to the author, and a green Yes button that disables every child, edits the message, and stops the view.',
        solution: "class Confirm(discord.ui.View):\n    def __init__(self, author):\n        super().__init__(timeout=30)\n        self.author = author\n\n    async def interaction_check(self, interaction):\n        return interaction.user == self.author\n\n    @discord.ui.button(label='Yes', style=discord.ButtonStyle.success)\n    async def yes(self, interaction: discord.Interaction, button: discord.ui.Button):\n        for item in self.children:\n            item.disabled = True\n        await interaction.response.edit_message(content='Confirmed.', view=self)\n        self.stop()",
        must: ['discord.ui.View', 'timeout=30', 'interaction_check', 'discord.ui.button', 'interaction: discord.Interaction', 'disabled = True', 'edit_message', 'self.stop'] },
      walk: [
        ["        super().__init__(timeout=30)", "Without a timeout the buttons sit there for ever — and stop working silently the moment the bot restarts."],
        ["    async def interaction_check(self, interaction):", "Runs before every button press. Return False and nothing happens. Without it, anyone scrolling past can answer your question."],
        ["    @discord.ui.button(label='Yes', style=discord.ButtonStyle.success)", "Five styles: primary, secondary, success, danger, and link for a plain URL button that needs no callback."],
        ["        for item in self.children:", "self.children is every component on the view."],
        ["        await interaction.response.edit_message(content='Confirmed.', view=self)", "edit_message changes the message the button was on. Passing view=self is what makes the greyed-out buttons show."],
        ["        self.stop()", "Ends the view now rather than waiting for the timeout."]] },

    { key: 'dcrole', group: D7, lvl: 2, title: 'Give and take a role',
      ask: 'Make !role @someone Member add the role if they lack it and remove it if they have it.',
      why: 'Self-assign roles, verification, colour roles — all of them are this one function.',
      mcq: {
        q: 'Which body toggles the role safely?',
        correct: "if role in member.roles:\n    await member.remove_roles(role)\nelse:\n    await member.add_roles(role)",
        wrong: [
          "if role in member.roles:\n    member.remove_roles(role)\nelse:\n    member.add_roles(role)",
          "if member.has_role(role):\n    await member.remove_role(role)\nelse:\n    await member.add_role(role)",
          "if role in member.roles:\n    await member.roles.remove(role)\nelse:\n    await member.roles.append(role)"],
        explain: "The methods are add_roles and remove_roles — plural, awaited, on the member. There is no has_role method, and member.roles is a read-only list: changing it locally does nothing to Discord." },
      lines: [
        "@bot.command()",
        "@commands.has_permissions(manage_roles=True)",
        "async def role(ctx, member: discord.Member, *, role: discord.Role):",
        "    if role >= ctx.guild.me.top_role:",
        "        await ctx.send('That role is above mine — I cannot touch it.')",
        "        return",
        "    if role in member.roles:",
        "        await member.remove_roles(role)",
        "        await ctx.send(f'Took {role.name} from {member.display_name}.')",
        "    else:",
        "        await member.add_roles(role)",
        "        await ctx.send(f'Gave {role.name} to {member.display_name}.')"],
      decoys: [
        "        member.add_roles(role)",
        "        await member.roles.append(role)"],
      written: {
        prompt: 'Write the command: !role takes a Member and a Role, refuses roles at or above the bot\'s top role, then toggles it and reports what it did.',
        solution: "@bot.command()\n@commands.has_permissions(manage_roles=True)\nasync def role(ctx, member: discord.Member, *, role: discord.Role):\n    if role >= ctx.guild.me.top_role:\n        await ctx.send('That role is above mine — I cannot touch it.')\n        return\n    if role in member.roles:\n        await member.remove_roles(role)\n        await ctx.send(f'Took {role.name} from {member.display_name}.')\n    else:\n        await member.add_roles(role)\n        await ctx.send(f'Gave {role.name} to {member.display_name}.')",
        must: ['has_permissions', 'manage_roles', 'discord.Member', 'discord.Role', 'top_role', 'remove_roles', 'add_roles'] },
      walk: [
        ["async def role(ctx, member: discord.Member, *, role: discord.Role):", "The bare * lets the role name contain spaces, so !role @Ann Server Booster works."],
        ["    if role >= ctx.guild.me.top_role:", "Roles compare by position. ctx.guild.me is the bot as a member of this server. A bot can only manage roles BELOW its own — this check turns a crash into a clear sentence."],
        ["    if role in member.roles:", "The whole toggle. member.roles is a plain list of Role objects."],
        ["        await member.remove_roles(role)", "Both methods take several roles at once: add_roles(a, b, c)."]] },

    { key: 'dcmod', group: D7, lvl: 2, title: 'Kick, ban and time out',
      ask: 'Write !timeout @someone 10 that mutes a member for ten minutes, with the failures handled.',
      why: 'Moderation commands are the ones that get used in anger. They must say clearly when they cannot do the job.',
      mcq: {
        q: 'Which times a member out for ten minutes?',
        correct: "await member.timeout(datetime.timedelta(minutes=10), reason=reason)",
        wrong: [
          "await member.timeout(10)",
          "await member.mute(minutes=10)",
          "await member.edit(timeout=10)"],
        explain: "timeout takes a timedelta (or an exact datetime), not a bare number. There is no mute method — a Discord timeout is the built-in feature that replaced mute roles." },
      lines: [
        "@bot.command()",
        "@commands.has_permissions(moderate_members=True)",
        "async def timeout(ctx, member: discord.Member, minutes: int, *, reason='No reason given'):",
        "    if member.top_role >= ctx.guild.me.top_role:",
        "        await ctx.send('I cannot moderate someone above me.')",
        "        return",
        "    try:",
        "        await member.timeout(datetime.timedelta(minutes=minutes), reason=reason)",
        "    except discord.Forbidden:",
        "        await ctx.send('I do not have permission to do that.')",
        "    else:",
        "        await ctx.send(f'{member.display_name} timed out for {minutes} min — {reason}')"],
      decoys: [
        "        await member.timeout(minutes)",
        "        await member.mute(minutes=minutes)"],
      written: {
        prompt: 'Write the command: !timeout requires moderate_members, refuses anyone above the bot, times the member out for the given minutes with a reason, catches Forbidden, and confirms only when it worked.',
        solution: "@bot.command()\n@commands.has_permissions(moderate_members=True)\nasync def timeout(ctx, member: discord.Member, minutes: int, *, reason='No reason given'):\n    if member.top_role >= ctx.guild.me.top_role:\n        await ctx.send('I cannot moderate someone above me.')\n        return\n    try:\n        await member.timeout(datetime.timedelta(minutes=minutes), reason=reason)\n    except discord.Forbidden:\n        await ctx.send('I do not have permission to do that.')\n    else:\n        await ctx.send(f'{member.display_name} timed out for {minutes} min — {reason}')",
        must: ['moderate_members', 'discord.Member', 'minutes: int', 'top_role', 'timedelta', 'member.timeout', 'discord.Forbidden'] },
      walk: [
        ["@commands.has_permissions(moderate_members=True)", "Moderate Members is the permission behind timeouts, separate from kick and ban."],
        ["async def timeout(ctx, member: discord.Member, minutes: int, *, reason='No reason given'):", "A default on the rest-of-line argument makes the reason optional."],
        ["    if member.top_role >= ctx.guild.me.top_role:", "Same role-hierarchy rule as giving roles: nobody can moderate someone at or above their level, bots included."],
        ["        await member.timeout(datetime.timedelta(minutes=minutes), reason=reason)", "Needs `import datetime`. The reason goes into the server's audit log. Discord's maximum is 28 days."],
        ["    except discord.Forbidden:", "Forbidden means Discord refused on permissions. HTTPException is the wider net for everything else it rejected."],
        ["    else:", "The else of a try runs only when nothing was raised — so the confirmation cannot fire after a failure."]] },

    { key: 'dcloop', group: D8, lvl: 3, title: 'A job that runs on a timer',
      ask: 'Post a reminder in one channel every hour, starting only after the bot is logged in.',
      why: 'Reminders, backups, status updates, polling an API — the ext.tasks loop is the right tool and asyncio.sleep in a while-loop is not.',
      mcq: {
        q: 'Which one runs safely every hour?',
        correct: "@tasks.loop(hours=1)\nasync def remind():\n    ...\n\n@remind.before_loop\nasync def before():\n    await bot.wait_until_ready()",
        wrong: [
          "@tasks.loop(hours=1)\ndef remind():\n    ...",
          "while True:\n    time.sleep(3600)\n    await channel.send('...')",
          "@tasks.loop(3600)\nasync def remind():\n    ..."],
        explain: "The loop function must be async. time.sleep blocks the whole bot for everyone on every server. And the interval is a keyword: seconds=, minutes=, hours= — a bare number is not accepted." },
      lines: [
        "@tasks.loop(hours=1)",
        "async def remind():",
        "    channel = bot.get_channel(CHANNEL_ID)",
        "    if channel is None:",
        "        return",
        "    await channel.send('Stretch your legs.')",
        "@remind.before_loop",
        "async def before_remind():",
        "    await bot.wait_until_ready()",
        "@bot.event",
        "async def on_ready():",
        "    if not remind.is_running():",
        "        remind.start()"],
      decoys: [
        "    time.sleep(3600)",
        "    remind.start()"],
      written: {
        prompt: 'Write it: an hourly tasks loop that posts in a channel by ID, a before_loop that waits until ready, and an on_ready that starts it only if it is not already running.',
        solution: "@tasks.loop(hours=1)\nasync def remind():\n    channel = bot.get_channel(CHANNEL_ID)\n    if channel is None:\n        return\n    await channel.send('Stretch your legs.')\n\n@remind.before_loop\nasync def before_remind():\n    await bot.wait_until_ready()\n\n@bot.event\nasync def on_ready():\n    if not remind.is_running():\n        remind.start()",
        must: ['tasks.loop', 'hours=1', 'get_channel', 'before_loop', 'wait_until_ready', 'is_running', 'remind.start'] },
      walk: [
        ["@tasks.loop(hours=1)", "The library handles the timing, the errors and the restart. You write the body."],
        ["    channel = bot.get_channel(CHANNEL_ID)", "get_channel reads the cache and is instant. It returns None if the bot cannot see that channel — check before using it."],
        ["@remind.before_loop", "Runs once, before the first tick."],
        ["    await bot.wait_until_ready()", "Without this the first run happens before login, when the bot has no channels at all."],
        ["    if not remind.is_running():", "on_ready can fire again after a dropped connection, and starting a running loop raises. This guard is why."]] },

    { key: 'dccog', group: D8, lvl: 3, title: 'Split the bot into cogs',
      ask: 'Move the fun commands into cogs/fun.py and load it when the bot starts.',
      why: 'The moment a bot passes about two hundred lines, one file stops working. A cog is one file of related commands.',
      mcq: {
        q: 'Which cog file loads correctly in discord.py 2.x?',
        correct: "class Fun(commands.Cog):\n    def __init__(self, bot):\n        self.bot = bot\n\n    @commands.command()\n    async def roll(self, ctx):\n        ...\n\nasync def setup(bot):\n    await bot.add_cog(Fun(bot))",
        wrong: [
          "class Fun(commands.Cog):\n    @bot.command()\n    async def roll(self, ctx):\n        ...\n\ndef setup(bot):\n    bot.add_cog(Fun(bot))",
          "class Fun(commands.Cog):\n    @commands.command()\n    async def roll(ctx):\n        ...\n\nasync def setup(bot):\n    await bot.add_cog(Fun())",
          "class Fun:\n    @commands.command()\n    async def roll(self, ctx):\n        ...\n\nasync def setup(bot):\n    await bot.add_cog(Fun(bot))"],
        explain: "In 2.x both setup and add_cog are async. Inside a cog the decorator is @commands.command(), not @bot.command() — there is no bot in that file. Cog methods take self first, and the class must inherit from commands.Cog." },
      lines: [
        "class Fun(commands.Cog):",
        "    def __init__(self, bot):",
        "        self.bot = bot",
        "    @commands.command()",
        "    async def roll(self, ctx, sides: int = 6):",
        "        await ctx.send(random.randint(1, sides))",
        "    @commands.Cog.listener()",
        "    async def on_message(self, message):",
        "        pass",
        "async def setup(bot):",
        "    await bot.add_cog(Fun(bot))"],
      decoys: [
        "    @bot.command()",
        "def setup(bot):"],
      written: {
        prompt: 'Write the cog file: a Fun cog holding the bot, a !roll command with an optional int, a Cog.listener for on_message, and the async setup function at the bottom.',
        solution: "class Fun(commands.Cog):\n    def __init__(self, bot):\n        self.bot = bot\n\n    @commands.command()\n    async def roll(self, ctx, sides: int = 6):\n        await ctx.send(random.randint(1, sides))\n\n    @commands.Cog.listener()\n    async def on_message(self, message):\n        pass\n\nasync def setup(bot):\n    await bot.add_cog(Fun(bot))",
        must: ['commands.Cog', 'def __init__', 'self.bot = bot', '@commands.command()', 'self, ctx', 'Cog.listener', 'async def setup', 'add_cog'] },
      walk: [
        ["    def __init__(self, bot):", "The cog is handed the bot so its commands can reach the rest of the app."],
        ["    @commands.command()", "@bot.command() cannot work here — this file never sees the bot object."],
        ["    async def roll(self, ctx, sides: int = 6):", "Note the self. Every cog command takes self first, then ctx."],
        ["    @commands.Cog.listener()", "The cog version of @bot.event — and unlike @bot.event, several cogs can listen to the same event without overwriting each other."],
        ["async def setup(bot):", "The loader looks for exactly this name in the file. Load it with await bot.load_extension('cogs.fun') — a dotted path, no slashes and no .py."]] },

    { key: 'dcwhole', group: D9, lvl: 3, title: 'The whole bot, one file',
      ask: 'Put it all together: token from the environment, intents, a prefix command, a slash command, an error handler, and run it.',
      why: 'Every layer you have learned, in the order a real bot file puts them.',
      mcq: {
        q: 'What is the correct order of a bot file?',
        correct: "imports → load_dotenv → intents → bot → events → commands → bot.run(TOKEN)",
        wrong: [
          "imports → bot.run(TOKEN) → commands → events",
          "imports → bot → bot.run(TOKEN) → intents → commands",
          "commands → imports → intents → bot → bot.run(TOKEN)"],
        explain: "bot.run blocks for ever, so anything after it never executes. The bot object needs intents to already exist, and the decorators need the bot object to already exist. The order is not a style choice." },
      lines: [
        "import os, discord",
        "from discord.ext import commands",
        "from dotenv import load_dotenv",
        "load_dotenv()",
        "intents = discord.Intents.default()",
        "intents.message_content = True",
        "bot = commands.Bot(command_prefix='!', intents=intents)",
        "@bot.event\nasync def on_ready():",
        "    await bot.tree.sync()",
        "    print(f'Ready as {bot.user}')",
        "@bot.command()",
        "async def hello(ctx):",
        "    await ctx.send(f'Hi {ctx.author.mention}')",
        "@bot.tree.command(name='hello', description='Say hi')",
        "async def hello_slash(interaction: discord.Interaction):",
        "    await interaction.response.send_message('Hi!')",
        "@bot.event\nasync def on_command_error(ctx, error):",
        "    if isinstance(error, commands.CommandNotFound):",
        "        return",
        "    raise error",
        "bot.run(os.getenv('DISCORD_TOKEN'))"],
      decoys: [
        "bot.run(TOKEN)",
        "intents = discord.Intents()"],
      written: {
        prompt: 'Write the whole file: imports, load_dotenv, intents with message_content, the bot, an on_ready that syncs the tree, a !hello command, a /hello slash command, an error handler that ignores CommandNotFound and re-raises the rest, and run with the token from the environment.',
        solution: "import os, discord\nfrom discord.ext import commands\nfrom dotenv import load_dotenv\n\nload_dotenv()\n\nintents = discord.Intents.default()\nintents.message_content = True\nbot = commands.Bot(command_prefix='!', intents=intents)\n\n@bot.event\nasync def on_ready():\n    await bot.tree.sync()\n    print(f'Ready as {bot.user}')\n\n@bot.command()\nasync def hello(ctx):\n    await ctx.send(f'Hi {ctx.author.mention}')\n\n@bot.tree.command(name='hello', description='Say hi')\nasync def hello_slash(interaction: discord.Interaction):\n    await interaction.response.send_message('Hi!')\n\n@bot.event\nasync def on_command_error(ctx, error):\n    if isinstance(error, commands.CommandNotFound):\n        return\n    raise error\n\nbot.run(os.getenv('DISCORD_TOKEN'))",
        must: ['load_dotenv', 'Intents.default', 'message_content', 'commands.Bot', 'on_ready', 'tree.sync', '@bot.command()', 'tree.command', 'on_command_error', 'bot.run', 'DISCORD_TOKEN'] },
      walk: [
        ["import os, discord", "Everything the file needs, at the top, once."],
        ["load_dotenv()", "Before anything reads the environment."],
        ["intents.message_content = True", "Or prefix commands quietly stop working and you spend an evening finding out why."],
        ["bot = commands.Bot(command_prefix='!', intents=intents)", "Nothing below this line can be written above it — every decorator needs this object to exist."],
        ["    await bot.tree.sync()", "Fine here while learning. In a real bot it belongs in setup_hook, because on_ready can fire again after a reconnect."],
        ["@bot.command()", "The prefix command and the slash command can share a name because they live in different places. Two function names, though — Python still needs those to differ."],
        ["bot.run(os.getenv('DISCORD_TOKEN'))", "The last line, always. Everything below it is dead code."]] }

  );
})();
