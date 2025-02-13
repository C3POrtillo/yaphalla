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
  let buildPathString = '';
  const paths = currentPath.split('/').slice(2);
  let slugIndex = 0;
  const formattedPaths = paths.map(path => {
    if (slug?.length && slugIndex < slug.length && path.match(/\[.*\]/)) {
      return slug[slugIndex++];
    }

    return path;
  });

  return (
    <Container className="justify-start">
      <div className="flex flex-row flex-wrap gap-2">
        {formattedPaths.map((path, index) => {
          const label = titleCase(path);
          const copy = buildPathString;
          buildPathString += `${path}/`;

          return (
            <div key={path} className="flex flex-row items-center gap-2">
              <p>/</p>
              <Link
                className="text-hover bg-hover rounded-md px-2 py-1"
                label={label}
                href={`/${copy}${path}`}
                disabled={index === paths.length - 1}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Breadcrumbs;
