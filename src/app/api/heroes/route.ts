import { formatApiData } from '@/components/hero/utils';
import { Faction, HeroIds, UnitsByFaction } from '@/utils/types';
import { sortData } from '@/utils/utils';

export const dynamic = 'force-static';

export const HeroRouteHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const GET = async () => {
  const apiData = await Promise.all(
    Object.entries(HeroIds).map(async ([hero, id]) => formatApiData(hero, id)));
  const allData = Object.fromEntries(apiData);

  return new Response(JSON.stringify(allData), {
    headers: {
      'Content-Type': 'application/json',
      ...HeroRouteHeaders,
    },
  });
};
