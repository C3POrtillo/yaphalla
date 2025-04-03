'use client';
import type { HexImageProps } from '@/components/hex-tiles/HexImage';
import type { FC } from 'react';

import HexImage from '@/components/hex-tiles/HexImage';

interface ButtonTileProps extends HexImageProps {
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
}

const ButtonTile: FC<ButtonTileProps> = ({ ariaLabel, disabled, onClick, ...props }) => (
  <button className="cursor-pointer disabled:cursor-auto" onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
    <HexImage disabled={disabled} {...props} />
  </button>
);

export default ButtonTile;
