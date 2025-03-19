import { Lato } from 'next/font/google';
import Script from 'next/script';
import '@/styles/globals.css';

import type { Metadata, Viewport } from 'next';
import type { FC, PropsWithChildren } from 'react';

import Footer from '@/components/footer/Footer';
import Breadcrumbs from '@/components/header/Breadcrumbs';
import Header from '@/components/header/Header';
import { joinStrings } from '@/utils/utils';

const font = Lato({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-lato',
  weight: '400',
});

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
};

const title = 'Yaphalla';
const description = 'Providing players with the best tools and content for AFK Journey by Lilith Games!';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://yaphalla.com',
    siteName: title,
    images: [
      {
        url: 'https://www.yaphalla.com/assets/images/yaphalla-dog.png',
        width: 128,
        height: 128,
        alt: title,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: ['https://www.yaphalla.com/assets/images/yaphalla-dog.png'],
  },
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <head>
      <Script src="https://kit.fontawesome.com/8a3bf2a858.js" crossOrigin="anonymous" />
    </head>
    <body className="h-[100vh] snap-y">
      <div className="flex min-w-full max-w-full min-h-full">
        <main
          className={joinStrings(
            font.variable,
            'font-sans flex grow flex-col items-center justify-between relative z-0',
          )}
        >
          <Header />
          <Breadcrumbs />
          {children}
          <Footer />
          <div className="size-full absolute bg-[url(/assets/images/page-bg.png)] bg-no-repeat bg-[100%_auto] -z-10 opacity-20"></div>
        </main>
      </div>
    </body>
  </html>
);

export default RootLayout;
