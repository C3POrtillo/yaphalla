'use client';
import { useRef, useState } from 'react';

import type { HexImageProps } from '@/components/hex-tiles/HexImage';
import type { DragEvent, FC, ReactNode } from 'react';

import HexImage from '@/components/hex-tiles/HexImage';
import Tooltip from '@/components/tooltip/Tooltip';
import { joinStrings } from '@/utils/utils';

interface ButtonTileProps extends HexImageProps {
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
  tooltip?: ReactNode;
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
  tooltip,
  selected,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleDragStart = (e: DragEvent<HTMLButtonElement>) => {
    if (onDragStart) {
      onDragStart(e);
    }

    const clone = e.currentTarget.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.top = '-9999px';
    clone.style.left = '-9999px';
    clone.style.zIndex = '9999';
    document.body.appendChild(clone);

    e.dataTransfer.setDragImage(clone, clone.offsetWidth / 2, clone.offsetHeight / 2);

    requestAnimationFrame(() => {
      document.body.removeChild(clone);
    });
  };

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
    <div className="flex justify-center relative pointer-events-none">
      <button
        ref={ref}
        className={joinStrings(
          'hex-button cursor-pointer peer pointer-events-auto disabled:cursor-auto ',
          isDragOver && 'scale-105',
          draggable && 'hover:scale-105',
          className,
        )}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        draggable={draggable}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragEnd={() => setIsDragOver(false)}
      >
        <HexImage disabled={disabled} draggable={draggable} selected={selected || isDragOver} {...props} />
      </button>
      {tooltip && (
        <Tooltip className="text-xs bottom-0 translate-y-2/3 text-center" preWrapText={false}>
          {tooltip}
        </Tooltip>
      )}
    </div>
  );
};

export default ButtonTile;
