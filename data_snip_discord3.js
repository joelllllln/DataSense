/* Quickfire cards — Discord bots, part 3: slash commands, the pretty boxes,
   and the buttons and menus people click instead of typing. */
(function () {
  window.SNIPPETS = window.SNIPPETS || [];
  var SLA = 'Discord · slash commands';
  var EMB = 'Discord · embeds';
  var UI = 'Discord · buttons & menus';

  window.SNIPPETS.push(

    /* ---- slash commands ---- */
    { id: 'dc-slash-import', group: SLA, lvl: 1,
      ask: 'Import the slash-command half of the library',
      a: 'from discord import app_commands',
      note: 'Slash commands are "application commands" in the docs, hence app_commands.' },

    { id: 'dc-slash-basic', group: SLA, lvl: 1,
      ask: 'Make a /ping slash command',
      a: "@bot.tree.command(name='ping', description='Check the bot is alive')\nasync def ping(interaction: discord.Interaction):\n    await interaction.response.send_message('Pong!')",
      note: 'bot.tree is the list of slash commands. interaction replaces ctx.' },

    { id: 'dc-slash-sync', group: SLA, lvl: 1,
      ask: 'Push your slash commands to Discord',
      a: 'await bot.tree.sync()',
      note: 'Nothing appears in the client until you sync. Global syncs can take up to an hour to show.' },

    { id: 'dc-slash-sync-guild', group: SLA, lvl: 2,
      ask: 'Sync slash commands to one server instantly, for testing',
      a: 'guild = discord.Object(id=123456789)\nbot.tree.copy_global_to(guild=guild)\nawait bot.tree.sync(guild=guild)',
      note: 'Guild syncs are immediate. Do this while developing, global once you ship.' },

    { id: 'dc-slash-args', group: SLA, lvl: 1,
      ask: 'Give a slash command a typed option',
      a: 'async def add(interaction: discord.Interaction, a: int, b: int):\n    await interaction.response.send_message(a + b)',
      note: 'The type hint becomes the option type in the client, so users cannot even type the wrong thing.' },

    { id: 'dc-slash-describe', group: SLA, lvl: 1,
      ask: 'Describe a slash command option in the client',
      a: "@app_commands.describe(member='Who to greet')",
      note: 'Goes under the tree.command decorator. It is the hint people read while typing.' },

    { id: 'dc-slash-optional', group: SLA, lvl: 2,
      ask: 'Make a slash option optional',
      a: 'async def hi(interaction: discord.Interaction, name: str = None):',
      note: 'A default makes it optional. Optional[str] = None says the same thing more loudly.' },

    { id: 'dc-slash-choices', group: SLA, lvl: 2,
      ask: 'Give a slash option a fixed list of choices',
      a: "@app_commands.choices(mode=[\n    app_commands.Choice(name='Fast', value='fast'),\n    app_commands.Choice(name='Slow', value='slow')])",
      note: 'The parameter arrives as a Choice — read mode.value to get the string.' },

    { id: 'dc-slash-ephemeral', group: SLA, lvl: 1,
      ask: 'Reply so only the person who ran the command sees it',
      a: "await interaction.response.send_message('secret', ephemeral=True)",
      note: 'The quiet way to answer errors and settings without spamming the channel.' },

    { id: 'dc-slash-defer', group: SLA, lvl: 2,
      ask: 'Buy more time when the answer will take a while',
      a: 'await interaction.response.defer()\n...\nawait interaction.followup.send(result)',
      note: 'You have three seconds to respond. defer shows "thinking…" and gives you fifteen minutes.' },

    { id: 'dc-slash-edit', group: SLA, lvl: 2,
      ask: 'Change the reply you already sent to an interaction',
      a: "await interaction.edit_original_response(content='done')" },

    { id: 'dc-slash-user', group: SLA, lvl: 1,
      ask: 'Who ran the slash command, and where',
      a: 'interaction.user\ninteraction.channel\ninteraction.guild' },

    { id: 'dc-slash-perms', group: SLA, lvl: 2,
      ask: 'Restrict a slash command to people who can ban',
      a: '@app_commands.checks.has_permissions(ban_members=True)',
      note: 'The app_commands checks are a separate set from the commands ones — do not mix them up.' },

    { id: 'dc-slash-guilds', group: SLA, lvl: 3,
      ask: 'Register a slash command in one server only',
      a: '@app_commands.guilds(discord.Object(id=123456789))' },

    { id: 'dc-slash-error', group: SLA, lvl: 3,
      ask: 'Catch errors from slash commands',
      a: 'bot.tree.on_error = my_handler',
      note: 'Signature: async def my_handler(interaction, error).' },

    { id: 'dc-slash-autocomplete', group: SLA, lvl: 3,
      ask: 'Suggest options as the user types',
      a: '@my_command.autocomplete(\'item\')\nasync def item_auto(interaction, current: str):\n    return [app_commands.Choice(name=x, value=x) for x in ITEMS if current.lower() in x.lower()][:25]',
      note: 'At most 25 choices, and it must answer fast.' },

    /* ---- embeds ---- */
    { id: 'dc-embed-make', group: EMB, lvl: 1,
      ask: 'Make an embed with a title and description',
      a: "embed = discord.Embed(title='Results', description='Here is what I found')",
      note: 'An embed is the bordered box. It is the difference between a toy bot and one people trust.' },

    { id: 'dc-embed-send', group: EMB, lvl: 1,
      ask: 'Send an embed',
      a: 'await ctx.send(embed=embed)',
      note: 'embed= is a keyword argument. You can send text and an embed in the same call.' },

    { id: 'dc-embed-colour', group: EMB, lvl: 1,
      ask: 'Give an embed a colour',
      a: 'embed = discord.Embed(title=t, colour=discord.Colour.blue())',
      note: 'colour and color both work. A raw hex works too: colour=0x5865F2.' },

    { id: 'dc-embed-field', group: EMB, lvl: 1,
      ask: 'Add a named field to an embed',
      a: "embed.add_field(name='Score', value='42', inline=True)",
      note: 'inline=True puts up to three side by side; inline=False gives it its own row.' },

    { id: 'dc-embed-footer', group: EMB, lvl: 1,
      ask: 'Put a footer on an embed',
      a: "embed.set_footer(text='Asked by Ann')" },

    { id: 'dc-embed-author', group: EMB, lvl: 2,
      ask: 'Put a name and avatar at the top of an embed',
      a: 'embed.set_author(name=user.display_name, icon_url=user.display_avatar.url)' },

    { id: 'dc-embed-thumb', group: EMB, lvl: 2,
      ask: 'Add the small corner image to an embed',
      a: 'embed.set_thumbnail(url=member.display_avatar.url)',
      note: 'set_image is the big one across the bottom.' },

    { id: 'dc-embed-timestamp', group: EMB, lvl: 2,
      ask: 'Stamp an embed with the current time',
      a: 'embed.timestamp = discord.utils.utcnow()',
      note: 'Discord shows it in each reader\'s own timezone.' },

    { id: 'dc-embed-url', group: EMB, lvl: 2,
      ask: 'Make an embed title clickable',
      a: "embed = discord.Embed(title='Docs', url='https://discordpy.readthedocs.io')" },

    { id: 'dc-embed-limits', group: EMB, lvl: 3,
      ask: 'The field limit and total character limit of one embed',
      a: '25 fields, 6000 characters',
      note: 'Title 256, description 4096, field value 1024. Go over and send raises an error.' },

    { id: 'dc-timestamp-fmt', group: EMB, lvl: 3,
      ask: 'Show a time that renders in the reader\'s own timezone',
      a: "discord.utils.format_dt(when, style='R')",
      note: "Style 'R' gives \"in 5 minutes\"; 'F' gives the full date." },

    /* ---- buttons & menus ---- */
    { id: 'dc-view-class', group: UI, lvl: 1,
      ask: 'The class every set of buttons inherits from',
      a: 'class Menu(discord.ui.View):',
      note: 'A View is a row of components attached to one message.' },

    { id: 'dc-button', group: UI, lvl: 1,
      ask: 'Add a button to a View',
      a: "@discord.ui.button(label='Click me', style=discord.ButtonStyle.primary)\nasync def click(self, interaction: discord.Interaction, button: discord.ui.Button):\n    await interaction.response.send_message('clicked')",
      note: 'Argument order is interaction FIRST, then button. It was the other way round in discord.py 1.x.' },

    { id: 'dc-view-send', group: UI, lvl: 1,
      ask: 'Send a message with buttons on it',
      a: "await ctx.send('Choose:', view=Menu())",
      note: 'view= like embed=. A fresh View instance per message.' },

    { id: 'dc-button-styles', group: UI, lvl: 2,
      ask: 'The five button styles',
      a: 'primary, secondary, success, danger, link',
      note: 'blurple, grey, green, red, and a plain URL button that needs no callback.' },

    { id: 'dc-button-link', group: UI, lvl: 2,
      ask: 'Add a button that just opens a link',
      a: "view.add_item(discord.ui.Button(label='Docs', url='https://example.com'))" },

    { id: 'dc-view-timeout', group: UI, lvl: 2,
      ask: 'Make the buttons stop working after 60 seconds',
      a: 'class Menu(discord.ui.View):\n    def __init__(self):\n        super().__init__(timeout=60)',
      note: 'timeout=None keeps them alive for ever, but only until the bot restarts.' },

    { id: 'dc-view-on-timeout', group: UI, lvl: 3,
      ask: 'Grey the buttons out when the View times out',
      a: 'async def on_timeout(self):\n    for item in self.children:\n        item.disabled = True\n    await self.message.edit(view=self)',
      note: 'Store the message on the view when you send it, or you have nothing to edit.' },

    { id: 'dc-view-check', group: UI, lvl: 3,
      ask: 'Let only the person who ran the command press the buttons',
      a: 'async def interaction_check(self, interaction):\n    return interaction.user == self.author',
      note: 'Otherwise anybody scrolling past can click your buttons.' },

    { id: 'dc-button-disable', group: UI, lvl: 2,
      ask: 'Disable a button after it is pressed',
      a: 'button.disabled = True\nawait interaction.response.edit_message(view=self)' },

    { id: 'dc-select', group: UI, lvl: 2,
      ask: 'Add a drop-down menu',
      a: "@discord.ui.select(placeholder='Pick one', options=[\n    discord.SelectOption(label='Red', value='red'),\n    discord.SelectOption(label='Blue', value='blue')])\nasync def pick(self, interaction, select):\n    await interaction.response.send_message(select.values[0])",
      note: 'select.values is always a LIST, even when only one thing can be chosen.' },

    { id: 'dc-select-multi', group: UI, lvl: 3,
      ask: 'Let a drop-down take up to three answers',
      a: '@discord.ui.select(min_values=1, max_values=3, options=[...])' },

    { id: 'dc-modal', group: UI, lvl: 2,
      ask: 'Make a pop-up form',
      a: "class Form(discord.ui.Modal, title='Feedback'):\n    answer = discord.ui.TextInput(label='What did you think?')\n\n    async def on_submit(self, interaction: discord.Interaction):\n        await interaction.response.send_message(str(self.answer))",
      note: 'At most five inputs per modal.' },

    { id: 'dc-modal-send', group: UI, lvl: 2,
      ask: 'Open a modal from a slash command',
      a: 'await interaction.response.send_modal(Form())',
      note: 'A modal can only be opened as the FIRST response — never after defer.' },

    { id: 'dc-textinput-long', group: UI, lvl: 3,
      ask: 'Make a modal input a multi-line box that can be left blank',
      a: "reason = discord.ui.TextInput(label='Reason', style=discord.TextStyle.paragraph, required=False)" }

  );
})();
