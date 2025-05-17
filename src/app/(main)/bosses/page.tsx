import type { FC } from 'react';

import CardDeckHero from '@/components/hero/CardDeckHero';
import { getAllHeroMiniDetails } from '@/components/hero/utils';

export const dynamic = 'force-static';

const Index: FC = async () => {
  const heroes = await getAllHeroMiniDetails('bosses');

  return <CardDeckHero heroes={heroes} hasFilters={false} path="bosses" />;
};

export default Index;
