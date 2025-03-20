import type { MetadataRoute } from 'next';

import { domain, navigation, redirects } from '@/utils/paths';
import { compareStrings } from '@/utils/utils';

const url = `https://${domain}`;
const createEntry = (path?: string) => ({
  url: `${url}${path}`,
  lastModified: new Date(),
  priority: 1,
});

const sitemap = (): MetadataRoute.Sitemap => {
  const pathData = Object.values(navigation)
    .filter(({ href }) => !!href && compareStrings(href, '/') !== 0)
    .map(({ href }) => createEntry(href));

  const redirectData = Object.values(redirects).map(({ redirect }) => createEntry(redirect));

  return [
    {
      url,
      lastModified: new Date(),
      priority: 1,
    },
    ...pathData,
    ...redirectData,
  ];
};

export default sitemap;
