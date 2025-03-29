import type { FC, PropsWithChildren } from 'react';

import { createMetadata, joinStrings } from '@/utils/utils';

const title = 'YapPriority';
const description = 'Build your priority list for AFK Journey now!';

const { keywords, ...baseMetadata } = createMetadata(title, description);

const createKeywords = () => {
  const start = ['AFKJ', 'AFKJourney', 'AFK Journey', ''];
  const mid = ['Priority List', 'Wishlist'];
  const end = ['Editor', 'Builder', 'Maker'];

  const ret = [];
  for (const a of start) {
    for (const b of mid) {
      for (const c of end) {
        ret.push(joinStrings(a, b, c).trim());
      }
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
