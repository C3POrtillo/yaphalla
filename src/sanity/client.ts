import { CTA_QUERY, HEADER_QUERY, LOGO_QUERY, SOCIAL_QUERY, TAGS_QUERY } from '@/utils/queries';
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';
import { cache } from 'react';

export const client = createClient({
  projectId: 'm1przkyj',
  dataset: 'production',
  apiVersion: '2025-07-09',
  useCdn: false,
});

export const builder = imageUrlBuilder(client);

export const getAllCtas = cache(() => client.fetch(CTA_QUERY));

export const getAllTags = cache(() => client.fetch(TAGS_QUERY));

export const getLogo = cache(() => client.fetch(LOGO_QUERY));

export const getSocials = cache(() => client.fetch(SOCIAL_QUERY));

export const getHeader = cache(() => client.fetch(HEADER_QUERY));
