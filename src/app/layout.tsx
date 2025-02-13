import { Lato } from 'next/font/google';
import Script from 'next/script';
import '@/styles/globals.css';

import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';

const font = Lato({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-lato',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Yaphalla',
  description: 'Providing players with the best tools and content for AFK Journey by Lilith Games!',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <head>
      <Script src="https://kit.fontawesome.com/8a3bf2a858.js" crossOrigin="anonymous" />
    </head>
    <body className={`${font.variable} flex grow flex-col justify-between font-sans relative`}>
      <Header />
      {children}
      <Footer />
      <div className="size-full absolute bg-[url(/assets/images/page-bg.png)] bg-no-repeat bg-[100%_auto] -z-10 opacity-35"></div>
    </body>
  </html>
);

export default RootLayout;
