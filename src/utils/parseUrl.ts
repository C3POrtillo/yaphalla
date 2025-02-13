import Link from 'next/link';
import { domain } from '@/utils/paths';

const parseUrl = (href?: string) => {
  if (!href) {
    return {
      component: 'button',
      href: '',
    } as const;
  }
  const isPath = href[0] === '/';
  if (isPath) {
    return {
      component: Link,
      href,
      isInternal: true,
    };
  }

  let url: URL;
  try {
    url = new URL(href);
  } catch (error) {
    throw new Error(`Invalid URL: ${href} - ${error}`);
  }
  const isInternal = url.hostname === `www.${domain}` || url.hostname === domain;

  return {
    component: isInternal ? Link : 'a',
    rel: isInternal ? '' : 'noreferrer noopener',
    target: isInternal ? '' : '_blank',
    href: isInternal ? url.href.split(url.host)[1] : href,
    isInternal,
  } as const;
};

export default parseUrl;
