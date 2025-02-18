import type { FC } from 'react';

import Accordion from '@/components/accordion/accordion';
import { useFormation } from '@/components/editor/FormationProvider';
import TilePreview from '@/components/editor/TilePreview';
import { ArenaPresets } from '@/components/editor/types';
import Button from '@/components/inputs/button/Button';
import { joinStrings } from '@/utils/utils';

interface ArenaPresetSelectorProps {
  variant?: 'sm' | 'base';
}

const ArenaPresetSelector: FC<ArenaPresetSelectorProps> = ({ variant = 'base' }) => {
  const { preset, setPreset } = useFormation();
  const isPreset = preset !== undefined && preset !== 'Custom';
  const displayClasses =
    variant === 'base'
      ? 'xl:grid xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6'
      : 'flex-col flex-wrap sm:flex xl:grid xl:grid-cols-2 ';

  return (
    <>
      <div className="relative h-16 w-full block sm:hidden">
        <div className="container-primary absolute top-0 left-0 z-20 w-full p-2">
          <Accordion label={isPreset ? preset : 'Select Map'} keepOpen={false}>
            <div className="scroll-bar-left scroll-bar-auto inset-secondary !rounded-t-none flex flex-col p-2 gap-1 max-h-[360px] overflow-auto">
              {Object.keys(ArenaPresets)
                .slice(1)
                .map(label => (
                  <Button
                    key={label}
                    hierarchy="tertiary"
                    selected={preset === label}
                    onClick={() => setPreset(label)}
                    hasActiveBorder
                  >
                    {label}
                  </Button>
                ))}
            </div>
          </Accordion>
        </div>
      </div>
      <div className={joinStrings('container-primary p-2 gap-2 justify-center hidden', displayClasses)}>
        {Object.entries(ArenaPresets)
          .slice(1)
          .map(([label, data]) => (
            <Button key={label} onClick={() => setPreset(label)} selected={label === preset} hasActiveBorder>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg lg:text-xl">{label}</h2>
                <div className="hidden xl:block">
                  <TilePreview tileData={data as (-1 | 0 | 1)[]} />
                </div>
              </div>
            </Button>
          ))}
      </div>
    </>
  );
};

export default ArenaPresetSelector;
