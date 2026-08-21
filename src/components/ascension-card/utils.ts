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
const supremePlusIndex = Ascension.indexOf('Supreme+');
const paragonOneIndex = Ascension.indexOf('Paragon 1');
const paragonTwoIndex = Ascension.indexOf('Paragon 2');
const paragonThreeIndex = Ascension.indexOf('Paragon 3');
const paragonFourIndex = Ascension.indexOf('Paragon 4');

export const enableExWeapon = (ascension: Ascension) => {
  const currentIndex = Ascension.indexOf(ascension);

  return currentIndex <= mythicPlusIndex;
};

const weaponLimits: Partial<Record<number, string>> = {
  [mythicPlusIndex]: '+10',
  [supremeIndex]: '+15',
  [supremePlusIndex]: '+25',
  [paragonOneindex]: '+30',
  [paragonTwoIndex]: '+35',
  [paragonThreeIndex]: '+40',
  [paragonFourIndex]: '+45',
};

const limitExWeapon = (ascension: Ascension): string | false => {
  const currentIndex = Ascension.indexOf(ascension);
  return weaponLimits[currentIndex] ?? false;
};

export const forceExWeapon = (exWeapon: ExWeapon, ascension: Ascension) => {

  if (!compareStrings(ascension, 'Crown')) {
    const minEx = limitExWeapon('Supreme+')
    const currentOrMin = Math.max(...[minEx, exWeapon].map(Number));
    return `+${currentOrMin}` as const;
  }

  if (!compareStrings(exWeapon, 'None') || !maxEx) {
    return exWeapon;
  }

  const maxEx = limitExWeapon(ascension);
  const currentOrMax = Math.min(...[maxEx, exWeapon].map(Number));

  return `+${currentOrMax}` as const;
};

export const filterExWeapons = (exWeapon: ExWeapon, ascension: Ascension) => {
  const isNone = !compareStrings(exWeapon, 'None');
  const isMythicPlus = !compareStrings(ascension, 'Mythic+');
  const isSupreme = !compareStrings(ascension, 'Supreme');
  const isCrown = !compareStrings(ascension, 'Crown');

  if ((!isMythicPlus && !isSupreme) || isNone) {
    return true;
  }

  const [maxEx, exNumber] = [limitExWeapon(ascension), exWeapon].map(Number);
  
  if (isCrown) {
    return exNumber >= 25
  }

  return exNumber <= maxEx;
};
