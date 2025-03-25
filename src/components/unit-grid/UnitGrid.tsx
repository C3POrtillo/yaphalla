import type { UnitButtonProps } from '@/components/unit-grid/UnitButtons';
import type { Dispatch, FC, SetStateAction } from 'react';

import Text from '@/components/inputs/text/Text';
import Toggle from '@/components/inputs/toggle/Toggle';
import UnitButtons from '@/components/unit-grid/UnitButtons';
import UnitFilter from '@/components/unit-grid/UnitFilters';
import { Faction, UnitClass } from '@/utils/types';
import { compareStrings, joinStrings } from '@/utils/utils';

interface UnitGridProps extends UnitButtonProps {
  setFilterFaction: Dispatch<SetStateAction<Faction | undefined>>;
  setFilterClass: Dispatch<SetStateAction<UnitClass | undefined>>;
  setFilterSearch: Dispatch<SetStateAction<string>>;
  variant: 'unit' | 'class';
  setVariant: Dispatch<SetStateAction<'unit' | 'class'>>;
}

const UnitGrid: FC<UnitGridProps> = ({
  filterFaction,
  setFilterFaction,
  filterClass,
  setFilterClass,
  filterSearch,
  setFilterSearch,
  variant,
  setVariant,
  formattedUnits,
  currentUnit,
  disabled,
  onClick,
}) => (
  <div className="container-primary w-full flex flex-col gap-2 p-2 sm:w-min">
    <div className="flex w-full flex-row gap-2 items-end">
      <div className="inset-secondary flex flex-col gap-2 p-2">
        <UnitFilter items={UnitClass} filter={filterClass} setFilter={setFilterClass} path="class" />
        <UnitFilter items={Faction} filter={filterFaction} setFilter={setFilterFaction} path="factions" />
      </div>
      <Text label="Search" setState={setFilterSearch} placeholder="Name/Faction/Class" value={filterSearch}>
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
      <div className="z-10 flex flex-col p-4 pt-8">
        <UnitButtons
          formattedUnits={formattedUnits}
          filterFaction={filterFaction}
          filterClass={filterClass}
          filterSearch={filterSearch}
          currentUnit={currentUnit}
          onClick={onClick}
        />
      </div>
      <div className={joinStrings('inset-secondary absolute top-0 size-full', disabled && 'z-10 opacity-40')} />
    </div>
  </div>
);

export default UnitGrid;
