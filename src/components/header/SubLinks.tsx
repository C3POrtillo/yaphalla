import type { PathType } from '@/utils/paths';
import type { FC, ReactNode } from 'react';

import { LinkClasses } from '@/components/header/types';
import { getLinkIcon } from '@/components/header/utils';
import Link from '@/components/link/Link';
import { joinStrings } from '@/utils/utils';

interface SubLinksProps extends PathType {
  className?: string;
  rootIcon: ReactNode;
}

const SubLinks: FC<SubLinksProps> = ({ className, href: slug, options, rootIcon, ...data }) => (
  <>
    {slug && (
      <Link key={slug} className={joinStrings(LinkClasses, 'p-1', className)} href={slug} {...data}>
        {rootIcon}
      </Link>
    )}
    {options &&
      options.map(({ ...contentData }) => {
        const { label: contentLabel, href } = contentData;
        if (!href) {
          return null;
        }
        const iconName = getLinkIcon(href);
        const icon = !!iconName && <i className={joinStrings('!text-base w-5', iconName)} />;

        return (
          <Link
            key={contentLabel}
            className={joinStrings(LinkClasses, 'p-1 lg:w-full lg:justify-start')}
            {...contentData}
          >
            {icon}
          </Link>
        );
      })}
  </>
);

export default SubLinks;
