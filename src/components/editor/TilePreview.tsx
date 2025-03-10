import { Suspense, useMemo } from 'react';


import type { TileDivData } from '@/components/editor/types';
import type { FC } from 'react';

import HexImage from '@/components/editor/HexImage';
import Logo from '@/components/editor/Logo';
import { TileLayout } from '@/components/editor/types';
import { getSizeClass } from '@/components/editor/utils';
import { joinStrings } from '@/utils/utils';

interface TilePreviewProps {
  tileData: (-1 | 0 | 1)[];
}

const TilePreview: FC<TilePreviewProps> = ({ tileData }) => {
  const size = '2xs' as const;

  const formattedTiles = useMemo(() => {
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
  }, [tileData]);

  const tileDivs = formattedTiles.map(({ tiles, offset }, i) => {
    const isFirst = i === 0;
    const isLast = i === formattedTiles.length - 1;

    return (
      <div key={i} className={joinStrings('flex flex-row', i && '-mt-2', offset)}>
        {isLast && (
          <>
            <HexImage src="Artifact-Hex" hideLabel path="artifact" disabled hideImage size={size} />
            <Suspense fallback={<div className={joinStrings('hex-icon relative', getSizeClass(size))} />}>
              <Logo size={size} />
            </Suspense>
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

          return <HexImage key={j} src={src} path="base" size={size} disabled />;
        })}
        {isFirst && (
          <>
            <Suspense fallback={<div className={joinStrings('hex-icon relative', getSizeClass(size))} />}>
              <Logo isCat size={size} />
            </Suspense>
            <HexImage src="Artifact-Hex" hideLabel path="artifact" disabled hideImage size={size} />
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
