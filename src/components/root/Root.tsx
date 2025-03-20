import Script from 'next/script';
import '@/styles/globals.css';

import type { FC, PropsWithChildren, ReactNode } from 'react';

import Footer from '@/components/footer/Footer';
import Breadcrumbs from '@/components/header/Breadcrumbs';
import Header from '@/components/header/Header';
import { font } from '@/utils/types';
import { joinStrings } from '@/utils/utils';

interface RootProps extends PropsWithChildren {
  head?: ReactNode;
}

const Root: FC<RootProps> = ({ head, children }) => (
  <html lang="en">
    {/* eslint-disable-next-line @next/next/no-head-element */}
    <head>
      <Script src="https://kit.fontawesome.com/8a3bf2a858.js" crossOrigin="anonymous" />
      {head}
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

export default Root;
