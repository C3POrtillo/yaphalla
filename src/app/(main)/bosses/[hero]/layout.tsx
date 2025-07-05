import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { metadata } from '@/app/(main)/layout';
import { getHeroAllDetails } from '@/components/hero/utils';
import { createMetadata } from '@/utils/utils';

export interface HeroPageProps {
  params: Promise<{
    hero: string;
  }>;
}

export const generateMetadata = async ({ params }: HeroPageProps): Promise<Metadata> => {
  const hero = decodeURIComponent((await params).hero);
  const heroDetails = await getHeroAllDetails(hero);

  if (!heroDetails) {
    return metadata;
  }

  const { Info } = heroDetails;
  const { Description } = Info;

  return createMetadata(hero, Description, 'Yaphalla', `https://www.yaphalla.com/assets/images/hexes/boss/${encodeURIComponent(hero)}.png`);
};

const Layout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default Layout;
