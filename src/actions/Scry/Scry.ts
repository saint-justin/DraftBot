import { SlashCommandBuilder } from '@discordjs/builders';
import { 
  CacheType, 
  CommandInteraction, 
  MessageEmbed 
} from 'discord.js';
import { Command } from '../../utils/Types';
import { getSearchRequest } from './ScryfallWrapper';
import { ScryfallSearchObject } from 'src/utils/ScryfallTypes';

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
  const requestedCard = interaction.options.getString('card-name');
  if (requestedCard === null) {
    console.log('Error: No card requested!');
    return;
  }

  const searchResponse = await getSearchRequest(requestedCard);
  const searchJson: ScryfallSearchObject = await searchResponse.json();
  
  if (searchResponse.status !== 200) {
    interaction.reply({ content: `I'm sorry, I'm having trouble finding any cards like '${requestedCard}'`, ephemeral: true })
      .then(() => console.log('Response successfully sent.'))
      .catch(console.error);
    return;
  }

  const msg = new MessageEmbed().setColor('#EC9192');
  
  if (searchJson.data.length > 1) {
    msg.setTitle('Search Error: Multiple Cards Found');
    msg.addField('Options', searchJson.data.map(card => card.name).join('\n'));
    interaction.reply({ embeds: [msg], ephemeral: true })
      .then(() => console.log('Response successfully sent.'))
      .catch(console.error);
    return;
  }

  const card = searchJson.data[0];
  msg.setImage(card.image_uris.large);
  msg.setTitle(card.name);
  msg.setDescription(card.oracle_text);
  msg.setFooter({ text: 'Bot developed by Justin Vaughn' });

  interaction.reply({ embeds: [msg], ephemeral: true })
    .then(() => console.log('Response successfully sent.'))
    .catch(console.error);
};

export const Scry = new Command(name, commandSchema, action);
