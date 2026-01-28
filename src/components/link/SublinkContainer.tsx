import type { FC, PropsWithChildren } from 'react';

import { classMerge } from '@/utils/utils';

interface SublinkContainerProps extends PropsWithChildren {
  className?: string;
  preWrapText?: boolean;
}

const SublinkContainer: FC<SublinkContainerProps> = ({ className, preWrapText = true, children }) => (
  <div
    className={classMerge(
      'p-1 absolute w-fit transition-all duration-100 ease-out',
      'opacity-0 translate-y-2 pointer-events-none ',
      'group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto',
      'group-active:opacity-100 group-active:translate-y-0 group-active:pointer-events-auto',
      preWrapText && 'whitespace-pre-wrap',
      className,
    )}
  >
    {children}
  </div>
);

export default SublinkContainer;
