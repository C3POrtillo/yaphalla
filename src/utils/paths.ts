export type PathType = {
  path?: string;
  label?: string;
  options?: PathType[];
  isExternal?: boolean;
};

export const supportEmail = {
  path: 'mailto:support@yaphalla.com', // TO-DO make zoho mail account if we need it
  label: 'Contact Support',
} as const;

export const afkjPaths = {
  Home: {
    path: '',
    label: 'Home',
  },
  Editor: {
    path: '/editor',
    label: 'Formation Editor',
  },
  Talents: {
    path: '/seasonal/talents',
    label: 'Talents',
  },
} as const;

export const afkj = [afkjPaths['Home'], afkjPaths['Editor'], afkjPaths['Talents']] as PathType[];
