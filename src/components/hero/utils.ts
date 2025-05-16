import { capitalize } from 'lodash';

import type { HeroDetailProps } from '@/components/hero/HeroDetail';
import type { HeroJSON, HeroSkillArgs } from '@/components/hero/types';
import type { InputSizeTypes } from '@/utils/siteTypes';
import type { ReactNode } from 'react';

import { IconMap } from '@/components/hero/types';
import { UnitOverride, heroes } from '@/utils/pathsHeroes';
import { Damage, Faction, HeroClass, HeroSet, Tier } from '@/utils/types';
import { cleanString } from '@/utils/utils';

export const getDetailIconSize = (size: InputSizeTypes) => {
  switch (size) {
    case 'sm':
      return 'size-5';
    default:
      return 'size-8';
  }
};

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
  if (HeroClass.includes(src as HeroClass)) {
    return 'class';
  }

  return 'misc';
};
const skillStatRegExp = /<([A-Za-z]+)>/;
const sArgRegExp = /\{(SArg\d+|PlusRatio)(%)?\}(s)?([^\w\s%])?/;
const labelRegExp = /\[\w+](.*?)\[\/]/;

export const mergeLabeledTokens = (tokens: string[]): string[] => {
  const merged: string[] = [];
  let buffer: string[] = [];

  tokens.forEach(token => {
    buffer.push(token);
    const joined = buffer.join(' ');

    const isIncompleteSprite = (str: string) => str.startsWith('<sprite') && !str.includes('>');

    if (labelRegExp.test(joined)) {
      merged.push(joined);
      buffer = [];

      return;
    }

    if (/^\[[^\]]+]/.test(joined) && !/\[\/]/.test(joined)) {
      return;
    }

    if (isIncompleteSprite(joined)) {
      return;
    }

    if (/^<sprite.*?>/.test(joined)) {
      merged.push(joined);
      buffer = [];

      return;
    }

    if (buffer.length > 1) {
      merged.push(...buffer);
      buffer = [];
    } else {
      merged.push(...buffer);
      buffer = [];
    }
  });

  if (buffer.length) {
    merged.push(...buffer);
  }

  return merged;
};

export const parseSkillToken = (token: string): string | { name?: string; value?: string; icon?: string } => {
  const skillMatch = token.match(skillStatRegExp);
  const sArgMatch = token.match(sArgRegExp);

  if (skillMatch || sArgMatch) {
    return {
      name: skillMatch?.[0],
      value: sArgMatch?.[0],
    };
  }

  const labelMatch = token.match(labelRegExp);
  if (labelMatch) {
    return labelMatch[1];
  }

  if (IconMap[`${token.split('>')[0]}>` as keyof typeof IconMap]) {
    return {
      icon: IconMap[`${token.split('>')[0]}>` as keyof typeof IconMap],
    };
  }

  return token;
};

export const getSkillStatValue = (value: string, args: HeroSkillArgs) => {
  const match = value.match(sArgRegExp);
  if (match) {
    const hasPercent = !!match[2];
    const hasS = match[3] || '';
    const hasTrail = match[4] || '';
    const arg = args[match[1] as `SArg${number}`];
    const percentValue = hasPercent ? `${(Math.abs(arg) * 100).toFixed(0)}%` : `${arg}${hasS}`;
    const formattedValue = `${percentValue}${hasTrail}`;

    return value.replace(sArgRegExp, formattedValue);
  }

  return value;
};

export const correctSrc = (src: string) => {
  const match = src.match(skillStatRegExp);
  if (match) {
    return match[1];
  }
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
        acc[acc.length - 1] = `${last} ${token}`.replace(/\s/, ' ');
      } else {
        acc.push(token);
      }
    } else {
      acc.push(token);
    }

    return acc;
  }, []);

export const cleanToken = (token: string) => {
  const capitalizedToken = capitalize(cleanString(token));
  if (HeroSet.has(capitalizedToken)) {
    return capitalizedToken;
  }
  const noPluralToken = capitalizedToken.slice(0, -1);
  if (HeroSet.has(noPluralToken)) {
    return noPluralToken;
  }

  if (UnitOverride[capitalizedToken]) {
    return capitalizedToken;
  }

  return undefined;
};

export const getBaseUnlock = (slot: number, level: number) => {
  switch (slot) {
    case 4:
      return {
        baseUnlock: 'Legendary+',
        classUnlock: 'text-legendary-400',
      };
    case 5:
      return {
        baseUnlock: 'Mythic+',
        classUnlock: 'text-mythic-400',
      };
    case 6:
      return {
        baseUnlock: 'Supreme+',
        classUnlock: 'text-supreme-400',
      };
    default:
      return {
        baseUnlock: `Level ${level}`,
        classUnlock: 'text-white',
      };
  }
};

const formatLevelUnlock = (text: string) => `Unlocks at ${text}`;

export const getLevelUnlock = (slot: number, display: number, unlock: number | undefined) => {
  const displayText = `Level ${display}`;
  let unlockText: string;
  switch (slot) {
    case 4:
    case 6:
      return displayText;
    case 5:
      unlockText = formatLevelUnlock(`EX. +${(display - 1) * 5}`);
      break;
    default:
      unlockText = formatLevelUnlock(`Level ${unlock}`);
  }

  return `${displayText} | ${unlockText}`;
};

const { AFKJ_API, AFKJ_API_KEY } = process.env;
export const getAllHeroDetails = async () =>
  (
    await Promise.all(
      heroes.map(async ({ label }) => {
        try {
          const apiURL = `${AFKJ_API}${label}`;
          const res = await fetch(apiURL, {
            headers: {
              Authorization: `Bearer ${AFKJ_API_KEY}`,
            },
          });
          const { Info } = (await res.json()) as HeroJSON;
          const { DamageType, UnitRace, UnitJob, UnitRarity = 'R' } = Info;

          return { hero: label, heroClass: UnitJob, faction: UnitRace, tier: UnitRarity, damage: DamageType };
        } catch {
          return null;
        }
      }),
    )
  ).filter(Boolean) as HeroDetailProps[];
