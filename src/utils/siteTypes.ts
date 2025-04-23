import { Langar, Lato } from 'next/font/google';

export const font = Lato({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-lato',
  weight: '400',
});

export const langar = Langar({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-langer',
  weight: '400',
});

export const discordNames = ['camil.o'];

export type HierarchyTypes = 'primary' | 'secondary' | 'tertiary' | 'warning';
export type InputSizeTypes = 'sm' | 'base';

export const themeColor = '#1a387b';

export type Cookie = `${string}=${string}; path=/; max-age=${number}`;
