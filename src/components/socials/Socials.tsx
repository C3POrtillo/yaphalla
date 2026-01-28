import { Icon } from '@iconify/react';

import type { FC } from 'react';

import Link from '@/components/link/Link';
import { SocialIcons, SortPriority } from '@/components/socials/types';
import { getSocials } from '@/sanity/client';
import { classMerge } from '@/utils/utils';

interface SocialsProps {
  variant?: 'icons' | 'full';
  className?: string;
}

const Socials: FC<SocialsProps> = async ({ variant = 'icons', className }) => {
  const data = await getSocials();
  const isFull = variant === 'full';

  return (
    !!data.length && (
      <div
        className={classMerge(
          'flex flex-row flex-wrap social items-center gap-1 md:gap-2',
          isFull && 'justify-center',
          className,
        )}
      >
        {data
          .sort(({ type: a }, { type: b }) => {
            const indexA = SortPriority.indexOf(a!.toLowerCase() as keyof typeof SocialIcons);
            const indexB = SortPriority.indexOf(b!.toLowerCase() as keyof typeof SocialIcons);

            return indexA - indexB;
          })
          .map(
            ({ type, link, label, hide }) =>
              (!hide || isFull) && (
                <Link
                  key={type}
                  href={link!}
                  className={classMerge('flex items-center', isFull ? 'h-8' : 'h-9 h-max justify-center ')}
                  aria-label={type}
                  hierarchy="tertiary"
                  size={isFull ? 'base' : 'square'}
                >
                  <Icon
                    icon={SocialIcons[type!.toLowerCase() as keyof typeof SocialIcons]}
                    className={isFull ? 'size-6' : 'size-9'}
                  />
                  {isFull && <span className="text-sm">{label}</span>}
                </Link>
              ),
          )
          .filter(Boolean)}
      </div>
    )
  );
};

export default Socials;
