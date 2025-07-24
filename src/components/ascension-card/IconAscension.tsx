import Image from 'next/image';

import type { Ascension } from '@/utils/types';
import type { FC } from 'react';

import { joinStrings } from '@/utils/utils';

interface IconAscensionProps {
  src: Ascension;
  hasAlt?: boolean;
  size: `w-${number | 'full'}` | `h-${number | 'full'}`;
}

const IconAscension: FC<IconAscensionProps> = ({ src, hasAlt, size }) => (
  <div className={joinStrings('ascension-icon relative', size)}>
    <Image
      src={`/assets/images/ascension/icon/${src.toLowerCase()}.png`}
      alt={hasAlt ? src : ''}
      fill={true}
      objectFit="cover"
      objectPosition="top left"
    />
  </div>
);

export default IconAscension;
