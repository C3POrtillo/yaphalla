import { cache } from 'react';

import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { metadata } from '@/app/(main)/layout';
import Root from '@/components/root/Root';
import { redirects } from '@/utils/paths';
import { discordInviteAPI } from '@/utils/types';
import { compareStrings } from '@/utils/utils';

interface ParamProps {
  params: Promise<{
    redirectLink: string;
  }>;
}

const { approximate_member_count: members, approximate_presence_count: online }: Record<string, number> = cache(
  await (await fetch(discordInviteAPI, { method: 'GET' })).json(),
);

const fetchMetadata = cache(async (url: string, label: string): Promise<Metadata> => {
  try {
    const isDiscord = compareStrings(label, redirects['/discord'].label) === 0;
    if (isDiscord) {
      const title = 'Join the Yaphalla Discord!';
      const description = `${metadata.description}\n🟢 ${online} Online ⚫ ${members} Members`;

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          url,
          images: metadata?.openGraph?.images,
        },
        twitter: {
          title,
          description,
          images: metadata?.twitter?.images,
        },
      };
    }

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
  const target = redirects[`/${redirectLink}` as keyof typeof redirects];

  if (!target) {
    return metadata;
  }

  return fetchMetadata(target.href, target.label);
};

const Layout: FC<ParamProps & PropsWithChildren> = async ({ params, children }) => {
  const { redirectLink } = await params;
  const target = redirects[`/${redirectLink}` as keyof typeof redirects];
  const head = target && <meta httpEquiv="refresh" content={`0; url=${target.href}`} />;

  return <Root head={head}>{children}</Root>;
};

export default Layout;
