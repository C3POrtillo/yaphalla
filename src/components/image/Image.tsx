'use client';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useState } from 'react';

import type { ImageType } from '@/components/image/types';
import type { FC } from 'react';

import { builder } from '@/sanity/client';
import { classMerge } from '@/utils/utils';

export interface ImageProps {
  label?: string;
  image?: ImageType | string;
  imageAlt?: string;
  className?: string;
  imageWidth?: number;
  aspectRatio?: number;
  objectFit?: 'cover';
  objectPosition?: 'center center';
  groupLoad?: boolean;
  onLoad?: () => void;
  quality?: number;
}

const ImageComponent: FC<ImageProps> = ({
  label,
  image,
  imageAlt,
  className,
  imageWidth = 800,
  aspectRatio,
  objectFit,
  objectPosition,
  groupLoad,
  onLoad,
  quality = 80,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const loading = !groupLoad && !loaded;
  if (!image) {
    return null;
  }
  const imageData = builder.image(image).fit('min').width(imageWidth).quality(quality).format('webp');
  const src = imageData.url();
  const match = src.match(/-?(\d+)x(\d+)-?/);
  if (!match) {
    return null;
  }
  const [, width, height] = match;
  const ar = aspectRatio || Number(width) / Number(height);

  const imageElements = (
    <>
      {loading && (
        <div className="flex justify-center items-center size-full text-5xl text-sky-900">
          <Icon icon="eos-icons:loading" />
        </div>
      )}
      <Image
        src={src}
        alt={imageAlt || label || ''}
        className={loading ? 'opacity-0 absolute cursor-none' : undefined}
        fill
        unoptimized
        quality={quality}
        onLoad={() => {
          setLoaded(true);
          if (onLoad) {
            onLoad();
          }
        }}
        style={{
          objectFit,
          objectPosition,
        }}
      />
    </>
  );
  const containerProps = {
    className: classMerge('image-container', className),
    style: { '--ar': ar } as React.CSSProperties,
  };

  return <div {...containerProps}>{imageElements}</div>;
};

export default ImageComponent;
