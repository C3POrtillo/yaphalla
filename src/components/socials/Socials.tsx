import type { FC } from 'react';

import Link from '@/components/link/Link';
import { socials } from '@/utils/paths';

const Socials: FC = () => (
  <div className="social flex flex-row items-center gap-1 md:gap-2">
    {Object.values(socials).map(({ site, href }) => (
      <Link
        key={site}
        href={href}
        className="flex h-10 size-sm input-secondary justify-center items-center"
        aria-label={`Yaphalla's ${site}`}
      >
        <i className={`fab fa-${site} fa-2xl`} />
      </Link>
    ))}
  </div>
);

export default Socials;
