'use client';
import { useState } from 'react';

import type { ArtifactSource } from '@/components/editor/types';
import type { HierarchyTypes } from '@/utils/types';
import type { FC } from 'react';

import Accordion from '@/components/accordion/accordion';
import { useFormation } from '@/components/editor/FormationProvider';
import HexImage from '@/components/editor/HexImage';
import { Artifacts, currentSeason } from '@/components/editor/types';
import Button from '@/components/inputs/button/Button';
import { joinStrings } from '@/utils/utils';

const ArtifactGrid: FC = () => {
  const [tab, setTab] = useState<ArtifactSource>(currentSeason);
  const { currentArtifact, artifactData, setArtifactData } = useFormation();
  const disabled = currentArtifact === undefined;
  const key = currentArtifact ? 'enemy' : 'player';

  const getArtifactButtons = (artifacts: string[], hierarchy?: HierarchyTypes) =>
    artifacts.map(artifact => (
      <div key={artifact} className="relative">
        <Button
          className="w-full"
          selected={!disabled && artifactData[key].includes(artifact)}
          hierarchy={hierarchy}
          onClick={() => {
            setArtifactData(prev => {
              const updated = { ...prev };
              const currentArtifacts = updated[key] || [];

              if (currentArtifacts.includes(artifact)) {
                const filteredArtifacts = currentArtifacts.filter(a => a !== artifact);
                if (filteredArtifacts.length === 0) {
                  delete updated[key];
                  updated[key] = filteredArtifacts;
                }
              } else {
                updated[key] = [artifact];
              }

              return updated;
            });
          }}
          disabled={disabled}
          hasActiveBorder
        >
          <div className="flex flex-row gap-2 items-center w-full">
            <HexImage src={artifact} path="artifact" size="2xs" disabled />
            <p className="text-lg">{artifact}</p>
          </div>
        </Button>
      </div>
    ));

  return (
    <>
      {Object.entries(Artifacts)
        .filter(([label]) => label === 'Pre-Season' || label === currentSeason)
        .map(([label, artifacts], i) => (
          <div key={label} className="relative h-16 w-full block sm:hidden">
            <div
              className={joinStrings(
                'container-primary absolute top-0 left-0 w-full p-2 flex flex-col gap-2',
                i ? 'z-20' : 'z-30',
              )}
            >
              <Accordion label={label.includes('Season ') ? 'Seasonal' : label} keepOpen={false}>
                <div className="scroll-bar-left scroll-bar-auto inset-secondary !rounded-t-none flex flex-col p-2 gap-1 max-h-[360px] overflow-auto">
                  {getArtifactButtons(artifacts, 'tertiary')}
                </div>
              </Accordion>
            </div>
          </div>
        ))}
      <div className="container-primary hidden flex-col gap-2 items-center justify-center sm:flex ">
        <div className="w-full flex flex-col gap-2 sm:flex-row">
          {(['Seasonal', 'Pre-Season'] as const).map(label => (
            <Button
              key={label}
              className="w-full"
              onClick={() => {
                setTab(label === 'Seasonal' ? currentSeason : label);
              }}
              selected={tab === (label === 'Seasonal' ? currentSeason : label)}
              hasActiveBorder
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="scroll-bar-left scroll-bar-auto max-h-92 overflow-y-auto">
          <div className="w-52 flex flex-col gap-2">
            <div
              className={joinStrings(
                'inset-secondary flex w-full flex-col justify-center text-center p-2 gap-2',
                disabled && 'opacity-40',
              )}
            >
              <div className="flex flex-col gap-2">{getArtifactButtons(Artifacts[tab])}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtifactGrid;
