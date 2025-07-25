import type { FC } from 'react';

import CardDeckAscension from '@/components/ascension-card/CardDeckAscension';
import Container from '@/components/container/Container';

const Index: FC = async () => (
  <Container className="flex flex-col py-2 px-12">
    <CardDeckAscension />
  </Container>
);

export default Index;
