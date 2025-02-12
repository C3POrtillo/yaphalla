'use client'
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import type { PathType } from '@/utils/paths';
import type { FC, PropsWithChildren } from 'react';

import { joinStrings } from '@/utils/utils';

interface LinkProps extends PathType, PropsWithChildren {
  className?: string;
  disabled?: boolean;
  target?: '_blank';
}

const Link: FC<LinkProps> = ({ path, label, isExternal, className, disabled, children, target }) => {
  const currentPath = usePathname();
  const href = isExternal && path ? path : `/${path}`;
  const disabledClass = (disabled ?? currentPath === href) && 'disabled-link';

  return (
    <NextLink key={path} href={href} className={joinStrings(className, disabledClass)} target={target}>
      {label}
      {children}
    </NextLink>
  );
};

export default Link;
