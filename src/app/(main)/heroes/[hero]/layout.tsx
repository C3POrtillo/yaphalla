import type { HeroJSON } from '@/components/hero/types';
import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { metadata } from '@/app/(main)/layout';
import { createMetadata } from '@/utils/utils';

export interface HeroPageProps {
  params: Promise<{
    hero: string;
  }>;
}

export const generateMetadata = async ({ params }: HeroPageProps): Promise<Metadata> => {
  const hero = decodeURIComponent((await params).hero);
  const { AFKJ_API, AFKJ_API_KEY } = process.env;

  if (!hero || !AFKJ_API || !AFKJ_API_KEY) {
    return metadata;
  }
  const apiURL = `${AFKJ_API}${hero}`;
  const res = await fetch(apiURL, {
    headers: {
      Authorization: `Bearer ${AFKJ_API_KEY}`,
    },
  });

  if (res.status !== 200) {
    return metadata;
  }

  const { Info } = (await res.json()) as HeroJSON;
  const { DisplayTitle, Description } = Info;

  const title = `${hero} | ${DisplayTitle}`;
  const description = Description;

  return createMetadata(
    title,
    description,
    'Yaphalla',
    `https://www.yaphalla.com/assets/images/hexes/unit/${hero}.png`,
  );
};

const Layout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default Layout;
