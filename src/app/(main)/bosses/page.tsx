import type { FC } from 'react';

import CardDeckHero from '@/components/hero/CardDeckHero';
import { getAllHeroDetails } from '@/components/hero/utils';

export const dynamic = 'force-static';

const Index: FC = async () => {
  const heroes = await getAllHeroDetails(true);

  return <CardDeckHero heroes={heroes} hasFilters={false} isBoss />;
};

export default Index;
