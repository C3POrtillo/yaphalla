export const CommunityLogos = {
  dog: 'Yaphalla Dog',
  cat: 'Yaphalla Cat',
  prydwen: 'Prydwen',
  radiant: 'Radiant',
  tea: 'TEA',
  'weirdos-club': "Weirdo's Club",
  'fight-club': 'Fight Club',
  vn: 'VN',
  'the-eight': 'TheEight',
  bloodletter: 'Bloodletter',
  sabs: 'Sabs',
} as const;

export type CommunityLogos = keyof typeof CommunityLogos;
