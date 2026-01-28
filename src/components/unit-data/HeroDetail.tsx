import { type FC, Fragment, type PropsWithChildren } from 'react';

import type { Class, Damage, Faction, Tier } from '@/sanity/types';

import IconDetail from '@/components/unit-data/IconDetail';

export interface HeroDetailProps extends PropsWithChildren {
  hero: string;
  heroClass?: Class | null;
  faction?: Faction | null;
  tier?: Tier | null;
  damage?: Damage | null;
}

const HeroDetail: FC<HeroDetailProps> = ({ hero, children, ...props }) => {
  const details = Object.values(props)
    .map((src, i) => !!src && <IconDetail key={src._id + i} asset={src} />)
    .filter(Boolean);

  return (
    <div className="flex flex-row justify-between">
      <div key="details" className="flex flex-row gap-1">
        {details}
      </div>
      <Fragment key="children">{children}</Fragment>
    </div>
  );
};

export default HeroDetail;
