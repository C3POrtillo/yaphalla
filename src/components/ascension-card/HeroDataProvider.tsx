import { createContext, useContext, useEffect, useState } from 'react';

import type { AscensionCardType, ExWeapon } from '@/components/ascension-card/types';
import type { Ascension } from '@/utils/types';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

import { enableEx } from '@/components/ascension-card/utils';
import { generateCookies } from '@/components/formation/utils';
import { compareStrings, getCookie, setCookie } from '@/utils/utils';

interface HeroDataProviderProps extends PropsWithChildren {
  id: number;
  hero: string;
  save?: boolean;
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
  hasEx: boolean;
}

const HeroDataContext = createContext<HeroDataContextType | undefined>(undefined);

export const HeroDataProvider: FC<HeroDataProviderProps> = ({ id, hero, children, save }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isExport, setExport] = useState<boolean>(false);
  const [type, setType] = useState<AscensionCardType>('Hex');
  const [ascension, setAscension] = useState<Ascension>('Supreme+');
  const [exWeapon, setExWeapon] = useState<ExWeapon>('+5');
  const hasEx = enableEx(ascension);
  const exportId = `${hero}-${id}`;

  useEffect(() => {
    if (!save) {
      return;
    }
    const loadCookies = async () => {
      Object.entries({
        type: setType,
        ascension: setAscension,
        exWeapon: setExWeapon,
      }).forEach(([key, set]) => {
        const cookie = getCookie(`${exportId}-${key}`);
        if (cookie) {
          if (!compareStrings(cookie, 'undefined')) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            set(undefined as any);
          } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            set(cookie as any);
          }
        }
      });
      setLoaded(true);
    };
    loadCookies();
  }, []);

  useEffect(() => {
    if (!save) {
      return;
    }
    const saveCookies = async () => {
      if (!loaded) {
        return;
      }
      generateCookies(
        {
          type,
          ascension,
          exWeapon,
        },
        exportId,
      ).forEach(cookie => {
        setCookie(cookie);
      });
    };
    saveCookies();
  }, [type, ascension, exWeapon, save]);

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
        hasEx,
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
