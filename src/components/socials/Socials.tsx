import Link from 'next/link';

import type { FC } from 'react';

import parseUrl from '@/utils/parseUrl';
import { socials } from '@/utils/types';

const Socials: FC = () => (
  <div className="social flex flex-row items-center gap-1 md:gap-4">
    {socials.map(({ site, href }) => (
      <Link
        key={site}
        {...parseUrl(href)}
        className="size-8 px-1 no-underline md:size-12"
        rel="noreferrer"
        target="_blank"
        aria-label={`open cam's ${site} account`}
      >
        <i className={['fab text-3xl md:before:text-5xl', `fa-${site}`].join(' ')} />
      </Link>
    ))}
  </div>
);

export default Socials;
