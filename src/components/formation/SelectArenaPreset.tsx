import type { FC } from 'react';

// import Accordion from '@/components/accordion/Accordion';
import { useFormation } from '@/components/formation/FormationProvider';
import PreviewArena from '@/components/formation/PreviewArena';
import { ArenaPresets } from '@/components/formation/types';
import Button from '@/components/inputs/button/Button';
import { joinStrings } from '@/utils/utils';

interface SelectArenaPresetProps {
  variant?: 'sm' | 'base';
}

const SelectArenaPreset: FC<SelectArenaPresetProps> = () => {
  const { preset, setPreset, setModalActive } = useFormation();
  // const isPreset = preset !== undefined && preset !== 'Custom';

  return (
    <div
      className={joinStrings(
        'container-primary p-2 gap-2 justify-center',
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8',
        'scroll-bar-thin scroll-bar-auto relative justify-center h-full overflow-auto',
      )}
    >
      {Object.entries(ArenaPresets)
        .slice(1)
        .map(([label, data]) => (
          <Button
            key={label}
            onClick={() => {
              setPreset(label);
              setModalActive(false);
            }}
            selected={label === preset}
            hierarchy="tertiary"
            hasActiveBorder
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-lg lg:text-xl">{label}</h2>
              <div className="block">
                <PreviewArena tileData={data as number[]} />
              </div>
            </div>
          </Button>
        ))}
    </div>
  );
};

export default SelectArenaPreset;
