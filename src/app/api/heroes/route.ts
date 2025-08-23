import { formatApiData } from '@/components/hero/utils';
import { HeroIds } from '@/utils/types';

export const dynamic = 'force-static';

export const HeroRouteHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const GET = async () => {
  const apiData = await Promise.all(Object.entries(HeroIds).map(async ([hero, id]) => formatApiData(hero, id)));
  const allData = Object.fromEntries(apiData);

  return new Response(JSON.stringify(allData), {
    headers: HeroRouteHeaders,
  });
};

export const OPTIONS = () => new Response(null, { headers: HeroRouteHeaders });
