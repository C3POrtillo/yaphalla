'use client';
import * as htmlToImage from 'html-to-image';
import { Suspense, useState } from 'react';

import type { FC } from 'react';

import ExportImage from '@/components/export-image/ExportImage';
import EditorArena from '@/components/formation/EditorArena';
import EditorSidebar from '@/components/formation/EditorSidebar';
import { useFormation } from '@/components/formation/FormationProvider';
import SelectArenaPreset from '@/components/formation/SelectArenaPreset';
import SelectHero from '@/components/formation/SelectHero';

const EditorMain: FC = () => {
  const [isExport, setExport] = useState<boolean>(false);
  const {
    id,
    preset,
    hideTalents,
    hideEmpty,
    hideEnemy,
    hideNumbers,
    hideEmptyArtifact,
    isEditArena,
    updateArena,
    updateUnit,
    setEditArena,
    setCurrentTile,
    setCurrentArtifact,
  } = useFormation();

  const arenaProps = {
    label: preset,
    hideArtifacts: true,
    hideUnits: true,
    hideTalents: true,
    hideNumbers,
    onClick: updateArena,
  };

  const unitProps = {
    id: `unit-grid-${id}`,
    hideEnemy,
    hideEmpty,
    hideNumbers,
    hideEmptyArtifact,
    disableEmpty: true,
    hideTalents,
    disableObstacles: true,
    onClick: updateUnit,
  };

  const gridProps = isEditArena ? arenaProps : unitProps;

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 p-2 2xl:flex-row">
      <div className="size-full flex flex-col gap-2 items-start justify-center sm:flex-row sm:w-fit">
        <Suspense
          fallback={<div className="container-primary w-full flex flex-col grow gap-2 p-2 sm:w-min">Loading...</div>}
        >
          <EditorSidebar />
        </Suspense>
        <EditorArena {...gridProps} />
      </div>
      <div className="size-full flex flex-col gap-2 items-center">
        <ExportImage
          disabled={isEditArena}
          selected={isExport}
          getImage={async () => {
            setExport(true);
            setEditArena(false);
            setCurrentTile(undefined);
            setCurrentArtifact(undefined);
            const unitGrid = document.getElementById(`unit-grid-${id}`);
            if (!unitGrid) {
              return false;
            }
            const image = await htmlToImage.toPng(unitGrid, { pixelRatio: 1 });

            return image;
          }}
          onClick={() => {
            setExport(false);
          }}
        />
        <div className="size-full grow flex flex-col-reverse sm:flex-row gap-2">
          <SelectHero />
          <div className="w-full 2xl:hidden">
            <SelectArenaPreset variant="sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorMain;
