'use client';
import { useState } from 'react';

import type { HeroSkill } from '@/utils/hero-data/types';
import type { FC } from 'react';

import Toggle from '@/components/inputs/toggle/Toggle';
import ParserSkill from '@/components/unit-data/ParserSkill';
import { getBaseUnlock, getLevelUnlock } from '@/components/unit-data/utils';
import { Label, SkillMap } from '@/utils/hero-data/types';

interface CardSkillProps extends HeroSkill {
  hero: string;
  isNPC?: boolean;
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
  isNPC,
  ...props
}) => {
  const [isFull, setFull] = useState<boolean>(true);
  const hasLabel = !isNPC && Label.has(DisplaySlot);
  const slot = isNPC ? undefined : DisplaySlot;
  const { baseUnlock, classUnlock } = getBaseUnlock(DisplaySlot, UnlockLevel || 1);
  const heroLabel = hasLabel && <span className="text-tertiary-600">{SkillMap[DisplaySlot - 1]}</span>;
  const bossLabel = isNPC && (
    <span className="text-tertiary-600">{DisplaySlot === 1 ? 'Ultimate' : `Skill ${DisplaySlot}`}</span>
  );

  return (
    <div className="container-primary flex flex-col size-full">
      <span className="text-xs lg:text-sm">
        {heroLabel || bossLabel}
        {hasLabel && ' - '}
        {!isNPC && (
          <span className="text-neutral-400 text-xs lg:text-sm">
            Unlocks at <span className={classUnlock}>{baseUnlock}</span>
          </span>
        )}
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
          <ParserSkill hero={hero} hasLine={!!Levels?.length} {...props} DisplaySlot={slot} />
        ) : (
          <p className="flex flex-col my-1 input-secondary size-sm !cursor-auto !text-white text-base lg:text-lg">
            {SimpleDescription}
          </p>
        )}
      </div>
      {isFull && Levels && (
        <div className="grow">
          {Levels?.map(({ DisplayLevel, UnlockLevel: unlock, ...level }, i) => {
            const prefix = getLevelUnlock(DisplaySlot, DisplayLevel!, unlock, isNPC);
            const prefixSpan = <span className="text-neutral-400 text-xs">{`${prefix}\n`}</span>;

            return (
              <ParserSkill
                key={DisplayLevel}
                hero={hero}
                {...level}
                prefix={prefixSpan}
                hasLine={i < Levels.length - 1}
                DisplaySlot={slot}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CardSkill;
