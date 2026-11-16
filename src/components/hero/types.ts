import type { Damage, Faction, HeroClass, Tier } from '@/utils/types';

type HeroInfo = {
  ID: number;
  Name: string;
  DamageType: Damage;
  DisplayTitle: string;
  IsMelee: boolean;
  IconSquare: string;
  TargetShapeArgs: number;
  Description: string;
  UnitRace: Faction;
  Gender: 'male' | 'female';
  UltIconSquare: string;
  UnitJob: HeroClass;
  UnitRarity: Tier | undefined;
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

export type HeroDetailPaths = 'factions' | 'class' | 'damage' | 'tier' | undefined;

export const IconMap = {
  '<sprite name="spui_oldgod_icon_1">': 'dunglingr/spellbind',
  '<sprite name="spui_oldgod_icon_2">': 'dunglingr/curelock',
  '<sprite name="spui_ntd_icon_1">': 'natsu/lightning',
  '<sprite name="spui_ntd_icon_2">': 'natsu/fire',
} as const;

export const RavagedRealmMap = {
  Aurora: 'Lightbearer',
  Dauntless: 'Mauler',
  Immortal: 'Graveborn',
  Sylvan: 'Wilder',
} as const;

export const PhantimalSkillUnlocks = {
  1: {
    2: 20,
    3: 40,
  },
  2: {
    2: 10,
    3: 30,
  },
  3: {
    1: 50,
    2: 60,
    3: 70,
    4: 100,
  },
  4: {
    1: 80,
    2: 90,
  },
  5: {
    1: 110,
    2: 120,
  },
} as Record<number, Record<number, number>>;
