import type { FC } from 'react';

import Container from '@/components/container/Container';
import Link from '@/components/link/Link';

const Index: FC = () => (
  <>
    <Container className="m-0 flex w-full max-w-4/5 flex-col">
      <div className="flex flex-row flex-wrap w-full">
        <Link href="/preview/inputs" label="Inputs" className="input-text input-base input-secondary" />
      </div>
    </Container>
  </>
);

export default Index;
