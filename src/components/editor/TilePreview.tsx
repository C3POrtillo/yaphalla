import type { TileDivData } from '@/components/editor/types';
import type { FC } from 'react';

import HexImage from '@/components/editor/HexImage';
import Logo from '@/components/editor/Logo';
import { TileLayout } from '@/components/editor/types';
import { joinStrings } from '@/utils/utils';

interface TilePreviewProps {
  tileData: (-1 | 0 | 1)[];
}

const TilePreview: FC<TilePreviewProps> = ({ tileData }) => {
  const formattedTileData = () => {
    const result: TileDivData[] = [];
    let index = 0;

    while (index < tileData.length) {
      for (const { length, preview } of TileLayout) {
        if (index >= tileData.length) {
          break;
        }

        const tileSlice = tileData.slice(index, index + length);
        const rowData = tileSlice.map((tile, i) => ({ state: tile, index: index + i }));
        result.push({ offset: preview, tiles: rowData });

        index += length;
      }
    }

    return result;
  };

  const formattedTiles = formattedTileData();

  const tileDivs = formattedTiles.map(({ tiles, offset }, i) => {
    const isFirst = i === 0;
    const isLast = i === formattedTiles.length - 1;

    return (
      <div key={i} className={joinStrings('flex min-h-12 flex-row', i && '-mt-3', offset)}>
        {isLast && (
          <>
            <HexImage src="Artifact-Hex" hideLabel path="artifact" disabled hideImage size="xs" />
            <Logo size="xs" />
          </>
        )}
        {tiles.map((tile, j) => {
          const { state } = tile;
          const getImage = () => {
            let src = 'Generic-Outline';
            if (state === 1) {
              src = 'Generic-Hex';
            }
            if (state === -1) {
              src = 'Enemy-Hex';
            }

            return src;
          };

          const src = getImage();

          return <HexImage key={j} src={src} path="base" size="xs" disabled />;
        })}
        {isFirst && (
          <>
            <Logo isCat size="xs" />
            <HexImage src="Artifact-Hex" hideLabel path="artifact" disabled hideImage size="xs" />
          </>
        )}
      </div>
    );
  });

  return (
    <div className="inset-primary size-full flex items-center justify-center m-auto">
      <div className="relative flex flex-col">{tileDivs}</div>
    </div>
  );
};

export default TilePreview;
