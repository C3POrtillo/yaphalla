import { type FC, type PropsWithChildren, useEffect, useState } from 'react';

import type { TileData, TileDivData } from '@/components/editor/types';

import { useFormation } from '@/components/editor/FormationProvider';
import HexImage from '@/components/editor/HexImage';
import Logo from '@/components/editor/Logo';
import { TileLayout, indexToPosition } from '@/components/editor/types';
import { getIsTopRight, getRelativeTileLabels } from '@/components/editor/utils';
import Text from '@/components/inputs/text/Text';
import { joinStrings } from '@/utils/utils';

interface TileGridProps extends PropsWithChildren {
  id?: string;
  label?: string;
  hideEnemy?: boolean;
  hideEmpty?: boolean;
  hideNumbers?: boolean;
  disableEmpty?: boolean;
  hideArtifacts?: boolean;
  hideUnits?: boolean;
  disableArtifacts?: boolean;
  hideEmptyArtifact?: boolean;
  onClick?: (tile: TileData) => void;
}

const TileGrid: FC<TileGridProps> = ({
  id,
  label,
  hideEnemy,
  hideEmpty,
  hideNumbers,
  hideArtifacts,
  disableEmpty,
  disableArtifacts,
  hideUnits,
  hideEmptyArtifact,
  onClick,
  children,
}) => {
  const {
    preset,
    isPreset,
    tileData,
    title,
    setTitle,
    currentTile,
    currentArtifact,
    setCurrentArtifact,
    artifactData,
    setArtifactData,
    units,
  } = useFormation();
  const [firstPlayerRow, setFirstPlayerRow] = useState<number>();
  const [lastPlayerRow, setLastPlayerRow] = useState<number>();
  const [formattedTiles, setFormattedTiles] = useState<TileDivData[]>([]);
  const playerArtifact = !!artifactData.player.length && artifactData.player[0];
  const enemyArtifact = !!artifactData.enemy.length && artifactData.enemy[0];
  const isTopRight = getIsTopRight(tileData);

  const formattedTileData = () => {
    setFirstPlayerRow(undefined);
    setLastPlayerRow(undefined);

    const result: TileDivData[] = [];
    let index = 0;
    let firstRow: number | undefined = undefined;
    let lastRow: number | undefined = undefined;
    let rowIndex = 0;

    while (index < tileData.length) {
      for (const { length, offset, reverse } of TileLayout) {
        if (index >= tileData.length) {
          break;
        }

        const tileSlice = tileData.slice(index, index + length);
        const hasPlayer = tileSlice.includes(1);
        const rowData = tileSlice.map((tile, i) => ({ state: tile, index: index + i }));
        result.push({ offset, tiles: rowData, reverse });

        if (hasPlayer) {
          if (firstRow === undefined) {
            firstRow = rowIndex;
          }
          lastRow = rowIndex;
        }

        index += length;
        rowIndex++;
      }
    }

    setFirstPlayerRow(firstRow);
    setLastPlayerRow(lastRow);

    return result;
  };

  useEffect(() => {
    setFormattedTiles(formattedTileData());
  }, [preset, isPreset, tileData]);

  const setArtifact = (position: number, artifact: string | boolean) => {
    setCurrentArtifact(currentArtifact === position ? undefined : position);
    if (currentArtifact === position) {
      const key = position ? 'enemy' : 'player';
      if (typeof artifact === 'string' && !!artifactData[key].length) {
        setArtifactData(prev => {
          const updated = { ...prev };
          const currentArtifacts = updated[key] || [];

          if (currentArtifacts.includes(artifact)) {
            const filteredArtifacts = currentArtifacts.filter(a => a !== artifact);
            delete updated[key];
            updated[key] = filteredArtifacts;
          }

          return updated;
        });
      }
    }
  };

  const relativeTileLabel = getRelativeTileLabels(tileData);
  const getRelativeLabel = (state: -1 | 0 | 1, tileLabel: number) => {
    if (state === 0) {
      return;
    }
    const relativePosition = relativeTileLabel[hideEnemy ? 'player' : 'all'].indexOf(tileLabel);

    return 1 + relativePosition;
  };

  const tileDivs = formattedTiles.map(({ tiles, offset, reverse }, i) => {
    const beforeFirst = firstPlayerRow !== undefined && i < firstPlayerRow;
    const afterLast = lastPlayerRow !== undefined && i > lastPlayerRow;
    const hideRow = hideEnemy && (beforeFirst || afterLast);
    if (hideRow) {
      return null;
    }
    const isFirst = i === 0;
    const isLast = i === formattedTiles.length - 1;
    const hideEmptyFirst = hideEmptyArtifact && !playerArtifact;
    const hideEmptyLast = hideEmptyArtifact && !enemyArtifact;
    const isDisabled = hideArtifacts || disableArtifacts || hideEmptyLast || hideEmptyFirst;
    const hideLabel = hideNumbers || hideArtifacts;
    const relativeFirstRow = hideEnemy && i === firstPlayerRow;

    return (
      <div
        key={i}
        className={joinStrings(
          'flex min-h-20 flex-row',
          i && !relativeFirstRow && '-mt-5',
          hideEnemy && hideEmpty && isTopRight ? reverse : offset,
        )}
      >
        {isLast && (
          <>
            <button onClick={() => setArtifact(0, playerArtifact)} disabled={isDisabled}>
              <HexImage
                src={playerArtifact || 'Artifact-Hex'}
                selected={currentArtifact === 0 && !hideArtifacts}
                label={playerArtifact ? '' : 'A1'}
                hideLabel={hideLabel || hideEmptyFirst}
                path="artifact"
                disabled={isDisabled}
                hideImage={hideArtifacts || hideEmptyFirst}
              />
            </button>
            <Logo />
          </>
        )}
        {tiles.map((tile, relativeIndex) => {
          const { state, index } = tile;
          const isSelected = !label && currentTile === index;
          const omitDirection = isTopRight
            ? relativeIndex < tiles.findIndex(a => a.state === 1)
            : relativeIndex > tiles.findLastIndex(a => a.state === 1);
          const omitHex =
            hideEnemy &&
            hideEmpty &&
            ((state !== 1 && tiles.some(a => a.state === 1) && omitDirection) || tiles.every(a => a.state !== 1));
          const disableGrid = (state === 0 && hideEmpty) || (hideEmpty && hideEnemy && state !== 1);
          const disableEnemy = state === -1 && hideEnemy;
          const disabled = disableGrid || disableEnemy || (state === 0 && disableEmpty);
          const unit = units[index]?.unit;
          const tileLabel = hideEmpty ? getRelativeLabel(state, indexToPosition[index]) : indexToPosition[index];

          const getImage = () => {
            const path = unit ? ('unit' as const) : ('base' as const);

            let src = 'Generic-Outline';
            if (state === 1) {
              src = (!hideUnits && unit) || 'Generic-Hex';
            }
            if (state === -1 && !disableEnemy) {
              src = (!hideUnits && unit) || 'Enemy-Hex';
            }

            return { src, path };
          };

          const { src, path } = getImage();

          return (
            !omitHex && (
              <button key={index} onClick={() => onClick && onClick(tile)} disabled={disabled}>
                <HexImage
                  src={src}
                  selected={isSelected}
                  label={tileLabel}
                  hideLabel={(!hideUnits && (disableGrid || (!disableEnemy && !!unit))) || hideNumbers}
                  hideImage={disableGrid}
                  isEnemy={!!unit && state === -1 && !disableEnemy}
                  disabled={disabled}
                  path={hideUnits || disableEnemy ? 'base' : path}
                />
              </button>
            )
          );
        })}
        {isFirst && (
          <>
            <Logo isCat />
            <button onClick={() => setArtifact(1, enemyArtifact)} disabled={isDisabled}>
              <HexImage
                src={enemyArtifact || 'Artifact-Hex'}
                selected={currentArtifact === 1 && !hideArtifacts}
                label={enemyArtifact ? '' : 'A2'}
                hideLabel={hideLabel || hideEmptyLast}
                path="artifact"
                disabled={isDisabled}
                hideImage={hideArtifacts || hideEmptyLast}
              />
            </button>
          </>
        )}
      </div>
    );
  });

  return (
    <div className="container-primary flex size-full md:w-156 flex-col items-center gap-2">
      {label ? (
        <h2 className="flex items-center text-2xl min-h-12">{label}</h2>
      ) : (
        <Text
          className="h-12"
          value={title}
          label={title}
          placeholder="Formation Title"
          hideLabel
          setState={setTitle}
        />
      )}
      <div className="inset-primary size-full flex items-center justify-center m-auto">
        <div id={id} className="relative flex flex-col">
          {tileDivs}
        </div>
      </div>
      {children}
    </div>
  );
};

export default TileGrid;
