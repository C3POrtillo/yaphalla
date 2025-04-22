export type CreatorData = {
  label: string;
  YouTube?: string;
  Bilibili?: string;
  Discord?: string;
  Twitch?: string;
  Twitter?: string;
  Instagram?: string;
  TikTok?: string;
  image?: string;
  language?: string;
};

export const creators = {
  '/puzzle': {
    label: 'Puzzle',
    YouTube: 'https://youtube.com/@PuzzleAFKJ',
    Discord: 'https://discord.com/invite/fvHD3hNdpZ',
    Twitch: 'https://twitch.tv/puzzleafk',
  } as CreatorData,
  '/zeeebo': {
    label: 'Zeeebo',
    YouTube: 'https://youtube.com/@Zeeebo',
    Discord: 'https://discord.com/invite/fwSRxwyDSG',
  } as CreatorData,
  '/wraec': {
    label: 'Wraec',
    YouTube: 'https://youtube.com/@Wraec',
    Discord: 'https://discord.com/invite/B2zkb8Ep9D',
  } as CreatorData,
  '/brownie': {
    label: 'Brownie',
    YouTube: 'https://youtube.com/@browniegames865',
  } as CreatorData,
  '/fredd': {
    label: 'Fredd',
    YouTube: 'https://youtube.com/@freddafkjourney',
    Discord: 'https://discord.com/invite/SYqBjVAQtA',
    Twitter: 'https://x.com/freddjourney',
    language: 'es',
  } as CreatorData,
  '/zacess': {
    label: 'Zacess',
    YouTube: 'https://youtube.com/@Zacess',
    Twitter: 'https://x.com/Zacess1',
    Instagram: 'https://instagram.com/Zacess',
  } as CreatorData,
  '/ogya': {
    label: 'OgyaSan',
    YouTube: 'https://youtube.com/@OgyaSan',
    language: 'jp',
  } as CreatorData,
  '/afkjuicers': {
    label: 'AFK Juicers',
    YouTube: 'https://youtube.com/@afkjuicers',
    Twitter: 'https://x.com/AFKJuicers',
    Instagram: 'https://instagram.com/afkjuicers',
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
    YouTube: 'https://youtube.com/@makkoafk',
    Discord: 'https://discord.com/invite/BM8kSxXGFX',
    language: 'es',
  } as CreatorData,
  '/turtlelagz': {
    label: 'Turtlelagz',
    YouTube: 'https://youtube.com/@turtlelagzgaming',
    Discord: 'https://discord.com/invite/EFdpaBqek5',
    Twitch: 'https://twitch.tv/turtlelagz',
  } as CreatorData,
  '/elfe': {
    label: 'Elfe',
    YouTube: 'https://youtube.com/@ElfeYT',
  } as CreatorData,
  '/danmanreal': {
    label: 'DanManReal',
    YouTube: 'https://youtube.com/@DanManREAL',
  } as CreatorData,
  '/frosty': {
    label: '若隐寒星 | Frosty',
    Bilibili: 'https://space.bilibili.com/401793216',
    image: '/assets/images/creators/frosty.png',
    language: 'cn',
  } as CreatorData,
  '/atraxy': {
    label: 'Atraxy',
    Twitch: 'https://twitch.tv/atraxy316',
    image: '/assets/images/creators/atraxy.png',
  } as CreatorData,
  '/bonvoya': {
    label: 'Bon Voya',
    YouTube: 'https://youtube.com/@bon.voya93',
    TikTok: 'https://www.tiktok.com/@bon.voya',
    language: 'id',
  } as CreatorData,
  '/squirrelfish': {
    label: '松鼠年糕鱼 | SquirrelFish',
    YouTube: 'https://www.youtube.com/@SquirrelFishGame',
    Bilibili: 'https://space.bilibili.com/11018422',
    language: 'cn',
  } as CreatorData,
  '/mistahhbean': {
    label: 'mistahhbean',
    Twitch: 'https://twitch.tv/mistahhbean1',
    image: '/assets/images/creators/mistahhbean.png',
  } as CreatorData,
  '/aktube': {
    label: 'AKTUBE',
    YouTube: 'https://www.youtube.com/@AKTUBE_',
    language: 'kr',
  } as CreatorData,
} as const;
