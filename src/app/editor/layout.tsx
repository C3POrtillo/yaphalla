import { createMetadata } from '@/utils/utils';
import type { Viewport } from 'next';
import type { FC, PropsWithChildren } from 'react';

export const viewport: Viewport = {
  width: '608',
  initialScale: 0.69,
};

const title = 'YapBuilder'
const description = 'Custom Formation Editor or Builder for AFK Journey by Lilith Games!'

export const metadata = createMetadata(title, description)

const Layout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default Layout;
