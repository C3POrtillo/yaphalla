import Image from 'next/image';

import type { FC } from 'react';

import { getSizeClass } from '@/components/editor/utils';
import { joinStrings } from '@/utils/utils';

interface LogoProps {
  hideLogo?: boolean;
  isCat?: boolean;
  size?: 'md' | 'sm' | 'xs' | '2xs';
}

const Logo: FC<LogoProps> = ({ hideLogo, isCat, size = 'md' }) => (
  <div className={joinStrings('hex-icon relative', getSizeClass(size))}>
    {!hideLogo && (
      <Image
        src={`/assets/images/Yaphalla ${isCat ? 'Cat' : 'Dog'} Hex.png`}
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
