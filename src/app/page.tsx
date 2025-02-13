import type { FC } from 'react';

import Container from '@/components/container/Container';
import Link from '@/components/link/Link';

const Index: FC = () => (
    <Container className="m-0 flex grow size-full max-w-full flex-col items-center justify-center self-center align-middle">
      <div className="flex flex-col bg-primary-950/80 gap-4 rounded-lg p-4 justify-center items-center">
        <h1>Site In Progress</h1>
        <p>Please use ortillo.cam in the meantime</p>
        <Link href="https://ortillo.cam/afkj/editor" className="input-text input-base input-secondary">
          ortillo.cam
        </Link>
      </div>
    </Container>
);

export default Index;
