'use client';
import { capitalize } from 'lodash';

import type { FC } from 'react';

import { useBoss } from '@/components/boss/BossProvider';
import CardGuide from '@/components/boss/CardGuide';
import Button from '@/components/inputs/button/Button';
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
      {label}
    </Button>
  ));

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center">
      <div className="container-primary flex flex-row flex-wrap gap-2 items-center justify-center">{seasonButtons}</div>
      <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
        {guides[season].map(src => {
          const [, , , difficulty, filename] = src.split('/');
          const label = filename.match(/(week-\d+)/)![0] || filename.split("_")[0];
          const capitalizedLabel = capitalize(label.replace('-', ' '));

          return <CardGuide key={src} src={src} label={capitalizedLabel} difficulty={difficulty} />;
        })}
      </div>
    </div>
  );
};

export default CardDeckBossGuide;
