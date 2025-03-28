'use client';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import type { PathType } from '@/utils/paths';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import Tooltip from '@/components/tooltip/Tooltip';
import parseUrl from '@/utils/parseUrl';
import { validHrefs } from '@/utils/paths';
import { joinStrings } from '@/utils/utils';

interface LinkProps extends PathType, PropsWithChildren {
  className?: string;
  disabled?: boolean;
  tooltip?: ReactNode;
  hideMobileTooltip?: boolean;
}

const Link: FC<LinkProps> = ({ href, label, className, disabled, children, tooltip, hideMobileTooltip, ...props }) => {
  const currentPath = usePathname();
  const { href: parsedHref, isInternal, ...linkData } = parseUrl(href);
  const activeClass = (disabled ?? currentPath === parsedHref) && 'active-link';
  const invalidLinkClass =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !href || (!tooltip && isInternal && parsedHref && !validHrefs.has(parsedHref as any) && 'pointer-events-none');

  const link = (
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

  return tooltip ? (
    <div className={joinStrings(!!tooltip && 'relative group flex items-center justify-center max-lg:w-full')}>
      {link}
      {tooltip && (
        <Tooltip
          className={joinStrings(
            'top-full !bg-primary-950 !w-max',
            hideMobileTooltip && '!group-hover:hidden !group-active:hidden lg:group-hover:block lg:group-active:block',
          )}
          pointerEvents
        >
          {tooltip}
        </Tooltip>
      )}
    </div>
  ) : (
    link
  );
};

export default Link;
