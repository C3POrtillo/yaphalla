import type { FC } from 'react';

import LogoLink from '@/components/link/Logo';
import Socials from '@/components/socials/Socials';
import { discordNames } from '@/utils/types';

const Footer: FC = () => (
  <footer className="footer flex flex-col mt-auto place-items-center content-center justify-center gap-2 p-4 text-center">
    <div className="flex flex-col xs:flex-row justify-around gap-2 xs:gap-16 items-center">
      <LogoLink />
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
);

export default Footer;
