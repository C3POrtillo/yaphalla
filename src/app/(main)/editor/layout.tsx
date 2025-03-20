import type { Viewport } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { createMetadata } from '@/utils/utils';

export const viewport: Viewport = {
  width: '608',
  initialScale: 0.69,
};

const title = 'YapBuilder';
const description = 'Custom Formation Editor or Builder for AFK Journey by Lilith Games!';

const { keywords, ...baseMetadata } = createMetadata(title, description);

const createKeywords = () => {
  const start = ['AFKJ', 'AFKJourney', 'AFK Journey', ''];
  const mid = ['Formation', 'Team'];
  const end = ['Editor', 'Builder'];

  const ret = [];
  for (const a of start) {
    for (const b of mid) {
      for (const c of end) {
        ret.push(`${a} ${b} ${c}`.trim());
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
