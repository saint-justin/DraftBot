import { Routes } from 'discord-api-types/v10';
import { REST } from '@discordjs/rest';
import { AbstractCommand } from './utils/Command';
import Scry from './actions/Scry';
import Draft from './actions/Draft';

const commands: Map<string, AbstractCommand> = new Map<string, AbstractCommand>();
const scryCommand = new Scry();
const draftCommand = new Draft();
commands.set(scryCommand.name, scryCommand);
commands.set(draftCommand.name, draftCommand);

const commandKeys = Array.from(commands.keys());

const refreshCommands = async (clientId: string, restClient: REST) => {
  const schemas = Array.from(commands.values()).map((command) => command.commandSchema);

  await restClient.put(Routes.applicationCommands(clientId), { body: schemas })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
};

export {
  commands,
  commandKeys,
  refreshCommands,
};
