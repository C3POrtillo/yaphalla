import { twMerge } from 'tailwind-merge';


import type { Cookie } from '@/utils/siteTypes';
import type { Metadata } from 'next';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import type { ClassNameValue } from 'tailwind-merge';

import { TITLE } from '@/utils/types';

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

export const classMerge = (...strings: (ClassNameValue | boolean)[]) =>
  twMerge(...(strings.filter(Boolean) as ClassNameValue[]));

const imageURL = 'https://www.yaphalla.com/assets/images/yaphalla-dog.png';

export const createMetadata = ({ title = TITLE, description = '', siteName = TITLE, image = imageURL }): Metadata => ({
  title,
  description,
  keywords: ['Yaphalla', 'AFKJ', 'AFKJourney', 'AFK Journey', 'AFKJ Guides', 'AFKJourney Guides', 'AFK Journey Guides'],
  icons: {
    icon: image,
    shortcut: image,
    apple: image,
  },
  openGraph: {
    title,
    description,
    siteName,
    images: [
      {
        url: image,
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
    images: [image],
  },
});

export const discordInviteAPI = (invite = 'yaphalla') => `https://discord.com/api/invites/${invite}?with_counts=true`;

export const testRegExp = (str: string | undefined, regExp?: RegExp | false) =>
  regExp === undefined || regExp === false || str === undefined || regExp?.test(str);

export const isDevMode = (searchParams: ReadonlyURLSearchParams) =>
  !compareStrings(searchParams.get('mode')?.toLocaleLowerCase() || '', 'dev');

export const getParamTab = (searchParams: ReadonlyURLSearchParams) => searchParams.get('tab')?.toLocaleLowerCase();

export const internalLinkFilter = ({ href }: { href?: string }) => href === undefined || href[0] === '/';
export const getHref = ({ href }: { href?: string }) => href;

export const brandIcon = (string: string) => `fa6-brands:${string}` as const;

export const generateCookie = (key: string, value: string | number, age: number = 31536000) =>
  `${key}=${value}; path=/; max-age=${age}` as Cookie;

export const getCookie = (key: string): string | undefined => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${key}=([^;]*)`));

  return match?.[1];
};
export const setCookie = (cookie: Cookie) => {
  document.cookie = cookie;
};

const splitNameAndCapitalize = (name: string, character: string) =>
  name
    .split(character)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(character);

export const sanitizeUnit = (unit: string) => {
  let sanitized = unit.replaceAll('-', ' ');
  for (const character of [' ', "'"]) {
    sanitized = splitNameAndCapitalize(sanitized, character);
  }
  sanitized = sanitized.replaceAll('undefined', '');
  sanitized = sanitized.replaceAll('Undefined', '');

  return sanitized;
};

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const encodeIndex = (index: number) => ALPHABET[index];

export const hashHeroName = (unit: string) => {
  let hash = 0;
  for (let i = 0; i < unit.length; i++) {
    hash = (hash * 31 + unit.charCodeAt(i)) >>> 0;
  }

  return hash;
};

export const toBase62 = (number: number) => {
  let s = '';
  do {
    s = ALPHABET[number % 62] + s;
    number = Math.floor(number / 62);
  } while (number > 0);

  return s;
};
