export const SCRYFALL_URL: string = 'https://api.scryfall.com';
export const SCRYFALL_ENDPOINT_GETCARD: string = '/cards/named?cards/named?fuzzy=';
export const SCRYFALL_ENDPOINT_GETGUESSES: string = '/cards/autocomplete?q=';
export const SCRYFALL_ENDPOINT_SEARCH: string = '/cards/search?q=';
export const SCRYFALL_ENDPOINT_SETS: string = '/sets/';

export const DRAFTABLE_SET_TYPES: string[] = ['core', 'expansion', 'masters', 'draft_innovation'];
export const PLUG: string = '\n\nDraftBot is completely [open source](https://github.com/saint-justin/DraftBot), contribute now!';

export const DEFAULT_REGION: string = 'us-west-1';
export const DRAFT_TABLE_PREFIX: string = 'draftbot-drafts';

export enum DYNAMO_TABLE {
  DRAFTS_BETA = 'draftbot-drafts-beta',
  DRAFTS_PROD = 'draftbot-drafts-prod',
  SETS_BETA = 'draftbot-sets-beta',
  SETS_PROD = 'draftbot-sets-prod',
}

export enum STAGES {
  BETA = 'beta',
  GAMMA = 'gamma',
  PROD = 'prod',
}
