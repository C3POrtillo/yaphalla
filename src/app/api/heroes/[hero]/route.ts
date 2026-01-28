import { HeroRouteHeaders } from '@/app/api/heroes/route';
import { formatApiData } from '@/components/unit-data/utils';
import { HeroesById, IdsByHero, SortedHeroes } from '@/utils/hero-data/types';
import { sanitizeUnit } from '@/utils/utils';

export const generateStaticParams = () => [
  ...SortedHeroes.map(({ hero }) => ({
    hero: encodeURIComponent(hero),
  })),
  ...Object.keys(IdsByHero).map(id => ({ hero: id })),
];

export const GET = async (request: Request, { params }: { params: Promise<{ hero: string }> }) => {
  const slug = (await params).hero;
  const hero = IdsByHero[slug] || sanitizeUnit(decodeURIComponent(slug));
  const id = HeroesById[hero];
  const apiData = await formatApiData(hero, id);

  return new Response(JSON.stringify(apiData[1]), {
    headers: HeroRouteHeaders,
  });
};

export const OPTIONS = () => new Response(null, { headers: HeroRouteHeaders });
