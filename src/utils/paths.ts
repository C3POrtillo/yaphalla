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
  image?: string;
  themeColor?: string;
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
    image: 'https://www.yaphalla.com/assets/images/graphics/primal-lord.png',
  } as RedirectType,
  '/paragon-form': {
    redirect: '/paragon-form',
    label: 'Paragon Form',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSdMldCIpkntrp3LOXbHyDWgnV6nKb5zz5ovEAU_m3YH36MSMg/viewform',
    keywords: ['Paragon Priority Form', 'Yaphalla Paragon Priority Form', 'Paragon Form', 'Yaphalla Paragon Form'],
    image: 'https://www.yaphalla.com/assets/images/graphics/paragon-priority.png',
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
    themeColor: '#f9db89',
    image: 'https://www.yaphalla.com/assets/images/fight-club.png',
  } as RedirectType,
  '/trolley': {
    redirect: '/trolley',
    label: 'Discord',
    href: 'https://discord.com/invite/bFBxBC3kxU',
    title: "Join Dolly's Trolley!",
    site: 'Discord',
    noIndex: true,
    themeColor: '#fed2a8',
    image: 'https://www.yaphalla.com/assets/images/trolley.png',
  } as RedirectType,
  '/vn': {
    redirect: '/vn',
    label: 'Discord',
    href: 'https://discord.com/invite/afkjvietnam',
    title: 'Join the Vietnam Community for AFKJ!',
    site: 'Discord',
    themeColor: '#da251d',
    image: 'https://www.yaphalla.com/assets/images/vn-logo.png',
  } as RedirectType,
  '/advanced': {
    redirect: '/advanced',
    label: 'Root',
    href: '/editor?mode=dev',
    title: 'YapBuilder (Advanced)',
    noIndex: true,
  } as RedirectType,
  '/official': {
    redirect: '/official',
    label: 'Discord',
    href: 'https://discord.com/invite/afkjourney',
    site: 'Discord',
    themeColor: '#a6dcd0',
    keywords: (() => {
      const prefixes = ['Official', ''];
      const phrases = ['AFKJ', 'AFKJourney', 'AFK Journey'];
      const suffixes = ['Official Discord', 'Discord'];

      const result: string[] = [];

      for (const prefix of prefixes) {
        for (const phrase of phrases) {
          for (const suffix of suffixes) {
            if (prefix === 'Official' && suffix === 'Official Discord') {
              continue;
            }
            result.push(`${prefix} ${phrase} ${suffix}`.trim());
          }
        }
      }

      return result;
    })(),
    image: 'https://www.yaphalla.com/assets/images/afkj-logo.png',
  } as RedirectType,
  '/auto-player': {
    redirect: '/auto-player',
    label: 'Github',
    href: 'https://adbautoplayer.github.io/AdbAutoPlayer/',
    title: 'AdbAutoPlayer',
    description: 'Automate tasks (bot) in mobile games like AFK Journey using ADB',
    site: 'GitHub',
    image: 'https://raw.githubusercontent.com/AdbAutoPlayer/AdbAutoPlayer/refs/heads/main/cmd/wails/build/appicon.png',
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
