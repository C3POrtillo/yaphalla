import type { CreatorData } from '@/utils/pathsCreators';

import { compareStrings } from '@/utils/utils';

const priorityOrder = {
  YouTube: 1,
  Bilibili: 2,
  Discord: 3,
  X: 4,
} as const;

export const getPriority = (site: string) =>
  priorityOrder[site as keyof typeof priorityOrder] ?? Object.keys(priorityOrder).length + 2;

export const getIcon = (site: string) => (compareStrings(site, 'Twitter') ? site.toLowerCase() : 'x-twitter');

const excludeProperty = (key: string) => ['language'].some(test => !!compareStrings(key, test));

const compareLength = (aObj: CreatorData, bObj: CreatorData): number =>
  Object.keys(bObj).filter(excludeProperty).length - Object.keys(aObj).filter(excludeProperty).length;

const compareProperties = (
  [creatorA, a]: [string, CreatorData],
  [creatorB, b]: [string, CreatorData],
  property: string,
): number => {
  const aHasProp = property in a;
  const bHasProp = property in b;
  if (aHasProp && !bHasProp) {
    return -1;
  }
  if (!aHasProp && bHasProp) {
    return 1;
  }
  if (aHasProp && bHasProp) {
    const lengthComparison = compareLength(a, b);
    if (lengthComparison !== 0) {
      return lengthComparison;
    }

    return compareStrings(creatorA, creatorB);
  }

  return 0;
};

export const sortCreators = (a: [string, CreatorData], b: [string, CreatorData]): number => {
  const [creatorA, dataA] = a;
  const [creatorB, dataB] = b;

  const discordComparison = compareProperties(a, b, 'Discord');
  if (discordComparison !== 0) {
    return discordComparison;
  }

  const fallbackSort =
    compareProperties(a, b, 'YouTube') ||
    compareProperties(a, b, 'Twitch') ||
    compareProperties(a, b, 'Bilibili') ||
    compareStrings(creatorA, creatorB);
  if ('Discord' in dataA && 'Discord' in dataB) {
    return compareLength(dataA, dataB) || fallbackSort;
  }

  if ('Discord' in dataA) {
    return -1;
  }
  if ('Discord' in dataB) {
    return 1;
  }

  return fallbackSort;
};

export const fetchPicture = async (url: string, regExp: RegExp): Promise<string | null> => {
  try {
    if (!url) {
      throw new Error('No URL provided');
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch YouTube page');
    }

    const html = await response.text();
    const match = html.match(regExp);

    return match && match[1];
  } catch (error) {
    console.error('Error fetching YouTube profile picture:', error);

    return null;
  }
};

export const fetchYouTubePicture = async (url: string): Promise<string | null> =>
  fetchPicture(url, /<link rel="image_src" href="(.*?)"/is);

export const fetchTwitchPicture = async (url: string): Promise<string | null> =>
  fetchPicture(url, /<meta content="([^"]+)" property="og:image"\s*\/?>/is);
