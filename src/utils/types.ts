import { Lato } from 'next/font/google';

export const font = Lato({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-lato',
  weight: '400',
});

export const discordNames = ['camil.o'];
export const discordInviteAPI = 'https://discord.com/api/invites/yaphalla?with_counts=true';

export type HierarchyTypes = 'primary' | 'secondary' | 'tertiary' | 'warning';
export type InputSizeTypes = 'sm' | 'base';
