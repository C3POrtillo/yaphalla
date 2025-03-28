import type { CreatorData } from '@/utils/pathsCreators';

import { creators } from '@/utils/pathsCreators';
import { compareStrings } from '@/utils/utils';

export const processCreators = (filter: (creator: CreatorData) => boolean) =>
  Object.values(creators)
    .filter(filter)
    .sort(({ label: a }, { label: b }) => compareStrings(a, b))
    .map(({ label, Discord, YouTube, Bilibili }) => ({
      label,
      href: Discord || YouTube || Bilibili,
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
