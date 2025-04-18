export const CommunityLogos = {
  cat: 'Yaphalla Cat',
  dog: 'Yaphalla Dog',
  prydwen: 'Prydwen',
  radiant: 'Radiant',
  tea: 'Tea',
} as const;

export type CommunityLogos = keyof typeof CommunityLogos;
