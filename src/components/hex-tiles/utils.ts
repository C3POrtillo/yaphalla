import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type { DragEvent } from 'react';

import { builder } from '@/sanity/client';
import { compareStrings } from '@/utils/utils';

export const getSizeClass = (size: 'md' | 'sm' | 'xs' | '2xs') => {
  if (!compareStrings(size, 'sm')) {
    return 'min-w-16';
  }
  if (!compareStrings(size, 'xs')) {
    return 'min-w-12';
  }
  if (!compareStrings(size, '2xs')) {
    return 'min-w-8';
  }

  return 'min-w-20';
};

export const createDragClone = (e: DragEvent<HTMLButtonElement>, options?: { width: `${number}rem` }) => {
  const clone = (e.currentTarget.cloneNode(true) as HTMLElement).querySelector('.hex-icon') as HTMLElement;
  clone.querySelectorAll('.drag-ignore').forEach(el => {
    el.remove();
  });
  clone.style.position = 'absolute';
  clone.style.top = '-9999px';
  clone.style.left = '-9999px';
  clone.style.zIndex = '9999';
  if (options) {
    clone.style.minWidth = options?.width;
    clone.style.maxWidth = options?.width;
  }
  document.body.appendChild(clone);

  e.dataTransfer.setDragImage(clone, clone.offsetWidth / 2, clone.offsetHeight / 2);

  requestAnimationFrame(() => {
    document.body.removeChild(clone);
  });
};

export const getHexUrl = (hex: SanityAsset) =>
  builder.image(hex!).fit('min').width(200).quality(100).format('webp').url();
