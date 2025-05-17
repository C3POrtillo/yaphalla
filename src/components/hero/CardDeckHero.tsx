'use client';
import { useMemo, useState } from 'react';

import type { HeroDetailProps } from '@/components/hero/HeroDetail';
import type { Damage, Faction, HeroClass, Tier } from '@/utils/types';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import CardHero from '@/components/hero/CardHero';
import HeroFilter from '@/components/hero-filter/HeroFilter';
import { filterHero } from '@/components/hero-filter/utils';
import { cleanString } from '@/utils/utils';

interface CardDeckHeroProps {
  heroes: HeroDetailProps[];
  hasFilters?: boolean;
  isNPC?: boolean;
}

const CardDeckHero: FC<CardDeckHeroProps> = ({ heroes, hasFilters = true, isNPC }) => {
  const [filterClass, setFilterClass] = useState<HeroClass>();
  const [filterDamage, setFilterDamage] = useState<Damage>();
  const [filterFaction, setFilterFaction] = useState<Faction>();
  const [filterTier, setFilterTier] = useState<Tier>();
  const [filterSearch, setFilterSearch] = useState<string>('');
  const regexClass = useMemo(() => filterClass && new RegExp(cleanString(filterClass), 'i'), [filterClass]);
  const regexDamage = useMemo(() => filterDamage && new RegExp(cleanString(filterDamage), 'i'), [filterDamage]);
  const regexFaction = useMemo(() => filterFaction && new RegExp(cleanString(filterFaction), 'i'), [filterFaction]);
  const regexTier = useMemo(() => filterTier && new RegExp(cleanString(filterTier), 'i'), [filterTier]);
  const regexSearch = useMemo(() => !!filterSearch && new RegExp(cleanString(filterSearch), 'i'), [filterSearch]);

  const filters = useMemo(
    () => ({
      regexClass,
      regexDamage,
      regexFaction,
      regexTier,
      regexSearch,
    }),
    [regexClass, regexDamage, regexFaction, regexTier, regexSearch],
  );

  const filterProps = {
    filterClass,
    filterDamage,
    filterFaction,
    filterSearch,
    filterTier,
    setFilterClass,
    setFilterDamage,
    setFilterFaction,
    setFilterSearch,
    setFilterTier,
  } as const;

  return (
    <Container className="flex-col mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
      {hasFilters && (
        <div className="container-primary w-full">
          <HeroFilter {...filterProps} />
        </div>
      )}
      <div className="flex flex-row flex-wrap items-stretch">
        {heroes
          .filter(heroData => {
            const { matchesClass, matchesDamage, matchesFaction, matchesTier, validSearch } = filterHero(
              heroData,
              filters,
            );
            const noFilter = [filterClass, filterDamage, filterFaction, filterTier].every(item => item === undefined);
            const withFilter =
              (matchesClass && matchesDamage && matchesFaction && matchesTier) || (!!regexSearch && validSearch);

            return noFilter ? validSearch : withFilter;
          })
          .map(({ hero, ...props }) => (
            <div key={hero} className="p-1 basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5">
              <CardHero
                hero={hero}
                href={`/${isNPC ? 'bosses' : 'heroes'}/${encodeURIComponent(hero)}`}
                hasDetails={false}
                {...props}
              />
            </div>
          ))}
      </div>
    </Container>
  );
};

export default CardDeckHero;
