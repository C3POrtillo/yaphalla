'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import type { UnitDivData } from '@/components/editor/types';
import type { FC } from 'react';

import FilterGroup from '@/components/editor/FilterGroup';
import { useFormation } from '@/components/editor/FormationProvider';
import TileButton from '@/components/editor/TileButton';
import { ArtifactSet, Faction, UnitClass } from '@/components/editor/types';
import { getFormattedUnits, isDevMode, testRegex, validateSearch } from '@/components/editor/utils';
import Text from '@/components/inputs/text/Text';
import Toggle from '@/components/inputs/toggle/Toggle';
import { cleanString, compareStrings, joinStrings } from '@/utils/utils';

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
  const isMdScreen = useMediaQuery({ query: '(min-width: 768px)' });
  const isXlScreen = useMediaQuery({ query: '(min-width: 1280px)' });
  const [formattedUnits, setFormattedUnits] = useState<UnitDivData[]>([]);
  const [variant, setVariant] = useState<'unit' | 'class'>('unit');
  const disabled = currentTile === undefined;
  const factionRegex = filterFaction && new RegExp(cleanString(filterFaction), 'i');
  const classRegex = filterClass && new RegExp(cleanString(filterClass), 'i');
  const searchRegex = !!searchFilter && new RegExp(cleanString(searchFilter), 'i');

  useEffect(() => {
    const isDev = isDevMode(searchParams);
    setFormattedUnits(getFormattedUnits({ isMdScreen, isXlScreen }, variant, isDev));
  }, [isMdScreen, isXlScreen, variant, searchParams]);

  const unitHexes = formattedUnits.map(({ offset, tiles }, i) => (
    <div key={i} className={joinStrings('-mt-4 flex flex-row', offset)}>
      {tiles.map(({ unit, faction, classLabel }) => {
        const path = ArtifactSet.has(unit) ? 'artifact' : 'unit';
        const matchesFaction = testRegex(faction, factionRegex);
        const matchesClass = testRegex(classLabel, classRegex);
        const validSearch = validateSearch(searchRegex, faction, classLabel, unit);
        const sameUnit = !disabled && unit === units[currentTile]?.unit;
        const isValid =
          filterFaction === undefined && filterClass === undefined
            ? validSearch
            : (matchesFaction && matchesClass) || (!!searchRegex && validSearch);

        return (
          <TileButton
            key={unit}
            src={unit}
            ariaLabel={unit}
            path={path}
            size="sm"
            disabled={disabled}
            disabledOverlay={!isValid || sameUnit}
            hasHoverLabel
            onClick={() => {
              if (disabled) {
                return;
              }
              const updatedUnits = { ...units };

              if (sameUnit) {
                delete updatedUnits[currentTile];
              } else {
                updatedUnits[currentTile] = { unit, type: tileData[currentTile] };
              }
              setUnits(updatedUnits);
              setCurrentTile(undefined);
            }}
          />
        );
      })}
    </div>
  ));

  return (
    <div className="container-primary w-full sm:w-min flex flex-col gap-2 p-2">
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
};

export default UnitGrid;
