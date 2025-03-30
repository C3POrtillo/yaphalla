import { cache } from 'react';

import type { RedirectType } from '@/utils/pathsRedirect';
import type { Metadata, Viewport } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { metadata, viewport } from '@/app/(main)/layout';
import Redirect from '@/components/redirect/Redirect';
import { getTarget } from '@/components/redirect/utils';
import Root from '@/components/root/Root';
import { domain } from '@/utils/paths';
import { redirects } from '@/utils/pathsRedirect';
import { compareStrings, discordInviteAPI } from '@/utils/utils';

export interface RedirectPageProps {
  params: Promise<{
    redirectLink: string;
  }>;
}

const fetchDiscordStats = cache(async (invite = 'yaphalla'): Promise<{ members: number; online: number }> => {
  const data = await (await fetch(discordInviteAPI(invite), { method: 'GET' })).json();

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
    keywords,
    noIndex,
    image,
    card,
    fetchImage,
  }: RedirectType): Promise<Metadata> => {
    try {
      const isDiscord = !compareStrings(label, redirects['/discord'].label);
      const fallbackOgImages = metadata.openGraph?.images;
      const fallbackTwitterImages = metadata.twitter?.images;
      const createMetadata = (
        title: string | undefined,
        description: string | undefined,
        siteName: string | undefined,
        og: typeof fallbackOgImages,
        twitter: typeof fallbackTwitterImages,
      ) => ({
        title,
        description,
        keywords,
        robots: noIndex
          ? {
            index: false,
            follow: false,
          }
          : undefined,
        openGraph: {
          title,
          description,
          url,
          siteName,
          images: image
            ? [
              {
                url: image,
                width: 128,
                height: 128,
                alt: title,
              },
            ]
            : og,
        },
        twitter: {
          card: card || 'summary',
          title,
          description,
          site: siteName,
          images: image ? [image] : twitter,
        },
      });

      if (isDiscord) {
        const invite = url.split('/').slice(-1)[0];
        const { members, online } = await fetchDiscordStats(invite);
        const description = `🟢 ${online} Online\n⚫ ${members} Members`;
        const youtubeImage = fetchImage && (await fetchImage());
        const discordOg = youtubeImage || fallbackOgImages;
        const discordTwitter = youtubeImage || fallbackTwitterImages;

        return createMetadata(targetTitle, description, site, discordOg, discordTwitter);
      }
      const fetchUrl = !compareStrings(label, 'Root') ? `https://${domain}${url}` : url;
      const text = await (await fetch(fetchUrl, { method: 'GET' })).text();
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
      const ogImages = ogImageMatch ? [{ url: ogImageMatch[1] }] : fallbackOgImages;
      const twitterImages = ogImageMatch ? [ogImageMatch[1]] : fallbackTwitterImages;

      return createMetadata(title, description, ogSite, ogImages, twitterImages);
    } catch (error) {
      console.error('Metadata fetch error:', error);

      return metadata;
    }
  },
);

export const generateViewport = async ({ params }: RedirectPageProps): Promise<Viewport> => {
  const { redirectLink } = await params;
  const target = getTarget(redirectLink);

  return {
    themeColor: target?.themeColor ? target.themeColor : viewport.themeColor,
  };
};

export const generateMetadata = async ({ params }: RedirectPageProps): Promise<Metadata> => {
  const { redirectLink } = await params;
  const target = getTarget(redirectLink);

  if (!target?.href) {
    return metadata;
  }

  return fetchMetadata(target);
};

const Layout: FC<RedirectPageProps & PropsWithChildren> = async ({ params, children }) => {
  const { redirectLink } = await params;
  const target = getTarget(redirectLink);
  const head = target?.href && target.href !== target.redirect && (
    <meta httpEquiv="refresh" content={`0; url=${target.href}`} />
  );

  return (
    <Root head={head} hideBreadcrumbs={!!target?.href}>
      {target?.href && <Redirect href={target.href} parent={target.redirect} hidden />}
      {children}
    </Root>
  );
};

export default Layout;
