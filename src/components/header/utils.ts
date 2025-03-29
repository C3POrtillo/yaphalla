import { brandIcon, compareStrings, solidIcon } from '@/utils/utils';

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

const discordSlugs = new Set(['/emotes']);
const sheetSlugs = new Set(['/primal-lord', '/battle-drills', 'Leaderboards']);
const formSlugs = new Set(['/paragon-form']);

export const getLinkIcon = (href?: string) => {
  if (!href) {
    return null;
  }
  if (!compareStrings(href, 'Other')) {
    return solidIcon('list');
  }
  if (!compareStrings(href, 'Communities')) {
    return solidIcon('user-group');
  }
  if (!compareStrings(href, '/creators')) {
    return solidIcon('tv');
  }
  if (href.match(/^\/editor(?:\/|$)/)) {
    return solidIcon('wrench');
  }
  if (discordSlugs.has(href)) {
    return brandIcon('discord');
  }
  if (sheetSlugs.has(href)) {
    return solidIcon('table');
  }
  if (formSlugs.has(href)) {
    return solidIcon('square-poll-horizontal');
  }

  const regExp = /^(?:https?:\/\/)?(?:[\w-]+\.)*(\w+)\.\w+/;
  const match = href.match(regExp);

  return match ? brandIcon(match?.[1].toLowerCase()) : null;
};
