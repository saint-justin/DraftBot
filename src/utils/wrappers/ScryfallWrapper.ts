import {
  SCRYFALL_URL,
  SCRYFALL_ENDPOINT_GETCARD,
  SCRYFALL_ENDPOINT_GETGUESSES,
  SCRYFALL_ENDPOINT_SEARCH,
  SCRYFALL_ENDPOINT_SETS,
} from '../Constants';

const requestBuilderToEndpointForCard = (endpoint: string) => async (cardName: string):Promise<any> => fetch(encodeURI(`${SCRYFALL_URL}${endpoint}"${cardName}"`));

const requestBuilderToEndpointForSet = (endpoint: string) => async (setTag: string):Promise<any> => fetch(encodeURI(`${SCRYFALL_URL}${endpoint}${setTag}`));

export const getCardRequest = requestBuilderToEndpointForCard(SCRYFALL_ENDPOINT_GETCARD);
export const getCardGuesses = requestBuilderToEndpointForCard(SCRYFALL_ENDPOINT_GETGUESSES);
export const getSearchRequest = requestBuilderToEndpointForCard(SCRYFALL_ENDPOINT_SEARCH);
export const getSetRequest = requestBuilderToEndpointForSet(SCRYFALL_ENDPOINT_SETS);
