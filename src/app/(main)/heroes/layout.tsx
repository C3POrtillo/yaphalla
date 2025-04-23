import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { createMetadata } from '@/utils/utils';

export const generateMetadata = (): Metadata => createMetadata('Heroes | Yaphalla', 'AFK Journey Heroes');

const Layout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default Layout;
