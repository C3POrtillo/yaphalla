'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import type { UnitDivData } from 'components/unit-grid/types';
import type { FC } from 'react';

import { useFormation } from '@/components/editor/FormationProvider';
import UnitButtons from '@/components/unit-grid/UnitButtons';
import UnitGridContainer from '@/components/unit-grid/UnitGridContainer';
import { getFormattedUnits } from '@/components/unit-grid/utils';
import { isDevMode } from '@/utils/utils';

const UnitGrid: FC = () => {
  const {
    tileData,
    filterClass,
    setFilterClass,
    filterFaction,
    setFilterFaction,
    searchFilter,
    setSearchFilter,
    currentTile,
    setCurrentTile,
    units,
    setUnits,
  } = useFormation();
  const searchParams = useSearchParams();
  const isDev = isDevMode(searchParams);
  const isMdScreen = useMediaQuery({ query: '(min-width: 768px)' });
  const isXlScreen = useMediaQuery({ query: '(min-width: 1280px)' });
  const [formattedUnits, setFormattedUnits] = useState<UnitDivData[]>([]);
  const [variant, setVariant] = useState<'unit' | 'class'>('unit');
  const disabled = currentTile === undefined || tileData[currentTile] === 2;
  const currentUnit = !disabled && units[currentTile]?.unit;

  useEffect(() => {
    setFormattedUnits(getFormattedUnits({ isMdScreen, isXlScreen }, variant, isDev));
  }, [isMdScreen, isXlScreen, variant, isDev]);

  const unitHexes = (
    <UnitButtons
      formattedUnits={formattedUnits}
      filterFaction={filterFaction}
      filterClass={filterClass}
      searchFilter={searchFilter}
      currentUnit={currentUnit}
      onClick={(unit: string, sameUnit: boolean) => {
        if (disabled) {
          return;
        }
        setUnits(prev => {
          const copy = { ...prev };
          if (sameUnit) {
            delete copy[currentTile];
          } else {
            copy[currentTile] = { unit, type: tileData[currentTile] };
          }

          return copy;
        });
        setCurrentTile(undefined);
      }}
    />
  );

  return (
    <UnitGridContainer
      filterClass={filterClass}
      setFilterClass={setFilterClass}
      filterFaction={filterFaction}
      setFilterFaction={setFilterFaction}
      searchFilter={searchFilter}
      setSearchFilter={setSearchFilter}
      variant={variant}
      setVariant={setVariant}
      unitHexes={unitHexes}
      disabled={disabled}
    />
  );
};

export default UnitGrid;
