'use client';
import { useState } from 'react';

import type { HexImageProps } from '@/components/hex-tiles/HexImage';
import type { DragEvent, FC } from 'react';

import HexImage from '@/components/hex-tiles/HexImage';
import { joinStrings } from '@/utils/utils';

interface ButtonTileProps extends HexImageProps {
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
  draggable?: boolean;
  onDragStart?: (e: DragEvent<HTMLButtonElement>) => void;
  onDragOver?: (e: DragEvent<HTMLButtonElement>) => void;
  onDrop?: (e: DragEvent<HTMLButtonElement>) => void;
}

const ButtonTile: FC<ButtonTileProps> = ({
  ariaLabel,
  disabled,
  onClick,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
  className,
  ...props
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLButtonElement>) => {
    if (onDragOver) {
      onDragOver(e);
    }
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  const handleDrop = (e: DragEvent<HTMLButtonElement>) => {
    if (onDrop) {
      onDrop(e);
    }
    setIsDragOver(false);
  };

  return (
    <button
      className={joinStrings(
        'cursor-pointer',
        'disabled:cursor-auto',
        isDragOver
          ? 'scale-115 brightness-125 transition-transform duration-150 ease-out'
          : 'transition-all duration-200',
        draggable ? 'transition-all duration-150 ease-out' : 'transition-all duration-200',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={() => setIsDragOver(false)}
    >
      <HexImage disabled={disabled} draggable={draggable} {...props} />
    </button>
  );
};

export default ButtonTile;
