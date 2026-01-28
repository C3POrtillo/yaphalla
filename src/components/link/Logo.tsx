import Image from 'next/image';

import type { FC } from 'react';

import Link from '@/components/link/Link';
import { builder, getLogo } from '@/sanity/client';

interface LogoLinkProps {
  alt?: string;
}

const LogoLink: FC<LogoLinkProps> = async () => {
  const data = await getLogo();
  const { fullLogo } = data[0];
  const src = builder.image(fullLogo!.asset!).format('webp').url();

  return (
    <Link href="/" className="relative input-tertiary p-1 rounded-lg">
      <div className="relative logo">
        <Image src={src} alt="Homepage" fill priority />
      </div>
    </Link>
  );
};

export default LogoLink;
