const SCRYFALL_URL: string = 'https://api.scryfall.com';
const SCRYFALL_ENDPOINT_GETCARD: string = '/cards/named?cards/named?fuzzy=';
const SCRYFALL_ENDPOINT_GETGUESSES: string = '/cards/autocomplete?q=';
const SCRYFALL_ENDPOINT_SEARCH: string = '/cards/search?q=';
const SCRYFALL_ENDPOINT_SETS: string = '/sets/';
const PLUG: string = '\n\nDraftBot is completely [open source](https://github.com/saint-justin/DraftBot), contribute now!';
const REGION: string = 'us-west-1';
const DRAFT_TABLE_PREFIX: string = 'draftbot-drafts';
enum STAGES {
  BETA = 'beta',
  GAMMA = 'gamma',
  PROD = 'prod',
}

export {
  SCRYFALL_URL,
  SCRYFALL_ENDPOINT_GETCARD,
  SCRYFALL_ENDPOINT_GETGUESSES,
  SCRYFALL_ENDPOINT_SEARCH,
  SCRYFALL_ENDPOINT_SETS,
  PLUG,
  REGION,
  DRAFT_TABLE_PREFIX,
  STAGES,
};
