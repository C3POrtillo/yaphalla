import { useMemo, useState } from 'react';

import type { Damage, Faction, HeroClass, Tier } from '@/utils/types';

import { cleanString } from '@/utils/utils';

type Options = {
  allFilters?: boolean;
};

export type Filters = {
  regexClass: RegExp | undefined;
  regexDamage: RegExp | undefined;
  regexFaction: RegExp | undefined;
  regexTier: RegExp | undefined;
  regexSearch: RegExp | false;
};

const useHeroFilters = (options?: Options) => {
  const { allFilters } = options || {};
  const [filterClass, setFilterClass] = useState<HeroClass>();
  const [filterDamage, setFilterDamage] = useState<Damage>();
  const [filterFaction, setFilterFaction] = useState<Faction>();
  const [filterTier, setFilterTier] = useState<Tier>();
  const [filterSearch, setFilterSearch] = useState<string>('');

  const regexClass = useMemo(() => filterClass && new RegExp(cleanString(filterClass), 'i'), [filterClass]);
  const regexDamage = useMemo(() => filterDamage && new RegExp(cleanString(filterDamage), 'i'), [filterDamage]);
  const regexFaction = useMemo(() => filterFaction && new RegExp(cleanString(filterFaction), 'i'), [filterFaction]);
  const regexTier = useMemo(() => filterTier && new RegExp(cleanString(filterTier), 'i'), [filterTier]);
  const regexSearch = useMemo(() => !!filterSearch && new RegExp(cleanString(filterSearch), 'i'), [filterSearch]);

  const filters = useMemo(
    () => ({
      regexClass,
      regexDamage,
      regexFaction,
      regexTier,
      regexSearch,
    }),
    [regexClass, regexDamage, regexFaction, regexTier, regexSearch],
  );

  return {
    filterClass,
    setFilterClass,
    filterFaction,
    setFilterFaction,
    filterSearch,
    setFilterSearch,
    ...(allFilters && {
      filterDamage,
      setFilterDamage,
      filterTier,
      setFilterTier,
    }),
    filters,
  };
};

export default useHeroFilters;
