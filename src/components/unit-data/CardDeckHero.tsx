'use client';
import type { HeroAPIData } from '@/utils/hero-data/types';
import type { Options } from '@/utils/useHeroFilters';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import { filterHero } from '@/components/hero-filter/utils';
import CardHero from '@/components/unit-data/CardHero';
import useHeroFilters from '@/utils/useHeroFilters';
import HeroFilter from '@/components/hero-filter/HeroFilter';

interface CardDeckHeroProps {
  heroes: HeroAPIData[];
  hasFilters?: boolean;
  path?: 'heroes' | 'bosses';
  options: Options;
}

const CardDeckHero: FC<CardDeckHeroProps> = ({ heroes, hasFilters = true, path = 'heroes', options }) => {
  const { filters, categories } = useHeroFilters(options);
  const filterValues =
    categories &&
    Object.entries(categories)
      .filter(([key]) => key != 'search')
      .map(([, value]) => value.filter);
  const { regexSearch } = filters;

  return (
    <Container className="flex-col mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
      {hasFilters && (
        <div className="container-primary w-full">
          <HeroFilter categories={categories} hasTier hasDamage/>
        </div>
      )}
      <div className="flex flex-row flex-wrap items-stretch">
        {heroes
          .filter(heroData => {
            const { matchesClass, matchesDamage, matchesFaction, matchesTier, validSearch } = filterHero(
              heroData,
              filters,
            );
            const noFilter = filterValues?.every(item => item === undefined);
            const withFilter =
              (matchesClass && matchesDamage && matchesFaction && matchesTier) || (!!regexSearch && validSearch);

            return noFilter ? validSearch : withFilter;
          })
          .map(
            ({ hero, ...props }, i) =>
              !!hero && (
                <div
                  key={`${hero}-${i}`}
                  className="p-1 basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
                >
                  <CardHero hero={hero} href={`/${path}/${encodeURIComponent(hero)}`} hasDetails={false} {...props} />
                </div>
              ),
          )
          .filter(Boolean)}
      </div>
    </Container>
  );
};

export default CardDeckHero;
