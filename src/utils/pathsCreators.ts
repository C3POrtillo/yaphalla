export type CreatorData = {
  label: string;
  YouTube?: string;
  Bilibili?: string;
  Discord?: string;
  Twitch?: string;
  Twitter?: string;
  Instagram?: string;
  image?: string;
  language?: string;
};

export const creators = {
  '/puzzle': {
    label: 'Puzzle',
    YouTube: 'https://www.youtube.com/@PuzzleAFKJ',
    Discord: 'https://discord.com/invite/fvHD3hNdpZ',
    Twitch: 'https://twitch.tv/puzzleafk',
  } as CreatorData,
  '/zeeebo': {
    label: 'Zeeebo',
    YouTube: 'https://www.youtube.com/@Zeeebo',
    Discord: 'https://discord.com/invite/fwSRxwyDSG',
  } as CreatorData,
  '/wraec': {
    label: 'Wraec',
    YouTube: 'https://www.youtube.com/@Wraec',
    Discord: 'https://discord.com/invite/B2zkb8Ep9D',
  } as CreatorData,
  '/brownie': {
    label: 'Brownie',
    YouTube: 'https://www.youtube.com/@browniegames865',
  } as CreatorData,
  '/fredd': {
    label: 'Fredd',
    YouTube: 'https://www.youtube.com/@freddafkjourney',
    Discord: 'https://discord.com/invite/SYqBjVAQtA',
    Twitter: 'https://x.com/freddjourney',
    language: 'es',
  } as CreatorData,
  '/zacess': {
    label: 'Zacess',
    YouTube: 'https://www.youtube.com/@Zacess',
    Twitter: 'https://x.com/Zacess1',
    Instagram: 'https://www.instagram.com/Zacess',
  } as CreatorData,
  '/ogya': {
    label: 'OgyaSan',
    YouTube: 'https://www.youtube.com/@OgyaSan',
    language: 'jp',
  } as CreatorData,
  '/afkjuicers': {
    label: 'AFK Juicers',
    YouTube: 'https://youtube.com/@afkjuicers',
    Twitter: 'https://x.com/AFKJuicers',
    Instagram: 'https://www.instagram.com/afkjuicers',
  } as CreatorData,
  '/halfmoon': {
    label: '半月 | HalfMoon',
    Bilibili: 'https://space.bilibili.com/430357373',
    image: '/assets/images/creators/halfmoon.png',
    language: 'cn',
  } as CreatorData,
  '/becky': {
    label: '贝姬 | Becky',
    Bilibili: 'https://space.bilibili.com/3546739751520445',
    image: '/assets/images/creators/becky.png',
    language: 'cn',
  } as CreatorData,
  '/makko': {
    label: 'Makk0',
    YouTube: 'https://www.youtube.com/@makkoafk',
    Discord: 'https://discord.com/invite/BM8kSxXGFX',
    language: 'es',
  } as CreatorData,
  '/turtlelagz': {
    label: 'Turtlelagz',
    YouTube: 'https://www.youtube.com/@turtlelagzgaming',
    Discord: 'https://discord.com/invite/EFdpaBqek5',
    Twitch: 'https://www.twitch.tv/turtlelagz',
  } as CreatorData,
  '/elfe': {
    label: 'Elfe',
    YouTube: 'https://www.youtube.com/@ElfeYT',
  } as CreatorData,
  '/danmanreal': {
    label: 'DanManReal',
    YouTube: 'https://youtube.com/@DanManREAL',
  } as CreatorData,
  '/frosty': {
    label: '站若隐寒星 | Frosty',
    Bilibili: 'https://space.bilibili.com/401793216',
    image: '/assets/images/creators/frosty.png',
    language: 'cn',
  } as CreatorData,
  '/atraxy': {
    label: 'Atraxy',
    Twitch: 'https://www.twitch.tv/atraxy316',
    image: '/assets/images/creators/atraxy.png',
  } as CreatorData,
} as const;
