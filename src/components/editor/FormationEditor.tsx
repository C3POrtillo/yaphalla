'use client';

import type { FC } from 'react';

import Container from '@/components/container/Container';
import ArenaPresetSelector from '@/components/editor/ArenaPresetSelector';
import BackgroundHexSelector from '@/components/editor/BackgroundHexSelector';
import { useFormation } from '@/components/editor/FormationProvider';
import UnitEditor from '@/components/editor/UnitEditor';

const FormationEditor: FC = () => {
  const { subMenu } = useFormation();

  return (
    <>
      <Container>
        <UnitEditor />
      </Container>
      <Container className="hidden 2xl:flex">
        {subMenu === 0 && <ArenaPresetSelector />}
        {subMenu === 1 && <BackgroundHexSelector />}
      </Container>
    </>
  );
};

export default FormationEditor;
