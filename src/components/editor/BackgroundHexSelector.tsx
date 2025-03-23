import type { FC, ReactNode } from 'react';

import TileButton from '@/components/editor/TileButton';
import { BaseHexData } from '@/components/editor/types';

const BackgroundHexSelector: FC = () => {
  const { base, outline } = Object.fromEntries(
    Object.entries(BaseHexData).map(([key, hexes]) => {
      const groupedHexes: ReactNode[][] = [];
      hexes.forEach((hex, index) => {
        const groupIndex = index < 2 ? 0 : Math.floor((index - 2) / 7) + 1;

        if (!groupedHexes[groupIndex]) {
          groupedHexes[groupIndex] = [];
        }

        groupedHexes[groupIndex].push(<TileButton key={hex} path="base" src={hex} onClick={() => {}} />);
      });

      return [
        key,
        groupedHexes.map((group, idx) => (
          <div key={idx} className="flex gap-2">
            {group}
          </div>
        )),
      ];
    }),
  );

  return (
    <div className="flex flex-row gap-2 justify-center items-start text-center">
      <div className="container-primary flex flex-col gap-2 items-center">
        <h2>Background</h2>
        <div className="flex flex-col flex-wrap gap-2 items-center">{base}</div>
      </div>
      <div className="container-primary flex flex-col gap-2">
        <h2>Outline</h2>
        <div className="flex flex-col flex-wrap gap-2 items-center">{outline}</div>
      </div>
    </div>
  );
};

export default BackgroundHexSelector;
