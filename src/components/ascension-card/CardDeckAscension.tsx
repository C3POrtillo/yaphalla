'use client';
import { useMemo, useState } from 'react';

import type { CardAscensionProps } from '@/components/ascension-card/CardAscension';
import type { HeroDetailProps } from '@/components/hero/HeroDetail';
import type { Faction, HeroClass } from '@/utils/types';
import type { FC, PropsWithChildren } from 'react';

import CardAscension from '@/components/ascension-card/CardAscension';
import { HeroDataProvider } from '@/components/ascension-card/HeroDataProvider';
import HeroFilter from '@/components/hero-filter/HeroFilter';
import { filterHero } from '@/components/hero-filter/utils';
import { cleanString, compareStrings, joinStrings, kebabCase } from '@/utils/utils';

interface CardDeckAscensionProps extends PropsWithChildren, CardAscensionProps {
  label?: string;
  heroes?: HeroDetailProps[];
  units?: Set<string>;
  hasLabel?: boolean;
}

const CardDeckAscension: FC<CardDeckAscensionProps> = ({ heroes, units, hasLabel, label, styleType }) => {
  const [filterClass, setFilterClass] = useState<HeroClass>();
  const [filterFaction, setFilterFaction] = useState<Faction>();
  const [filterSearch, setFilterSearch] = useState<string>('');
  const regexClass = useMemo(() => filterClass && new RegExp(cleanString(filterClass), 'i'), [filterClass]);
  const regexFaction = useMemo(() => filterFaction && new RegExp(cleanString(filterFaction), 'i'), [filterFaction]);
  const regexSearch = useMemo(() => !!filterSearch && new RegExp(cleanString(filterSearch), 'i'), [filterSearch]);
  const filters = useMemo(
    () => ({
      regexClass,
      regexFaction,
      regexSearch,
    }),
    [regexClass, regexFaction, regexSearch],
  );

  const filterProps = {
    filterClass,
    filterFaction,
    filterSearch,
    setFilterClass,
    setFilterFaction,
    setFilterSearch,
  } as const;

  return (
    <div
      id={label ? kebabCase(label) : undefined}
      className={joinStrings(
        !compareStrings(styleType || '', 'inset') && 'container-primary',
        'flex flex-col gap-1 items-center justify-start mx-4',
      )}
    >
      {!!heroes?.length && (
        <div className="container-primary w-full">
          <HeroFilter {...filterProps} />
        </div>
      )}

      {hasLabel && <h2 className="text-lg w-full text-center">{label}</h2>}
      <div className="flex flex-row flex-wrap gap-2 justify-center size-full">
        {heroes?.map((heroData, i) => {
          const { hero: unit } = heroData;
          const { matchesClass, matchesDamage, matchesFaction, matchesTier, validSearch } = filterHero(
            heroData,
            filters,
          );
          const noFilter = [filterClass, filterFaction].every(item => item === undefined);
          const withFilter =
            (matchesClass && matchesDamage && matchesFaction && matchesTier) || (!!regexSearch && validSearch);
          const showCard = noFilter ? validSearch : withFilter;

          return (
            <HeroDataProvider key={`${unit}-${i}`} id={i} hero={unit}>
              <CardAscension styleType={styleType} cardClassName={!showCard && 'hidden'} />
            </HeroDataProvider>
          );
        })}
        {!!units?.size &&
          Array.from(units, (unit, i) => (
            <HeroDataProvider key={`${unit}-${i}`} id={i} hero={unit}>
              <CardAscension styleType={styleType} />
            </HeroDataProvider>
          ))}
      </div>
    </div>
  );
};

export default CardDeckAscension;
