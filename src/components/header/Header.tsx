import Image from 'next/image';

import Socials from '@/components/socials/Socials';

import type { FC } from 'react';

import Breadcrumbs from '@/components/header/Breadcrumbs';
import Link from '@/components/header/Link';
import { afkj } from '@/utils/paths';

interface HeaderProps {
  slug?: string[];
}

const Header: FC<HeaderProps> = ({ slug }) => {
  const navLinks = afkj.slice(1).map(data => {
    const className = 'bg-hover text-link text-hover';

    return <Link className={className} key={data.path} {...data} />;
  });

  return (
    <>
      <header className="header sticky-header relative flex flex-col place-items-center justify-center bg-neutral-900 text-center shadow-md shadow-black lg:py-3">
        <div className="flex mx-auto min-h-6 w-full max-w-7xl flex-row items-center justify-between gap-4 px-4">
          <div className="flex flex-row items-center gap-6">
            <div className="relative h-16 logo">
              <Link path="/">
                <Image src="/assets/images/yaphalla-logo.png" alt="Homepage" fill />
              </Link>
            </div>
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
