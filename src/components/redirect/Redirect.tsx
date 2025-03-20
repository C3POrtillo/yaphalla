'use client';
import { permanentRedirect } from 'next/navigation';
import { useEffect } from 'react';

import type { FC } from 'react';

import Container from '@/components/container/Container';
import Link from '@/components/link/Link';

interface RedirectProps {
  href?: string;
  hidden?: boolean;
}

const Redirect: FC<RedirectProps> = ({ href, hidden }) => {
  useEffect(() => {
    if (href) {
      permanentRedirect(href);
    }
  }, [href]);

  if (hidden) {
    return null;
  }

  return (
    <Container className="mt-0 mb-18 flex grow size-full max-w-full flex-col items-center justify-center self-center align-middle">
      <div className="flex flex-col bg-primary-950/80 gap-4 rounded-lg p-4 justify-center items-center">
        <h1>
          <span className="text-yellow-400">308</span> | <span className="text-yellow-400">Permanent Redirect</span>
        </h1>
        <Link href={href || '/'} label={href || 'Return Home'} className="size-base input-secondary" />
      </div>
    </Container>
  );
};

export default Redirect;
