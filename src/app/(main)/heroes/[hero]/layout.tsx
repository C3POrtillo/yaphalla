import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { metadata } from '@/app/(main)/layout';
import { createMetadata } from '@/utils/utils';

export interface HeroPageProps {
  params: Promise<{
    hero: string;
  }>;
}

export const generateMetadata = async ({ params }: HeroPageProps): Promise<Metadata> => {
  const { hero } = await params;

  if (!hero) {
    return metadata;
  }
  const decodedHero = decodeURIComponent(hero);
  const title = `${decodedHero} | Yaphalla`;
  const description = `${decodedHero} from AFK Journey`;

  return createMetadata(
    title,
    description,
    'Yaphalla',
    `https://www.yaphalla.com/assets/images/hexes/unit/${decodedHero}.png`,
  );
};

const Layout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default Layout;
