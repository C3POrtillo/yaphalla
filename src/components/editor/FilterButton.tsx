import Image from 'next/image';

import type { Faction, UnitClass } from '@/components/editor/types';
import type { FC } from 'react';

interface FilterButtonProps {
  src: UnitClass | Faction;
  path: 'class' | 'factions';
  selected: boolean;
  onClick: () => void;
}

const FilterButton: FC<FilterButtonProps> = ({ src, path, selected, onClick }) => (
  <button onClick={onClick} className="relative size-10 cursor-pointer">
    {!selected && <div className="absolute top-0 z-10 size-10 rounded-full bg-black opacity-50 hover:opacity-0"></div>}
    <Image
      src={`/assets/images/${path}/${src.toLocaleLowerCase()}.png`}
      alt={src}
      fill
      sizes="256px"
      unoptimized
      priority
    />
  </button>
);

export default FilterButton;
