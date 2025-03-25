import Image from 'next/image';

import type { Faction, UnitClass } from '@/utils/types';
import type { FC } from 'react';

interface ButtonFilterProps {
  src: UnitClass | Faction;
  path: 'class' | 'factions';
  selected: boolean;
  onClick: () => void;
}

const ButtonFilter: FC<ButtonFilterProps> = ({ src, path, selected, onClick }) => (
  <button onClick={onClick} className="relative size-8 cursor-pointer">
    {!selected && (
      <div className="ease-in-out absolute top-0 z-10 size-8 rounded-full bg-black opacity-50 hover:opacity-0"></div>
    )}
    <Image
      src={`/assets/images/${path}/${src.toLocaleLowerCase()}.png`}
      alt={src}
      fill
      sizes="64px"
      unoptimized
      priority
    />
  </button>
);

export default ButtonFilter;
