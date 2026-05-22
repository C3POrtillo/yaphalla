import { CommunityLogos } from '@/components/hex-tiles/types';
import { compareStrings, encodeIndex, hashHeroName, sortData, toBase62 } from '@/utils/utils';

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
const baseAscension = [...Rarity, 'Supreme'] as const;
type baseAscension = (typeof baseAscension)[number];
export const Ascension = [
  'None',
  'Crown',
  ...(Array(4)
    .fill(null)
    .map((_, i) => `Paragon ${4 - i}`) as [`Paragon ${number}`]),
  ...(baseAscension
    .slice(1)
    .reverse()
    .flatMap(ascension => [`${ascension}+`, ascension]) as [baseAscension | `${baseAscension}+`]),

  'Rare',
] as const;
export type Ascension = (typeof Ascension)[number];
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

export type Phantimal = {
  hero: string;
  heroClass?: HeroClass;
  faction?: Talents;
};

export const Difficulties = [
  'Ravaged Realm',
  'Primal Lord',
  'Guild Supremacy',
  'Common',
  'Hard',
  'Epic',
  'Hell',
  'Endless',
] as const;
export type Difficulties = (typeof Difficulties)[number];

// .replaceAll('.png', '').split(/\s\s+|\n/)
export type ImagePath =
  | 'base'
  | 'unit'
  | 'boss'
  | 'artifact'
  | `base/${'artifact' | 'faction' | 'rarity' | 'mode'}`
  | `unit/${'wildcard' | 'phantimal'}`
  | `artifact/${'honor-duel' | 'pre-season' | `season-${number}`}`;
export type ArtifactSource = 'Pre-Season' | `Season ${number}` | 'Honor Duel';
export const CurrentSeason = 'Season 6' as const;
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
  'Season 5': [
    'Arrowstorm',
    'Bloodmoon',
    'Divinefavor',
    'Grovetrap',
    'Impaling',
    'Pactbond',
    'Phalanxrush',
    'Raycage',
    'Seismic',
    'Sootherain',
    'Starbless',
    'Swordward',
  ],
  'Season 6': [
    'Arcanewild',
    'Bladechaser',
    'Blazeburn',
    'Bulwark',
    'Crescent',
    'Earthshell',
    'Lightheal',
    'Manawake',
    'Razorbeam',
    'Resonating',
    'Rockbind',
    'Starshower',
  ],
  'Season 7': [
    'Arc Burst',
    'Breakthrough',
    'Frontline',
    'Magicsurge',
    'Sunlance',
    'Surging',
    'Swiftheal',
    'Valorshield',
    'Vanguard',
    'Vinesnare',
    'Windcall',
    'Wing Guard'
  ],
} as Record<ArtifactSource, string[]>;

export const HonorDuelSet = new Set(Artifacts['Honor Duel']);
export const PreSeasonSet = new Set(Artifacts['Pre-Season']);
export const SeasonSet = new Set(Artifacts[CurrentSeason]);
export const ArtifactSet = new Set([...PreSeasonSet, ...SeasonSet, ...HonorDuelSet]);

const Lightbearer = {
  Tank: ['Chippy', 'Lucca', 'Lucius', 'Temesia'],
  Support: ['Evie', 'Fay', 'Hugin', 'Rowan'],
  Marksman: ['Atalanta', 'Gwyneth', 'Marilee', 'Silven', 'Zanie', 'Zanie Turret'],
  Mage: ['Cassadee', 'Hammie', 'Mirael', 'Cyran'],
  Rogue: ['Sinbad', 'Vala', 'Walker'],
  Warrior: ['Korin', 'Perseus', 'Sonja', 'Valen'],
} as ClassData;

const Wilder = {
  Tank: ['Granny Dahnie', 'Thador', 'Ulmus'],
  Support: ['Damian', 'Hewynn', 'Lorsan', 'Solise', 'Velara'],
  Marksman: ['Bryon', 'Indris', 'Lyca'],
  Mage: ['Arden', 'Parisa', 'Pippa', 'Tasi'],
  Rogue: ['Eironn', 'Faramor', 'Lenya', 'Lily May', 'Ravion'],
  Warrior: ['Florabelle', 'Kafra', 'Pang', 'Tilaya'],
} as ClassData;

const Mauler = {
  Tank: ['Antandra', 'Hepler', 'Gerda', 'Lumont'],
  Support: ['Koko', 'Mikola', 'Smokey & Meerky'],
  Marksman: ['Nazrik', 'Odie', 'Rhys'],
  Mage: ['Alsa', 'Gala', 'Satrana'],
  Rogue: ['Seth', 'Shakir', 'Soren'],
  Warrior: ['Brutus', 'Kordan', 'Kruger', 'Zandrok'],
} as ClassData;

const Graveborn = {
  Tank: ['Callan', 'Daimon', 'Thoran'],
  Support: ['Isabella', 'Ludovic', 'Niru'],
  Marksman: ['Bonnie', 'Cecia', 'Nerion'],
  Mage: ['Carolina', 'Shemira', 'Viperian'],
  Rogue: ['Nara', 'Salazer', 'Silvina', 'Shadewing'],
  Warrior: ['Hodgkin', 'Igor', 'Valka', 'Zorya'],
} as ClassData;

const Celestial = {
  Tank: ['Alna', 'Dunlingr'],
  Support: ['Elijah & Lailah', 'Elijah', 'Lailah'],
  Marksman: ['Aliceth', 'Dionel'],
  Mage: ['Aurora', 'Talene'],
  Rogue: ['Athalia', 'Sylphira'],
  Warrior: ['Baelran', 'Scarlita'],
} as ClassData;

const Hypogean = {
  Tank: ['Gunnar', 'Phraesto', 'Phraesto Clone'],
  Support: ['Contess', 'Reinier'],
  Marksman: ['Kulu'],
  Mage: ['Cryonaia', 'Mehira'],
  Rogue: ['Berial', 'Saida'],
  Warrior: ['Harak'],
} as ClassData;

const Dimensional = {
  Tank: [],
  Support: ['Pandora'],
  Marksman: [],
  Mage: ['Frieren', 'Lucy', 'Marcille'],
  Rogue: [],
  Warrior: ['Himmel', 'Laios','Natsu'],
};

const Other = {
  Tank: ['Guywin'],
  Support: [],
  Marksman: ['Joey'],
  Mage: [],
  Rogue: [],
  Warrior: ['Hogan', 'Midnight Hunter'],
} as ClassData;

export const Phantimals = {
  'Season 5': {
    Lightbearer: {
      hero: 'Tesio',
      heroClass: 'Support',
    },
    Wilder: {
      hero: 'Snow Stomper',
      heroClass: 'Marksman',
    },
    Mauler: {
      hero: 'Lone Gaze',
      heroClass: 'Rogue',
    },
    Graveborn: {
      hero: 'Grim Executioner',
      heroClass: 'Tank',
    },
    'Celestial-Hypogean': {
      hero: 'Illucia',
      heroClass: 'Mage',
    },
  },
  'Season 6': {
    Lightbearer: {
      hero: 'Sigmund',
      heroClass: 'Warrior',
    },
    Wilder: {
      hero: 'Bloom Mother',
      heroClass: 'Mage',
    },
    Mauler: {
      hero: 'Alpha Bear',
      heroClass: 'Marksman',
    },
    Graveborn: {
      hero: 'Shadowed Charon',
      heroClass: 'Mage',
    },
    'Celestial-Hypogean': {
      hero: 'Skyclops',
      heroClass: 'Support',
    },
  },
} as Record<`Season ${number}`, Record<Talents, Phantimal>>;

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

export const HeroesById = Object.fromEntries(
  SortedHeroes.map(({ hero, faction, heroClass }) => {
    const prefix =
      encodeIndex(Faction.indexOf(faction as Faction)) + encodeIndex(HeroClass.indexOf(heroClass as HeroClass));
    const nameHash = toBase62(hashHeroName(hero)).slice(0, 3);

    return [hero, `${prefix}${nameHash}`];
  }),
);

export const IdsByHero = Object.fromEntries(Object.entries(HeroesById).map(([hero, id]) => [id, hero]));

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

  formattedHeroes.push({
    hero: 'Wildcard',
    faction: '',
    heroClass: '',
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

export const ArtifactHeroes = Array.from(ArtifactSet, artifact => ({
  hero: artifact,
  faction: '',
  heroClass: '',
})) as Hero[];

export const UnitsByClass = Object.fromEntries(
  [...SortedHeroes, ...OtherHeroes].map(({ hero, heroClass }) => [hero, heroClass as HeroClass]),
);

export const UnitsByFaction = Object.fromEntries(
  [...SortedHeroes, ...OtherHeroes].map(({ hero, faction }) => [hero, faction as Faction]),
);

export const UnitsByTalent = Object.fromEntries(
  Object.entries(UnitsByFaction).map(([hero, faction]) => {
    const isCeleHypo = ['Celestial', 'Hypogean'].some(check => !compareStrings(faction || '', check));
    const factionName = isCeleHypo ? 'Celestial-Hypogean' : (faction as Talents);

    return [hero, factionName];
  }),
);

export const HexPath = '/assets/images/hexes/';
export const HeroPairs = [['Phraesto', 'Phraesto Clone'], ['Elijah', 'Lailah'], ['Elijah & Lailah']] as const;
export const PairSet = new Set(HeroPairs.flatMap(pairs => pairs));
export const IgnoreTalents = new Set(['Zanie Turret'] as const);

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
  const formattedHeroes = Array.from(BaseSet, hero => ({
    hero,
    faction: '',
    heroClass: '',
  })) as Hero[];

  return formattedHeroes;
})();

// Remove from Set as guides get uploaded
const UnusedBosses = new Set(['Alpha Bear', 'Lone Gaze', 'Orson', 'Setsahara', 'Skyclops']);
// Add Bosses to Set as guides begin to Exist
export const DreamRealmBosses = {
  'Season 7': new Set([
    'Gloommaw',
    'Snow Stomper',
    'King Croaker',
    'Midnight Harvester',
    'Illucia The Unveiler',
    'Sarethiel',
    'Lady Starfallen',
    'Doomscourge'
  ]),
  'Season 6': new Set([
    'Sarethiel',
    'Gloommaw',
    'Doomscourge',
    'Blightshroom',
    'Nocturne Judicator',
    'Magmazard',
    'Necrodrakon',
    'King Croaker'
  ]),
  'Season 5': new Set([
    'King Croaker',
    'Necrodrakon',
    'Thalassa',
    'Nocturne Judicator',
    'Sigmund',
    'Mirage Frostspike',
    'Magmazard',
    'Blightshroom',
  ] as const),
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

export const PrimalLordBosses = new Set([
  'Lady Starfallen',
  'Doomscourge',
  'Gloommaw',
  'Cinderwings',
  'Crystal Crawler',
  'Magmazard',
  'Blightshroom',
  'Nocturne Judicator',
  'Mirage Frostspike',
] as const);

export const RavagedRealmBosses = new Set(['Gervan', 'Azora', "Azkarion'Sol", 'Novik'] as const);

export const GuildSupremacyBosses = new Set(['Glyphshade'] as const);

export const GuideSet = new Set([
  ...Object.values(DreamRealmBosses).flatMap(bosses => [...bosses]),
  ...GuildSupremacyBosses,
  ...PrimalLordBosses,
  ...RavagedRealmBosses,
]);

export const AllBossesSet = new Set([...GuideSet, ...UnusedBosses]);

export const PhantimalSet = new Set(Object.values(Phantimals[CurrentSeason]).map(phantimal => phantimal.hero));

export const SeasonNames = {
  'Season 1': 'Song of Strife',
  'Season 2': 'Waves of Intrigue',
  'Season 3': 'Chains of Eternity',
  'Season 4': 'Echoes of Dissent',
  'Season 5': 'Thorns of Devotion',
} as const;
