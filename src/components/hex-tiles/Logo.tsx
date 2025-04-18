import Image from 'next/image';

import type { FC } from 'react';

import { CommunityLogos } from '@/components/hex-tiles/types';
import { getSizeClass } from '@/components/hex-tiles/utils';
import { joinStrings } from '@/utils/utils';

interface LogoProps {
  logo?: CommunityLogos;
  hideLogo?: boolean;
  size?: 'md' | 'sm' | 'xs' | '2xs';
}

const Logo: FC<LogoProps> = ({ logo = 'dog', hideLogo, size = 'md' }) => (
  <div className={joinStrings('hex-icon relative', getSizeClass(size))}>
    {!hideLogo && (
      <Image
        src={`/assets/images/hexes/unit/Hex ${CommunityLogos[logo]}.png`}
        alt="Yaphalla Logo"
        fill
        sizes="256px"
        unoptimized
        priority
      />
    )}
  </div>
);
export default Logo;
