import { cache } from 'react';

import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { metadata } from '@/app/(main)/layout';
import Root from '@/components/root/Root';
import { redirects } from '@/utils/paths';
import { discordInviteAPI } from '@/utils/types';
import { compareStrings, createMetadata } from '@/utils/utils';

interface ParamProps {
  params: Promise<{
    redirectLink: string;
  }>;
}

const fetchMetadata = cache(async (url: string): Promise<Metadata> => {
  try {
    const response = await fetch(url, { method: 'GET' });
    const text = await response.text();

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
    const description = textMatch(
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

export const generateMetadata = async ({ params }: ParamProps): Promise<Metadata> => {
  const { redirectLink } = await params;
  const target = Object.values(redirects).find(item => item.redirect === `/${redirectLink}`);

  if (!target) {
    return metadata;
  }

  const isDiscord = compareStrings(target.label, redirects.Discord.label) === 0;
  if (isDiscord) {
    const { approximate_member_count: members, approximate_presence_count: online }: Record<string, number> = await (
      await fetch(discordInviteAPI, { method: 'GET' })
    ).json();

    return createMetadata(
      'Join the Yaphalla Discord Server!',
      `${metadata.description}\n🟢 ${online} Online ⚫ ${members} Members`,
    );
  }

  return fetchMetadata(target.href);
};

const Layout: FC<ParamProps & PropsWithChildren> = async ({ params, children }) => {
  const { redirectLink } = await params;
  const target = Object.values(redirects).find(item => item.redirect === `/${redirectLink}`);
  const head = target && <meta httpEquiv="refresh" content={`0; url=${target.href}`} />;

  return <Root head={head}>{children}</Root>;
};

export default Layout;
