import { SlashCommandBuilder } from '@discordjs/builders';
import { Options } from 'discord.js';
import { CommandSchema, OptionSchema } from './Types';

export const BuildCommandSchema = (props: CommandSchema) => {
  let command = new SlashCommandBuilder();
  command.setName(props.name);
  command.setDescription(props.description);

  if (props.userOptions) {
    for (const objectOptions of props.userOptions) {
      command.addUserOption( 
        (userOption) => userOption.setName(objectOptions.name as string)
          .setDescription(objectOptions.description)
          .setRequired(objectOptions.required || false)
      )
    }
  }


  if (props.stringOptions) {
    for(const objectOptions of props.stringOptions) {
      command.addStringOption( 
        (stringOption) => stringOption.setName(objectOptions.name as string)
          .setDescription(objectOptions.description)
          .setRequired(objectOptions.required || false)
      )
    }
  }


  return command.toJSON();
};
