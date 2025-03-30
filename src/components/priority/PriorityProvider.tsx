import { createContext, useCallback, useContext, useState } from 'react';

import type { GroupUnitData } from '@/components/priority/types';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

import { getPath } from '@/components/unit-grid/utils';

interface PriorityContextType {
  groups: string;
  setGroups: Dispatch<SetStateAction<string>>;
  units: GroupUnitData;
  setUnits: Dispatch<SetStateAction<GroupUnitData>>;
  currentTile: string | undefined;
  setCurrentTile: Dispatch<SetStateAction<string | undefined>>;
  getTileImage: (string?: string) => { src: string; path: 'unit' | 'base' | 'artifact' };
  updateUnit: (index: string) => void;
}

const PriorityContext = createContext<PriorityContextType | undefined>(undefined);

export const PriorityProvider: FC<PropsWithChildren> = ({ children }) => {
  const [groups, setGroups] = useState('1');
  const [units, setUnits] = useState<GroupUnitData>({});
  const [currentTile, setCurrentTile] = useState<string>();
  const getTileImage = useCallback((unit?: string) => {
    const src = unit || 'Generic-Outline';
    const path = getPath(src);

    return { src, path };
  }, []);

  const updateUnit = useCallback(
    (index: string) => {
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

  return (
    <PriorityContext.Provider
      value={{
        groups,
        setGroups,
        units,
        setUnits,
        getTileImage,
        currentTile,
        setCurrentTile,
        updateUnit,
      }}
    >
      {children}
    </PriorityContext.Provider>
  );
};

export const usePriority = (): PriorityContextType => {
  const context = useContext(PriorityContext);
  if (!context) {
    throw new Error('usePriority must be used within a PriorityProvider');
  }

  return context;
};
