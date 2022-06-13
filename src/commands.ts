import { Routes } from 'discord-api-types/v10';
import { REST } from '@discordjs/rest';
import { Command } from './utils/Types';
import Scry from './actions/Scry';
import Draft from './actions/Draft';

const commands: Map<string, Command> = new Map<string, Command>();
commands.set(Scry.name, Scry);
commands.set(Draft.name, Draft);

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
