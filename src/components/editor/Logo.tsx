import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import type { FC } from 'react';

import { getSizeClass, isDevMode } from '@/components/editor/utils';
import { joinStrings } from '@/utils/utils';

interface LogoProps {
  hideLogo?: boolean;
  isCat?: boolean;
  size?: 'md' | 'sm' | 'xs' | '2xs';
}

const Logo: FC<LogoProps> = ({ hideLogo, isCat, size = 'md' }) => {
  const searchParams = useSearchParams();
  const isDev = isDevMode(searchParams);
  const showLogo = !isDev || !hideLogo;

  return (
    <div className={joinStrings('hex-icon relative', getSizeClass(size))}>
      {showLogo && (
        <Image
          src={`/assets/images/hexes/unit/Yaphalla ${isCat ? 'Cat' : 'Dog'} Hex.png`}
          alt="Yaphalla Logo"
          fill
          sizes="256px"
          unoptimized
          priority
        />
      )}
    </div>
  );
};
export default Logo;
