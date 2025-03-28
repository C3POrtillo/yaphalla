import { redirects } from '@/utils/pathsRedirect';

export const domain = 'yaphalla.com' as const;
export type PathType = {
  href?: string;
  label?: string;
  options?: PathType[];
};

export const socials = {
  Discord: {
    site: 'discord',
    href: 'https://discord.gg/yaphalla',
  },
  X: {
    site: 'x-twitter',
    href: 'https://x.com/yaphalla',
  },
  Instagram: {
    site: 'instagram',
    href: 'https://www.instagram.com/yaphallaafkj/',
  },
} as const;

export const supportEmail = {
  href: `mailto:support@${domain}`, // TO-DO make zoho mail account if we need it
  label: 'Contact Support',
} as const;

const paths = {
  Home: {
    href: '/',
    label: 'Home',
  },
  Editor: {
    href: '/editor',
    label: 'New Formation',
  },
  Talents: {
    href: '/talents',
    label: 'Talents',
  },
  Creators: {
    href: '/creators',
    label: 'Creators',
  },
} as const;

const previews = {
  Previews: {
    href: '/preview' as const,
    label: 'Previews',
  },
  Inputs: {
    href: '/preview/inputs' as const,
    label: 'Inputs',
  },
} as const;

export const validHrefs = new Set([
  ...[...Object.values(paths), ...Object.values(previews)]
    .filter(({ href }) => href?.[0] === '/')
    .map(({ href }) => href),
  ...Object.values(redirects)
    .filter(({ noIndex }) => !noIndex)
    .map(({ redirect }) => redirect),
]);

export const navigation = [paths['Home'], paths['Editor'], paths['Creators']] as PathType[];
