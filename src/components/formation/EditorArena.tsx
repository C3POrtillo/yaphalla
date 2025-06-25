import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';

import type { TileData } from '@/components/formation/types';
import type { Talents } from '@/utils/types';
import type { DragEvent, FC } from 'react';

import ButtonArtifact from '@/components/formation/ButtonArtifact';
import EditorClearButtons from '@/components/formation/EditorClearButtons';
import EditorToggles from '@/components/formation/EditorToggles';
import { useFormation } from '@/components/formation/FormationProvider';
import { AlwaysShowStates, ObstacleStates, TileIndexToPosition } from '@/components/formation/types';
import { getIsTopRight, getRelativeTileLabels, getTalentTiles, processTileData } from '@/components/formation/utils';
import ButtonTile from '@/components/hex-tiles/ButtonTile';
// import Text from '@/components/inputs/text/Text';
import { compareStrings, joinStrings } from '@/utils/utils';

interface EditorArena {
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
  disableObstacles?: boolean;
  onClick: (tile: TileData) => void;
}

const EditorArena: FC<EditorArena> = ({
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
  disableObstacles,
  onClick,
}) => {
  const {
    preset,
    isPreset,
    tileData,
    currentTile,
    units,
    playerFaction,
    enemyFaction,
    getTileImage,
    outline,
    hideLogo,
    logo,
    background,
    baseHex,
  } = useFormation();
  const [firstPlayerRow, setFirstPlayerRow] = useState<number>();
  const [lastPlayerRow, setLastPlayerRow] = useState<number>();
  const isTopRight = getIsTopRight(tileData);

  const relativeTileLabel = getRelativeTileLabels(tileData);
  const getArtifactProps = () => ({
    hideNumbers,
    hideArtifacts,
    disableArtifacts,
    hideEmptyArtifact,
  });

  const getTalents = (key: 'player' | 'enemy', faction: Talents | undefined, type: number) =>
    !hideTalents && !!faction && getTalentTiles(relativeTileLabel[key], faction, type);
  const playerTalents = getTalents('player', playerFaction, isTopRight ? -1 : 1);
  const enemyTalents = getTalents('enemy', enemyFaction, isTopRight ? 1 : -1);

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
      ? relativeIndex < tiles.findIndex(a => AlwaysShowStates.has(a.state))
      : relativeIndex > tiles.findLastIndex(a => AlwaysShowStates.has(a.state));

    const showFirstHex =
      tiles.every(a => a.state === 0 || a.state === -1 || ObstacleStates.has(state)) &&
      (isTopRight ? relativeIndex === tiles.length - 1 : relativeIndex === 0);

    const omit = (state !== 1 && tiles.some(a => a.state === 1) && omitDirection) || tiles.every(a => a.state !== 1);

    return hideEnemy && hideEmpty && omit && !showFirstHex;
  };

  const shouldHideRow = (i: number) => {
    const beforeFirst = firstPlayerRow !== undefined && i < firstPlayerRow;
    const afterLast = lastPlayerRow !== undefined && i > lastPlayerRow;

    return hideEmpty && hideEnemy && (beforeFirst || afterLast);
  };

  const getDisabledProps = (state: number) => {
    const disableGrid = (state === 0 && hideEmpty) || (hideEmpty && hideEnemy && !AlwaysShowStates.has(state));
    const disableEnemy = state === -1 && hideEnemy;
    const disableObstacle = disableObstacles && ObstacleStates.has(state);
    const disabled = disableObstacle || disableGrid || disableEnemy || (state === 0 && disableEmpty);

    return { disableGrid, disableEnemy, disabled };
  };

  const { setUnits } = useFormation();

  const handleDragOver = useCallback((e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle dragging a hero from within the arena
  const handleInternalDragStart = useCallback(
    (e: DragEvent<HTMLButtonElement>, tile: TileData) => {
      const { index } = tile;
      const unit = units[index]?.unit;

      if (unit) {
        // Store the source tile index and unit info for the drop handler
        e.dataTransfer.setData(
          'application/arena-hero',
          JSON.stringify({
            sourceIndex: index,
            hero: unit,
            type: units[index].type,
          }),
        );
        e.dataTransfer.effectAllowed = 'move';
      }
    },
    [units],
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLButtonElement>, tile: TileData) => {
      e.preventDefault();

      try {
        // Check if this is an internal arena move (hero from one tile to another)
        const internalData = e.dataTransfer.getData('application/arena-hero');

        if (internalData) {
          // Handle internal move (from one tile to another)
          const { sourceIndex, hero, type } = JSON.parse(internalData);

          // Don't do anything if dropped on the same tile it came from
          if (sourceIndex === tile.index) {
            return;
          }

          setUnits(prev => {
            const newUnits = { ...prev };

            // Check if destination tile already has a hero
            if (newUnits[tile.index]) {
              // If destination has a hero, implement a swap
              // Store the hero that's currently in the destination tile
              const destHero = newUnits[tile.index];

              // Move destination hero to source tile
              newUnits[sourceIndex] = destHero;

              // Move source hero to destination tile
              newUnits[tile.index] = { unit: hero, type: tile.state };
            } else {
              // If destination is empty, simply move the hero
              // Remove hero from source tile
              delete newUnits[sourceIndex];

              // Place at destination tile
              newUnits[tile.index] = { unit: hero, type: tile.state };
            }

            return newUnits;
          });

          return;
        }

        // Handle external drop (hero from grid to tile)
        const externalData = e.dataTransfer.getData('application/hero');
        if (!externalData) {
          return;
        }

        const { hero, sameUnit } = JSON.parse(externalData);

        // Instead of calling onClick to select the tile first,
        // directly place the unit on the tile where it was dropped
        setUnits(prev => {
          const newUnits = { ...prev };
          // If the same unit is dropped, remove it
          if (sameUnit) {
            delete newUnits[tile.index];
          } else {
            // Otherwise add the unit to the target tile
            // Use the tile's state property which contains the tile type
            newUnits[tile.index] = { unit: hero, type: tile.state };
          }

          return newUnits;
        });
      } catch (error) {
        console.error('Error handling drop:', error);
      }
    },
    [setUnits],
  );

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
        {isLast && <ButtonArtifact index={0} label="A1" logo={isTopRight ? 'dog' : logo} {...getArtifactProps()} />}
        {tiles.map((tile, relativeIndex) => {
          const { state, index } = tile;
          const omitHex = shouldOmitHex(state, relativeIndex, tiles);
          if (omitHex) {
            return null;
          }

          const talents = state === 1 ? playerTalents : enemyTalents;
          const unit = units[index]?.unit;
          const tileLabel = getTileLabel(state, index);
          const showUnit = !hideUnits && !!unit;
          const { disableGrid, disableEnemy, disabled } = getDisabledProps(state);
          const { src, path } = getTileImage(unit, state, !!talents, hideUnits, hideEnemy);
          const talentOutline = talents && (!baseHex || state === -1) && background && 'Grid-Outline';
          const forceOutline = !unit && ((state === 1 && outline) || talentOutline);
          const hideNonPlayerLabel = disableGrid || (!disableEnemy && !!unit);

          return (
            <ButtonTile
              key={index}
              src={src}
              ariaLabel={unit ? unit : `Tile ${tileLabel}`}
              selected={!label && currentTile === index}
              label={tileLabel}
              hideLabel={(!hideUnits && hideNonPlayerLabel) || hideNumbers}
              hideImage={disableGrid || (state === 100 && hideLogo)}
              isEnemy={state === -1 && showUnit && !hideEnemy}
              isSwap={state === 2 && showUnit}
              isTalent={talents && talents.has(TileIndexToPosition[index])}
              disabled={disabled || (!hideUnits && state === 100)}
              path={path}
              forceOutline={forceOutline}
              onClick={() => {
                onClick(tile);
              }}
              // Make tiles with units draggable
              draggable={!disabled && showUnit}
              onDragStart={showUnit ? e => handleInternalDragStart(e, tile) : undefined}
              onDragOver={handleDragOver}
              onDrop={(e: DragEvent<HTMLButtonElement>) => handleDrop(e, tile)}
            />
          );
        })}
        {isFirst && (
          <ButtonArtifact index={1} label="A2" logo={(isTopRight && logo) || 'cat'} {...getArtifactProps()} isReverse />
        )}
      </div>
    );
  });

  return (
    <div className="container-primary flex size-full md:w-156 flex-col items-center gap-2">
      {/* {label ? (
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
      )} */}
      <EditorToggles />
      <div className="inset-secondary p-2 rounded-lg size-full flex items-center justify-center m-auto">
        <div className="inset-primary">
          <div id={id} className="relative flex flex-col">
            {tileDivs}
            {['dog', 'cat'].every(check => logo && compareStrings(logo, check)) && (
              <span className="inline-flex w-full text-sm text-outline items-center justify-end whitespace-pre pt-1 pr-2">
                {'Powered by '}
                <div className="relative logo h-6">
                  <Image src="/assets/images/yaphalla-logo.png" alt="Yaphalla" fill priority />
                </div>
              </span>
            )}
          </div>
        </div>
      </div>
      <EditorClearButtons isRow />
    </div>
  );
};

export default EditorArena;
