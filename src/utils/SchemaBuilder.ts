import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandSchema } from './Types';

export const BuildCommandSchema = (props: CommandSchema) => {
  const command = new SlashCommandBuilder();
  command.setName(props.name);
  command.setDescription(props.description);

  if (props.userOptions) {
    props.userOptions.forEach((objectOptions) => {
      command.addUserOption(
        (userOption) => userOption.setName(objectOptions.name as string)
          .setDescription(objectOptions.description)
          .setRequired(objectOptions.required || false),
      );
    });
  }

  if (props.stringOptions) {
    props.stringOptions.forEach((objectOptions) => {
      command.addStringOption(
        (stringOption) => stringOption.setName(objectOptions.name as string)
          .setDescription(objectOptions.description)
          .setRequired(objectOptions.required || false),
      );
    });
  }

  return command.toJSON();
};
