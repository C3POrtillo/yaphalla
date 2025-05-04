import type { Damage, Faction, HeroClass, Tier } from '@/utils/types';

export type FilterPaths = 'class' | 'factions' | 'tier' | 'damage';
export type FilterValues = HeroClass | Faction | Tier | Damage;

const twins = ['twins'];
const phraesto = ['pesto'];
const hamster = ['hamster'];

export const Aliases = {
  Alsa: ['salsa'],
  Chippy: hamster,
  Damian: ['damien'],
  Dunlingr: ['dung', 'duolingo', 'dungbeetle'],
  Hammie: hamster,
  Harak: ['sharkboy', 'shark'],
  Hodgkin: ['speedo', 'hodge'],
  Elijah: twins,
  'Elijah & Lailah': twins,
  Lailah: twins,
  'Lily May': ['lm'],
  Phraesto: phraesto,
  'Phraesto Clone': phraesto,
  Salazer: ['salezar'],
  Talene: ['kfc', 'fried', 'chicken']
} as const;
