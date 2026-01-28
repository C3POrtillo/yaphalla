import type { HeroDetailProps } from '@/components/unit-data/HeroDetail';
import type { HeroAPIData } from '@/utils/hero-data/types';
import type { FC, PropsWithChildren } from 'react';

import HexImage from '@/components/hex-tiles/HexImage';
import Link from '@/components/link/Link';
import HeroDetail from '@/components/unit-data/HeroDetail';
import { classMerge } from '@/utils/utils';

interface CardHeroProps extends HeroAPIData, PropsWithChildren {
  name?: string;
  hasDetails?: boolean;
  href?: string;
}

const CardHero: FC<CardHeroProps> = ({
  hero,
  name,
  title,
  description,
  hex,
  hasDetails = true,
  href,
  children,
  heroClass,
  faction,
  tier,
  damage,
}) => {
  const label = name || hero;
  const card = (
    <div className={classMerge(href ? 'w-full' : 'container-primary lg:max-w-1/3', 'flex flex-col gap-2')}>
      <div className="flex flex-row gap-2 items-center">
        <HexImage src={hex} disabled />
        <div className="flex flex-col gap-2 w-full">
          <h2 className="w-full border-tertiary-600 border-b-2 pb-1">
            {hasDetails && title ? `${hero} - ${title}` : label}
          </h2>
          <HeroDetail hero={hero} heroClass={heroClass} faction={faction} tier={tier} damage={damage}>
            {children}
          </HeroDetail>
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
