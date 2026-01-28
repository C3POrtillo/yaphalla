import { connection } from 'next/server';

import type { FC } from 'react';

import Root from '@/components/root/Root';
import CardDeckHero from '@/components/unit-data/CardDeckHero';
import { getAllClasses, getAllDamages, getAllFactions, getAllTiers } from '@/sanity/client';
import { getAllHeroDetails } from '@/utils/hero-data/utils';

const Index: FC = async () => {
  await connection();
  const heroes = await getAllHeroDetails();
  const allClasses = await getAllClasses();
  const allFactions = await getAllFactions();
  const allTiers = await getAllTiers();
  const allDamages = await getAllDamages();
  const filterOptions = {
    allClasses,
    allFactions,
    allTiers,
    allDamages,
  };

  return (
    <Root>
      <CardDeckHero heroes={Object.values(heroes)} options={filterOptions} />
    </Root>
  );
};

export default Index;
