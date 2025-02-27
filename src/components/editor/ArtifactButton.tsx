'use client';

import type { FC } from 'react';

import { useFormation } from '@/components/editor/FormationProvider';
import HexImage from '@/components/editor/HexImage';
import Logo from '@/components/editor/Logo';

interface ArtifactButtonProps {
  index: number;
  label: string;
  hideNumbers?: boolean;
  hideArtifacts?: boolean;
  disableArtifacts?: boolean;
  hideEmptyArtifact?: boolean;
  isReverse?: boolean;
  isCat?: boolean;
}

const ArtifactButton: FC<ArtifactButtonProps> = ({
  index,
  label,
  hideNumbers,
  hideArtifacts,
  disableArtifacts,
  hideEmptyArtifact,
  isReverse,
  isCat,
}) => {
  const { currentArtifact, setArtifact, artifactData } = useFormation();
  const key = index === 0 ? 'player' : 'enemy';
  const artifact = !!artifactData[key].length && artifactData[key][0];
  const isArtifactDisabled = () => hideArtifacts || disableArtifacts || (hideEmptyArtifact && !artifact);
  const logo = <Logo isCat={isCat} />;

  return (
    <>
      {isReverse && logo}
      <button
        className="cursor-pointer disabled:cursor-auto"
        onClick={() => setArtifact(index, artifact)}
        disabled={isArtifactDisabled()}
      >
        <HexImage
          src={artifact || 'Artifact-Hex'}
          selected={currentArtifact === index && !hideArtifacts}
          label={artifact ? undefined : label}
          hideLabel={hideNumbers || isArtifactDisabled()}
          path="artifact"
          disabled={isArtifactDisabled()}
          hideImage={isArtifactDisabled()}
        />
      </button>
      {!isReverse && logo}
    </>
  );
};

export default ArtifactButton;
