import { RateLimiter } from 'limiter';
import {
  SCRYFALL_URL,
  DRAFTABLE_SET_TYPES,
  DYNAMO_TABLE,
  DEFAULT_REGION,
} from '../../utils/Constants';
import { ScryfallCard, ScryfallSetCardRequest, ScryfallSetObject } from '../../utils/ScryfallTypes';
import DynamoWrapper from '../../utils/wrappers/DynamoWrapper';
import { getSetsBulk } from '../../utils/wrappers/ScryfallWrapper';
import SortedSet from './SortedSet';

const dynamoLimiter = new RateLimiter({ tokensPerInterval: 6, interval: 'minute' });

const buildDynamoTablesForSets = async (setTypes: string[]) => {
  const bulkSetData: Map<string, ScryfallCard[]> = await getSetsBulk();

  console.log('Getting data for all sets...');
  const request = await fetch(encodeURI(`${SCRYFALL_URL}/sets`));
  const json = await request.json();
  const setData: ScryfallSetObject[] = json.data;
  console.log(`Sets before trimming: ${setData.length}`);

  const minimizedSets = setData.filter((set) => {
    const isDraftable = setTypes.includes(set.set_type);
    const isReleased = new Date(set.released_at) < new Date(Date.now());
    const isFullSized = set.card_count > 50;
    return isDraftable && isReleased && isFullSized;
  });
  console.log(`Sets after trimming: ${minimizedSets.length}\n`);

  const dynamo = new DynamoWrapper(DEFAULT_REGION, DYNAMO_TABLE.SETS_BETA);
  dynamoLimiter.removeTokens(6); // Clean all tokens from bucket for 1T/10S rate limiting
  minimizedSets.forEach(async set => {
    // Self-limit dynamo to stay in free tier
    if (!bulkSetData.has(set.id)) {
      console.error(`Set data not found for set with id: [${set.id}] `)
      return;
    }

    const sortedSet = new SortedSet(set);
    const skippedSets = [];

    bulkSetData.get(set.id)?.forEach(card => sortedSet.sortCard(card));
    const condensedData = sortedSet.getCondensed();
    if (!condensedData) {
      console.log(`  Error in retrieving condensed data for set ${sortedSet.getId()}`);
      skippedSets.push(set.name);
      return;
    }   
    
    await dynamoLimiter.removeTokens(1); 
    await dynamo.writeSet(condensedData);
    console.log(`Set successfully written for set: ${set.name}`)
  })

  console.log('Full run completed!')
};

buildDynamoTablesForSets(DRAFTABLE_SET_TYPES);