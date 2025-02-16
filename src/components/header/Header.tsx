import type { FC } from 'react';

import Accordion from '@/components/accordion/accordion';
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
    .map(data => (
      <Link className="flex w-full size-base input-secondary justify-center lg:w-fit" key={data.href} {...data} />
    ));

  return (
    <>
      <header className="header sticky-header relative flex flex-col place-items-center justify-center text-center shadow-md shadow-black lg:py-3">
        <div className="mx-auto hidden min-h-6 w-full max-w-7xl flex-row items-center justify-between gap-4 px-4 lg:flex">
          <div className="flex flex-row items-center gap-6">
            <LogoLink />
            <div className="flex flex-row gap-4">{navLinks}</div>
          </div>
          <div className="flex flex-row items-center gap-6">
            <Socials />
          </div>
        </div>
        <div className="flex min-h-8 w-full flex-row lg:hidden">
          <Accordion
            className="header"
            label={<LogoLink />}
            hierarchy="tertiary"
            icon="fa-bars"
            ariaLabel="Toggle Navigation Menu"
            labelIsClickable={false}
          >
            <div className="inset flex flex-col gap-3 items-center p-2 bg-primary-800">
              {navLinks}
              <Socials />
            </div>
          </Accordion>
        </div>
      </header>
      <Breadcrumbs slug={slug} />
    </>
  );
};

export default Header;
