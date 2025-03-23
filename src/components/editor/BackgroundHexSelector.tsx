import type { FC, ReactNode } from 'react';

import { useFormation } from '@/components/editor/FormationProvider';
import TileButton from '@/components/editor/TileButton';
import { BaseHexData } from '@/components/editor/types';
import { compareStrings, joinStrings } from '@/utils/utils';

const BackgroundHexSelector: FC = () => {
  const { baseHex, setBaseHex, outline: selectedOutline, setOutline } = useFormation();

  const { base, outline } = Object.fromEntries(
    Object.entries(BaseHexData).map(([key, hexes]) => {
      const groupedHexes: ReactNode[][] = [];
      hexes.forEach((hex, i) => {
        const groupIndex = i < 2 ? 0 : Math.floor((i - 2) / 7) + 1;

        if (!groupedHexes[groupIndex]) {
          groupedHexes[groupIndex] = [];
        }
        const disabled = [baseHex, selectedOutline].some(check => compareStrings(check || '', hex) === 0);
        groupedHexes[groupIndex].push(
          <TileButton
            key={hex}
            path="base"
            src={hex}
            disabledOverlay={disabled}
            onClick={() => {
              if (key === 'base') {
                setBaseHex(disabled ? undefined : hex);
              } else if (key === 'outline') {
                setOutline(disabled ? undefined : hex);
              }
            }}
          />,
        );
      });

      return [
        key,
        groupedHexes.map((group, i) => {
          const isOdd = group.length % 2 !== 0;
          const isPrevOdd = i > 0 ? groupedHexes[i - 1].length % 2 !== 0 : false;

          const shouldOverlap = isOdd !== isPrevOdd;

          return (
            <div key={i} className={joinStrings('flex gap-1', shouldOverlap && '-mt-6')}>
              {group}
            </div>
          );
        }),
      ];
    }),
  );

  const containers = [
    {
      title: 'Background',
      options: base,
    },
    {
      title: 'Outline',
      options: outline,
    },
  ] as const;

  const Header: FC<{ title: string }> = ({ title }) => (
    <h2 className="relative flex flex-row justify-center items-center gap-2 text-center border-b-2 pb-1">
      {title}
      <span className="group text-white hover:text-tertiary-400">
        <i className="fa fa-question-circle-o" />
        <div className="container-primary !p-1 !text-white whitespace-pre text-left font-medium hidden absolute w-fit text-base bottom-0 translate-y-full left-1/2 -translate-x-1/2 z-10 group-hover:block">
          <span className="text-lg underline">{'How to have transparent tiles\n'}</span>
          1. Select <span className="text-tertiary-600">{containers[1].title}</span>
          {'\n'}
          2. Deselect <span className="text-tertiary-600">{containers[0].title}</span>
        </div>
      </span>
    </h2>
  );

  return (
    <div className="flex flex-row gap-2 justify-center items-start text-center">
      {containers.map(({ title, options }) => (
        <div key={title} className="container-primary flex flex-col gap-2 items-center h-full">
          <Header title={title} />
          <div className="inset-secondary flex flex-col flex-wrap items-center gap-2 grow justify-center">
            {options}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BackgroundHexSelector;
