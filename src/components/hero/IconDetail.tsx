import Image from 'next/image';

import type { InputSizeTypes } from '@/utils/siteTypes';
import type { FC } from 'react';

import { getDetailIconSize, getDetailSrc } from '@/components/hero/utils';
import { joinStrings } from '@/utils/utils';

interface IconDetail {
  src: string;
  size?: InputSizeTypes;
  className?: string;
}

const IconDetail: FC<IconDetail> = ({ src, size = 'base', className }) => {
  const formattedSrc = getDetailSrc(src);

  return (
    <div
      className={joinStrings(
        'aspect-square group relative flex justify-center items-center',
        className || getDetailIconSize(size),
      )}
    >
      <Image key={formattedSrc} src={formattedSrc} alt={formattedSrc} fill sizes="64px" unoptimized priority />
    </div>
  );
};

export default IconDetail;
