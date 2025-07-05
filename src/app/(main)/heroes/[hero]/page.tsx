import { notFound, redirect } from 'next/navigation';
import { connection } from 'next/server';

import type { HeroPageProps } from '@/app/(main)/heroes/[hero]/layout';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import CardHero from '@/components/hero/CardHero';
import HeroSkills from '@/components/hero/HeroSkills';
import HeroTales from '@/components/hero/HeroTales';
import { getHeroAllDetails } from '@/components/hero/utils';
import { BossesSet, HeroSet, SortedHeroes } from '@/utils/types';
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
    redirect(`/heroes/${sanitizedUnit}`);
  }
  if (BossesSet.has(sanitizedUnit)) {
    redirect(`/bosses/${sanitizedUnit}`);
  }
  const heroDetails = await getHeroAllDetails(hero);

  if (!heroDetails || !HeroSet.has(hero)) {
    notFound();
  }

  const { Info, Story, Skills } = heroDetails;
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
          heroClass={UnitJob}
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
