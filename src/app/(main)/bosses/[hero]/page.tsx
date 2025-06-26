import { notFound } from 'next/navigation';
import { connection } from 'next/server';

import type { HeroPageProps } from '@/app/(main)/heroes/[hero]/layout';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import CardHero from '@/components/hero/CardHero';
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
  const { Description, UnitRace, UnitJob, DamageType } = Info;

  return (
    <>
      <Container className="mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
        <CardHero hero={hero} description={Description} faction={UnitRace} heroClass={UnitJob} damage={DamageType} />
      </Container>
      <Container className="mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
        <HeroSkills hero={hero} skills={Skills} isNPC />
      </Container>
    </>
  );
};

export default Index;
