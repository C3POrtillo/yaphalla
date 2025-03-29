'use client';
import { useState } from 'react';

import type { ChangeEvent, FC } from 'react';

import Container from '@/components/container/Container';
import Button from '@/components/inputs/button/Button';
import Toggle from '@/components/inputs/toggle/Toggle';
import Link from '@/components/link/Link';
import EditorGroup from '@/components/priority/EditorGroup';
import { usePriority } from '@/components/priority/PriorityProvider';
import SelectUnit from '@/components/priority/SelectUnit';
import { getGap, getValidCount } from '@/components/priority/utils';
import { joinStrings } from '@/utils/utils';

const PriorityEditor: FC = () => {
  const { groups } = usePriority();
  const [gap, setGap] = useState(0);
  const [offset, setOffset] = useState(false);
  const [hideEmpty, setHideEmpty] = useState(false);

  const sizes = ['None', 'Small', 'Medium', 'Large'].map((size, i) => (
    <Button key={size} selected={gap === i} onClick={() => setGap(i)} size="sm" disabled={offset} hasActiveBorder>
      {size}
    </Button>
  ));

  const toggles = (
    [
      {
        value: 'hide-empty',
        variant: 'switch',
        activeLabel: 'Hide Grid',
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setHideEmpty(e.target.checked);
        },
        defaultChecked: hideEmpty,
      },
      {
        value: 'row-offset',
        activeLabel: 'Offset Row',
        hierarchy: 'warning',
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setOffset(e.target.checked);
        },
        defaultChecked: offset,
      },
    ] as const
  ).map(({ value, ...props }) => <Toggle key={value} value={value} {...props} />);

  return (
    <>
      <Container className="my-2 xl:hidden">
        <div className="flex flex-col bg-primary-950/80 gap-4 rounded-lg p-4 justify-center items-center">
          <h1>Device too small!</h1>
          <Link href="/" label="Return Home" className="size-base input-secondary" />
        </div>
      </Container>
      <Container className="hidden my-2 xl:flex">
        <div className="flex flex-row gap-2 w-full max-w-[1920px] px-2">
          <div className="container-primary flex flex-col w-full grow gap-2">
            <div className="flex flex-row gap-2 items-center">
              <span>Gap: </span>
              {sizes}
              <span>|</span>
              {toggles}
            </div>
            <div className="inset-black flex justify-center size-full !p-4">
              <div
                id="unit-grid"
                className={joinStrings('flex flex-row justify-center size-min', !offset && getGap(gap))}
              >
                {new Array(getValidCount(groups)).fill(0).map((_, i) => (
                  <EditorGroup key={i} group={i} offsetRow={offset} hideEmpty={hideEmpty} />
                ))}
              </div>
            </div>
          </div>
          <SelectUnit />
        </div>
      </Container>
    </>
  );
};

export default PriorityEditor;
