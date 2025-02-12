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
        className="px-1 no-underline"
        rel="noreferrer"
        target="_blank"
        aria-label={`Yaphalla's ${site}`}
      >
        <i className={['fab text-2xl md:before:text-3xl', `fa-${site}`].join(' ')} />
      </Link>
    ))}
  </div>
);

export default Socials;
