import { SCRYFALL_URL } from '../../helpers/Constants';

// Fxn to actually get card info and return out information to the user ---------------------------
export const getCardRequest = async (cardName: string): Promise<any> => {
  const response = await fetch(`${SCRYFALL_URL}/cards/search?q=!"${cardName}"`);
  return response.json();
};
