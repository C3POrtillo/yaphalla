import type { FC } from 'react';

import CardDeckAscension from '@/components/ascension-card/CardDeckAscension';
import Container from '@/components/container/Container';

const Index: FC = async () => (
  <Container className="flex-col mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3 gap-1">
    <CardDeckAscension />
  </Container>
);

export default Index;
