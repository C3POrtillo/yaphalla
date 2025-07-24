import type { FC } from 'react';

import EditorAscension from '@/components/ascension-card/EditorAscension';
import Container from '@/components/container/Container';
import { SortedHeroes } from '@/utils/types';

const Index: FC = async () => (
  <Container className="flex flex-col py-2 px-12">
    <EditorAscension heroes={SortedHeroes} />
  </Container>
);

export default Index;
