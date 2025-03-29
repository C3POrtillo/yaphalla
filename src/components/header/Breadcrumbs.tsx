'use client';
import { usePathname } from 'next/navigation';

import type { FC } from 'react';

import Container from '@/components/container/Container';
import { processPaths } from '@/components/header/utils';
import Link from '@/components/link/Link';
import { titleCase } from '@/utils/utils';

interface BreadcrumbsProps {
  slug?: string[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ slug }) => {
  const currentPath = usePathname();
  let buildPathString = '';
  const paths = currentPath.split('/').slice(1);
  const formattedPaths = processPaths(paths, slug);

  return (
    !!formattedPaths.length && (
      <Container className="justify-start mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
        <div className="flex flex-row flex-wrap gap-2 size-base bg-primary-950/80">
          {formattedPaths.map((path, index) => {
            const label = titleCase(path);
            buildPathString += `/${path}`;

            return (
              <div key={path} className="flex flex-row items-center gap-1">
                {index === 0 ? (
                  <Link href="/" className="input-tertiary text-base rounded-lg px-1" label="/" />
                ) : (
                  <p className="text-base">/</p>
                )}
                <Link
                  className="input-tertiary text-base rounded-lg px-1"
                  label={label}
                  href={buildPathString}
                  disabled={index === paths.length - 1}
                />
              </div>
            );
          })}
        </div>
      </Container>
    )
  );
};

export default Breadcrumbs;
