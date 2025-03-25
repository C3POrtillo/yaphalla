'use client';
import { useState } from 'react';

import type { HierarchyTypes } from '@/utils/siteTypes';
import type { ArtifactSource } from '@/utils/types';
import type { FC } from 'react';

import Accordion from '@/components/accordion/accordion';
import { useFormation } from '@/components/editor/FormationProvider';
import HexImage from '@/components/hex-tiles/HexImage';
import Button from '@/components/inputs/button/Button';
import { Artifacts, currentSeason } from '@/utils/types';
import { compareStrings, joinStrings } from '@/utils/utils';

const SelectArtifact: FC = () => {
  const [tab, setTab] = useState<ArtifactSource>(currentSeason);
  const { currentArtifact, artifactData, setArtifactData, currentTile, tileData, units, setUnits, setCurrentTile } =
    useFormation();
  const artifactDisabled = currentArtifact === undefined;
  const notArtifactTile = currentTile ? tileData[currentTile] !== 2 : true;
  const disabled = artifactDisabled && notArtifactTile;
  const key = currentArtifact ? 'enemy' : 'player';

  const getArtifactButtons = (artifacts: string[], hierarchy?: HierarchyTypes) =>
    artifacts.map(artifact => {
      const hasArtifact = artifactData[key].includes(artifact);
      const unitsHasArtifact = !!Object.values(units).filter(
        ({ unit, type }) => type === 2 && compareStrings(unit, artifact) === 0,
      ).length;
      const selected = !disabled && (hasArtifact || unitsHasArtifact);

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

              if (currentTile && tileData[currentTile] === 2) {
                setUnits(prev => {
                  const copy = { ...prev };

                  if (compareStrings(artifact, prev[currentTile]?.unit) === 0) {
                    delete copy[currentTile];
                  } else {
                    copy[currentTile] = { unit: artifact, type: tileData[currentTile] };
                  }

                  return copy;
                });

                setCurrentTile(undefined);
              }
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
      );
    });

  return (
    <>
      {Object.entries(Artifacts)
        .filter(([label]) => ['Pre-Season', currentSeason].some(check => compareStrings(label, check) === 0))
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
          {(['Seasonal', 'Pre-Season'] as const).map(label => {
            const isSeasonal = compareStrings(label, 'Seasonal') === 0;

            return (
              <Button
                key={label}
                className="w-full"
                onClick={() => {
                  setTab(isSeasonal ? currentSeason : 'Pre-Season');
                }}
                selected={tab === (isSeasonal ? currentSeason : label)}
                hasActiveBorder
              >
                {label}
              </Button>
            );
          })}
        </div>
        <div className="scroll-bar-left scroll-bar-auto max-h-80 4xl:max-h-92 overflow-y-auto">
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

export default SelectArtifact;
