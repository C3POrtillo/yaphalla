import { NextResponse } from 'next/server';

import type { HeroJSON } from '@/components/hero/types';

export const GET = async (request: Request, { params }: { params: Promise<{ hero: string }> }) => {
  const { hero } = await params;
  const { AFKJ_API, AFKJ_API_KEY } = process.env;

  if (!hero || !AFKJ_API || !AFKJ_API_KEY) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 500 });
  }

  const apiURL = `${AFKJ_API}${hero}`;
  const res = await fetch(apiURL, {
    headers: {
      Authorization: `Bearer ${AFKJ_API_KEY}`,
    },
  });
  const { Info } = (await res.json()) as HeroJSON;

  return NextResponse.json(Info);
};
