import { notFound } from 'next/navigation';
import { connection } from 'next/server';

import type { HeroPageProps } from '@/app/(main)/heroes/[hero]/layout';
import type { FC } from 'react';

import ClientBoss from '@/components/boss/ClientBoss';
import { getGuideImages } from '@/components/boss/lib/getGuideImages';
import { getHeroAllDetails } from '@/components/hero/utils';
import { SortedHeroes } from '@/utils/types';

export const generateStaticParams = () =>
  SortedHeroes.map(({ hero }) => ({
    hero: encodeURIComponent(hero),
  }));

const Index: FC<HeroPageProps> = async ({ params }) => {
  await connection();
  const hero = decodeURIComponent((await params).hero);
  const heroDetails = await getHeroAllDetails(hero);

  if (!heroDetails) {
    notFound();
  }

  const guides = getGuideImages(hero);

  return <ClientBoss hero={hero} guides={guides} {...heroDetails} />;
};

export default Index;
