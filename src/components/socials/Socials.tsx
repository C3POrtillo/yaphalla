import type { FC } from 'react';

import Link from '@/components/link/Link';
import { socials } from '@/utils/paths';
import { joinStrings } from '@/utils/utils';

const Socials: FC = () => (
  <div className="social flex flex-row items-center gap-1 md:gap-2">
    {socials.map(({ site, href }) => (
      <Link
        key={site}
        href={href}
        className="flex size-10 size-sm input-secondary px-1 no-underline justify-center"
        aria-label={`Yaphalla's ${site}`}
      >
        <i className={joinStrings('fab text-xl md:before:text-2xl', `fa-${site}`)} />
      </Link>
    ))}
  </div>
);

export default Socials;
