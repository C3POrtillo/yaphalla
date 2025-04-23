import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

export const generateMetadata = (): Metadata => ({
  title: 'Heroes | Yaphalla',
  description: 'AFK Journey Heroes',
});

const Layout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default Layout;
