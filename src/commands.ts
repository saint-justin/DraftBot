import { Routes } from 'discord-api-types/v10';
import { REST } from '@discordjs/rest';
import { Command } from './helpers/types';
import { Scry } from './actions/Scry/Scry';

const commands: Map<string, Command> = new Map<string, Command>();
commands.set(Scry.name, Scry);

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
