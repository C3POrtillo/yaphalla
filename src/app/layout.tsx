import { Lato } from 'next/font/google';
import Script from 'next/script';

import type { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

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
    <body className={`${font.variable} flex grow flex-col justify-between gap-4 font-sans`}>{children}</body>
  </html>
);

export default RootLayout;
