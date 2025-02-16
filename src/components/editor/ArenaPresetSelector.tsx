import type { FC } from 'react';

import Accordion from '@/components/accordion/accordion';
import { useFormation } from '@/components/editor/FormationProvider';
import TilePreview from '@/components/editor/TilePreview';
import { ArenaPresets } from '@/components/editor/types';
import Button from '@/components/inputs/button/Button';

const ArenaPresetSelector: FC = () => {
  const { preset, setPreset } = useFormation();
  const isPreset = preset !== undefined && preset !== 'Custom';

  const mobileButtons = (
    <div className="scroll-bar-left scroll-bar-auto inset flex flex-col p-2 gap-1 bg-primary-750 max-h-[360px] overflow-auto">
      {Object.keys(ArenaPresets)
        .slice(1)
        .map(label => (
          <Button key={label} selected={preset === label} onClick={() => setPreset(label)} hierarchy="tertiary">
            {label}
          </Button>
        ))}
    </div>
  );

  return (
    <>
      <div className="container-primary w-full m-2 p-2 block xl:hidden">
        <Accordion label={isPreset ? preset : 'Select Map'}>{mobileButtons}</Accordion>
      </div>
      <div className="container-primary w-full max-w-5/6 flex-row flex-wrap m-2 p-2 hidden xl:flex gap-2 justify-center">
        {Object.entries(ArenaPresets)
          .slice(1)
          .map(([label, data]) => (
            <Button key={label} onClick={() => setPreset(label)}>
              <div className="flex flex-col gap-2">
                <h3>{label}</h3>
                <TilePreview tileData={data as (-1 | 0 | 1)[]} />
              </div>
            </Button>
          ))}
      </div>
    </>
  );
};

export default ArenaPresetSelector;
