export const CommunityLogos = {
  dog: 'Yaphalla Dog',
  cat: 'Yaphalla Cat',
  prydwen: 'Prydwen',
  radiant: 'Radiant',
  tea: 'TEA',
} as const;

export type CommunityLogos = keyof typeof CommunityLogos;
