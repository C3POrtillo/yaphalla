import { useMemo, useState } from 'react';

import type { TileData } from '@/components/editor/types';
import type { FC, PropsWithChildren } from 'react';

import ArtifactButton from '@/components/editor/ArtifactButton';
import { useFormation } from '@/components/editor/FormationProvider';
import { AlwaysShowStates, TileIndexToPosition } from '@/components/editor/types';
import { getIsTopRight, getRelativeTileLabels, getTalentTiles, processTileData } from '@/components/editor/utils';
import TileButton from '@/components/hex-tiles/TileButton';
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
  hideTalents?: boolean;
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
  hideTalents,
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
    units,
    activeFaction,
    getTileImage,
    outline,
    hideLogo,
  } = useFormation();
  const [firstPlayerRow, setFirstPlayerRow] = useState<number>();
  const [lastPlayerRow, setLastPlayerRow] = useState<number>();
  const isTopRight = getIsTopRight(tileData);
  const showTalents = !hideTalents && activeFaction;
  const relativeTileLabel = getRelativeTileLabels(tileData);
  const getArtifactProps = () => ({
    hideNumbers,
    hideArtifacts,
    disableArtifacts,
    hideEmptyArtifact,
  });

  const getTileLabel = (state: number, index: number) => {
    const absolutePosition = TileIndexToPosition[index];
    if (hideEmpty) {
      if (state === 0) {
        return;
      }
      const relativePosition = relativeTileLabel[hideEnemy ? 'player' : 'all'].indexOf(absolutePosition);

      return 1 + relativePosition;
    }

    return absolutePosition;
  };

  const formattedTiles = useMemo(
    () => processTileData(tileData, false, setFirstPlayerRow, setLastPlayerRow),
    [preset, isPreset, tileData],
  );

  const shouldOmitHex = (state: number, relativeIndex: number, tiles: TileData[]) => {
    const omitDirection = isTopRight
      ? relativeIndex < tiles.findIndex(a => a.state === 1)
      : relativeIndex > tiles.findLastIndex(a => a.state === 1);

    const showFirstHex =
      tiles.every(a => a.state === 0 || a.state === -1) &&
      (isTopRight ? relativeIndex === tiles.length - 1 : relativeIndex === 0);

    return (
      hideEnemy &&
      hideEmpty &&
      ((state !== 1 && tiles.some(a => a.state === 1) && omitDirection) || tiles.every(a => a.state !== 1)) &&
      !showFirstHex
    );
  };

  const shouldHideRow = (i: number) => {
    const beforeFirst = firstPlayerRow !== undefined && i < firstPlayerRow;
    const afterLast = lastPlayerRow !== undefined && i > lastPlayerRow;

    return hideEmpty && hideEnemy && (beforeFirst || afterLast);
  };

  const getDisabledProps = (state: number) => {
    const disableGrid = (state === 0 && hideEmpty) || (hideEmpty && hideEnemy && !AlwaysShowStates.has(state));
    const disableEnemy = state === -1 && hideEnemy;
    const disabled = disableGrid || disableEnemy || (state === 0 && disableEmpty);

    return { disableGrid, disableEnemy, disabled };
  };

  const tileDivs = formattedTiles.map(({ tiles, offset, reverse }, row) => {
    if (shouldHideRow(row)) {
      return null;
    }
    const isFirst = row === 0;
    const isLast = row === formattedTiles.length - 1;
    const relativeFirstRow = hideEmpty && hideEnemy && row === firstPlayerRow;

    return (
      <div
        key={row}
        className={joinStrings(
          'flex flex-row',
          row && !relativeFirstRow && '-mt-5',
          hideEnemy && hideEmpty && isTopRight ? reverse : offset,
        )}
      >
        {isLast && <ArtifactButton index={0} label="A1" {...getArtifactProps()} />}
        {tiles.map((tile, relativeIndex) => {
          const { state, index } = tile;
          const omitHex = shouldOmitHex(state, relativeIndex, tiles);

          if (omitHex) {
            return null;
          }

          const unit = units[index]?.unit;
          const tileLabel = getTileLabel(state, index);
          const { disableGrid, disableEnemy, disabled } = getDisabledProps(state);
          const { src, path } = getTileImage(unit, state, showTalents, hideUnits, hideEnemy);

          return (
            <TileButton
              key={index}
              src={src}
              ariaLabel={unit ? unit : `Tile ${tileLabel}`}
              selected={!label && currentTile === index}
              label={tileLabel}
              hideLabel={(!hideUnits && (disableGrid || (!disableEnemy && !!unit))) || hideNumbers}
              hideImage={disableGrid || (state === 100 && hideLogo)}
              isEnemy={!!unit && state === -1 && !hideEnemy}
              isTalent={
                showTalents && getTalentTiles(relativeTileLabel.player, activeFaction).has(TileIndexToPosition[index])
              }
              disabled={disabled || (!hideUnits && state === 100)}
              path={state !== 2 && (hideUnits || disableEnemy) ? 'base' : path}
              forceOutline={state === 1 && !unit && outline}
              onClick={() => onClick && onClick(tile)}
            />
          );
        })}
        {isFirst && <ArtifactButton index={1} label="A2" {...getArtifactProps()} isReverse isCat />}
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
          label="Formation Title"
          placeholder="Formation Title"
          hideLabel
          setState={setTitle}
        />
      )}
      {children}
      <div className="inset p-2 rounded-lg bg-primary-900 size-full flex items-center justify-center m-auto">
        <div className="inset-black">
          <div id={id} className="relative flex flex-col">
            {tileDivs}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TileGrid;
