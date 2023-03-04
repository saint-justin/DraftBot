import {
  SCRYFALL_URL,
  SCRYFALL_URL_BULKCARDS,
  SCRYFALL_ENDPOINT_GETCARD,
  SCRYFALL_ENDPOINT_GETGUESSES,
  SCRYFALL_ENDPOINT_SEARCH,
  SCRYFALL_ENDPOINT_SETS,
} from '../Constants';
import { ScryfallCard } from '../ScryfallTypes';

const requestBuilderToEndpointForCard = (endpoint: string) => async (cardName: string):Promise<any> => fetch(encodeURI(`${SCRYFALL_URL}${endpoint}"${cardName}"`));

const requestBuilderToEndpointForSet = (endpoint: string) => async (setTag: string):Promise<any> => fetch(encodeURI(`${SCRYFALL_URL}${endpoint}${setTag}`));

export const getCardRequest = requestBuilderToEndpointForCard(SCRYFALL_ENDPOINT_GETCARD);
export const getCardGuesses = requestBuilderToEndpointForCard(SCRYFALL_ENDPOINT_GETGUESSES);
export const getSearchRequest = requestBuilderToEndpointForCard(SCRYFALL_ENDPOINT_SEARCH);
export const getSetRequest = requestBuilderToEndpointForSet(SCRYFALL_ENDPOINT_SETS);
export const getSetsBulk = async (): Promise<Map<string, ScryfallCard[]>> => {
  console.log('Requesting bulk data...');
  const response = await fetch(SCRYFALL_URL_BULKCARDS);
  console.log('Requested data obtained! Parsing data...');
  const cardArray = await response.json() as ScryfallCard[];
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
