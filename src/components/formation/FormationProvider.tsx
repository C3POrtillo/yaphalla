'use-client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import type { ArtifactFormationData, TileData, UnitFormationData } from '@/components/formation/types';
import type { CommunityLogos } from '@/components/hex-tiles/types';
import type { BaseHexes, ImagePath, Talents } from '@/utils/types';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

import { AlwaysShowStates, ArenaPresets } from '@/components/formation/types';
import { countUnits, determineFaction, generateCookies } from '@/components/formation/utils';
import { getPath } from '@/components/hex-tiles/utils';
import { compareStrings, getCookie, setCookie } from '@/utils/utils';

interface FormationContextType {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  units: UnitFormationData;
  setUnits: Dispatch<SetStateAction<UnitFormationData>>;
  artifactData: ArtifactFormationData;
  setArtifactData: Dispatch<SetStateAction<ArtifactFormationData>>;
  tileData: number[];
  setTileData: Dispatch<SetStateAction<number[]>>;
  preset: string;
  setPreset: Dispatch<SetStateAction<string>>;
  currentTile: number | undefined;
  setCurrentTile: Dispatch<SetStateAction<number | undefined>>;
  hideEmptyArtifact: boolean;
  setHideEmptyArtifact: Dispatch<SetStateAction<boolean>>;
  hideLogo: boolean;
  setHideLogo: Dispatch<SetStateAction<boolean>>;
  drawType: number;
  setDrawType: Dispatch<SetStateAction<number>>;
  hideEnemy: boolean;
  setHideEnemy: Dispatch<SetStateAction<boolean>>;
  hideEmpty: boolean;
  setHideEmpty: Dispatch<SetStateAction<boolean>>;
  hideNumbers: boolean;
  setHideNumbers: Dispatch<SetStateAction<boolean>>;
  isPreset: boolean;
  setIsPreset: Dispatch<SetStateAction<boolean>>;
  currentArtifact: number | undefined;
  setCurrentArtifact: Dispatch<SetStateAction<number | undefined>>;
  isEditArena: boolean;
  setEditArena: Dispatch<SetStateAction<boolean>>;
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
  subMenu: number;
  setSubMenu: Dispatch<SetStateAction<number>>;
  baseHex: BaseHexes | undefined;
  setBaseHex: Dispatch<SetStateAction<BaseHexes | undefined>>;
  outline: BaseHexes | undefined;
  setOutline: Dispatch<SetStateAction<BaseHexes | undefined>>;
  updateArena: (tile: TileData) => void;
  updateUnit: (tile: TileData) => void;
  playerFaction?: Talents;
  enemyFaction?: Talents;
  hideTalents: boolean;
  setHideTalents: Dispatch<SetStateAction<boolean>>;
  setArtifact: (position: number, artifact: string | boolean) => void;
  background: boolean;
  setBackground: Dispatch<SetStateAction<boolean>>;
  getTileImage: (
    unit: string,
    state: number,
    showTalents: boolean,
    hideUnits?: boolean,
    disableEnemy?: boolean,
  ) => {
    src: string;
    path: ImagePath;
  };
  logo: CommunityLogos;
  setLogo: Dispatch<SetStateAction<CommunityLogos>>;
}

const FormationContext = createContext<FormationContextType | undefined>(undefined);

export const FormationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [title, setTitle] = useState<string>('');
  const [units, setUnits] = useState<UnitFormationData>({});
  const [artifactData, setArtifactData] = useState<ArtifactFormationData>({
    player: [],
    enemy: [],
  });
  const [tileData, setTileData] = useState<number[]>([...ArenaPresets['Arena I']]);
  const [preset, setPreset] = useState<string>('Arena I');
  const [currentTile, setCurrentTile] = useState<number>();
  const [drawType, setDrawType] = useState<number>(0);
  const [hideTalents, setHideTalents] = useState<boolean>(true);
  const [hideEmpty, setHideEmpty] = useState<boolean>(true);
  const [hideEnemy, setHideEnemy] = useState<boolean>(true);
  const [hideNumbers, setHideNumbers] = useState<boolean>(false);
  const [hideEmptyArtifact, setHideEmptyArtifact] = useState<boolean>(false);
  const [background, setBackground] = useState<boolean>(false);
  const [currentArtifact, setCurrentArtifact] = useState<number>();
  const [isPreset, setIsPreset] = useState<boolean>(false);
  const [isEditArena, setEditArena] = useState<boolean>(false);
  const [playerFaction, setPlayerFaction] = useState<Talents>();
  const [enemyFaction, setHideEnemyFaction] = useState<Talents>();
  const [hideLogo, setHideLogo] = useState<boolean>(false);
  const [tab, setTab] = useState(0);
  const [subMenu, setSubMenu] = useState(0);
  const [baseHex, setBaseHex] = useState<BaseHexes | undefined>();
  const [outline, setOutline] = useState<BaseHexes | undefined>();
  const [logo, setLogo] = useState<CommunityLogos>('dog');

  const updateArena = useCallback(
    (tile: TileData) =>
      setTileData(prev =>
        prev.map((prevTile, index) => {
          if (tile.index === index) {
            setPreset('Custom');

            if (prevTile === drawType) {
              setUnits(prevUnits => {
                const copy = { ...prevUnits };
                delete copy[index];

                return copy;
              });
              setCurrentTile(undefined);

              return 0;
            }

            return drawType;
          }

          return prevTile;
        }),
      ),
    [drawType],
  );

  const updateUnit = useCallback(
    ({ index }: TileData) => {
      setUnits(prevUnits => {
        const copy = { ...prevUnits };
        let updated = false;

        if (currentTile === index && copy[currentTile]) {
          delete copy[currentTile];
          updated = true;
        } else if (currentTile !== undefined && copy[currentTile]) {
          if (copy[index]) {
            [copy[index], copy[currentTile]] = [copy[currentTile], copy[index]];
          } else {
            copy[index] = copy[currentTile];
            delete copy[currentTile];
          }
          updated = true;
          setCurrentTile(undefined);
        } else {
          setCurrentTile(currentTile !== index ? index : undefined);
        }

        return updated ? copy : prevUnits;
      });
    },
    [currentTile],
  );

  const setArtifact = useCallback(
    (position: number, artifact: string | boolean) => {
      setCurrentArtifact(currentArtifact === position ? undefined : position);
      if (currentArtifact === position) {
        const key = position ? 'enemy' : 'player';
        if (typeof artifact === 'string' && !!artifactData[key].length) {
          setArtifactData(prev => {
            const updated = { ...prev };
            const currentArtifacts = updated[key] || [];

            if (currentArtifacts.includes(artifact)) {
              updated[key] = currentArtifacts.filter(a => a !== artifact);
            }

            return updated;
          });
        }
      } else {
        setTab(0);
      }
    },
    [currentArtifact, artifactData],
  );
  const getTileImage = useCallback(
    (unit: string, state: number, showTalents: boolean, hideUnits?: boolean, disableEnemy?: boolean) => {
      const getFactionTile = (value: string, type: number) => {
        const factionValue = type === 1 ? playerFaction : enemyFaction;
        const custom = type === 1 && (baseHex || outline);

        if (custom || !showTalents || !factionValue) {
          return value;
        }

        return `${factionValue}-${background ? 'Hex' : 'Outline'}`;
      };

      let src = 'Grid-Outline';
      if (unit && state === 100 && hideUnits) {
        return {
          src: 'Enemy-Outline',
          path: 'base' as const,
        };
      }
      if ((hideUnits || !unit) && state === 2) {
        return { src: 'Grid-Hex', path: 'base' as const };
      }
      if (AlwaysShowStates.has(state)) {
        const fallback = baseHex || outline || `Generic-${background ? 'Hex' : 'Outline'}`;
        src = (!hideUnits && unit) || getFactionTile(fallback, 1);
      }
      if (state === -1 && !disableEnemy) {
        const fallback = `Enemy-${background ? 'Hex' : 'Outline'}`;
        src = (!hideUnits && unit) || getFactionTile(fallback, -1);
      }
      if (state === -2) {
        src = 'Breakable-Hex';
      }
      if (state === -3) {
        src = 'Unbreakable-Hex';
      }

      const path = getPath(src);

      return { src, path };
    },
    [enemyFaction, playerFaction, baseHex, outline, background],
  );

  useEffect(() => {
    Object.entries({
      hideTalents: setHideTalents,
      hideEnemy: setHideEnemy,
      hideNumbers: setHideNumbers,
      hideEmptyArtifact: setHideEmptyArtifact,
      background: setBackground,
      logo: setLogo,
    }).forEach(([key, set]) => {
      const cookie = getCookie(document, key);
      if (cookie) {
        if (cookie.match(/0|1/)) {
          set(!!Number(cookie) as any);
        } else {
          set(cookie as any);
        }
      }
    });
  }, []);

  useEffect(() => {
    generateCookies({ hideTalents, hideEmpty, hideEnemy, hideNumbers, hideEmptyArtifact, background, logo }).forEach(
      cookie => {
        setCookie(document, cookie);
      },
    );
  }, [hideTalents, hideEmpty, hideEnemy, hideNumbers, hideEmptyArtifact, background, logo]);

  useEffect(() => {
    if (['Custom', 'Double Artifacts'].some(check => !compareStrings(preset, check))) {
      return;
    }

    setUnits({});
    setTileData(ArenaPresets[preset as keyof typeof ArenaPresets] as number[]);
  }, [preset]);

  useEffect(() => {
    if (hideEnemy && currentTile !== undefined && tileData[currentTile] !== 1 && tileData[currentTile] !== 2) {
      setCurrentTile(undefined);
    }
  }, [hideEnemy, currentTile]);

  useEffect(() => {
    if (currentArtifact !== undefined && hideEmptyArtifact) {
      setCurrentArtifact(undefined);
    }
  }, [hideEmptyArtifact]);

  useEffect(() => {
    if (Object.keys(units).length) {
      setUnits(prev => {
        const copy = { ...prev };
        Object.keys(copy).forEach(index => {
          const key = Number(index);
          const { unit } = copy[key];
          copy[key] = { unit, type: tileData[key] };
        });

        return copy;
      });
    }
  }, [tileData]);

  useEffect(() => {
    let currentPlayer = undefined as Talents | undefined;
    let currentEnemy = undefined as Talents | undefined;
    const countPlayer = {} as Record<Talents, number>;
    const countEnemy = {} as Record<Talents, number>;
    countUnits(countPlayer, units, 1, (faction?: Talents) => {
      if (!playerFaction) {
        currentPlayer = faction;
      }
    });

    countUnits(countEnemy, units, -1, (faction?: Talents) => {
      if (!enemyFaction) {
        currentEnemy = faction;
      }
    });

    setPlayerFaction(determineFaction(countPlayer, currentPlayer ?? playerFaction));
    setHideEnemyFaction(determineFaction(countEnemy, currentEnemy ?? enemyFaction));
  }, [units]);

  return (
    <FormationContext.Provider
      value={{
        title,
        setTitle,
        units,
        setUnits,
        artifactData,
        setArtifactData,
        tileData,
        setTileData,
        preset,
        setPreset,
        currentTile,
        setCurrentTile,
        drawType,
        setDrawType,
        hideEmptyArtifact,
        setHideEmptyArtifact,
        hideLogo,
        setHideLogo,
        hideEnemy,
        setHideEnemy,
        hideEmpty,
        setHideEmpty,
        hideNumbers,
        setHideNumbers,
        isPreset,
        setIsPreset,
        currentArtifact,
        setCurrentArtifact,
        isEditArena,
        setEditArena,
        tab,
        setTab,
        subMenu,
        setSubMenu,
        updateArena,
        updateUnit,
        playerFaction,
        enemyFaction,
        hideTalents,
        setHideTalents,
        setArtifact,
        getTileImage,
        baseHex,
        setBaseHex,
        outline,
        setOutline,
        background,
        setBackground,
        logo,
        setLogo,
      }}
    >
      {children}
    </FormationContext.Provider>
  );
};

export const useFormation = (): FormationContextType => {
  const context = useContext(FormationContext);
  if (!context) {
    throw new Error('useFormation must be used within a FormationProvider');
  }

  return context;
};
