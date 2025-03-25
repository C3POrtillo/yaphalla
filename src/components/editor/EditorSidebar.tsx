'use-client';
import { useSearchParams } from 'next/navigation';
import { type FC, useState } from 'react';

import ArtifactGrid from '@/components/editor/ArtifactGrid';
import { useFormation } from '@/components/editor/FormationProvider';
import HexImage from '@/components/editor/HexImage';
import { getDrawImage } from '@/components/editor/utils';
import Button from '@/components/inputs/button/Button';
import Toggle from '@/components/inputs/toggle/Toggle';
import { ArenaPresets, ArtifactSet, DoubleArtifacts } from '@/utils/types';
import { compareStrings, isDevMode } from '@/utils/utils';

const EditorSidebar: FC = () => {
  const {
    drawEnemy,
    setCurrentTile,
    setCurrentArtifact,
    setDrawEnemy,
    setEditArena,
    subMenu,
    setSubMenu,
    setTileData,
    setPreset,
    setUnits,
    isEditArena,
    setNumber,
    setEnemy,
    setEmpty,
    hideLogo,
    setHideLogo,
    baseHex,
    outline,
  } = useFormation();
  const [tab, setTab] = useState(0);
  const searchParams = useSearchParams();
  const isDev = isDevMode(searchParams);

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
      },
    },
  ];

  const otherButtons = [
    {
      label: 'Invert Tiles',
      hierarchy: 'primary',
      onClick: () => {
        setTileData(prev => prev.map(prevTile => -prevTile) as number[]);
      },
    },
    {
      label: 'Clear Units',
      hierarchy: 'warning',
      onClick: () => {
        setEditArena(false);
        setUnits(prevUnits =>
          Object.fromEntries(Object.entries(prevUnits).filter(([_, data]) => ArtifactSet.has(data.unit))),
        );
      },
    },
    {
      label: 'Clear All',
      hierarchy: 'warning',
      onClick: () => {
        setDrawEnemy(false);
        setEditArena(true);
        setPreset('Custom');
        setTileData(ArenaPresets['Custom'] as number[]);
        setUnits({});
      },
    },
  ] as const;

  const tabButtons = [
    {
      label: 'Arena Presets',
      hierarchy: 'primary',
      selected: subMenu === 0,
      onClick: () => {
        setEditArena(true);
        setSubMenu(0);
      },
    },
    {
      label: 'Customize Player',
      hierarchy: 'primary',
      selected: subMenu === 1,
      onClick: () => {
        setEditArena(false);
        setSubMenu(1);
      },
    },
  ] as const;

  const controlDivs = [
    {
      label: 'Place',
      divs: tileControls.map(({ onClick, label, selected }) => (
        <Button key={label} size="sm" className="w-full" onClick={onClick} selected={selected} hasActiveBorder>
          <div className="flex flex-row gap-2 items-center">
            <HexImage
              {...getDrawImage(label, baseHex || outline)}
              size="2xs"
              disabledOverlay={selected}
              forceOutline={compareStrings(label, 'Player') === 0 && outline}
            />
            <span>{label}</span>
          </div>
        </Button>
      )),
    },
    {
      label: '',
      divs: otherButtons.map(({ onClick, label, ...props }) => (
        <Button key={label} size="sm" className="w-full" onClick={onClick} {...props}>
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

  const advancedOptions = [
    <div key="Double Artifacts" className="container-primary w-full flex flex-col gap-2 items-center">
      <Button
        size="sm"
        className="relative w-full group flex items-center justify-center"
        onClick={() => {
          setDrawEnemy(false);
          setEditArena(false);
          setNumber(true);
          setEnemy(true);
          setEmpty(true);
          setPreset('Double Artifacts');
          setUnits({
            39: { unit: 'Yaphalla Cat Hex', type: 100 },
          });
          setTileData(DoubleArtifacts as unknown as number[]);
        }}
        hierarchy="warning"
        hasActiveBorder
        tooltip={
          <p className="text-sm">
            {'Warning: Strictly for Arena 1. Do not use for PVP.\n'}
            <span className="text-primary-400">Extra Artifact</span> and <span className="text-tertiary-400">Logo</span>
            {' tiles cannot be readded but\ncan be removed in '}
            <span className="text-neutral-400">Player</span>/<span className="text-hex-enemy-400">Enemy</span> Place
            mode.
          </p>
        }
      >
        Double Artifact Arena 1
      </Button>
    </div>,
    <div key="Tab Buttons" className="container-primary w-full flex flex-col gap-2 items-center">
      {<h2 className="w-full text-center text-base border-b-2 lg:text-lg">Menu Tab</h2>}
      {tabButtons.map(({ onClick, label, ...props }) => (
        <Button key={label} className="w-full" onClick={onClick} {...props} hasActiveBorder>
          {label}
        </Button>
      ))}
    </div>,
  ];

  const options = controlDivs.map(({ label, divs }) => (
    <div key={label} className="container-primary w-full flex flex-col gap-2 items-center">
      {!!label && <h2 className="w-full text-center text-base border-b-2 lg:text-lg">{label}</h2>}
      <div className="w-full flex flex-col gap-2">{divs}</div>
    </div>
  ));

  return (
    <div className="flex size-full flex-col-reverse items-center justify-between gap-2 self-start sm:w-fit sm:flex-col 2xl:w-64">
      {isDev && (
        <div className="container-primary w-full flex flex-col gap-2 items-center">
          <Toggle
            className="w-full !pl-2"
            variant="switch"
            value="Advanced Options"
            onChange={e => {
              setTab(e.target.checked ? 1 : 0);
            }}
            defaultChecked={tab === 1}
          />
          {tab === 1 && (
            <Toggle
              className="w-full !pl-2"
              variant="switch"
              value="Hide Logo"
              onChange={e => {
                setHideLogo(e.target.checked);
              }}
              defaultChecked={hideLogo}
            />
          )}
        </div>
      )}
      {tab === 1 && <div className="w-full flex flex-col gap-2 items-center grow">{advancedOptions}</div>}
      {(!isDev || tab === 0) && (
        <div className="flex w-full flex-col gap-2 items-center">
          {options[0]}
          <ArtifactGrid />
        </div>
      )}
      {options.slice(1)}
    </div>
  );
};

export default EditorSidebar;
