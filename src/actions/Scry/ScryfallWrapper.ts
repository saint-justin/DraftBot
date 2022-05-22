import { 
  SCRYFALL_URL,
  SCRYFALL_ENDPOINT_GETCARD,
  SCRYFALL_ENDPOINT_GETGUESSES,
  SCRYFALL_ENDPOINT_SEARCH,
} from '../../utils/Constants';

const requestBuilderToEndpoint = (endpoint: string) => {
  return async (cardName: string): Promise<any> => {
    const url = encodeURI(`${SCRYFALL_URL}${endpoint}"${cardName}"`);
    return await fetch(url);
  }
}

export const getCardRequest = requestBuilderToEndpoint(SCRYFALL_ENDPOINT_GETCARD);
export const getCardGuesses = requestBuilderToEndpoint(SCRYFALL_ENDPOINT_GETGUESSES);
export const getSearchRequest = requestBuilderToEndpoint(SCRYFALL_ENDPOINT_SEARCH);