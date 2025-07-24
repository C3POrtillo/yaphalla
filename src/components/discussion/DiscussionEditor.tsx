'use client';
import { Suspense } from 'react';

import type { FC } from 'react';

import Container from '@/components/container/Container';
import EditorMain from '@/components/discussion/EditorMain';
import SelectHero from '@/components/discussion/SelectHero';

const DiscussionEditor: FC = () => (
  <Container className="hidden my-2 xl:flex">
    <div className="flex flex-row gap-2 w-full max-w-[1920px] px-2 justify-center items-center">
      <Suspense
        fallback={<div className="container-primary w-full flex flex-col grow gap-2 p-2 sm:w-min">Loading...</div>}
      >
        <EditorMain />
      </Suspense>
      <SelectHero />
    </div>
  </Container>
);

export default DiscussionEditor;
