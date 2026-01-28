'use client';
import type { PageContextType } from '@/components/pageProvider/PageProvider';
import type { FC, PropsWithChildren } from 'react';

import { PageProvider } from '@/components/pageProvider/PageProvider';

interface ComponentRendererProps extends PageContextType, PropsWithChildren {}

const ComponentRenderer: FC<ComponentRendererProps> = ({ children, ...props }) => (
  <PageProvider {...props}>{children}</PageProvider>
);

export default ComponentRenderer;
