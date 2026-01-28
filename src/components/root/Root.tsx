import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import type { FC, PropsWithChildren, ReactNode } from 'react';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import RootClient from '@/components/root/RootClient';

interface RootProps extends PropsWithChildren {
  head?: ReactNode;
  isFile?: boolean | null;
}

const Root: FC<RootProps> = ({ head, children, isFile }) => (
  <html lang="en" className="h-full">
    {head && <head>{head}</head>}
    <body className="flex flex-col overflow-y-auto min-h-full">
      <main className="font-sans flex flex-col flex-1 items-center justify-between size-full">
        {isFile ? (
          children
        ) : (
          <>
            <Header />
            <RootClient>{children}</RootClient>
            {/* <div className="size-full absolute bg-[url(/assets/images/page-bg.png)] bg-no-repeat bg-[100%_full] -z-10 opacity-20"></div> */}
            <Footer />
          </>
        )}
        <Analytics />
        <SpeedInsights />
      </main>
    </body>
  </html>
);

export default Root;
