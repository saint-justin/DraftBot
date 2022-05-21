import { SlashCommandBuilder } from '@discordjs/builders';

export const scry = new SlashCommandBuilder()
  .setName('scry')
  .setDescription('Searches for a card you look up')
  .addStringOption((option) => option.setName('card-name')
    .setDescription('The cards name')
    .setRequired(true))
  .toJSON();
