'use client'
import Image from 'next/image';

import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type { FC } from 'react';

import { builder } from '@/sanity/client';

interface ButtonFilterProps {
  src: SanityAsset;
  alt: string;
  selected: boolean;
  onClick: () => void;
}

const ButtonFilter: FC<ButtonFilterProps> = ({ src, alt, selected, onClick }) => (
  <button onClick={onClick} className="relative size-8 cursor-pointer">
    {!selected && (
      <div className="ease-in-out absolute top-0 z-10 size-8 rounded-full bg-black opacity-50 hover:opacity-0"></div>
    )}
    <Image
      src={builder.image(src).fit('min').width(40).quality(100).format('webp').url()}
      alt={alt}
      fill
      sizes="64px"
      unoptimized
      priority
    />
  </button>
);

export default ButtonFilter;
