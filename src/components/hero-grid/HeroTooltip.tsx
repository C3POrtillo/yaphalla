import Image from 'next/image';

import type { Faction, HeroClass, Talents } from '@/utils/types';
import type { FC } from 'react';

interface HeroTooltipProps {
  faction: Faction | Talents | '';
  hero: string;
  heroClass: HeroClass | '';
}

const HeroTooltip: FC<HeroTooltipProps> = ({ hero, faction, heroClass }) => {
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
  const imageClass = !!heroClass && createImage(heroClass, 'class');

  return (
    <div className="flex flex-row gap-1 items-center">
      {imageFaction || imageClass}
      <p className="text-xs w-max max-w-16">{hero.replaceAll('-', ' ')}</p>
      {imageClass || imageFaction}
    </div>
  );
};

export default HeroTooltip;
