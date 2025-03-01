import Image from 'next/image';

import type { FC } from 'react';

import { HexPath } from '@/components/editor/types';
import { getSizeClass } from '@/components/editor/utils';
import { joinStrings } from '@/utils/utils';

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
  size?: 'md' | 'sm' | 'xs' | '2xs';
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
    isEnemy && 'base/Enemy-Overlay',
    isTalent && 'base/Talent-Selected',
    !disabled && selected && 'base/Select-Outline',
  ].filter(Boolean) as string[];

  return (
    <div
      className={joinStrings(
        'hex-icon relative group',
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
      {assetSrcs.map((imageSrc, i) => (
        <Asset key={imageSrc} imageSrc={imageSrc} zIndex={i ? `z-${i}` : undefined} />
      ))}
    </div>
  );
};

export default HexImage;
