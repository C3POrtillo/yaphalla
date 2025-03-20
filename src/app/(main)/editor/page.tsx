'use client';
import type { FC } from 'react';

import FormationEditor from '@/components/editor/FormationEditor';
import { FormationProvider } from '@/components/editor/FormationProvider';

const Index: FC = () => (
  <FormationProvider>
    <FormationEditor />
  </FormationProvider>
);

export default Index;
