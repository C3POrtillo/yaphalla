import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';

import Text from '@/components/inputs/text/Text';
import Toggle from '@/components/inputs/toggle/Toggle';
import FilterGroup from '@/components/unit-grid/FilterGroup';
import { Faction, UnitClass } from '@/utils/types';
import { compareStrings, joinStrings } from '@/utils/utils';

interface UnitGridProps {
  filterFaction: Faction | undefined;
  setFilterFaction: Dispatch<SetStateAction<Faction | undefined>>;
  filterClass: UnitClass | undefined;
  setFilterClass: Dispatch<SetStateAction<UnitClass | undefined>>;
  searchFilter: string;
  setSearchFilter: Dispatch<SetStateAction<string>>;
  variant: 'unit' | 'class';
  setVariant: Dispatch<SetStateAction<'unit' | 'class'>>;
  unitHexes: ReactNode;
  disabled?: boolean;
}

const UnitGridContainer: FC<UnitGridProps> = ({
  filterFaction,
  setFilterFaction,
  filterClass,
  setFilterClass,
  searchFilter,
  setSearchFilter,
  variant,
  setVariant,
  unitHexes,
  disabled,
}) => (
  <div className="container-primary w-full flex flex-col gap-2 p-2 sm:w-min">
    <div className="flex w-full flex-row gap-2 items-end">
      <div className="inset-secondary flex flex-col gap-2 p-2">
        <FilterGroup items={UnitClass} filter={filterClass} setFilter={setFilterClass} path="class" />
        <FilterGroup items={Faction} filter={filterFaction} setFilter={setFilterFaction} path="factions" />
      </div>
      <Text label="Search" setState={setSearchFilter} placeholder="Name/Faction/Class" value={searchFilter}>
        <Toggle
          variant="switch"
          disableLabel="Other"
          value="Units"
          onChange={e => {
            setVariant(e.target.checked ? 'unit' : 'class');
          }}
          defaultChecked={compareStrings(variant, 'unit') === 0}
        />
      </Text>
    </div>
    <div className="relative flex size-full flex-row justify-center">
      <div className="z-10 flex flex-col p-4 pt-8">{unitHexes}</div>
      <div className={joinStrings('inset-secondary absolute top-0 size-full', disabled && 'z-10 opacity-40')} />
    </div>
  </div>
);

export default UnitGridContainer;
