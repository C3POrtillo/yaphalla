import { AllBossesSet, SortedHeroes } from '@/utils/types';

export const UnitOverride = {
  Smokey: 'Smokey & Meerky',
  Meerky: 'Meerky',
} as Record<string, string>;

export const HeroPairMap = {
  Phraesto: 'Phraesto',
  'Phraesto Clone': 'Phraesto',
  Elijah: 'Elijah & Lailah',
  Lailah: 'Elijah & Lailah',
  'Elijah & Lailah': 'Elijah & Lailah',
} as Record<string, string>;

export const HeroSet = (() => {
  const units = new Set<string>();
  SortedHeroes.forEach(({ hero: unit }) => {
    units.add(HeroPairMap[unit] ? HeroPairMap[unit] : unit);
  });

  return units;
})();

export const HeroPaths = Array.from(HeroSet, unit => ({
  label: unit,
  href: `/heroes/${encodeURIComponent(unit)}` as const,
}));

export const BossPaths = Array.from(AllBossesSet, unit => ({
  label: unit,
  href: `/bosses/${encodeURIComponent(unit)}` as const,
}));
