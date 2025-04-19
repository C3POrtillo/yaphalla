import { capitalize } from 'lodash';

import type { ReactNode } from 'react';

import { UnitOverride } from '@/utils/pathsHeroes';
import { Damage, Faction, Tier, UnitClass, UnitSet } from '@/utils/types';
import { cleanString } from '@/utils/utils';

const getDetailPath = (src: string) => {
  if (Damage.includes(src as Damage)) {
    return 'damage';
  }
  if (Faction.includes(src as Faction)) {
    return 'factions';
  }
  if (Tier.includes(src as Tier)) {
    return 'tier';
  }
  if (UnitClass.includes(src as UnitClass)) {
    return 'class';
  }
};

const correctSrc = (src: string) => {
  switch (src) {
    case 'Marksmen':
      return 'Marksman';
    default:
      return src;
  }
};

export const getDetailSrc = (src: string) => {
  const correctedSrc = correctSrc(src);
  const path = getDetailPath(correctedSrc);

  return `/assets/images/${path}/${correctedSrc.toLocaleLowerCase()}.png`;
};

export const mergeTokens = (tokens: (string | ReactNode)[]) =>
  tokens.reduce<(string | ReactNode)[]>((acc, token) => {
    if (typeof token === 'string') {
      const last = acc[acc.length - 1];
      if (typeof last === 'string') {
        acc[acc.length - 1] = `${last} ${token}`;
      } else {
        acc.push(' ');
        acc.push(token);
      }
    } else {
      acc.push(' ');
      acc.push(token);
    }

    return acc;
  }, []);

export const cleanToken = (token: string) => {
  const capitalizedToken = capitalize(cleanString(token));
  if (UnitSet.has(capitalizedToken)) {
    return capitalizedToken;
  }
  const noPluralToken = capitalizedToken.slice(0, -1);
  if (UnitSet.has(noPluralToken)) {
    return noPluralToken;
  }

  if (UnitOverride[capitalizedToken]) {
    return capitalizedToken;
  }

  return undefined;
};
