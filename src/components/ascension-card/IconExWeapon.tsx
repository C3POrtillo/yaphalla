import Image from 'next/image';

import type { AscensionCardType, ExWeapon } from '@/components/ascension-card/types';
import type { FC } from 'react';

import { joinStrings } from '@/utils/utils';

interface IconExWeaponProps {
  src: ExWeapon;
  type: AscensionCardType;
  hasAlt?: boolean;
  size: `w-${number | 'full'}` | `h-${number | 'full'}`;
  className?: string;
}

const IconExWeapon: FC<IconExWeaponProps> = ({ src, type, hasAlt, size, className }) => {
  const path = type.toLowerCase();

  return (
    <div className={joinStrings(`${path}-ex-weapon`, 'relative', size, className)}>
      <Image
        src={`/assets/images/ex-weapon/${path}/${src.toLowerCase()}.png`}
        alt={hasAlt ? src : ''}
        fill
        objectFit="cover"
        objectPosition="top left"
      />
    </div>
  );
};

export default IconExWeapon;
