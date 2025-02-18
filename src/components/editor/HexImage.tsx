import Image from 'next/image';
import { useEffect, useState } from 'react';

import type { FC } from 'react';

import { HexPath } from '@/components/editor/types';
import { getSizeClass } from '@/components/editor/utils';
import { joinStrings } from '@/utils/utils';

interface HexImageProps {
  src: string;
  path?: 'base' | 'unit' | 'artifact';
  selected?: boolean;
  label?: string | number;
  hideLabel?: boolean;
  hideImage?: boolean;
  disabled?: boolean;
  disabledOverlay?: boolean;
  isEnemy?: boolean;
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
  size = 'md',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (disabled) {
      setIsHovered(false);
    }
  }, [disabled]);

  return (
    <div
      className={joinStrings(
        'hex-icon relative',
        !disabled && !disabledOverlay && 'hex-overlay',
        disabledOverlay && 'disabled-overlay',
        getSizeClass(size),
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!hideLabel && label && (
        <div className="absolute inset-0 z-10 flex size-full rotate-[30deg] items-center justify-center text-center text-3xl">
          {label}
        </div>
      )}
      {isEnemy && (
        <Image
          src={`${HexPath}base/Enemy-Overlay.png`}
          alt=""
          fill
          sizes="256px"
          unoptimized
          className="z-10"
          priority
        />
      )}
      {!disabled && (selected || isHovered) && (
        <Image
          src={`${HexPath}base/Select-Outline.png`}
          alt=""
          fill
          sizes="256px"
          unoptimized
          className="z-10"
          priority
        />
      )}
      {!hideImage && <Image src={`${HexPath}${path}/${src}.png`} alt={src} fill sizes="256px" unoptimized priority />}
    </div>
  );
};

export default HexImage;
