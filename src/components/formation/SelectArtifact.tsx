'use client';
import { useState } from 'react';

import type { HierarchyTypes } from '@/utils/siteTypes';
import type { FC } from 'react';

import Accordion from '@/components/accordion/Accordion';
import { useFormation } from '@/components/formation/FormationProvider';
import { getArtifacts } from '@/components/formation/utils';
import HexImage from '@/components/hex-tiles/HexImage';
import { getArtifactPath } from '@/components/hex-tiles/utils';
import Button from '@/components/inputs/button/Button';
import { Artifacts, CurrentSeason } from '@/utils/types';
import { compareStrings } from '@/utils/utils';

const SelectArtifact: FC = () => {
  const [tab, setTab] = useState<number>(0);
  const { currentArtifact, setCurrentArtifact, artifactData, setArtifactData, currentTile, tileData } = useFormation();
  const artifactDisabled = currentArtifact === undefined;
  const notArtifactTile = currentTile ? tileData[currentTile] !== 2 : true;
  const disabled = artifactDisabled && notArtifactTile;
  const key = currentArtifact ? 'enemy' : 'player';

  const buttonLabels = ['Seasonal', 'Pre-Season'] as const;

  const getArtifactButtons = (artifacts: string[], hierarchy?: HierarchyTypes) =>
    artifacts.map(artifact => {
      const hasArtifact = artifactData[key].includes(artifact);
      const selected = !disabled && hasArtifact;

      return (
        <div key={artifact} className="relative">
          <Button
            size="sm"
            className="w-full"
            selected={selected}
            hierarchy={hierarchy}
            onClick={() => {
              setArtifactData(prev => ({
                ...prev,
                [key]: prev[key]?.includes(artifact) ? prev[key].filter(a => a !== artifact) : [artifact],
              }));
              setCurrentArtifact(undefined);
            }}
            // disabled={disabled}
            hasActiveBorder
          >
            <div className="flex flex-row gap-2 items-center w-full">
              <HexImage
                src={artifact}
                path={getArtifactPath(artifact || '')}
                size="2xs"
                disabled
                // disabledOverlay={disabled}
              />
              <p className="text-lg">{artifact}</p>
            </div>
          </Button>
        </div>
      );
    });

  return (
    <>
      <div className="container-primary w-full flex flex-col gap-4 min-h-[124px] sm:hidden">
        {Object.entries(Artifacts)
          .filter(([label]) => [CurrentSeason, 'Pre-Season'].some(valid => !compareStrings(valid, label)))
          .map(([label, artifacts]) => (
            <div key={label} className="relative h-10 w-full">
              <Accordion label={`${label.includes('Season ') ? 'Seasonal' : label} Artifacts`} keepOpen={false}>
                <div className="scroll-bar-left scroll-bar-auto inset-primary !rounded-t-none flex flex-col p-2 gap-1 max-h-[360px] overflow-auto z-100">
                  {getArtifactButtons(artifacts, 'tertiary')}
                </div>
              </Accordion>
            </div>
          ))}
      </div>
      <div className="container-primary hidden w-full flex-col gap-2 items-center justify-center sm:flex ">
        <div className="w-full flex flex-col gap-2 inset-black">
          {buttonLabels.map((label, i) => (
            <Button
              key={label}
              className="w-full"
              size="sm"
              onClick={() => {
                setTab(i);
              }}
              selected={tab === i}
              hierarchy="tertiary"
              hasActiveBorder
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="inset-black scroll-bar-left scroll-bar-auto scroll-bar-thin w-full max-h-142 overflow-y-auto !pl-1 !pr-0">
          <div className="flex flex-col gap-1">{getArtifactButtons(getArtifacts(tab), 'tertiary')}</div>
        </div>
      </div>
    </>
  );
};

export default SelectArtifact;
