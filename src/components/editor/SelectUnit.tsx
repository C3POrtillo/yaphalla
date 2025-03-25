'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import type { UnitDivData } from '@/components/unit-grid/types';
import type { FC } from 'react';

import { useFormation } from '@/components/editor/FormationProvider';
import UnitGrid from '@/components/unit-grid/UnitGrid';
import { getFormattedUnits } from '@/components/unit-grid/utils';
import { isDevMode } from '@/utils/utils';

const SelectUnit: FC = () => {
  const {
    tileData,
    filterClass,
    setFilterClass,
    filterFaction,
    setFilterFaction,
    filterSearch,
    setFilterSearch,
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
  const onClick = (unit: string, sameUnit: boolean) => {
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
  };

  useEffect(() => {
    setFormattedUnits(getFormattedUnits({ isMdScreen, isXlScreen }, variant, isDev));
  }, [isMdScreen, isXlScreen, variant, isDev]);

  return (
    <UnitGrid
      filterClass={filterClass}
      setFilterClass={setFilterClass}
      filterFaction={filterFaction}
      setFilterFaction={setFilterFaction}
      filterSearch={filterSearch}
      setFilterSearch={setFilterSearch}
      variant={variant}
      setVariant={setVariant}
      disabled={disabled}
      formattedUnits={formattedUnits}
      currentUnit={currentUnit}
      onClick={onClick}
    />
  );
};

export default SelectUnit;
