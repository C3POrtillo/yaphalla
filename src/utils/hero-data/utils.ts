import { cache } from 'react';

import type { ALL_HERO_QUERYResult } from '@/sanity/types';
import type { HeroAPIData, HeroJSON } from '@/utils/hero-data/types';

import { builder, getAllDamages, getAllHeroes, getAllTiers } from '@/sanity/client';

const { AFKJ_API, AFKJ_API_KEY } = process.env;
const apiHeader = {
  headers: {
    Authorization: `Bearer ${AFKJ_API_KEY}`,
  },
};
const fetchAPI = async (string: string) => await fetch(`${AFKJ_API}${string}`, apiHeader);

const getHeroDetails = cache(
  async ({ name: hero, faction, class: heroClass, hex, portrait }: ALL_HERO_QUERYResult[number], isNPC?: boolean) => {
    try {
      if (!hero) {
        return null;
      }

      const res = await fetchAPI(hero);
      const { Info, Story, Skills } = (await res.json()) as HeroJSON;
      const {
        DamageType,
        UnitRarity = isNPC ? null : 'r',
        DisplayName,
        DisplayTitle,
        Description,
        Gender,
        StartMP,
      } = Info;
      const tier = (await getAllTiers()).find(({ name }) => name === UnitRarity?.toLowerCase()) ?? null;
      const damage = (await getAllDamages()).find(({ name }) => name === DamageType?.toLowerCase()) ?? null;

      return {
        hero: DisplayName,
        displayName: DisplayName,
        title: DisplayTitle,
        description: Description,
        gender: Gender,
        initialEnergy: StartMP,
        tier,
        heroClass,
        faction,
        damage,
        hex,
        portrait: builder.image(portrait!).fit('min').width(200).quality(100).format('webp').url(),
        story: Story,
        skills: Skills,
      };
    } catch {
      return null;
    }
  },
);

export const getAllHeroDetails = cache(
  async () =>
    Object.fromEntries(
      (await Promise.all((await getAllHeroes()).map(async data => getHeroDetails(data))))
        .filter(Boolean)
        .map(data => [data?.hero, data]),
    ) as Record<string, HeroAPIData>,
);

export const getHeroSet = cache(async () => {
  const allHeroes = await getAllHeroDetails();

  return new Set(Object.keys(allHeroes));
});
