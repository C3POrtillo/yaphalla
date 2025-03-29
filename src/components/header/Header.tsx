
import type { FC } from 'react';

import Accordion from '@/components/accordion/accordion';
import { LinkClasses } from '@/components/header/types';
import { getLgCols } from '@/components/header/utils';
import Link from '@/components/link/Link';
import LogoLink from '@/components/link/Logo';
import Socials from '@/components/socials/Socials';
import Tooltip from '@/components/tooltip/Tooltip';
import { navigation } from '@/utils/paths';
import { joinStrings } from '@/utils/utils';

const Header: FC = () => {
  const navLinks = navigation.slice(1).map(data => {
    const { href: slug, label: title, options: rootOptions, hideMobileOptions } = data;
    const tooltip = rootOptions && (
      <div className="flex flex-col gap-2 overflow-auto lg:flex-row">
        {rootOptions.map(
          ({ label, options }) =>
            options && (
              <div key={label} className="flex flex-col">
                <h2 className="hidden text-sm border-b-2 mb-1 border-tertiary-600 w-full text-left text-tertiary-600 lg:block">
                  {label}
                </h2>
                <div className={joinStrings('inset-secondary grid gap-1 grid-cols-1', getLgCols(options.length))}>
                  {options.map(({ ...contentData }) => (
                    <Link key={contentData.label} className={joinStrings(LinkClasses, 'p-1')} {...contentData} />
                  ))}
                </div>
              </div>
            ),
        )}
      </div>
    );

    const accordionLink = !!tooltip && (
      <div className="w-full block lg:hidden">
        <Accordion key={`${slug || title} Accordion`} label={title} hierarchy="primary">
          {tooltip}
        </Accordion>
      </div>
    );

    if (!slug && tooltip) {
      return (
        <>
          {accordionLink}
          <div
            key={title}
            className={joinStrings('relative group hidden text-base !cursor-default', LinkClasses, 'p-2 lg:flex')}
          >
            {title}
            <Tooltip className="top-full !bg-primary-950 !w-max" pointerEvents>
              {tooltip}
            </Tooltip>
          </div>
        </>
      );
    }

    const mainLink = (
      <Link
        className={joinStrings(
          LinkClasses,
          'p-2',
          tooltip && 'group-secondary',
          tooltip && !hideMobileOptions && '!hidden lg:flex',
        )}
        tooltip={tooltip}
        {...data}
        hideMobileTooltip={hideMobileOptions}
      />
    );

    return (
      <div key={slug || title} className="w-full lg:w-fit">
        {!hideMobileOptions && accordionLink}
        {mainLink}
      </div>
    );
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
          <div className="inset-primary flex flex-col gap-2 items-center p-2 bg-primary-800 overflow-auto">
            {navLinks}
            <Socials />
          </div>
        </Accordion>
      </div>
    </header>
  );
};

export default Header;
