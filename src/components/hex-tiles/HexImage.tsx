import Image from 'next/image';

import type { BaseHexes, ImagePath } from '@/utils/types';
import type { FC } from 'react';

import { exclusionClasses } from '@/components/export-image/types';
import { getPath, getSizeClass } from '@/components/hex-tiles/utils';
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
  exportIgnore?: boolean;
  draggable?: boolean;
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
  forceOutline,
  exportIgnore,
  draggable = false,
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
    isSwap && 'base/Swap-Overlay',
  ].filter(Boolean) as string[];

  return (
    <div
      className={joinStrings(
        'hex-icon relative',
        !disabled && 'hex-overlay',
        disabledOverlay && 'disabled-overlay',
        getSizeClass(size),
        draggable && 'transition-all duration-150 ease-out',
        draggable && 'hover:scale-105 hover:z-[1] hover:cursor-grab hover:brightness-110',
        draggable && 'active:scale-100 active:z-[1] active:cursor-grabbing',
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
    </div>
  );
};

export default HexImage;
