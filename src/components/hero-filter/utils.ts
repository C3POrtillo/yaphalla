import type { FilterRecord } from '@/components/hero-filter/types';
import type { Hero } from '@/utils/types';

import { Aliases } from '@/components/hero-filter/types';
import { testRegExp } from '@/utils/utils';

export const filterHero = (
  { hero, heroClass, damage, faction, tier }: Hero,
  { regexClass, regexDamage, regexFaction, regexTier, regexSearch }: FilterRecord,
) => {
  const aliases = Aliases[hero as keyof typeof Aliases] || [];
  const matchesClass = !heroClass || testRegExp(heroClass, regexClass);
  const matchesDamage = !damage || testRegExp(damage, regexDamage);
  const matchesFaction = !faction || testRegExp(faction, regexFaction);
  const matchesTier = !tier || testRegExp(tier, regexTier);
  const validSearch = testRegExp([faction, heroClass, tier, damage, hero, ...aliases].join(' '), regexSearch);

  return {
    matchesClass,
    matchesDamage,
    matchesFaction,
    matchesTier,
    validSearch,
  };
};
