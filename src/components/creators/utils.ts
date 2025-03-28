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

    if (property === 'YouTube' && b['Bilibili']) {
      return -1;
    }
    if (property === 'Bilibili' && a['YouTube']) {
      return 1;
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

  if ('Discord' in a && 'Discord' in b) {
    const lengthComparison = compareLength(dataA, dataB);
    if (lengthComparison !== 0) {
      return lengthComparison;
    }

    const youtubeComparison = compareProperties(a, b, 'YouTube');
    if (youtubeComparison !== 0) {
      return youtubeComparison;
    }

    const bilibiliComparison = compareProperties(a, b, 'Bilibili');
    if (bilibiliComparison !== 0) {
      return bilibiliComparison;
    }
  }

  if ('Discord' in dataA && !('Discord' in dataB)) {
    return -1;
  }
  if (!('Discord' in dataA) && 'Discord' in dataB) {
    return 1;
  }

  const youtubeComparison = compareProperties(a, b, 'YouTube');
  if (youtubeComparison !== 0) {
    return youtubeComparison;
  }

  const bilibiliComparison = compareProperties(a, b, 'Bilibili');
  if (bilibiliComparison !== 0) {
    return bilibiliComparison;
  }

  return compareStrings(creatorA, creatorB);
};

export const fetchYouTubePicture = async (url: string): Promise<string | null> => {
  try {
    if (!url) {
      throw new Error('No URL provided');
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch YouTube page');
    }

    const html = await response.text();
    const regExp = /<link rel="image_src" href="(.*?)"/;
    const match = html.match(regExp);

    return match && match[1];
  } catch (error) {
    console.error('Error fetching YouTube profile picture:', error);

    return null;
  }
};
