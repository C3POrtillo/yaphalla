import { HeroRouteHeaders } from '@/app/api/heroes/route';
import { formatApiData } from '@/components/hero/utils';
import { HeroIds } from '@/utils/types';

export const dynamic = 'force-static';

export const GET = async (request: Request, { params }: { params: Promise<{ hero: string }> }) => {
  const { hero } = await params;
  const id = HeroIds[hero];
  const apiData = await formatApiData(hero, id);

  return new Response(JSON.stringify(apiData[1]), {
    headers: {
      'Content-Type': 'application/json',
      ...HeroRouteHeaders,
    },
  });
};
