import { createContext, useContext, useState } from 'react';

import type { AscensionCardType, ExWeapon } from '@/components/ascension-card/types';
import type { Ascension } from '@/utils/types';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';


interface HeroDataProviderProps extends PropsWithChildren {
  id: number;
  currentId?: number;
  type: AscensionCardType;
  hero: string;
}

interface HeroDataContextType {
  id: number;
  currentId?: number;
  type: AscensionCardType;
  hero: string;
  ascension: Ascension;
  setAscension: Dispatch<SetStateAction<Ascension>>;
  exWeapon: ExWeapon;
  setExWeapon: Dispatch<SetStateAction<ExWeapon>>;
}

const HeroDataContext = createContext<HeroDataContextType | undefined>(undefined);

export const HeroDataProvider: FC<HeroDataProviderProps> = ({ id, currentId, type, hero, children }) => {
  const [ascension, setAscension] = useState<Ascension>('Supreme+');
  const [exWeapon, setExWeapon] = useState<ExWeapon>(5);

  return (
    <HeroDataContext.Provider
      value={{
        id,
        currentId,
        hero,
        type,
        ascension,
        setAscension,
        exWeapon,
        setExWeapon,
      }}
    >
      {children}
    </HeroDataContext.Provider>
  );
};

export const useHeroData = (): HeroDataContextType => {
  const context = useContext(HeroDataContext);
  if (!context) {
    throw new Error('useHeroData must be used within a HeroDataProvider');
  }

  return context;
};
