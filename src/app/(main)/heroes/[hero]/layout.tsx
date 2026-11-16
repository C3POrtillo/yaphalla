import type { HeroJSON } from '@/components/hero/types';
import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { metadata } from '@/app/(main)/layout';
import { getHeroAllDetails } from '@/components/hero/utils';
import { HeroSet, PhantimalSet } from '@/utils/types';
import { createMetadata, getImageURL, sanitizeUnit } from '@/utils/utils';

export interface HeroPageProps {
  params: Promise<{
    hero: string;
  }>;
}

export const generateMetadata = async ({ params }: HeroPageProps): Promise<Metadata> => {
  const hero = sanitizeUnit(decodeURIComponent((await params).hero));
  const heroDetails = await getHeroAllDetails(hero);
  const isPhantimal = PhantimalSet.has(hero);

  if (!heroDetails || (!HeroSet.has(hero) && !isPhantimal)) {
    return metadata;
  }

  const { Info, Skills } = heroDetails as HeroJSON;
  const { DisplayTitle, Description } = Info;
  const skillList = Skills.filter(Boolean).map(({ DisplayName }) => DisplayName);

  return createMetadata(
    `${hero} | ${DisplayTitle}`,
    Description,
    'Yaphalla',
    getImageURL(`/assets/images/hexes/unit/${isPhantimal ? '/phantimals' : ''}${hero}.png`),
    [hero, DisplayTitle, ...skillList, 'Skills', 'Abilities', 'Exclusive Weapon', 'Ex Weapon', 'Ex'],
  );
};

const Layout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default Layout;
