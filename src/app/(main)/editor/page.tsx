'use client';
import type { FC } from 'react';

import FormationEditor from '@/components/formation/FormationEditor';
import { FormationProvider } from '@/components/formation/FormationProvider';

const Index: FC = () => (
  <FormationProvider>
    <FormationEditor />
  </FormationProvider>
);

export default Index;
