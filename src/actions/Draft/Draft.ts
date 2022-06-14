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

const action = async (interaction: CommandInteraction<CacheType>) => {
  interaction.reply("Draft called!");
  // console.log(interaction.command);

  const players = [
    interaction.options.getUser('player-1'),
    interaction.options.getUser('player-2'),
    interaction.options.getUser('player-3'),
    interaction.options.getUser('player-4')
  ].filter((player) => !!player);
  // console.log(interaction.options);
  console.log(players);
};

export default new Command(name, commandSchema, action);
