import type { FC } from 'react';

import EditorControls from '@/components/editor/EditorControls';
import { useFormation } from '@/components/editor/FormationProvider';
import TileGrid from '@/components/editor/TileGrid';
import UnitGrid from '@/components/editor/UnitGrid';

const UnitEditor: FC = () => {
  const { preset, isEnemy, isEmpty, isNumber, hideEmptyArtifact, isEditArena, updateArena, updateUnit } =
    useFormation();

  const gridProps = isEditArena
    ? {
        label: preset,
        hideEmptyArtifact: true,
        hideUnits: true,
        hideNumbers: isNumber,
        onClick: updateArena,
      }
    : {
        id: 'unit-grid',
        hideEnemy: isEnemy,
        hideEmpty: isEmpty,
        hideNumbers: isNumber,
        hideEmptyArtifact,
        disableEmpty: true,
        onClick: updateUnit,
      };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <div className="w-full flex flex-col items-center justify-center gap-2 p-2 2xl:flex-row">
        <div className="size-full flex flex-col gap-2 items-center justify-center sm:flex-row sm:w-fit">
          <EditorControls />
          <TileGrid {...gridProps} />
        </div>
        <UnitGrid />
      </div>
    </div>
  );
};

export default UnitEditor;
