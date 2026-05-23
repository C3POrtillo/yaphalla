import { capitalize } from 'lodash';

import type { HeroDetailProps } from '@/components/hero/HeroDetail';
import type { HeroJSON, HeroSkillArgs } from '@/components/hero/types';
import type { InputSizeTypes } from '@/utils/siteTypes';
import type { ReactNode } from 'react';

import { IconMap, RavagedRealmMap } from '@/components/hero/types';
import { BossPaths, HeroPaths, UnitOverride } from '@/utils/pathsHeroes';
import { Damage, Difficulties, Faction, HeroClass, HeroSet, Tier, UnitsByClass, UnitsByFaction } from '@/utils/types';
import { cleanString, compareStrings } from '@/utils/utils';

export const getDetailIconSize = (size: InputSizeTypes) => {
  switch (size) {
    case 'sm':
      return 'size-5';
    default:
      return 'size-8';
  }
};

const getDetailPath = (src: string) => {
  if (Difficulties.includes(src as Difficulties)) {
    return 'difficulty';
  }
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

export const joinTokens = (...tokens: (string | boolean)[]) => tokens.filter(Boolean).join('');

const skillStatRegExp = /<([A-Za-z]+)>/;
const sArgRegExp = /\{(SArg\d+|PlusRatio|KnockBack)(%)?\}(s(?:[^\w\s%])?|[^\w\s%])?/;
const labelRegExp = /\[\w+](.*?)\[\/]/;

export const mergeLabeledTokens = (tokens: string[]): string[] => {
  const merged: string[] = [];
  let buffer: string[] = [];
  const formattedTokens = tokens.reduce<string[]>((acc, token) => {
    const lines = token.split(/\r?\n/);
    lines.forEach((line, i) => {
      acc.push(line.trim());
      if (i < lines.length - 1) {
        acc.push('\n');
      }
    });

    return acc;
  }, []);

  formattedTokens.forEach(token => {
    buffer.push(token);
    const joined = buffer.join(' ');

    const isIncompleteSprite = (str: string) => /^\n?"?<sprite/.test(str) && !str.includes('>');

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

    if (/^\n?"?<sprite(.*)?>/.test(joined)) {
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

  let iconSprite = token.match(/^"?<sprite[^>]*>/)?.[0] ?? '';
  iconSprite = iconSprite.replace(/^"/, '');
  if (IconMap[iconSprite as keyof typeof IconMap]) {
    const value = token.match(/>(.*?)(?:"?$)/)?.[1] ?? '';

    return {
      icon: IconMap[iconSprite as keyof typeof IconMap],
      value,
    };
  }

  return token;
};

export const getSkillStatValue = (value: string, args: HeroSkillArgs) => {
  const match = value.match(sArgRegExp);
  if (match) {
    const arg = args[match[1] as keyof HeroSkillArgs];
    if (!arg) {
      return null;
    }
    const hasPercent = !!match[2];
    const hasTrail = match[3] || '';

    const percentValue = hasPercent ? `${(Math.abs(arg) * 100).toFixed(0)}%` : arg;
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
  const ravagedRealmFaction = RavagedRealmMap[src as keyof typeof RavagedRealmMap];
  if (ravagedRealmFaction) {
    return ravagedRealmFaction;
  }
  switch (src) {
    case 'Marksmen':
      return 'Marksman';
    default:
      return src;
  }
};

export const getDetailSrc = (src: string) => {
  if (!src) {
    return null;
  }
  const correctedSrc = correctSrc(src);
  const path = getDetailPath(correctedSrc);

  return `/assets/images/${path}/${correctedSrc.toLocaleLowerCase()}.png`;
};

export const mergeTokens = (tokens: (string | ReactNode)[]) =>
  tokens.reduce<(string | ReactNode)[]>((acc, token) => {
    if (typeof token === 'string') {
      const last = acc[acc.length - 1];
      if (typeof last === 'string') {
        acc[acc.length - 1] = `${last} ${token}`.replaceAll(/\n\s+/g, '\n');
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

export const getLevelUnlock = (slot: number, display: number, unlock: number | undefined, isNPC = false) => {
  const displayText = `Level ${display}`;
  if (isNPC) {
    return displayText;
  }
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
const apiHeader = {
  headers: {
    Authorization: `Bearer ${AFKJ_API_KEY}`,
  },
};
const fetchAPI = async (string: string) => await fetch(`${AFKJ_API}${string}`, apiHeader);

export const getHeroAllDetails = async (hero: string) => {
  if (!hero) {
    return null;
  }
  const res = await fetchAPI(hero);

  if (res.status !== 200) {
    return null;
  }
  const { Info, Story, Skills } = (await res.json()) as HeroJSON;

  return { Info, Story, Skills };
};

const getHeroMiniDetails = async (hero: string, isNPC = false) => {
  try {
    const res = await fetchAPI(hero);
    const { Info } = (await res.json()) as HeroJSON;
    const { DamageType, UnitRace, UnitJob, UnitRarity = isNPC ? null : 'R' } = Info;

    return {
      hero,
      tier: UnitRarity,
      heroClass: !compareStrings(UnitJob.toLowerCase(), 'marksmen') ? 'Marksman' : UnitJob,
      faction: UnitRace,
      damage: DamageType,
    };
  } catch {
    return null;
  }
};

const pathMap = {
  heroes: HeroPaths,
  bosses: BossPaths,
} as const;

export const getAllHeroMiniDetails = async (path: keyof typeof pathMap = 'heroes') =>
  (
    await Promise.all(
      pathMap[path].map(async ({ label }) => getHeroMiniDetails(label, !!compareStrings(path, 'heroes'))),
    )
  ).filter(Boolean) as HeroDetailProps[];

const imagePath = 'yaphalla.com/assets/images/';

export const formatApiData = async (hero: string, id: string) => {
  const heroData = await getHeroAllDetails(hero);
  const faction = UnitsByFaction[hero];
  const heroClass = UnitsByClass[hero];
  const staticData = {
    id,
    faction,
    class: heroClass,
    name: hero,
  };
  const images = {
    hexImage: `yaphalla.com/assets/images/hexes/unit/${hero}.png`,
    portraitImage: `yaphalla.com/assets/images/portraits/${hero}.png`,
    factionImage: `${imagePath}factions/${faction.toLocaleLowerCase()}.png`,
    classImage: `${imagePath}class/${heroClass.toLocaleLowerCase()}.png`,
  };
  if (!heroData) {
    return [hero, { ...staticData, ...images }];
  }

  const { DamageType, DisplayTitle, Description, UnitRarity = 'R' } = heroData.Info;

  return [
    hero,
    {
      ...staticData,
      title: DisplayTitle,
      description: Description,
      tier: UnitRarity,
      damageType: DamageType,
      ...images,
      tierImage: `yaphalla.com/assets/images/tier/${UnitRarity.toLocaleLowerCase()}.png`,
      damageTypeImage: `yaphalla.com/assets/images/damage/${DamageType.toLocaleLowerCase()}.png`,
    },
  ];
};
