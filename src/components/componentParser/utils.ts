import { cache } from 'react';

import type { Cta } from '@/sanity/types';

import { getAllCtas } from '@/sanity/client';
import { sanityFetch } from '@/sanity/live';
import { PAGE_QUERY } from '@/utils/queries';

export const fetchPage = cache((slug = 'home') =>
  sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  }),
);

const getDataById = <T extends { _id: string }>(data?: { _id: string }[]): Record<string, T> =>
  data?.reduce<Record<string, T>>((acc, item) => {
    if (item?._id) {
      acc[item._id] = item as unknown as T;
    }

    return acc;
  }, {}) || {};

export const fetchPageCTAs = cache(async () => {
  const data = await getAllCtas();

  return getDataById<Cta>(data);
});
