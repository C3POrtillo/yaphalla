import type { HeroJSON } from '@/components/hero/types';
import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { metadata } from '@/app/(main)/layout';
import { getHeroAllDetails } from '@/components/hero/utils';
import { AllBossesSet } from '@/utils/types';
import { createMetadata, getImageURL, sanitizeUnit } from '@/utils/utils';

export interface HeroPageProps {
  params: Promise<{
    hero: string;
  }>;
}

export const generateMetadata = async ({ params }: HeroPageProps): Promise<Metadata> => {
  const hero = sanitizeUnit(decodeURIComponent((await params).hero));
  const heroDetails = await getHeroAllDetails(hero, true);

  if (!heroDetails || !AllBossesSet.has(hero)) {
    return metadata;
  }

  const { Info, Skills } = heroDetails as HeroJSON;
  const { Description } = Info;
  const skillList = Skills.filter(Boolean).map(({ DisplayName }) => DisplayName);

  return createMetadata(hero, Description, 'Yaphalla', getImageURL(`/assets/images/hexes/boss/${hero}.png`), [
    hero,
    ...skillList,
    'Skills',
    'Abilities',
    'Boss',
  ]);
};

const Layout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default Layout;
