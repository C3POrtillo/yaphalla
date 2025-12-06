import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { builder } from '@/sanity/client';
import { getAllHeroDetails } from '@/utils/hero-data/utils';
import { createMetadata, sanitizeUnit } from '@/utils/utils';

export interface HeroPageProps {
  params: Promise<{
    hero: string;
  }>;
}

export const generateMetadata = async ({ params }: HeroPageProps): Promise<Metadata> => {
  const hero = sanitizeUnit(decodeURIComponent((await params).hero));
  const heroDetails = (await getAllHeroDetails())[hero];

  if (!heroDetails) {
    return createMetadata({});
  }

  const { title, description, hex } = heroDetails;
  const image = builder.image(hex!).fit('min').width(200).quality(100).format('webp').url();

  return createMetadata({ title: `${hero} | ${title}`, description, image });
};

const Layout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default Layout;
