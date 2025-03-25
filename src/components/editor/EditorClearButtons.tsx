import type { FC } from 'react';

import { useFormation } from '@/components/editor/FormationProvider';
import { ArenaPresets } from '@/components/editor/types';
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
      onClick: () => {
        setTileData(prev => prev.map(prevTile => (Math.abs(prevTile) === 1 ? -prevTile : prevTile)) as number[]);
      },
    },
    {
      label: 'Clear Units',
      hierarchy: 'warning',
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
    <div className={joinStrings('container-primary w-full flex gap-2 items-center', isRow ? 'flex-row' : 'flex-col')}>
      {buttons.map(({ onClick, label, ...props }) => (
        <Button key={label} size="sm" className="w-full" onClick={onClick} {...props}>
          {label}
        </Button>
      ))}
    </div>
  );
};

export default EditorClearButtons;
