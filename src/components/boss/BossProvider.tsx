import { createContext, useContext, useEffect, useState } from 'react';

import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

import { CurrentSeason } from '@/utils/hero-data/types';

interface BossProviderProps extends PropsWithChildren {
  boss: string;
  guides: Record<string, string[]>;
  initialTab?: number;
}

interface BossContextType {
  boss: string;
  guides: Record<string, string[]>;
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
  season: string;
  setSeason: Dispatch<SetStateAction<string>>;
}

const BossContext = createContext<BossContextType | undefined>(undefined);

export const BossProvider: FC<BossProviderProps> = ({ children, initialTab, guides, ...props }) => {
  const [tab, setTab] = useState<number>(initialTab ?? 0);
  const [season, setSeason] = useState<string>(CurrentSeason);

  useEffect(() => {
    if (!guides[season]) {
      const defaultKey = Object.keys(guides)[0];
      setSeason(defaultKey);
    }
  }, []);

  return (
    <BossContext.Provider
      value={{
        tab,
        setTab,
        season,
        setSeason,
        guides,
        ...props,
      }}
    >
      {children}
    </BossContext.Provider>
  );
};
export const useBoss = (): BossContextType => {
  const context = useContext(BossContext);
  if (!context) {
    throw new Error('useBoss must be used within a BossProvider');
  }

  return context;
};
