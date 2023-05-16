import { CacheType, CommandInteraction } from 'discord.js';
import { ScryfallSearchObject } from 'src/utils/ScryfallTypes';
import { BuildCommandSchema } from '../../utils/SchemaBuilder';
import { AbstractCommand } from '../../utils/Command';
import { getSearchRequest } from '../../utils/wrappers/ScryfallWrapper';
import {
  errorResponse,
  cardFoundResponse,
  tooManyCardsResponse,
} from '../../utils/MessageBuilder';

export default class Scry implements AbstractCommand {
  name = 'scry';

  commandSchema = BuildCommandSchema({
    name: this.name,
    description: 'Searches for the card by the name you give',
    stringOptions: [{
      name: 'card-name',
      description: 'The cards name',
      required: true,
    }],
  });

  action = async (interaction: CommandInteraction<CacheType>) => {
    const requestedCard = interaction.options.getString('card-name');
    if (requestedCard === null) {
      interaction.reply(errorResponse(`Error: No card included in command ${this.name}`))
        .then(() => console.log('Response successfully sent.'))
        .catch(console.error);
      return;
    }

    let placeholder = await interaction.deferReply({ephemeral: true });

    const searchResponse = await getSearchRequest(requestedCard);
    const searchJson: ScryfallSearchObject = await searchResponse.json();

    if (searchResponse.status !== 200) {
      interaction.followUp(errorResponse(`I'm sorry, I'm having trouble finding any cards like '${requestedCard}'`))
        .then(() => placeholder)
        .then(() => console.log('Response successfully sent.'))
        .catch(console.error);
      return;
    }

    const responseNames = searchJson.data.map((card) => card.name.toLocaleLowerCase());
    if (responseNames.includes(requestedCard.toLocaleLowerCase())) {
      searchJson.data = searchJson.data.filter((card) => card.name === requestedCard);
    }

    if (searchJson.data.length === 1) {
      interaction.followUp(cardFoundResponse(searchJson.data[0]))
        .then(() => console.log('Response successfully sent.'))
        .catch(console.error);
    }

    if (searchJson.data.length > 1) {
      interaction.followUp(tooManyCardsResponse(searchJson))
        .then(() => console.log('Response successfully sent.'))
        .catch(console.error);
    }
  };
}
