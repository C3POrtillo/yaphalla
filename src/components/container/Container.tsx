import type { FC, PropsWithChildren } from 'react';

import AnimatedContainer from '@/components/container/AnimatedContainer';
import { classMerge } from '@/utils/utils';

interface ContainerProps extends PropsWithChildren {
  id?: string;
  className?: string;
}

const Container: FC<ContainerProps> = ({ id, children, className, ...props }) => (
  <section id={id} className="flex w-9/10 m-4 xl:mx-0 2xl:max-w-9/10" {...props}>
    <AnimatedContainer className={classMerge('flex w-full', className)}>{children}</AnimatedContainer>
  </section>
);

export default Container;
