import { SCRYFALL_URL, DRAFTABLE_SET_TYPES, DYNAMO_TABLE, DEFAULT_REGION } from '../../utils/Constants';
import { RateLimiter } from 'limiter';
import { CardsByRarity, CardsByRarityCondensed } from '../../utils/Types';
import { ScryfallCard, ScryfallSetCardRequest, ScryfallSetObject } from '../../utils/ScryfallTypes';
import DynamoWrapper from '../../utils/wrappers/DynamoWrapper';
import SortedSet from './SortedSet';

const scryfallLimiter = new RateLimiter({ tokensPerInterval: 10, interval: 'second' });
const dynamoLimiter = new RateLimiter({tokensPerInterval: 1, interval: 'second'})

const getCardIdsByRarityForSet = async (setData:ScryfallSetObject): Promise<SortedSet> => {
  let request = await fetch(setData.search_uri);
  let response = await request.json() as ScryfallSetCardRequest;

  console.log(`Grabbing data for set: ${setData.name}`)
  const sortedSet = new SortedSet(setData.id);
  
  while (response.has_more === true) {
    await scryfallLimiter.removeTokens(1); // Rate limiting to 10tps per scryfall's rules
    request = await fetch(response.next_page);
    response = await request.json() as ScryfallSetCardRequest;
    response.data.forEach(card => sortedSet.sortCard(card));
  }

  return sortedSet;
};

const buildDynamoTablesForSets = async (setTypes: string[]) => {
  console.log('Getting data for all sets...');
  const request = await fetch(encodeURI(`${SCRYFALL_URL}/sets`));
  const json = await request.json();
  const setData: ScryfallSetObject[] = json.data;
  console.log(`Sets before trimming: ${setData.length}`);

  const minimizedSets = setData.filter((set) => {
    const isDraftable = setTypes.includes(set.set_type);
    const isReleased = new Date(set.released_at) < new Date(Date.now());
    return isDraftable && isReleased;
  });
  console.log(`Sets after trimming: ${minimizedSets.length}\n`);

  const dynamo = new DynamoWrapper(DEFAULT_REGION, DYNAMO_TABLE.SETS_BETA);
  const cardsByRarity = await getCardIdsByRarityForSet(minimizedSets[0]);

  await dynamoLimiter.removeTokens(1);  // Self-limit dynamo to try and stay in free tier
  dynamo.writeSet(cardsByRarity.getCondensed());

  // minimizedSets.forEach(async set => {
  // })
};

buildDynamoTablesForSets(DRAFTABLE_SET_TYPES);
