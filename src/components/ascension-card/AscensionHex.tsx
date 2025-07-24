import type { FC } from 'react';

import { useHeroData } from '@/components/ascension-card/HeroDataProvider';
import IconAscension from '@/components/ascension-card/IconAscension';
import IconExWeapon from '@/components/ascension-card/IconExWeapon';
import HexImage from '@/components/hex-tiles/HexImage';

const AscensionHex: FC = () => {
  const { exportId, hero, ascension, exWeapon } = useHeroData();

  return (
    <div className="flex flex-row items-center justify-center w-30">
      <div id={exportId} className="flex flex-row justify-center items-end">
        <IconAscension src={ascension} size="h-22" />
        <div className="flex flex-col">
          <IconExWeapon className="z-10" src={exWeapon} type="Hex" size="w-20" />
          <div className="-mt-4">
            <HexImage src={hero} path="unit" disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AscensionHex;
