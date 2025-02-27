'use client';

import type { HexImageProps } from '@/components/editor/HexImage';
import type { FC } from 'react';

import HexImage from '@/components/editor/HexImage';

interface TileButtonProps extends HexImageProps {
  onClick: () => void;
}

const TileButton: FC<TileButtonProps> = ({ disabled, onClick, ...props }) => (
  <button className="cursor-pointer disabled:cursor-auto" onClick={onClick} disabled={disabled}>
    <HexImage {...props} disabled={disabled} />
  </button>
);

export default TileButton;
