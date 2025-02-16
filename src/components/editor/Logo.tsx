import Image from 'next/image';

import type { FC } from 'react';

import { joinStrings } from '@/utils/utils';

interface LogoProps {
  hideLogo?: boolean;
  isCat?: boolean;
  size?: 'md' | 'sm' | 'xs';
}

const Logo: FC<LogoProps> = ({ hideLogo, isCat, size = 'md' }) => {
  const mdClass = size === 'md' && 'min-w-20';
  const smClass = size === 'sm' && 'min-w-16';
  const xsClass = size === 'xs' && 'min-w-12';

  return (
    <div className={joinStrings('hex-icon relative', mdClass, smClass, xsClass)}>
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
};

export default Logo;
