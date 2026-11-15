import Image from 'next/image';

import type { AscensionCardType, ExWeapon } from '@/components/ascension-card/types';
import type { FC } from 'react';

import { getSrc } from '@/components/ascension-card/utils';
import { compareStrings, getImageURL, joinStrings } from '@/utils/utils';

interface IconExWeaponProps {
  src: ExWeapon;
  type: AscensionCardType;
  hasAlt?: boolean;
  size: `w-${number | 'full'}` | `h-${number | 'full'}`;
  className?: string;
}

const IconExWeapon: FC<IconExWeaponProps> = ({ src, type, hasAlt, size, className }) => {
  const path = type.toLowerCase();
  if (!compareStrings(src, 'None')) {
    return null;
  }

  return (
    <div className={joinStrings(`${path}-ex-weapon`, 'relative', size, className)}>
      <Image
        src={getImageURL(`/assets/images/ex-weapon/${path}/${getSrc(src, true)}.png`)}
        alt={hasAlt ? src : ''}
        fill
        objectFit="cover"
      />
    </div>
  );
};

export default IconExWeapon;
