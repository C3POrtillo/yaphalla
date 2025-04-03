'use client';

import type { FC } from 'react';

import { useFormation } from '@/components/formation/FormationProvider';
import HexImage from '@/components/hex-tiles/HexImage';
import Logo from '@/components/hex-tiles/Logo';
import { getArtifactPath } from '@/components/hex-tiles/utils';

interface ButtonArtifactProps {
  index: number;
  label: string;
  hideNumbers?: boolean;
  hideArtifacts?: boolean;
  disableArtifacts?: boolean;
  hideEmptyArtifact?: boolean;
  isReverse?: boolean;
  isCat?: boolean;
}

const ButtonArtifact: FC<ButtonArtifactProps> = ({
  index,
  label,
  hideNumbers,
  hideArtifacts,
  disableArtifacts,
  hideEmptyArtifact,
  isReverse,
  isCat,
}) => {
  const { currentArtifact, setArtifact, artifactData, hideLogo } = useFormation();
  const key = index === 0 ? 'player' : 'enemy';
  const artifact = !!artifactData[key].length && artifactData[key][0];
  const isArtifactDisabled = () => hideArtifacts || disableArtifacts || (hideEmptyArtifact && !artifact);
  const logo = <Logo isCat={isCat} hideLogo={hideLogo} />;

  return (
    <>
      {isReverse && logo}
      <button className="cursor-pointer disabled:cursor-auto" onClick={() => setArtifact(index, artifact)}>
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
      {!isReverse && logo}
    </>
  );
};

export default ButtonArtifact;
