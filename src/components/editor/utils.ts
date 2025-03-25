import type { BaseHexes, Talents, TileDivData, UnitFormationData } from '@/utils/types';

import {
  PairSet,
  TalenRequiredUnits,
  TalentLocations,
  TileIndexToPosition,
  TileLayout,
  UnitPairs,
  UnitsByFaction,
} from '@/utils/types';
import { compareStrings, sortData } from '@/utils/utils';

export const getRelativeTileLabels = (tiles: number[]) => {
  const player = [] as number[];
  const enemy = [] as number[];

  tiles.forEach((state, index) => {
    const position = TileIndexToPosition[index];

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

export const getIsTopRight = (tileData: number[]) =>
  [28, 38, 39, 43].some(i => tileData[i] !== 1) && [1, 5, 6, 16].some(i => tileData[i] === 1);

export const getDrawImage = (str: string, baseHex: BaseHexes = 'Generic-Hex') => {
  const label = str.toLowerCase();
  const path = compareStrings(label, 'unit') === 0 ? ('unit' as const) : ('base' as const);
  let src = 'Hammie';

  if (compareStrings(label, 'player') === 0) {
    src = baseHex;
  }
  if (compareStrings(label, 'enemy') === 0) {
    src = 'Enemy-Hex';
  }

  return { src, path };
};

const updateFactionCount = (
  factionCount: Record<Talents, number>,
  faction: Talents,
  count: number,
  setCurrentFaction: (string?: Talents) => void,
) => {
  factionCount[faction] ??= 0;
  factionCount[faction] += count;

  if (factionCount[faction] >= TalenRequiredUnits) {
    setCurrentFaction(faction);
  }
};

export const countUnits = (
  count: Record<Talents, number>,
  units: UnitFormationData,
  setCurrentFaction: (faction?: Talents) => void,
) => {
  const unitCount = {} as Record<string, number>;

  Object.entries(units).forEach(([_, { unit, type }]) => {
    if (type !== 1 || !UnitsByFaction[unit] || !UnitsByFaction[unit].length) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (PairSet.has(unit as any)) {
      unitCount[unit] ??= 0;
      unitCount[unit]++;
    } else {
      updateFactionCount(count, UnitsByFaction[unit], 1, setCurrentFaction);
    }
  });

  UnitPairs.forEach(pairs => {
    const pairCounts = pairs.map(unit => unitCount[unit] || 0);
    const maxPairs = Math.min(...pairCounts);
    if (!maxPairs) {
      return;
    }

    updateFactionCount(count, UnitsByFaction[pairs[0]], maxPairs, setCurrentFaction);
  });
};

export const getTalentTiles = (tiles: number[], faction: Talents) =>
  new Set<number>(TalentLocations[faction] ? tiles.slice(-3, -1) : tiles.slice(0, 2));

export const processTileData = (
  tileData: number[],
  isPreview = false,
  setFirstPlayerRow?: React.Dispatch<React.SetStateAction<number | undefined>>,
  setLastPlayerRow?: React.Dispatch<React.SetStateAction<number | undefined>>,
): TileDivData[] => {
  let firstRow: number | undefined = undefined;
  let lastRow: number | undefined = undefined;
  let rowIndex = 0;

  const result: TileDivData[] = [];
  let index = 0;

  while (index < tileData.length) {
    for (const { length, offset, reverse, preview } of TileLayout) {
      if (index >= tileData.length) {
        break;
      }

      const tileSlice = tileData.slice(index, index + length);
      const hasPlayer = tileSlice.includes(1);
      const tiles = tileSlice.map((tile, i) => ({ state: tile, index: index + i }));

      result.push({ offset: isPreview ? preview : offset, tiles, reverse });

      if (hasPlayer) {
        if (firstRow === undefined) {
          firstRow = rowIndex;
        }
        lastRow = rowIndex;
      }

      index += length;
      rowIndex++;
    }
  }

  if (setFirstPlayerRow && setLastPlayerRow) {
    setFirstPlayerRow(firstRow);
    setLastPlayerRow(lastRow);
  }

  return result;
};
