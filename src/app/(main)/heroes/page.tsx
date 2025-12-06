import type { FC } from 'react';

import Root from '@/components/root/Root';
import CardDeckHero from '@/components/unit-data/CardDeckHero';
import { getAllHeroDetails } from '@/utils/hero-data/utils';

export const dynamic = 'force-static';

const Index: FC = async () => {
  const heroes = await getAllHeroDetails();
  
  return (
    <Root>
      <CardDeckHero heroes={Object.values(heroes)} />
    </Root>
  );
};

export default Index;
