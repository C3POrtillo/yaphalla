import type { FC } from 'react';

import Accordion from '@/components/accordion/accordion';
import Link from '@/components/link/Link';
import LogoLink from '@/components/link/Logo';
import Socials from '@/components/socials/Socials';
import { navigation } from '@/utils/paths';
import { creators } from '@/utils/pathsCreators';
import { compareStrings, joinStrings } from '@/utils/utils';

const Header: FC = () => {
  const navLinks = navigation.slice(1).map(data => {
    const className = 'flex w-full rounded-lg input-secondary justify-center lg:w-fit';
    if (!compareStrings(data.label!, 'Creators')) {
      const videos = Object.values(creators)
        .filter(({ YouTube, Bilibili }) => !!(YouTube || Bilibili))
        .sort(({ label: a }, { label: b }) => compareStrings(a, b))
        .map(({ label, YouTube, Bilibili }) => (
          <Link key={label} className={className} label={label} href={YouTube || Bilibili} />
        ));

      const discords = Object.values(creators)
        .filter(({ Discord }) => !!Discord)
        .sort(({ label: a }, { label: b }) => compareStrings(a, b))
        .map(({ label, Discord }) => <Link key={label} className={joinStrings(className, 'p-1')} label={label} href={Discord} />);

      return (
        <>
          <Link
            className={joinStrings('group', className, 'p-2')}
            key={data.href}
            tooltip={
              <div className="flex flex-row gap-2">
                <div className="flex flex-col">
                  <h2 className="text-base border-b-2 mb-1 border-tertiary-600 w-full text-left text-tertiary-600">
                    Discords
                  </h2>
                  <div className="inset-secondary grid grid-cols-2 gap-1">{discords}</div>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-base border-b-2 mb-1 border-tertiary-600 w-full text-left text-tertiary-600">
                    Creators
                  </h2>
                  <div className="inset-secondary grid grid-cols-3 gap-1">{videos}</div>
                </div>
              </div>
            }
            hideMobileTooltip
            {...data}
          />
        </>
      );
    }

    return <Link className={joinStrings(className, 'p-2')} key={data.href} {...data} />;
  });

  return (
    <header className="header sticky-header">
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
  );
};

export default Header;
