'use client';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import EditorMain from '@/components/formation/EditorMain';
import { useFormation } from '@/components/formation/FormationProvider';
import SelectArenaPreset from '@/components/formation/SelectArenaPreset';
import SelectBackgroundHex from '@/components/formation/SelectBackgroundHex';
import Modal from '@/components/modal/Modal';

const FormationEditor: FC = () => {
  const { subMenu, id, currentId, modalActive, setModalActive } = useFormation();

  return (
    id === currentId && (
      <>
        <Container className="2xl:max-w-[1920px]">
          <EditorMain />
        </Container>
        {modalActive && (
          <Modal callback={() => setModalActive(false)}>
            {subMenu === 0 && <SelectArenaPreset />}
            {subMenu === 1 && <SelectBackgroundHex />}
          </Modal>
        )}
      </>
    )
  );
};

export default FormationEditor;
