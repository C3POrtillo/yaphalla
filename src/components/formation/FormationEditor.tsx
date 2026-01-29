'use client';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import EditorMain from '@/components/formation/EditorMain';
import { useFormation } from '@/components/formation/FormationProvider';
import SelectArenaPreset from '@/components/formation/SelectArenaPreset';
import SelectBackgroundHex from '@/components/formation/SelectBackgroundHex';

const FormationEditor: FC = () => {
  const { subMenu, id, currentId } = useFormation();

  return (
    id === currentId && (
      <>
        <Container className='max-w-[1920px]'>
          <EditorMain />
        </Container>
        <Container className="hidden 2xl:flex">
          {subMenu === 0 && <SelectArenaPreset />}
          {subMenu === 1 && <SelectBackgroundHex />}
        </Container>
      </>
    )
  );
};

export default FormationEditor;
