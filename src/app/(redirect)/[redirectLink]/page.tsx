import { notFound } from 'next/navigation';

import type { FC } from 'react';

import Redirect from '@/components/redirect/Redirect';
import { redirects } from '@/utils/paths';

interface ParamProps {
  params: Promise<{
    redirectLink: string;
  }>;
}

export const generateStaticParams = () =>
  Object.values(redirects).map(({ redirect: redirectLink }) => ({
    redirectLink: redirectLink.slice(1),
  }));

const Index: FC<ParamProps> = async ({ params }) => {
  const { redirectLink } = await params;
  const target = redirects[`/${redirectLink}` as keyof typeof redirects];

  if (!target) {
    notFound();
  }
  
  return <Redirect href={target.href} />;
};

export default Index;
