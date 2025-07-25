'use client';
import type { HeroDetailProps } from '@/components/hero/HeroDetail';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import CardHero from '@/components/hero/CardHero';
import HeroFilter from '@/components/hero-filter/HeroFilter';
import { filterHero } from '@/components/hero-filter/utils';
import useHeroFilters from '@/utils/useHeroFilters';

interface CardDeckHeroProps {
  heroes: HeroDetailProps[];
  hasFilters?: boolean;
  path?: 'heroes' | 'bosses';
}

const CardDeckHero: FC<CardDeckHeroProps> = ({ heroes, hasFilters = true, path = 'heroes' }) => {
  const { filters, ...filterProps } = useHeroFilters({ allFilters: true });

  const { filterClass, filterDamage, filterFaction, filterTier } = filterProps;
  const { regexSearch } = filters;

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
              <CardHero hero={hero} href={`/${path}/${encodeURIComponent(hero)}`} hasDetails={false} {...props} />
            </div>
          ))}
      </div>
    </Container>
  );
};

export default CardDeckHero;
