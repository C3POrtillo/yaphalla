import type { CreatorData } from '@/utils/pathsCreators';

import { creators } from '@/utils/pathsCreators';
import { compareStrings } from '@/utils/utils';

type ValidHrefs = ('Discord' | 'YouTube' | 'Bilibili')[];

export const processCreators = (filter: (creator: CreatorData) => boolean, hrefs: ValidHrefs) =>
  Object.values(creators)
    .filter(filter)
    .sort(({ label: a }, { label: b }) => compareStrings(a, b))
    .map(({ label, ...props }) => ({
      label,
      href: hrefs.map(site => props[site]).filter(Boolean)[0],
    }));

export const processPaths = (paths: string[], slug: string[] | undefined) => {
  let slugIndex = 0;

  return paths.filter(Boolean).map(path => {
    if (slug?.length && slugIndex < slug.length && path.match(/\[.*\]/)) {
      return slug[slugIndex++];
    }

    return path;
  });
};
