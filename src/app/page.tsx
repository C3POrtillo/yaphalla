import { NextSeo } from 'next-seo';

import type { FC } from 'react';

import Container from '@/components/container/Container';
import Socials from '@/components/socials/Socials';

const Index: FC = () => (
  <>
    <NextSeo
      title="yaphalla.com"
      description="Providing players with the best tools and content for AFK Journey by Lilith Games!"
      openGraph={{
        url: 'https://yaphalla.com',
        title: 'yaphalla.com',
        description: 'Providing players with the best tools and content for AFK Journey by Lilith Games!',
        images: [{ url: 'https://yaphalla.com/logo-512x512.png' }],
      }}
    />
    <Container className="m-0 flex size-full max-w-full flex-col items-center justify-center self-center bg-neutral-800 align-middle">
      <h1 className="text-9xl font-normal text-blue-400">yaphalla</h1>
      <Socials />
      <div className="flex flex-row gap-2"></div>
    </Container>
  </>
);

export default Index;
