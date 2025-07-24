export const AscensionCardType = ['Hex', 'Card'] as const;
export type AscensionCardType = (typeof AscensionCardType)[number];
export const ExWeapon = ['+0', '+5', '+10', '+15', '+20', '+25'] as const;
export type ExWeapon = (typeof ExWeapon)[number];
export type StyleTypes = 'container' | 'inset';
export const FrameSet = new Set([
  'supreme+',
  ...(Array(4)
    .fill(null)
    .map((_, i) => `paragon ${i + 1}`) as `paragon ${number}`[]),
  'crown',
] as const);
export type FrameSet = typeof FrameSet extends Set<infer T> ? T : never;
