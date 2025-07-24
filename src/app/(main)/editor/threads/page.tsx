import type { FC } from 'react';

import Container from '@/components/container/Container';
import DiscussionEditor from '@/components/discussion/DiscussionEditor';
import { DiscussionProvider } from '@/components/discussion/DiscussionProvider';

const Index: FC = async () => (
  <Container className="flex flex-col py-2 px-12">
    <DiscussionProvider>
      <DiscussionEditor />
    </DiscussionProvider>
  </Container>
);

export default Index;
