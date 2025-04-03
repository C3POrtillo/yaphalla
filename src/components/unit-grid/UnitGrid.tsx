import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import type { UnitDivData } from '@/components/unit-grid/types';
import type { FC } from 'react';

import Button from '@/components/inputs/button/Button';
import Text from '@/components/inputs/text/Text';
import Toggle from '@/components/inputs/toggle/Toggle';
import UnitButtons from '@/components/unit-grid/UnitButtons';
import UnitFilter from '@/components/unit-grid/UnitFilters';
import { getFormattedUnits } from '@/components/unit-grid/utils';
import { Faction, UnitClass } from '@/utils/types';
import { isDevMode, joinStrings } from '@/utils/utils';

export interface UnitGridProps {
  currentUnit: string | false | undefined;
  disabled?: boolean;
  onClick: (unit: string, sameUnit: boolean) => void;
}

const UnitGrid: FC<UnitGridProps> = ({ currentUnit, disabled, onClick }) => {
  const searchParams = useSearchParams();
  const isDev = isDevMode(searchParams);
  const isMdScreen = useMediaQuery({ query: '(min-width: 768px)' });
  const isXlScreen = useMediaQuery({ query: '(min-width: 1280px)' });
  const [variant, setVariant] = useState(0);
  const [formattedUnits, setFormattedUnits] = useState<UnitDivData[]>([]);
  const [filterFaction, setFilterFaction] = useState<Faction>();
  const [filterClass, setFilterClass] = useState<UnitClass>();
  const [filterSearch, setFilterSearch] = useState('');

  useEffect(() => {
    setFormattedUnits(getFormattedUnits({ isMdScreen, isXlScreen }, variant));
  }, [isMdScreen, isXlScreen, variant]);

  const devOptions = isDev && (
    <div className="flex flex-row gap-1">
      {['Units', 'Other', 'Artifacts', 'Tiles']
        .map((label, i) => (
          <Button key={label} size="sm" selected={variant === i} hasActiveBorder onClick={() => setVariant(i)}>
            {label}
          </Button>
        ))
        .reverse()}
    </div>
  );

  return (
    <div className="container-primary w-full flex flex-col gap-2 p-2 sm:w-min">
      <div className="flex w-full flex-row gap-2 items-end">
        <div className="inset-secondary flex flex-col gap-2 p-2">
          <UnitFilter items={UnitClass} filter={filterClass} setFilter={setFilterClass} path="class" />
          <UnitFilter items={Faction} filter={filterFaction} setFilter={setFilterFaction} path="factions" />
        </div>
        <Text label="Search" setState={setFilterSearch} placeholder="Name/Faction/Class" value={filterSearch}>
          {devOptions || (
            <Toggle
              variant="switch"
              disableLabel="Other"
              value="Units"
              onChange={e => {
                setVariant(e.target.checked ? 0 : 1);
              }}
              defaultChecked={variant === 0}
            />
          )}
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
};

export default UnitGrid;
