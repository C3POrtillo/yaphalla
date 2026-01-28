import type { ALL_DAMAGE_QUERYResult, ALL_TIER_QUERYResult, Class, Damage, Faction, Tier } from '@/sanity/types';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';

import { encodeIndex, hashHeroName, toBase62 } from '@/utils/utils';

// export const HeroesById = Object.fromEntries(
//   SortedHeroes.map(({ hero, faction, heroClass }) => {
//     const prefix =
//       encodeIndex(Faction.indexOf(faction as Faction)) + encodeIndex(HeroClass.indexOf(heroClass as HeroClass));
//     const nameHash = toBase62(hashHeroName(hero)).slice(0, 3);

//     return [hero, `${prefix}${nameHash}`];
//   }),
// );

// export const IdsByHero = Object.fromEntries(Object.entries(HeroesById).map(([hero, id]) => [id, hero]));

export const ClassOrder = ['tank', 'support', 'marksman', 'mage', 'rogue', 'warrior'] as const;
export const FactionOrder = [
  'lightbearer',
  'wilder',
  'mauler',
  'graveborn',
  'celestial',
  'hypogean',
  'celestial-hypogean',
  'dimensional',
] as const;
export const DamageOrder = ['physical', 'magic'] as const;
export const TierOrder = ['s', 'a', 'r'] as const;

export type ClassOrder = typeof ClassOrder;
export type FactionOrder = typeof FactionOrder;
export type DamageOrder = typeof DamageOrder;
export type TierOrder = typeof TierOrder;

type HeroInfo = {
  ID: number;
  Name: string;
  DamageType: ALL_DAMAGE_QUERYResult[number]['name'];
  DisplayTitle: string;
  IsMelee: boolean;
  IconSquare: string;
  TargetShapeArgs: number;
  Description: string;
  UnitRace: Faction;
  Gender: 'male' | 'female';
  UltIconSquare: string;
  UnitJob: Class;
  UnitRarity: ALL_TIER_QUERYResult[number]['name'] | undefined;
  DisplayName: string;
  StartMP: number;
};

export type HeroSkillArgs = Record<`${'SArg' | 'PlusRatio'}${number}` | 'KnockBack', number>;

export type HeroSkillLevel = {
  DisplayLevel?: number;
  UnlockLevel?: number;
  Description: string;
  Args: HeroSkillArgs;
  PlusArgs?: HeroSkillArgs;
};

export type HeroSkill = HeroSkillLevel & {
  Icon: string;
  DisplaySlot: number;
  Levels: HeroSkillLevel[];
  SimpleDescription: string;
  CD: number;
  InitCD: number;
  DisplayName: string;
  TargetShapeArgs: number;
};

export const SkillMap = ['Ultimate', 'Skill 1', 'Skill 2', 'Hero Focus', 'EX. Skill', 'Enhance Force'] as const;
export const Label = new Set([1, 2, 3, 5]);

export type HeroStory = {
  IsDefaultUnlock: boolean;
  StoryID: number;
  Story: string;
};

export type HeroJSON = {
  Info: HeroInfo;
  Skills: HeroSkill[];
  Story: HeroStory[];
};

export type HeroAPIData = {
  hero: string;
  displayName?: string;
  title?: string;
  description?: string;
  gender?: 'male' | 'female';
  initialEnergy?: number;
  heroClass?: Class | null;
  faction?: Faction | null;
  tier?: Tier | null;
  damage?: Damage | null;
  hex?: SanityAsset;
  portrait?: string | null;
  skills?: HeroSkill[];
  story?: HeroStory[];
};

export const IconMap = {
  '<sprite name="spui_oldgod_icon_1">': 'dung/spellbind',
  '<sprite name="spui_oldgod_icon_2">': 'dung/curelock',
  '<sprite name="spui_ntd_icon_1">': 'natsu/lightning',
  '<sprite name="spui_ntd_icon_2">': 'natsu/fire',
} as const;

export const RavagedRealmMap = {
  Aurora: 'Lightbearer',
  Dauntless: 'Mauler',
  Immortal: 'Graveborn',
  Sylvan: 'Wilder',
} as const;
