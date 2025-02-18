'use client';
import * as htmlToImage from 'html-to-image';

import type { FC } from 'react';

import ArenaPresetSelector from '@/components/editor/ArenaPresetSelector';
import EditorSidebar from '@/components/editor/EditorSidebar';
import { useFormation } from '@/components/editor/FormationProvider';
import TileGrid from '@/components/editor/TileGrid';
import UnitGrid from '@/components/editor/UnitGrid';
import Button from '@/components/inputs/button/Button';
import Toggle from '@/components/inputs/toggle/Toggle';

const UnitEditor: FC = () => {
  const {
    title,
    preset,
    isEnemy,
    isEmpty,
    isNumber,
    hideEmptyArtifact,
    isEditArena,
    setEnemy,
    setEmpty,
    setNumber,
    setHideEmptyArtifact,
    updateArena,
    updateUnit,
    setEditArena,
    setCurrentTile,
    setCurrentArtifact,
  } = useFormation();

  const arenaProps = {
    label: preset,
    hideEmptyArtifact: true,
    hideUnits: true,
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
    onClick: updateUnit,
  };

  const gridProps = isEditArena ? arenaProps : unitProps;

  const saveButtons = [
    {
      label: 'Copy to Clipboard',
      disabled: isEditArena,
      onClick: () => {
        const copy = async () => {
          const unitGrid = document.getElementById('unit-grid');
          if (!unitGrid) {
            return;
          }
          setCurrentTile(undefined);
          setCurrentArtifact(undefined);
          const image = await htmlToImage.toPng(unitGrid, { pixelRatio: 1 });

          try {
            const base64Data = image.replace(/^data:image\/png;base64,/, '');
            const byteNumbers = new Uint8Array([...atob(base64Data)].map(char => char.charCodeAt(0)));
            const blob = new Blob([byteNumbers], { type: 'image/png' });

            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          } catch (error) {
            console.error('Failed to copy image:', error);
          }
        };
        setEditArena(false);
        copy();
      },
    },
    {
      label: 'Export to PNG',
      disabled: isEditArena,
      onClick: () => {
        const exportToPNG = async () => {
          const unitGrid = document.getElementById('unit-grid');
          if (!unitGrid) {
            return;
          }
          setCurrentTile(undefined);
          setCurrentArtifact(undefined);

          const image = await htmlToImage.toPng(unitGrid, { pixelRatio: 1 });
          const link = document.createElement('a');
          link.href = image;
          link.download = `${title || 'download'}.png`;
          link.click();
        };
        setEditArena(false);
        exportToPNG();
      },
    },
  ];

  const saveButtonDivs = saveButtons.map(({ onClick, label, ...props }) => (
    <Button key={label} className="w-full" onClick={onClick} {...props}>
      {label}
    </Button>
  ));

  const unitControls = [
    {
      name: 'emptyToggle',
      defaultChecked: !isEmpty,
      value: 'Grid',
      disabled: isEditArena,
      onChange: setEmpty,
    },
    {
      name: 'enemyToggle',
      defaultChecked: !isEnemy,
      value: 'Enemy',
      disabled: isEditArena,
      onChange: setEnemy,
    },
    {
      name: 'numberToggle',
      defaultChecked: !isNumber,
      value: 'Numbers',
      onChange: setNumber,
    },
    {
      name: 'artifactToggle',
      defaultChecked: !hideEmptyArtifact,
      value: 'Empty Artifacts',
      disabled: isEditArena,
      onChange: setHideEmptyArtifact,
    },
  ] as const;

  const controlDivs = [
    {
      label: 'Enable:',
      divs: unitControls.map(({ onChange, name, ...props }) => (
        <Toggle
          key={name}
          className="grow"
          variant="switch"
          name={name}
          onChange={e => onChange(!e.target.checked)}
          {...props}
        />
      )),
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <div className="w-full flex flex-col items-center justify-center gap-2 p-2 2xl:flex-row">
        <div className="size-full flex flex-col gap-2 items-start justify-center sm:flex-row sm:w-fit">
          <EditorSidebar />
          <TileGrid {...gridProps}>
            <div className="flex flex-col w-full gap-2">
              {controlDivs.map(({ label, divs }) => (
                <div key={label} className="w-full flex flex-row gap-2 items-center">
                  <span>{label}</span>
                  <div className="w-full flex flex-row gap-2">{divs}</div>
                </div>
              ))}
            </div>
          </TileGrid>
        </div>
        <div className="size-full flex flex-col gap-2 items-center sm:w-fit">
          <div className="container-primary w-full flex flex-col lg:flex-row gap-2 items-center">{saveButtonDivs}</div>
          <div className="w-full flex flex-col-reverse sm:flex-row gap-2">
            <UnitGrid />
            <div className="w-full 2xl:hidden">
              <ArenaPresetSelector variant="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitEditor;
