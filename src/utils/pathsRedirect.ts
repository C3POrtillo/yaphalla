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
  card?: 'summary_large_image' | 'summary';
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
  '/hs-sheet': {
    redirect: '/hs-sheet',
    label: 'Homestead Guide',
    href: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTkwoy0_IKEWZZWoCebVXn3zNEVOGbAvTdtn4d1tznfqT5n9SdnKM0oIIo6fCDFV2SharTIEnOx91v3/pubhtml#gid=75195883',
    description: 'All in one spreadsheet for homestead decks and upgrade order',
    site: 'Google Sheets',
    keywords: ['Homestead Guide', 'AFK Journey Homestead', 'Yaphalla Homestead'],
    themeColor: '#42b15b',
  } as RedirectType
};

const getLogo = (name: string) => `https://www.yaphalla.com/assets/images/logos/${name}.png`;
const getCatLogo = (color?: string) => (color ? getLogo(`yaphalla-cat-${color}`) : getLogo('yaphalla-cat'));

const discords = {
  '/discord': {
    redirect: '/discord',
    label: 'Discord',
    href: 'https://discord.com/invite/yaphalla',
    title: 'Join the Yaphalla Discord!',
    site: 'Discord',
    keywords: ['Yaphalla Discord'],
  } as RedirectType,
  '/emotes-celehypo': {
    redirect: '/emotes-celehypo',
    label: 'Discord',
    href: 'https://discord.com/invite/qUdyM7nTYC',
    title: 'CeleHypo/Dimensional Yapmojis',
    site: 'Discord',
    themeColor: '#A6DCD0',
    keywords: ['Yaphalla Emote Discord', 'Hero Emotes', 'Hero Emojis'],
    image: getCatLogo('light-blue'),
  } as RedirectType,
  '/emotes-lightbearer': {
    redirect: '/emotes-lightbearer',
    label: 'Discord',
    href: 'https://discord.com/invite/cMpQtcVECS',
    title: 'Lightbearer Yapmojis',
    site: 'Discord',
    themeColor: '#A6DCD0',
    keywords: ['Yaphalla Emote Discord', 'Hero Emotes', 'Hero Emojis'],
    image: getCatLogo('light-blue'),
  } as RedirectType,
  '/emotes-wilder': {
    redirect: '/emotes-wilder',
    label: 'Discord',
    href: 'https://discord.com/invite/2UXTKUy3rW',
    title: 'Wilder Yapmojis',
    site: 'Discord',
    themeColor: '#A6DCD0',
    keywords: ['Yaphalla Emote Discord', 'Hero Emotes', 'Hero Emojis'],
    image: getCatLogo('light-blue'),
  } as RedirectType,
  '/emotes-mauler': {
    redirect: '/emotes-mauler',
    label: 'Discord',
    href: 'https://discord.com/invite/v5UBduNcmQ',
    title: 'Mauler Yapmojis',
    site: 'Discord',
    themeColor: '#c3894c',
    keywords: ['Yaphalla Emote Discord', 'Hero Emotes', 'Hero Emojis'],
    image: getCatLogo('orange'),
  } as RedirectType,
  '/emotes-graveborn': {
    redirect: '/emotes-graveborn',
    label: 'Discord',
    href: 'https://discord.com/invite/37PecQqWvE',
    title: 'Graveborn Yapmojis',
    site: 'Discord',
    themeColor: '#A9D991',
    keywords: ['Yaphalla Emote Discord', 'Hero Emotes', 'Hero Emojis'],
    image: getCatLogo('light-green'),
  } as RedirectType,
  '/emotes-boss': {
    redirect: '/emotes-boss',
    label: 'Discord',
    href: 'https://discord.com/invite/JyWqysHgH4',
    title: 'Boss Yapmojis',
    site: 'Discord',
    themeColor: '#FF6467',
    keywords: ['Yaphalla Emote Discord', 'Hero Emotes', 'Hero Emojis'],
    image: getCatLogo('light-red'),
  } as RedirectType,
  '/emotes-base': {
    redirect: '/emotes-base',
    label: 'Discord',
    href: 'https://discord.com/invite/qwnNhxSsEs',
    title: 'Base Yapmojis',
    site: 'Discord',
    themeColor: '#90ba98',
    keywords: ['Yaphalla Hex Emote Discord', 'Hex Emotes', 'Hex Emojis'],
    image: getCatLogo('green'),
  } as RedirectType,
  '/emotes-artifacts': {
    redirect: '/emotes-artifacts',
    label: 'Discord',
    href: 'https://discord.com/invite/FXGSSpsfTA',
    title: 'Artifact Yapmojis',
    site: 'Discord',
    themeColor: '#c3894c',
    keywords: ['Yaphalla Artifact Emote Discord', 'Artifact Emotes', 'Artifact Emojis'],
    image: getCatLogo('orange'),
  } as RedirectType,
  '/emotes-hd': {
    redirect: '/emotes-hd',
    label: 'Discord',
    href: 'https://discord.com/invite/AF9NYXQXXt',
    title: 'Honor Duel Yapmojis',
    site: 'Discord',
    themeColor: '#7c99dd',
    keywords: ['Yaphalla Honor Duel Emote Discord', 'Honor Duel Emotes', 'Honor Duel Emojis'],
    image: getCatLogo('blue'),
  } as RedirectType,
  '/emotes-charms': {
    redirect: '/emotes-charms',
    label: 'Discord',
    href: 'https://discord.com/invite/vyQwN92njg',
    title: 'Charm Yapmojis',
    site: 'Discord',
    themeColor: '#9368ab',
    keywords: ['Yaphalla Charms Emote Discord', 'Charm Emotes', 'Charm Emojis'],
    image: getCatLogo('purple'),
  } as RedirectType,
  '/emotes-range': {
    redirect: '/emotes-range',
    label: 'Discord',
    href: 'https://discord.com/invite/C8NwcbtpZ7',
    title: 'Range Yapmojis',
    site: 'Discord',
    themeColor: '#9368ab',
    keywords: ['Yaphalla Hex Emote Discord', 'Hex Emotes', 'Hex Emojis'],
    image: getCatLogo('light-purple'),
  } as RedirectType,
  '/emotes-wildcards': {
    redirect: '/emotes-wildcards',
    label: 'Discord',
    href: 'https://discord.com/invite/4ayAsyJAEX',
    title: 'Wildcard Yapmojis',
    site: 'Discord',
    themeColor: '#e9b560',
    keywords: ['Yaphalla Hex Emote Discord', 'Hex Emotes', 'Hex Emojis'],
    image: getCatLogo(),
  } as RedirectType,
  '/fight-club': {
    redirect: '/fight-club',
    label: 'Discord',
    href: 'https://discord.com/invite/z22yE5eFHK',
    title: 'Join Fight Club!',
    site: 'Discord',
    keywords: ['Fight Club Discord'],
    themeColor: '#f9db89',
    image: getLogo('fight-club'),
  } as RedirectType,
  // '/trolley': {
  //   redirect: '/trolley',
  //   label: 'Discord',
  //   href: 'https://discord.com/invite/bFBxBC3kxU',
  //   title: 'Join Dolly's Trolley!',
  //   site: 'Discord',
  //   noIndex: true,
  //   themeColor: '#fed2a8',
  //   image: getLogo('trolley'),
  // } as RedirectType,
  // '/requiem': {
  //   redirect: '/reqiuem',
  //   label: 'Discord',
  //   href: 'https://discord.com/invite/GY8xVY6WaP',
  //   title: 'Join Requiem!',
  //   site: 'Discord',
  //   noIndex: true,
  //   themeColor: '#A6DCD0',
  //   image: getLogo('requiem'),
  // } as RedirectType,
  '/vn': {
    redirect: '/vn',
    label: 'Discord',
    href: 'https://discord.gg/kWE4wKe7tQ',
    title: 'Join the Vietnam Community for AFKJ!',
    site: 'Discord',
    themeColor: '#da251d',
    keywords: createDiscordKeywords('Vietnam'),
    image: getLogo('vn-logo'),
  } as RedirectType,
  '/official': {
    redirect: '/official',
    label: 'Discord',
    href: 'https://discord.com/invite/afkjourney',
    title: 'Join the Official Discord for AFKJ!',
    site: 'Discord',
    themeColor: '#a6dcd0',
    keywords: createDiscordKeywords(),
    image: getLogo('afkj-logo'),
  } as RedirectType,
  '/prydwen': {
    redirect: '/prydwen',
    label: 'Discord',
    href: 'https://discord.com/invite/prydwen',
    title: 'Join Prydwen!',
    site: 'Discord',
    themeColor: '#009eec',
    keywords: createDiscordKeywords('Prydwen'),
    image: getLogo('prydwen'),
  } as RedirectType,
  // '/honor-duel-hq': {
  //   redirect: '/honor-duel-hq',
  //   label: 'Discord',
  //   href: 'https://discord.com/invite/YDndgX8RYV',
  //   title: 'Join Honor Duel HQ!',
  //   site: 'Discord',
  //   themeColor: '#dcae72',
  //   keywords: createDiscordKeywords('Honor Duel HQ'),
  //   image: getLogo('honor-duel-hq'),
  // } as RedirectType,
  // '/weirdos-club': {
  //   redirect: '/weirdos-club',
  //   label: 'Discord',
  //   href: 'https://discord.com/invite/cheetosfff',
  //   title: "Join Weirdo's Club!",
  //   site: 'Discord',
  //   themeColor: '#f6405b',
  //   keywords: createDiscordKeywords("Weirdo's Club"),
  //   image: getLogo('weirdos-club'),
  // } as RedirectType,
  // '/drills-archive': {
  //   redirect: '/drills-archive',
  //   label: 'Discord',
  //   href: 'https://discord.com/invite/hVnBdx5Mkk',
  //   title: 'Join Drills Archive!',
  //   site: 'Discord',
  //   themeColor: '#5CB38F',
  //   keywords: createDiscordKeywords('Drills Archive'),
  //   image: getLogo('drills-archive'),
  // } as RedirectType,
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
  '/prydwen-afk-journey': {
    redirect: '/prydwen-afk-journey',
    label: 'Prydwen',
    href: 'https://www.prydwen.gg/afk-journey/',
    site: 'Prydwen',
    card: 'summary_large_image',
  } as RedirectType,
  // '/hs-deck-calc': {
  //   redirect: '/hs-deck-calc',
  //   label: 'itch.io',
  //   href: 'https://sumraa.itch.io/homestead-deck-evaluation',
  //   title: 'Homestead Deck Evaluation by Sumraa',
  //   description: 'Test deck combinations for Homestead recipes',
  //   site: 'itch.io',
  //   themeColor: '#5CB38F',
  //   keywords: ['Homestead Deck Calculator', 'Homestead Deck Optimizer'],
  // } as RedirectType,
  '/arena-sim': {
    redirect: '/arena-sim',
    label: 'Stargazer',
    href: 'https://stargazer.tmdict.com/',
    title: 'AFK Journey Arena Simulator by Unii',
    description:
      'Plan and simulate AFK Journey arena battles. Test hero formations, visualize skill targeting, and share team compositions.',
    image: 'https://stargazer.tmdict.com/stellarcrystal.png',
    keywords: ['AFK Journey Arena Simulator'],
  } as RedirectType,
  // '/camelossus': {
  //   redirect: '/camelossus',
  //   label: 'Camelossus',
  //   href: 'https://camelossus.com/',
  //   title: 'Homestead Deck Optimizer by Toobles',
  //   description: 'Optimize deck combinations for Homesteade recipes',
  //   themeColor: '#5CB38F',
  //   keywords: ['Homestead Deck Calculator', 'Homestead Deck Optimizer'],
  // } as RedirectType,
  '/figma-guide': {
    redirect: '/figma-guide',
    label: 'Figma Guide',
    href: 'https://www.notion.so/Yaphalla-Figma-Guide-2921ae5f78cf80fdb6f7eb8d7ca7318a?source=copy_link',
    title: 'Yaphalla Figma Guide',
    description: 'How to use the Yaphalla Figma',
    noIndex: true,
  } as RedirectType,
  // '/supremacy-calculator': {
  //   redirect: '/supremacy-calculator',
  //   label: 'Supremacy Calculator',
  //   href: 'https://supremacy-calculator.vercel.app/',
  //   title: 'Supremacy Calculator',
  //   description: 'A comprehensive web-based tool designed to help guild members in Guild Supremacy',
  //   keywords: ['Guild Supremacy Calculator'],
  // } as RedirectType,
  '/tracker': {
    redirect: '/tracker',
    label: 'AFKJ Tracker',
    href: 'https://afkj-tracker.vercel.app/',
    title: 'AFKJ Tracker',
    description: 'Free web-based tracker for AFK Journey. Track hero ascension, dupes, EX weapons, and tier list priorities. Stay organized and optimize your hero progression.',
    keywords: ['Tracker'],
  } as RedirectType,
  '/guild-manager': {
    redirect: '/guild-manager',
    label: 'AFKJ Guild Manager',
    href: 'https://afkj-guildmanager.vercel.app/',
    title: 'AFKJ Guild Manager',
    description: 'Free web-based guild management tool for AFK Journey. Manage your guild\'s rosters, track hero progression of members, coordinate events, and view detailed guild statistics in one place.',
    keywords: ['Tracker'],
  } as RedirectType,
  '/gamba-tool': {
    redirect: '/gamba-tool',
    label: 'AFKJ Gamba Tool',
    href: 'https://gamba-tool.vercel.app/',
    title: 'AFKJ Gamba Tool',
    description: 'Gamba Tool is a collection of calculators and simulators for understanding game economy and luck-based mechanics.',
    keywords: ['Tracker'],
  } as RedirectType,
};

export const redirects = {
  ...google,
  ...discords,
  ...creatorDiscords,
  ...misc,
} as const;
