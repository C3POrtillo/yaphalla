import type { FC, PropsWithChildren } from 'react';

export const metadata = {
  title: 'Heroes | Yaphalla',
  description: 'AFK Journey Heroes',
};

const Layout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default Layout;
