import type { FilterRecord } from '@/components/hero-filter/types';
import type { HeroAPIData } from '@/utils/hero-data/types';

import { Aliases } from '@/components/hero-filter/types';
import { testRegExp } from '@/utils/utils';

export const filterHero = (
  { hero, heroClass, damage, faction, tier }: HeroAPIData,
  { regexClass, regexDamage, regexFaction, regexTier, regexSearch }: FilterRecord,
) => {
  console.log(
    hero, heroClass, damage, faction, tier
  )
  console.log(regexClass, regexDamage, regexFaction, regexTier, regexSearch)
  const aliases = Aliases[hero as keyof typeof Aliases] || [];
  const matchesClass = !heroClass || testRegExp(heroClass.class, regexClass);
  const matchesDamage = !damage || testRegExp(damage.damage, regexDamage);
  const matchesFaction = !faction || testRegExp(faction.faction, regexFaction);
  const matchesTier = !tier || testRegExp(tier.tier, regexTier);
  const validSearch = testRegExp([faction, heroClass, tier, damage, hero, ...aliases].join(' '), regexSearch);

  return {
    matchesClass,
    matchesDamage,
    matchesFaction,
    matchesTier,
    validSearch,
  };
};
