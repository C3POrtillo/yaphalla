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
import { Artifacts } from '@/utils/types';
import { joinStrings } from '@/utils/utils';

const SelectArtifact: FC = () => {
  const [tab, setTab] = useState<number>(0);
  const { currentArtifact, artifactData, setArtifactData, currentTile, tileData } = useFormation();
  const artifactDisabled = currentArtifact === undefined;
  const notArtifactTile = currentTile ? tileData[currentTile] !== 2 : true;
  const disabled = artifactDisabled && notArtifactTile;
  const key = currentArtifact ? 'enemy' : 'player';

  const buttonLabels = ['Seasonal', 'Pre-Season', 'Honor Duel'] as const;

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
              if (!artifactDisabled) {
                setArtifactData(prev => ({
                  ...prev,
                  [key]: prev[key]?.includes(artifact) ? prev[key].filter(a => a !== artifact) : [artifact],
                }));
              }
            }}
            disabled={disabled}
            hasActiveBorder
          >
            <div className="flex flex-row gap-2 items-center w-full">
              <HexImage src={artifact} path={getArtifactPath(artifact || '')} size="2xs" disabled />
              <p className="text-lg">{artifact}</p>
            </div>
          </Button>
        </div>
      );
    });

  return (
    <>
      <div className="container-primary w-full flex flex-col gap-2 sm:hidden">
        {Object.entries(Artifacts).map(([label, artifacts]) => (
          <div key={label} className="relative h-10 w-full">
            <Accordion label={`${label.includes('Season ') ? 'Seasonal' : label} Artifacts`} keepOpen={false}>
              <div className="scroll-bar-left scroll-bar-auto inset-secondary !rounded-t-none flex flex-col p-2 gap-1 max-h-[360px] overflow-auto z-100">
                {getArtifactButtons(artifacts, 'tertiary')}
              </div>
            </Accordion>
          </div>
        ))}
      </div>
      <div className="container-primary hidden w-full flex-col gap-2 items-center justify-center sm:flex ">
        <div className="w-full flex flex-col gap-2">
          {buttonLabels.map((label, i) => (
            <Button
              key={label}
              className="w-full"
              size="sm"
              onClick={() => {
                setTab(i);
              }}
              selected={tab === i}
              hasActiveBorder
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="scroll-bar-left scroll-bar-auto scroll-bar-thin w-full max-h-142 overflow-y-auto">
          <div className="w-full flex flex-col gap-2">
            <div
              className={joinStrings(
                'inset-secondary flex w-full flex-col justify-center text-center p-2 gap-2',
                disabled && 'opacity-40',
              )}
            >
              <div className="flex flex-col gap-1">{getArtifactButtons(getArtifacts(tab))}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectArtifact;
