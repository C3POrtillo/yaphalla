import type { Damage, Faction, HeroClass, Tier } from '@/utils/types';

export type FilterPaths = 'class' | 'factions' | 'tier' | 'damage';
export type FilterValues = HeroClass | Faction | Tier | Damage;
