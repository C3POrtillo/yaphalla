'use-client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import type { FC } from 'react';

import { useFormation } from '@/components/formation/FormationProvider';
import ArtifactGrid from '@/components/formation/SelectArtifact';
// import { DoubleArtifacts } from '@/components/formation/types';
import { getDrawImage } from '@/components/formation/utils';
import HexImage from '@/components/hex-tiles/HexImage';
import Button from '@/components/inputs/button/Button';
import Toggle from '@/components/inputs/toggle/Toggle';
import { isDevMode } from '@/utils/utils';

const EditorSidebar: FC = () => {
  const {
    drawType,
    setCurrentTile,
    setCurrentArtifact,
    setDrawType,
    setEditArena,
    subMenu,
    setSubMenu,
    isEditArena,
    hideLogo,
    setHideLogo,
    background,
    setBackground,
    tab, setTab
  } = useFormation();
  const searchParams = useSearchParams();
  const isDev = isDevMode(searchParams);
  const isDevAdvanced = isDev && tab === 1;

  const spanPlayer = <span className="text-neutral-300">Player</span>;
  const spanEnemy = <span className="text-hex-enemy-400">Enemy</span>;
  const spanBreakable = <span className="text-yellow-700">Breakable</span>;
  const spanUnbreakable = <span className="text-zinc-400">Unbreakable</span>;
  const spanArtifact = <span className="text-primary-400">Artifact</span>;
  // const spanLogo = <span className="text-tertiary-400">Logo</span>;

  const tabProps = [
    {
      label: 'Artifacts',
      tooltip: (
        <p className="text-sm">
          {'Select '}
          {spanArtifact}.
        </p>
      ),
    },
    {
      label: 'Tiles',
      tooltip: (
        <p className="text-sm">
          Place {spanPlayer}, {spanEnemy}
          {', '}
          {spanBreakable}
          {',\n and '}
          {spanUnbreakable} tiles
        </p>
      ),
    },
  ] as const;

  const getPlaceProps = (label: string, type: number) => ({
    label,
    selected: isEditArena && drawType === type,
    onClick: () => {
      setDrawType(type);
      setEditArena(true);
      setCurrentTile(undefined);
      setCurrentArtifact(undefined);
    },
  });

  const placeProps = [
    getPlaceProps('Player', 1),
    getPlaceProps('Enemy', -1),
    getPlaceProps('Breakable', -2),
    getPlaceProps('Unbreakable', -3),
    {
      label: 'Unit',
      selected: !isEditArena,
      onClick: () => {
        setEditArena(false);
      },
    },
  ] as const;

  const subMenuProps = [
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
      divs: placeProps.map(({ onClick, label, selected }) => (
        <Button key={label} size="sm" className="w-full" onClick={onClick} selected={selected} hasActiveBorder>
          <div className="flex flex-row gap-2 items-center">
            <HexImage {...getDrawImage(label, !!background)} size="2xs" disabledOverlay={selected} />
            <span>{label}</span>
          </div>
        </Button>
      )),
    },
  ] as const;

  const advancedOptions = [
    // <div key="Double Artifacts" className="container-primary w-full flex flex-col gap-2 items-center">
    //   <Button
    //     size="sm"
    //     className="w-full flex items-center justify-center"
    //     onClick={() => {
    //       setDrawType(1);
    //       setEditArena(false);
    //       setNumber(true);
    //       setEnemy(true);
    //       setEmpty(true);
    //       setPreset('Double Artifacts');
    //       setUnits({
    //         39: { unit: 'Yaphalla Cat Hex', type: 100 },
    //       });
    //       setTileData(DoubleArtifacts as unknown as number[]);
    //     }}
    //     hierarchy="warning"
    //     hasActiveBorder
    //     tooltip={
    //       <p className="text-sm">
    //         <span className="text-red-500">Warning:</span>
    //         {' Strictly for Arena 1. Do not use for PVP.\n'}
    //         Extra {spanArtifact}
    //         {' and '}
    //         {spanLogo}
    //         {' tiles cannot be readded but\ncan be replaced with a '}
    //         {spanPlayer}, {spanEnemy}, {spanBreakable}
    //         {',\n'}
    //         {spanUnbreakable} tile
    //       </p>
    //     }
    //     solidTooltip
    //   >
    //     Double Artifact Arena 1
    //   </Button>
    // </div>,
    <div key="Tab Buttons" className="container-primary w-full flex flex-col gap-2 items-center">
      {<h2 className="w-full text-center text-base border-b-2 lg:text-lg">Menu Tab</h2>}
      {subMenuProps.map(({ onClick, label, ...props }) => (
        <Button key={label} className="w-full" size="sm" onClick={onClick} {...props} hasActiveBorder>
          {label}
        </Button>
      ))}
    </div>,
  ];

  const options = controlDivs.map(
    ({ label, divs }) =>
      !!divs && (
        <div key={label} className="container-primary w-full flex flex-col gap-2 items-center">
          {!!label && <h2 className="w-full text-center text-base border-b-2 lg:text-lg">{label}</h2>}
          <div className="w-full flex flex-col gap-2">{divs}</div>
        </div>
      ),
  );

  return (
    <div className="flex size-full flex-col items-center justify-start gap-2 self-start sm:w-fit sm:flex-col 2xl:w-64">
      <div className="container-primary w-full flex flex-col gap-2 items-center">
        <div className="w-full flex flex-row gap-2">
          {tabProps.map(({ label, tooltip }, i) => (
            <Button
              key={label}
              className="w-full flex items-center justify-center"
              size="sm"
              selected={tab === i}
              hasActiveBorder
              tooltip={tooltip}
              solidTooltip
              onClick={() => setTab(i)}
            >
              {label}
            </Button>
          ))}
        </div>
        {tab === 1 && (
          <Toggle
            className="w-full"
            variant="switch"
            value="sidebar-background"
            activeLabel="Background"
            onChange={e => {
              setBackground(e.target.checked);
            }}
            defaultChecked={background}
          />
        )}
        {isDevAdvanced && (
          <Toggle
            className="w-full"
            variant="switch"
            value="Hide Logo"
            onChange={e => {
              setHideLogo(e.target.checked);
            }}
            defaultChecked={hideLogo}
          />
        )}
      </div>
      <div className="flex w-full flex-col gap-2 items-center">
        {tab === 0 && <ArtifactGrid />}
        {tab === 1 && <div className="w-full flex flex-col gap-2 items-center">{options}</div>}
        {isDevAdvanced && <div className="w-full flex flex-col gap-2 items-center">{advancedOptions}</div>}
      </div>
    </div>
  );
};

export default EditorSidebar;
