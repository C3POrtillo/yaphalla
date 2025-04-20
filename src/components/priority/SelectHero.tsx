import * as htmlToImage from 'html-to-image';
import { Suspense, useState } from 'react';

import type { FC } from 'react';

import ExportImage from '@/components/export-image/ExportImage';
import { filter } from '@/components/export-image/utils';
import HeroGrid from '@/components/hero-grid/HeroGrid';
import Text from '@/components/inputs/text/Text';
import { usePriority } from '@/components/priority/PriorityProvider';
import { maxGroups } from '@/components/priority/types';
import { validateCount } from '@/components/priority/utils';

const SelectHero: FC = () => {
  const { currentTile, setCurrentTile, units, setUnits, groups, setGroups } = usePriority();
  const [isActive, setActive] = useState(false);
  const disabled = currentTile === undefined;
  const currentUnit = !disabled && units[currentTile];

  const onClick = (unit: string, sameUnit: boolean) => {
    if (disabled) {
      return;
    }
    setUnits(prev => {
      const copy = { ...prev };
      if (sameUnit) {
        delete copy[currentTile];
      } else {
        copy[currentTile] = unit;
      }

      return copy;
    });
    setCurrentTile(undefined);
  };

  return (
    <Suspense
      fallback={<div className="container-primary w-full flex flex-col grow gap-2 p-2 sm:w-min">Loading...</div>}
    >
      <div className="flex flex-col h-full gap-2">
        <div className="flex flex-row gap-2 items-end">
          <div className="container-primary w-full">
            <Text
              label={`Groups (Max: ${maxGroups})`}
              value={groups}
              setState={setGroups}
              type="number"
              min={1}
              max={maxGroups}
              validate={count => validateCount(count, maxGroups)}
            >
              <div className="w-3/4 pb-1">
                <ExportImage
                  selected={isActive}
                  getImage={async () => {
                    setActive(true);
                    setCurrentTile(undefined);
                    const unitGrid = document.getElementById('unit-grid');
                    if (!unitGrid) {
                      return false;
                    }

                    const image = await htmlToImage.toPng(unitGrid, { pixelRatio: 1, filter });

                    return image;
                  }}
                  onClick={() => {
                    setActive(false);
                  }}
                  hasContainer={false}
                />
              </div>
            </Text>
          </div>
        </div>
        <div className="size-full grow flex">
          <HeroGrid disabled={disabled} currentUnit={currentUnit} onClick={onClick} />
        </div>
      </div>
    </Suspense>
  );
};

export default SelectHero;
