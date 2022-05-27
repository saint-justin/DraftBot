import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';
import { CacheType, CommandInteraction, MessageEmbed } from 'discord.js';

export class Command {
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

export interface EmbeddedMessageData {
  title: string,
  url?: string,
  image?: string,
  footer: string,
}

export interface MessageResponse {
  embeds?: MessageEmbed[],
  content?: string,
  ephemeral?: boolean,
}
