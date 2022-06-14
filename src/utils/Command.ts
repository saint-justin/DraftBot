import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';
import { CacheType, CommandInteraction } from 'discord.js';

export class Command implements AbstractCommand {
  name: string;

  commandSchema: RESTPostAPIApplicationCommandsJSONBody;

  action: (interaction: CommandInteraction<CacheType>) => void;

  constructor(
    name: string,
    commandSchema: RESTPostAPIApplicationCommandsJSONBody,
    action: (interaction: CommandInteraction<CacheType>) => void,
  ) {
    this.name = name;
    this.commandSchema = commandSchema;
    this.action = action;
    Object.freeze(this);
  }
}

export interface AbstractCommand {
  name: string;
  commandSchema: RESTPostAPIApplicationCommandsJSONBody;
  action: (interaction: CommandInteraction<CacheType>) => void;
}
