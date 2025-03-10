'use-client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import type {
  ArtifactFormationData,
  Faction,
  MenuTabTypes,
  Talents,
  TileData,
  UnitClass,
  UnitFormationData,
} from '@/components/editor/types';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

import { AlwaysShowStates, ArenaPresets, ArtifactSet, DoubleTiles, requiredUnits } from '@/components/editor/types';
import { countUnits } from '@/components/editor/utils';
import { compareStrings } from '@/utils/utils';

interface FormationContextType {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  author: string;
  setAuthor: Dispatch<SetStateAction<string>>;
  units: UnitFormationData;
  setUnits: Dispatch<SetStateAction<UnitFormationData>>;
  artifactData: ArtifactFormationData;
  setArtifactData: Dispatch<SetStateAction<ArtifactFormationData>>;
  tileData: number[];
  setTileData: Dispatch<SetStateAction<number[]>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  additionalNotes: string;
  setAdditionalNotes: Dispatch<SetStateAction<string>>;
  preset: string;
  setPreset: Dispatch<SetStateAction<string>>;
  currentTile: number | undefined;
  setCurrentTile: Dispatch<SetStateAction<number | undefined>>;
  hideEmptyArtifact: boolean;
  setHideEmptyArtifact: Dispatch<SetStateAction<boolean>>;
  drawEnemy: boolean;
  setDrawEnemy: Dispatch<SetStateAction<boolean>>;
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
  filterFaction: Faction | undefined;
  setFilterFaction: Dispatch<SetStateAction<Faction | undefined>>;
  filterClass: UnitClass | undefined;
  setFilterClass: Dispatch<SetStateAction<UnitClass | undefined>>;
  searchFilter: string;
  setSearchFilter: Dispatch<SetStateAction<string>>;
  isEditArena: boolean;
  setEditArena: Dispatch<SetStateAction<boolean>>;
  updateArena: (tile: TileData) => void;
  updateUnit: (tile: TileData) => void;
  menuTab: MenuTabTypes;
  setMenuTab: Dispatch<SetStateAction<MenuTabTypes>>;
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
  const [author, setAuthor] = useState<string>('');
  const [units, setUnits] = useState<UnitFormationData>({});
  const [artifactData, setArtifactData] = useState<ArtifactFormationData>({
    player: [],
    enemy: [],
  });
  const [tileData, setTileData] = useState<number[]>([...ArenaPresets['Arena I']]);
  const [tags, setTags] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [preset, setPreset] = useState<string>('Arena I');
  const [currentTile, setCurrentTile] = useState<number>();
  const [drawEnemy, setDrawEnemy] = useState<boolean>(false);
  const [hideEmptyArtifact, setHideEmptyArtifact] = useState<boolean>(false);
  const [isEnemy, setEnemy] = useState<boolean>(false);
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [isNumber, setNumber] = useState<boolean>(false);
  const [isPreset, setIsPreset] = useState<boolean>(false);
  const [currentArtifact, setCurrentArtifact] = useState<number>();
  const [filterFaction, setFilterFaction] = useState<Faction>();
  const [filterClass, setFilterClass] = useState<UnitClass>();
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isEditArena, setEditArena] = useState<boolean>(false);
  const [menuTab, setMenuTab] = useState<MenuTabTypes>('artifact');
  const [activeFaction, setActiveFaction] = useState<Talents>();
  const [isTalents, setTalents] = useState<boolean>(true);

  const updateArena = useCallback(
    (tile: TileData) =>
      setTileData(prev =>
        prev.map((prevTile, index) => {
          if (tile.index === index) {
            setPreset('Custom');
            const tileType = drawEnemy ? -1 : 1;

            if (prevTile === tileType) {
              setUnits(prevUnits => {
                const copy = { ...prevUnits };
                delete copy[index];

                return copy;
              });
              setCurrentTile(undefined);

              return 0;
            }

            return tileType;
          }

          return prevTile;
        }),
      ),
    [drawEnemy],
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
      let src = 'Generic-Outline';

      if ((!hideUnits && ArtifactSet.has(unit)) || (!unit && state === 2)) {
        return {
          src: (!hideUnits && unit) || 'Artifact-Hex',
          path: 'artifact' as const,
        };
      }
      if (AlwaysShowStates.has(state)) {
        const blank = showTalents ? `${activeFaction}-Hex` : 'Generic-Hex';
        src = (!hideUnits && unit) || blank;
      }
      if (state === -1 && !disableEnemy) {
        src = (!hideUnits && unit) || 'Enemy-Hex';
      }

      return { src, path };
    },
    [activeFaction],
  );

  useEffect(() => {
    if (compareStrings(preset, 'Custom') === 0) {
      return;
    }
    if (compareStrings(preset, 'Double Tiles') === 0) {
      setUnits({
        39: { unit: 'Yaphalla Cat Hex', type: 100 },
      });
      setTileData(DoubleTiles as unknown as number[]);

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
      if (activeFaction && count[activeFaction] >= requiredUnits) {
        currentFaction = activeFaction;
      } else {
        const nextFaction = Object.keys(count).find(faction => count[faction as unknown as Talents] >= requiredUnits);
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
        author,
        setAuthor,
        units,
        setUnits,
        artifactData,
        setArtifactData,
        tileData,
        setTileData,
        tags,
        setTags,
        additionalNotes,
        setAdditionalNotes,
        preset,
        setPreset,
        currentTile,
        setCurrentTile,
        drawEnemy,
        setDrawEnemy,
        hideEmptyArtifact,
        setHideEmptyArtifact,
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
        filterFaction,
        setFilterFaction,
        filterClass,
        setFilterClass,
        searchFilter,
        setSearchFilter,
        isEditArena,
        setEditArena,
        updateArena,
        updateUnit,
        menuTab,
        setMenuTab,
        activeFaction,
        isTalents,
        setTalents,
        setArtifact,
        getTileImage,
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
