export type PathType = {
  href?: string;
  label?: string;
  options?: PathType[];
};

export const socials = [
  {
    site: 'discord',
    href: 'https://discord.gg/yaphalla',
  },
  {
    site: 'twitter',
    href: 'https://twitter.com/yaphalla',
  },
  {
    site: 'instagram',
    href: 'https://www.instagram.com/yaphallaafkj/',
  },
] as const;

export const supportEmail = {
  href: 'mailto:support@yaphalla.com', // TO-DO make zoho mail account if we need it
  label: 'Contact Support',
} as const;

export const afkjPaths = {
  Home: {
    href: '/',
    label: 'Home',
  },
  Editor: {
    href: '/editor',
    label: 'Formation Editor',
  },
  Talents: {
    href: '/talents',
    label: 'Talents',
  },
} as const;

export const validHrefs = new Set(
  Object.values(afkjPaths)
    .filter(({ href }) => href[0] === '/')
    .map(({ href }) => href),
);

export const afkj = [afkjPaths['Home'], afkjPaths['Editor'], afkjPaths['Talents']] as PathType[];
