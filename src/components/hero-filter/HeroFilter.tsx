import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

import FilterCategory from '@/components/hero-filter/FilterCategory';
import Text from '@/components/inputs/text/Text';
import { Damage, Faction, HeroClass, Tier } from '@/utils/types';
import { joinStrings } from '@/utils/utils';

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
  className?: string;
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
  className,
}) => (
  <div className={joinStrings('flex w-full flex-row flex-wrap gap-2', className)}>
    <div className="inset-black flex flex-col gap-2 p-2 h-full items-center justify-center">
      <FilterCategory items={HeroClass} filter={filterClass} setFilter={setFilterClass} path="class" />
      <FilterCategory items={Faction} filter={filterFaction} setFilter={setFilterFaction} path="factions" />
    </div>
    {(setFilterTier || setFilterDamage) && (
      <div className="inset-black flex flex-col gap-2 p-2 h-full items-center justify-center">
        {setFilterTier && <FilterCategory items={Tier} filter={filterTier} setFilter={setFilterTier} path="tier" />}
        {setFilterDamage && (
          <FilterCategory items={Damage} filter={filterDamage} setFilter={setFilterDamage} path="damage" />
        )}
      </div>
    )}
    <div className="flex grow inset-black">
      <Text label="Search" setState={setFilterSearch} placeholder="Name/Faction/Class" value={filterSearch}>
        {children}
      </Text>
    </div>
  </div>
);

export default HeroFilter;
