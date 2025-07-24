import type { FC, PropsWithChildren } from 'react';

import { robots } from '@/utils/siteTypes';
import { createMetadata } from '@/utils/utils';

const title = 'YapThreads';
const description = 'Create thread thumbnails';

export const metadata = {
  ...createMetadata(title, description),
  robots,
};

const Layout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default Layout;
