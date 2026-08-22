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

export const enableExWeapon = (ascension: Ascension) => {
  const currentIndex = Ascension.indexOf(ascension);

  return currentIndex <= Ascension.indexOf('Mythic+');
};

const weaponLimits: Partial<Record<Ascension, string>> = {
  'Mythic+': '+10',
  'Supreme': '+15',
  'Supreme+': '+25',
  'Paragon 1': '+30',
  'Paragon 2': '+35',
  'Paragon 3': '+40',
  'Paragon 4': '+45',
} as const;

const limitExWeapon = (ascension: Ascension): string | false => weaponLimits[ascension] ?? false;

export const forceExWeapon = (exWeapon: ExWeapon, ascension: Ascension) => {

  if (!compareStrings(ascension, 'Crown')) {
    const minEx = limitExWeapon('Supreme+')
    const currentOrMin = Math.max(...[minEx, exWeapon].map(Number));

    return `+${currentOrMin}` as const;
  }

  const maxEx = limitExWeapon(ascension);

  if (!compareStrings(exWeapon, 'None') || !maxEx) {
    return exWeapon;
  }

  const currentOrMax = Math.min(...[maxEx, exWeapon].map(Number));

  return `+${currentOrMax}` as const;
};

export const filterExWeapons = (exWeapon: ExWeapon, ascension: Ascension) => {
  const isNone = !compareStrings(exWeapon, 'None');
  const needsFilter = Object.hasOwn(weaponLimits, ascension)

  if ((!needsFilter) || isNone) {
    return true;
  }

  const [maxEx, exNumber] = [limitExWeapon(ascension), exWeapon].map(Number);

  if (ascension === 'Crown') {
    return exNumber >= 25
  }

  return exNumber <= maxEx;
};

export const getSrc = (src: ExWeapon) => {
  const srcAsNumber = Number(src)
  if(srcAsNumber >= 30) {
    return `R${(srcAsNumber - 25) / 5}`
  }

  return src
}
