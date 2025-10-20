import Image from 'next/image';

import type { FC } from 'react';

import Link from '@/components/link/Link';

interface LogoLinkProps {
  alt?: string;
}

const LogoLink: FC<LogoLinkProps> = ({ alt }) => (
  <Link href="/" className="relative logo input-tertiary p-1 rounded-lg">
    <Image src="/assets/images/yaphalla-logo.png" alt={alt || 'Homepage'} fill priority />
  </Link>
);

export default LogoLink;
          