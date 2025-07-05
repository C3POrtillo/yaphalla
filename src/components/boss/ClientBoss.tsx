'use client';
import { useEffect, useState } from 'react';

import type { HeroJSON } from '@/components/hero/types';
import type { FC } from 'react';

import { BossProvider } from '@/components/boss/BossProvider';
import PageBoss from '@/components/boss/PageBoss';

export interface ClientBossProps extends HeroJSON {
  hero: string;
  guides: Record<string, string[]>;
}

const ClientBoss: FC<ClientBossProps> = ({ hero, guides, ...props }) => {
  const [hasGuidesHash, setHasGuidesHash] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    setHasGuidesHash(hash.toLowerCase() === '#guides');
  }, []);

  return (
    <BossProvider boss={hero} guides={guides} initialTab={hasGuidesHash ? 1 : 0}>
      <PageBoss hero={hero} {...props} />
    </BossProvider>
  );
};

export default ClientBoss;
