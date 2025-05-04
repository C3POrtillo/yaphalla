'use client';
import { useState } from 'react';

import type { FC } from 'react';

import ParserSkill from '@/components/hero/ParserSkill';
import { type HeroSkill, Label, SkillMap } from '@/components/hero/types';
import { getBaseUnlock, getLevelUnlock } from '@/components/hero/utils';
import Toggle from '@/components/inputs/toggle/Toggle';

interface CardSkillProps extends HeroSkill {
  hero: string;
}

const CardSkill: FC<CardSkillProps> = ({
  hero,
  DisplayName,
  DisplaySlot,
  UnlockLevel,
  SimpleDescription,
  Levels,
  CD,
  InitCD,
  ...props
}) => {
  const [isFull, setFull] = useState<boolean>(true);
  // console.log(JSON.stringify(props, undefined, 2));
  const hasLabel = Label.has(DisplaySlot);
  const { baseUnlock, classUnlock } = getBaseUnlock(DisplaySlot, UnlockLevel || 1);

  return (
    <div className="container-primary flex flex-col size-full">
      <span className="text-xs lg:text-sm">
        {hasLabel && <span className="text-tertiary-600">{SkillMap[DisplaySlot - 1]}</span>}
        {hasLabel && ' - '}
        <span className="text-neutral-400 text-xs lg:text-sm">
          Unlocks at <span className={classUnlock}>{baseUnlock}</span>
        </span>
      </span>

      <div className="flex flex-row items-end justify-between pb-1 border-b-2 border-tertiary-600">
        <h3>{DisplayName}</h3>
        <Toggle
          value={`${hero}-${DisplayName}`}
          variant="switch"
          disableLabel="Lite"
          activeLabel="Full"
          hierarchy="tertiary"
          defaultChecked={isFull}
          onChange={e => {
            setFull(e.target.checked);
          }}
        />
      </div>
      {(!!CD || !!InitCD) && (
        <div className="flex flex-row gap-1 border-b-2 border-primary-750 mt-1 pb-0.5 justify-between text-sm">
          {!!CD && (
            <span>
              <span className="text-neutral-400">Cooldown:</span> {CD}s
            </span>
          )}
          {
            <span>
              {!!InitCD && (
                <>
                  <span className="text-neutral-400">Initial Cooldown:</span>
                  {` ${InitCD}s`}
                </>
              )}
            </span>
          }
        </div>
      )}
      <div>
        {isFull ? (
          <ParserSkill hero={hero} hasLine {...props} />
        ) : (
          <p className="text-base lg:text-lg">{SimpleDescription}</p>
        )}
      </div>
      {isFull && Levels && (
        <div className="grow">
          {Levels?.map(({ DisplayLevel, UnlockLevel: unlock, ...level }, i) => {
            const prefix = getLevelUnlock(DisplaySlot, DisplayLevel!, unlock);
            const prefixSpan = <span className="text-neutral-400 text-xs">{`${prefix}\n`}</span>;

            return (
              <ParserSkill
                key={DisplayLevel}
                hero={hero}
                {...level}
                prefix={prefixSpan}
                hasLine={i < Levels.length - 1}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CardSkill;
