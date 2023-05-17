// Object generated from feeding an input to http://json2ts.com/
// This object may have missing or incorrect data
export interface ImageUris {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
}

export interface Legalities {
  standard: 'legal' | 'not_legal';
  future: 'legal' | 'not_legal';
  historic: 'legal' | 'not_legal';
  gladiator: 'legal' | 'not_legal';
  pioneer: 'legal' | 'not_legal';
  explorer: 'legal' | 'not_legal';
  modern: 'legal' | 'not_legal';
  legacy: 'legal' | 'not_legal';
  pauper: 'legal' | 'not_legal';
  vintage: 'legal' | 'not_legal';
  penny: 'legal' | 'not_legal';
  commander: 'legal' | 'not_legal';
  brawl: 'legal' | 'not_legal';
  historicbrawl: 'legal' | 'not_legal';
  alchemy: 'legal' | 'not_legal';
  paupercommander: 'legal' | 'not_legal';
  duel: 'legal' | 'not_legal';
  oldschool: 'legal' | 'not_legal';
  premodern: 'legal' | 'not_legal';
}

export interface Prices {
  usd: string;
  usd_foil: string;
  usd_etched?: any;
  eur: string;
  eur_foil: string;
  tix: string;
}

export interface RelatedUris {
  gatherer: string;
  tcgplayer_infinite_articles: string;
  tcgplayer_infinite_decks: string;
  edhrec: string;
}

export interface PurchaseUris {
  tcgplayer: string;
  cardmarket: string;
  cardhoarder: string;
}

export interface BulkDataObject {
  object: string;
  id: string;
  type: string;
  updated_at: Date;
  uri: string;
  name: string;
  description: string;
  size: number;
  download_uri: string;
  content_type: string;
  content_encoding: string;
}


export interface ScryfallCard {
  object: string;
  id: string;
  oracle_id: string;
  multiverse_ids: number[];
  mtgo_id: number;
  arena_id: number;
  tcgplayer_id: number;
  cardmarket_id: number;
  name: string;
  lang: string;
  released_at: string;
  uri: string;
  scryfall_uri: string;
  layout: string;
  highres_image: boolean;
  image_status: string;
  image_uris: ImageUris;
  mana_cost: string;
  cmc: number;
  type_line: string;
  oracle_text: string;
  power: string;
  toughness: string;
  colors: string[];
  color_identity: string[];
  keywords: any[];
  legalities: Legalities;
  games: string[];
  reserved: boolean;
  foil: boolean;
  nonfoil: boolean;
  finishes: string[];
  oversized: boolean;
  promo: boolean;
  reprint: boolean;
  variation: boolean;
  set_id: string;
  set: string;
  set_name: string;
  set_type: string;
  set_uri: string;
  set_search_uri: string;
  scryfall_set_uri: string;
  rulings_uri: string;
  prints_search_uri: string;
  collector_number: string;
  digital: boolean;
  rarity: string;
  flavor_text: string;
  card_back_id: string;
  artist: string;
  artist_ids: string[];
  illustration_id: string;
  border_color: string;
  frame: string;
  frame_effects: string[];
  security_stamp: string;
  full_art: boolean;
  textless: boolean;
  booster: boolean;
  story_spotlight: boolean;
  edhrec_rank: number;
  penny_rank: number;
  prices: Prices;
  related_uris: RelatedUris;
  purchase_uris: PurchaseUris;
}

export interface ScryfallSearchObject {
  object: string;
  total_cards: number;
  has_more: boolean;
  data: ScryfallCard[];
}

export interface ScryfallSetObject {
  object: string;
  id: string;
  code: string;
  mtgo_code: string;
  arena_code: string;
  name: string;
  uri: string;
  scryfall_uri: string;
  search_uri: string;
  released_at: Date;
  set_type: string;
  card_count: number;
  digital: boolean;
  nonfoil_only: boolean;
  foil_only: boolean;
  icon_svg_uri: string;
}

export interface ScryfallSetCardRequest {
  object: string;
  total_cards: number;
  has_more: boolean;
  next_page: string;
  data: ScryfallCard[];
}
