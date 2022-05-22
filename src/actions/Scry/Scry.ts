import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction } from 'discord.js';
import { Command } from '../../helpers/types';
import { getCardRequest } from './ScryfallWrapper';

const name = 'scry';

const commandSchema = new SlashCommandBuilder()
  .setName('scry')
  .setDescription('Searches for a card you look up')
  .addStringOption((option) => option.setName('card-name')
    .setDescription('The cards name')
    .setRequired(true))
  .toJSON();

const action = async (interaction: CommandInteraction<CacheType>) => {
  console.log('Scry action called!');
  console.log(interaction.options);

  const requestedCard = interaction.options.getString('card-name');
  if (requestedCard === null) {
    console.log('Error: No card requested!');
    return;
  }

  const response = await getCardRequest(requestedCard);
  console.log(response);

  interaction.reply({ content: 'Scry called!', ephemeral: true });
};

export const Scry = new Command(name, commandSchema, action);
