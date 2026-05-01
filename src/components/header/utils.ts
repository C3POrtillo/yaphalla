import { brandIcon } from '@/utils/utils';

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

const discordSlugs = /^\/emotes/;
const sheetSlugs = new Set(['/primal-lord', '/battle-drills', 'Leaderboards', '/hs-sheets', '/tracker']);
const formSlugs = new Set(['/paragon-form']);

const staticSlugs: Record<string, string> = {
  Other: 'fa6-solid:list',
  Communities: 'heroicons:user-group-16-solid',
  '/creators': 'mdi:tv-classic',
  '/auto-player': 'fa6-solid:robot',
  '/hs-deck-calc': 'mdi:calculator-variant',
  '/supremacy-calculator': 'mdi:calculator-variant',
  '/camelossus': 'mdi:calculator-variant',
  'https://afk-journey.fandom.com': 'fa-solid:book',
  '/heroes': 'heroicons:user-16-solid',
  '/bosses': 'fa6-solid:book-skull',
  '/arena-sim': 'mdi:sword-cross',
};

const staticSets = (href: string) => {
  if (discordSlugs.test(href)) {
    return brandIcon('discord');
  }
  if (sheetSlugs.has(href)) {
    return 'fa6-solid:table-list';
  }
  if (formSlugs.has(href)) {
    return 'fa6-solid:square-poll-horizontal';
  }
};

const matchRegExp = (href: string) => {
  if (href.match(/^https:\/\/www\.prydwen\.gg\/.*/)) {
    return 'fa6-solid:sailboat';
  }
  if (href.match(/^\/editor(?:\/|$)/)) {
    return 'mynaui:wrench-solid';
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
