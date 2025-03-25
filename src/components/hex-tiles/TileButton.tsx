'use client';

import type { HexImageProps } from '@/components/hex-tiles/HexImage';
import type { FC } from 'react';

import HexImage from '@/components/hex-tiles/HexImage';

interface TileButtonProps extends HexImageProps {
  onClick: () => void;
  ariaLabel?: string;
}

const TileButton: FC<TileButtonProps> = ({ ariaLabel, disabled, onClick, ...props }) => (
  <button className="cursor-pointer disabled:cursor-auto" onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
    <HexImage {...props} disabled={disabled} />
  </button>
);

export default TileButton;
