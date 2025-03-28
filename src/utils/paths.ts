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
  Communities: {
    href: undefined,
    label: 'Communities',
    options: [
      {
        href: redirects['/fight-club'].href,
        label: 'Fight Club',
      },
      {
        href: redirects['/vn'].href,
        label: 'Vietnam Server',
      },
      {
        href: redirects['/official'].href,
        label: 'Official Server',
      },
    ],
  },
  Leaderboards: {
    href: undefined,
    label: 'Leaderboards',
    options: [
      {
        href: '/primal-lord',
        label: 'Primal Lord',
      },
      {
        href: '/battle-drills',
        label: 'Battle Drills',
      },
    ],
  },
  Other: {
    href: undefined,
    label: 'Other',
    options: [
      {
        href: '/paragon-form',
        label: 'Paragon Form',
      },
      {
        href: redirects['/emotes'].href,
        label: 'Emoji Server',
      },
    ],
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

export const navigation = [
  paths['Home'],
  paths['Editor'],
  paths['Creators'],
  paths['Communities'],
  paths['Leaderboards'],
  paths['Other'],
] as PathType[];
