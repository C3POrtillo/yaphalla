export type CreatorData = {
  label: string;
  youtube: string;
  discord?: string;
  twitch?: string;
};

export const creators = {
  '/puzzle': {
    label: 'Puzzle',
    youtube: 'https://www.youtube.com/@PuzzleAFKJ',
    discord: 'https://discord.com/invite/fvHD3hNdpZ',
    twitch: 'https://twitch.tv/puzzleafk',
  } as CreatorData,
  '/wraec': {
    label: 'Wraec',
    youtube: 'https://www.youtube.com/@Wraec',
    discord: 'https://discord.com/invite/B2zkb8Ep9D',
  } as CreatorData,
  '/brownie': {
    label: 'Brownie',
    youtube: 'https://www.youtube.com/@browniegames865',
  } as CreatorData,
  '/zacess': {
    label: 'Zacess',
    youtube: 'https://www.youtube.com/@Zacess',
  } as CreatorData,
  '/ogya': {
    label: 'Ogya',
    youtube: 'https://www.youtube.com/@OgyaSan',
  } as CreatorData,
  '/zeeebo': {
    label: 'Zeeebo',
    youtube: 'https://www.youtube.com/@Zeeebo',
    discord: 'https://discord.com/invite/fwSRxwyDSG',
  } as CreatorData,
  '/fredd': {
    label: 'Fredd',
    youtube: 'https://www.youtube.com/@freddafkjourney',
    discord: 'https://discord.com/invite/SYqBjVAQtA',
  } as CreatorData,
  '/afkjuicers': {
    label: 'AFK Juicers',
    youtube: 'https://youtube.com/@afkjuicers',
  } as CreatorData,
} as const;
