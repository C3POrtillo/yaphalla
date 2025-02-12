import type { NextSeoProps } from 'next-seo';
import type { FC } from 'react';

import Breadcrumbs from '@/components/header/Breadcrumbs';
import Link from '@/components/header/Link';
import { afkj } from '@/utils/paths';
import Image from 'next/image';

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
        <div className="mx-auto hidden min-h-6 w-full max-w-7xl flex-row items-center justify-start gap-4 px-4 lg:flex">
          <div className="flex w-full max-w-44 grow justify-start">
          <div className='relative h-16 logo'>
          <Link path='/'>
            <Image src={'/assets/images/yaphalla-logo.png'} alt={'Homepage'} fill/>
          </Link>
        </div>
          </div>
          <div className="mr-44 flex flex-row gap-1">{navLinks}</div>
        </div>
        <div className="flex min-h-8 w-full flex-row lg:hidden">
        </div>
      </header>
      <Breadcrumbs slug={slug} />
    </>
  );
};

export default Header;
