'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';


import type { ChangeEvent, FC } from 'react';

import Button from '@/components/inputs/button/Button';
import Toggle from '@/components/inputs/toggle/Toggle';
import EditorGroup from '@/components/priority/EditorGroup';
import { usePriority } from '@/components/priority/PriorityProvider';
import { maxGroups } from '@/components/priority/types';
import { getGap, getValidCount } from '@/components/priority/utils';
import { isDevMode, joinStrings } from '@/utils/utils';

const EditorMain: FC = () => {
  const searchParams = useSearchParams();
  const isDev = isDevMode(searchParams);
  const [gap, setGap] = useState(0);
  const [offset, setOffset] = useState(false);
  const [hideEmpty, setHideEmpty] = useState(false);

  const { groups } = usePriority();
  const sizes = ['None', 'Small', 'Medium', 'Large'].map((size, i) => (
    <Button key={size} selected={gap === i} onClick={() => setGap(i)} size="sm" disabled={offset} hasActiveBorder>
      {size}
    </Button>
  ));

  const toggles = [
    {
      value: 'hide-empty',
      variant: 'switch',
      activeLabel: 'Hide Empty',
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setHideEmpty(e.target.checked);
      },
      defaultChecked: hideEmpty,
    } as const,
    isDev &&
      ({
        value: 'row-offset',
        activeLabel: 'Offset Row',
        hierarchy: 'warning',
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setOffset(e.target.checked);
        },
        defaultChecked: offset,
      } as const),
  ]
    .filter(item => !!item)
    .map(({ value, ...props }) => <Toggle key={value} value={value} {...props} />);

  return (
    <div className="flex flex-col grow gap-2">
      <div className="h-44" />
      <div className="container-primary flex flex-col w-full grow gap-2">
        <div className="flex flex-row gap-2 items-center">
          <span>Group Gap: </span>
          {sizes}
          <span>|</span>
          {toggles}
        </div>
        <div className="inset-black flex justify-center size-full !p-4">
          <div id="unit-grid" className={joinStrings('flex flex-row justify-center size-min', !offset && getGap(gap))}>
            {new Array(getValidCount(groups, maxGroups)).fill(0).map((_, i) => (
              <EditorGroup key={i} group={i} offsetRow={offset} hideEmpty={hideEmpty} isDev={isDev} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditorMain;
