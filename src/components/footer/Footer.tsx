import type { FC } from 'react';
import Link from '@/components/header/Link';
import Container from '@/components/container/Container';

import { discordNames } from '@/utils/types';
import Socials from '../socials/Socials';
import Image from 'next/image';

const Footer: FC = () => (
  <>
    <Container className="flex grow flex-col" />
    <footer className="footer flex flex-col place-items-center content-center justify-center gap-2 px-1 py-8 text-center lg:p-8">
      <div className='flex flex-row justify-around gap-16 items-center'>
        <div className='relative h-16 logo'>
          <Link path='/'>
            <Image src={'/assets/images/yaphalla-logo.png'} alt={'Homepage'} fill/>
          </Link>
        </div>
        <Socials/>
      </div>
      <span>Credits to: The Yaphalla Community</span>
      <div>
        <span>Developed by: </span>
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <i className="fab fa-discord tfd-link-icon" />
        {' '}
        <span>{discordNames.map(name => name)}</span>
      </div>
      <p className="text-sm md:text-base">
        Yaphalla is not endorsed or affiliated with Lilith Games, or any of its subsidaries/affiliates
      </p>
    </footer>
  </>
);

export default Footer;
