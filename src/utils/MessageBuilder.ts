/* eslint max-len: 0 */

import {
  CacheType, CommandInteraction, MessageEmbed,
} from 'discord.js';
import { ScryfallCard, ScryfallSearchObject } from './ScryfallTypes';
import { PLUG } from './Constants';
import { MessageResponse } from './Types';

const generateMessage = () => new MessageEmbed().setColor('#EC9192');

const tooManyCardsMessage = (searchJson: ScryfallSearchObject) => generateMessage()
  .addField('Multiple Cards Found', searchJson.data.slice(0, 15).map((card) => card.name).join('\n'));

const cardFoundMessage = (card: ScryfallCard) => generateMessage()
  .setTitle(card.name)
  .setURL(card.uri)
  .addField(`${card.type_line}  [${card.power}/${card.toughness}]`, `${card.oracle_text}${PLUG}`)
  .setThumbnail(card.image_uris.large);

export const placeholder = (message: string): MessageResponse => ({ content: message, ephemeral: false });

export const errorResponse = (errorMessage: string): MessageResponse => ({ content: errorMessage, ephemeral: true });

export const tooManyCardsResponse = (searchJson: ScryfallSearchObject): MessageResponse => ({ embeds: [tooManyCardsMessage(searchJson)], ephemeral: true });

export const cardFoundResponse = (card: ScryfallCard): MessageResponse => ({ embeds: [cardFoundMessage(card)], ephemeral: true });

export const replyWithCard = (card: ScryfallCard, interaction: CommandInteraction<CacheType>) => {
  if (interaction.channel === null) {
    interaction.user.send(cardFoundResponse(card))
      .then(() => interaction.deleteReply())
      .catch(console.error);
  } else {
    interaction.channel.send(cardFoundResponse(card))
      .then(() => interaction.deleteReply())
      .catch(console.error);
  }
};
