import type { FC, PropsWithChildren } from 'react';

import { joinStrings } from '@/utils/utils';

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className, ...props }) => (
  <section className={joinStrings('py-4', className)} {...props}>
    {children}
  </section>
);

export default Container;
