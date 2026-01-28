import * as htmlToImage from 'html-to-image';

import type { StyleTypes } from '@/components/ascension-card/types';
import type { FC } from 'react';

import AscensionHex from '@/components/ascension-card/AscensionHex';
import AscensionPortrait from '@/components/ascension-card/AscensionPortrait';
import DropdownMenu from '@/components/ascension-card/DropdownMenu';
import { useHeroData } from '@/components/ascension-card/HeroDataProvider';
import ExportImage from '@/components/export-image/ExportImage';
import HexImage from '@/components/hex-tiles/HexImage';
import IconDetail from '@/components/unit-data/IconDetail';
import { UnitsByClass, UnitsByFaction } from '@/utils/hero-data/types';
import { classMerge, compareStrings } from '@/utils/utils';

export interface CardAscensionProps {
  styleType?: StyleTypes;
  cardClassName?: string | boolean;
}

const CardAscension: FC<CardAscensionProps> = ({ styleType = 'container', cardClassName }) => {
  const { hero, type, isExport, setExport, exportId } = useHeroData();

  const faction = UnitsByFaction[hero];
  const heroClass = UnitsByClass[hero];

  return (
    <div
      className={classMerge(
        `${styleType}-primary`,
        'relative flex flex-col gap-1 justify-start items-center',
        cardClassName,
      )}
    >
      <div className="flex flex-row items-center gap-2 border-b-2 border-primary-750 w-full justify-between pb-2">
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex flex-row align-middle">
            <HexImage src={hero} path="unit" size="xs" disabled />
          </span>
          <h2 className="text-lg">{hero}</h2>
        </div>

        <div className="inline-flex align-base gap-2">
          <IconDetail src={faction} />
          <IconDetail src={heroClass} />
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center grow">
        <DropdownMenu />
        {compareStrings(type, 'Hex') ? <AscensionPortrait /> : <AscensionHex />}
      </div>
      <div className="w-full pt-1">
        <ExportImage
          selected={isExport}
          getImage={async () => {
            setExport(true);
            const ascensionDiv = document.getElementById(exportId);
            if (!ascensionDiv) {
              return false;
            }
            const image = await htmlToImage.toPng(ascensionDiv, { pixelRatio: 1 });

            return image;
          }}
          onClick={() => {
            setExport(false);
          }}
          size="sm"
          hasContainer={false}
        />
      </div>
    </div>
  );
};

export default CardAscension;
