import { notFound } from 'next/navigation';
import { connection } from 'next/server';

import type { HeroPageProps } from '@/app/(main)/heroes/[hero]/layout';
import type { FC } from 'react';

import CardBoss from '@/components/boss/CardBoss';
import Container from '@/components/container/Container';
import HeroSkills from '@/components/hero/HeroSkills';
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

  const { Info, Skills } = heroDetails;

  return (
    <>
      <CardBoss hero={hero} {...Info} />
      <Container className="mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
        <HeroSkills hero={hero} skills={Skills} isNPC />
      </Container>
    </>
  );
};

export default Index;
