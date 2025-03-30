
import type { FC } from 'react';

import Accordion from '@/components/accordion/accordion';
import SubLinks from '@/components/header/SubLinks';
import { LinkClasses } from '@/components/header/types';
import { getLgCols, getLinkIcon } from '@/components/header/utils';
import Link from '@/components/link/Link';
import LogoLink from '@/components/link/Logo';
import Socials from '@/components/socials/Socials';
import Tooltip from '@/components/tooltip/Tooltip';
import { navigation } from '@/utils/paths';
import { joinStrings } from '@/utils/utils';

const Header: FC = () => {
  const navLinks = navigation.slice(1).map(({ options: rootOptions, hideMobileOptions, ...data }) => {
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
      <div className="w-full block lg:hidden">
        <Accordion key={`${slug || title} Accordion`} label={slug ? rootOptions[0].label : title} hierarchy="primary">
          <div
            className="inset-secondary grid gap-1 grid-cols-1 !p-1 !rounded-t-none">
            {slug && (
              <Link key={slug} className={joinStrings(LinkClasses, 'p-1')} href={slug} {...data}>
                {rootIcon}
              </Link>
            )}
            {rootOptions
              .flatMap(({ options }) => options)
              .filter(path => !!path)
              .map(({ href, label }, i) => {
                const iconName = getLinkIcon(href);
                const icon = !!iconName && <i className={joinStrings('!text-base w-5', iconName)} />;

                return (
                  <Link
                    key={`${label}-${i}`}
                    href={href}
                    label={label}
                    className={joinStrings(LinkClasses, 'p-1')}
                  >
                    {icon}
                  </Link>
                );
              })}
          </div>
        </Accordion>
      </div>
    );

    if (!slug && tooltip) {
      return (
        <>
          {accordionLink}
          <div
            key={title}
            className={joinStrings(
              'relative group hidden items-center',
              LinkClasses,
              'text-base !cursor-default !text-white p-2 lg:flex',
            )}
          >
            {rootIcon}
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
          tooltip && !hideMobileOptions && '!hidden lg:!flex',
        )}
        tooltip={tooltip}
        {...data}
        hideMobileTooltip={hideMobileOptions}
      >
        {rootIcon}
      </Link>
    );

    return (
      <div key={slug || title} className="flex items-center w-full lg:w-fit">
        {!hideMobileOptions && accordionLink}
        {mainLink}
      </div>
    );
  });

  return (
    <header className="relative header sticky-header min-h-14">
      <div className="mx-auto hidden min-h-6 w-full max-w-7xl flex-row items-center justify-between gap-4 px-4 lg:flex">
        <div className="flex flex-row items-center gap-6">
          <LogoLink />
          <div className="flex flex-row gap-4">{navLinks}</div>
        </div>
        <div className="flex flex-row items-center gap-6">
          <Socials />
        </div>
      </div>
      <div className="absolute flex w-full top-0 flex-row lg:hidden z-10">
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
