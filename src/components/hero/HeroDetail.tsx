import type { Damage, Faction, Tier, UnitClass } from '@/utils/types';
import type { FC } from 'react';

import DetailIcon from '@/components/hero/DetailIcon';

export interface HeroDetailProps {
  unitClass: UnitClass;
  faction: Faction;
  tier: Tier | undefined;
  damage: Damage;
}

const HeroDetail: FC<HeroDetailProps> = ({ tier = 'R', ...props }) => {
  const details = [tier, ...Object.values(props)].map(src => src && <DetailIcon key={src} src={src} />);

  return <div className="flex flex-row gap-1">{details}</div>;
};

export default HeroDetail;
