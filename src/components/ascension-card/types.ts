export const AscensionCardType = ['Hex', 'Card'] as const;
export type AscensionCardType = (typeof AscensionCardType)[number];

export const ExWeapon = [
  'None',
  ...Array(6)
    .fill(null)
    .map((_, i) => `+${25 - 5 * i}` as `+${number}`),
] as const;
export type ExWeapon = (typeof ExWeapon)[number];

export type StyleTypes = 'container' | 'inset';

export const FrameSet = new Set([
  'supreme',
  'supreme+',
  ...(Array(4)
    .fill(null)
    .map((_, i) => `paragon ${i + 1}`) as `paragon ${number}`[]),
  'crown',
] as const);
export type FrameSet = typeof FrameSet extends Set<infer T> ? T : never;

export const CardIcons = {
  Hex: 'akar-icons:hexagon-fill',
  Card: 'fa-solid:id-badge',
} as const;

export const ManualAdjustments = {
  Temesia: {
    bottom: '-bottom-2',
    size: 'w-34',
  },
  Ludovic: {
    bottom: '-bottom-4.5',
    size: 'w-29',
  },
  Alsa: {
    bottom: '-bottom-0.5',
    size: 'w-30',
  },
  Reinier: {
    bottom: 'bottom-1',
    size: 'w-28',
  },
} as const;
