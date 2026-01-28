import type { FC, PropsWithChildren } from 'react';

import { classMerge } from '@/utils/utils';

interface TooltipProps extends PropsWithChildren {
  className?: string;
  pointerEvents?: boolean;
  preWrapText?: boolean;
}

const Tooltip: FC<TooltipProps> = ({ className, pointerEvents = false, preWrapText = true, children }) => (
  <div
    className={classMerge(
      'container-primary !p-1 hidden absolute w-fit z-10 !text-white group-hover:block group-active:block peer-hover:block peer-active:block',
      preWrapText && 'whitespace-pre',
      !pointerEvents && 'pointer-events-none',
      className,
    )}
  >
    {children}
  </div>
);

export default Tooltip;
