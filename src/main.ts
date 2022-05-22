import { REST } from '@discordjs/rest';
import { Client } from 'discord.js';
import { BOT_TOKEN, CLIENT_ID } from './secrets/secrets';
import { refreshCommands, commands, commandKeys } from './commands';

const client = new Client({ intents: 1537 });
const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

client.once('ready', async () => {
  console.log(`List of actively registered commands: \n  [${commandKeys.join()}]`);
  await refreshCommands(CLIENT_ID, rest);
  console.log('DraftBot is ready to go!');
});

client.on('interactionCreate', async (interaction) => {
  console.log(interaction);

  if (!interaction.isCommand()) return;
  const { commandName } = interaction;
  console.log(`Interaction command received: ${commandName} with options ${interaction.options}`);

  if (commandKeys.includes(commandName)) {
    commands.get(commandName)?.action(interaction);
  }
});

// client.on('debug', (e) => console.log(e));

client.login(BOT_TOKEN);
