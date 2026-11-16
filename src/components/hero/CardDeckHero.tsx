'use client';
import { type FC, useState } from 'react';

import type { HeroDetailProps } from '@/components/hero/HeroDetail';

import Container from '@/components/container/Container';
import CardHero from '@/components/hero/CardHero';
import HeroFilter from '@/components/hero-filter/HeroFilter';
import { filterHero } from '@/components/hero-filter/utils';
import Button from '@/components/inputs/button/Button';
import { PhantimalSet } from '@/utils/types';
import useHeroFilters from '@/utils/useHeroFilters';

interface CardDeckHeroProps {
  heroes: HeroDetailProps[];
  hasFilters?: boolean;
  path?: 'heroes' | 'bosses';
}

const CardDeckHero: FC<CardDeckHeroProps> = ({ heroes, hasFilters = true, path = 'heroes' }) => {
  const { filters, ...filterProps } = useHeroFilters({ allFilters: true });
  const [variant, setVariant] = useState<number>(0);
  const { filterClass, filterDamage, filterFaction, filterTier } = filterProps;
  const { regexSearch } = filters;

  const unitOptions = (
    <div className="flex flex-row gap-1 items-center">
      {['Units', 'Phantimals']
        .map(
          (label, i) =>
            label && (
              <Button
                key={label}
                size="sm"
                className="!px-2 !py-0.5"
                selected={variant === i}
                hasActiveBorder
                hierarchy="primary"
                onClick={() => setVariant(i)}
              >
                {label}
              </Button>
            ),
        )
        .reverse()}
    </div>
  );

  return (
    <Container className="flex-col mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
      {hasFilters && (
        <div className="container-primary w-full">
          <HeroFilter {...filterProps}>{unitOptions}</HeroFilter>
        </div>
      )}
      <div className="flex flex-row flex-wrap items-stretch">
        {heroes
          .filter(heroData => {
            const { hero } = heroData;
            switch (variant) {
              case 1:
                return PhantimalSet.has(hero);
              default:
                if (PhantimalSet.has(hero)) {
                  return false;
                }
            }

            const { matchesClass, matchesDamage, matchesFaction, matchesTier, validSearch } = filterHero(
              heroData,
              filters,
            );
            const noFilter = [filterClass, filterDamage, filterFaction, filterTier].every(item => item === undefined);
            const withFilter =
              (matchesClass && matchesDamage && matchesFaction && matchesTier) || (!!regexSearch && validSearch);

            return noFilter ? validSearch : withFilter;
          })
          .map(
            ({ hero, ...props }) =>
              hero && (
                <div key={hero} className="p-1 basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5">
                  <CardHero hero={hero} href={`/${path}/${encodeURIComponent(hero)}`} hasDetails={false} {...props} />
                </div>
              ),
          )}
      </div>
    </Container>
  );
};

export default CardDeckHero;
