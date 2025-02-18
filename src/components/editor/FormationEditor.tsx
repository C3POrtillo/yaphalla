'use client';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import ArenaPresetSelector from '@/components/editor/ArenaPresetSelector';
import UnitEditor from '@/components/editor/UnitEditor';

const FormationEditor: FC = () => (
  <>
    <Container>
      <UnitEditor />
    </Container>
    <Container className="hidden 2xl:flex">
      <ArenaPresetSelector />
    </Container>
  </>
);

export default FormationEditor;
