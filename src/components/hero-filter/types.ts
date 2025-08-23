import type { Damage, Faction, HeroClass, Tier } from '@/utils/types';

export type FilterPaths = 'class' | 'factions' | 'tier' | 'damage';
export type FilterValues = HeroClass | Faction | Tier | Damage;

const twins = ['twins'];
const phraesto = ['pesto'];
const hamster = ['hamster'];
const dog = ['dog', 'good', 'boi', 'wolf'];
const zanie = ['zanie', 'laser', 'lazer', 'turret'];

export const Aliases = {
  Alsa: ['salsa'],
  Bryon: ['byron'],
  Chippy: hamster,
  Damian: ['damien'],
  Dunlingr: ['dung', 'duolingo', 'dungbeetle'],
  Faramor: dog,
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
  Shakir: dog,
  Talene: ['kfc', 'fried', 'chicken'],
  Zandrok: ['horse'],
  Zanie: zanie,
  'Zanie Turret': zanie,
} as const;

type Filter = RegExp | undefined | false;

export type FilterRecord = {
  regexClass?: Filter;
  regexDamage?: Filter;
  regexFaction?: Filter;
  regexTier?: Filter;
  regexSearch?: Filter;
};
