import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction } from 'discord.js';
import { ScryfallSearchObject } from 'src/utils/ScryfallTypes';
import { Command } from '../../utils/Types';
import { getSearchRequest } from './ScryfallWrapper';
import {
  errorResponse,
  tooManyCardsResponse,
  cardFoundResponse,
} from '../../utils/MessageBuilder';

const name = 'scry';

const commandSchema = new SlashCommandBuilder()
  .setName('scry')
  .setDescription('Searches for a card you look up')
  .addStringOption((option) => option.setName('card-name')
    .setDescription('The cards name')
    .setRequired(true))
  .toJSON();

const action = async (interaction: CommandInteraction<CacheType>) => {
  const requestedCard = interaction.options.getString('card-name');
  if (requestedCard === null) {
    interaction.reply(errorResponse('Error: No card included'))
      .then(() => console.log('Response successfully sent.'))
      .catch(console.error);
    return;
  }

  const searchResponse = await getSearchRequest(requestedCard);
  const searchJson: ScryfallSearchObject = await searchResponse.json();

  if (searchResponse.status !== 200) {
    interaction.reply(errorResponse(`I'm sorry, I'm having trouble finding any cards like '${requestedCard}'`))
      .then(() => console.log('Response successfully sent.'))
      .catch(console.error);
    return;
  }

  const responseNames = searchJson.data.map((card) => card.name.toLocaleLowerCase());
  if (responseNames.includes(requestedCard.toLocaleLowerCase())) {
    searchJson.data = searchJson.data.filter((card) => card.name === requestedCard);
  }

  if (searchJson.data.length === 1) {
    interaction.reply(cardFoundResponse(searchJson.data[0]))
      .then(() => console.log('Response successfully sent.'))
      .catch(console.error);
  }

  if (searchJson.data.length > 1) {
    interaction.reply(tooManyCardsResponse(searchJson))
      .then(() => console.log('Response successfully sent.'))
      .catch(console.error);
  }
};

export const Scry = new Command(name, commandSchema, action);