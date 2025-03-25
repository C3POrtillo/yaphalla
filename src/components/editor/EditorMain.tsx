'use client';
import * as htmlToImage from 'html-to-image';
import { Suspense, useState } from 'react';

import type { FC } from 'react';

import EditorArena from '@/components/editor/EditorArena';
import EditorSidebar from '@/components/editor/EditorSidebar';
import { useFormation } from '@/components/editor/FormationProvider';
import SelectArenaPreset from '@/components/editor/SelectArenaPreset';
import SelectUnit from '@/components/editor/SelectUnit';
import ExportImage from '@/components/export-image/ExportImage';

const UnitEditor: FC = () => {
  const [isActive, setActive] = useState(false);
  const {
    title,
    preset,
    isEnemy,
    isEmpty,
    isNumber,
    hideEmptyArtifact,
    isEditArena,
    updateArena,
    updateUnit,
    setEditArena,
    setCurrentTile,
    setCurrentArtifact,
    isTalents,
  } = useFormation();

  const arenaProps = {
    label: preset,
    hideArtifacts: true,
    hideUnits: true,
    hideTalents: true,
    hideNumbers: isNumber,
    onClick: updateArena,
  };

  const unitProps = {
    id: 'unit-grid',
    hideEnemy: isEnemy,
    hideEmpty: isEmpty,
    hideNumbers: isNumber,
    hideEmptyArtifact,
    disableEmpty: true,
    hideTalents: isTalents,
    onClick: updateUnit,
  };

  const gridProps = isEditArena ? arenaProps : unitProps;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <div className="w-full flex flex-col items-center justify-center gap-2 p-2 2xl:flex-row">
        <div className="size-full flex flex-col gap-2 items-start justify-center sm:flex-row sm:w-fit">
          <Suspense
            fallback={<div className="container-primary w-full flex flex-col grow gap-2 p-2 sm:w-min">Loading...</div>}
          >
            <EditorSidebar />
          </Suspense>
          <EditorArena {...gridProps} />
        </div>
        <div className="size-full flex flex-col gap-2 items-center sm:w-fit">
          <ExportImage
            fileName={title}
            disabled={isEditArena}
            selected={isActive}
            getImage={async () => {
              setActive(true);
              setEditArena(false);
              setCurrentTile(undefined);
              setCurrentArtifact(undefined);
              const unitGrid = document.getElementById('unit-grid');
              if (!unitGrid) {
                return false;
              }
              const image = await htmlToImage.toPng(unitGrid, { pixelRatio: 1 });

              return image;
            }}
            onClick={() => {
              setActive(false);
            }}
          />
          <div className="size-full grow flex flex-col-reverse sm:flex-row gap-2">
            <Suspense
              fallback={
                <div className="container-primary w-full flex flex-col grow gap-2 p-2 sm:w-min">Loading...</div>
              }
            >
              <SelectUnit />
            </Suspense>
            <div className="w-full 2xl:hidden">
              <SelectArenaPreset variant="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitEditor;
