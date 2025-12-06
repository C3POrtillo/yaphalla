import { notFound, redirect } from 'next/navigation';
import { connection } from 'next/server';

import type { HeroPageProps } from '@/app/(main)/heroes/[hero]/layout';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import Root from '@/components/root/Root';
import CardHero from '@/components/unit-data/CardHero';
import HeroSkills from '@/components/unit-data/HeroSkills';
import HeroTales from '@/components/unit-data/HeroTales';
import { getAllHeroes } from '@/sanity/client';
import { getAllHeroDetails, getHeroSet } from '@/utils/hero-data/utils';
import { compareStrings, sanitizeUnit } from '@/utils/utils';

// export const dynamic = 'force-static';

export const generateStaticParams = async () => {
  const heroes = Object.keys(await getAllHeroDetails());

  return heroes.map(hero => ({
    hero: encodeURIComponent(hero),
  }));
};

const Index: FC<HeroPageProps> = async ({ params }) => {
  await connection();
  const hero = decodeURIComponent((await params).hero);
  const allHeroDetails = await getAllHeroDetails()
  const heroSet = await getHeroSet();
  const sanitizedUnit = sanitizeUnit(hero);
  const heroDetails = allHeroDetails[sanitizedUnit];

  if (compareStrings(hero, sanitizedUnit)) {
    redirect(`/heroes/${sanitizedUnit}`);
  }

  if (!heroSet.has(sanitizedUnit) || !heroDetails || !hero) {
    notFound();
  }

  const { skills, story, title, description, tier, faction, heroClass, damage, hex } = heroDetails;
  return (
    <Root>
      <Container className="items-center justify-center mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
        <CardHero
          hex={hex}
          hero={hero}
          title={title}
          description={description}
          tier={tier}
          faction={faction}
          heroClass={heroClass}
          damage={damage}
        />
      </Container>
      <Container className="mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
        <HeroSkills hero={hero} skills={skills} />
      </Container>
      <Container className="mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
        <HeroTales hero={hero} tales={story} heroSet={heroSet} allHeroes={allHeroDetails}/>
      </Container>
    </Root>
  );
};

export default Index;
