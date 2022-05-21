import { REST } from '@discordjs/rest';
import { Client } from 'discord.js';
import { BOT_TOKEN, CLIENT_ID } from './secrets/secrets';
import { refreshCommands } from './commands';

const client = new Client({ intents: [] });
const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

client.once('ready', async () => {
  console.log('DraftBot is ready to go!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'echo') {
    console.log(interaction.options);
    await interaction.reply({ content: 'Hello world!', ephemeral: true });
  }
});

refreshCommands(CLIENT_ID, rest);

client.login(BOT_TOKEN);
