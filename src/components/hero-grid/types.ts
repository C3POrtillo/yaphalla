import type { Hero } from '@/utils/types';

export type UnitDivData = {
  tiles: Hero[];
  offset?: string;
};

export const DisplayOverride = {
  'Zanie Turret': {
    heroClass: 'Warrior',
    name: 'Laser Turret',
  },
} as const;
