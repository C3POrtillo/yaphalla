import { Icon } from '@iconify/react';

import type { FC } from 'react';
import type { Reference } from 'sanity';

import { getIcon } from '@/components/content/utils';
import ImageComponent from '@/components/image/Image';
import Link from '@/components/link/Link';
import { usePage } from '@/components/pageProvider/PageProvider';
import { classMerge } from '@/utils/utils';

export interface CtaProps {
  cta?: Reference[];
}

const CtaContainer: FC<CtaProps> = ({ cta }) => {
  const { ALL_CTAS } = usePage();

  return (
    !!cta?.length && (
      <div className="flex flex-col flex-wrap gap-2 mt-2 w-full items-center justify-center md:flex-row ">
        {cta
          .map(({ _key, _ref }) => {
            if (!ALL_CTAS?.[_ref]) {
              return null;
            }
            const { label, link, hierarchy, image: ctaImage, icon } = ALL_CTAS?.[_ref];
            const imageSrc = ctaImage?.asset?._ref;
            const iconSrc = getIcon(icon);
            const iconEl = iconSrc && (
              <Icon icon={iconSrc} className={classMerge('h-6 min-w-6', icon?.toLowerCase())} />
            );
            const imageEl = imageSrc && <ImageComponent className="h-6 min-w-6" image={imageSrc} />;

            return (
              <Link
                key={_key}
                href={link || ''}
                hierarchy={hierarchy || 'primary'}
                size="base"
                className="w-full items-center justify-center md:w-fit"
              >
                {iconEl || imageEl}
                <span className="text-nowrap">{label}</span>
              </Link>
            );
          })
          .filter(Boolean)}
      </div>
    )
  );
};

export default CtaContainer;
