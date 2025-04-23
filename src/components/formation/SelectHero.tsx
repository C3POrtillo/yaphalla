import { Suspense } from 'react';

import type { FC } from 'react';

import { useFormation } from '@/components/formation/FormationProvider';
import HeroGrid from '@/components/hero-grid/HeroGrid';

const SelectHero: FC = () => {
  const { currentTile, allUnits, units, addUnit } = useFormation();
  const disabled = currentTile === undefined;
  const currentUnit = !disabled && units[currentTile]?.unit;

  return (
    <Suspense
      fallback={<div className="container-primary w-full flex flex-col grow gap-2 p-2 sm:w-min">Loading...</div>}
    >
      <HeroGrid disabled={disabled} allUnits={allUnits} currentUnit={currentUnit} onClick={addUnit} />
    </Suspense>
  );
};

export default SelectHero;
