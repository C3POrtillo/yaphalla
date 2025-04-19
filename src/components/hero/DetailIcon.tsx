import Image from 'next/image';

import type { FC } from 'react';

import { getDetailSrc } from '@/components/hero/utils';

interface DetailIconProps {
  src: string;
}

const DetailIcon: FC<DetailIconProps> = ({ src }) => (
  <div className="group relative size-8 flex justify-center items-center">
    <Image key={src} src={getDetailSrc(src)} alt={src} fill sizes="64px" unoptimized priority />
  </div>
);

export default DetailIcon;
