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
        console.error('Error: Unknown card type');
        console.error(card);
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

    return {
      setId: this.cardsByRarity.setData.id!,
      common: SortedSet.getUniqueIds(this.cardsByRarity.common).join(','),
      uncommon: SortedSet.getUniqueIds(this.cardsByRarity.uncommon).join(','),
      rare: SortedSet.getUniqueIds(this.cardsByRarity.rare).join(','),
      mythic: SortedSet.getUniqueIds(this.cardsByRarity.mythic).join(','),
    };
  };

  getCount = (): number => this.cardsByRarity.common.length
                           + this.cardsByRarity.uncommon.length
                           + this.cardsByRarity.rare.length
                           + this.cardsByRarity.mythic.length;

  getId = (): string => this.cardsByRarity.setData?.id || 'Set ID not found!';
}

export default SortedSet;
