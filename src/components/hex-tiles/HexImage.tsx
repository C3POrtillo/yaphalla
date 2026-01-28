import Image from 'next/image';

import type { HexAsset } from '@/sanity/types';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type { FC, ReactNode } from 'react';

import { exclusionClasses } from '@/components/export-image/types';
import { getHexUrl, getSizeClass } from '@/components/hex-tiles/utils';
import Tooltip from '@/components/tooltip/Tooltip';
import { classMerge } from '@/utils/utils';

export interface HexImageProps {
  src: HexAsset | SanityAsset | undefined;
  manualSrc?: string;
  selected?: boolean;
  label?: string | number;
  hideLabel?: boolean;
  hideImage?: boolean;
  disabled?: boolean;
  disabledOverlay?: boolean;
  isEnemy?: boolean;
  isSwap?: boolean;
  isTalent?: boolean;
  forceOutline?: HexAsset | SanityAsset | false;
  size?: 'md' | 'sm' | 'xs' | '2xs';
  exportIgnore?: boolean;
  tooltip?: ReactNode;
  draggable?: boolean;
}

const HexImage: FC<HexImageProps> = ({
  src,
  manualSrc,
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
  tooltip,
  draggable = false,
}) => {
  if (!src && !manualSrc) {
    return;
  }

  const Asset: FC<{ imageSrc: SanityAsset | string; zIndex?: `z-${number}`; className?: string }> = ({
    imageSrc,
    zIndex,
    className,
  }) => {
    const isString = typeof imageSrc === 'string';
    const key = isString ? imageSrc : imageSrc._id;

    return (
      <Image
        key={key}
        className={classMerge(className, zIndex)}
        src={isString ? `/assets/images/hexes/${imageSrc}.png` : getHexUrl(imageSrc)}
        alt=""
        fill
        sizes="256px"
        unoptimized
        priority
      />
    );
  };
  const isHexAsset = src?._type === 'hexAsset';
  let hexSrc = src || (manualSrc && `unit/${manualSrc}`);
  if (isHexAsset) {
    const { image } = src as HexAsset;
    if (image) {
      hexSrc = image;
    }
  }
  const assetSrcs = [
    !hideImage && hexSrc,
    isEnemy && !isHexAsset && 'base/Enemy-Overlay',
    // !hideImage && !isEnemy && forceOutline && `${getPath(forceOutline)}/${forceOutline}`,
    !disabled && isTalent && 'base/Talent-Selected',
    !disabled && selected && 'base/Select-Outline',
    isSwap && 'base/Swap-Overlay',
  ].filter(Boolean) as string[];

  return (
    <div
      className={classMerge(
        'hex-icon relative group',
        (!disabled || draggable) && 'hex-overlay',
        disabledOverlay && 'disabled-overlay',
        getSizeClass(size),
        draggable && 'transition-all duration-150 ease-out',
        draggable && 'hover:z-[1] hover:cursor-grab',
        draggable && 'active:z-[1] active:cursor-grabbing',
      )}
    >
      {!hideLabel && label && (
        <div className="select-none absolute text-outline inset-0 z-10 flex size-full rotate-[30deg] items-center justify-center text-center text-3xl">
          {label}
        </div>
      )}
      {assetSrcs.map((imageSrc, layer) => (
        <Asset
          key={`${imageSrc}-${layer}`}
          className={classMerge(exportIgnore && exclusionClasses[0], layer > 0 && 'drag-ignore')}
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
