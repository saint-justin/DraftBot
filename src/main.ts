import { REST } from '@discordjs/rest';
import { Client, Interaction } from 'discord.js';
import { version } from 'process';
import { refreshCommands, commands, commandKeys } from './commands';
import DynamoWrapper from './utils/wrappers/DynamoWrapper';
import SecretsWrapper from './utils/wrappers/SecretsWrapper';

// Check current node version on
const nodeVersion = `${version.split('.')[0]}.${version.split('.')[1]}`;
if (parseInt(nodeVersion, 10) < 17.5) {
  throw new Error('Node version out of date, node version >v17.5 required.');
} else {
  console.log(`Node version ${nodeVersion} ok!`);
}

const onReady = async (apiToken: string, applicationId: string) => {
  console.log('Creating dummy draft in current environment');
  const rest = new REST({ version: '10' }).setToken(apiToken);
  
  const dynamoHelper = new DynamoWrapper('us-west-1', 'draftbot-drafts-beta');

  /* 
  Test code
  dynamoHelper.createDraft({
    draftId: uuid(),
    draftSets: ['set1', 'set2', 'set3'],
    players: ['p1', 'p2', 'p3'],
    draftRound: 0,
    startTime: Date.now(),
    packs: [],
  });
  */

  console.log(`List of actively registered commands: \n  [${commandKeys.join()}]`);
  await refreshCommands(applicationId, rest);

  console.log('DraftBot is ready to go!');
};

const onInteractionsCreate = async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;
  console.log(`Interaction command received: ${commandName}`);

  if (commandKeys.includes(commandName)) {
    commands.get(commandName)?.action(interaction);
  }
};

const run = async () => {
  const botSecrets = await new SecretsWrapper().getBotSecret();
  const client = new Client({ intents: 1537 });

  client.once('ready', () => onReady(botSecrets.api_token, botSecrets.application_id));
  client.on('interactionCreate', (interaction: Interaction) => onInteractionsCreate(interaction));
  client.login(botSecrets.api_token);
};

console.log('All functionality prepped, starting up... \n\n');

run();