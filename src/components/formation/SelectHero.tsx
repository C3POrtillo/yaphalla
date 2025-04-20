import { Suspense } from 'react';

import type { FC } from 'react';

import { useFormation } from '@/components/formation/FormationProvider';
import HeroGrid from '@/components/hero-grid/HeroGrid';

const SelectHero: FC = () => {
  const { tileData, currentTile, setCurrentTile, units, setUnits } = useFormation();
  const disabled = currentTile === undefined;
  const currentUnit = !disabled && units[currentTile]?.unit;
  const onClick = (unit: string, sameUnit: boolean) => {
    if (disabled) {
      return;
    }
    setUnits(prev => {
      const copy = { ...prev };
      if (sameUnit) {
        delete copy[currentTile];
      } else {
        copy[currentTile] = { unit, type: tileData[currentTile] };
      }

      return copy;
    });
    setCurrentTile(undefined);
  };

  return (
    <Suspense
      fallback={<div className="container-primary w-full flex flex-col grow gap-2 p-2 sm:w-min">Loading...</div>}
    >
      <HeroGrid disabled={disabled} currentUnit={currentUnit} onClick={onClick} />
    </Suspense>
  );
};

export default SelectHero;
