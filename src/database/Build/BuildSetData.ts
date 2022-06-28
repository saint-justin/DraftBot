import { SCRYFALL_URL, DRAFTABLE_SET_TYPES } from '../../utils/Constants';
import { RateLimiter } from 'limiter';
import { CardsByRarity } from '../../utils/Types';
import { ScryfallSetObject } from '../../utils/ScryfallTypes';

const limiter = new RateLimiter({ tokensPerInterval: 10, interval: 'second' });

const getAllSetData = async (): Promise<any> => {

};

const getCardIdsByRarityForSet = async (setData:ScryfallSetObject):Promise<CardsByRarity> => {
  // setData..forEach(card => {

  // })

  console.log(setData);

  // TODO: Take the given set's information 
  return await {
    common: '',
    uncommon: '',
    rare: '',
    mythic: '',
  }
};

const buildDynamoTablesForSets = async (setTypes: string[]) => {
  console.log('Getting data for all sets...');
  const request = await fetch(encodeURI(`${SCRYFALL_URL}/sets`));
  const json = await request.json();
  const setData: ScryfallSetObject[] = json.data;
  console.log(`Sets before trimming: ${setData.length}`);

  const minimizedSets = setData.filter((set) => DRAFTABLE_SET_TYPES.includes(set.set_type));
  console.log(`Sets after trimming: ${minimizedSets.length}`);

  getCardIdsByRarityForSet(minimizedSets[0]);
};

buildDynamoTablesForSets(DRAFTABLE_SET_TYPES);
