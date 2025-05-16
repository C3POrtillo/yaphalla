import { brandIcon, solidIcon } from '@/utils/utils';

export const processPaths = (paths: string[], slug: string[] | undefined) => {
  let slugIndex = 0;

  return paths.filter(Boolean).map(path => {
    if (slug?.length && slugIndex < slug.length && path.match(/\[.*\]/)) {
      return slug[slugIndex++];
    }

    return path;
  });
};

export const getLgCols = (length: number) => {
  if (length > 8) {
    return 'lg:grid-cols-3';
  }
  if (length > 4) {
    return 'lg:grid-cols-2';
  }

  return null;
};

const discordSlugs = new Set(['/emotes', '/emotes-hd', '/emotes-artifacts', '/emotes-charms', '/emotes-base']);
const sheetSlugs = new Set(['/primal-lord', '/battle-drills', 'Leaderboards']);
const formSlugs = new Set(['/paragon-form']);

const staticSlugs: Record<string, string> = {
  Other: solidIcon('list'),
  Communities: solidIcon('user-group'),
  '/creators': solidIcon('tv'),
  '/auto-player': solidIcon('robot'),
  'https://afk-journey.fandom.com': solidIcon('book'),
  '/heroes': solidIcon('user'),
  '/bosses': solidIcon('skull'),
};

const staticSets = (href: string) => {
  if (discordSlugs.has(href)) {
    return brandIcon('discord');
  }
  if (sheetSlugs.has(href)) {
    return solidIcon('table');
  }
  if (formSlugs.has(href)) {
    return solidIcon('square-poll-horizontal');
  }
};

const matchRegExp = (href: string) => {
  if (href.match(/^https:\/\/www\.prydwen\.gg\/.*/)) {
    return solidIcon('sailboat');
  }
  if (href.match(/^\/editor(?:\/|$)/)) {
    return solidIcon('wrench');
  }
};

export const getLinkIcon = (href?: string) => {
  if (!href) {
    return null;
  }
  const match = href.match(/^(?:https?:\/\/)?(?:[\w-]+\.)*(\w+)\.\w+/);

  if (staticSlugs[href]) {
    return staticSlugs[href];
  }

  return matchRegExp(href) || staticSets(href) || (match && brandIcon(match?.[1].toLowerCase())) || null;
};
