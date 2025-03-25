'use client';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import EditorMain from '@/components/editor/EditorMain';
import { useFormation } from '@/components/editor/FormationProvider';
import SelectArenaPreset from '@/components/editor/SelectArenaPreset';
import SelectBackgroundHex from '@/components/editor/SelectBackgroundHex';

const FormationEditor: FC = () => {
  const { subMenu } = useFormation();

  return (
    <>
      <Container>
        <EditorMain />
      </Container>
      <Container className="hidden 2xl:flex">
        {subMenu === 0 && <SelectArenaPreset />}
        {subMenu === 1 && <SelectBackgroundHex />}
      </Container>
    </>
  );
};

export default FormationEditor;
