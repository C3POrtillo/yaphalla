'use client';
import { type FC } from 'react';

import { useFormation } from '@/components/editor/FormationProvider';
import ButtonTile from '@/components/hex-tiles/ButtonTile';
import Logo from '@/components/hex-tiles/Logo';

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
      <ButtonTile
        src={artifact || 'Artifact-Hex'}
        selected={currentArtifact === index && !hideArtifacts}
        label={artifact ? undefined : label}
        hideLabel={hideNumbers || isArtifactDisabled()}
        path="artifact"
        disabled={isArtifactDisabled()}
        hideImage={isArtifactDisabled()}
        onClick={() => setArtifact(index, artifact)}
      />
      {!isReverse && logo}
    </>
  );
};

export default ButtonArtifact;
