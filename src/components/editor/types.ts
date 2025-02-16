export const UnitClass = ['Tank', 'Support', 'Marksman', 'Mage', 'Rogue', 'Warrior'] as const;
export const Faction = ['Lightbearer', 'Wilder', 'Mauler', 'Graveborn', 'Celestial', 'Hypogean'] as const;

export type Faction = (typeof Faction)[number];
export type UnitClass = (typeof UnitClass)[number];
type ArtifactSource = 'Pre-Season' | `Season ${number}`;

export const Artifacts = {
  'Pre-Season': ['Awakening', 'Starshard', 'Enlightening', 'Blazing', 'Confining', 'Ironwall'],
  'Season 3': [
    'Lightforge',
    'Overcharge',
    'Soulbound',
    'Banishing',
    'Snowman',
    'Bladesummon',
    'Sanctum',
    'Surging',
    'Harmonic',
    'Frostfall',
    'Stormstrike',
    'Iceguard',
  ],
} as Record<ArtifactSource, string[]>;

type ClassData = Record<UnitClass, string[]>;
type FactionData = Record<Faction, ClassData>;

type UnitType = {
  unit: string;
  type: number;
};

export type UnitFormationData = Record<number, UnitType>;
export type ArtifactFormationData = Record<'player' | 'enemy', string[]>;

export type Unit = {
  unit: string;
  faction: string;
  classLabel: string;
};

const Lightbearer = {
  Tank: ['Chippy', 'Lucca', 'Lucius', 'Temesia'],
  Support: ['Fay', 'Hugin', 'Rowan'],
  Marksman: ['Atalanta', 'Marilee'],
  Mage: ['Cassadee', 'Hammie', 'Mirael'],
  Rogue: ['Sinbad', 'Vala', 'Walker'],
  Warrior: ['Korin', 'Sonja', 'Valen'],
} as ClassData;

const Wilder = {
  Tank: ['Granny Dahnie', 'Ulmus'],
  Support: ['Damian', 'Hewynn', 'Lorsan'],
  Marksman: ['Bryon', 'Lyca'],
  Mage: ['Arden', 'Parisa', 'Tasi'],
  Rogue: ['Eironn', 'Lenya', 'Lily May'],
  Warrior: ['Florabelle', 'Kafra'],
} as ClassData;

const Mauler = {
  Tank: ['Antandra', 'Lumont'],
  Support: ['Koko', 'Mikola', 'Smokey & Meerky'],
  Marksman: ['Odie', 'Rhys'],
  Mage: ['Alsa', 'Satrana'],
  Rogue: ['Seth', 'Shakir', 'Soren'],
  Warrior: ['Brutus', 'Kruger'],
} as ClassData;

const Graveborn = {
  Tank: ['Thoran', 'Callan'],
  Support: ['Ludovic', 'Niru'],
  Marksman: ['Bonnie', 'Cecia'],
  Mage: ['Carolina', 'Viperian'],
  Rogue: ['Nara', 'Salazer', 'Silvina'],
  Warrior: ['Hodgkin', 'Igor', 'Valka'],
} as ClassData;

const Celestial = {
  Tank: ['Dunlingr'],
  Support: ['Elijah', 'Lailah'],
  Marksman: ['Dionel'],
  Mage: ['Talene'],
  Rogue: [],
  Warrior: ['Scarlita'],
} as ClassData;

const Hypogean = {
  Tank: ['Phraesto', 'Phraesto Clone'],
  Support: ['Reinier'],
  Marksman: [],
  Mage: ['Cryonaia'],
  Rogue: ['Berial'],
  Warrior: ['Harak'],
} as ClassData;

export const Units = {
  Lightbearer,
  Wilder,
  Mauler,
  Graveborn,
  Celestial,
  Hypogean,
} as FactionData;

export type Formation = {
  id?: number;
  title: string;
  author: string;
  playerUnits: string[];
  playerPosition: number[];
  enemyUnits: string[];
  enemyPosition: string[];
  artifactData: string[];
  tileData: boolean[];
  tags: string[];
  additionalNotes: string;
};

export const TileLayout = [
  { length: 2, offset: 'pl-60', reverse: 'self-end', preview: 'pl-36' },
  { length: 5, offset: 'pl-30', reverse: 'self-end pr-10', preview: 'pl-18' },
  { length: 6, offset: 'pl-20', reverse: 'self-end', preview: 'pl-12' },
  { length: 6, offset: 'pl-10', reverse: 'self-end pr-10', preview: 'pl-6' },
  { length: 7, offset: '', reverse: 'self-end', preview: '' },
  { length: 6, offset: 'pl-10', reverse: 'self-end pr-10', preview: 'pl-6' },
  { length: 6, offset: '', reverse: 'self-end pr-20', preview: '' },
  { length: 5, offset: 'pl-10', reverse: 'self-end pr-30', preview: 'pl-6' },
  { length: 2, offset: '', reverse: 'self-end pr-60', preview: '' },
] as const;

export type TileData = {
  state: -1 | 0 | 1;
  index: number;
};

export type UnitDivData = {
  tiles: Unit[];
  offset?: string;
};

export type TileDivData = {
  tiles: TileData[];
  offset?: string;
  reverse?: string;
  preview?: string;
};

export const ArenaPresets = {
  Custom: Array(45).fill(0) as number[],
  'Arena I': [
    -1, -1, 0, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1,
    1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1,
  ],
  'Arena II': [
    -1, -1, 0, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0,
    0, 0, 0, 1, 1, 1, 1, 0, 1, 1,
  ],
  'Arena III': [
    0, -1, 0, 0, 0, -1, -1, 0, 0, 0, -1, -1, -1, 1, 0, 0, -1, -1, 0, 1, 0, 0, 0, 0, 0, -1, 0, 1, 1, 0, 0, -1, 1, 1, 1,
    0, 0, 0, 1, 1, 0, 0, 0, 1, 0,
  ],

  'Arena IV': [
    -1, -1, 0, -1, -1, -1, 0, 1, 0, 0, -1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 1, 0,
    0, -1, 0, 1, 1, 1, 0, 1, 1,
  ],
  'Arena V': [
    -1, -1, -1, -1, 0, 0, -1, -1, 0, 0, 0, 0, -1, 1, 0, 0, -1, 0, -1, 1, 0, 0, 0, 0, 0, -1, 1, 0, 1, 0, 0, -1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 1, 1,
  ],
  'Arena V - Special': [
    -1, -1, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
    1, 1, 1, 0, 0, 0, 0, 1, 1,
  ],
  'Supreme Arena I': [
    0, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 1, 0, -1, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 1, 0,
  ],
  'Supreme Arena II': [
    -1, -1, 0, -1, -1, -1, -1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0,
    0, -1, 1, 1, 1, 1, 0, 1, 1,
  ],
  'Supreme Arena III': [
    0, -1, -1, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 0, 1, 1, 0,
  ],
} as const;

export const indexToPosition = [
  43, 45, 35, 38, 40, 42, 44, 28, 31, 34, 37, 39, 41, 21, 24, 27, 30, 33, 36, 14, 17, 20, 23, 26, 29, 32, 10, 13, 16,
  19, 22, 25, 5, 7, 9, 12, 15, 18, 2, 4, 6, 8, 11, 1, 3,
] as const;

export const HexPath = '/assets/images/hexes/';

export type MenuTabTypes = 'preset' | 'artifact' | 'editor';
