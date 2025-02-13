'use client';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import type { PathType } from '@/utils/paths';
import type { FC, PropsWithChildren } from 'react';

import parseUrl from '@/utils/parseUrl';
import { validHrefs } from '@/utils/paths';
import { joinStrings } from '@/utils/utils';

interface LinkProps extends PathType, PropsWithChildren {
  className?: string;
  disabled?: boolean;
}

const Link: FC<LinkProps> = ({ href, label, className, disabled, children, ...props }) => {
  const currentPath = usePathname();
  const { href: parsedHref, isInternal, ...linkData } = parseUrl(href);
  const activeClass = (disabled ?? currentPath === parsedHref) && 'active-link';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const invalidLinkClass = isInternal && href && !validHrefs.has(href as any) && 'pointer-events-none';

  return (
    <NextLink
      key={parsedHref}
      href={parsedHref}
      className={joinStrings('flex items-center', className, activeClass, invalidLinkClass)}
      {...linkData}
      {...props}
    >
      {label}
      {children}
    </NextLink>
  );
};

export default Link;
