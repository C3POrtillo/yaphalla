'use client';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import type { HierarchyType, SizeType } from '@/utils/types';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import SublinkContainer from '@/components/link/SublinkContainer';
import parseUrl from '@/utils/parseUrl';
import { classMerge } from '@/utils/utils';

interface LinkProps extends PropsWithChildren {
  href: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  tooltip?: ReactNode;
  hideMobileTooltip?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
  hierarchy?: HierarchyType;
  size?: SizeType;
}

const Link: FC<LinkProps> = ({
  href,
  label,
  className,
  disabled,
  children,
  tooltip,
  hideMobileTooltip,
  hierarchy,
  size,
  ...props
}) => {
  const currentPath = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { href: parsedHref, isInternal, ...linkData } = parseUrl(href);
  const isDisabled = disabled ?? currentPath === parsedHref;
  const invalidLinkClass = !href || (!tooltip && !parsedHref && 'pointer-events-none');

  const link = (
    <NextLink
      key={parsedHref}
      href={parsedHref}
      className={classMerge(
        'inline-flex flex-row gap-1',
        className,
        invalidLinkClass,
        hierarchy && `input-${hierarchy}`,
        size && `size-${size}`,
        isDisabled && 'pointer-events-none',
      )}
      {...linkData}
      {...props}
    >
      {children}
      {label}
    </NextLink>
  );

  return tooltip ? (
    <div
      className={classMerge(
        !!tooltip && 'relative z-90 group flex items-center justify-center max-xl:w-full',
        !hideMobileTooltip && 'hidden xl:flex',
      )}
    >
      {link}
      {tooltip && <SublinkContainer className={classMerge('top-full !w-max')}>{tooltip}</SublinkContainer>}
    </div>
  ) : (
    link
  );
};

export default Link;
