'use client';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import ArenaPresetSelector from '@/components/editor/ArenaPresetSelector';
import ArtifactGrid from '@/components/editor/ArtifactGrid';
import { useFormation } from '@/components/editor/FormationProvider';
import UnitEditor from '@/components/editor/UnitEditor';

const FormationEditor: FC = () => {
  const { menuTab } = useFormation();
  const isPreset = menuTab === 'preset';
  const isArtifact = menuTab === 'artifact';

  return (
    <>
      <Container>
        <UnitEditor />
      </Container>
      <Container>
        {isArtifact && <ArtifactGrid />}
        {isPreset && <ArenaPresetSelector />}
      </Container>
    </>
  );
};

export default FormationEditor;
