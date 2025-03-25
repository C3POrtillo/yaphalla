import type { Metadata } from 'next';
import type { ReadonlyURLSearchParams } from 'next/navigation';

const wordSeparators = /[-_\\.+\s]+/g;
const notAlphaNumericOrSpace = /[^ a-zA-Z0-9]+/g;
const notAlphaNumericSpaceOrDash = /[^ a-zA-Z0-9-]/g;
const capitalizedFirstLetter = /[A-Z]+(?![a-z])|[A-Z]/g;

export const cleanString = (string: string) =>
  string
    .replace(wordSeparators, ' ')
    .replace(notAlphaNumericOrSpace, '')
    .replace(capitalizedFirstLetter, ($, ofs) => (ofs ? ' ' : '') + $.trim().toLowerCase())
    .replace(/\s+/, ' ')
    .trim();

const cleanStringArray = (string: string): string[] => cleanString(string).split(' ');

const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const titleCase = (string: string): string => {
  const capitalizedWords = cleanStringArray(string).map(word => capitalizeFirstLetter(word));

  return capitalizedWords.filter(Boolean).join(' ');
};

export const camelCase = (string: string): string => {
  const camelCasedWords = cleanStringArray(string).map((word, index) =>
    index === 0 ? word.toLowerCase() : capitalizeFirstLetter(word),
  );

  return camelCasedWords.join('');
};

export const kebabCase = (string: string) =>
  string
    .trim()
    .replace(wordSeparators, '-')
    .replace(notAlphaNumericSpaceOrDash, '')
    .replace(capitalizedFirstLetter, ($, ofs) => (ofs ? '-' : '') + $.trim().toLowerCase())
    .replace(/--+/g, '-');

export const compareStrings = (a: string, b: string) => a.localeCompare(b);

export const sortData = (a: string | number, b: string | number, isReversed?: boolean) => {
  if (typeof a === 'number' && typeof b === 'number') {
    if (a === 0 && b !== 0) {
      return 1;
    }
    if (b === 0 && a !== 0) {
      return -1;
    }

    return isReversed ? b - a : a - b;
  }
  if (typeof a === 'string' && typeof b === 'string') {
    return isReversed ? compareStrings(b, a) : compareStrings(a, b);
  }

  return 0;
};

export const delimitNumber = (number: number) => Number(number.toFixed(0)).toLocaleString('en', { useGrouping: true });

export const roundToHundreth = (number: number) => number.toFixed(2);

export const joinStrings = (...strings: (string | number | boolean | undefined | null)[]) =>
  strings.filter(Boolean).join(' ');

const imageURL = 'https://www.yaphalla.com/assets/images/yaphalla-dog.png';

export const createMetadata = (title: string, description: string, siteName = 'Yaphalla'): Metadata => ({
  title,
  description,
  keywords: ['Yaphalla', 'AFKJ', 'AFKJourney', 'AFK Journey', 'AFKJ Guides', 'AFKJourney Guides', 'AFK Journey Guides'],
  icons: {
    icon: imageURL,
    shortcut: imageURL,
    apple: imageURL,
  },
  openGraph: {
    title,
    description,
    siteName,
    images: [
      {
        url: imageURL,
        width: 128,
        height: 128,
        alt: title,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title,
    description,
    site: siteName,
    images: [imageURL],
  },
});

export const discordInviteAPI = (invite = 'yaphalla') => `https://discord.com/api/invites/${invite}?with_counts=true`;

export const testRegex = (str: string, regExp?: RegExp | false) =>
  regExp === undefined || regExp === false || regExp?.test(str);

export const isDevMode = (searchParams: ReadonlyURLSearchParams) =>
  compareStrings(searchParams.get('mode')?.toLocaleLowerCase() || '', 'dev') === 0;
