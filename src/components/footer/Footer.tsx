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
      <div className="flex flex-row gap-1 items-center">
        <span>Developed by: </span>
        <i className="fab fa-discord" /> <span>{discordNames.map(name => name)}</span>
      </div>
      <p className="text-sm w-full whitespace-pre-wrap text-wrap md:text-base ">
        Yaphalla is not endorsed or affiliated with Lilith Games, any of its subsidaries/affiliates, or other
        communities
      </p>
      <p className="text-sm w-full whitespace-pre-wrap text-wrap md:text-base ">
        © 2025 Yaphalla
      </p>
    </footer>
  </>
);

export default Footer;
