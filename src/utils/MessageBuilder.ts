/* eslint max-len: 0 */

import { MessageEmbed } from 'discord.js';
import { ScryfallCard, ScryfallSearchObject } from './ScryfallTypes';
import { PLUG } from './Constants';

const generateMessage = () => new MessageEmbed().setColor('#EC9192');

const tooManyCardsMessage = (searchJson: ScryfallSearchObject) => generateMessage()
  .addField('Multiple Cards Found', searchJson.data.map((card) => card.name).join('\n'));

const cardFoundMessage = (card: ScryfallCard) => generateMessage()
  .setTitle(card.name)
  .setURL(card.uri)
  .addField(`${card.type_line}  [${card.power}/${card.toughness}]`, `${card.oracle_text}${PLUG}`)
  .setThumbnail(card.image_uris.large);

export const errorResponse = (errorMessage: string) => ({ content: errorMessage, ephemeral: true });

export const tooManyCardsResponse = (searchJson: ScryfallSearchObject) => ({ embeds: [tooManyCardsMessage(searchJson)], ephemeral: true });

export const cardFoundResponse = (card: ScryfallCard) => ({ embeds: [cardFoundMessage(card)], ephemeral: true });
