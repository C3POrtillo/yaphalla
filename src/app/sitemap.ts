import type { MetadataRoute } from 'next';

import { domain, navigation } from '@/utils/paths';
import { compareStrings } from '@/utils/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = `https://${domain}`;

  const pathData = Object.values(navigation)
    .filter(({ href }) => !!href && compareStrings(href, '/') !== 0)
    .map(({ href }) => ({
      url: `${url}${href}`,
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
