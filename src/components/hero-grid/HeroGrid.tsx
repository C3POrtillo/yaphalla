import { Icon } from '@iconify/react/dist/iconify.js';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import type { UnitDivData } from '@/components/hero-grid/types';
import type { FC } from 'react';

import HeroFilter from '@/components/hero-filter/HeroFilter';
import HeroButtons from '@/components/hero-grid/HeroButtons';
import { getFormattedUnits } from '@/components/hero-grid/utils';
import Button from '@/components/inputs/button/Button';
import Tooltip from '@/components/tooltip/Tooltip';
import useHeroFilters from '@/utils/useHeroFilters';
import { isDevMode } from '@/utils/utils';

export interface HeroGridProps {
  allUnits?: Set<string> | false;
  currentUnit: string | false | undefined;
  disabled?: boolean;
  onClick: (unit: string, sameUnit: boolean) => void;
}

const HeroGrid: FC<HeroGridProps> = ({ disabled, ...props }) => {
  const searchParams = useSearchParams();
  const isDev = isDevMode(searchParams);
  const isMdScreen = useMediaQuery({ query: '(min-width: 768px)' });
  const isXlScreen = useMediaQuery({ query: '(min-width: 1280px)' });
  const isXxlScreen = useMediaQuery({ query: '(min-width: 1440px)' });
  const isXxxlScreen = useMediaQuery({ query: '(min-width: 2560px)' });
  const [variant, setVariant] = useState<number>(0);
  const [formattedUnits, setFormattedUnits] = useState<UnitDivData[]>([]);
  const filterProps = useHeroFilters();

  useEffect(() => {
    setFormattedUnits(getFormattedUnits({ isMdScreen, isXlScreen, isXxlScreen, isXxxlScreen }, variant));
  }, [isMdScreen, isXlScreen, isXxlScreen, isXxxlScreen, variant]);

  const tooltip = (
    <Tooltip className="text-left font-medium text-base bottom-0 translate-y-full left-1/2 -translate-x-1/2">
      <span className="text-xs text-neutral-500">Right click Hero to open skills page</span>
    </Tooltip>
  );

  const unitOptions = (
    <div className="flex flex-row gap-1 items-center">
      <span className="relative group text-white hover:text-tertiary-400">
        <Icon icon="mdi:question-mark-circle-outline" />
        {tooltip}
      </span>
      {['Units', 'Other', isDev && 'Artifacts', isDev && 'Tiles']
        .map(
          (label, i) =>
            label && (
              <Button
                key={label}
                size="sm"
                className="!px-2 !py-0.5"
                selected={variant === i}
                hasActiveBorder
                hierarchy="primary"
                onClick={() => setVariant(i)}
              >
                {label}
              </Button>
            ),
        )
        .reverse()}
    </div>
  );

  return (
    <div className="container-primary w-full flex flex-col grow gap-2 p-2 max-h-fit">
      <HeroFilter {...filterProps}>{unitOptions}</HeroFilter>
      <div className="inset-black scroll-bar-thin scroll-bar-auto relative flex grow flex-row justify-center min-h-[41rem] max-h-[41rem] overflow-auto">
        <div className="z-10 flex flex-col p-4 pt-8 h-max mb-2">
          <HeroButtons disabled={disabled} formattedUnits={formattedUnits} {...filterProps} {...props} />
        </div>
      </div>
    </div>
  );
};

export default HeroGrid;
