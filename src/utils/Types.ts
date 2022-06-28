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

// SetData stores cards by rarity as a comma delimited string of ID's
export interface SetData {
  setId: string,
  setCode: string,
  setSize: number,
  cardsByRarity: CardsByRarity,
}

export interface CardsByRarity {
  common: string[] | string,
  uncommon: string[] | string,
  rare: string[] | string,
  mythic: string[] | string,
}

// export interface CardData {
//   object: string;
//   id: string;
//   oracle_id: string;
//   name: string;
//   uri: string;
//   scryfall_uri: string;
//   layout: string;
//   png_uri: string;
//   mana_cost: string;
//   cmc: number;
//   type_line: string;
//   oracle_text: string;
//   power: string;
//   toughness: string;
//   set_id: string;
//   set: string;
//   rarity: string;
//   flavor_text: string;
// }
