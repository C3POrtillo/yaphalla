import { Icon } from '@iconify/react';

import type { FC } from 'react';

import Container from '@/components/container/Container';
import LogoLink from '@/components/link/Logo';
import Socials from '@/components/socials/Socials';
import { discordNames } from '@/utils/siteTypes';

const Footer: FC = () => (
  <>
    <Container className="grow" />
    <footer className="footer">
      <div className="flex flex-col xs:flex-row justify-around gap-2 xs:gap-16 items-center">
        <LogoLink />
        <Socials />
      </div>
      <span>Credits to: The Yaphalla Community</span>
      <span className="inline-flex gap-1">
        Developed by:
        <Icon icon="fa6-brands:discord" className="size-6" />
        <span>{discordNames.map(name => name)}</span>
      </span>
      <p className="text-sm w-full whitespace-pre-wrap text-wrap md:text-base ">
        Yaphalla is not endorsed or affiliated with Lilith Games, any of its subsidaries/affiliates, or other
        communities
      </p>
      <p className="text-sm w-full whitespace-pre-wrap text-wrap md:text-base ">© 2025 Yaphalla</p>
    </footer>
  </>
);

export default Footer;
