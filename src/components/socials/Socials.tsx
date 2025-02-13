import type { FC } from 'react';

import Link from '@/components/link/Link';
import { socials } from '@/utils/paths';

const Socials: FC = () => (
  <div className="social flex flex-row items-center gap-1 md:gap-4">
    {socials.map(({ site, href }) => (
      <Link key={site} href={href} className="px-1 no-underline" aria-label={`Yaphalla's ${site}`}>
        <i className={['fab text-3xl md:before:text-4xl', `fa-${site}`].join(' ')} />
      </Link>
    ))}
  </div>
);

export default Socials;
