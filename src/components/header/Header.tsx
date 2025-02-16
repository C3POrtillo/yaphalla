import type { FC } from 'react';

import Breadcrumbs from '@/components/header/Breadcrumbs';
import Link from '@/components/link/Link';
import LogoLink from '@/components/link/Logo';
import Socials from '@/components/socials/Socials';
import { navigation } from '@/utils/paths';

interface HeaderProps {
  slug?: string[];
}

const Header: FC<HeaderProps> = ({ slug }) => {
  const navLinks = navigation
    .slice(1)
    .map(data => <Link className="size-base input-secondary" key={data.href} {...data} />);

  return (
    <>
      <header className="sticky-header relative flex flex-col place-items-center justify-center bg-neutral-900 text-center shadow-md shadow-black lg:py-3">
        <div className="flex mx-auto min-h-6 w-full max-w-7xl flex-row items-center justify-between gap-4 px-4">
          <div className="flex flex-row items-center gap-6">
            <LogoLink />
            <div className="flex flex-row gap-4">{navLinks}</div>
          </div>
          <div className="flex flex-row items-center gap-6">
            <Socials />
          </div>
        </div>
      </header>
      <Breadcrumbs slug={slug} />
    </>
  );
};

export default Header;
