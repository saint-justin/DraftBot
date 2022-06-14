import { MessageEmbed } from 'discord.js';

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

interface BaseSchema {
  name: string,
  description: string,
}

export interface CommandSchema extends BaseSchema {
  stringOptions?: OptionSchema[],
  userOptions?: OptionSchema[],
}

export interface OptionSchema extends BaseSchema {
  required?: boolean,
}

export interface Draft {
  draftId: string,
  draftSets: string[],
  draftRound: number,
  players: string[],
  startTime: number,
  packs: Pack[],
}

export interface Pack {
  cardsRemaining: [],
  cardsPulled: [],
}
