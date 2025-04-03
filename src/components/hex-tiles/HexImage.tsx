import Image from 'next/image';

import type { BaseHexes, ImagePath } from '@/utils/types';
import type { FC, ReactNode } from 'react';

import { exclusionClasses } from '@/components/export-image/types';
import { getPath, getSizeClass } from '@/components/hex-tiles/utils';
import Tooltip from '@/components/tooltip/Tooltip';
import { HexPath, LogoRegExp } from '@/utils/types';
import { compareStrings, joinStrings, testRegExp } from '@/utils/utils';

export interface HexImageProps {
  src: string;
  path?: ImagePath;
  selected?: boolean;
  label?: string | number;
  hideLabel?: boolean;
  hideImage?: boolean;
  disabled?: boolean;
  disabledOverlay?: boolean;
  isEnemy?: boolean;
  isSwap?: boolean;
  isTalent?: boolean;
  forceOutline?: BaseHexes | false;
  size?: 'md' | 'sm' | 'xs' | '2xs';
  tooltip?: ReactNode;
  exportIgnore?: boolean;
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
  isSwap,
  isTalent,
  size = 'md',
  tooltip,
  forceOutline,
  exportIgnore,
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
    isEnemy &&
      ['unit', 'base'].some(test => compareStrings(path, test)) &&
      !testRegExp(src, LogoRegExp) &&
      'base/Enemy-Overlay',
    !hideImage && !isEnemy && forceOutline && `${getPath(forceOutline)}/${forceOutline}`,
    isTalent && 'base/Talent-Selected',
    !disabled && selected && 'base/Select-Outline',
  ].filter(Boolean) as string[];

  return (
    <div
      className={joinStrings(
        'hex-icon relative group flex flex-row justify-center',
        !disabled && !disabledOverlay && 'hex-overlay',
        disabledOverlay && 'disabled-overlay',
        isSwap && 'swap-overlay',
        getSizeClass(size),
      )}
    >
      {!hideLabel && label && (
        <div className="absolute text-outline inset-0 z-10 flex size-full rotate-[30deg] items-center justify-center text-center text-3xl">
          {label}
        </div>
      )}
      {assetSrcs.map((imageSrc, layer) => (
        <Asset
          key={`${imageSrc}-${layer}`}
          className={exportIgnore ? exclusionClasses[0] : undefined}
          imageSrc={imageSrc}
          zIndex={layer ? `z-${layer}` : undefined}
        />
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
