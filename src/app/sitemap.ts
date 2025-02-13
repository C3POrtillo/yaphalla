import type { MetadataRoute } from 'next';

import { domain, paths } from '@/utils/paths';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = `https://${domain}`;

  const pathData = Object.values(paths).map(({ href }) => ({
    url: `${url}/${href}`,
    lastModified: new Date(),
    priority: 1,
  }));

  return [
    {
      url,
      lastModified: new Date(),
      priority: 1,
    },
    ...pathData,
  ];
}
