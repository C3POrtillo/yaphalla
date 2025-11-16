import Image from 'next/image';

import type { FC } from 'react';

import { useHeroData } from '@/components/ascension-card/HeroDataProvider';
import IconExWeapon from '@/components/ascension-card/IconExWeapon';
import { FrameSet, ManualAdjustments } from '@/components/ascension-card/types';
import { compareStrings, joinStrings } from '@/utils/utils';

const AscensionPortrait: FC = () => {
  const { exportId, hero, ascension, exWeapon, hasEx } = useHeroData();
  const isValid = !!compareStrings(ascension, 'None');
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
  const adjustments = ManualAdjustments[hero as keyof typeof ManualAdjustments];

  return (
    <div className="crown-frame flex justify-center items-center w-29">
      <div
        id={exportId}
        className={joinStrings(
          isInFrameSet ? 'crown-frame w-29' : 'card-frame w-24',
          'relative flex justify-center items-center',
        )}
      >
        <div className="card-frame absolute w-24 flex justify-center overflow-hidden rounded-lg">
          {isValid && (
            <div className="card-frame absolute w-full">
              <Image src={`/assets/images/ascension/background/${backgroundSrc()}.png`} alt="" fill />
            </div>
          )}
          <div
            className={joinStrings(
              'hero-portrait absolute',
              adjustments?.bottom || '-bottom-6',
              adjustments?.size || 'w-35',
              adjustments?.left,
            )}
          >
            <Image src={`/assets/images/portraits/${hero}.png`} alt="" fill />
          </div>
          {hasEx && <IconExWeapon src={exWeapon} type="Card" size="w-24" className="!absolute z-10 top-0.25" />}
        </div>
        {isValid && (
          <div className={joinStrings(isInFrameSet ? 'crown-frame' : 'card-frame', 'w-full absolute')}>
            <Image src={`/assets/images/ascension/frame/${frameSrc()}.png`} alt="" fill />
          </div>
        )}
      </div>
    </div>
  );
};

export default AscensionPortrait;
