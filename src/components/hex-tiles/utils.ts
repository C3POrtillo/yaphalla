import { compareStrings } from '@/utils/utils';

export const getSizeClass = (size: 'md' | 'sm' | 'xs' | '2xs') => {
  if (compareStrings(size, 'sm') === 0) {
    return 'min-w-16';
  }
  if (compareStrings(size, 'xs') === 0) {
    return 'min-w-12';
  }
  if (compareStrings(size, '2xs') === 0) {
    return 'min-w-8';
  }

  return 'min-w-20';
};
