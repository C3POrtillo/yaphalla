import * as htmlToImage from 'html-to-image';
import { useState } from 'react';

import type { FC } from 'react';

import { useDiscussion } from '@/components/discussion/DiscussionProvider';
import { DiscussionId } from '@/components/discussion/types';
import ExportImage from '@/components/export-image/ExportImage';
import IconDetail from '@/components/hero/IconDetail';
import HexImage from '@/components/hex-tiles/HexImage';
import { getPath } from '@/components/hex-tiles/utils';
import { Damage, Tier } from '@/utils/types';

const EditorMain: FC = () => {
  const { hero, tier, damage, heroClass, faction, setTier, setDamage } = useDiscussion();
  const [isExport, setExport] = useState<boolean>(false);
  const getTileImage = (unit?: string) => {
    const src = unit || 'Grid-Hex';
    const path = getPath(src);

    return { src, path };
  };

  const cycle = (values: readonly string[], current: string) => {
    const i = values.indexOf(current);
    if (i === values.length - 1) {
      return values[0];
    }
    
    return values[i + 1];
  };

  return (
    <div className="container-primary">
      <div id={DiscussionId} className="relative w-[200px] flex items-center justify-center">
        <div className="hex-icon w-40">
          <HexImage {...getTileImage(hero)} disabled />
        </div>
        <div className="absolute flex w-full justify-between top-0">
          {hero && (
            <button
              className="w-1/5 hover:brightness-110 cursor-pointer pointer-events-auto"
              onClick={() => {
                setTier(cycle(Tier, tier) as Tier);
              }}
            >
              <IconDetail src={tier} className="w-full" />
            </button>
          )}
          {hero && (
            <button
              className="w-1/5 hover:brightness-110 cursor-pointer pointer-events-auto"
              onClick={() => {
                setDamage(cycle(Damage, damage) as Damage);
              }}
            >
              <IconDetail src={damage} className="w-full" />
            </button>
          )}
        </div>
        <div className="absolute flex w-full justify-between bottom-0">
          {heroClass && <IconDetail src={heroClass} className="w-1/5" />}
          {faction && <IconDetail src={faction} className="w-1/5" />}
        </div>
      </div>
      <ExportImage
        selected={isExport}
        getImage={async () => {
          setExport(true);
          const discussionDiv = document.getElementById(DiscussionId);
          if (!discussionDiv) {
            return false;
          }
          const image = await htmlToImage.toPng(discussionDiv, { pixelRatio: 1 });

          return image;
        }}
        onClick={() => setExport(false)}
        size="sm"
      />
    </div>
  );
};

export default EditorMain;
