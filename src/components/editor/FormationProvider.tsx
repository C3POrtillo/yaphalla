'use-client';
import { createContext, useContext, useEffect, useState } from 'react';

import type {
  ArtifactFormationData,
  Faction,
  MenuTabTypes,
  TileData,
  UnitClass,
  UnitFormationData,
} from '@/components/editor/types';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

import { ArenaPresets } from '@/components/editor/types';

interface FormationContextType {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  author: string;
  setAuthor: Dispatch<SetStateAction<string>>;
  units: UnitFormationData;
  setUnits: Dispatch<SetStateAction<UnitFormationData>>;
  artifactData: ArtifactFormationData;
  setArtifactData: Dispatch<SetStateAction<ArtifactFormationData>>;
  tileData: (-1 | 0 | 1)[];
  setTileData: Dispatch<SetStateAction<(-1 | 0 | 1)[]>>;
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
  const [tileData, setTileData] = useState<(0 | 1 | -1)[]>([...ArenaPresets['Arena I']]);
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

  const updateArena = (tile: TileData) =>
    setTileData(prev =>
      prev.map((prevTile, index) => {
        if (tile.index === index) {
          setPreset('Custom');
          const tileType = drawEnemy ? -1 : 1;

          if (prevTile === tileType) {
            if (units[index]) {
              delete units[index];
              setUnits({ ...units });
            }
            setCurrentTile(undefined);

            return 0;
          }

          return tileType;
        }

        return prevTile;
      }),
    );
  const updateUnit = ({ index }: TileData) => {
    let updated = false;

    if (currentTile === index && units[currentTile]) {
      delete units[currentTile];
      updated = true;
    } else if (currentTile !== undefined && units[currentTile]) {
      if (units[index]) {
        [units[index], units[currentTile]] = [units[currentTile], units[index]];
      } else {
        units[index] = units[currentTile];
        delete units[currentTile];
      }
      updated = true;
      setCurrentTile(undefined);
    } else {
      setCurrentTile(currentTile !== index ? index : undefined);
    }

    if (updated) {
      setUnits({ ...units });
    }
  };

  useEffect(() => {
    if (preset === 'Custom') {
      return;
    }
    setUnits({});
    setTileData(ArenaPresets[preset as keyof typeof ArenaPresets] as (0 | 1 | -1)[]);
  }, [preset]);

  useEffect(() => {
    if (currentTile !== undefined && tileData[currentTile] === 0) {
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
        const updated = { ...prev };
        Object.keys(updated).forEach(index => {
          const key = Number(index);
          const { unit } = updated[key];
          updated[key] = { unit, type: tileData[key] };
        });

        return updated;
      });
    }
  }, [tileData]);

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
