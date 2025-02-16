import Image from 'next/image';

import type { FC } from 'react';

import Link from '@/components/link/Link';

const LogoLink: FC = () => (
  <Link href="/" className="relative h-16 logo">
    <Image src="/assets/images/yaphalla-logo.png" alt="Homepage" fill priority />
  </Link>
);

export default LogoLink;
