import { Icon } from '@iconify/react';

import type { FC } from 'react';

import { useFormation } from '@/components/formation/FormationProvider';
import { ArenaPresets } from '@/components/formation/types';
import Button from '@/components/inputs/button/Button';
import { ArtifactSet } from '@/utils/types';
import { joinStrings } from '@/utils/utils';

interface EditorClearButtonsProps {
  isRow?: boolean;
}

const EditorClearButtons: FC<EditorClearButtonsProps> = ({ isRow }) => {
  const { setTileData, setEditArena, setUnits, setDrawType, setPreset } = useFormation();

  const buttons = [
    {
      label: 'Invert Tiles',
      hierarchy: 'primary',
      icon: 'garden:arrow-retweet-stroke-12',
      onClick: () => {
        setTileData(prev => prev.map(prevTile => (Math.abs(prevTile) === 1 ? -prevTile : prevTile)) as number[]);
      },
    },
    {
      label: 'Clear Units',
      hierarchy: 'warning',
      icon: 'tabler:user-x',
      onClick: () => {
        setEditArena(false);
        setUnits(prevUnits =>
          Object.fromEntries(Object.entries(prevUnits).filter(([_, data]) => ArtifactSet.has(data.unit))),
        );
      },
    },
    {
      label: 'Clear All',
      hierarchy: 'warning',
      icon: 'tabler:trash',
      onClick: () => {
        setDrawType(1);
        setEditArena(true);
        setPreset('Custom');
        setTileData(ArenaPresets['Custom'] as number[]);
        setUnits({});
      },
    },
  ] as const;

  return (
    <div className={joinStrings('w-full flex gap-2 items-center', isRow ? 'flex-row' : 'flex-col')}>
      {buttons.map(({ onClick, label, icon, ...props }) => (
        <Button
          key={label}
          size="sm"
          className="inline-flex w-full gap-1 justify-center items-center"
          onClick={onClick}
          {...props}
        >
          <Icon icon={icon} className="size-6" />
          {label}
        </Button>
      ))}
    </div>
  );
};

export default EditorClearButtons;
