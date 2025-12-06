import Image from 'next/image';

import type { Class, Damage, Faction, Tier } from '@/sanity/types';
import type { InputSizeTypes } from '@/utils/siteTypes';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type { FC } from 'react';

import { getDetailIconSize } from '@/components/unit-data/utils';
import { builder } from '@/sanity/client';
import { classMerge } from '@/utils/utils';

interface IconDetail {
  asset?: {
    name?: string;
    image?: SanityAsset;
  };
  icon?: string | null;
  alt?: string;
  size?: InputSizeTypes;
  className?: string;
}

const IconDetail: FC<IconDetail> = ({ asset, icon, alt, size = 'base', className }) => {
  if (typeof icon !== 'string' && (!asset || !asset.image)) {
    return null;
  }
  const src =
    typeof icon === 'string'
      ? icon
      : builder.image(asset!.image!).fit('min').width(40).quality(100).format('webp').url();

  return (
    <div
      className={classMerge(
        'aspect-square group relative flex justify-center items-center',
        className || getDetailIconSize(size),
      )}
    >
      <Image src={src} alt={alt || asset?.name || ''} fill sizes="64px" unoptimized priority />
    </div>
  );
};

export default IconDetail;
