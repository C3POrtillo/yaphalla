import { CommunityLogos } from '@/components/hex-tiles/types';
import { DreamRealmBosses, HonorDuel, PreSeason, Season7, Season8 } from '@/utils/seasonal';
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
export const CurrentSeason = 'Season 8' as const;
export const Artifacts = {
  ...PreSeason,
  ...HonorDuel,
  'Season 7': Season7['artifacts'],
  'Season 8': Season8['artifacts'],
} as Record<ArtifactSource, string[]>;

export const HonorDuelSet = new Set(Artifacts['Honor Duel']);
export const PreSeasonSet = new Set(Artifacts['Pre-Season']);
export const SeasonSet = new Set(Artifacts[CurrentSeason]);
export const ArtifactSet = new Set([...PreSeasonSet, ...SeasonSet, ...HonorDuelSet]);
export const Phantimals = {
  'Season 7': Season7['phantimals'],
  'Season 8': Season8['phantimals'],
} as Record<`Season ${number}`, Record<Talents, Phantimal | Phantimal[]>>;

const Lightbearer = {
  Tank: ['Chippy', 'Lucca', 'Lucius', 'Temesia'],
  Support: ['Evie', 'Fay', 'Hugin', 'Peggy', 'Rowan'],
  Marksman: ['Atalanta', 'Gwyneth', 'Marilee', 'Silven', 'Zanie', 'Zanie Turret'],
  Mage: ['Cassadee', 'Hammie', 'Mirael', 'Cyran'],
  Rogue: ['Sinbad', 'Vala', 'Walker'],
  Warrior: ['Korin', 'Orion', 'Perseus', 'Sonja', 'Valen'],
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
  Marksman: ['Kazim', 'Nazrik', 'Odie', 'Rhys'],
  Mage: ['Alsa', 'Gala', 'Satrana', 'Voracia'],
  Rogue: ['Seth', 'Shakir', 'Soren'],
  Warrior: ['Brutus', 'Kordan', 'Kruger', 'Zandrok'],
} as ClassData;

const Graveborn = {
  Tank: ['Callan', 'Daimon', 'Karma', 'Thoran'],
  Support: ['Isabella', 'Ludovic', 'Niru'],
  Marksman: ['Bonnie', 'Cecia', 'Nerion'],
  Mage: ['Carolina', 'Senea', 'Eryndor', 'Shemira', 'Viperian'],
  Rogue: ['Nara', 'Salazer', 'Silvina', 'Shadewing'],
  Warrior: ['Hodgkin', 'Igor', 'Valka', 'Zorya'],
} as ClassData;

const Celestial = {
  Tank: ['Alna', 'Dunlingr'],
  Support: ['Elijah & Lailah', 'Elijah', 'Lailah', 'Rolan'],
  Marksman: ['Aliceth', 'Dionel'],
  Mage: ['Aurora', 'Talene'],
  Rogue: ['Athalia', 'Sylphira'],
  Warrior: ['Baelran', 'Scarlita'],
} as ClassData;

const Hypogean = {
  Tank: ['Gunnar', 'Phraesto', 'Phraesto Clone'],
  Support: ['Contess', 'Reinier'],
  Marksman: ['Kulu', 'Lamentis'],
  Mage: ['Aster', 'Cryonaia', 'Mehira'],
  Rogue: ['Berial', 'Saida'],
  Warrior: ['Harak'],
} as ClassData;

const Dimensional = {
  Tank: [],
  Support: ['Pandora'],
  Marksman: [],
  Mage: ['Frieren', 'Lucy', 'Marcille', 'Yamato'],
  Rogue: [],
  Warrior: ['Himmel', 'Laios', 'Natsu', 'Taichi'],
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

export const PhantimalSet = new Set(Object.values(Phantimals[CurrentSeason]).flatMap(phantimal => phantimal).map(phantimal => phantimal.hero));

export const SeasonNames = {
  'Season 1': 'Song of Strife',
  'Season 2': 'Waves of Intrigue',
  'Season 3': 'Chains of Eternity',
  'Season 4': 'Echoes of Dissent',
  'Season 5': 'Thorns of Devotion',
} as const;
