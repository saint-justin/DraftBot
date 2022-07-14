import { ScryfallCard, ScryfallSetObject } from 'src/utils/ScryfallTypes';
import { CardsByRarity, CardsByRarityCondensed } from 'src/utils/Types';

class SortedSet {
  cardsByRarity: CardsByRarity;

  constructor(setData: ScryfallSetObject) {
    this.cardsByRarity = {
      setData: undefined,
      common: [],
      uncommon: [],
      rare: [],
      mythic: [],
    };
    this.cardsByRarity.setData = setData;
  }

  sortCard = (card: ScryfallCard): void => {
    switch (card.rarity) {
      case 'common':
        this.cardsByRarity.common.push(card);
        break;
      case 'uncommon':
        this.cardsByRarity.uncommon.push(card);
        break;
      case 'rare':
        this.cardsByRarity.rare.push(card);
        break;
      case 'mythic':
        this.cardsByRarity.mythic.push(card);
        break;
      default:
        console.error(`Error: Unknown card type: ${card.name} [${card.id}]`);
    }
  };

  static getUniqueIds = (cards: ScryfallCard[]) => {
    const tracker = new Map<string, string>();
    cards.forEach((card) => {
      if (tracker.get(card.name)) return;
      tracker.set(card.name, card.id);
    });
    return Array.from(tracker.values());
  };

  getCondensed = (): CardsByRarityCondensed | null => {
    if (!this.cardsByRarity.setData?.id) {
      console.error('Error: No set ID found');
      return null;
    }

    const commons = SortedSet.getUniqueIds(this.cardsByRarity.common).join(',');
    const uncommons = SortedSet.getUniqueIds(this.cardsByRarity.uncommon).join(',');
    const rares = SortedSet.getUniqueIds(this.cardsByRarity.rare).join(',');
    const mythics = SortedSet.getUniqueIds(this.cardsByRarity.mythic).join(',');

    if (!commons || !uncommons || !rares) {
      const check = (type: string): string => !!type ? '✔️' : '❌';
      console.error(`Error: Null fields found for set ${this.cardsByRarity.setData.name} [${this.cardsByRarity.setData.id}]`)
      console.error(`  [ C: ${check(commons)}  U: ${check(uncommons)}  R: ${check(rares)}  M: ${check(mythics)} ]`);
      return null;
    }

    return {
      setId: this.cardsByRarity.setData.id!,
      setName: this.cardsByRarity.setData.name,
      common: commons,
      uncommon: uncommons,
      rare: rares,
      mythic: mythics,
    };
  };

  getCount = (): number => this.cardsByRarity.common.length
                           + this.cardsByRarity.uncommon.length
                           + this.cardsByRarity.rare.length
                           + this.cardsByRarity.mythic.length;

  getId = (): string => this.cardsByRarity.setData?.id || 'Set ID not found!';
}

export default SortedSet;
