import type { ExWeapon } from '@/components/ascension-card/types';

import { Ascension } from '@/utils/types';
import { compareStrings } from '@/utils/utils';

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
const mythicPlusIndex = Ascension.indexOf('Mythic+');
const supremeIndex = Ascension.indexOf('Supreme');

export const enableExWeapon = (ascension: Ascension) => {
  const currentIndex = Ascension.indexOf(ascension);

  return currentIndex <= mythicPlusIndex;
};

const limitExWeapon = (ascension: Ascension) => {
  const currentIndex = Ascension.indexOf(ascension);
  if (currentIndex === mythicPlusIndex) {
    return '+10';
  }

  if (currentIndex === supremeIndex) {
    return '+15';
  }

  return false;
};

export const forceExWeapon = (exWeapon: ExWeapon, ascension: Ascension) => {
  if (!compareStrings(ascension, 'Crown')) {
    return '+25' as const;
  }

  const maxEx = limitExWeapon(ascension);
  if (!compareStrings(exWeapon, 'None') || !maxEx) {
    return exWeapon;
  }

  const minOrMax = Math.min(...[maxEx, exWeapon].map(Number));

  return `+${minOrMax}` as const;
};

export const filterExWeapons = (exWeapon: ExWeapon, ascension: Ascension) => {
  const isNone = !compareStrings(exWeapon, 'None');
  const isMythicPlus = !compareStrings(ascension, 'Mythic+');
  const isSupreme = !compareStrings(ascension, 'Supreme');
  if ((!isMythicPlus && !isSupreme) || isNone) {
    return true;
  }

  const [maxEx, exNumber] = [limitExWeapon(ascension), exWeapon].map(Number);
  
  return exNumber <= maxEx;
};
