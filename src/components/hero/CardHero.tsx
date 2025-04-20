import type { HeroDetailProps } from '@/components/hero/HeroDetail';
import type { FC } from 'react';

import HeroDetail from '@/components/hero/HeroDetail';
import HexImage from '@/components/hex-tiles/HexImage';
import Link from '@/components/link/Link';
import { joinStrings } from '@/utils/utils';

interface CardHeroProps extends HeroDetailProps {
  hero: string;
  title?: string;
  description?: string;
  hasDetails?: boolean;
  href?: string;
}

const CardHero: FC<CardHeroProps> = ({ hero, title, description, hasDetails = true, href, ...props }) => {
  const card = (
    <div className={joinStrings(href ? 'w-full' : 'container-primary lg:max-w-1/3', 'flex flex-col gap-2')}>
      <div className="flex flex-row gap-2 items-center">
        <HexImage src={hero} path="unit" disabled />
        <div className="flex flex-col gap-2 w-full">
          <h2 className="w-full border-tertiary-600 border-b-2 pb-1">
            {hasDetails && title ? `${hero} - ${title}` : hero}
          </h2>
          <HeroDetail {...props} />
        </div>
      </div>
      {hasDetails && description && <p className="inset-secondary">{description}</p>}
    </div>
  );

  return href ? (
    <Link href={href} className="container-primary input-secondary size-full">
      {card}
    </Link>
  ) : (
    card
  );
};

export default CardHero;
