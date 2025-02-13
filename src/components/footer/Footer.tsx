import Image from 'next/image';

import type { FC } from 'react';

import Container from '@/components/container/Container';
import Link from '@/components/link/Link';
import Socials from '@/components/socials/Socials';
import { discordNames } from '@/utils/types';

const Footer: FC = () => (
  <>
    <Container className="flex grow flex-col" />
    <footer className="flex flex-col place-items-center content-center justify-center gap-2 p-4 text-center">
      <div className="flex flex-col xs:flex-row justify-around gap-2 xs:gap-16 items-center">
        <div className="relative h-16 logo">
          <Link href="/">
            <Image src="/assets/images/yaphalla-logo.png" alt="Homepage" fill />
          </Link>
        </div>
        <Socials />
      </div>
      <span>Credits to: The Yaphalla Community</span>
      <div>
        <span>Developed by: </span>
        <i className="fab fa-discord" /> <span>{discordNames.map(name => name)}</span>
      </div>
      <p className="text-sm md:text-base">
        Yaphalla is not endorsed or affiliated with Lilith Games, or any of its subsidaries/affiliates
      </p>
    </footer>
  </>
);

export default Footer;
