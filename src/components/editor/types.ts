import { compareStrings } from '@/utils/utils';

export const UnitClass = ['Tank', 'Support', 'Marksman', 'Mage', 'Rogue', 'Warrior'] as const;
export const Faction = ['Lightbearer', 'Wilder', 'Mauler', 'Graveborn', 'Celestial', 'Hypogean'] as const;
const Talents = ['Lightbearer', 'Wilder', 'Mauler', 'Graveborn', 'Celestial-Hypogean'] as const;

export type Faction = (typeof Faction)[number];
export type UnitClass = (typeof UnitClass)[number];
export type Talents = (typeof Talents)[number];

export type ArtifactSource = 'Pre-Season' | `Season ${number}`;

export const currentSeason = 'Season 3' as const;

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

export const ArtifactSet = new Set(Object.values(Artifacts).flatMap(artifacts => artifacts.map(artifact => artifact)));

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
  Mage: ['Cassadee', 'Hammie', 'Mirael', 'Cyran'],
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

const Other = {
  Tank: ['Guywin'],
  Support: [],
  Marksman: ['Joey'],
  Mage: [],
  Rogue: [],
  Warrior: ['Hogan', 'Midnight Hunter'],
};

const Units = {
  Lightbearer,
  Wilder,
  Mauler,
  Graveborn,
  Celestial,
  Hypogean,
} as FactionData;

export const SortedUnits = Object.entries(Units).flatMap(([faction, classData]) =>
  Object.entries(classData).flatMap(([classLabel, units]) =>
    units.sort().map(unit => ({
      unit,
      faction,
      classLabel,
    })),
  ),
) as Unit[];

export const OtherUnits = (() => {
  const wildCards = new Set([...Faction, ...Talents]);
  const formattedUnits = UnitClass.map(classLabel => ({
    unit: `${classLabel} Wildcard`,
    faction: '',
    classLabel,
  })) as Unit[];

  wildCards.forEach(faction => {
    formattedUnits.push({
      unit: `${faction} Wildcard`,
      faction,
      classLabel: '',
    });
    UnitClass.forEach(classLabel => {
      formattedUnits.push({
        unit: `${faction} ${classLabel}`,
        faction,
        classLabel,
      });
    });
  });

  Object.entries(Other).forEach(([classLabel, units]) => {
    units.sort().forEach(unit => {
      formattedUnits.push({
        unit,
        faction: '',
        classLabel,
      });
    });
  });

  return formattedUnits;
})();

export const DevUnits = (() => {
  const formattedUnits = ['Dog', 'Cat'].map(unit => ({
    unit: `Yaphalla ${unit} Hex`,
    faction: '',
    classLabel: '',
  })) as Unit[];

  ArtifactSet.forEach(artifact => {
    formattedUnits.push({
      unit: artifact,
      faction: '',
      classLabel: '',
    });
  });

  return formattedUnits;
})();

export const UnitsByFaction = Object.fromEntries(
  [...SortedUnits, ...OtherUnits].map(({ unit, faction }) => {
    const isCeleHypo = ['Celestial', 'Hypogean'].some(check => compareStrings(faction, check) === 0);
    const factionName = isCeleHypo ? 'Celestial-Hypogean' : (faction as Talents);

    return [unit, factionName];
  }),
);

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

/*
   -1: enemy
    0: empty
    1: player
    2: artifact
  100: disable
*/

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
  'Supreme Arena IV': [
    -1, -1, 0, -1, -1, -1, -1, 1, 0, -1, -1, -1, -1, 1, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, -1, 1, 1,
    1, 1, 0, -1, 1, 1, 1, 1, 0, 1, 1,
  ],
  'Supreme Arena V': [
    0, -1, -1, -1, 0, 0, -1, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, -1, 0, -1, -1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
    1, 0, 0, 1, 1, 1, 1, 0, 1, 1,
  ],
  'Supreme Arena VI': [
    0, -1, -1, 0, 0, -1, -1, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 1, 1, 0, 0, -1, 1, 1, 1, 1,
    0, -1, 1, 1, 1, 0, 0, 1, 1,
  ],
  'Supreme Arena VII': [
    -1, -1, -1, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1,
    0, 0, 1, 0, 0, 0, 0, 1, 1, 1,
  ],
  'Supreme Arena VIII': [
    -1, -1, 0, -1, -1, -1, -1, 1, 0, 0, -1, -1, -1, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, 1, 1, 1,
    0, 0, -1, 1, 1, 1, 1, 0, 1, 1,
  ],
} as const;

export const DoubleArtifacts = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 2, 1, 1, 1, 1, 0, 2,
  100, 1, 1, 0, 0, 0,
] as const;

export const indexToPosition = [
  43, 45, 35, 38, 40, 42, 44, 28, 31, 34, 37, 39, 41, 21, 24, 27, 30, 33, 36, 14, 17, 20, 23, 26, 29, 32, 10, 13, 16,
  19, 22, 25, 5, 7, 9, 12, 15, 18, 2, 4, 6, 8, 11, 1, 3,
] as const;

export const HexPath = '/assets/images/hexes/';

export type MenuTabTypes = 'preset' | 'artifact' | 'editor';

export const requiredUnits = 3;
export const UnitPairs = [
  ['Phraesto', 'Phraesto Clone'],
  ['Elijah', 'Lailah'],
] as const;
export const PairSet = new Set(UnitPairs.flatMap(pairs => pairs));

export const TalentLocations = {
  Lightbearer: false,
  Wilder: false,
  Mauler: true,
  Graveborn: false,
  'Celestial-Hypogean': false,
} as const;

export const LogoRegExp = new RegExp('Cat|Dog');

export const AlwaysShowStates = new Set([1, 2, 100]);
