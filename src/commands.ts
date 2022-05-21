import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord-api-types/v10';
import { REST } from '@discordjs/rest';

import { scry } from './actions/Scry/Scry';

export const commands: RESTPostAPIApplicationCommandsJSONBody[] = [
  scry,
];

export const refreshCommands = async (clientId: string, restClient: REST) => {
  await restClient.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
};
