import type { FC } from 'react';

import Container from '@/components/container/Container';
import Link from '@/components/link/Link';

const Index: FC = () => (
  <>
    <Container className="mt-0 mb-18 flex grow size-full max-w-full flex-col items-center justify-center self-center align-middle">
      <div className="flex flex-col bg-primary-950/80 gap-4 rounded-lg p-4 justify-center items-center">
        <h1>
          <span className="text-red-700">404</span> | <span className="text-red-700">Not Found</span>
        </h1>
        <p>Page does not exist.</p>
        <Link href="/" className="input-text input-base input-secondary">
          Return Home
        </Link>
      </div>
    </Container>
  </>
);

export default Index;
