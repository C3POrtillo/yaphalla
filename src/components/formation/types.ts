export const TalentRequiredUnits = 3;

type UnitType = {
  unit: string;
  type: number;
};
export type UnitFormationData = Record<number, UnitType>;
export type ArtifactFormationData = Record<'player' | 'enemy', string[]>;

export const TileLayout = [
  { length: 2, offset: 'pl-60', reverse: 'self-end', preview: 'pl-24' },
  { length: 5, offset: 'pl-30', reverse: 'self-end pr-10', preview: 'pl-12' },
  { length: 6, offset: 'pl-20', reverse: 'self-end', preview: 'pl-8' },
  { length: 6, offset: 'pl-10', reverse: 'self-end pr-10', preview: 'pl-4' },
  { length: 7, offset: '', reverse: 'self-end', preview: '' },
  { length: 6, offset: 'pl-10', reverse: 'self-end pr-10', preview: 'pl-4' },
  { length: 6, offset: '', reverse: 'self-end pr-20', preview: '' },
  { length: 5, offset: 'pl-10', reverse: 'self-end pr-30', preview: 'pl-4' },
  { length: 2, offset: '', reverse: 'self-end pr-60', preview: '' },
] as const;

export type TileData = {
  state: number;
  index: number;
};

export type TileDivData = {
  tiles: TileData[];
  offset?: string;
  reverse?: string;
  preview?: string;
};

/*
   -3: unbreakable
   -2: breakable
   -1: enemy
    0: empty
    1: player
    2: swap
  100: disable
*/

export const ArenaPresets = {
  Custom: Array(45).fill(0) as number[],
  Thalassa: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1,
    1, 1, 1, 0, 1, 1,
  ],
  'Arena I': [
    -1, -1, 0, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1,
    1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1,
  ],
  'Arena II': [
    -1, -1, -3, -1, -1, -1, -1, -3, -3, -3, -3, -1, -1, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1,
    -3, -3, -3, -3, 1, 1, 1, 1, -3, 1, 1,
  ],
  'Arena III': [
    0, -1, 0, 0, 0, -1, -1, 0, -3, -3, -1, -1, -1, 1, -3, 0, -1, -1, -3, 1, -3, 0, 0, 0, -3, -1, -3, 1, 1, 0, -3, -1, 1,
    1, 1, -3, -3, 0, 1, 1, 0, 0, 0, 1, 0,
  ],
  'Arena IV': [
    -1, -1, 0, -1, -1, -1, 0, 1, 0, 0, -1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 1, 0,
    0, -1, 0, 1, 1, 1, 0, 1, 1,
  ],
  'Arena V': [
    -1, -1, -1, -1, 0, 0, -1, -1, 0, -3, 0, 0, -1, 1, 0, -3, -1, -3, -1, 1, 0, -3, 0, -3, 0, -1, 1, -3, 1, -3, 0, -1, 1,
    0, 0, -3, 0, 1, 1, 0, 0, 1, 1, 1, 1,
  ],
  // 'Arena V - Special': [
  //   -1, -1, -2, -2, -2, -2, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  //   1, 1, 1, 1, 1, -2, -2, -2, -2, 1, 1,
  // ],
  'Arena V - Special': [
    -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -3, 0, 0, 0, 0, 0, -1, -3, 0, 0, 0, 0, 0, -3, 0,
    0, 0, 0, 1, 1, 1, 1, 0, 1, 1,
  ],
  'Supreme Arena I': [
    0, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, -2, -2, 0, 0, -1, 0, -2, 1, -2, 1, 0, -1, -2, -1, -2, 0, 1, 0, 0, -2, -2,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0,
  ],
  'Supreme Arena II': [
    -1, -1, 0, -1, -1, -1, -1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0,
    0, -1, 1, 1, 1, 1, 0, 1, 1,
  ],
  'Supreme Arena III': [
    0, -1, -1, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, -1, 0, -3, -1, 0, 0, 1, 0, -3, 0, -3, 0, -1, 0, 0, 1, -3, 0, 1, 0, 0, 0,
    0, 0, 1, 1, 1, 0, 0, 1, 1, 0,
  ],
  'Supreme Arena IV': [
    -1, -1, 0, -1, -1, -1, -1, 1, 0, -1, -1, -1, -1, 1, -3, 0, -1, -1, 0, -3, -3, 0, 0, 0, -3, -3, 0, 1, 1, 0, -3, -1,
    1, 1, 1, 1, 0, -1, 1, 1, 1, 1, 0, 1, 1,
  ],
  'Supreme Arena V': [
    -2, -1, -1, -1, -2, -2, -1, -3, -1, -1, 0, -2, -2, 0, -3, 0, 0, -1, -1, 0, 0, 0, -1, 0, -1, -1, 1, 1, 0, 0, -3, -3,
    1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1,
  ],
  'Supreme Arena VI': [
    0, -1, -1, 0, 0, -1, -1, -1, -3, 0, -1, 0, 0, -1, -3, 0, 0, 0, 0, 0, -3, 0, 0, 0, -3, -1, 0, 1, 1, 0, -3, -1, 1, 1,
    1, 1, -3, -1, 1, 1, 1, 0, 0, 1, 1,
  ],
  'Supreme Arena VII': [
    -1, -1, -1, -2, -2, -2, -2, -1, -2, 0, -1, -1, -1, -1, -2, 0, 0, -1, -1, -2, -2, 0, 0, 0, -2, -2, 1, 1, 0, 0, -2, 1,
    1, 1, 1, 0, -2, 1, -2, -2, -2, -2, 1, 1, 1,
  ],
  'Supreme Arena VIII': [
    -1, -1, 0, -1, -1, -1, -1, 1, 0, 0, -1, -1, -1, 1, -3, 0, -1, 0, 0, -3, -3, 0, 0, 0, -3, -3, 0, 0, 1, 0, -3, -1, 1,
    1, 1, 0, 0, -1, 1, 1, 1, 1, 0, 1, 1,
  ],
  'Supreme Arena IX': [
    -1, -1, 0, 0, 0, -1, -1, -1, -3, -3, -3, 0, -1, -1, -2, 1, 1, -3, 0, -1, -3, 1, 1, 1, -3, 0, 0, -3, 1, 1, -2, -1, 0,
    0, -2, -3, -3, -1, 1, 0, 0, 0, -1, 1, 0,
  ],
  'Supreme Arena X': [
    -1, -1, -2, -2, -2, -2, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, -2, -2, -2, -2, 1, 1,
  ],
  'Ravaged Realm S4': [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 1,
  ],
} as const;

// export const DoubleArtifacts = [
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 2, 1, 1, 1, 1, 0, 2,
//   100, 1, 1, 0, 0, 0,
// ] as const;

export const TileIndexToPosition = [
  43, 45, 35, 38, 40, 42, 44, 28, 31, 34, 37, 39, 41, 21, 24, 27, 30, 33, 36, 14, 17, 20, 23, 26, 29, 32, 10, 13, 16,
  19, 22, 25, 5, 7, 9, 12, 15, 18, 2, 4, 6, 8, 11, 1, 3,
] as const;

export const AlwaysShowStates = new Set([1, 2, 100]);
export const ObstacleStates = new Set([-3, -2]);

export const TalentLocations = {
  Lightbearer: false,
  Wilder: false,
  Mauler: true,
  Graveborn: false,
  'Celestial-Hypogean': false,
} as const;

export const SubmenuId = 'editor-submenu';
