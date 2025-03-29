import type { CreatorData } from '@/utils/pathsCreators';

import { creators } from '@/utils/pathsCreators';
import { redirects } from '@/utils/pathsRedirect';
import { compareStrings, getHref, internalLinkFilter, sortData } from '@/utils/utils';

export const domain = 'yaphalla.com' as const;

export type PathType = {
  href?: string;
  label?: string;
  options?: readonly PathType[];
  hideMobileOptions?: boolean;
};

type ValidHrefs = ('Discord' | 'YouTube' | 'Bilibili')[];

const processCreators = (filter: (creator: CreatorData) => boolean, hrefs: ValidHrefs) =>
  Object.values(creators)
    .filter(filter)
    .sort(({ label: a }, { label: b }) => compareStrings(a, b))
    .map(
      ({ label, ...props }) =>
        ({
          label,
          href: hrefs.map(site => props[site]).filter(Boolean)[0],
        }) as PathType,
    );

export const socials = {
  Discord: {
    site: 'discord',
    href: 'https://discord.gg/yaphalla',
  },
  Twitter: {
    site: 'x-twitter',
    href: 'https://x.com/yaphalla',
  },
  Instagram: {
    site: 'instagram',
    href: 'https://www.instagram.com/yaphallaafkj/',
  },
} as const;

export const supportEmail = {
  href: `mailto:support@${domain}`, // TO-DO make zoho mail account if we need it
  label: 'Contact Support',
} as const;

const paths = {
  Home: {
    href: '/',
    label: 'Home',
  },
  Editor: {
    href: '/editor',
    label: 'New Formation',
  },
  // Talents: {
  //   href: '/talents',
  //   label: 'Talents',
  // },
  Creators: {
    href: '/creators',
    label: 'Creators',
    options: [
      {
        label: 'Creators',
        options: processCreators(({ YouTube, Bilibili }) => !!(YouTube || Bilibili), ['YouTube', 'Bilibili']),
      },
      { label: 'Discords', options: processCreators(({ Discord }) => !!Discord, ['Discord']) },
    ],
    hideMobileOptions: true,
  },
  Communities: {
    href: undefined,
    label: 'Communities',
    options: [
      {
        label: 'Discords',
        options: [
          {
            href: redirects['/fight-club'].href,
            label: 'Fight Club',
          },
          {
            href: redirects['/vn'].href,
            label: 'Vietnam Server',
          },
          {
            href: redirects['/official'].href,
            label: 'Official Server',
          },
        ],
      },
    ],
  },
  Leaderboards: {
    href: undefined,
    label: 'Leaderboards',
    options: [
      {
        label: 'Google Sheets',
        options: [
          {
            href: '/primal-lord',
            label: 'Primal Lord',
          },
          {
            href: '/battle-drills',
            label: 'Battle Drills',
          },
        ],
      },
    ],
  },
  Other: {
    href: undefined,
    label: 'Other',
    options: [
      {
        label: 'Tools',
        options: [
          {
            href: '/editor/priority',
            label: 'New Priority List',
          },
        ],
      },
      {
        label: 'Miscellaneous',
        options: [
          {
            href: '/paragon-form',
            label: 'Paragon Form',
          },
          {
            href: '/emotes',
            label: 'Emoji Server',
          },
        ],
      },
    ],
  },
} as const;

const previews = {
  Previews: {
    href: '/preview' as const,
    label: 'Previews',
  },
  Inputs: {
    href: '/preview/inputs' as const,
    label: 'Inputs',
  },
} as const;

export const validHrefs = new Set([
  ...(
    [...Object.values(paths), ...Object.values(previews)]
      .filter(internalLinkFilter)
      .flatMap(({ href, options: root }: PathType) => [
        href,
        ...(root ? root.flatMap(({ options }) => options?.filter(internalLinkFilter).map(getHref)) : []),
      ])
      .filter(Boolean) as string[]
  ).sort(sortData),
  ...Object.values(redirects)
    .filter(({ noIndex }) => !noIndex)
    .map(({ redirect }) => redirect),
]);

export const navigation = [
  paths['Home'],
  paths['Editor'],
  paths['Creators'],
  paths['Communities'],
  paths['Leaderboards'],
  paths['Other'],
] as PathType[];
