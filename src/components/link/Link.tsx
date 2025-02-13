'use client';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import type { PathType } from '@/utils/paths';
import type { FC, PropsWithChildren } from 'react';

import parseUrl from '@/utils/parseUrl';
import { joinStrings } from '@/utils/utils';

interface LinkProps extends PathType, PropsWithChildren {
  className?: string;
  disabled?: boolean;
}

const Link: FC<LinkProps> = ({ href, label, className, disabled, children, ...props }) => {
  const currentPath = usePathname();
  const linkData = parseUrl(href);
  const disabledClass = (disabled ?? currentPath === linkData.href) && 'disabled-link';

  return (
    <NextLink
      key={linkData.href}
      className={joinStrings('flex items-center', className, disabledClass)}
      {...linkData}
      {...props}
    >
      {label}
      {children}
    </NextLink>
  );
};

export default Link;
