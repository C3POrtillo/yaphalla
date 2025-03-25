import Image from 'next/image';

import type { BaseHexes } from '@/components/editor/types';
import type { FC, ReactNode } from 'react';

import { HexPath, LogoRegExp } from '@/components/editor/types';
import { getSizeClass, testRegex } from '@/components/editor/utils';
import Tooltip from '@/components/tooltip/Tooltip';
import { compareStrings, joinStrings } from '@/utils/utils';

export interface HexImageProps {
  src: string;
  path?: 'base' | 'unit' | 'artifact';
  selected?: boolean;
  label?: string | number;
  hideLabel?: boolean;
  hideImage?: boolean;
  disabled?: boolean;
  disabledOverlay?: boolean;
  isEnemy?: boolean;
  isTalent?: boolean;
  forceOutline?: BaseHexes | false;
  size?: 'md' | 'sm' | 'xs' | '2xs';
  tooltip?: ReactNode;
}

const HexImage: FC<HexImageProps> = ({
  src,
  path = 'base',
  selected,
  label,
  hideLabel,
  hideImage,
  disabled,
  disabledOverlay,
  isEnemy,
  isTalent,
  size = 'md',
  tooltip,
  forceOutline,
}) => {
  const Asset: FC<{ imageSrc: string; zIndex?: `z-${number}`; className?: string }> = ({
    imageSrc,
    zIndex,
    className,
  }) => (
    <Image
      key={imageSrc}
      className={joinStrings(className, zIndex)}
      src={`${HexPath}${imageSrc}.png`}
      alt=""
      fill
      sizes="256px"
      unoptimized
      priority
    />
  );

  const assetSrcs = [
    !hideImage && `${path}/${src}`,
    isEnemy && compareStrings(path, 'unit') === 0 && !testRegex(src, LogoRegExp) && 'base/Enemy-Overlay',
    !hideImage && !isEnemy && forceOutline && `base/${forceOutline}`,
    isTalent && 'base/Talent-Selected',
    !disabled && selected && 'base/Select-Outline',
  ].filter(Boolean) as string[];

  return (
    <div
      className={joinStrings(
        'hex-icon relative group flex flex-row justify-center',
        !disabled && !disabledOverlay && 'hex-overlay',
        disabledOverlay && 'disabled-overlay',
        getSizeClass(size),
      )}
    >
      {!hideLabel && label && (
        <div className="absolute inset-0 z-10 flex size-full rotate-[30deg] items-center justify-center text-center text-3xl">
          {label}
        </div>
      )}
      {assetSrcs.map((imageSrc, layer) => (
        <Asset key={`${imageSrc}-${layer}`} imageSrc={imageSrc} zIndex={layer ? `z-${layer}` : undefined} />
      ))}
      {tooltip && (
        <Tooltip className="text-xs bottom-0 translate-y-2/3" preWrapText={false}>
          {tooltip}
        </Tooltip>
      )}
    </div>
  );
};

export default HexImage;
