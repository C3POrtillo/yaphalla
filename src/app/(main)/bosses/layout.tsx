import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { createMetadata } from '@/utils/utils';

export const generateMetadata = (): Metadata => createMetadata('Bosses | Yaphalla', 'AFK Journey Bosses');

const Layout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default Layout;
