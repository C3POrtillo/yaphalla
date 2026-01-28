import type { Hero } from '@/sanity/types';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import Content from '@/components/content/Content';
import ImageComponent from '@/components/image/Image';

interface HeroProps extends Omit<Hero, '_type'> {
  id: string;
}

const HeroComponent: FC<HeroProps> = ({ id, image, imageAlt, ...props }) => (
  <Container id={id} className="flex-col gap-2">
    <Content className="flex-col gap-2" {...props} />
    <ImageComponent image={image} imageAlt={imageAlt} className="shadow-md" />
  </Container>
);

export default HeroComponent;
