import { MessageEmbed } from 'discord.js';
import { ScryfallCard, ScryfallSetObject } from './ScryfallTypes';

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
  setData: ScryfallSetObject | undefined,
  common: ScryfallCard[],
  uncommon: ScryfallCard[],
  rare: ScryfallCard[],
  mythic: ScryfallCard[],
}

export interface CardsByRarityCondensed {
  setId: string,
  setName: string,
  common: string,
  uncommon: string,
  rare: string,
  mythic: string,
}