import Image from 'next/image';

import type { Ascension } from '@/utils/types';
import type { FC } from 'react';

import { compareStrings, joinStrings } from '@/utils/utils';

interface IconAscensionProps {
  src: Ascension;
  hasAlt?: boolean;
  size: `w-${number | 'full'}` | `h-${number | 'full'}`;
}

const IconAscension: FC<IconAscensionProps> = ({ src, hasAlt, size }) => {
  if (!compareStrings(src, 'None')) {
    return null;
  }

  return (
    <div className={joinStrings('ascension-icon relative', size)}>
      <Image
        src={`/assets/images/ascension/icon/${src.toLowerCase()}.png`}
        alt={hasAlt ? src : ''}
        fill
        objectFit="cover"
      />
    </div>
  );
};

export default IconAscension;
