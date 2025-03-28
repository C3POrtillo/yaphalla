import type { FC } from 'react';

import Accordion from '@/components/accordion/accordion';
import Link from '@/components/link/Link';
import LogoLink from '@/components/link/Logo';
import Socials from '@/components/socials/Socials';
import Tooltip from '@/components/tooltip/Tooltip';
import { navigation } from '@/utils/paths';
import { creators } from '@/utils/pathsCreators';
import { compareStrings, joinStrings } from '@/utils/utils';

const Header: FC = () => {
  const navLinks = navigation.slice(1).map(data => {
    const { href: slug, label: title, options } = data;
    const className = 'flex rounded-lg w-full input-secondary justify-center bg-primary-800 lg:w-fit lg:bg-transparent';
    if (!compareStrings(data.label!, 'Creators')) {
      const videos = Object.values(creators)
        .filter(({ YouTube, Bilibili }) => !!(YouTube || Bilibili))
        .sort(({ label: a }, { label: b }) => compareStrings(a, b))
        .map(({ label, YouTube, Bilibili }) => (
          <Link key={label} className={joinStrings(className, 'px-1')} label={label} href={YouTube || Bilibili} />
        ));

      const discords = Object.values(creators)
        .filter(({ Discord }) => !!Discord)
        .sort(({ label: a }, { label: b }) => compareStrings(a, b))
        .map(({ label, Discord }) => (
          <Link key={label} className={joinStrings(className, 'px-1')} label={label} href={Discord} />
        ));

      const tooltipDivs = [
        { label: 'Creators', content: videos },
        { label: 'Discords', content: discords },
      ] as const;

      return (
        <Link
          className={joinStrings('group w-full', className, 'p-2')}
          key={data.href}
          tooltip={
            <div className="flex flex-row gap-2">
              {tooltipDivs.map(({ label, content }) => (
                <div key={label} className="flex flex-col">
                  <h2 className="text-base border-b-2 mb-1 border-tertiary-600 w-full text-left text-tertiary-600">
                    {label}
                  </h2>
                  <div
                    className={joinStrings(
                      'inset-secondary grid gap-1',
                      content.length > 5 ? 'grid-cols-3' : 'grid-cols-2',
                    )}
                  >
                    {content}
                  </div>
                </div>
              ))}
            </div>
          }
          hideMobileTooltip
          {...data}
        />
      );
    }

    if (!slug && options) {
      const optionLinks = (
        <div
          className={joinStrings(
            'inset-secondary grid gap-1 !rounded-t-none lg:!rounded-t-lg',
            options.length > 1 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1',
          )}
        >
          {options.map(({ ...option }) => (
            <Link key={option.href} className={joinStrings(className, 'p-1')} {...option} />
          ))}
        </div>
      );

      return (
        <>
          <div className="w-full block lg:hidden">
            <Accordion key={`${title} Accordion`} label={title} hierarchy="primary">
              {optionLinks}
            </Accordion>
          </div>
          <div
            key={title}
            className={joinStrings('relative group hidden text-base !cursor-default', className, 'p-2 lg:flex')}
          >
            {title}
            <Tooltip className="top-full !bg-primary-950 !w-max" pointerEvents>
              {optionLinks}
            </Tooltip>
          </div>
        </>
      );
    }

    return <Link className={joinStrings(className, 'p-2')} key={slug} {...data} />;
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
          <div className="inset-primary flex flex-col gap-2 items-center p-2 bg-primary-800">
            {navLinks}
            <Socials />
          </div>
        </Accordion>
      </div>
    </header>
  );
};

export default Header;
