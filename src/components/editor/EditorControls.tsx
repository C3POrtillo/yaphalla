'use-client';
import * as htmlToImage from 'html-to-image';

import type { FC } from 'react';

import { useFormation } from '@/components/editor/FormationProvider';
import HexImage from '@/components/editor/HexImage';
import { ArenaPresets } from '@/components/editor/types';
import Button from '@/components/inputs/button/Button';
import Toggle from '@/components/inputs/toggle/Toggle';

const EditorControls: FC = () => {
  const {
    title,
    setTileData,
    setPreset,
    drawEnemy,
    setDrawEnemy,
    setUnits,
    isEnemy,
    setEnemy,
    isEmpty,
    setEmpty,
    isNumber,
    setNumber,
    hideEmptyArtifact,
    setHideEmptyArtifact,
    setCurrentTile,
    setCurrentArtifact,
    setEditArena,
    menuTab,
    setMenuTab,
    isEditArena,
  } = useFormation();

  const tileControls = [
    {
      label: 'Player',
      selected: isEditArena && !drawEnemy,
      onClick: () => {
        setDrawEnemy(false);
        setEditArena(true);
        setMenuTab('preset');
      },
    },
    {
      label: 'Enemy',
      selected: isEditArena && drawEnemy,
      onClick: () => {
        setDrawEnemy(true);
        setEditArena(true);
        setMenuTab('preset');
      },
    },
    {
      label: 'Unit',
      selected: !isEditArena,
      onClick: () => {
        setEditArena(false);
        setMenuTab('artifact');
      },
    },
  ];

  const getImage = (str: string) => {
    const label = str.toLowerCase();
    const path = label === 'unit' ? ('unit' as const) : ('base' as const);
    let src = 'Hammie';

    if (label === 'player') {
      src = 'Generic-Hex';
    }
    if (label === 'enemy') {
      src = 'Enemy-Hex';
    }

    return { src, path };
  };

  const unitControls = [
    {
      name: 'enemyToggle',
      defaultChecked: !isEnemy,
      value: 'Enemy Tiles',
      disabled: isEditArena,
      onChange: setEnemy,
    },
    {
      name: 'emptyToggle',
      defaultChecked: !isEmpty,
      value: 'Grid',
      disabled: isEditArena,
      onChange: setEmpty,
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

  const otherButtons = [
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
    {
      label: 'Invert Tiles',
      hierarchy: 'primary',
      onClick: () => {
        setTileData(prev => prev.map(prevTile => -prevTile) as (-1 | 0 | 1)[]);
      },
    },
    {
      label: 'Clear Units',
      hierarchy: 'warning',
      onClick: () => {
        setEditArena(false);
        setUnits({});
      },
    },
    {
      label: 'Clear Tiles',
      hierarchy: 'warning',
      onClick: () => {
        setEditArena(true);
        setPreset('Custom');
        setTileData(ArenaPresets['Custom'] as (-1 | 0 | 1)[]);
        setUnits({});
      },
    },
  ] as const;

  const tabButtons = [
    {
      label: 'Presets',
      hierarchy: 'primary',
      selected: menuTab === 'preset',
      onClick: () => {
        setEditArena(true);
        setMenuTab('preset');
      },
    },
    {
      label: 'Artifacts',
      hierarchy: 'primary',
      selected: menuTab === 'artifact',
      onClick: () => {
        setEditArena(false);
        setMenuTab('artifact');
      },
    },
  ] as const;

  const controlDivs = [
    {
      label: 'Place',
      divs: tileControls.map(({ onClick, label, selected }) => (
        <Button key={label} className="w-full" onClick={onClick} selected={selected}>
          <div className="flex flex-row gap-2 items-center">
            <HexImage {...getImage(label)} size="2xs" disabledOverlay={selected} />
            <span>{label}</span>
          </div>
        </Button>
      )),
    },
    {
      label: 'Hide/Show',
      divs: unitControls.map(({ onChange, name, ...props }) => (
        <Toggle
          key={name}
          className="w-full"
          variant="switch"
          name={name}
          onChange={e => onChange(!e.target.checked)}
          {...props}
        />
      )),
    },
    {
      label: 'Other',
      divs: otherButtons.map(({ onClick, label, ...props }) => (
        <Button key={label} className="w-full" onClick={onClick} {...props}>
          {label}
        </Button>
      )),
    },
    {
      label: 'Select',
      divs: tabButtons.map(({ onClick, label, ...props }) => (
        <Button key={label} className="w-full" onClick={onClick} {...props}>
          {label}
        </Button>
      )),
    },
  ] as const;

  return (
    <div className="flex w-full sm:w-fit flex-col items-center gap-2">
      {controlDivs.map(({ label, divs }) => (
        <div key={label} className="container-primary w-full flex flex-col gap-2 items-center">
          <div className="w-full grid grid-cols-2 sm:flex sm:flex-col gap-2">{divs}</div>
        </div>
      ))}
    </div>
  );
};

export default EditorControls;
