import { joinStrings } from '@/utils/utils';
import type { FC, PropsWithChildren } from 'react';

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className, ...props }) => (
  <section className={joinStrings('py-4', className)} {...props}>
    {children}
  </section>
);

export default Container;
