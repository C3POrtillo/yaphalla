'use client';
import { useMemo } from 'react';

import type { HeroJSON } from '@/components/hero/types';
import type { FC } from 'react';

import { BossProvider } from '@/components/boss/BossProvider';
import PageBoss from '@/components/boss/PageBoss';

export interface ClientBossProps extends HeroJSON {
  hero: string;
  guides: Record<string, string[]>;
}

const ClientBoss: FC<ClientBossProps> = ({ hero, guides, ...props }) => {
  const initialTab = useMemo(() => {
    if (typeof window === 'undefined') {return 0;} // SSR-safe default
    
    return window.location.hash.toLowerCase() === '#guides' ? 1 : 0;
  }, []);

  return (
    <BossProvider boss={hero} guides={guides} initialTab={initialTab}>
      <PageBoss hero={hero} {...props} />
    </BossProvider>
  );
};

export default ClientBoss;
