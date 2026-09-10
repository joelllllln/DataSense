/* Quickfire cards — Discord bots, part 4: people and roles, moderation, the servers and
   channels themselves, and everything around keeping a bot running. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var MOD = 'Discord · members, roles & moderation';
  var CHN = 'Discord · channels & servers';
  var ORG = 'Discord · background tasks & cogs';
  var RUN = 'Discord · storage & hosting';

  window.SNIPPETS.push(

    /* ---- members, roles & moderation ---- */
    { id: 'dc-get-member', group: MOD, lvl: 1,
      ask: 'Find a member of a server by their ID',
      a: 'member = guild.get_member(123456789)',
      note: 'Returns None if they are not cached. await guild.fetch_member(id) always asks Discord.' },

    { id: 'dc-member-name', group: MOD, lvl: 1,
      ask: "A member's server nickname, falling back to their username",
      a: 'member.display_name' },

    { id: 'dc-member-avatar', group: MOD, lvl: 1,
      ask: "The URL of a member's avatar",
      a: 'member.display_avatar.url' },

    { id: 'dc-member-joined', group: MOD, lvl: 2,
      ask: 'When a member joined the server, and when they made the account',
      a: 'member.joined_at\nmember.created_at' },

    { id: 'dc-get-role', group: MOD, lvl: 1,
      ask: 'Find a role by name',
      a: "role = discord.utils.get(ctx.guild.roles, name='Member')",
      note: 'discord.utils.get searches any list of Discord objects by any attribute.' },

    { id: 'dc-add-role', group: MOD, lvl: 1,
      ask: 'Give a member a role',
      a: 'await member.add_roles(role)',
      note: 'remove_roles is the other half. Both take several roles at once.' },

    { id: 'dc-has-role-check', group: MOD, lvl: 1,
      ask: 'Check whether a member already has a role',
      a: 'if role in member.roles:' },

    { id: 'dc-top-role', group: MOD, lvl: 2,
      ask: "A member's highest role",
      a: 'member.top_role',
      note: 'The bot can only manage roles BELOW its own top role. That is the usual reason add_roles fails.' },

    { id: 'dc-create-role', group: MOD, lvl: 3,
      ask: 'Create a new role',
      a: "role = await guild.create_role(name='Verified', colour=discord.Colour.green())" },

    { id: 'dc-kick', group: MOD, lvl: 1,
      ask: 'Kick a member, with a reason in the audit log',
      a: "await member.kick(reason='Spam')" },

    { id: 'dc-ban', group: MOD, lvl: 1,
      ask: 'Ban a member and delete their last day of messages',
      a: "await member.ban(reason='Spam', delete_message_seconds=86400)",
      note: 'delete_message_days was replaced by delete_message_seconds in discord.py 2.x.' },

    { id: 'dc-unban', group: MOD, lvl: 3,
      ask: 'Unban a user you only have the ID of',
      a: 'user = await bot.fetch_user(123456789)\nawait guild.unban(user)' },

    { id: 'dc-timeout', group: MOD, lvl: 2,
      ask: 'Time a member out for ten minutes',
      a: 'await member.timeout(datetime.timedelta(minutes=10))',
      note: 'Needs `import datetime`. The maximum Discord allows is 28 days.' },

    { id: 'dc-purge', group: MOD, lvl: 1,
      ask: 'Delete the last ten messages in a channel',
      a: 'await ctx.channel.purge(limit=10)',
      note: 'The command message counts as one. Discord cannot bulk-delete anything over 14 days old.' },

    { id: 'dc-purge-check', group: MOD, lvl: 3,
      ask: 'Delete only one person\'s messages',
      a: 'await ctx.channel.purge(limit=100, check=lambda m: m.author == member)' },

    { id: 'dc-perms-for', group: MOD, lvl: 3,
      ask: 'Check what a member is allowed to do in a channel',
      a: 'perms = channel.permissions_for(member)\nif perms.send_messages:' },

    { id: 'dc-dm', group: MOD, lvl: 2,
      ask: 'Send someone a direct message',
      a: "await member.send('You have been warned.')",
      note: 'Wrap it in try/except discord.Forbidden — plenty of people have DMs closed.' },

    /* ---- channels & servers ---- */
    { id: 'dc-get-channel', group: CHN, lvl: 1,
      ask: 'Get a channel by its ID',
      a: 'channel = bot.get_channel(123456789)',
      note: 'Turn on Developer Mode in Discord to right-click and Copy ID.' },

    { id: 'dc-find-channel', group: CHN, lvl: 1,
      ask: 'Find a text channel by name',
      a: "channel = discord.utils.get(guild.text_channels, name='general')" },

    { id: 'dc-system-channel', group: CHN, lvl: 2,
      ask: "The server's default welcome channel",
      a: 'guild.system_channel',
      note: 'Can be None. Always check before sending to it.' },

    { id: 'dc-create-channel', group: CHN, lvl: 2,
      ask: 'Create a text channel',
      a: "channel = await guild.create_text_channel('tickets')" },

    { id: 'dc-channel-perms', group: CHN, lvl: 3,
      ask: 'Hide a channel from everyone but one member',
      a: 'overwrites = {\n    guild.default_role: discord.PermissionOverwrite(view_channel=False),\n    member: discord.PermissionOverwrite(view_channel=True)}\nawait guild.create_text_channel(\'ticket\', overwrites=overwrites)',
      note: 'guild.default_role is @everyone. This is the whole idea behind ticket bots.' },

    { id: 'dc-member-count', group: CHN, lvl: 1,
      ask: 'How many members a server has',
      a: 'guild.member_count' },

    { id: 'dc-guild-owner', group: CHN, lvl: 2,
      ask: 'The owner and the icon of a server',
      a: 'guild.owner\nguild.icon.url' },

    { id: 'dc-guilds', group: CHN, lvl: 2,
      ask: 'Every server the bot is in',
      a: 'bot.guilds',
      note: 'len(bot.guilds) is the number people put in their bot status.' },

    /* ---- background tasks & cogs ---- */
    { id: 'dc-tasks-import', group: ORG, lvl: 1,
      ask: 'Import the background-loop helper',
      a: 'from discord.ext import tasks' },

    { id: 'dc-tasks-loop', group: ORG, lvl: 1,
      ask: 'Run a function every five minutes',
      a: '@tasks.loop(minutes=5)\nasync def check():\n    ...',
      note: 'seconds=, minutes=, hours= — or time= for a fixed clock time each day.' },

    { id: 'dc-tasks-start', group: ORG, lvl: 1,
      ask: 'Start a background loop',
      a: 'check.start()',
      note: 'Call it once, usually in on_ready or setup_hook. Starting it twice raises.' },

    { id: 'dc-tasks-before', group: ORG, lvl: 2,
      ask: 'Wait for the bot to be logged in before the loop starts',
      a: '@check.before_loop\nasync def before_check():\n    await bot.wait_until_ready()',
      note: 'Without it the first run happens before the bot has any channels.' },

    { id: 'dc-tasks-stop', group: ORG, lvl: 2,
      ask: 'Stop a background loop',
      a: 'check.cancel()' },

    { id: 'dc-sleep', group: ORG, lvl: 2,
      ask: 'Wait three seconds inside a command without freezing the bot',
      a: 'await asyncio.sleep(3)',
      note: 'NEVER time.sleep in a bot — it stops everything, for everyone, on every server.' },

    { id: 'dc-cog-class', group: ORG, lvl: 2,
      ask: 'The shape of a cog',
      a: 'class Fun(commands.Cog):\n    def __init__(self, bot):\n        self.bot = bot',
      note: 'A cog is one file of related commands. It is how a bot stops being one 2000-line file.' },

    { id: 'dc-cog-command', group: ORG, lvl: 2,
      ask: 'A command inside a cog',
      a: '@commands.command()\nasync def roll(self, ctx):\n    ...',
      note: 'Note the self: cog commands take self first, then ctx.' },

    { id: 'dc-cog-setup', group: ORG, lvl: 2,
      ask: 'The function at the bottom of every cog file',
      a: 'async def setup(bot):\n    await bot.add_cog(Fun(bot))',
      note: 'The loader looks for exactly this name. It must be async in discord.py 2.x.' },

    { id: 'dc-load-extension', group: ORG, lvl: 2,
      ask: 'Load a cog file called cogs/fun.py',
      a: "await bot.load_extension('cogs.fun')",
      note: 'A dotted path, not a file path — no slashes and no .py.' },

    { id: 'dc-reload-extension', group: ORG, lvl: 3,
      ask: 'Reload a cog without restarting the bot',
      a: "await bot.reload_extension('cogs.fun')",
      note: 'Owner-only, and the fastest development loop there is.' },

    { id: 'dc-cog-listener', group: ORG, lvl: 3,
      ask: 'Listen for an event from inside a cog',
      a: '@commands.Cog.listener()\nasync def on_message(self, message):\n    ...',
      note: '@bot.event does not work in a cog, and unlike @bot.event several cogs can listen to the same event.' },

    /* ---- storage & hosting ---- */
    { id: 'dc-json-load', group: RUN, lvl: 1,
      ask: 'Load the bot\'s saved data from a JSON file',
      a: "with open('data.json') as f:\n    data = json.load(f)",
      note: 'Fine for a few hundred users. Beyond that, use sqlite.' },

    { id: 'dc-json-save', group: RUN, lvl: 1,
      ask: 'Save the bot\'s data back to JSON',
      a: "with open('data.json', 'w') as f:\n    json.dump(data, f, indent=2)",
      note: 'JSON keys are always strings, so IDs come back as "123", not 123.' },

    { id: 'dc-sqlite', group: RUN, lvl: 3,
      ask: 'Open a sqlite database for the bot',
      a: "conn = sqlite3.connect('bot.db')",
      note: 'Remember conn.commit() after writes or nothing is saved.' },

    { id: 'dc-requirements', group: RUN, lvl: 2,
      ask: 'Write down what the bot needs to install elsewhere',
      a: 'pip freeze > requirements.txt',
      note: 'The host reads it and installs the same versions you developed against.' },

    { id: 'dc-gitignore', group: RUN, lvl: 1,
      ask: 'The one line every bot repo must have in .gitignore',
      a: '.env',
      note: 'Along with __pycache__/ and any *.db or data.json holding user data.' },

    { id: 'dc-run-file', group: RUN, lvl: 1,
      ask: 'Run the bot from the command line',
      a: 'python bot.py',
      note: 'It keeps running until you press Ctrl+C. Close the terminal and the bot goes offline.' },

    { id: 'dc-logging', group: RUN, lvl: 3,
      ask: 'Turn on the library\'s own logging',
      a: 'discord.utils.setup_logging()',
      note: 'Timestamped connection and error logs, which you will want the first time it dies at 3am.' },

    { id: 'dc-forbidden', group: RUN, lvl: 2,
      ask: 'Catch "the bot is not allowed to do that"',
      a: 'try:\n    await member.kick()\nexcept discord.Forbidden:\n    await ctx.send("I do not have permission.")',
      note: 'Forbidden is missing permissions; HTTPException is everything else Discord rejected.' }

  );
})();
