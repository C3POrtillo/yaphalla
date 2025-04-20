import { useMemo } from 'react';

import type { HeroGridProps } from '@/components/hero-grid/HeroGrid';
import type { UnitDivData } from '@/components/hero-grid/types';
import type { Faction, HeroClass } from '@/utils/types';
import type { FC } from 'react';

import HeroTooltip from '@/components/hero-grid/HeroTooltip';
import ButtonTile from '@/components/hex-tiles/ButtonTile';
import { getPath } from '@/components/hex-tiles/utils';
import { cleanString, compareStrings, joinStrings, testRegExp } from '@/utils/utils';

interface HeroButtonProps extends HeroGridProps {
  formattedUnits: UnitDivData[];
  filterFaction: Faction | undefined;
  filterClass: HeroClass | undefined;
  filterSearch: string;
}

const HeroButtons: FC<HeroButtonProps> = ({
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
        const { hero: unit, faction, heroClass } = unitData;
        const path = getPath(unit);
        const matchesFaction = testRegExp(faction, regexFaction);
        const matchesClass = testRegExp(heroClass, regexClass);
        const validSearch = testRegExp([faction, heroClass, unit].join(' '), regexSearch);
        const sameUnit = !!currentUnit && !compareStrings(currentUnit, unit);
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
            tooltip={<HeroTooltip {...unitData} />}
            onClick={() => onClick(unit, sameUnit)}
          />
        );
      })}
    </div>
  ));
};

export default HeroButtons;
