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
      <div className="flex flex-col xs:flex-row justify-around gap-2 xs:gap-16 items-center scale-75">
        <LogoLink />
        <Socials />
      </div>
      <div className="flex flex-row gap-2 justify-center">
        <span className="text-xs">Credits to: The Yaphalla Community</span>
        <span className="border-1 border-white" />
        <span className="inline-flex gap-1 text-xs">
          Developed by:
          <Icon icon="fa6-brands:discord" className="size-4 mt-0.5" />
          <span>{discordNames.map(name => name)}</span>
        </span>
        <span className="border-1 border-white" />
        <span className="text-xs whitespace-pre-wrap text-wrap">© 2025 Yaphalla</span>
      </div>
      <p className="text-xs w-full whitespace-pre-wrap text-wrap">
        Yaphalla is not endorsed or affiliated with Lilith Games, any of its subsidaries/affiliates, or other
        communities
      </p>
    </footer>
  </>
);

export default Footer;
