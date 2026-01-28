'use client';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import type { Switchback } from '@/sanity/types';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import Content from '@/components/content/Content';
import ImageComponent from '@/components/image/Image';

interface SwitchbackProps extends Omit<Switchback, '_type'> {
  id: string;
}

const SwitchbackComponent: FC<SwitchbackProps> = ({ id, orientation, image, imageAlt, ...props }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const isTablet = useMediaQuery({ query: '(min-width: 48rem)' });

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  const imageIsRight = orientation === 'imageRight';
  const contentText = <Content key="text" className="flex flex-col md:w-1/2" {...props} />;
  const contentImage = image && (
    <div key="image" className="flex items-center w-full md:w-1/2 justify-center items-start">
      <ImageComponent image={image} imageAlt={imageAlt} className="shadow-md w-2/3" quality={100} />
    </div>
  );

  const content = [contentImage, contentText];
  if (imageIsRight || (mounted && !isTablet)) {
    content.reverse();
  }

  return (
    <Container id={id} className="flex flex-col md:flex-row gap-2 items-center justify-center">
      {content}
    </Container>
  );
};

export default SwitchbackComponent;
