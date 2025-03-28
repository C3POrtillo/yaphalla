import { capitalize } from 'lodash';
import Image from 'next/image';

import type { CreatorData } from '@/utils/pathsCreators';
import type { FC } from 'react';

import { fetchYouTubePicture, getIcon, getPriority } from '@/components/creators/utils';
import Link from '@/components/link/Link';
import { compareStrings, joinStrings } from '@/utils/utils';

const CreatorCard: FC<CreatorData> = async ({ label, language, ...props }) => {
  const { YouTube, image } = props;
  const links = Object.entries(props)
    .sort(([a], [b]) => {
      const priorityA = getPriority(a);
      const priorityB = getPriority(b);

      return priorityA !== priorityB ? priorityA - priorityB : compareStrings(a, b);
    })
    .map(
      ([site, href]) =>
        site &&
        !!compareStrings(site, 'image') && (
          <Link key={site} href={href} className="bg-secondary input-secondary size-sm inline-flex gap-2">
            <i className={joinStrings('fab', `fa-${getIcon(site)}`)} />
            {capitalize(site)}
            {['YouTube', 'Bilibili'].some(test => !compareStrings(site, test)) && !!language && (
              <span className={`fi fi-${language} flag-icon-squared`} />
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

        <h2 className="w-full text-xl text-tertiary-600 border-b-2 pb-1 mb-1 ">{label}</h2>
      </div>
      <div className="w-full flex flex-col gap-1 h-min">{links}</div>
    </div>
  );
};

export default CreatorCard;
