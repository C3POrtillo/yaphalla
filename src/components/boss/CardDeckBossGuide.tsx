'use client';
import { capitalize } from 'lodash';

import type { FC } from 'react';

import { useBoss } from '@/components/boss/BossProvider';
import CardGuide from '@/components/boss/CardGuide';
import Button from '@/components/inputs/button/Button';
import { SeasonNames } from '@/utils/hero-data/types';
import { compareStrings } from '@/utils/utils';

const CardDeckBossGuide: FC = () => {
  const { season, setSeason, guides } = useBoss();

  const seasonButtons = Object.keys(guides).map(label => (
    <Button
      key={label}
      size="sm"
      onClick={() => setSeason(label)}
      selected={!compareStrings(label, season)}
      hasActiveBorder
    >
      <div className="flex flex-col">
        <span className="text-xs border-b-1 border-tertiary-600 pb-1">{label}</span>
        <span>{SeasonNames[label as keyof typeof SeasonNames]}</span>
      </div>
    </Button>
  ));

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center">
      <div className="container-primary flex flex-row flex-wrap gap-2 items-center justify-center">{seasonButtons}</div>
      <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
        {guides[season]?.map(src => {
          const [, , , difficulty, filename] = src.split('/');
          const week = filename.match(/(week-\d+)/)?.[0].replace('-', ' ');
          const faction = filename.match(/aurora|dauntless|immortal|sylvan/)?.[0];
          const label = capitalize(week || faction);

          return <CardGuide key={src} src={src} label={label} difficulty={difficulty} />;
        })}
      </div>
    </div>
  );
};

export default CardDeckBossGuide;
