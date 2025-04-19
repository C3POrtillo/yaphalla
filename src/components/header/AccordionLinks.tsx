import type { PathType } from '@/utils/paths';
import type { FC, ReactNode } from 'react';

import Accordion from '@/components/accordion/Accordion';
import { LinkClasses } from '@/components/header/types';
import { getLinkIcon } from '@/components/header/utils';
import Link from '@/components/link/Link';
import { joinStrings } from '@/utils/utils';

interface AccordionLinksProps {
  slug?: string;
  title?: string;
  rootOptions: readonly PathType[];
  rootIcon: ReactNode;
}

const AccordionLinks: FC<AccordionLinksProps> = ({ slug, title, rootOptions, rootIcon }) => (
  <div className="w-full block lg:hidden">
    <Accordion key={`${slug || title} Accordion`} label={slug ? rootOptions[0].label : title} hierarchy="primary">
      <div className="inset-secondary grid gap-1 grid-cols-1 !p-1 !rounded-t-none">
        {slug && (
          <Link key={slug} className={joinStrings(LinkClasses, 'p-1')} href={slug} label={title}>
            {rootIcon}
          </Link>
        )}
        {rootOptions
          .flatMap(({ options }) => options)
          .filter(path => !!path)
          .map(({ href, label }, i) => {
            const iconName = getLinkIcon(href);
            const isEmote = href?.startsWith('/emotes');
            const icon = !!iconName && <i className={joinStrings('!text-base w-5', iconName)} />;

            return (
              <Link
                key={`${label}-${i}`}
                href={href}
                label={isEmote ? `Emojis: ${label}` : label}
                className={joinStrings(LinkClasses, 'p-1')}
              >
                {icon}
              </Link>
            );
          })}
      </div>
    </Accordion>
  </div>
);

export default AccordionLinks;
