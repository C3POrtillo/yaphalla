import type { NavigationLinkType } from '@/components/header/types';
import type { FC } from 'react';

import Accordion from '@/components/accordion/Accordion';
import ImageComponent from '@/components/image/Image';
import Link from '@/components/link/Link';

interface MobileLinkProps {
  links: NavigationLinkType[];
}

const MobileLinks: FC<MobileLinkProps> = ({ links }) =>
  links.map(({ _key, label, link, sublinks }) => {
    const buttons =
      !!sublinks && !!sublinks.length ? (
        <div className="content-box flex-col gap-1 min-w-48 rounded-t-none border-t-0">
          {sublinks.map(({ ...props }) => {
            const { _key: slKey, label: slLabel, link: slLink, image } = props as unknown as NavigationLinkType;

            return (
              <Link key={slKey} href={slLink || ''} hierarchy="tertiary" className="text-md w-full" size="sm">
                {image?.asset?._ref && (
                  <div className="flex w-6 justify-center">
                    <ImageComponent className="h-6" image={image.asset._ref} />
                  </div>
                )}
                {slLabel}
              </Link>
            );
          })}
        </div>
      ) : undefined;

    return (
      <Accordion
        hierarchy="quinary"
        key={_key}
        className="w-full rounded-md"
        label={
          <Link key={_key} href={link || ''} hierarchy="tertiary" className="text-lg group-quaternary" size="base">
            {label}
          </Link>
        }
      >
        {buttons}
      </Accordion>
    );
  });

export default MobileLinks;
