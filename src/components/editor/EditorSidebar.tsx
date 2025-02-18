'use-client';
import type { FC } from 'react';

import ArtifactGrid from '@/components/editor/ArtifactGrid';
import { useFormation } from '@/components/editor/FormationProvider';
import HexImage from '@/components/editor/HexImage';
import { ArenaPresets } from '@/components/editor/types';
import { getDrawImage } from '@/components/editor/utils';
import Button from '@/components/inputs/button/Button';

const EditorSidebar: FC = () => {
  const {
    drawEnemy,
    setCurrentTile,
    setCurrentArtifact,
    setDrawEnemy,
    setEditArena,
    setMenuTab,
    setTileData,
    setPreset,
    setUnits,
    isEditArena,
  } = useFormation();

  const tileControls = [
    {
      label: 'Player',
      selected: isEditArena && !drawEnemy,
      onClick: () => {
        setDrawEnemy(false);
        setEditArena(true);
        setCurrentTile(undefined);
        setCurrentArtifact(undefined);
      },
    },
    {
      label: 'Enemy',
      selected: isEditArena && drawEnemy,
      onClick: () => {
        setDrawEnemy(true);
        setEditArena(true);
        setCurrentTile(undefined);
        setCurrentArtifact(undefined);
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

  const otherButtons = [
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

  // const tabButtons = [
  //   {
  //     label: 'Arena Maps',
  //     hierarchy: 'primary',
  //     selected: menuTab === 'preset',
  //     onClick: () => {
  //       setEditArena(true);
  //       setMenuTab('preset');
  //     },
  //   },
  //   {
  //     label: 'Artifacts',
  //     hierarchy: 'primary',
  //     selected: menuTab === 'artifact',
  //     onClick: () => {
  //       setEditArena(false);
  //       setMenuTab('artifact');
  //     },
  //   },
  // ] as const;

  const controlDivs = [
    {
      label: 'Place',
      divs: tileControls.map(({ onClick, label, selected }) => (
        <Button key={label} className="w-full" onClick={onClick} selected={selected} hasActiveBorder>
          <div className="flex flex-row gap-2 items-center">
            <HexImage {...getDrawImage(label)} size="2xs" disabledOverlay={selected} />
            <span>{label}</span>
          </div>
        </Button>
      )),
    },
    {
      label: '',
      divs: otherButtons.map(({ onClick, label, ...props }) => (
        <Button key={label} className="w-full" onClick={onClick} {...props}>
          {label}
        </Button>
      )),
    },
    // {
    //   label: 'Select',
    //   divs: tabButtons.map(({ onClick, label, ...props }) => (
    //     <Button key={label} className="w-full" onClick={onClick} {...props}>
    //       {label}
    //     </Button>
    //   )),
    // },
  ] as const;

  const options = controlDivs.map(({ label, divs }) => (
    <div key={label} className="container-primary w-full flex flex-col gap-2 items-center">
      {!!label && <h2 className="w-full text-center text-base lg:text-lg border-b-2">{label}</h2>}
      <div className="w-full flex flex-col gap-2">{divs}</div>
    </div>
  ));

  return (
    <div className="flex w-full flex-col-reverse sm:w-fit sm:flex-col items-center gap-2">
      <div className="flex w-full flex-col gap-2 items-center">
        {options[0]}
        <ArtifactGrid />
      </div>
      {options.slice(1)}
    </div>
  );
};

export default EditorSidebar;
