export const domain = 'yaphalla.com' as const;
export type PathType = {
  href?: string;
  label?: string;
  options?: PathType[];
};

export type RedirectType = {
  redirect: string;
  label: string;
  href: string;
  title?: string;
  description?: string;
  site?: string;
};

export const socials = {
  Discord: {
    site: 'discord',
    href: 'https://discord.gg/yaphalla',
  },
  Twitter: {
    site: 'twitter',
    href: 'https://twitter.com/yaphalla',
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

export const paths = {
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
} as const;

export const redirects = {
  '/battle-drills': {
    redirect: '/battle-drills',
    label: 'Battle Drills',
    href: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTQNE-x_s_LcUjX4XccM95MKVKA6E1Zv9Php70w6zIn6R6pvwiZGwgv-1X_ptQlyuSl-FS-bc9E8_aR/pubhtml',
    title: 'Global Battle Drills Leaderboards - Chains of Eternity',
    description: 'Global Battle Drill Leaderboards for AFK Journey',
  } as RedirectType,
  '/primal-lord': {
    redirect: '/primal-lord',
    label: 'Primal Lord',
    href: 'https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vQBMOON-RjaiHolLR5QqZbvkJzbEeRkouNWkWOjzCDvmqCYPkcou0QPSm0Rmdt59xmD9RgVyeVQf5Zy/pubhtml',
    title: 'Global Primal Lord Leaderboards',
    description: 'Global Primal Lord Leaderboards for AFK Journey',
  } as RedirectType,
  '/paragon-form': {
    redirect: '/paragon-form',
    label: 'Paragon Form',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSdMldCIpkntrp3LOXbHyDWgnV6nKb5zz5ovEAU_m3YH36MSMg/viewform',
  } as RedirectType,
  '/discord': {
    redirect: '/discord',
    label: 'Discord',
    href: 'https://discord.com/invite/yaphalla',
    title: 'Join the Yaphalla Discord!',
    site: 'Discord',
  } as RedirectType,
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

export const navigation = [paths['Home'], paths['Editor']] as PathType[];
