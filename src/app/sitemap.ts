import type { MetadataRoute } from 'next';

import { domain, validHrefs } from '@/utils/paths';
import { compareStrings } from '@/utils/utils';

const url = `https://${domain}`;
const createEntry = (path: string) => ({
  url: `${url}${path}`,
  lastModified: new Date(),
  priority: 1,
});

const sitemap = (): MetadataRoute.Sitemap => {
  const pathData = [...validHrefs]
    .filter(href => !!href && compareStrings(href, '/') && !href.startsWith('/preview'))
    .map(createEntry);

  return [
    {
      url,
      lastModified: new Date(),
      priority: 1,
    },
    ...pathData,
  ];
};

export default sitemap;
