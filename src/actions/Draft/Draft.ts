// import { SlashCommandBuilder } from '@discordjs/builders';
import { BuildCommandSchema } from '../../utils/SchemaBuilder';
import { CacheType, CommandInteraction } from 'discord.js';
// import { ScryfallSearchObject } from 'src/utils/ScryfallTypes';
import { Command, OptionSchema } from '../../utils/Types';
// import { getSearchRequest } from './ScryfallWrapper';

const name = 'draft';

const commandSchema = BuildCommandSchema({
  name,
  description: 'Start a draft with up to four players',
  userOptions: ['1st', '2nd', '3rd', '4th'].map(which => ({
    name: `player-${which.slice(0, 1)}`,
    description: `The ${which} player.`,
    required: which === '1st'
    }))
  })

  // .setName('draft') // A dependency throw an err if you try to use just use the name var here
  // .setDescription('Start a draft with up to four players')
  // .addStringOption((option) => option.setName('players')
  //   .setDescription('The @s of all players to include')
  //   .setRequired(true))
  // .toJSON();

  // console.log(commandSchema);

const action = async (interaction: CommandInteraction<CacheType>) => {
  interaction.reply("Draft called!");
  console.log(interaction.command);

  const players = [
    interaction.options.getUser('player-1'),
    interaction.options.getUser('player-2'),
    interaction.options.getUser('player-3'),
    interaction.options.getUser('player-4')
  ]
  console.log(interaction.options);
  console.log(players);
};

export default new Command(name, commandSchema, action);
