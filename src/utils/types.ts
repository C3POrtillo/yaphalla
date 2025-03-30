import { compareStrings, sortData } from '@/utils/utils';

export const UnitClass = ['Tank', 'Support', 'Marksman', 'Mage', 'Rogue', 'Warrior'] as const;
export const Faction = ['Lightbearer', 'Wilder', 'Mauler', 'Graveborn', 'Celestial', 'Hypogean'] as const;
const Talents = ['Lightbearer', 'Wilder', 'Mauler', 'Graveborn', 'Celestial-Hypogean'] as const;
export type Faction = (typeof Faction)[number];
export type UnitClass = (typeof UnitClass)[number];
export type Talents = (typeof Talents)[number];

type ClassData = Record<UnitClass, string[]>;
type FactionData = Record<Faction, ClassData>;
export type Unit = {
  unit: string;
  faction: Faction | Talents | '';
  unitClass: UnitClass | '';
};

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
  Rogue: ['Eironn', 'Faramor', 'Lenya', 'Lily May'],
  Warrior: ['Florabelle', 'Kafra'],
} as ClassData;

const Mauler = {
  Tank: ['Antandra', 'Gerda', 'Lumont'],
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
  Support: ['Elijah & Lailah', 'Elijah', 'Lailah'],
  Marksman: ['Dionel'],
  Mage: ['Talene'],
  Rogue: ['Athalia'],
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
} as ClassData;

const Units = {
  Lightbearer,
  Wilder,
  Mauler,
  Graveborn,
  Celestial,
  Hypogean,
} as FactionData;

export const SortedUnits = Object.entries(Units).flatMap(([faction, classData]) =>
  Object.entries(classData).flatMap(([unitClass, units]) =>
    units.sort(sortData).map(unit => ({
      unit,
      faction,
      unitClass,
    })),
  ),
) as Unit[];

const wildCards = new Set([...Faction, ...Talents]);

export const OtherUnits = (() => {
  const formattedUnits = UnitClass.map(unitClass => ({
    unit: `${unitClass} Wildcard`,
    faction: '',
    unitClass,
  })) as Unit[];

  wildCards.forEach(faction => {
    formattedUnits.push({
      unit: `${faction} Wildcard`,
      faction,
      unitClass: '',
    });
    UnitClass.forEach(unitClass => {
      formattedUnits.push({
        unit: `${faction} ${unitClass}`,
        faction,
        unitClass,
      });
    });
  });

  Object.entries(Other).forEach(([unitClass, units]) => {
    units.sort(sortData).forEach(unit => {
      formattedUnits.push({
        unit,
        faction: '',
        unitClass: unitClass as UnitClass,
      });
    });
  });

  return formattedUnits;
})();

export const DevUnits = (() => {
  const formattedUnits = ['Dog', 'Cat'].map(unit => ({
    unit: `Yaphalla ${unit} Hex`,
    faction: '',
    unitClass: '',
  })) as Unit[];

  ArtifactSet.forEach(artifact => {
    formattedUnits.push({
      unit: artifact,
      faction: '',
      unitClass: '',
    });
  });

  return formattedUnits;
})();

export const UnitsByFaction = Object.fromEntries(
  [...SortedUnits, ...OtherUnits].map(({ unit, faction }) => {
    const isCeleHypo = ['Celestial', 'Hypogean'].some(check => !compareStrings(faction, check));
    const factionName = isCeleHypo ? 'Celestial-Hypogean' : (faction as Talents);

    return [unit, factionName];
  }),
);

export const HexPath = '/assets/images/hexes/';

export const UnitPairs = [
  ['Phraesto', 'Phraesto Clone'],
  ['Elijah', 'Lailah'],
] as const;
export const PairSet = new Set(UnitPairs.flatMap(pairs => pairs));

export const LogoRegExp = new RegExp('Cat|Dog');

const HexSuffix = ['Hex', 'Outline', 'Icon'] as const;
type HexSuffix = (typeof HexSuffix)[number];
const GenericHexes = ['Generic', 'Enemy', 'Breakable', 'Unbreakable'] as const;
type GenericHexes = (typeof GenericHexes)[number];
export type BaseHexes =
  | `${GenericHexes}-${Exclude<HexSuffix, 'Icon'>}`
  | `${Faction | Talents}-${HexSuffix}`
  | `${ArtifactSource}-Outline`;

const generateHexName = (
  prefixArray: readonly (GenericHexes | Faction | Talents | ArtifactSource)[],
  suffixArray: readonly HexSuffix[],
) => {
  const suffixMap = {} as Record<HexSuffix, BaseHexes[]>;
  suffixArray.forEach(suffix => {
    suffixMap[suffix] = prefixArray.map(prefix => `${prefix}-${suffix}` as BaseHexes);
  });

  return suffixMap;
};

export const BaseHexData = (() => {
  const [hex, outline] = HexSuffix;
  const genericBase = generateHexName(GenericHexes, [hex, outline]);
  const factionBase = generateHexName([...wildCards], HexSuffix);
  const artifactBase = generateHexName(['Pre-Season', 'Season 3'] as const, [outline]);

  return Object.fromEntries(
    [hex, outline].map(key => [
      key === hex ? 'base' : 'outline',
      [
        ...genericBase[key],
        ...factionBase[key],
        ...(artifactBase[key] ? artifactBase[key] : []),
        ...(key === hex ? factionBase.Icon : []),
      ],
    ]),
  );
})() as {
  base: BaseHexes[];
  outline: BaseHexes[];
};

export const BaseSet = new Set<string>(['Grid-Outline', ...Object.values(BaseHexData).flatMap(hexes => hexes.map(hex => hex))]);

export const BaseUnits = (() => {
  const formattedUnits = [...BaseSet].map(unit => ({
    unit,
    faction: '',
    unitClass: '',
  })) as Unit[];

  return formattedUnits;
})();
