import Image from 'next/image';
import { useMemo } from 'react';

import type { Faction, UnitClass, UnitDivData } from '@/utils/types';
import type { FC } from 'react';

import TileButton from '@/components/hex-tiles/TileButton';
import { ArtifactSet } from '@/utils/types';
import { cleanString, compareStrings, joinStrings, testRegex } from '@/utils/utils';

interface UnitButtonProps {
  formattedUnits: UnitDivData[];
  filterFaction: Faction | undefined;
  filterClass: UnitClass | undefined;
  searchFilter: string;
  currentUnit: string | false | undefined;
  disabled?: boolean;
  onClick: (unit: string, sameUnit: boolean) => void;
}

const UnitButtons: FC<UnitButtonProps> = ({
  formattedUnits,
  filterFaction,
  filterClass,
  searchFilter,
  currentUnit,
  disabled,
  onClick,
}) => {
  const factionRegex = useMemo(() => filterFaction && new RegExp(cleanString(filterFaction), 'i'), [filterFaction]);
  const classRegex = useMemo(() => filterClass && new RegExp(cleanString(filterClass), 'i'), [filterClass]);
  const searchRegex = useMemo(() => !!searchFilter && new RegExp(cleanString(searchFilter), 'i'), [searchFilter]);

  return formattedUnits.map(({ offset, tiles }, i) => (
    <div key={i} className={joinStrings('-mt-4 flex flex-row', offset)}>
      {tiles.map(({ unit, faction, classLabel }) => {
        const path = ArtifactSet.has(unit) ? 'artifact' : 'unit';
        const matchesFaction = testRegex(faction, factionRegex);
        const matchesClass = testRegex(classLabel, classRegex);
        const validSearch = testRegex([faction, classLabel, unit].join(' '), searchRegex);
        const sameUnit = !!currentUnit && compareStrings(currentUnit, unit) === 0;
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
            disabledOverlay={!isValid || sameUnit || disabled}
            tooltip={
              <div className="flex flex-row gap-1 items-center">
                <div className="relative size-5 min-w-5">
                  <Image
                    src={`/assets/images/factions/${faction.toLocaleLowerCase()}.png`}
                    alt={faction}
                    fill
                    sizes="64px"
                    unoptimized
                    priority
                  />
                </div>
                <p className="text-xs w-max max-w-16">{unit}</p>
                <div className="relative size-5 min-w-5">
                  <Image
                    src={`/assets/images/class/${classLabel.toLocaleLowerCase()}.png`}
                    alt={classLabel}
                    fill
                    sizes="64px"
                    unoptimized
                    priority
                  />
                </div>
              </div>
            }
            onClick={() => onClick(unit, sameUnit)}
          />
        );
      })}
    </div>
  ));
};

export default UnitButtons;
