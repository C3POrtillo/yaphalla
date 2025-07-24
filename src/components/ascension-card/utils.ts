import { Ascension } from '@/utils/types';

export const filterPairs = (unit: string) => {
  switch (unit) {
    case 'Phraesto Clone':
      return 'Phraesto';
    case 'Elijah':
    case 'Lailah':
      return 'Elijah & Lailah';
    default:
      return unit;
  }
};

export const enableEx = (ascension: Ascension) => {
  const mythicPlusIndex = Ascension.indexOf('Mythic+');
  const currentIndex = Ascension.indexOf(ascension);

  return currentIndex <= mythicPlusIndex;
};
