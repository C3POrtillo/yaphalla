import type { ExWeapon } from '@/components/ascension-card/types';

import { WeaponLimits } from '@/components/ascension-card/types';
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

const limitExWeapon = (ascension: Ascension): string | false => WeaponLimits[ascension] ?? false;

export const forceExWeapon = (exWeapon: ExWeapon, ascension: Ascension) => {
  const isNone = !compareStrings(exWeapon, 'None')

  if (!isNone && !compareStrings(ascension, 'Crown')) {
    const minEx = limitExWeapon('Supreme+')
    const currentOrMin = Math.max(...[minEx, exWeapon].map(Number));

    return `+${currentOrMin}` as const;
  }

  const maxEx = limitExWeapon(ascension);

  if (isNone || !maxEx) {
    return exWeapon;
  }

  const currentOrMax = Math.min(...[maxEx, exWeapon].map(Number));

  return `+${currentOrMax}` as const;
};

export const filterExWeapons = (exWeapon: ExWeapon, ascension: Ascension) => {
  const isNone = !compareStrings(exWeapon, 'None');
  const needsFilter = Object.hasOwn(WeaponLimits, ascension)

  if ((!needsFilter) || isNone) {
    return true;
  }

  const [exLimit, exNumber] = [limitExWeapon(ascension), exWeapon].map(Number);

  if (ascension === 'Crown') {
    return exNumber >= exLimit
  }

  return exNumber <= exLimit;
};

export const getSrc = (src: ExWeapon) => {
  const srcAsNumber = Number(src)
  if(srcAsNumber >= 30) {
    return `R${(srcAsNumber - 25) / 5}`
  }

  return src
}
