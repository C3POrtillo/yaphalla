import { cache } from 'react';

import type { RedirectType } from '@/utils/paths';
import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { metadata } from '@/app/(main)/layout';
import Redirect from '@/components/redirect/Redirect';
import Root from '@/components/root/Root';
import { redirects } from '@/utils/paths';
import { discordInviteAPI } from '@/utils/types';
import { compareStrings } from '@/utils/utils';

interface ParamProps {
  params: Promise<{
    redirectLink: string;
  }>;
}

const fetchDiscordStats = cache(async (): Promise<{ members: number; online: number }> => {
  const response = await fetch(discordInviteAPI, { method: 'GET' });
  const data = await response.json();

  return {
    members: data.approximate_member_count,
    online: data.approximate_presence_count,
  };
});

const createMetaString = (prop: string) => `<meta ${prop} content="(.*?)"`;

const fetchMetadata = cache(
  async ({
    href: url,
    label,
    title: targetTitle,
    description: targetDescription,
    site,
  }: RedirectType): Promise<Metadata> => {
    try {
      const isDiscord = compareStrings(label, redirects['/discord'].label) === 0;
      if (isDiscord) {
        const { members, online } = await fetchDiscordStats();
        const title = targetTitle;
        const description = `${metadata.description}\n🟢 ${online} Online\n⚫ ${members} Members`;

        return {
          title,
          description,
          openGraph: {
            title,
            description,
            url,
            siteName: site,
            images: metadata?.openGraph?.images,
          },
          twitter: {
            card: 'summary',
            title,
            description,
            site,
            images: metadata?.twitter?.images,
          },
        };
      }

      const text = await (await fetch(url, { method: 'GET' })).text();

      const textMatch = (fallback: string | null | undefined, ...regExp: string[]) => {
        const matchPattern = (pattern: string) => text.match(new RegExp(pattern, 'is'))?.[1];
        const match = regExp.map(matchPattern).find(Boolean);

        return (match || fallback || '308 Permanent Redirect') as string;
      };

      const title = targetTitle || textMatch(null, '<title>(.*?)</title>', createMetaString('property="og:title"'));

      const description =
        targetDescription ||
        textMatch(metadata.description, ...['name="description"', 'property="og:description"'].map(createMetaString));

      const ogSite = site || textMatch('Yaphalla', createMetaString('property="og:site_name"'));
      const ogImageMatch = text.match(new RegExp('<meta property="og:image" content="(.*?)"', 'is'));

      const ogImages = ogImageMatch ? [{ url: ogImageMatch[1] }] : metadata.openGraph?.images;
      const twitterImages = ogImageMatch ? [ogImageMatch[1]] : metadata.twitter?.images;

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          url,
          siteName: ogSite,
          images: ogImages,
        },
        twitter: {
          card: 'summary',
          title,
          description,
          site: ogSite,
          images: twitterImages,
        },
      };
    } catch (error) {
      console.error('Metadata fetch error:', error);

      return metadata;
    }
  },
);

export const generateMetadata = async ({ params }: ParamProps): Promise<Metadata> => {
  const { redirectLink } = await params;
  const target = redirects[`/${redirectLink}` as keyof typeof redirects];

  if (!target?.href) {
    return metadata;
  }

  return fetchMetadata(target);
};

const Layout: FC<ParamProps & PropsWithChildren> = async ({ params, children }) => {
  const { redirectLink } = await params;
  const target = redirects[`/${redirectLink}` as keyof typeof redirects];
  const head = target?.href && <meta httpEquiv="refresh" content={`0; url=${target.href}`} />;

  return (
    <Root head={head} hideBreadcrumbs={!!target?.href}>
      {target?.href && <Redirect href={target.href} hidden />}
      {children}
    </Root>
  );
};

export default Layout;
