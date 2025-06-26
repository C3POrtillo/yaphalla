import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import type { GroupUnitData } from '@/components/priority/types';
import type { ImagePath } from '@/utils/types';
import type { Dispatch, DragEvent, FC, PropsWithChildren, SetStateAction } from 'react';

import { getPath } from '@/components/hex-tiles/utils';

interface PriorityContextType {
  groups: string;
  setGroups: Dispatch<SetStateAction<string>>;
  units: GroupUnitData;
  setUnits: Dispatch<SetStateAction<GroupUnitData>>;
  currentTile: string | undefined;
  setCurrentTile: Dispatch<SetStateAction<string | undefined>>;
  getTileImage: (string?: string) => { src: string; path: ImagePath };
  updateUnit: (index: string) => void;
  handleDragOver: (e: DragEvent<HTMLButtonElement>) => void;
  handleDrop: (e: DragEvent<HTMLButtonElement>, index: string) => void;
  handleInternalDragStart: (e: DragEvent<HTMLButtonElement>, index: string, unit: string) => void;
}

const PriorityContext = createContext<PriorityContextType | undefined>(undefined);

export const PriorityProvider: FC<PropsWithChildren> = ({ children }) => {
  const [groups, setGroups] = useState<string>('2');
  const [units, setUnits] = useState<GroupUnitData>({});
  const [currentTile, setCurrentTile] = useState<string>();

  const draggedTileRef = useRef<string | null>(null);
  const validDropOccurred = useRef<boolean>(false);
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
        } else if (currentTile === index) {
          setCurrentTile(undefined);
        } else {
          setCurrentTile(index);
        }

        return updated ? copy : prevUnits;
      });
    },
    [currentTile],
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleInternalDragStart = useCallback((e: DragEvent<HTMLButtonElement>, index: string, unit: string) => {
    if (unit) {
      e.dataTransfer.setData(
        'application/priority-hero',
        JSON.stringify({
          sourceIndex: index,
          hero: unit,
        }),
      );
      e.dataTransfer.effectAllowed = 'move';

      draggedTileRef.current = index;
      validDropOccurred.current = false;
    }
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLButtonElement>, index: string) => {
    e.preventDefault();
    validDropOccurred.current = true;

    try {
      let data = e.dataTransfer.getData('application/priority-hero');
      if (data) {
        const { sourceIndex, hero } = JSON.parse(data);

        setUnits(prevUnits => {
          const newUnits = { ...prevUnits };

          if (sourceIndex === index) {
            return prevUnits;
          }

          if (newUnits[index]) {
            const targetHero = newUnits[index];
            newUnits[sourceIndex] = targetHero;
            newUnits[index] = hero;
          } else {
            delete newUnits[sourceIndex];
            newUnits[index] = hero;
          }

          return newUnits;
        });

        return;
      }

      data = e.dataTransfer.getData('application/hero');
      if (data) {
        const { hero } = JSON.parse(data);

        setUnits(prevUnits => {
          const newUnits = { ...prevUnits };
          newUnits[index] = hero;

          return newUnits;
        });
      }
      setCurrentTile(undefined);
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
  }, []);

  useEffect(() => {
    const handleDragEnd = () => {
      if (draggedTileRef.current && !validDropOccurred.current) {
        setUnits(prevUnits => {
          const newUnits = { ...prevUnits };
          delete newUnits[draggedTileRef.current!];

          return newUnits;
        });
      }

      draggedTileRef.current = null;
      validDropOccurred.current = false;
    };

    document.addEventListener('dragend', handleDragEnd);

    return () => {
      document.removeEventListener('dragend', handleDragEnd);
    };
  }, []);

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
        handleDragOver,
        handleDrop,
        handleInternalDragStart,
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
