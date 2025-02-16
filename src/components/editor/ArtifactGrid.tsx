import type { FC } from 'react';

import { useFormation } from '@/components/editor/FormationProvider';
import HexImage from '@/components/editor/HexImage';
import { Artifacts } from '@/components/editor/types';
import Button from '@/components/inputs/button/Button';
import { joinStrings } from '@/utils/utils';

const ArtifactGrid: FC = () => {
  const { currentArtifact, artifactData, setArtifactData } = useFormation();
  const disabled = currentArtifact === undefined;
  const key = currentArtifact ? 'enemy' : 'player';

  const artifactDivs = Object.entries(Artifacts)
    .map(([source, artifacts]) => (
      <div
        key={source}
        className={joinStrings(
          'inset-secondary flex w-full flex-col justify-center text-center p-2 gap-2',
          disabled && 'opacity-40',
        )}
      >
        <h3 className="text-2xl">{source}</h3>
        <div className="grid grid-cols-2 px-2 gap-2 md:grid-cols-none md:grid-rows-3 md:grid-flow-col 3xl:grid-rows-2">
          {artifacts.map(artifact => (
            <div key={artifact} className="relative">
              <Button
                className="w-full"
                selected={!disabled && artifactData[key].includes(artifact)}
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
              >
                <div className="flex flex-row gap-2 items-center w-full">
                  <HexImage src={artifact} path="artifact" size="xs" disabled />
                  <h4 className="text-lg">{artifact}</h4>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>
    ))
    .reverse();

  return (
    <div className="container-primary flex flex-col gap-2 items-center justify-center">
      <h2 className="pt-1 text-3xl">Artifacts</h2>
      <div className="flex flex-col xl:flex-row gap-2">{artifactDivs}</div>
    </div>
  );
};

export default ArtifactGrid;
