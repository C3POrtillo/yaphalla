import { redirect } from 'next/navigation';
import { cache } from 'react';

import type { Metadata } from 'next';
import type { FC } from 'react';

import { metadata } from '@/app/layout';
import Container from '@/components/container/Container';
import Link from '@/components/link/Link';
import { redirects } from '@/utils/paths';
import { discordInviteAPI } from '@/utils/types';
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

    const getDiscordDescription = async () => {
      if (compareStrings(url, redirects.Discord.href) === 0) {
        const { approximate_member_count: members, approximate_presence_count: online }: Record<string, number> =
          await (await fetch(discordInviteAPI, { method: 'GET' })).json();

        return `${metadata.description}\n🟢 ${online} Online ⚫ ${members} Members`;
      }

      return metadata.description;
    };

    const textMatch = (regExp: RegExp, ogRegExp: RegExp, metadataFallback: typeof metadata.title, fallback: string) => {
      const match = text.match(regExp);
      const ogMatch = text.match(ogRegExp);

      return (match?.[1] || ogMatch?.[1] || metadataFallback || fallback) as string;
    };

    const title = textMatch(
      /<title>(.*?)<\/title>/i,
      /<meta property="og:title" content="(.*?)"/i,
      metadata.title,
      '301 Permanent Redirect',
    );
    const description = textMatch(
      /<meta name="description" content="(.*?)"/i,
      /<meta property="og:description" content="(.*?)"/i,
      await getDiscordDescription(),
      `Location: ${url}`,
    );
    const ogImageMatch = text.match(/<meta property="og:image" content="(.*?)"/i);

    const ogImages = ogImageMatch ? [{ url: ogImageMatch[1] }] : metadata.openGraph?.images;
    const twitterImages = ogImageMatch ? [ogImageMatch[1]] : metadata.twitter?.images;

    const data = {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: ogImages,
      },
      twitter: {
        title,
        description,
        images: twitterImages,
      },
    };

    return data;
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
  const redirectData = await fetchMetadata(target.href);

  return redirectData;
};

const Index: FC<IndexProps> = async ({ params }) => {
  const { redirectLink } = await params;
  const target = Object.values(redirects).find(item => item.redirect === `/${redirectLink}`);

  if (target?.href) {
    redirect(target.href);
  }

  return (
    <Container className="m-0 flex w-full max-w-4/5 flex-col">
      <p className="flex flex-row flex-wrap w-full">
        301 Permanent Redirect: <Link href={target?.href} label="Click Here" />
      </p>
    </Container>
  );
};
export default Index;
