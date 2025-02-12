import type { MetadataRoute } from 'next';

import { afkjPaths } from '@/utils/paths';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = 'https://yapphalla.com';

  const afkjPathsData = Object.values(afkjPaths).map(({ path }) => ({
    url: `${url}/${path}`,
    lastModified: new Date(),
    priority: 1,
  }));

  return [
    {
      url,
      lastModified: new Date(),
      priority: 1,
    },
    ...afkjPathsData,
  ];
}
