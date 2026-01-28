'use client';

import type { FC, PropsWithChildren } from 'react';

import Container from '@/components/container/Container';
import { classMerge } from '@/utils/utils';

const RootClient: FC<PropsWithChildren> = ({ children }) => (
  <div className={classMerge('flex grow flex-col items-center justify-between size-full')}>
    {children}
    <Container className="grow" />
  </div>
);

export default RootClient;
