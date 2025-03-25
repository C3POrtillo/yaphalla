import Image from 'next/image';

import type { Faction, Talents, UnitClass } from '@/utils/types';
import type { FC } from 'react';

interface UnitTooltipProps {
  faction: Faction | Talents | '';
  unit: string;
  unitClass: UnitClass | '';
}

const UnitTooltip: FC<UnitTooltipProps> = ({ unit, faction, unitClass }) => {
  const createImage = (string: string, path: 'factions' | 'class') => (
    <div className="relative size-5 min-w-5">
      <Image
        src={`/assets/images/${path}/${string.toLocaleLowerCase()}.png`}
        alt={string}
        fill
        sizes="64px"
        unoptimized
        priority
      />
    </div>
  );

  const imageFaction = !!faction && createImage(faction, 'factions');
  const imageClass = !!unitClass && createImage(unitClass, 'class');

  return (
    <div className="flex flex-row gap-1 items-center">
      {imageFaction || imageClass}
      <p className="text-xs w-max max-w-16">{unit}</p>
      {imageClass || imageFaction}
    </div>
  );
};

export default UnitTooltip;
