import { CommunityLogos } from '@/components/hex-tiles/types';
import { compareStrings, sortData } from '@/utils/utils';

export const UnitClass = ['Tank', 'Support', 'Marksman', 'Mage', 'Rogue', 'Warrior'] as const;
export const Faction = [
  'Lightbearer',
  'Wilder',
  'Mauler',
  'Graveborn',
  'Celestial',
  'Hypogean',
  'Dimensional',
] as const;
const Talents = ['Lightbearer', 'Wilder', 'Mauler', 'Graveborn', 'Celestial-Hypogean'] as const;
const Rarity = ['Rare', 'Elite', 'Epic', 'Legendary', 'Mythic'] as const;
type Rarity = (typeof Rarity)[number];
export const RaritySet = new Set(Rarity);
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

// .replaceAll('.png', '').split(/\s\s+|\n/)
export type ImagePath =
  | 'base'
  | 'unit'
  | 'artifact'
  | `base/${'artifact' | 'faction' | 'rarity' | 'mode'}`
  | `unit/${'wildcard'}`
  | `artifact/${'honor-duel' | 'pre-season' | `season-${number}`}`;
export type ArtifactSource = 'Pre-Season' | `Season ${number}` | 'Honor Duel';
export const CurrentSeason = 'Season 3' as const;
export const Artifacts = {
  'Pre-Season': ['Awakening', 'Starshard', 'Enlightening', 'Blazing', 'Confining', 'Ironwall'],
  'Honor Duel': [
    'Art of Ruling',
    'Gruglin Mask',
    'Proud Greaves',
    'Bloodlust Cleaver',
    'Illusion Censer',
    'Pure Nectar',
    'Bone Scroll',
    'Immortal Flame',
    'Pyro Catalyst',
    'Breeze Rider',
    'Inspiring Horn',
    'Relic Shard',
    'Crimson Gem',
    'Lethal Elixer',
    'Rock Necklace',
    'Crystal Cell',
    'Lithe Larkspur',
    'Snow Herb',
    'Crystal Dew',
    'Lucky Cage',
    'Solidarity Fruit',
    'Dawn Antlers',
    'Luxurious Sachet',
    'Speed Seed',
    'Fang Pendant',
    'Misery Lamp',
    'Swifty Book',
    'Flame Orb',
    'Mystic Crystals',
    'Thorn Bloom',
    'Fragrant Bag',
    'Obsidian Earring',
    'Tranquil Flask',
    'Glowing Blossom',
    'Oracle Sculpture',
    'Unity Pompom',
    'Golden Blooms',
    'Pale Crown',
  ],
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

export const HonorDuelSet = new Set(Artifacts['Honor Duel']);
export const PreSeasonSet = new Set(Artifacts['Pre-Season']);
export const SeasonSet = new Set(Artifacts[CurrentSeason]);
export const ArtifactSet = new Set([...PreSeasonSet, ...SeasonSet, ...HonorDuelSet]);

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

const Dimensional = {
  Tank: [],
  Support: [],
  Marksman: [],
  Mage: [],
  Rogue: [],
  Warrior: [],
};

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
  Dimensional,
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

export const WildcardSet = new Set([...Faction, ...Talents]);

export const OtherUnits = (() => {
  const formattedUnits = UnitClass.map(unitClass => ({
    unit: `${unitClass} Wildcard`,
    faction: '',
    unitClass,
  })) as Unit[];

  WildcardSet.forEach(faction => {
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
  const formattedUnits = Object.values(CommunityLogos).map(unit => ({
    unit: `Hex ${unit}`,
    faction: '',
    unitClass: '',
  })) as Unit[];

  return formattedUnits;
})();

export const ArtifactUnits = [...ArtifactSet].map(artifact => ({
  unit: artifact,
  faction: '',
  unitClass: '',
})) as Unit[];

export const UnitsByFaction = Object.fromEntries(
  [...SortedUnits, ...OtherUnits].map(({ unit, faction }) => {
    const isCeleHypo = ['Celestial', 'Hypogean'].some(check => !compareStrings(faction, check));
    const factionName = isCeleHypo ? 'Celestial-Hypogean' : (faction as Talents);

    return [unit, factionName];
  }),
);

export const HexPath = '/assets/images/hexes/';

export const UnitPairs = [['Phraesto', 'Phraesto Clone'], ['Elijah', 'Lailah'], ['Elijah & Lailah']] as const;
export const PairSet = new Set(UnitPairs.flatMap(pairs => pairs));

export const LogoRegExp = new RegExp('Cat|Dog');

const Modes = ['Honor Duel'] as const;
type Modes = (typeof Modes)[number];
// const ModeSet = new Set([Modes])

const HexSuffix = ['Hex', 'Outline', 'Icon'] as const;
type HexSuffix = (typeof HexSuffix)[number];
const GenericHexes = ['Grid', 'Generic', 'Enemy', 'Breakable', 'Unbreakable', 'Collab'] as const;
type GenericHexes = (typeof GenericHexes)[number];
export type BaseHexes =
  | `${GenericHexes | Rarity}-${Exclude<HexSuffix, 'Icon'>}`
  | `${Faction | Talents}-${HexSuffix}`
  | `${ArtifactSource}-Outline`
  | 'Grid-Outline';

const generateHexName = (
  prefixArray: readonly (GenericHexes | Faction | Talents | ArtifactSource | Rarity)[],
  suffixArray: readonly HexSuffix[],
): [Record<HexSuffix, BaseHexes[]>, Set<string>] => {
  const suffixMap = {} as Record<HexSuffix, BaseHexes[]>;
  suffixArray.forEach(suffix => {
    suffixMap[suffix] = prefixArray.map(prefix => `${prefix.replaceAll(' ', '-')}-${suffix}` as BaseHexes);
  });

  const hexSet = new Set(Object.values(suffixMap).flatMap(key => key));

  return [suffixMap, hexSet];
};

export const { GenericHexSet, FactionHexSet, ArtifactHexSet, RarityHexSet, ModeHexSet, BaseHexData } = (() => {
  const [hex, outline] = HexSuffix;
  const [generic, genericHexSet] = generateHexName(GenericHexes, [hex, outline]);
  const [faction, factionHexSet] = generateHexName([...WildcardSet], HexSuffix);
  const [rarity, rarityHexSet] = generateHexName(Rarity, [hex, outline]);
  const [mode, modeHexSet] = generateHexName(Modes, [hex, outline]);
  const [artifact, artifactHexSet] = generateHexName(['Pre-Season', 'Season 3'] as const, [outline]);

  const baseHexData = Object.fromEntries(
    [hex, outline].map(key => [
      key === hex ? 'base' : 'outline',
      [
        ...generic[key],
        ...mode[key],
        ...rarity[key],
        ...faction[key],
        ...(artifact[key] ? artifact[key] : []),
        ...(key === hex ? faction.Icon : []),
      ],
    ]),
  );

  return {
    BaseHexData: baseHexData,
    GenericHexSet: genericHexSet,
    FactionHexSet: factionHexSet,
    ArtifactHexSet: artifactHexSet,
    RarityHexSet: rarityHexSet,
    ModeHexSet: modeHexSet,
  };
})();

export const BaseSet = new Set<string>([
  ...GenericHexSet,
  ...FactionHexSet,
  ...ArtifactHexSet,
  ...RarityHexSet,
  ...ModeHexSet,
]);

export const BaseUnits = (() => {
  const formattedUnits = [...BaseSet].map(unit => ({
    unit,
    faction: '',
    unitClass: '',
  })) as Unit[];

  return formattedUnits;
})();
