import type { FC, PropsWithChildren } from 'react';

import { createMetadata } from '@/utils/utils';

const title = 'Content Creators';
const description = 'Check out these community creators!';

const { keywords, ...baseMetadata } = createMetadata(title, description);

const createKeywords = () => {
  const start = ['AFKJ', 'AFKJourney', 'AFK Journey'];
  const mid = ['Creators'];

  const ret = [];
  for (const a of start) {
    for (const b of mid) {
      ret.push([a, b].join(' ').trim());
    }
  }

  return ret;
};

export const metadata = {
  ...baseMetadata,
  keywords: [...createKeywords(), ...(keywords as string[])],
};

const Layout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default Layout;
