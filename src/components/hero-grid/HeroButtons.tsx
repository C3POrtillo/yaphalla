import { useMemo } from 'react';

import type { HeroGridProps } from '@/components/hero-grid/HeroGrid';
import type { UnitDivData } from '@/components/hero-grid/types';
import type { Faction, HeroClass } from '@/utils/types';
import type { DragEvent, FC } from 'react';

import { filterHero } from '@/components/hero-filter/utils';
import HeroTooltip from '@/components/hero-grid/HeroTooltip';
import { hasUnit } from '@/components/hero-grid/utils';
import ButtonTile from '@/components/hex-tiles/ButtonTile';
import { getPath } from '@/components/hex-tiles/utils';
import { cleanString, joinStrings } from '@/utils/utils';

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

  const filters = useMemo(
    () => ({
      regexClass,
      regexFaction,
      regexSearch,
    }),
    [regexClass, regexFaction, regexSearch],
  );

  const handleDragStart = (e: DragEvent<HTMLButtonElement>, hero: string, sameUnit: boolean) => {
    e.dataTransfer.setData('application/hero', JSON.stringify({ hero, sameUnit }));
    e.dataTransfer.effectAllowed = 'move';
  };

  return formattedUnits.map(({ offset, tiles }, i) => (
    <div key={i} className={joinStrings('-mt-4 flex flex-row', offset)}>
      {tiles.map(heroData => {
        const { hero } = heroData;
        const { matchesClass, matchesFaction, validSearch } = filterHero(heroData, filters);
        const path = getPath(hero);
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
            selected={sameUnit}
            path={path}
            size="sm"
            disabled={disabled}
            disabledOverlay={!isValid || inAllUnits || sameUnit}
            tooltip={<HeroTooltip {...heroData} />}
            onClick={() => onClick(hero, sameUnit)}
            draggable={isValid && !inAllUnits}
            onDragStart={e => handleDragStart(e, hero, sameUnit)}
          />
        );
      })}
    </div>
  ));
};

export default HeroButtons;
