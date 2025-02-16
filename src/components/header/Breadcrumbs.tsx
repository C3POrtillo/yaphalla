'use client';
import { usePathname } from 'next/navigation';

import type { FC } from 'react';

import Container from '@/components/container/Container';
import Link from '@/components/link/Link';
import { titleCase } from '@/utils/utils';

interface BreadcrumbsProps {
  slug?: string[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ slug }) => {
  const currentPath = usePathname();
  let buildPathString = '/';
  const paths = currentPath.split('/').slice(1);
  let slugIndex = 0;
  const formattedPaths = paths
    .filter(path => !!path)
    .map(path => {
      if (slug?.length && slugIndex < slug.length && path.match(/\[.*\]/)) {
        return slug[slugIndex++];
      }

      return path;
    });

  return (
    !!formattedPaths.length && (
      <Container className="justify-start px-2 lg:max-w-2/3 lg:px-0">
        <div className="flex flex-row flex-wrap gap-2 size-base bg-primary-950/80">
          {formattedPaths.map((path, index) => {
            const label = titleCase(path);
            const copy = buildPathString;
            buildPathString += `${path}/`;

            return (
              <div key={path} className="flex flex-row items-center gap-2">
                <p>/</p>
                <Link className="input-tertiary" label={label} href={copy} disabled={index === paths.length - 1} />
              </div>
            );
          })}
        </div>
      </Container>
    )
  );
};

export default Breadcrumbs;
