import { useMemo } from 'react';

import type { UnitDivData } from '@/components/unit-grid/types';
import type { Faction, UnitClass } from '@/utils/types';
import type { FC } from 'react';

import ButtonTile from '@/components/hex-tiles/ButtonTile';
import UnitTooltip from '@/components/unit-grid/UnitTooltip';
import { ArtifactSet } from '@/utils/types';
import { cleanString, compareStrings, joinStrings, testRegex } from '@/utils/utils';

export interface UnitButtonProps {
  formattedUnits: UnitDivData[];
  filterFaction: Faction | undefined;
  filterClass: UnitClass | undefined;
  filterSearch: string;
  currentUnit: string | false | undefined;
  disabled?: boolean;
  onClick: (unit: string, sameUnit: boolean) => void;
}

const UnitButtons: FC<UnitButtonProps> = ({
  formattedUnits,
  filterFaction,
  filterClass,
  filterSearch,
  currentUnit,
  disabled,
  onClick,
}) => {
  const regexFaction = useMemo(() => filterFaction && new RegExp(cleanString(filterFaction), 'i'), [filterFaction]);
  const regexClass = useMemo(() => filterClass && new RegExp(cleanString(filterClass), 'i'), [filterClass]);
  const regexSearch = useMemo(() => !!filterSearch && new RegExp(cleanString(filterSearch), 'i'), [filterSearch]);

  return formattedUnits.map(({ offset, tiles }, i) => (
    <div key={i} className={joinStrings('-mt-4 flex flex-row', offset)}>
      {tiles.map(unitData => {
        const { unit, faction, unitClass } = unitData;
        const path = ArtifactSet.has(unit) ? 'artifact' : 'unit';
        const matchesFaction = testRegex(faction, regexFaction);
        const matchesClass = testRegex(unitClass, regexClass);
        const validSearch = testRegex([faction, unitClass, unit].join(' '), regexSearch);
        const sameUnit = !!currentUnit && compareStrings(currentUnit, unit) === 0;
        const isValid =
          filterFaction === undefined && filterClass === undefined
            ? validSearch
            : (matchesFaction && matchesClass) || (!!regexSearch && validSearch);

        return (
          <ButtonTile
            key={unit}
            src={unit}
            ariaLabel={unit}
            path={path}
            size="sm"
            disabled={disabled}
            disabledOverlay={!isValid || sameUnit || disabled}
            tooltip={<UnitTooltip {...unitData} />}
            onClick={() => onClick(unit, sameUnit)}
          />
        );
      })}
    </div>
  ));
};

export default UnitButtons;
