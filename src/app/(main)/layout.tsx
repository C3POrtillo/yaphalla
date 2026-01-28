import '@/styles/globals.css';

import type { FC, PropsWithChildren } from 'react';

import { fetchPage } from '@/components/componentParser/utils';
import { builder } from '@/sanity/client';
import { sanityFetch } from '@/sanity/live';
import { LOGO_QUERY } from '@/utils/queries';
import { TITLE } from '@/utils/types';
import { createMetadata } from '@/utils/utils';

export const generateMetadata = async () => {
  const { icon } = (await sanityFetch({ query: LOGO_QUERY })).data[0];
  const { title: pageTitle, description: pageDescription } = (await fetchPage()).data[0];
  const title = pageTitle || TITLE;
  const description = pageDescription || '';
  const image = builder.image(icon!.asset!).url();

  return createMetadata({ title, image, description });
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default RootLayout;
