import { CommunityLogos } from '@/components/hex-tiles/types';
import { compareStrings, sortData } from '@/utils/utils';

export const HeroClass = ['Tank', 'Support', 'Marksman', 'Mage', 'Rogue', 'Warrior'] as const;
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
export const Tier = ['R', 'A', 'S'] as const;
export type Tier = (typeof Tier)[number];
export const Damage = ['Physical', 'Magic'] as const;
export type Damage = (typeof Damage)[number];
export const RaritySet = new Set(Rarity);
export type Faction = (typeof Faction)[number];
export type HeroClass = (typeof HeroClass)[number];
export type Talents = (typeof Talents)[number];

type ClassData = Record<HeroClass, string[]>;
type FactionData = Record<Faction, ClassData>;
export type Hero = {
  hero: string;
  faction?: Faction | Talents | '';
  heroClass?: HeroClass | '';
  tier?: Tier;
  damage?: Damage;
};

export const Difficulties = ['Common', 'Hard', 'Epic', 'Hell', 'Endless'] as const;
export type Difficulties = (typeof Difficulties)[number];

// .replaceAll('.png', '').split(/\s\s+|\n/)
export type ImagePath =
  | 'base'
  | 'unit'
  | 'boss'
  | 'artifact'
  | `base/${'artifact' | 'faction' | 'rarity' | 'mode'}`
  | `unit/${'wildcard'}`
  | `artifact/${'honor-duel' | 'pre-season' | `season-${number}`}`;
export type ArtifactSource = 'Pre-Season' | `Season ${number}` | 'Honor Duel';
export const CurrentSeason = 'Season 4' as const;
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
  'Season 4': [
    'Bladering',
    'Bloodrage',
    'Coreforge',
    'Dragonroar',
    'Elderbow',
    'Guardian',
    'Lightcall',
    'Malison',
    'Shadowblast',
    'Shieldnova',
    'Stormlash',
    'Vilespring',
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
  Support: ['Damian', 'Hewynn', 'Lorsan', 'Velara'],
  Marksman: ['Bryon', 'Indris', 'Lyca'],
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
  Tank: ['Callan', 'Daimon', 'Thoran'],
  Support: ['Ludovic', 'Niru'],
  Marksman: ['Bonnie', 'Cecia'],
  Mage: ['Carolina', 'Shemira', 'Viperian'],
  Rogue: ['Nara', 'Salazer', 'Silvina'],
  Warrior: ['Hodgkin', 'Igor', 'Valka'],
} as ClassData;

const Celestial = {
  Tank: ['Dunlingr'],
  Support: ['Elijah & Lailah', 'Elijah', 'Lailah'],
  Marksman: ['Dionel'],
  Mage: ['Talene'],
  Rogue: ['Athalia'],
  Warrior: ['Baelran', 'Scarlita'],
} as ClassData;

const Hypogean = {
  Tank: ['Phraesto', 'Phraesto Clone'],
  Support: ['Reinier'],
  Marksman: ['Kulu'],
  Mage: ['Cryonaia'],
  Rogue: ['Berial'],
  Warrior: ['Harak'],
} as ClassData;

const Dimensional = {
  Tank: [],
  Support: [],
  Marksman: [],
  Mage: ['Lucy'],
  Rogue: [],
  Warrior: ['Natsu'],
};

const Other = {
  Tank: ['Guywin'],
  Support: [],
  Marksman: ['Joey'],
  Mage: [],
  Rogue: [],
  Warrior: ['Hogan', 'Midnight Hunter'],
} as ClassData;

const Heroes = {
  Lightbearer,
  Wilder,
  Mauler,
  Graveborn,
  Celestial,
  Hypogean,
  Dimensional,
} as FactionData;

export const SortedHeroes = Object.entries(Heroes).flatMap(([faction, classData]) =>
  Object.entries(classData).flatMap(([heroClass, heroes]) =>
    heroes.sort(sortData).map(hero => ({
      hero,
      faction,
      heroClass,
    })),
  ),
) as Hero[];

export const HeroSet = new Set(SortedHeroes.map(({ hero }) => hero));
export const WildcardSet = new Set([...Faction, ...Talents]);

export const OtherHeroes = (() => {
  const formattedHeroes = HeroClass.map(heroClass => ({
    hero: `${heroClass} Wildcard`,
    faction: '',
    heroClass,
  })) as Hero[];

  WildcardSet.forEach(faction => {
    formattedHeroes.push({
      hero: `${faction} Wildcard`,
      faction,
      heroClass: '',
    });
    HeroClass.forEach(heroClass => {
      formattedHeroes.push({
        hero: `${faction} ${heroClass}`,
        faction,
        heroClass,
      });
    });
  });

  Object.entries(Other).forEach(([heroClass, units]) => {
    units.sort(sortData).forEach(hero => {
      formattedHeroes.push({
        hero,
        faction: '',
        heroClass: heroClass as HeroClass,
      });
    });
  });

  return formattedHeroes;
})();

export const DevHeroes = (() => {
  const formattedHeroes = Object.values(CommunityLogos).map(logo => ({
    hero: `Hex ${logo}`,
    faction: '',
    heroClass: '',
  })) as Hero[];

  return formattedHeroes;
})();

export const ArtifactHeroes = [...ArtifactSet].map(artifact => ({
  hero: artifact,
  faction: '',
  heroClass: '',
})) as Hero[];

export const UnitsByFaction = Object.fromEntries(
  [...SortedHeroes, ...OtherHeroes].map(({ hero: unit, faction }) => {
    const isCeleHypo = ['Celestial', 'Hypogean'].some(check => !compareStrings(faction || '', check));
    const factionName = isCeleHypo ? 'Celestial-Hypogean' : (faction as Talents);

    return [unit, factionName];
  }),
);

export const HexPath = '/assets/images/hexes/';
export const HeroPairs = [['Phraesto', 'Phraesto Clone'], ['Elijah', 'Lailah'], ['Elijah & Lailah']] as const;
export const PairSet = new Set(HeroPairs.flatMap(pairs => pairs));

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
  const [artifact, artifactHexSet] = generateHexName(['Pre-Season', CurrentSeason] as const, [outline]);

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

export const HexHeroes = (() => {
  const formattedHeroes = [...BaseSet].map(hero => ({
    hero,
    faction: '',
    heroClass: '',
  })) as Hero[];

  return formattedHeroes;
})();

// Remove from Set as guides get uploaded
const UnusedBosses = new Set([
  'Alpha Bear',
  'King Croaker',
  'Lone Gaze',
  'Mirage Frostspike',
  'Novik',
  'Orson',
  'Setsahara',
  'Skyclops',
  'Snow Stomper',
]);
// Add Bosses to Set as guides begin to Exist
export const DreamRealmBosses = {
  'Season 4': new Set([
    'Sigmund',
    'Nocturne Judicator',
    'Plague Creeper',
    'Thalassa',
    'Crystal Beetle',
    'Illucia',
    'Crazed Shellbrute',
    'Necrodrakon',
  ] as const),
};

export const PrimalLordBosses = new Set(['Blightshroom'] as const);

export const RavagedRealmBosses = new Set([] as const);

export const GuildSupremacyBosses = new Set(['Glyphshade'] as const);
export const BossesSet = new Set([
  ...Object.values(DreamRealmBosses).flatMap(bosses => [...bosses]),
  ...GuildSupremacyBosses,
  ...PrimalLordBosses,
  ...RavagedRealmBosses,
  ...UnusedBosses,
]);
