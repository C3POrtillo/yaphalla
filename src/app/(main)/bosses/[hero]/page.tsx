import { notFound, redirect } from 'next/navigation';
import { connection } from 'next/server';

import type { HeroPageProps } from '@/app/(main)/heroes/[hero]/layout';
import type { FC } from 'react';

import ClientBoss from '@/components/boss/ClientBoss';
import { getGuideImages } from '@/components/boss/lib/getGuideImages';
import { getHeroAllDetails } from '@/components/hero/utils';
import { HeroSet, SortedHeroes } from '@/utils/types';
import { compareStrings, sanitizeUnit } from '@/utils/utils';

export const generateStaticParams = () =>
  SortedHeroes.map(({ hero }) => ({
    hero: encodeURIComponent(hero),
  }));

const Index: FC<HeroPageProps> = async ({ params }) => {
  await connection();
  const hero = decodeURIComponent((await params).hero);
  const sanitizedUnit = sanitizeUnit(hero);
  if (compareStrings(hero, sanitizedUnit)) {
    redirect(`/bosses/${sanitizedUnit}`);
  }
  if (HeroSet.has(sanitizedUnit)) {
    redirect(`/heroes/${sanitizedUnit}`);
  }
  const heroDetails = await getHeroAllDetails(hero);

  if (!heroDetails) {
    notFound();
  }

  const guides = getGuideImages(hero);

  return <ClientBoss hero={hero} guides={guides} {...heroDetails} />;
};

export default Index;
