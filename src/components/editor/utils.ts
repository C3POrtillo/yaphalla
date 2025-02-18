import type { Unit } from '@/components/editor/types';

import { Units, indexToPosition } from '@/components/editor/types';
import { cleanString, sortData } from '@/utils/utils';

export const validateSearch = (searchFilter: string, ...fields: string[]) => {
  const regex = new RegExp(cleanString(searchFilter), 'i');

  return !searchFilter || regex.test(fields.join(' '));
};

export const sortUnits = () => {
  const formattedUnits = Object.entries(Units).flatMap(([faction, classData]) =>
    [
      {
        unit: `${faction} Wildcard`,
        faction,
        classLabel: '',
      },
    ].concat(
      Object.entries(classData).flatMap(([classLabel, units]) =>
        units.sort().map(unit => ({
          unit,
          faction,
          classLabel,
        })),
      ),
    ),
  );
  formattedUnits.push({
    unit: 'Celestial-Hypogean Wildcard',
    faction: 'Celestial Hypogean',
    classLabel: '',
  });

  return formattedUnits as Unit[];
};

export const getRelativeTileLabels = (tiles: (-1 | 0 | 1)[]) => {
  const player = [] as number[];
  const enemy = [] as number[];

  tiles.forEach((state, index) => {
    const position = indexToPosition[index];

    if (state === 1) {
      player.push(position);
    }
    if (state === -1) {
      enemy.push(position);
    }
  });

  return {
    all: [...player, ...enemy].sort(sortData),
    player: player.sort(sortData),
    enemy: enemy.sort(sortData),
  };
};

export const getIsTopRight = (tileData: (-1 | 0 | 1)[]) =>
  [28, 38, 39, 43].some(i => tileData[i] !== 1) && [1, 5, 6, 16].some(i => tileData[i] === 1);

export const getSizeClass = (size: 'md' | 'sm' | 'xs' | '2xs') => {
  if (size === 'sm') {
    return 'min-w-16';
  }
  if (size === 'xs') {
    return 'min-w-12';
  }
  if (size === '2xs') {
    return 'min-w-8';
  }

  return 'min-w-20';
};

export const getDrawImage = (str: string) => {
  const label = str.toLowerCase();
  const path = label === 'unit' ? ('unit' as const) : ('base' as const);
  let src = 'Hammie';

  if (label === 'player') {
    src = 'Generic-Hex';
  }
  if (label === 'enemy') {
    src = 'Enemy-Hex';
  }

  return { src, path };
};
