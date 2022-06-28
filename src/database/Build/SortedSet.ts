import { ScryfallCard } from "src/utils/ScryfallTypes";
import { CardsByRarity, CardsByRarityCondensed } from "src/utils/Types";

class SortedSet {
  cardsByRarity: CardsByRarity = {
    setId: 'UNDEFINED',
    common: [],
    uncommon: [],
    rare: [],
    mythic: [],
  }

  constructor(setId: string) {
    this.cardsByRarity.setId = setId;
  }

  sortCard = (card: ScryfallCard): void => {
    switch(card.rarity) {
      case "common":
        this.cardsByRarity.common.push(card.id);
        return;
      case "uncommon":
        this.cardsByRarity.uncommon.push(card.id);
        return;
      case "rare":
        this.cardsByRarity.rare.push(card.id);
        return;
      case "mythic":
        this.cardsByRarity.mythic.push(card.id);
        return;
      default:
        return;
    }
  }

  getCondensed = (): CardsByRarityCondensed => {
    return {
      setId: this.cardsByRarity.setId,
      common: this.cardsByRarity.common.join(','),
      uncommon: this.cardsByRarity.uncommon.join(','),
      rare: this.cardsByRarity.rare.join(','),
      mythic: this.cardsByRarity.mythic.join(',')
    };
  }

  getCount = (): number => {
    return this.cardsByRarity.common.length + this.cardsByRarity.uncommon.length + this.cardsByRarity.rare.length + this.cardsByRarity.mythic.length;
  }
}

export default SortedSet;