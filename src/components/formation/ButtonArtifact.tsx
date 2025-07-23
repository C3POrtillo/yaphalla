'use client';

import type { CommunityLogos } from '@/components/hex-tiles/types';
import type { DragEvent, FC } from 'react';

import { useFormation } from '@/components/formation/FormationProvider';
import HexImage from '@/components/hex-tiles/HexImage';
import Logo from '@/components/hex-tiles/Logo';
import { createDragClone, getArtifactPath } from '@/components/hex-tiles/utils';

interface ButtonArtifactProps {
  index: number;
  label: string;
  hideNumbers?: boolean;
  hideArtifacts?: boolean;
  disableArtifacts?: boolean;
  hideEmptyArtifact?: boolean;
  isReverse?: boolean;
  logo?: CommunityLogos;
}

const ButtonArtifact: FC<ButtonArtifactProps> = ({
  index,
  label,
  hideNumbers,
  hideArtifacts,
  disableArtifacts,
  hideEmptyArtifact,
  isReverse,
  logo = 'dog',
}) => {
  const { currentArtifact, setArtifact, artifactData, hideLogo } = useFormation();
  const key = index === 0 ? 'player' : 'enemy';
  const artifact = !!artifactData[key].length && artifactData[key][0];
  const isArtifactDisabled = () => hideArtifacts || disableArtifacts || (hideEmptyArtifact && !artifact);
  const logoHex = <Logo logo={logo} hideLogo={hideLogo} />;

  const handleDragStart = (e: DragEvent<HTMLButtonElement>) => {
    createDragClone(e);
  };

  return (
    <>
      {isReverse && logoHex}
      <button
        className="hex-button cursor-pointer disabled:cursor-auto"
        onClick={() => setArtifact(index, artifact)}
        onDragStart={handleDragStart}
      >
        <HexImage
          src={artifact || 'Artifact-Hex'}
          selected={currentArtifact === index && !hideArtifacts}
          label={artifact ? undefined : label}
          hideLabel={hideNumbers || isArtifactDisabled()}
          path={getArtifactPath(artifact || '')}
          disabled={isArtifactDisabled()}
          hideImage={isArtifactDisabled()}
        />
      </button>
      {!isReverse && logoHex}
    </>
  );
};

export default ButtonArtifact;
