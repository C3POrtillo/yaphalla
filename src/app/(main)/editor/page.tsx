'use client';
import { useState } from 'react';

import type { UnitFormationData } from '@/components/formation/types';
import type { Dispatch, FC, SetStateAction } from 'react';

import Container from '@/components/container/Container';
import FormationEditor from '@/components/formation/FormationEditor';
import { FormationProvider } from '@/components/formation/FormationProvider';
import Button from '@/components/inputs/button/Button';

const maxTeams = 5;

const Index: FC = () => {
  const [teamIndex, setTeamIndex] = useState<number>(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const teamArray = new Array(maxTeams).fill(0).map(_ => useState<UnitFormationData>({})) as [
    UnitFormationData,
    Dispatch<SetStateAction<UnitFormationData>>,
  ][];

  const teams = teamArray.map(([units, setUnits]) => ({ units, setUnits }));
  const allUnits = new Set(teams.flatMap(({ units }) => Object.values(units)).map(({ unit }) => unit));

  return (
    <>
      <Container>
        <div className="container-primary flex flex-row w-fit gap-2">
          {teams.map((_, i) => (
            <Button
              key={i}
              onClick={() => setTeamIndex(i)}
              hierarchy="primary"
              selected={teamIndex === i}
              size="sm"
              hasActiveBorder
            >{`Team ${i + 1}`}</Button>
          ))}
        </div>
      </Container>
      {teams.map(({ ...props }, i) => (
        <FormationProvider key={i} id={i} currentId={teamIndex} {...props} allUnits={allUnits}>
          <FormationEditor />
        </FormationProvider>
      ))}
    </>
  );
};

export default Index;
