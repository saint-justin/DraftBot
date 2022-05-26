import { REST } from '@discordjs/rest';
import { Client, Interaction } from 'discord.js';
import { version } from 'process';
import { BOT_TOKEN, CLIENT_ID } from './secrets/secrets';
import { refreshCommands, commands, commandKeys } from './commands';

const nodeVersion = `${version.split('.')[0]}.${version.split('.')[1]}`;
if (parseInt(nodeVersion, 10) < 17.5) {
  throw new Error('Node version out of date, node version >17.5 required.');
} else {
  console.log(`Node version ${nodeVersion} ok!`);
}

const client = new Client({ intents: 1537 });
const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

client.once('ready', async () => {
  console.log(`List of actively registered commands: \n  [${commandKeys.join()}]`);
  await refreshCommands(CLIENT_ID, rest);
  console.log('DraftBot is ready to go!');
});

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;
  console.log(`Interaction command received: ${commandName}`);

  if (commandKeys.includes(commandName)) {
    commands.get(commandName)?.action(interaction);
  }
});

client.login(BOT_TOKEN);
