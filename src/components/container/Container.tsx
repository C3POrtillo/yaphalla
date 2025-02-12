import type { FC, PropsWithChildren } from 'react';

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className, ...props }) => (
  <section className={className} {...props}>
    {children}
  </section>
);

export default Container;
