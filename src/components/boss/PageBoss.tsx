'use client';
import type { ClientBossProps } from '@/components/boss/ClientBoss';
import type { FC } from 'react';

import { useBoss } from '@/components/boss/BossProvider';
import CardDeckBossGuide from '@/components/boss/CardDeckBossGuide';
import Container from '@/components/container/Container';
import CardHero from '@/components/hero/CardHero';
import HeroSkills from '@/components/hero/HeroSkills';
import Button from '@/components/inputs/button/Button';
import { GuideSet } from '@/utils/types';

const PageBoss: FC<Omit<ClientBossProps, 'guides'>> = ({ hero, Info, Skills }) => {
  const { tab, setTab, guides } = useBoss();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasGuides = GuideSet.has(hero as any) || !!Object.entries(guides).length;
  const { DisplayName, Description, UnitRace, UnitJob, DamageType } = Info;
  const tabProps = [
    {
      label: 'Skills',
    },
    {
      label: 'Guides',
    },
  ] as const;

  return (
    <>
      <Container className="flex-col items-center align-center mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
        <CardHero
          hero={hero}
          name={DisplayName}
          description={Description}
          faction={UnitRace}
          heroClass={UnitJob}
          damage={DamageType}
        >
          {hasGuides && (
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
          )}
        </CardHero>
      </Container>
      <Container className="mt-4 px-2 lg:px-12 4xl:!px-0 4xl:max-w-2/3">
        {tab === 0 && <HeroSkills hero={hero} skills={Skills} isNPC />}
        {tab === 1 && <CardDeckBossGuide />}
      </Container>
    </>
  );
};

export default PageBoss;
