import { fetchYouTubePicture } from '@/components/creators/utils';
import { creators } from '@/utils/pathsCreators';
import { joinStrings } from '@/utils/utils';

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
  fetchImage: () => Promise<string | null>;
};

const appName = ['AFKJ', 'AFKJourney', 'AFK Journey'];

const createLeaderboardKeywords = (string: string) => {
  const keywords = [];
  const prefix = ['', 'Yaphalla', 'Global'];
  const mid = ['', 'Leaderboard', 'Leaderboards'];
  const suffix = ['', ...appName.map(name => `For ${name}`)];
  for (const a of prefix) {
    for (const b of mid) {
      for (const c of suffix) {
        keywords.push(joinStrings(a, string, b, c).trim());
      }
    }
  }

  return keywords;
};

const createDiscordKeywords = (string?: string) => {
  const prefixes = ['Official', ''];
  const suffixes = ['Official Discord', 'Discord'];

  const result: string[] = [];

  for (const prefix of prefixes) {
    for (const name of appName) {
      for (const suffix of suffixes) {
        if (prefix === 'Official' && suffix === 'Official Discord') {
          continue;
        }
        result.push(joinStrings(prefix, name, string, suffix).trim());
      }
    }
  }

  return result;
};

const google = {
  '/battle-drills': {
    redirect: '/battle-drills',
    label: 'Battle Drills',
    href: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTQNE-x_s_LcUjX4XccM95MKVKA6E1Zv9Php70w6zIn6R6pvwiZGwgv-1X_ptQlyuSl-FS-bc9E8_aR/pubhtml',
    title: 'Global Battle Drills Leaderboards - Chains of Eternity',
    description: 'You think your guild is good? Lets see! Submit your district at discord.gg/yaphalla!',
    site: 'Google Sheets',
    themeColor: '#6b3982',
    keywords: createLeaderboardKeywords('Battle Drills'),
  } as RedirectType,
  '/primal-lord': {
    redirect: '/primal-lord',
    label: 'Primal Lord',
    href: 'https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vQBMOON-RjaiHolLR5QqZbvkJzbEeRkouNWkWOjzCDvmqCYPkcou0QPSm0Rmdt59xmD9RgVyeVQf5Zy/pubhtml',
    title: 'Global Primal Lord Leaderboards',
    description: 'Find out where you rank globally! Submit your district at discord.gg/yaphalla!',
    site: 'Google Sheets',
    keywords: createLeaderboardKeywords('Primal Lord'),
    themeColor: '#ebb614',
    image: 'https://www.yaphalla.com/assets/images/graphics/primal-lord.png',
  } as RedirectType,
  '/paragon-form': {
    redirect: '/paragon-form',
    label: 'Paragon Form',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSdMldCIpkntrp3LOXbHyDWgnV6nKb5zz5ovEAU_m3YH36MSMg/viewform',
    description: 'Click the link to vote on our next update for our Paragon Priority guide!',
    site: 'Google Form',
    keywords: ['Paragon Priority Form', 'Yaphalla Paragon Priority Form', 'Paragon Form', 'Yaphalla Paragon Form'],
    themeColor: '#ae3fcd',
    image: 'https://www.yaphalla.com/assets/images/graphics/paragon-priority.png',
  } as RedirectType,
};

const discords = {
  '/discord': {
    redirect: '/discord',
    label: 'Discord',
    href: 'https://discord.com/invite/yaphalla',
    title: 'Join the Yaphalla Discord!',
    site: 'Discord',
    keywords: ['Yaphalla Discord'],
  } as RedirectType,
  '/emotes': {
    redirect: '/emotes',
    label: 'Discord',
    href: 'https://discord.com/invite/qUdyM7nTYC',
    title: 'Yapmojis',
    description: 'Join our emote discord!',
    site: 'Discord',
    themeColor: '#ae3fcd',
    keywords: ['Yaphalla Emote Discord', 'Emotes', 'Emoji'],
    image: 'https://www.yaphalla.com/assets/images/logos/yaphalla-cat-pink.png',
  } as RedirectType,
  '/fight-club': {
    redirect: '/fight-club',
    label: 'Discord',
    href: 'https://discord.com/invite/z22yE5eFHK',
    title: 'Join Fight Club!',
    site: 'Discord',
    keywords: ['Fight Club Discord'],
    themeColor: '#f9db89',
    image: 'https://www.yaphalla.com/assets/images/logos/fight-club.png',
  } as RedirectType,
  '/trolley': {
    redirect: '/trolley',
    label: 'Discord',
    href: 'https://discord.com/invite/bFBxBC3kxU',
    title: "Join Dolly's Trolley!",
    site: 'Discord',
    noIndex: true,
    themeColor: '#fed2a8',
    image: 'https://www.yaphalla.com/assets/images/logos/trolley.png',
  } as RedirectType,
  '/vn': {
    redirect: '/vn',
    label: 'Discord',
    href: 'https://discord.com/invite/afkjvietnam',
    title: 'Join the Vietnam Community for AFKJ!',
    site: 'Discord',
    themeColor: '#da251d',
    keywords: createDiscordKeywords('Vietnam'),
    image: 'https://www.yaphalla.com/assets/images/logos/vn-logo.png',
  } as RedirectType,
  '/official': {
    redirect: '/official',
    label: 'Discord',
    href: 'https://discord.com/invite/afkjourney',
    title: 'Join the Official Discord for AFKJ!',
    site: 'Discord',
    themeColor: '#a6dcd0',
    keywords: createDiscordKeywords(),
    image: 'https://www.yaphalla.com/assets/images/logos/afkj-logo.png',
  } as RedirectType,
};

const creatorDiscords = Object.fromEntries(
  Object.entries(creators)
    .filter(([_, { Discord }]) => Discord)
    .map(([redirect, { label, Discord: href, YouTube }]) => [
      redirect,
      {
        redirect,
        label: 'Discord',
        href,
        title: `Join ${label}'s Discord`,
        site: 'Discord',
        fetchImage: async () => (YouTube ? await fetchYouTubePicture(YouTube) : null),
      } as RedirectType,
    ]),
) as Record<keyof typeof creators, RedirectType>;

const misc = {
  '/advanced': {
    redirect: '/advanced',
    label: 'Root',
    href: '/editor?mode=dev',
    title: 'YapBuilder (Advanced)',
    noIndex: true,
  } as RedirectType,
  '/auto-player': {
    redirect: '/auto-player',
    label: 'Github',
    href: 'https://adbautoplayer.github.io/AdbAutoPlayer/',
    title: 'AdbAutoPlayer',
    description: 'Automate tasks (bot) in mobile games like AFK Journey using ADB',
    site: 'GitHub',
    themeColor: '#9fbfe5',
    image: 'https://raw.githubusercontent.com/AdbAutoPlayer/AdbAutoPlayer/refs/heads/main/cmd/wails/build/appicon.png',
  } as RedirectType,
};

export const redirects = {
  ...google,
  ...discords,
  ...creatorDiscords,
  ...misc,
} as const;
