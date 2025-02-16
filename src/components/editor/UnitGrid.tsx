import { type FC, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import type { UnitDivData } from '@/components/editor/types';

import FilterGroup from '@/components/editor/FilterGroup';
import { useFormation } from '@/components/editor/FormationProvider';
import HexImage from '@/components/editor/HexImage';
import { Faction, UnitClass } from '@/components/editor/types';
import { sortUnits, validateSearch } from '@/components/editor/utils';
import Text from '@/components/inputs/text/Text';
import { cleanString, joinStrings } from '@/utils/utils';

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
  const isMdScreen = useMediaQuery({ query: '(min-width: 768px)' });
  const [formattedUnits, setFormattedUnits] = useState<UnitDivData[]>([]);
  const sortedUnits = sortUnits();
  const disabled = currentTile === undefined;

  const getRowLength = () => (isMdScreen ? 8 : 7);
  const formattedUnitData = () => {
    const result: UnitDivData[] = [];
    const length = getRowLength();
    let index = 0;
    let rowParity = 1;

    while (index < sortedUnits.length) {
      if (index >= sortedUnits.length) {
        break;
      }
      const rowData = sortedUnits.slice(index, index + length);
      result.push({ offset: rowParity > 0 ? '' : 'pl-8', tiles: rowData });
      rowParity *= -1;
      index += length;
    }

    return result;
  };

  useEffect(() => {
    setFormattedUnits(formattedUnitData());
  }, [isMdScreen]);

  const unitHexes = formattedUnits.map(({ offset, tiles }, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={i} className={joinStrings('-mt-4 flex flex-row', offset)}>
      {tiles.map(({ unit, faction, classLabel }) => {
        const factionRegex = filterFaction && new RegExp(cleanString(filterFaction), 'i');
        const classRegex = filterClass && new RegExp(cleanString(filterClass), 'i');
        const matchesFaction = factionRegex?.test(faction) || filterFaction === undefined;
        const matchesClass = classRegex?.test(classLabel) || filterClass === undefined;
        const validSearch = validateSearch(searchFilter, faction, classLabel, unit);
        const sameUnit = !disabled && unit === units[currentTile]?.unit;
        const isValid =
          filterFaction === undefined && filterClass === undefined
            ? validSearch
            : (matchesFaction && matchesClass) || (searchFilter && validSearch);

        return (
          <button
            key={unit}
            onClick={() => {
              if (disabled) {
                return;
              }
              if (sameUnit) {
                delete units[currentTile];
              } else {
                units[currentTile] = { unit, type: tileData[currentTile] };
              }
              setUnits({ ...units });
              setCurrentTile(undefined);
            }}
            disabled={disabled}
          >
            <HexImage src={unit} path="unit" size="sm" disabled={disabled} disabledOverlay={!isValid || sameUnit} />
          </button>
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
        <Text label="Search" setState={setSearchFilter} placeholder="Name/Faction/Class" value={searchFilter} />
      </div>
      <div className="relative flex size-full flex-row justify-center">
        <div className="z-10 flex flex-col p-4 pt-8">{unitHexes}</div>
        <div className={joinStrings('inset-secondary absolute top-0 size-full', disabled && 'z-10 opacity-40')} />
      </div>
    </div>
  );
};

export default UnitGrid;
