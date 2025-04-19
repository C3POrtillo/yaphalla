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

type HeroSkillArgs = Record<`SArg${number}`, number>;

type HeroSkillLevel = {
  DisplayLevel: 2;
  UnlockLevel: 51;
  Description: 'Increases the damage dealt by Vigorous Slam to <ATK>{SArg0%}.';
  Args: HeroSkillArgs;
};

type HeroSkill = {
  Icon: string;
  DisplaySlot: number;
  Levels: HeroSkillLevel[];
  UnlockLevel: 1;
  SimpleDescription: string;
  Description: string;
  Args: HeroSkillArgs;
  CD: number;
  InitCD: number;
  DisplayName: string;
  TargetShapeArgs: number;
};

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
