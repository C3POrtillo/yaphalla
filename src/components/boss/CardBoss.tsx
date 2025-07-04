'use client';
import { useState } from 'react';

import type { HeroInfo } from '@/components/hero/types';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import CardHero from '@/components/hero/CardHero';
import Button from '@/components/inputs/button/Button';

interface CardBossProps extends Partial<HeroInfo> {
  hero: string;
}

const CardBoss: FC<CardBossProps> = ({ hero, DisplayName, Description, UnitRace, UnitJob, DamageType }) => {
  const [tab, setTab] = useState<number>(0);

  const tabProps = [
    {
      label: 'Skills',
    },
    {
      label: 'Guides',
    },
  ] as const;

  return (
    <Container className="flex-col items-center align-center mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
      <CardHero
        hero={hero}
        name={DisplayName}
        description={Description}
        faction={UnitRace}
        heroClass={UnitJob}
        damage={DamageType}
      >
        <div className="flex gap-2">
          {tabProps.map(({ label, ...props }, i) => (
            <Button
              key={label}
              className="w-full"
              size="sm"
              onClick={() => setTab(i)}
              selected={tab === i}
              hasActiveBorder
              {...props}
            >
              {label}
            </Button>
          ))}
        </div>
      </CardHero>
    </Container>
  );
};

export default CardBoss;
