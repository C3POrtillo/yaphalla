'use-client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import type { ArtifactFormationData, TileData, UnitFormationData } from '@/components/editor/types';
import type { BaseHexes, Talents } from '@/utils/types';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

import { AlwaysShowStates, ArenaPresets, TalentRequiredUnits } from '@/components/editor/types';
import { countUnits } from '@/components/editor/utils';
import { ArtifactSet } from '@/utils/types';
import { compareStrings } from '@/utils/utils';

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
  isEnemy: boolean;
  setEnemy: Dispatch<SetStateAction<boolean>>;
  isEmpty: boolean;
  setEmpty: Dispatch<SetStateAction<boolean>>;
  isNumber: boolean;
  setNumber: Dispatch<SetStateAction<boolean>>;
  isPreset: boolean;
  setIsPreset: Dispatch<SetStateAction<boolean>>;
  currentArtifact: number | undefined;
  setCurrentArtifact: Dispatch<SetStateAction<number | undefined>>;
  isEditArena: boolean;
  setEditArena: Dispatch<SetStateAction<boolean>>;
  subMenu: number;
  setSubMenu: Dispatch<SetStateAction<number>>;
  baseHex: BaseHexes | undefined;
  setBaseHex: Dispatch<SetStateAction<BaseHexes | undefined>>;
  outline: BaseHexes | undefined;
  setOutline: Dispatch<SetStateAction<BaseHexes | undefined>>;
  updateArena: (tile: TileData) => void;
  updateUnit: (tile: TileData) => void;
  activeFaction?: Talents;
  isTalents: boolean;
  setTalents: Dispatch<SetStateAction<boolean>>;
  setArtifact: (position: number, artifact: string | boolean) => void;
  getTileImage: (
    unit: string,
    state: number,
    showTalents: false | Talents | undefined,
    hideUnits?: boolean,
    disableEnemy?: boolean,
  ) => {
    src: string;
    path: 'unit' | 'base' | 'artifact';
  };
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
  const [hideEmptyArtifact, setHideEmptyArtifact] = useState<boolean>(false);
  const [isEnemy, setEnemy] = useState<boolean>(false);
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [isNumber, setNumber] = useState<boolean>(false);
  const [isPreset, setIsPreset] = useState<boolean>(false);
  const [currentArtifact, setCurrentArtifact] = useState<number>();
  const [isEditArena, setEditArena] = useState<boolean>(false);
  const [activeFaction, setActiveFaction] = useState<Talents>();
  const [isTalents, setTalents] = useState<boolean>(true);
  const [hideLogo, setHideLogo] = useState<boolean>(false);
  const [subMenu, setSubMenu] = useState(0);
  const [baseHex, setBaseHex] = useState<BaseHexes | undefined>();
  const [outline, setOutline] = useState<BaseHexes | undefined>('Generic-Outline');

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
      }
    },
    [currentArtifact, artifactData],
  );
  const getTileImage = useCallback(
    (
      unit: string,
      state: number,
      showTalents: false | Talents | undefined,
      hideUnits?: boolean,
      disableEnemy?: boolean,
    ) => {
      const path = unit ? ('unit' as const) : ('base' as const);
      let src = 'Grid-Outline';

      if ((!hideUnits && ArtifactSet.has(unit)) || (!unit && state === 2)) {
        return {
          src: (!hideUnits && unit) || 'Artifact-Hex',
          path: 'artifact' as const,
        };
      }
      if (unit && state === 100 && hideUnits) {
        return {
          src: 'Enemy-Outline',
          path: 'base' as const,
        };
      }
      if (AlwaysShowStates.has(state)) {
        const fallback = baseHex || outline || 'Generic-Outline';
        const blank = showTalents ? `${activeFaction}-Hex` : fallback;
        const isNotCustom = baseHex ? compareStrings(baseHex, 'Generic-Outline') === 0 : baseHex !== undefined;
        src = (!hideUnits && unit) || (isNotCustom ? blank : fallback);
      }
      if (state === -1 && !disableEnemy) {
        src = (!hideUnits && unit) || 'Enemy-Outline';
      }
      if (state === -2) {
        src = 'Breakable-Hex';
      }
      if (state === -3) {
        src = 'Unbreakable-Hex';
      }

      return { src, path };
    },
    [activeFaction, baseHex, outline],
  );

  useEffect(() => {
    if (['Custom', 'Double Artifacts'].some(check => compareStrings(preset, check) === 0)) {
      return;
    }

    setUnits({});
    setTileData(ArenaPresets[preset as keyof typeof ArenaPresets] as number[]);
  }, [preset]);

  useEffect(() => {
    if (isEnemy && currentTile !== undefined && tileData[currentTile] !== 1 && tileData[currentTile] !== 2) {
      setCurrentTile(undefined);
    }
  }, [isEnemy, currentTile]);

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
    let currentFaction = undefined as Talents | undefined;
    const count = {} as Record<Talents, number>;
    countUnits(count, units, (faction?: Talents) => {
      if (!activeFaction) {
        currentFaction = faction;
      }
    });

    if (!currentFaction) {
      if (activeFaction && count[activeFaction] >= TalentRequiredUnits) {
        currentFaction = activeFaction;
      } else {
        const nextFaction = Object.keys(count).find(
          faction => count[faction as unknown as Talents] >= TalentRequiredUnits,
        );
        currentFaction = nextFaction as Talents | undefined;
      }
    }
    setActiveFaction(currentFaction ?? undefined);
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
        isEnemy,
        setEnemy,
        isEmpty,
        setEmpty,
        isNumber,
        setNumber,
        isPreset,
        setIsPreset,
        currentArtifact,
        setCurrentArtifact,
        isEditArena,
        setEditArena,
        subMenu,
        setSubMenu,
        updateArena,
        updateUnit,
        activeFaction,
        isTalents,
        setTalents,
        setArtifact,
        getTileImage,
        baseHex,
        setBaseHex,
        outline,
        setOutline,
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
