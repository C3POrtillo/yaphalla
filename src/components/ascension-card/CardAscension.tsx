import { Icon } from '@iconify/react/dist/iconify.js';
import * as htmlToImage from 'html-to-image';

import type { StyleTypes } from '@/components/ascension-card/types';
import type { FC } from 'react';

import AscensionHex from '@/components/ascension-card/AscensionHex';
import AscensionPortrait from '@/components/ascension-card/AscensionPortrait';
import { useHeroData } from '@/components/ascension-card/HeroDataProvider';
import IconAscension from '@/components/ascension-card/IconAscension';
import IconExWeapon from '@/components/ascension-card/IconExWeapon';
import { AscensionCardType, CardIcons, ExWeapon } from '@/components/ascension-card/types';
import ExportImage from '@/components/export-image/ExportImage';
import HexImage from '@/components/hex-tiles/HexImage';
import Dropdown from '@/components/inputs/dropdown/Dropdown';
import { Ascension } from '@/utils/types';
import { compareStrings, joinStrings } from '@/utils/utils';

export interface CardAscensionProps {
  styleType?: StyleTypes;
  cardClassName?: string | boolean;
}

const CardAscension: FC<CardAscensionProps> = ({ styleType = 'container', cardClassName }) => {
  const { hero, type, setType, ascension, setAscension, exWeapon, setExWeapon, isExport, setExport, exportId, hasEx } =
    useHeroData();
  const ascensionIsNone = !compareStrings(ascension, 'None');
  const exWeaponIsNone = !compareStrings(exWeapon, 'None');

  const dropdowns = [
    {
      label: (
        <span className="flex flex-row items-center gap-2">
          <span key={type} className="flex w-3 justify-center">
            <Icon icon={CardIcons[type]} />
          </span>
          {type}
        </span>
      ),
      options: AscensionCardType,
      optionIcons: AscensionCardType.map(cardType => (
        <span key={cardType} className="flex w-3 justify-center">
          <Icon icon={CardIcons[cardType]} />
        </span>
      )),
      callback: (option: string | number | boolean) => setType(option as AscensionCardType),
    } as const,
    {
      label: (
        <span className="flex flex-row items-center gap-2 min-h-7">
          {!ascensionIsNone && (
            <span className="inline-flex flex-row align-middle">
              <IconAscension src={ascension} size="h-7.5" />
            </span>
          )}
          <span className="pl-1">{ascension}</span>
        </span>
      ),
      options: Ascension,
      optionIcons: Ascension.map((src, i) => <IconAscension key={`${src}-${i}`} src={src} size="h-7.5" />),
      callback: (option: string | number | boolean) => setAscension(option as Ascension),
      filterId: `${exportId}-ascension-search`,
    } as const,
    {
      label: (
        <span className="flex flex-row items-center gap-2">
          <span className="min-w-7 text-right pl-1">{exWeapon}</span>
          {!exWeaponIsNone && (
            <span className="inline-flex flex-row align-middle">
              <IconExWeapon src={exWeapon} type={type} size="h-6" />
            </span>
          )}
        </span>
      ),
      options: ExWeapon,
      optionIcons: ExWeapon.map((src, i) => <IconExWeapon key={`${src}-${i}`} src={src} type={type} size="h-6" />),
      callback: (option: string | number | boolean) => setExWeapon(option as ExWeapon),
      optionIconPosition: 'right',
      disabled: !hasEx,
    } as const,
  ];

  return (
    <div
      className={joinStrings(
        `${styleType}-primary`,
        'relative flex flex-col gap-1 justify-start items-center',
        cardClassName,
      )}
    >
      <span className="flex flex-row items-center gap-2 border-b-2 border-tertiary-600 w-full items-center pb-2 mb-1">
        <span className="inline-flex flex-row align-middle">
          <HexImage src={hero} path="unit" size="xs" disabled />
        </span>
        <span className="text-lg">{hero}</span>
      </span>
      <div className="flex flex-row gap-2 items-center grow">
        <div className="flex flex-col gap-1 min-w-40">
          {dropdowns.map(({ ...props }, i) => (
            <Dropdown key={i} hierarchy="secondary" {...props} />
          ))}
        </div>
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
