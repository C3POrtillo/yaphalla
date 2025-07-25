import { Ascension } from '@/utils/types';

export const filterPairs = (unit: string) => {
  switch (unit) {
    case 'Phraesto Clone':
      return false;
    case 'Elijah':
    case 'Lailah':
      return false;
    default:
      return true;
  }
};

export const enableEx = (ascension: Ascension) => {
  const mythicPlusIndex = Ascension.indexOf('Mythic+');
  const currentIndex = Ascension.indexOf(ascension);

  return currentIndex <= mythicPlusIndex;
};
