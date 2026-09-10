/* The course, stage 07 — Making Discord bots.
   The same slow lane as stage 01, pointed at a different thing. Each unit adds ONE
   layer: log in, hear a message, answer it, take an argument, guard it, make it pretty,
   split it up, keep it running. Nothing assumes anything from the unit before except
   the layer it added. Python only — no prior Discord knowledge at all. */
(function () {
  window.COURSE = window.COURSE || { stages: [] };

  window.COURSE.stages.push({
    key: 'disc', no: '07', name: 'Making Discord bots',
    blurb: 'From an empty file to a bot with slash commands, buttons, moderation and a job that runs every hour — one layer at a time, in discord.py.',
    units: [

      { key: 'b1', name: 'What a bot actually is',
        blurb: 'An application, a bot user, and a token. Then eight lines that log in.',
        needs: 'basic Python: functions, if, and running a file',
        steps: [
          { t: 'read', title: 'The three things you have to make first', body: [
            'A Discord bot is a normal Python program. It logs in to Discord like a user does, sits there listening, and reacts to what it hears. There is no magic and no hosting required to start — it runs on your laptop.',
            'Before any code, you make three things on Discord\'s own website (discord.com/developers/applications):',
            ['code', '1. An APPLICATION   — the project. Give it a name.\n2. A BOT user       — under the Bot tab. This is the account people will see.\n3. A TOKEN          — under the same tab, "Reset Token". Copy it once.', 'The token is the password for that bot account. Anyone who has it can control your bot completely. Never paste it into a chat, a screenshot or a file you commit.'],
            'Then you invite the bot to a server you own, from OAuth2 → URL Generator: tick **bot**, tick the permissions it needs, open the URL it builds, and choose the server. A bot cannot join by itself — somebody with Manage Server has to invite it.',
            'Now the code. Install the library first:',
            ['code', 'pip install -U discord.py', 'The package is called discord.py, but you `import discord`. That mismatch trips everyone up once.'],
            'And here is a whole bot — every line of it:',
            ['code', "import discord\nfrom discord.ext import commands\n\nintents = discord.Intents.default()\nbot = commands.Bot(command_prefix='!', intents=intents)\n\n@bot.event\nasync def on_ready():\n    print(f'Logged in as {bot.user}')\n\nbot.run(TOKEN)"],
            'Line by line: `discord` holds the types, `commands` holds the bot. `intents` is the list of events you are asking Discord to send you. `bot` is the one object that holds everything — your commands, your events and the connection. `@bot.event` turns the function below it into an event handler, and the **function name** picks which event. `bot.run` starts it and never returns.',
            'Run it with `python bot.py`. If the console prints "Logged in as", the hard part is over — everything else in this stage is adding lines to that file.',
            ['aside', 'Every function in a bot is `async def`, and everything that talks to Discord is `await`ed. You do not need to understand asyncio to write a bot: copy the shape, and remember that a missing `await` means "nothing happens and Python warns you about a coroutine".']
          ] },
          { t: 'quick', title: 'Drill: setting up and logging in', groups: ['Discord · setup & login'], lvl: 1 },
          { t: 'task', key: 'dcskeleton' },
          { t: 'task', key: 'dctoken' }
        ] },

      { key: 'b2', name: 'Intents',
        blurb: 'Why a brand-new bot can see that a message happened but not what it said.',
        needs: 'a bot that logs in',
        steps: [
          { t: 'read', title: 'Asking Discord for the events you need', body: [
            'Discord does not send a bot everything. You subscribe to categories of event, and those categories are called **intents**. Since discord.py 2.0 you have to say which ones you want — leaving them out is an error, not a default.',
            ['code', "intents = discord.Intents.default()\nintents.message_content = True\nintents.members = True\n\nbot = commands.Bot(command_prefix='!', intents=intents)"],
            '`Intents.default()` turns on everything Discord gives away freely. Three intents are **privileged** and off until you ask twice — once in code, and once by ticking a box on the Developer Portal under Bot → Privileged Gateway Intents:',
            ['code', 'message_content   what messages actually SAY\nmembers           joins, leaves, and the member list\npresences         who is online', 'Without message_content, `message.content` is an empty string and every prefix command silently stops working. That one fact is behind most "my bot does nothing" questions.'],
            'You only pay for what you ask for, so ask for what you need and no more. While learning, `discord.Intents.all()` is fine — just remember the portal boxes still have to be ticked.',
            ['aside', 'Once a bot is in 100 servers Discord makes you apply for privileged intents. Long before that, a bot that avoids reading message content — slash commands only — never needs the message_content intent at all.']
          ] },
          { t: 'quick', title: 'Drill: intents', ids: ['dc-intents-default', 'dc-intents-content', 'dc-intents-members', 'dc-intents-all'] },
          { t: 'task', key: 'dcintents' }
        ] },

      { key: 'b3', name: 'Hearing a message',
        blurb: 'on_message, the self-check, and the line everyone forgets at the end.',
        needs: 'intents',
        steps: [
          { t: 'read', title: 'The first event you will ever use', body: [
            'on_message fires for every message the bot can see — every channel, every server it is in.',
            ['code', "@bot.event\nasync def on_message(message):\n    if message.author == bot.user:\n        return\n    if message.content.lower() == 'hello':\n        await message.channel.send('hi there')\n    await bot.process_commands(message)"],
            'Three things there matter more than the rest:',
            '**The self-check.** `bot.user` is the bot\'s own account. Without those two lines a bot that answers "hello" with "hello" will answer itself, for ever, until Discord rate-limits it.',
            '**Where to reply.** `message.channel` is where it was said, so `message.channel.send(...)` puts the answer in the right place. `message.reply(...)` quotes the original instead.',
            '**The last line.** Writing your own on_message *replaces* the built-in one, and the built-in one is what dispatches commands. Leave off `process_commands` and every `!` command in your bot stops working, with no error to tell you why.',
            'The message object holds everything you might want:',
            ['code', "message.content            what it says\nmessage.author            who said it (a Member)\nmessage.author.mention    the blue @ping version of them\nmessage.channel           where\nmessage.guild             which server (None in a DM)\nmessage.attachments       any files, as a list"],
            'And the things you can do to it:',
            ['code', "await message.reply('...')\nawait message.add_reaction('👍')\nawait message.delete()\nawait message.pin()"],
            ['aside', 'Comparing with `in` finds a word anywhere: `if \'python\' in message.content.lower()`. Lowercase one side or HELLO and hello behave differently, which users will notice within the hour.']
          ] },
          { t: 'quick', title: 'Drill: messages', groups: ['Discord · messages'], lvl: 2 },
          { t: 'quiz', title: 'The parsing underneath', groups: ['Discord · parsing a command'] },
          { t: 'task', key: 'dcecho' },
          { t: 'task', key: 'dcreact' },
          { t: 'problem', id: 'bot-prefix' },
          { t: 'problem', id: 'bot-parse' }
        ] },

      { key: 'b4', name: 'The other events',
        blurb: 'Joins, leaves, edits, deletions and reactions.',
        needs: 'on_message',
        steps: [
          { t: 'read', title: 'Everything else you can listen for', body: [
            'Every event works exactly like on_message: `@bot.event`, an `async def`, and a name the library recognises. The name is the whole API.',
            ['code', 'on_ready()                     logged in\non_member_join(member)         somebody joined\non_member_remove(member)       somebody left\non_message(message)            a message was sent\non_message_edit(before, after) a message changed\non_message_delete(message)     a message went\non_reaction_add(reaction, user)\non_guild_join(guild)           the bot was added to a server'],
            'A **guild** is what the API calls a server. The word "server" never appears in the library, so get used to reading one as the other.',
            'A welcome message is the classic:',
            ['code', "@bot.event\nasync def on_member_join(member):\n    channel = discord.utils.get(member.guild.text_channels, name='welcome')\n    if channel is None:\n        return\n    await channel.send(f'Welcome {member.mention}!')", "`discord.utils.get` searches any list of Discord objects by any attribute, and gives back None when nothing matches. Always check for that None — somebody renames a channel and an unchecked bot starts crashing on every join."],
            'Two traps worth meeting now. First, on_member_join needs the **members** intent, and silence is the only symptom. Second, the delete and edit events only fire for messages the bot has seen since it started; the `on_raw_*` versions catch the older ones, but they hand you IDs instead of objects because nothing is cached.',
            ['aside', 'Only ONE function can own each event name with @bot.event — define on_message twice and the second quietly replaces the first. Cogs, later in this stage, are how you get around that.']
          ] },
          { t: 'quick', title: 'Drill: events', groups: ['Discord · events'], lvl: 2 },
          { t: 'task', key: 'dcwelcome' }
        ] },

      { key: 'b5', name: 'Your first real command',
        blurb: 'Stop reading message.content by hand and let the library do it.',
        needs: 'on_message',
        steps: [
          { t: 'read', title: 'Commands, instead of a wall of if-statements', body: [
            'Checking `startswith` works for one command. By the fifth you have a wall of ifs, no argument handling and no error messages. The commands extension does all of it:',
            ['code', "@bot.command()\nasync def ping(ctx):\n    ms = round(bot.latency * 1000)\n    await ctx.send(f'Pong! {ms}ms')"],
            'That is `!ping`. The **function name is the command name**, and `ctx` — the context — is the whole situation the command ran in:',
            ['code', "ctx.send('...')     reply in the same channel\nctx.author          who ran it\nctx.channel         where\nctx.guild           which server (None in a DM)\nctx.message         the message that triggered it"],
            'Two details that catch everyone. `@bot.command()` has brackets — without them you hand the decorator your function instead of calling it. And `ctx` must be the first parameter of every command; there is nothing to answer with otherwise.',
            'Useful extras on the decorator:',
            ['code', "@bot.command(name='hello')          a different name from the function\n@bot.command(aliases=['p', 'pong'])  extra names for the same command\n@bot.command(hidden=True)            keep it out of the help list\n@commands.guild_only()               refuse to run in DMs"],
            ['aside', 'A bot can carry both `!ping` and `/ping` at once — they are registered in different places. Prefix commands are quicker to write and still everywhere; slash commands are where Discord is pushing everyone. This stage teaches both.']
          ] },
          { t: 'quick', title: 'Drill: prefix commands', groups: ['Discord · prefix commands'], lvl: 2 },
          { t: 'task', key: 'dcping' }
        ] },

      { key: 'b6', name: 'Arguments',
        blurb: 'One word, the whole rest of the line, a number, or a member.',
        needs: 'commands',
        steps: [
          { t: 'read', title: 'Everything after the command name', body: [
            'Whatever the user types after the command is split on spaces and handed to your parameters, in order.',
            ['code', "@bot.command()\nasync def say(ctx, word):\n    await ctx.send(word)", "!say hello world puts only 'hello' in word. The rest is dropped."],
            'Almost always you want the whole line. That is what a bare `*` means:',
            ['code', "@bot.command()\nasync def say(ctx, *, text):\n    await ctx.send(text)", 'Now text is "hello world". The star must come last, and it is the single most useful piece of command syntax there is.'],
            'Arguments arrive as **text**. A type hint is not decoration — the library actually converts, and refuses what will not convert:',
            ['code', "async def add(ctx, a: int, b: int):     # !add 2 3  → 5, not 23\nasync def hug(ctx, member: discord.Member):  # a mention, an ID or a name\nasync def move(ctx, channel: discord.TextChannel):\nasync def give(ctx, role: discord.Role):"],
            'If a conversion fails your function is never entered; a BadArgument error is raised instead, which the next unit shows you how to answer.',
            'Optional arguments take a default, and there is one shape you will write over and over:',
            ['code', "@bot.command()\nasync def avatar(ctx, member: discord.Member = None):\n    member = member or ctx.author", "`= ctx.author` would NOT work: defaults are evaluated when the file loads, and ctx does not exist yet. The `or` line does the job safely."],
            ['aside', 'A user passes an argument containing spaces by putting it in "quotes". Greedy[discord.Member] eats as many members as it can convert, which is how !kick @a @b @c is written.']
          ] },
          { t: 'quick', title: 'Drill: arguments', groups: ['Discord · command arguments'], lvl: 2 },
          { t: 'quiz', title: 'What the library is doing for you', groups: ['Discord · the logic underneath'], },
          { t: 'task', key: 'dcsay' },
          { t: 'task', key: 'dcadd' },
          { t: 'task', key: 'dcuserinfo' }
        ] },

      { key: 'b7', name: 'Who is allowed to run it',
        blurb: 'Permission checks, role checks, and cooldowns.',
        needs: 'commands with arguments',
        steps: [
          { t: 'read', title: 'Guards that run before your code does', body: [
            'A check is a decorator that sits between `@bot.command()` and the `def`. If it fails, your function never runs and an error is raised instead.',
            ['code', "@bot.command()\n@commands.has_permissions(kick_members=True)\n@commands.bot_has_permissions(kick_members=True)\nasync def kick(ctx, member: discord.Member):\n    ..."],
            'Those are two different questions, and both matter: is the **user** allowed to ask, and is the **bot** allowed to do it? The second one catches the commonest support question of all — the bot\'s own role sits too low in the server\'s role list, so it cannot touch anyone above it.',
            'The checks you will actually use:',
            ['code', "@commands.has_permissions(manage_messages=True)\n@commands.bot_has_permissions(manage_messages=True)\n@commands.has_role('Moderator')\n@commands.has_any_role('Mod', 'Admin')\n@commands.is_owner()\n@commands.guild_only()", 'Permissions go in as keyword arguments — the name as it appears in Discord, in lower case with underscores.'],
            'Your own check is any function that takes ctx and returns True or False:',
            ['code', "def in_bot_channel(ctx):\n    return ctx.channel.name == 'bots'\n\n@bot.command()\n@commands.check(in_bot_channel)\nasync def spam(ctx):\n    ..."],
            'And a cooldown is a check too — one that remembers:',
            ['code', '@commands.cooldown(1, 5, commands.BucketType.user)', 'One use, per 5 seconds, per user. The order is (uses, seconds, bucket). BucketType.guild limits the whole server, .channel one channel.'],
            ['aside', 'Anything that gives out points, money or API calls needs a cooldown. Without one, a single bored user will run it four hundred times to see what happens.']
          ] },
          { t: 'quick', title: 'Drill: checks and permissions', ids: ['dc-has-perms', 'dc-bot-has-perms', 'dc-is-owner', 'dc-has-role', 'dc-custom-check', 'dc-cooldown', 'dc-guild-only'] },
          { t: 'task', key: 'dcperms' },
          { t: 'task', key: 'dccooldown' },
          { t: 'problem', id: 'bot-cooldown' },
          { t: 'problem', id: 'bot-perms' }
        ] },

      { key: 'b8', name: 'When it goes wrong',
        blurb: 'One handler that turns every failure into a sentence the user can read.',
        needs: 'checks',
        steps: [
          { t: 'read', title: 'The errors your users will actually hit', body: [
            'Without a handler, a failed command prints a traceback in **your** console and shows the user nothing at all. They conclude the bot is broken, and they are not wrong.',
            ['code', "@bot.event\nasync def on_command_error(ctx, error):\n    if isinstance(error, commands.CommandNotFound):\n        return\n    if isinstance(error, commands.MissingRequiredArgument):\n        await ctx.send(f'You missed the {error.param.name}.')\n    elif isinstance(error, commands.BadArgument):\n        await ctx.send('That is not the right kind of value.')\n    elif isinstance(error, commands.MissingPermissions):\n        await ctx.send('You are not allowed to do that.')\n    elif isinstance(error, commands.CommandOnCooldown):\n        await ctx.send(f'Wait {error.retry_after:.0f}s.')\n    else:\n        raise error"],
            '`error` is an object, so you test it with `isinstance`, never `==` against the class. The errors worth knowing by name:',
            ['code', 'CommandNotFound          a typo — ignore it silently\nMissingRequiredArgument  they left something out (error.param)\nBadArgument              "abc" where an int was wanted\nMemberNotFound           no such member (a kind of BadArgument)\nMissingPermissions       the user is not allowed\nBotMissingPermissions    the BOT is not allowed\nCommandOnCooldown        too soon (error.retry_after)\nCommandInvokeError       your own code raised (error.original)'],
            'The `else: raise error` at the bottom is the important half. Anything you did not plan for should still land in your console with a full traceback — swallowing everything is how bugs become invisible.',
            'One command can have its own handler too, which runs first:',
            ['code', '@daily.error\nasync def daily_error(ctx, error):\n    ...', 'Named after the command function.'],
            ['aside', 'Discord\'s own refusals come through as exceptions you catch normally: `discord.Forbidden` for missing permissions, `discord.HTTPException` for everything else it rejected — a message over 2000 characters, for instance.']
          ] },
          { t: 'quick', title: 'Drill: errors', ids: ['dc-on-command-error', 'dc-err-missing-arg', 'dc-err-notfound', 'dc-err-cooldown', 'dc-err-perms', 'dc-err-badarg', 'dc-err-command-invoke', 'dc-local-error', 'dc-forbidden'] },
          { t: 'task', key: 'dcerrors' },
          { t: 'problem', id: 'bot-duration' }
        ] },

      { key: 'b9', name: 'Slash commands',
        blurb: 'The kind Discord shows people as they type — and the sync that nobody warns you about.',
        needs: 'commands',
        steps: [
          { t: 'read', title: '/ instead of !', body: [
            'Slash commands are registered **with Discord**, not just inside your bot. Discord draws the menu, checks the types, and shows the descriptions. Users discover them by typing a slash.',
            ['code', "from discord import app_commands\n\n@bot.tree.command(name='ping', description='Check I am alive')\nasync def ping(interaction: discord.Interaction):\n    await interaction.response.send_message('Pong!')"],
            'Two things changed from prefix commands. They live on `bot.tree`, the list of application commands. And instead of `ctx` you get an **interaction**:',
            ['code', "interaction.user        who ran it\ninteraction.channel     where\ninteraction.guild       which server\ninteraction.response.send_message('...')\ninteraction.followup.send('...')      after a defer"],
            'Now the part that wastes everyone\'s first evening: **nothing appears until you sync**.',
            ['code', "async def setup_hook():\n    guild = discord.Object(id=YOUR_TEST_SERVER_ID)\n    bot.tree.copy_global_to(guild=guild)\n    await bot.tree.sync(guild=guild)\n\nbot.setup_hook = setup_hook", 'A guild sync is instant. A global `await bot.tree.sync()` can take up to an hour to show. Develop against one test server, sync globally when you ship.'],
            'Options are just typed parameters, and the type hint becomes the input widget:',
            ['code', "@bot.tree.command(name='roll', description='Roll a die')\n@app_commands.describe(sides='How many sides the die has')\nasync def roll(interaction: discord.Interaction, sides: int = 6):\n    await interaction.response.send_message(random.randint(1, sides))", 'A default makes the option optional. @app_commands.describe writes the hint people read while typing.'],
            'Two rules about responding. You have **three seconds**, and you get **one** response. If the work takes longer, defer first:',
            ['code', "await interaction.response.defer()\n...\nawait interaction.followup.send(result)", 'defer shows "thinking…" and buys you fifteen minutes.'],
            ['aside', '`ephemeral=True` on a response shows it only to the person who ran the command. It is the polite way to answer errors, settings and anything nobody else needs to see.']
          ] },
          { t: 'quick', title: 'Drill: slash commands', groups: ['Discord · slash commands'], lvl: 2 },
          { t: 'task', key: 'dcslash' },
          { t: 'task', key: 'dcslashopt' }
        ] },

      { key: 'b10', name: 'Embeds',
        blurb: 'The bordered box that makes a bot look like it was written on purpose.',
        needs: 'sending messages',
        steps: [
          { t: 'read', title: 'One object, a handful of methods', body: [
            'An embed is the coloured, bordered card you have seen every good bot use. It is one object you build up and then send:',
            ['code', "embed = discord.Embed(\n    title='Server info',\n    description='Everything worth knowing',\n    colour=discord.Colour.blurple())\n\nembed.set_thumbnail(url=ctx.guild.icon.url)\nembed.add_field(name='Members', value=ctx.guild.member_count, inline=True)\nembed.add_field(name='Owner', value=ctx.guild.owner.display_name, inline=True)\nembed.set_footer(text=f'Asked by {ctx.author.display_name}')\nembed.timestamp = discord.utils.utcnow()\n\nawait ctx.send(embed=embed)", 'The keyword `embed=` is what makes it an embed rather than plain text. colour and color both work.'],
            'The pieces, in the order they appear on screen:',
            ['code', "set_author(name=, icon_url=)   small line at the very top\ntitle= / url=                  the heading, optionally a link\ndescription=                   the paragraph under it\nadd_field(name=, value=, inline=)  the labelled boxes\nset_thumbnail(url=)            small image, top right\nset_image(url=)                big image across the bottom\nset_footer(text=)              small print\ntimestamp=                     a date, shown in each reader's timezone"],
            '`inline=True` puts up to three fields side by side; `inline=False` gives a field its own row. That single flag is most of embed layout.',
            'The limits are real and send() raises when you cross them:',
            ['code', 'title         256 characters\ndescription   4096\nfield name    256\nfield value   1024\nfields        25 of them\nwhole embed   6000 characters', 'Which is why "cut it down to fit" is a function every bot ends up with.'],
            ['aside', 'A plain message is capped at 2000 characters, quite separately. Anything longer has to be cut into pieces or attached as a file with `discord.File`.']
          ] },
          { t: 'quick', title: 'Drill: embeds', groups: ['Discord · embeds'], lvl: 2 },
          { t: 'task', key: 'dcembed' },
          { t: 'problem', id: 'bot-truncate' },
          { t: 'problem', id: 'bot-chunk' }
        ] },

      { key: 'b11', name: 'Buttons, menus and forms',
        blurb: 'Things people click instead of typing.',
        needs: 'embeds, slash commands',
        steps: [
          { t: 'read', title: 'A View is a row of components on one message', body: [
            'Buttons live in a **View**, and a View is a class:',
            ['code', "class Confirm(discord.ui.View):\n    def __init__(self, author):\n        super().__init__(timeout=30)\n        self.author = author\n\n    async def interaction_check(self, interaction):\n        return interaction.user == self.author\n\n    @discord.ui.button(label='Yes', style=discord.ButtonStyle.success)\n    async def yes(self, interaction: discord.Interaction, button: discord.ui.Button):\n        for item in self.children:\n            item.disabled = True\n        await interaction.response.edit_message(content='Confirmed.', view=self)\n        self.stop()\n\nawait ctx.send('Are you sure?', view=Confirm(ctx.author))"],
            'The callback signature is `(self, interaction, button)` — **interaction first**. It was the other way round in discord.py 1.x, which is why half the tutorials you find do not work.',
            'The five styles: `primary` (blurple), `secondary` (grey), `success` (green), `danger` (red), and `link` for a plain URL button that needs no callback at all.',
            'Three things people forget, all of them in the code above. A **timeout**, or the buttons sit there for ever and stop working silently when the bot restarts. An **interaction_check**, or anyone scrolling past can answer your question. And **disabling** the buttons afterwards, so the message shows it has been dealt with.',
            'A drop-down is the same idea:',
            ['code', "@discord.ui.select(placeholder='Pick a colour', options=[\n    discord.SelectOption(label='Red', value='red'),\n    discord.SelectOption(label='Blue', value='blue')])\nasync def pick(self, interaction, select):\n    await interaction.response.send_message(select.values[0])", 'select.values is always a LIST, even when only one thing can be chosen. Forget the [0] and you post the brackets to the channel.'],
            'And a modal is a pop-up form, opened as the first response to an interaction:',
            ['code', "class Feedback(discord.ui.Modal, title='Feedback'):\n    answer = discord.ui.TextInput(label='What did you think?')\n\n    async def on_submit(self, interaction: discord.Interaction):\n        await interaction.response.send_message(f'Thanks: {self.answer}')\n\nawait interaction.response.send_modal(Feedback())", 'At most five inputs. A modal can never be opened after a defer — it must be the first response.'],
            ['aside', 'Views only survive while the bot is running. A "persistent" view that outlives a restart needs timeout=None, a custom_id on every component, and bot.add_view() at startup.']
          ] },
          { t: 'quick', title: 'Drill: buttons and menus', groups: ['Discord · buttons & menus'], lvl: 2 },
          { t: 'task', key: 'dcbutton' },
          { t: 'problem', id: 'bot-humanlist' }
        ] },

      { key: 'b12', name: 'Members and roles',
        blurb: 'Finding people, giving them roles, and the hierarchy rule behind every failure.',
        needs: 'arguments, checks',
        steps: [
          { t: 'read', title: 'The role hierarchy explains almost every error', body: [
            'A **User** is a Discord account. A **Member** is that account on one particular server — with a nickname, roles and a join date. Commands nearly always want a Member.',
            ['code', "member.display_name          nickname here, or username\nmember.display_avatar.url    their picture\nmember.joined_at             when they joined this server\nmember.created_at            when the account was made\nmember.roles                 every role, including @everyone\nmember.top_role              the highest one\nmember.mention               the blue @ping"],
            'Giving and taking roles is two methods:',
            ['code', "role = discord.utils.get(ctx.guild.roles, name='Member')\n\nif role in member.roles:\n    await member.remove_roles(role)\nelse:\n    await member.add_roles(role)", 'Plural, awaited, on the member. member.roles itself is read-only — appending to it does nothing at all.'],
            'Now the rule that explains most bot failures. Roles are an ordered list, and **nobody can touch a role at or above their own highest one** — bots included:',
            ['code', "if role >= ctx.guild.me.top_role:\n    await ctx.send('That role is above mine.')\n    return", 'ctx.guild.me is the bot as a member of this server. Drag the bot\'s role UP the list in Server Settings and the problem disappears.'],
            'The same rule governs kicking, banning and timing out: the bot cannot moderate anyone whose top role is at or above its own. Check first and you turn a confusing crash into a clear sentence.',
            ['aside', 'Everyone is silently in @everyone and the library counts it as a role, so a member with "no roles" has len(member.roles) == 1. Subtract one whenever you show a count.']
          ] },
          { t: 'quick', title: 'Drill: members and roles', ids: ['dc-get-member', 'dc-member-name', 'dc-member-avatar', 'dc-member-joined', 'dc-get-role', 'dc-add-role', 'dc-has-role-check', 'dc-top-role', 'dc-create-role', 'dc-dm'] },
          { t: 'task', key: 'dcrole' },
          { t: 'problem', id: 'bot-mentions' }
        ] },

      { key: 'b13', name: 'Moderation',
        blurb: 'Kick, ban, time out and purge — with the failures handled.',
        needs: 'roles and checks',
        steps: [
          { t: 'read', title: 'The commands that get used in anger', body: [
            'Four methods do nearly all of it:',
            ['code', "await member.kick(reason='Spam')\nawait member.ban(reason='Spam', delete_message_seconds=86400)\nawait member.timeout(datetime.timedelta(minutes=10), reason='Cool off')\nawait ctx.channel.purge(limit=10)", 'delete_message_days was replaced by delete_message_seconds in 2.x. A timeout takes a timedelta, never a bare number, and Discord\'s maximum is 28 days.'],
            'The reason goes into the server\'s audit log, where the other moderators can see who did what. Always pass one.',
            'purge deletes in bulk and gives back the list it removed:',
            ['code', "deleted = await ctx.channel.purge(limit=amount + 1)\nawait ctx.send(f'Deleted {len(deleted) - 1} messages.', delete_after=5)", 'The +1 is the !clear message itself. Discord refuses to bulk-delete anything older than 14 days.'],
            'A filter makes it precise:',
            ['code', 'await ctx.channel.purge(limit=100, check=lambda m: m.author == member)'],
            'Every moderation command wants the same four guards, in this order:',
            ['code', "@commands.has_permissions(...)      is the user allowed to ask\n@commands.bot_has_permissions(...)  is the bot allowed to act\nif member.top_role >= ctx.guild.me.top_role:   the hierarchy\ntry / except discord.Forbidden                 Discord said no anyway"],
            ['aside', 'A Discord **timeout** is the built-in feature that replaced the old "muted role" trick. There is no member.mute — a timeout is the modern answer, and it survives the member leaving and rejoining.']
          ] },
          { t: 'quick', title: 'Drill: moderation', ids: ['dc-kick', 'dc-ban', 'dc-unban', 'dc-timeout', 'dc-purge', 'dc-purge-check', 'dc-perms-for'] },
          { t: 'task', key: 'dcmod' },
          { t: 'problem', id: 'bot-escape' }
        ] },

      { key: 'b14', name: 'Channels and servers',
        blurb: 'Finding a channel, making one, and hiding it from everybody but one person.',
        needs: 'events',
        steps: [
          { t: 'read', title: 'Getting hold of a place to talk', body: [
            'Two ways to find a channel, and the difference matters:',
            ['code', "channel = bot.get_channel(123456789)                       # cache, instant, may be None\nchannel = await bot.fetch_channel(123456789)               # asks Discord, awaited\nchannel = discord.utils.get(guild.text_channels, name='general')", 'Every get_* reads the cache; every fetch_* is a request you await. Prefer get, fall back to fetch.'],
            'IDs come from the Discord client itself: turn on Developer Mode in Settings → Advanced, then right-click anything and Copy ID.',
            'Making channels is one line, and permission overwrites are how ticket bots work:',
            ['code', "overwrites = {\n    guild.default_role: discord.PermissionOverwrite(view_channel=False),\n    member: discord.PermissionOverwrite(view_channel=True)}\n\nchannel = await guild.create_text_channel('ticket', overwrites=overwrites)", 'guild.default_role is @everyone. The dictionary maps a role or member to what they may do here.'],
            'The server itself:',
            ['code', 'guild.member_count      how many people\nguild.owner             who owns it\nguild.icon.url          the server picture\nguild.text_channels     every text channel\nguild.roles             every role\nguild.me                the bot, as a member of this server\nbot.guilds              every server the bot is in'],
            ['aside', 'Checking `if channel is None` before using a channel is not paranoia — someone renames a channel, or the bot loses access to it, and an unchecked bot starts throwing on every single event.']
          ] },
          { t: 'quick', title: 'Drill: channels and servers', groups: ['Discord · channels & servers'], lvl: 3 }
        ] },

      { key: 'b15', name: 'Jobs that run on a timer',
        blurb: 'Reminders, backups and polling — without freezing the bot.',
        needs: 'events',
        steps: [
          { t: 'read', title: 'ext.tasks, and why time.sleep is fatal', body: [
            'A bot is a single async program. `time.sleep(3600)` in it does not pause one command — it stops **everything, for everyone, on every server**, for an hour.',
            'The right tool is a task loop:',
            ['code', "from discord.ext import tasks\n\n@tasks.loop(hours=1)\nasync def remind():\n    channel = bot.get_channel(CHANNEL_ID)\n    if channel is None:\n        return\n    await channel.send('Stretch your legs.')\n\n@remind.before_loop\nasync def before_remind():\n    await bot.wait_until_ready()\n\n@bot.event\nasync def on_ready():\n    if not remind.is_running():\n        remind.start()"],
            'Four details, all of them in that snippet. The interval is a keyword: `seconds=`, `minutes=`, `hours=`, or `time=` for a fixed clock time each day. `before_loop` with `wait_until_ready` stops the first run happening before the bot has any channels. `is_running()` guards the start, because on_ready can fire again after a dropped connection and starting a running loop raises. And `cancel()` stops it.',
            'Inside a command, when you genuinely need to wait:',
            ['code', 'await asyncio.sleep(3)', 'The async version yields control back so the rest of the bot keeps working. Never the other one.'],
            ['aside', 'A loop that raises stops running, quietly. Wrap the body in try/except, or add @remind.error, if the job matters.']
          ] },
          { t: 'quick', title: 'Drill: background tasks', ids: ['dc-tasks-import', 'dc-tasks-loop', 'dc-tasks-start', 'dc-tasks-before', 'dc-tasks-stop', 'dc-sleep'] },
          { t: 'task', key: 'dcloop' }
        ] },

      { key: 'b16', name: 'Splitting the bot into cogs',
        blurb: 'What to do when one file stops being enough.',
        needs: 'commands and events',
        steps: [
          { t: 'read', title: 'One file of related commands', body: [
            'Somewhere around two hundred lines, one file stops working. A **cog** is a class holding related commands and listeners, in its own file:',
            ['code', "# cogs/fun.py\nfrom discord.ext import commands\nimport random\n\nclass Fun(commands.Cog):\n    def __init__(self, bot):\n        self.bot = bot\n\n    @commands.command()\n    async def roll(self, ctx, sides: int = 6):\n        await ctx.send(random.randint(1, sides))\n\n    @commands.Cog.listener()\n    async def on_message(self, message):\n        ...\n\nasync def setup(bot):\n    await bot.add_cog(Fun(bot))"],
            'Three changes from what you have been writing. The decorator is `@commands.command()`, because this file has never heard of your bot object. Every method takes `self` first, then ctx. And events use `@commands.Cog.listener()` — which, unlike `@bot.event`, lets several cogs listen to the same event without overwriting each other.',
            'The `setup` function at the bottom is what the loader looks for, and in 2.x both it and `add_cog` are async.',
            'Loading it:',
            ['code', "async def setup_hook():\n    for name in ('fun', 'mod', 'admin'):\n        await bot.load_extension(f'cogs.{name}')\n\nbot.setup_hook = setup_hook", 'A dotted path — no slashes, no .py. cogs/ needs to be reachable from where you run the bot.'],
            'And the reason everyone loves cogs:',
            ['code', "await bot.reload_extension('cogs.fun')", 'Change a command, reload that one file, keep the bot online. Guard it with @commands.is_owner() and it is the fastest development loop there is.'],
            ['aside', 'A sensible layout: bot.py at the top with the token, intents and setup_hook; cogs/ holding one file per area — fun, moderation, levels, admin.']
          ] },
          { t: 'quick', title: 'Drill: cogs', ids: ['dc-cog-class', 'dc-cog-command', 'dc-cog-setup', 'dc-load-extension', 'dc-reload-extension', 'dc-cog-listener', 'dc-setup-hook'] },
          { t: 'task', key: 'dccog' }
        ] },

      { key: 'b17', name: 'Remembering things',
        blurb: 'The bot restarts and everything is gone — unless you wrote it down.',
        needs: 'commands',
        steps: [
          { t: 'read', title: 'A dictionary is not storage', body: [
            'A dictionary at the top of your file works perfectly until the bot restarts, at which point every level, every warning and every setting is gone. For a few hundred users, JSON is enough:',
            ['code', "import json\n\ndef load():\n    try:\n        with open('data.json') as f:\n            return json.load(f)\n    except FileNotFoundError:\n        return {}\n\ndef save(data):\n    with open('data.json', 'w') as f:\n        json.dump(data, f, indent=2)"],
            'One trap catches everybody: **JSON keys are always strings**. Save `{123: 50}` keyed by user ID and it comes back as `{"123": 50}`. Pick one and stick to it — `str(member.id)` everywhere is the simplest rule.',
            'Beyond a few hundred users, or as soon as two things write at once, move to sqlite:',
            ['code', "import sqlite3\n\nconn = sqlite3.connect('bot.db')\nconn.execute('CREATE TABLE IF NOT EXISTS xp (user_id INTEGER PRIMARY KEY, points INTEGER)')\nconn.commit()", 'It is in the standard library, it is one file, and it will not lose half your data when the bot is killed mid-write.'],
            'Whatever you use, save on a **timer or on change**, not on exit — a bot that is killed never gets to run its cleanup.',
            ['aside', 'Anything holding user data belongs in .gitignore alongside .env: data.json, *.db, and __pycache__/.']
          ] },
          { t: 'quick', title: 'Drill: storage', ids: ['dc-json-load', 'dc-json-save', 'dc-sqlite', 'dc-gitignore'] },
          { t: 'problem', id: 'bot-level' },
          { t: 'problem', id: 'bot-leader' }
        ] },

      { key: 'b18', name: 'Keeping it running',
        blurb: 'Off your laptop, onto something that stays on — and the whole file, one more time.',
        needs: 'everything above',
        steps: [
          { t: 'read', title: 'From python bot.py to a bot that is always there', body: [
            '`python bot.py` runs the bot for exactly as long as that terminal stays open. Close the laptop and the bot goes offline. To keep it up you need a machine that stays on: a small VPS, a Raspberry Pi in a cupboard, or a hosting service that runs Python.',
            'What any host needs from you:',
            ['code', 'bot.py               the code\nrequirements.txt     pip freeze > requirements.txt\n.env or config       the token, set as an environment variable\n.gitignore           .env, *.db, __pycache__/', 'Hosts almost always let you set environment variables in a dashboard, which is exactly what os.getenv already reads. Nothing in your code has to change.'],
            'Turn on logging before you need it:',
            ['code', 'discord.utils.setup_logging()', 'Timestamped connection and error logs — which you will want the first time the bot dies at three in the morning.'],
            'And the whole thing, one more time, in the order a real file puts it:',
            ['code', "import os, discord\nfrom discord.ext import commands\nfrom dotenv import load_dotenv\n\nload_dotenv()\n\nintents = discord.Intents.default()\nintents.message_content = True\nintents.members = True\n\nbot = commands.Bot(command_prefix='!', intents=intents)\n\nasync def setup_hook():\n    await bot.load_extension('cogs.fun')\n    await bot.tree.sync()\n\nbot.setup_hook = setup_hook\n\n@bot.event\nasync def on_ready():\n    print(f'Ready as {bot.user}')\n\n@bot.event\nasync def on_command_error(ctx, error):\n    if isinstance(error, commands.CommandNotFound):\n        return\n    raise error\n\nbot.run(os.getenv('DISCORD_TOKEN'))", 'The order is not a style choice: bot.run blocks for ever, the decorators need the bot to exist, and the bot needs the intents to exist.'],
            'That file is the whole stage. Everything else you build hangs off it — one more command, one more cog, one more layer.',
            ['aside', 'If your token ever reaches GitHub, reset it immediately in the Developer Portal. Discord scans public repositories and will usually reset it for you, which is a kindness dressed as an outage.']
          ] },
          { t: 'quick', title: 'Drill: hosting and keeping it alive', ids: ['dc-requirements', 'dc-run-file', 'dc-logging', 'dc-token-env', 'dc-dotenv', 'dc-close', 'dc-presence', 'dc-latency'] },
          { t: 'task', key: 'dcwhole' }
        ] }

    ]
  });
})();
