import { notFound } from 'next/navigation';
import { connection } from 'next/server';

import type { HeroPageProps } from '@/app/(main)/heroes/[hero]/layout';
import type { HeroJSON } from '@/components/hero/types';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import CardHero from '@/components/hero/CardHero';
import HeroSkills from '@/components/hero/HeroSkills';
import HeroTales from '@/components/hero/HeroTales';
import { SortedUnits } from '@/utils/types';

export const generateStaticParams = () =>
  SortedUnits.map(({ unit }) => ({
    hero: encodeURIComponent(unit),
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
  const { Info, Story, Skills } = (await res.json()) as HeroJSON;
  const { DisplayTitle, Description, UnitRace, UnitJob, UnitRarity, DamageType } = Info;

  return (
    <>
      <Container className="mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
        <CardHero
          hero={hero}
          title={DisplayTitle}
          description={Description}
          tier={UnitRarity}
          faction={UnitRace}
          unitClass={UnitJob}
          damage={DamageType}
        />
      </Container>
      <Container className="mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
        <HeroSkills hero={hero} skills={Skills} />
      </Container>
      <Container className="mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
        <HeroTales hero={hero} tales={Story} />
      </Container>
    </>
  );
};

export default Index;
