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
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (disabled) {
      setIsHovered(false);
    }
  }, [disabled]);

  const overlaySrcs = [
    isEnemy && 'base/Enemy-Overlay',
    isTalent && 'base/Talent-Selected',
    !disabled && (selected || isHovered) && 'base/Select-Outline',
  ].filter(Boolean) as string[];

  const renderImage = (imageSrc: string, zIndex: string) => (
    <Image
      key={imageSrc}
      src={`${HexPath}${imageSrc}.png`}
      alt=""
      fill
      sizes="256px"
      unoptimized
      className={zIndex}
      priority
    />
  );

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
      {overlaySrcs.map((imageSrc, index) => renderImage(imageSrc, `z-${10 + index * 10}`))}
      {!hideImage && renderImage(`${path}/${src}`, 'z-0')}
    </div>
  );
};

export default HexImage;
