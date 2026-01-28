export const SocialIcons = {
  github: 'fa6-brands:github',
  linkedin: 'fa6-brands:linkedin',
  'ko-fi': 'simple-icons:kofi',
  discord: 'fa6-brands:discord',
  spotify: 'fa6-brands:spotify',
  instagram: 'fa6-brands:instagram',
  twitter: 'fa6-brands:x-twitter',
  email: 'material-symbols:mail-outline',
  phone: 'mdi:cellphone',
} as const;

export const SortPriority = Object.keys(SocialIcons) as (keyof typeof SocialIcons)[];
