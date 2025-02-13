export const domain = 'yaphalla.com' as const;
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
  href: `mailto:support@${domain}`, // TO-DO make zoho mail account if we need it
  label: 'Contact Support',
} as const;

export const paths = {
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

const previews = {
  Previews: {
    href: '/preview',
    label: 'Previews',
  },
  Inputs: {
    href: '/preview/inputs',
    label: 'Inputs',
  },
} as const;

export const validHrefs = new Set(
  [...Object.values(paths), ...Object.values(previews)].filter(({ href }) => href[0] === '/').map(({ href }) => href),
);

export const navigation = [paths['Home'], paths['Editor'], paths['Talents']] as PathType[];
