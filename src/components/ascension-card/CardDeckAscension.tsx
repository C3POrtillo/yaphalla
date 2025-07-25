'use client';
import { useMemo, useState } from 'react';

import type { CardAscensionProps } from '@/components/ascension-card/CardAscension';
import type { Faction, HeroClass } from '@/utils/types';
import type { FC, PropsWithChildren } from 'react';

import CardAscension from '@/components/ascension-card/CardAscension';
import { HeroDataProvider } from '@/components/ascension-card/HeroDataProvider';
import { filterPairs } from '@/components/ascension-card/utils';
import HeroFilter from '@/components/hero-filter/HeroFilter';
import { filterHero } from '@/components/hero-filter/utils';
import { SortedHeroes } from '@/utils/types';
import { cleanString, compareStrings, joinStrings, kebabCase } from '@/utils/utils';

interface CardDeckAscensionProps extends PropsWithChildren, CardAscensionProps {
  label?: string;
  units?: Set<string>;
  hasLabel?: boolean;
}

const CardDeckAscension: FC<CardDeckAscensionProps> = ({ units, hasLabel, label, styleType }) => {
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

  const isTeam = !!units?.size;

  return (
    <div
      id={label ? kebabCase(label) : undefined}
      className={joinStrings(
        !compareStrings(styleType || '', 'inset') && 'container-primary',
        'flex flex-col gap-2 items-center justify-start mx-4',
      )}
    >
      {!isTeam && (
        <div className="container-primary w-full">
          <HeroFilter {...filterProps} />
        </div>
      )}

      {hasLabel && <h2 className="text-lg w-full text-center">{label}</h2>}
      <div className="flex flex-row flex-wrap gap-2 justify-center size-full">
        {!isTeam &&
          SortedHeroes?.filter(({ hero }) => filterPairs(hero)).map((heroData, i) => {
            const { hero } = heroData;
            const { matchesClass, matchesDamage, matchesFaction, matchesTier, validSearch } = filterHero(
              heroData,
              filters,
            );
            const noFilter = [filterClass, filterFaction].every(item => item === undefined);
            const withFilter =
              (matchesClass && matchesDamage && matchesFaction && matchesTier) || (!!regexSearch && validSearch);
            const showCard = noFilter ? validSearch : withFilter;

            return (
              <HeroDataProvider key={`${hero}-${i}`} id={i} hero={hero} save>
                <CardAscension styleType={styleType} cardClassName={!showCard && 'hidden'} />
              </HeroDataProvider>
            );
          })}
        {isTeam &&
          Array.from(units, (hero, i) => (
            <HeroDataProvider key={`${hero}-${i}`} id={i} hero={hero}>
              <CardAscension styleType={styleType} />
            </HeroDataProvider>
          ))}
      </div>
    </div>
  );
};

export default CardDeckAscension;
