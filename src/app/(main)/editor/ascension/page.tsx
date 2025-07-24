import type { FC } from 'react';

import EditorAscension from '@/components/ascension-card/EditorAscension';
import Container from '@/components/container/Container';
import { getAllHeroMiniDetails } from '@/components/hero/utils';

export const dynamic = 'force-static';

const Index: FC = async () => {
  const heroes = await getAllHeroMiniDetails();

  return (
    <Container className="flex flex-col py-2 px-12">
      <EditorAscension heroes={heroes} />
    </Container>
  );
};

export default Index;
