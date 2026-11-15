import Image from 'next/image';

import type { FC } from 'react';

import { getTooltipImage } from '@/components/hero/utils';
import Tooltip from '@/components/tooltip/Tooltip';
import { Keywords } from '@/utils/keywords';

interface SkillKeywordProps {
  value?: string;
  label?: string;
}

const SkillKeyword: FC<SkillKeywordProps> = ({ value, label }) => {
  if (!value) {
    return null;
  }

  const keywordTooltip = Keywords[label as Keywords];
  const displayText = typeof keywordTooltip === 'string' ? keywordTooltip : keywordTooltip[0];

  return (
    <div className="relative inline-flex group justify-center align-bottom">
      <div className="inline-flex items-center align-baseline whitespace-pre gap-0.25">
        {<span className="text-green-400 underline decoration-dotted">{value}</span>}
      </div>
      {(!!keywordTooltip || typeof keywordTooltip === 'string') && (
        <Tooltip
          className="text-xs top-0 -translate-y-full !bg-primary-950 w-max max-w-48 text-wrap items-center"
          preWrapText={false}
        >
          <div className="flex flex-col w-full items-center gap-1">
            {(keywordTooltip.length === 0 || typeof keywordTooltip === 'object') && label && (
              <div className="relative w-full aspect-[4/3] flex justify-center">
                <Image src={getTooltipImage(label)} alt={displayText || value} fill sizes="64px" unoptimized priority />
              </div>
            )}
            {displayText}
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default SkillKeyword;
