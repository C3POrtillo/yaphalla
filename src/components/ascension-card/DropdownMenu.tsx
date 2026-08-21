import { Icon } from '@iconify/react/dist/iconify.js';

import type { FC } from 'react';

import { useHeroData } from '@/components/ascension-card/HeroDataProvider';
import IconAscension from '@/components/ascension-card/IconAscension';
import IconExWeapon from '@/components/ascension-card/IconExWeapon';
import { AscensionCardType, CardIcons, ExWeapon } from '@/components/ascension-card/types';
import { filterExWeapons, forceExWeapon } from '@/components/ascension-card/utils';
import Dropdown from '@/components/inputs/dropdown/Dropdown';
import { Ascension } from '@/utils/types';
import { compareStrings } from '@/utils/utils';

const DropdownMenu: FC = () => {
  const { type, exportId, setType, ascension, setAscension, exWeapon, setExWeapon, hasEx } = useHeroData();
  const ascensionIsNone = !compareStrings(ascension, 'None');
  const exWeaponIsNone = !compareStrings(exWeapon, 'None');
  const filteredExWeapons = ExWeapon.filter(value => filterExWeapons(value, ascension));
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
      callback: (option: string | number | boolean) => {
        setAscension(option as Ascension);
      },
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
      options: filteredExWeapons,
      optionIcons: filteredExWeapons.map((src, i) => (
        <IconExWeapon key={`${src}-${i}`} src={src} type={type} size="h-6" />
      )),
      callback: (option: string | number | boolean) => setExWeapon(forceExWeapon(option as ExWeapon, ascension)),
      optionIconPosition: 'right',
      disabled: !hasEx,
    } as const,
  ];

  return (
    <div className="flex flex-col gap-1 min-w-40">
      {dropdowns.map(({ ...props }, i) => (
        <Dropdown key={i} hierarchy="secondary" {...props} />
      ))}
    </div>
  );
};

export default DropdownMenu;
