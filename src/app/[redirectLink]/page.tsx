import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { cache } from 'react';

import type { Metadata } from 'next';
import type { FC } from 'react';

import { metadata } from '@/app/layout';
import Container from '@/components/container/Container';
import { redirects } from '@/utils/paths';
import { compareStrings } from '@/utils/utils';

interface IndexProps {
  params: Promise<{
    redirectLink: string;
  }>;
}

export const generateStaticParams = () =>
  Object.values(redirects).map(({ redirect: redirectLink }) => ({
    redirectLink: redirectLink.slice(1),
  }));

const fetchMetadata = cache(async (url: string): Promise<Metadata> => {
  try {
    const response = await fetch(url, { method: 'GET' });
    const text = await response.text();

    const titleMatch = text.match(/<title>(.*?)<\/title>/i);
    const descriptionMatch = text.match(/<meta name="description" content="(.*?)"/i);
    const ogTitleMatch = text.match(/<meta property="og:title" content="(.*?)"/i);
    const ogDescMatch = text.match(/<meta property="og:description" content="(.*?)"/i);
    const ogImageMatch = text.match(/<meta property="og:image" content="(.*?)"/i);

    return {
      title: ogTitleMatch?.[1] || titleMatch?.[1] || 'Redirecting...',
      description: ogDescMatch?.[1] || descriptionMatch?.[1] || '',
      openGraph: {
        title: ogTitleMatch?.[1] || titleMatch?.[1] || 'Redirecting...',
        description: ogDescMatch?.[1] || descriptionMatch?.[1] || '',
        url,
        images: ogImageMatch ? [{ url: ogImageMatch[1] }] : undefined,
      },
    };
  } catch (error) {
    console.error('Metadata fetch error:', error);

    return metadata;
  }
});

export const generateMetadata = async ({ params }: IndexProps): Promise<Metadata> => {
  const { redirectLink } = await params;
  const target = Object.values(redirects).find(item => item.redirect === `/${redirectLink}`);

  if (!target) {
    return metadata;
  }
  const redirectData = fetchMetadata(target.href)
  if (compareStrings(target?.label || '', 'Discord') === 0) {
    const { title } = await redirectData
    return {
      title,
      description: metadata.description
    }
  }

  return redirectData;
};

export const middleware = async (req: Request) => {
  const { pathname } = new URL(req.url);
  const redirectLink = pathname.slice(1);

  const target = Object.values(redirects).find(item => item.redirect === `/${redirectLink}`);

  if (target?.href) {
    return NextResponse.redirect(target.href, 301);
  }

  return NextResponse.next();
};

export const config = {
  matcher: '/:redirectLink*',
};

const Index: FC<IndexProps> = async ({ params }) => {
  const { redirectLink } = await params;
  const target = Object.values(redirects).find(item => item.redirect === `/${redirectLink}`);

  return (
    <Container className="m-0 flex w-full max-w-4/5 flex-col">
      <p className="flex flex-row flex-wrap w-full">301 Permanent Redirect: ${target?.href}</p>
    </Container>
  );

};
export default Index;
