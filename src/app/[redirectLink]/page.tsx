import { notFound, redirect } from 'next/navigation';
import { cache } from 'react';

import type { Metadata } from 'next';
import type { FC } from 'react';

import { metadata } from '@/app/layout';
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

const fetchMetadata = cache(async (url: string, label: string): Promise<Metadata> => {
  try {
    const response = await fetch(url, { method: 'GET' });
    const text = await response.text();

    const isDiscord = compareStrings(label, redirects.Discord.label) === 0;
    const getDiscordDescription = async () => {
      const { approximate_member_count: members, approximate_presence_count: online }: Record<string, number> = await (
        await fetch(discordInviteAPI, { method: 'GET' })
      ).json();

      return `${metadata.description}\n🟢 ${online} Online ⚫ ${members} Members`;
    };
    const textMatch = (regExp: RegExp, ogRegExp: RegExp, fallback: typeof metadata.title) => {
      const match = text.match(regExp);
      const ogMatch = text.match(ogRegExp);

      return (match?.[1] || ogMatch?.[1] || fallback) as string;
    };

    const title = textMatch(
      /<title>(.*?)<\/title>/i,
      /<meta property="og:title" content="(.*?)"/i,
      '301 Permanent Redirect',
    );
    const description = isDiscord
      ? await getDiscordDescription()
      : textMatch(
        /<meta name="description" content="(.*?)"/i,
        /<meta property="og:description" content="(.*?)"/i,
        compareStrings(title, '301 Permanent Redirect') === 0 ? `Location ${url}` : metadata.description,
      );
    const ogImageMatch = text.match(/<meta property="og:image" content="(.*?)"/i);

    const ogImages = ogImageMatch ? [{ url: ogImageMatch[1] }] : metadata.openGraph?.images;
    const twitterImages = ogImageMatch ? [ogImageMatch[1]] : metadata.twitter?.images;

    return {
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

  return fetchMetadata(target.href, target.label);
};

const Index: FC<IndexProps> = async ({ params }) => {
  const { redirectLink } = await params;
  const target = Object.values(redirects).find(item => item.redirect === `/${redirectLink}`);

  if (target?.href) {
    redirect(target.href);
  }

  notFound();
};
export default Index;
