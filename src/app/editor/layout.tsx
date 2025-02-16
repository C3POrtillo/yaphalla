import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'YapBuilder',
  description: 'Custom Formation Editor or Builder for AFK Journey by Lilith Games!',
};

const Layout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default Layout;
