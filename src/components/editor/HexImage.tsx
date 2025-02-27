import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
  const [isHovered, setIsHovered] = useState(false);
  const hexRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (hexRef.current && !hexRef.current.contains(event.target as Node)) {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    if (disabled) {
      setIsHovered(false);
    }
  }, [disabled]);

  useEffect(() => {
    if (isHovered) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isHovered]);

  const overlaySrcs = [
    isEnemy && 'base/Enemy-Overlay',
    isTalent && 'base/Talent-Selected',
    !disabled && (selected || isHovered) && 'base/Select-Outline',
  ].filter(Boolean) as string[];

  const Asset: FC<{ imageSrc: string; zIndex?: string }> = ({ imageSrc, zIndex = 'z-0' }) => (
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
      ref={hexRef}
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
      {overlaySrcs.map((imageSrc, index) => (
        <Asset key={imageSrc} imageSrc={imageSrc} zIndex={`z-${10 + index * 10}`} />
      ))}
      {!hideImage && <Asset imageSrc={`${path}/${src}`} />}
    </div>
  );
};

export default HexImage;
