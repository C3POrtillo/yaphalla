import { Icon } from '@iconify/react';
import Image from 'next/image';

import type { CreatorData } from '@/utils/pathsCreators';
import type { FC } from 'react';

import { fetchYouTubePicture, getFontSize, getIcon, getPriority } from '@/components/creators/utils';
import Link from '@/components/link/Link';
import { compareStrings, joinStrings } from '@/utils/utils';

const CardCreator: FC<CreatorData> = async ({ label, language, image, ...props }) => {
  const { YouTube } = props;
  const links = Object.entries(props)
    .sort(([a], [b]) => {
      const priorityA = getPriority(a);
      const priorityB = getPriority(b);

      return priorityA !== priorityB ? priorityA - priorityB : compareStrings(a, b);
    })
    .map(
      ([site, href]) =>
        site && (
          <Link key={site} href={href} className="bg-secondary input-secondary size-sm inline-flex gap-2">
            <Icon icon={site === 'Medal' ? 'arcticons:medal-tv' : `fa6-brands:${getIcon(site)}`} className="size-6" />
            {site}
            {['YouTube', 'Bilibili'].some(test => !compareStrings(site, test)) && !!language && (
              <span className={`fi fi-${language} flag-icon-squared rounded-sm`} />
            )}
          </Link>
        ),
    );

  const creatorImage = (YouTube && (await fetchYouTubePicture(YouTube))) || image;

  return (
    <div className="relative container-primary w-full flex flex-col gap-1 items-center sm:w-56">
      <div className="flex flex-row w-full gap-2 items-center">
        {creatorImage && (
          <div className="relative size-10 min-w-10 rounded-full border-2 border-tertiary-600">
            <Image className="rounded-full" src={creatorImage} alt="" fill sizes="64px" unoptimized priority />
          </div>
        )}
        <div className="flex flex-row w-full text-tertiary-600 border-b-2 pb-1 mb-1">
          <h2 className={joinStrings('w-full', getFontSize(label.length))}>{label}</h2>
        </div>
      </div>
      <div className="w-full flex flex-col gap-1 h-min">{links}</div>
    </div>
  );
};

export default CardCreator;
