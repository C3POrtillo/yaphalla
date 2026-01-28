import { ClassOrder, DamageOrder, FactionOrder, TierOrder } from '@/utils/hero-data/types';
import {
  ALL_BOSS_QUERY,
  ALL_CLASS_QUERY,
  ALL_DAMAGE_QUERY,
  ALL_FACTION_QUERY,
  ALL_HERO_QUERY,
  ALL_MISC_QUERY,
  ALL_TIER_QUERY,
  ALL_WILDCARD_QUERY,
  CTA_QUERY,
  HEADER_QUERY,
  LOGO_QUERY,
  SOCIAL_QUERY,
  TAGS_QUERY,
} from '@/utils/queries';
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';
import { cache } from 'react';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  apiVersion: '2025-07-09',
  useCdn: true,
});

export const builder = imageUrlBuilder(client);

export const getAllCtas = cache(() => client.fetch(CTA_QUERY));

export const getAllTags = cache(() => client.fetch(TAGS_QUERY));

export const getLogo = cache(() => client.fetch(LOGO_QUERY));

export const getSocials = cache(() => client.fetch(SOCIAL_QUERY));

export const getHeader = cache(() => client.fetch(HEADER_QUERY));

const sortUnit = (
  { faction: { name: factionA }, class: { name: classA }, name: nameA }: any,
  { faction: { name: factionB }, class: { name: classB }, name: nameB }: any,
) => {
  if (factionA == factionB) {
    if (classA == classB) {
      return (nameA as string)!.localeCompare((nameB as string)!);
    }

    return ClassOrder.indexOf(classA) - ClassOrder.indexOf(classB);
  }

  return FactionOrder.indexOf(factionA) - FactionOrder.indexOf(factionB);
};

const sortData = (a: string | null, b: string | null, priority: readonly string[]) =>
  priority.indexOf(a!) - priority.indexOf(b!);

export const getAllHeroes = cache(async () => (await client.fetch(ALL_HERO_QUERY)).sort(sortUnit));
export const getAllWildcards = cache(async () => (await client.fetch(ALL_WILDCARD_QUERY)).sort(sortUnit));
export const getAllMisc = cache(async () => (await client.fetch(ALL_MISC_QUERY)).sort(sortUnit));
export const getAllBosses = cache(async () => (await client.fetch(ALL_BOSS_QUERY)).sort(sortUnit).sort(sortUnit));

export const getAllFactions = cache(async () =>
  (await client.fetch(ALL_FACTION_QUERY)).sort((a, b) => sortData(a.name, b.name, FactionOrder)),
);
export const getAllClasses = cache(async () =>
  (await client.fetch(ALL_CLASS_QUERY)).sort((a, b) => sortData(a.name, b.name, ClassOrder)),
);
export const getAllTiers = cache(async () =>
  (await client.fetch(ALL_TIER_QUERY)).sort((a, b) => sortData(a.name, b.name, TierOrder)),
);
export const getAllDamages = cache(async () =>
  (await client.fetch(ALL_DAMAGE_QUERY)).sort((a, b) => sortData(a.name, b.name, DamageOrder)),
);
