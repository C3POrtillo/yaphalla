import type { FC, PropsWithChildren } from 'react';

interface ContainerProps extends PropsWithChildren {
  id?: string;
  className?: string;
}

const Container: FC<ContainerProps> = ({ id, children, className, ...props }) => (
  <section id={id} className={className} {...props}>
    {children}
  </section>
);

export default Container;
