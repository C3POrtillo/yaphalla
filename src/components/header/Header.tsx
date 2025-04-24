'use client';
import { Fragment, useEffect, useState } from 'react';

import type { FC } from 'react';

import Accordion from '@/components/accordion/Accordion';
import AccordionLinks from '@/components/header/AccordionLinks';
import SubLinks from '@/components/header/SubLinks';
import { LinkClasses } from '@/components/header/types';
import { getLgCols, getLinkIcon } from '@/components/header/utils';
import Button from '@/components/inputs/button/Button';
import Link from '@/components/link/Link';
import LogoLink from '@/components/link/Logo';
import Socials from '@/components/socials/Socials';
import Tooltip from '@/components/tooltip/Tooltip';
import { navigation } from '@/utils/paths';
import { generateCookie, getCookie, joinStrings, setCookie, solidIcon } from '@/utils/utils';

const Header: FC = () => {
  const [isSticky, setSticky] = useState<boolean>(true);
  const navLinks = navigation.slice(1).map(({ options: rootOptions, hideMobileOptions, ...data }, i) => {
    const { href: slug, label: title } = data;
    let rootIconName = getLinkIcon(slug);
    if (!slug) {
      rootIconName = getLinkIcon(title);
    }
    const rootIcon = !!rootIconName && <i className={joinStrings('!text-base w-5', rootIconName)} />;
    const isCol = rootOptions?.every(({ options }) => options && options?.length <= 4);
    const tooltip = rootOptions && (
      <div className={joinStrings('flex flex-col gap-2 overflow-auto', !isCol && 'lg:flex-row')}>
        {rootOptions.map(
          ({ label, options }) =>
            options && (
              <div key={label} className="flex flex-col">
                <h2 className="hidden text-sm border-b-2 mb-1 border-tertiary-600 w-full text-left text-tertiary-600 lg:block">
                  {label}
                </h2>
                <div
                  className={joinStrings(
                    'inset-secondary grid gap-1 grid-cols-1 !p-1 !rounded-t-none',
                    getLgCols(options.length),
                  )}
                >
                  <SubLinks className={rootOptions ? 'lg:hidden' : undefined} options={options} rootIcon={rootIcon} />
                </div>
              </div>
            ),
        )}
      </div>
    );
    const accordionLink = !!tooltip && (
      <AccordionLinks
        key={`${title}-accordion`}
        slug={slug}
        title={title}
        rootOptions={rootOptions}
        rootIcon={rootIcon}
      />
    );

    if (!slug && tooltip) {
      return (
        <Fragment key={`${i}-${slug || title}-fragment`}>
          {accordionLink}
          <div
            key={`${i}-${slug || title}-tooltip`}
            className={joinStrings(
              'relative group hidden items-center',
              LinkClasses,
              'text-base !cursor-default !text-white p-2 xl:flex',
            )}
          >
            {rootIcon}
            {title}
            <Tooltip className="top-full !bg-primary-950 !w-max" pointerEvents>
              {tooltip}
            </Tooltip>
          </div>
        </Fragment>
      );
    }

    const mainLink = (
      <Link
        className={joinStrings(
          LinkClasses,
          'p-2',
          tooltip && 'group-secondary',
          tooltip && !hideMobileOptions && '!hidden xl:!flex',
        )}
        tooltip={tooltip}
        {...data}
        hideMobileTooltip={hideMobileOptions}
      >
        {rootIcon}
      </Link>
    );

    return (
      <div key={`${i}-${slug || title}`} className="flex items-center w-full xl:w-fit">
        {!hideMobileOptions && accordionLink}
        {mainLink}
      </div>
    );
  });

  useEffect(() => {
    const cookie = getCookie('isSticky');
    if (cookie) {
      setSticky(!!Number(cookie));
    }
  }, []);
  useEffect(() => {
    setCookie(generateCookie('isSticky', isSticky ? '1' : '0'));
  }, [isSticky]);

  return (
    <header className={joinStrings('relative header min-h-14', isSticky && 'sticky-header')}>
      <Button
        className="hidden absolute right-2 text-xs xl:block size-8"
        size="sm"
        hierarchy="secondary"
        onClick={() => setSticky(!isSticky)}
      >
        <i className={solidIcon(isSticky ? 'thumbtack' : 'thumbtack-slash')} />
      </Button>
      <div className="mx-auto hidden min-h-6 w-full max-w-7xl flex-row items-center justify-between gap-4 px-4 xl:flex">
        <div className="flex flex-row items-center gap-6">
          <LogoLink />
          <div className="flex flex-row gap-1">{navLinks}</div>
        </div>
        <div className="flex flex-row items-center gap-6">
          <Socials />
        </div>
      </div>
      <div className="absolute flex w-full top-0 flex-row xl:hidden z-10">
        <Accordion
          className="header"
          label={<LogoLink />}
          hierarchy="tertiary"
          icon="bars"
          ariaLabel="Toggle Navigation Menu"
          labelIsClickable={false}
        >
          <div className="inset-primary flex flex-col gap-2 items-center p-2 bg-primary-800 overflow-auto mb-2">
            {navLinks}
            <Socials />
          </div>
        </Accordion>
      </div>
    </header>
  );
};

export default Header;
