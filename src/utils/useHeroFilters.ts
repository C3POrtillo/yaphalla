import { useEffect, useMemo, useState } from 'react';

import type {
  ALL_CLASS_QUERYResult,
  ALL_DAMAGE_QUERYResult,
  ALL_FACTION_QUERYResult,
  ALL_TIER_QUERYResult,
} from '@/sanity/types';
import type { ClassOrder, DamageOrder, FactionOrder, TierOrder } from '@/utils/hero-data/types';
import type { Dispatch, SetStateAction } from 'react';

import { getAllClasses, getAllDamages, getAllFactions, getAllTiers } from '@/sanity/client';
import { cleanString } from '@/utils/utils';

export type Filters = {
  regexClass: RegExp | undefined;
  regexFaction: RegExp | undefined;
  regexTier: RegExp | undefined;
  regexDamage: RegExp | undefined;
  regexSearch: RegExp | false;
};

export type FilterCategories = Record<
  'class' | 'faction' | 'damage' | 'tier' | 'search',
  {
    items?: ALL_CLASS_QUERYResult | ALL_FACTION_QUERYResult | ALL_TIER_QUERYResult | ALL_DAMAGE_QUERYResult;
    filter?: string;
    setFilter?:
      | Dispatch<SetStateAction<string>>
      | Dispatch<SetStateAction<ClassOrder[number] | undefined>>
      | Dispatch<SetStateAction<FactionOrder[number] | undefined>>
      | Dispatch<SetStateAction<TierOrder[number] | undefined>>
      | Dispatch<SetStateAction<DamageOrder[number] | undefined>>;
  }
>;

export type Options = {
  allClasses: ALL_CLASS_QUERYResult;
  allFactions: ALL_FACTION_QUERYResult;
  allTiers?: ALL_TIER_QUERYResult;
  allDamages?: ALL_DAMAGE_QUERYResult;
};

const useHeroFilters = (options: Options) => {
  const { allClasses, allDamages, allFactions, allTiers } = options;
  const [filterClass, setFilterClass] = useState<ClassOrder[number]>();
  const [filterFaction, setFilterFaction] = useState<FactionOrder[number]>();
  const [filterTier, setFilterTier] = useState<TierOrder[number]>();
  const [filterDamage, setFilterDamage] = useState<DamageOrder[number]>();
  const [filterSearch, setFilterSearch] = useState<string>('');

  const regexClass = useMemo(() => filterClass && new RegExp(cleanString(filterClass), 'i'), [filterClass]);
  const regexFaction = useMemo(() => filterFaction && new RegExp(cleanString(filterFaction), 'i'), [filterFaction]);
  const regexTier = useMemo(() => filterTier && new RegExp(cleanString(filterTier), 'i'), [filterTier]);
  const regexDamage = useMemo(() => filterDamage && new RegExp(cleanString(filterDamage), 'i'), [filterDamage]);
  const regexSearch = useMemo(() => !!filterSearch && new RegExp(cleanString(filterSearch), 'i'), [filterSearch]);

  const categories = useMemo(() => ({
    class: {
      items: allClasses,
      filter: filterClass,
      setFilter: setFilterClass,
    },
    faction: {
      items: allFactions,
      filter: filterFaction,
      setFilter: setFilterFaction,
    },
    damage: {
      items: allDamages,
      filter: filterDamage,
      setFilter: setFilterDamage,
    },
    tier: {
      items: allTiers,
      filter: filterDamage,
      setFilter: setFilterTier,
    },
    search: {
      items: undefined,
      filter: filterSearch,
      setFilter: setFilterSearch,
    },
  }), [filterClass, filterDamage, filterFaction, filterTier, filterSearch]);

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
    categories,
    filters,
  };
};

export default useHeroFilters;
