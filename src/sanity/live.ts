import { defineLive } from 'next-sanity/live';

import { client } from '@/sanity/client';

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: false,
  browserToken: false,
});
