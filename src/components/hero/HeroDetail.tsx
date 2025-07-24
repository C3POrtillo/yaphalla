import type { Damage, Faction, HeroClass, Tier } from '@/utils/types';
import type { FC, PropsWithChildren } from 'react';

import IconDetail from '@/components/hero/IconDetail';

export interface HeroDetailProps extends PropsWithChildren {
  hero: string;
  heroClass?: HeroClass;
  faction?: Faction;
  tier?: Tier | undefined;
  damage?: Damage;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HeroDetail: FC<HeroDetailProps> = ({ hero, children, ...props }) => {
  const details = Object.values(props).map(src => !!src && <IconDetail key={src} src={src} />);

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-1">{details}</div>
      {children}
    </div>
  );
};

export default HeroDetail;
