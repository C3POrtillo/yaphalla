'use client';
import { createContext, useContext, useState } from 'react';

import type { Damage, Faction, HeroClass, Tier } from '@/utils/hero-data/types';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

import { UnitsByClass, UnitsByFaction } from '@/utils/hero-data/types';

interface DiscussionContextType {
  hero?: string;
  setHero: Dispatch<SetStateAction<string | undefined>>;
  faction?: Faction;
  heroClass?: HeroClass;
  damage: Damage;
  setDamage: Dispatch<SetStateAction<Damage>>;
  tier: Tier;
  setTier: Dispatch<SetStateAction<Tier>>;
}

const DiscussionContext = createContext<DiscussionContextType | undefined>(undefined);

export const DiscussionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [hero, setHero] = useState<string>();
  const [damage, setDamage] = useState<Damage>('Physical');
  const [tier, setTier] = useState<Tier>('S');
  const faction = hero ? UnitsByFaction[hero] : undefined;
  const heroClass = hero ? UnitsByClass[hero] : undefined;

  return (
    <DiscussionContext.Provider
      value={{
        hero,
        setHero,
        damage,
        setDamage,
        tier,
        setTier,
        faction,
        heroClass,
      }}
    >
      {children}
    </DiscussionContext.Provider>
  );
};

export const useDiscussion = (): DiscussionContextType => {
  const context = useContext(DiscussionContext);
  if (!context) {
    throw new Error('useDiscussion must be used within a DiscussionProvider');
  }

  return context;
};
