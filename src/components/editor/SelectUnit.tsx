import { type FC, Suspense } from 'react';

import { useFormation } from '@/components/editor/FormationProvider';
import UnitGrid from '@/components/unit-grid/UnitGrid';

const SelectUnit: FC = () => {
  const { tileData, currentTile, setCurrentTile, units, setUnits } = useFormation();
  const disabled = currentTile === undefined || tileData[currentTile] === 2;
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
      <UnitGrid disabled={disabled} currentUnit={currentUnit} onClick={onClick} />
    </Suspense>
  );
};

export default SelectUnit;
