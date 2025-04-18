import { useMemo } from 'react';

import type { FC } from 'react';

import { useFormation } from '@/components/formation/FormationProvider';
import { processTileData } from '@/components/formation/utils';
import HexImage from '@/components/hex-tiles/HexImage';
import Logo from '@/components/hex-tiles/Logo';
import { joinStrings } from '@/utils/utils';

interface TilePreviewProps {
  tileData: number[];
}

const TilePreview: FC<TilePreviewProps> = ({ tileData }) => {
  const { baseHex } = useFormation();
  const size = '2xs' as const;

  const formattedTiles = useMemo(() => processTileData(tileData, true), [tileData]);

  const tileDivs = formattedTiles.map(({ tiles, offset }, row) => {
    const isFirst = row === 0;
    const isLast = row === formattedTiles.length - 1;

    return (
      <div key={row} className={joinStrings('flex flex-row', row && '-mt-2', offset)}>
        {isLast && (
          <>
            <HexImage src="Artifact-Hex" hideLabel path="artifact" disabled hideImage size={size} />
            <Logo size={size} />
          </>
        )}
        {tiles.map((tile, j) => {
          const { state } = tile;
          const getImage = () => {
            let src = 'Grid-Outline';
            if (state === 1) {
              src = baseHex ? 'Generic-Hex' : 'Generic-Outline';
            }
            if (state === -1) {
              src = baseHex ? 'Enemy-Hex' : 'Enemy-Outline';
            }
            if (state === -2) {
              src = 'Breakable-Hex';
            }
            if (state === -3) {
              src = 'Unbreakable-Hex';
            }

            return src;
          };

          const src = getImage();

          return <HexImage key={j} src={src} path="base" size={size} disabled />;
        })}
        {isFirst && (
          <>
            <Logo logo="cat" size={size} />
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
