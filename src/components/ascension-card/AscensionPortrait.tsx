import Image from 'next/image';

import type { FC } from 'react';

import { useHeroData } from '@/components/ascension-card/HeroDataProvider';
import IconExWeapon from '@/components/ascension-card/IconExWeapon';
import { FrameSet } from '@/components/ascension-card/types';
import { joinStrings } from '@/utils/utils';

const AscensionPortrait: FC = () => {
  const { exportId, hero, ascension, exWeapon } = useHeroData();
  const ascensionSrc = ascension.toLowerCase();
  const isInFrameSet = FrameSet.has(ascensionSrc as FrameSet);
  const backgroundSrc = () => {
    if (isInFrameSet) {
      return 'supreme';
    }

    return ascensionSrc.replace('+', '');
  };
  const frameSrc = () => {
    if (ascensionSrc.includes('rare')) {
      return 'rare';
    } else {
      return ascensionSrc;
    }
  };

  return (
    <div className="crown-frame flex justify-center items-center w-30">
      <div
        id={exportId}
        className={joinStrings(
          isInFrameSet ? 'crown-frame w-30' : 'card-frame w-24',
          'relative flex justify-center items-center',
        )}
      >
        <div className="card-frame absolute w-24 flex justify-center overflow-hidden rounded-lg">
          <div className="card-frame absolute w-full">
            <Image src={`/assets/images/ascension/background/${backgroundSrc()}.png`} alt="" fill />
          </div>
          <div className="hero-portrait absolute -bottom-6 w-31">
            <Image src={`/assets/images/portraits/${hero}.png`} alt="" fill />
          </div>
          <IconExWeapon src={exWeapon} type="Card" size="w-24" className="!absolute z-10" />
        </div>
        <div className={joinStrings(isInFrameSet ? 'crown-frame' : 'card-frame', 'w-full absolute')}>
          <Image src={`/assets/images/ascension/frame/${frameSrc()}.png`} alt="" fill />
        </div>
      </div>
    </div>
  );
};

export default AscensionPortrait;
