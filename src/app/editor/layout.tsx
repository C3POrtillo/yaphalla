import type { Metadata, Viewport } from 'next';
import type { FC, PropsWithChildren } from 'react';

export const viewport: Viewport = {
  width: '608',
  initialScale: .69,
}

export const metadata: Metadata = {
  title: 'YapBuilder',
  description: 'Custom Formation Editor or Builder for AFK Journey by Lilith Games!',
};

const Layout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default Layout;
