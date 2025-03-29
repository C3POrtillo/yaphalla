import { useState } from 'react';

import type { FC } from 'react';

import { exclusionClasses } from '@/components/export-image/types';
import ButtonTile from '@/components/hex-tiles/ButtonTile';
import Text from '@/components/inputs/text/Text';
import Toggle from '@/components/inputs/toggle/Toggle';
import { usePriority } from '@/components/priority/PriorityProvider';
import { maxItems } from '@/components/priority/types';
import { getId, getValidCount, validateCount } from '@/components/priority/utils';
import { compareStrings, joinStrings } from '@/utils/utils';

interface EditorGroupProps {
  group: number;
  offsetRow?: boolean;
  hideEmpty?: boolean;
}

const EditorGroup: FC<EditorGroupProps> = ({ group, offsetRow, hideEmpty }) => {
  const { units, currentTile, getTileImage, updateUnit: onGroupUpdate } = usePriority();
  const [count, setCount] = useState('10');
  const [offset, setOffset] = useState(true);
  const isOffset = !offsetRow && offset;
  const validCount = getValidCount(count, maxItems);
  const equal = Math.floor(validCount / 2);
  const col1 = equal + (validCount % 2);
  const col2 = equal;
  const columns = [new Array(col1).fill(0), new Array(col2).fill(0)] as number[][];

  return (
    <div className="relative flex flex-col gap-4 items-center">
      <div className={joinStrings('container-secondary flex flex-col gap-1 !p-1', exclusionClasses[0])}>
        <Text
          label={joinStrings('Units', maxItems && `(Max: ${maxItems})`)}
          value={count}
          setState={setCount}
          type="number"
          min={1}
          max={maxItems || 1000}
          validate={value => validateCount(value, maxItems)}
        />
        <Toggle
          value={`offset-${group}`}
          activeLabel="Offset Col 2"
          hierarchy="secondary"
          onChange={e => {
            setOffset(e.target.checked);
          }}
          disabled={offsetRow}
          defaultChecked={offset}
        />
      </div>
      <div className={joinStrings('flex flex-row', isOffset && 'gap-2')}>
        {columns.map((item, base) => (
          <div
            key={base}
            className={joinStrings('flex flex-col', isOffset ? 'gap-4' : 'gap-1', isOffset && base === 1 && 'pt-13')}
          >
            {item.map((_, i) => {
              const index = base + i * 2;
              const thisTile = getId(group, index);
              const { src, path } = getTileImage(units[thisTile]);
              const isEmpty = !compareStrings(src, 'Generic-Outline');
              const offsetRowBase = offsetRow && group === 0 && base === 0 && i % 2 === 1 && 'pl-10';
              const offsetRowNegativeY = offsetRow && i !== 0 && '-mt-6';
              const offsetRowNegativeX =
                offsetRow && i % 2 === 0 && (group !== 0 || (group === 0 && base === 1)) && '-ml-10';

              return (
                <div key={index} className={joinStrings('flex', offsetRowBase, offsetRowNegativeY, offsetRowNegativeX)}>
                  <ButtonTile
                    src={src}
                    path={path}
                    selected={!!currentTile && !compareStrings(thisTile, currentTile)}
                    hideImage={hideEmpty && isEmpty}
                    onClick={() => onGroupUpdate(thisTile)}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorGroup;
