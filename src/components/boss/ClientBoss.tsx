'use client';
import type { HeroJSON } from '@/components/hero/types';
import type { FC } from 'react';

import { BossProvider } from '@/components/boss/BossProvider';
import PageBoss from '@/components/boss/PageBoss';

export interface ClientBossProps extends HeroJSON {
  hero: string;
  guides: Record<string, string[]>;
}

const ClientBoss: FC<ClientBossProps> = ({ hero, guides, ...props }) => (
  <BossProvider boss={hero} guides={guides}>
    <PageBoss hero={hero} {...props} />
  </BossProvider>
);

export default ClientBoss;
