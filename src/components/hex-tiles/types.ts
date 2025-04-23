export const CommunityLogos = {
  dog: 'Yaphalla Dog',
  cat: 'Yaphalla Cat',
  prydwen: 'Prydwen',
  radiant: 'Radiant',
  tea: 'TEA',
  vn: 'VN',
  'fight-club': 'Fight Club',
} as const;

export type CommunityLogos = keyof typeof CommunityLogos;
