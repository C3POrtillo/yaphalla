import { notFound } from 'next/navigation';
import { connection } from 'next/server';

import type { HeroJSON } from '@/components/hero/types';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import CardHero from '@/components/hero/CardHero';
import { heroes } from '@/utils/pathsHeroes';

const CardDeckHero: FC = async () => {
  await connection();
  const { AFKJ_API, AFKJ_API_KEY } = process.env;

  if (!AFKJ_API || !AFKJ_API_KEY) {
    notFound();
  }

  return (
    <Container className="mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
      <div className="flex flex-row flex-wrap items-stretch">
        {heroes.map(async ({ href, label }) => {
          const apiURL = `${AFKJ_API}${label}`;
          const res = await fetch(apiURL, {
            headers: {
              Authorization: `Bearer ${AFKJ_API_KEY}`,
            },
          });
          const { Info } = (await res.json()) as HeroJSON;
          const { UnitRace, UnitJob, UnitRarity, DamageType } = Info;

          return (
            <div key={label} className="p-1 basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5">
              <CardHero
                hero={label}
                href={href}
                tier={UnitRarity}
                faction={UnitRace}
                heroClass={UnitJob}
                damage={DamageType}
                hasDetails={false}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default CardDeckHero;
