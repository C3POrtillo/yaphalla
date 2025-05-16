import { notFound } from 'next/navigation';
import { connection } from 'next/server';

import type { HeroPageProps } from '@/app/(main)/heroes/[hero]/layout';
import type { HeroJSON } from '@/components/hero/types';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import CardHero from '@/components/hero/CardHero';
import HeroSkills from '@/components/hero/HeroSkills';
import { SortedHeroes } from '@/utils/types';

export const generateStaticParams = () =>
  SortedHeroes.map(({ hero }) => ({
    hero: encodeURIComponent(hero),
  }));

const Index: FC<HeroPageProps> = async ({ params }) => {
  await connection();
  const hero = decodeURIComponent((await params).hero);
  const { AFKJ_API, AFKJ_API_KEY } = process.env;

  if (!hero || !AFKJ_API || !AFKJ_API_KEY) {
    notFound();
  }

  const apiURL = `${AFKJ_API}${hero}`;
  const res = await fetch(apiURL, {
    headers: {
      Authorization: `Bearer ${AFKJ_API_KEY}`,
    },
  });
  if (res.status !== 200) {
    notFound();
  }
  const { Info, Skills } = (await res.json()) as HeroJSON;
  const { Description, UnitRace, UnitJob, DamageType } = Info;

  return (
    <>
      <Container className="mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
        <CardHero hero={hero} description={Description} faction={UnitRace} heroClass={UnitJob} damage={DamageType} />
      </Container>
      <Container className="mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
        <HeroSkills hero={hero} skills={Skills} isBoss />
      </Container>
    </>
  );
};

export default Index;
