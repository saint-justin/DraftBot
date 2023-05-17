import {
  SCRYFALL_URL,
  SCRYFALL_URL_BULKCARDS,
  SCRYFALL_ENDPOINT_GETCARD,
  SCRYFALL_ENDPOINT_GETGUESSES,
  SCRYFALL_ENDPOINT_SEARCH,
  SCRYFALL_ENDPOINT_SETS,
} from '../Constants';
import { BulkDataObject, ScryfallCard } from '../ScryfallTypes';

const requestBuilderToEndpointForCard = (endpoint: string) => async (cardName: string):Promise<any> => fetch(encodeURI(`${SCRYFALL_URL}${endpoint}"${cardName}"`));

const requestBuilderToEndpointForSet = (endpoint: string) => async (setTag: string):Promise<any> => fetch(encodeURI(`${SCRYFALL_URL}${endpoint}${setTag}`));

export const getCardRequest = requestBuilderToEndpointForCard(SCRYFALL_ENDPOINT_GETCARD);
export const getCardGuesses = requestBuilderToEndpointForCard(SCRYFALL_ENDPOINT_GETGUESSES);
export const getSearchRequest = requestBuilderToEndpointForCard(SCRYFALL_ENDPOINT_SEARCH);
export const getSetRequest = requestBuilderToEndpointForSet(SCRYFALL_ENDPOINT_SETS);
export const getSetsBulk = async (): Promise<Map<string, ScryfallCard[]>> => {
  console.log('Requesting bulk data...');
  const bulkApiResponse = await fetch(SCRYFALL_URL_BULKCARDS);
  const bulkApiJson = await bulkApiResponse.json();
  const bulkObjects = bulkApiJson.data as BulkDataObject[]
  console.log(bulkObjects);

  const defaultCardsUri = bulkObjects.filter(bulkObject => bulkObject.type === 'default_cards')[0].download_uri;
  if (!defaultCardsUri) throw new Error('Unable to locate bulk cards URI');

  console.log('Bulk API for default cards found: ' + defaultCardsUri);
  console.log('Requesting large data object...');
  const cardArrayResponse = await fetch(defaultCardsUri);
  const cardArray = await cardArrayResponse.json() as ScryfallCard[];

  console.log('Json data parsed, sorting cards into sets...');
  const sets = new Map<string, ScryfallCard[]>();
  cardArray.forEach((card) => {
    if (sets.has(card.set_id)) {
      sets.get(card.set_id)?.push(card);
    } else {
      sets.set(card.set_id, [card]);
    }
  });

  console.log(`Total sets generated from bulk data pull: ${Array.from(sets.keys()).length}`);
  return sets;
};
