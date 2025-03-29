import { type FC, Suspense } from 'react';

import Container from '@/components/container/Container';
import Link from '@/components/link/Link';
import EditorMain from '@/components/priority/EditorMain';
import SelectUnit from '@/components/priority/SelectUnit';

const PriorityEditor: FC = () => (
  <>
    <Container className="my-2 xl:hidden">
      <div className="flex flex-col bg-primary-950/80 gap-4 rounded-lg p-4 justify-center items-center">
        <h1>Device too small!</h1>
        <Link href="/" label="Return Home" className="size-base input-secondary" />
      </div>
    </Container>
    <Container className="hidden my-2 xl:flex">
      <div className="flex flex-row gap-2 w-full max-w-[1920px] px-2">
        <Suspense
          fallback={<div className="container-primary w-full flex flex-col grow gap-2 p-2 sm:w-min">Loading...</div>}
        >
          <EditorMain />
        </Suspense>
        <SelectUnit />
      </div>
    </Container>
  </>
);

export default PriorityEditor;
