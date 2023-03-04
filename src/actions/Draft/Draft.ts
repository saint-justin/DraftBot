import { CacheType, CommandInteraction } from 'discord.js';
import { v4 as uuid } from 'uuid';
import { getSetRequest } from '../../utils/wrappers/ScryfallWrapper';
import { BuildCommandSchema } from '../../utils/SchemaBuilder';
import { AbstractCommand } from '../../utils/Command';
import { DYNAMO_TABLE } from '../../utils/Constants';
import DynamoWrapper from '../../utils/wrappers/DynamoWrapper';

export const getSetData = async (setTag: string): Promise<any> => {
  const setRequest = await getSetRequest(setTag);
  if (setRequest.status !== 200) {
    console.log(`Set ${setTag} invalid!`);
    return undefined;
  }

  return setRequest.json();
};

export default class Draft implements AbstractCommand {
  name = 'draft';

  dynamo: DynamoWrapper;

  constructor() {
    this.dynamo = new DynamoWrapper('us-west-1', DYNAMO_TABLE.DRAFTS_BETA);
  }

  commandSchema = BuildCommandSchema({
    name: this.name,
    description: 'Start a draft with up to four players',
    userOptions: ['1st', '2nd', '3rd', '4th'].map((which) => ({
      name: `player-${which.slice(0, 1)}`,
      description: `The ${which} player.`,
      required: which === '1st',
    })),
    stringOptions: [{
      name: 'draft-sets',
      description: 'The 3-5 letter set ID for each set you want included in the draft separated by spaces',
    }],
  });

  action = async (interaction: CommandInteraction<CacheType>) => {
    interaction.reply('Draft called!');

    const players = [
      interaction.options.getUser('player-1'),
      interaction.options.getUser('player-2'),
      interaction.options.getUser('player-3'),
      interaction.options.getUser('player-4'),
    ].filter((player) => player !== null).map((player) => player?.id!);

    const draftSets = interaction.options.getString('draft-sets')?.split(' ').filter((set) => set !== undefined);

    // TODO: Add player validation (and accounts?)
    // TODO: Add set validation
    const setData = draftSets?.map((setTag) => getSetData(setTag.toUpperCase()));
    await Promise.all(setData!);

    setData?.forEach((set) => console.log(set));

    if (draftSets === undefined) {
      interaction.reply('Sorry, that\'s not a set that I recognize.');
      return;
    }

    this.dynamo.createDraft({
      draftId: uuid(),
      draftSets,
      players,
      draftRound: 0,
      startTime: Date.now(),
      packs: [],
    });
  };
}
