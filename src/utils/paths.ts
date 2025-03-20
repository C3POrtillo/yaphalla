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
  keywords?: string[];
  noIndex?: boolean;
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

const createLeaderboardKeywords = (string: string) => {
  const keywords = [];
  const prefix = ['', 'Yaphalla'];
  const suffix = ['', 'Leaderboard', 'Leaderboards'];
  for (const a of prefix) {
    for (const b of suffix) {
      keywords.push(`${a} ${string} ${b}`.trim());
    }
  }

  return keywords;
};

export const redirects = {
  '/battle-drills': {
    redirect: '/battle-drills',
    label: 'Battle Drills',
    href: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTQNE-x_s_LcUjX4XccM95MKVKA6E1Zv9Php70w6zIn6R6pvwiZGwgv-1X_ptQlyuSl-FS-bc9E8_aR/pubhtml',
    title: 'Global Battle Drills Leaderboards - Chains of Eternity',
    description: 'Global Battle Drills Leaderboards for AFK Journey',
    keywords: createLeaderboardKeywords('Battle Drills'),
  } as RedirectType,
  '/primal-lord': {
    redirect: '/primal-lord',
    label: 'Primal Lord',
    href: 'https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vQBMOON-RjaiHolLR5QqZbvkJzbEeRkouNWkWOjzCDvmqCYPkcou0QPSm0Rmdt59xmD9RgVyeVQf5Zy/pubhtml',
    title: 'Global Primal Lord Leaderboards',
    description: 'Global Primal Lord Leaderboards for AFK Journey',
    keywords: createLeaderboardKeywords('Primal Lord'),
  } as RedirectType,
  '/paragon-form': {
    redirect: '/paragon-form',
    label: 'Paragon Form',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSdMldCIpkntrp3LOXbHyDWgnV6nKb5zz5ovEAU_m3YH36MSMg/viewform',
    keywords: ['Paragon Priority Form', 'Yaphalla Paragon Priority Form', 'Paragon Form', 'Yaphalla Paragon Form'],
  } as RedirectType,
  '/discord': {
    redirect: '/discord',
    label: 'Discord',
    href: 'https://discord.com/invite/yaphalla',
    title: 'Join the Yaphalla Discord!',
    site: 'Discord',
    keywords: ['Yaphalla Discord'],
  } as RedirectType,
  '/fight-club': {
    redirect: '/fight-club',
    label: 'Discord',
    href: 'https://discord.com/invite/z22yE5eFHK',
    title: 'Join Fight Club!',
    site: 'Discord',
    keywords: ['Fight Club Discord'],
  } as RedirectType,
  '/trolley': {
    redirect: '/trolley',
    label: 'Discord',
    href: 'https://discord.com/invite/bFBxBC3kxU',
    title: "Join Dolly's Trolley!",
    site: 'Discord',
    noIndex: true,
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
