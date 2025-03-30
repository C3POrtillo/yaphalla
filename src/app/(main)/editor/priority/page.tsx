'use client';
import type { FC } from 'react';

import PriorityEditor from '@/components/priority/PriorityEditor';
import { PriorityProvider } from '@/components/priority/PriorityProvider';

const Index: FC = () => (
  <PriorityProvider>
    <PriorityEditor />
  </PriorityProvider>
);

export default Index;
