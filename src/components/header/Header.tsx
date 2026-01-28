import type { NavigationLinkType } from '@/components/header/types';
import type { FC } from 'react';

import Accordion from '@/components/accordion/Accordion';
import NavigationLinks from '@/components/header/NavigationLinks';
import LogoLink from '@/components/link/Logo';
import Socials from '@/components/socials/Socials';
import { getHeader } from '@/sanity/client';

const Header: FC = async () => {
  const data = await getHeader();

  return (
    <header className="sticky header min-h-14 z-50 top-0 isolate">
      <div className="hidden mx-auto min-h-6 w-full max-w-7xl flex-row items-center justify-between gap-4 px-4 lg:flex">
        <div className="flex flex-row items-center gap-6">
          <LogoLink />
          <NavigationLinks links={data?.[0]?.navigation as unknown as NavigationLinkType[]} />
        </div>
        <div className="flex flex-row items-center gap-6">
          <Socials />
        </div>
      </div>
      <div className="absolute flex w-full min-h-14 top-0 flex-row lg:hidden">
        <Accordion
          label={<LogoLink />}
          hierarchy="tertiary"
          icon="menu"
          ariaLabel="Toggle Navigation Menu"
          labelIsClickable={false}
        >
          <div className="content-box-solid flex flex-col gap-2 overflow-auto !rounded-t-none">
            <NavigationLinks links={data?.[0]?.navigation as unknown as NavigationLinkType[]} variant="mobile" />

            <Socials />
          </div>
        </Accordion>
      </div>
    </header>
  );
};

export default Header;
