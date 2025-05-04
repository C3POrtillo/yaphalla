import { useMemo } from 'react';

import type { HeroGridProps } from '@/components/hero-grid/HeroGrid';
import type { UnitDivData } from '@/components/hero-grid/types';
import type { Faction, HeroClass } from '@/utils/types';
import type { FC } from 'react';

import { Aliases } from '@/components/hero-filter/types';
import HeroTooltip from '@/components/hero-grid/HeroTooltip';
import { hasUnit } from '@/components/hero-grid/utils';
import ButtonTile from '@/components/hex-tiles/ButtonTile';
import { getPath } from '@/components/hex-tiles/utils';
import { cleanString, joinStrings, testRegExp } from '@/utils/utils';

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
  allUnits,
  currentUnit,
  disabled,
  onClick,
}) => {
  const regexFaction = useMemo(() => filterFaction && new RegExp(cleanString(filterFaction), 'i'), [filterFaction]);
  const regexClass = useMemo(() => filterClass && new RegExp(cleanString(filterClass), 'i'), [filterClass]);
  const regexSearch = useMemo(() => !!filterSearch && new RegExp(cleanString(filterSearch), 'i'), [filterSearch]);

  return formattedUnits.map(({ offset, tiles }, i) => (
    <div key={i} className={joinStrings('-mt-4 flex flex-row', offset)}>
      {tiles.map(heroData => {
        const { hero, faction, heroClass } = heroData;
        const path = getPath(hero);
        const aliases = Aliases[hero as keyof typeof Aliases] || [];
        const matchesFaction = testRegExp(faction, regexFaction);
        const matchesClass = testRegExp(heroClass, regexClass);
        const validSearch = testRegExp([faction, heroClass, hero, ...aliases].join(' '), regexSearch);
        const inAllUnits = !!allUnits && hasUnit(allUnits, hero);
        const sameUnit = !!currentUnit && hasUnit(currentUnit, hero);

        const isValid =
          filterFaction === undefined && filterClass === undefined
            ? validSearch
            : (matchesFaction && matchesClass) || (!!regexSearch && validSearch);

        return (
          <ButtonTile
            key={hero}
            src={hero}
            ariaLabel={hero}
            path={path}
            size="sm"
            disabled={disabled}
            disabledOverlay={!isValid || inAllUnits || sameUnit}
            tooltip={<HeroTooltip {...heroData} />}
            onClick={() => onClick(hero, sameUnit)}
          />
        );
      })}
    </div>
  ));
};

export default HeroButtons;
