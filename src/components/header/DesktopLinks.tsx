import { motion } from 'framer-motion';

import type { NavigationLinkType } from '@/components/header/types';
import type { FC } from 'react';

import ImageComponent from '@/components/image/Image';
import Link from '@/components/link/Link';

interface DesktopLinkProps {
  links: NavigationLinkType[];
}

const DesktopLinks: FC<DesktopLinkProps> = ({ links }) =>
  links.map(({ _key, label, link, sublinks }) => {
    const tooltip =
      !!sublinks && !!sublinks.length ? (
        <div className="content-box-solid flex-col gap-1 min-w-48">
          {sublinks.map(({ ...props }) => {
            const { _key: slKey, label: slLabel, link: slLink, image } = props as unknown as NavigationLinkType;

            return (
              <motion.div
                key={slKey}
                className="w-full"
                initial={{ translateX: 0 }}
                whileHover={{ translateX: 6 }}
                transition={{
                  translateX: { type: 'spring', duration: 0.1, bounce: 0.1 },
                }}
              >
                <Link href={slLink || ''} hierarchy="quinary" className="text-md w-full" size="sm">
                  {image?.asset?._ref && (
                    <div className="flex w-6 justify-center">
                      <ImageComponent className="h-6" image={image.asset._ref} />
                    </div>
                  )}
                  {slLabel}
                </Link>
              </motion.div>
            );
          })}
        </div>
      ) : undefined;

    return (
      <Link
        key={_key}
        href={link || ''}
        hierarchy="quaternary"
        className="text-lg group-quaternary"
        size="base"
        tooltip={tooltip}
      >
        {label}
      </Link>
    );
  });

export default DesktopLinks;
