import type { Damage, Faction, Tier, UnitClass } from '@/utils/types';

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
  UnitJob: UnitClass;
  UnitRarity: Tier | undefined;
  DisplayName: string;
  StartMP: number;
};

export type HeroSkillArgs = Record<`${'SArg' | 'PlusRatio'}${number}`, number>;

export type HeroSkillLevel = {
  DisplayLevel?: number;
  UnlockLevel?: number;
  Description: string;
  Args: HeroSkillArgs;
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
