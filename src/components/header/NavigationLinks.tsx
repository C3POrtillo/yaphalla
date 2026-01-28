'use client';

import type { NavigationLinkType } from '@/components/header/types';
import type { FC } from 'react';

import DesktopLinks from '@/components/header/DesktopLinks';
import MobileLinks from '@/components/header/MobileLinks';

interface NavigationLinkProps {
  variant?: 'desktop' | 'mobile';
  links?: NavigationLinkType[] | null;
}

const NavigationLinks: FC<NavigationLinkProps> = ({ variant = 'desktop', links }) => {
  if (!links || !links.length || links === undefined) {
    return null;
  }

  return variant === 'desktop' ? (
    <div className="flex flex-row gap-1">
      <DesktopLinks links={links} />
    </div>
  ) : (
    <div className="flex flex-col gap-1 w-full">
      <MobileLinks links={links} />
    </div>
  );
};

export default NavigationLinks;
