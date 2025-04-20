import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

import FilterCategory from '@/components/hero-filter/FilterCategory';
import Text from '@/components/inputs/text/Text';
import { Damage, Faction, HeroClass, Tier } from '@/utils/types';

interface HeroFilterProps extends PropsWithChildren {
  filterClass?: HeroClass;
  filterDamage?: Damage;
  filterFaction?: Faction;
  filterSearch: string;
  filterTier?: Tier;
  setFilterClass: Dispatch<SetStateAction<HeroClass | undefined>>;
  setFilterDamage?: Dispatch<SetStateAction<Damage | undefined>>;
  setFilterFaction: Dispatch<SetStateAction<Faction | undefined>>;
  setFilterSearch: Dispatch<SetStateAction<string>>;
  setFilterTier?: Dispatch<SetStateAction<Tier | undefined>>;
}

const HeroFilter: FC<HeroFilterProps> = ({
  filterClass,
  filterDamage,
  filterFaction,
  filterSearch,
  filterTier,
  setFilterClass,
  setFilterDamage,
  setFilterFaction,
  setFilterSearch,
  setFilterTier,
  children,
}) => (
  <div className="flex w-full flex-row gap-2 items-end">
    <div className="inset-secondary flex flex-col gap-2 p-2">
      <FilterCategory items={HeroClass} filter={filterClass} setFilter={setFilterClass} path="class" />
      <FilterCategory items={Faction} filter={filterFaction} setFilter={setFilterFaction} path="factions" />
      {setFilterTier && <FilterCategory items={Tier} filter={filterTier} setFilter={setFilterTier} path="tier" />}
      {setFilterDamage && (
        <FilterCategory items={Damage} filter={filterDamage} setFilter={setFilterDamage} path="damage" />
      )}
    </div>
    <Text label="Search" setState={setFilterSearch} placeholder="Name/Faction/Class" value={filterSearch}>
      {children}
    </Text>
  </div>
);

export default HeroFilter;
