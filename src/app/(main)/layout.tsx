import '@/styles/globals.css';

import type { Viewport } from 'next';
import type { FC, PropsWithChildren } from 'react';

import Root from '@/components/root/Root';
import { createMetadata } from '@/utils/utils';

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  themeColor: '#1a387b',
};

const title = 'Yaphalla';
const description = 'Providing players with the best tools and content for AFK Journey by Lilith Games!';

export const metadata = createMetadata(title, description);

const RootLayout: FC<PropsWithChildren> = ({ children }) => <Root>{children}</Root>;

export default RootLayout;
