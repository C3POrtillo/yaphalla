import { createContext, useContext, useState } from 'react';

import type { AscensionCardType, ExWeapon } from '@/components/ascension-card/types';
import type { Ascension } from '@/utils/types';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

interface HeroDataProviderProps extends PropsWithChildren {
  id: number;
  hero: string;
}

interface HeroDataContextType {
  id: number;
  hero: string;
  exportId: string;
  type: AscensionCardType;
  setType: Dispatch<SetStateAction<AscensionCardType>>;
  ascension: Ascension;
  setAscension: Dispatch<SetStateAction<Ascension>>;
  exWeapon: ExWeapon;
  setExWeapon: Dispatch<SetStateAction<ExWeapon>>;
  isExport: boolean;
  setExport: Dispatch<SetStateAction<boolean>>;
}

const HeroDataContext = createContext<HeroDataContextType | undefined>(undefined);

export const HeroDataProvider: FC<HeroDataProviderProps> = ({ id, hero, children }) => {
  const [isExport, setExport] = useState<boolean>(false);
  const [type, setType] = useState<AscensionCardType>('Hex');
  const [ascension, setAscension] = useState<Ascension>('Supreme+');
  const [exWeapon, setExWeapon] = useState<ExWeapon>('+5');
  const exportId = `${hero}-${id}`;

  return (
    <HeroDataContext.Provider
      value={{
        id,
        exportId,
        hero,
        type,
        setType,
        ascension,
        setAscension,
        exWeapon,
        setExWeapon,
        isExport,
        setExport,
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
