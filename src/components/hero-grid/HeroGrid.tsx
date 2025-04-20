import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import type { UnitDivData } from '@/components/hero-grid/types';
import type { Faction, HeroClass } from '@/utils/types';
import type { FC } from 'react';

import HeroFilter from '@/components/hero-filter/HeroFilter';
import HeroButtons from '@/components/hero-grid/HeroButtons';
import { getFormattedUnits } from '@/components/hero-grid/utils';
import Button from '@/components/inputs/button/Button';
import { isDevMode, joinStrings } from '@/utils/utils';

export interface HeroGridProps {
  currentUnit: string | false | undefined;
  disabled?: boolean;
  onClick: (unit: string, sameUnit: boolean) => void;
}

const HeroGrid: FC<HeroGridProps> = ({ currentUnit, disabled, onClick }) => {
  const searchParams = useSearchParams();
  const isDev = isDevMode(searchParams);
  const isMdScreen = useMediaQuery({ query: '(min-width: 768px)' });
  const isXlScreen = useMediaQuery({ query: '(min-width: 1280px)' });
  const [variant, setVariant] = useState(0);
  const [formattedUnits, setFormattedUnits] = useState<UnitDivData[]>([]);
  const [filterFaction, setFilterFaction] = useState<Faction>();
  const [filterClass, setFilterClass] = useState<HeroClass>();
  const [filterSearch, setFilterSearch] = useState('');

  useEffect(() => {
    setFormattedUnits(getFormattedUnits({ isMdScreen, isXlScreen }, variant));
  }, [isMdScreen, isXlScreen, variant]);

  const unitOptions = (
    <div className="flex flex-row gap-1">
      {['Units', 'Other', isDev && 'Artifacts', isDev && 'Tiles']
        .map(
          (label, i) =>
            label && (
              <Button key={label} size="sm" selected={variant === i} hasActiveBorder onClick={() => setVariant(i)}>
                {label}
              </Button>
            ),
        )
        .reverse()}
    </div>
  );

  return (
    <div className="container-primary w-full flex flex-col gap-2 p-2 sm:w-min">
      <HeroFilter
        filterClass={filterClass}
        filterFaction={filterFaction}
        filterSearch={filterSearch}
        setFilterClass={setFilterClass}
        setFilterFaction={setFilterFaction}
        setFilterSearch={setFilterSearch}
      >
        {unitOptions}
      </HeroFilter>
      <div className="relative flex size-full flex-row justify-center">
        <div className="z-10 flex flex-col p-4 pt-8">
          <HeroButtons
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

export default HeroGrid;
