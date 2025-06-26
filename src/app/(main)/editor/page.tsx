'use client';
import { useState } from 'react';

import type { UnitFormationData } from '@/components/formation/types';
import type { Dispatch, FC, SetStateAction } from 'react';

import Container from '@/components/container/Container';
import FormationEditor from '@/components/formation/FormationEditor';
import { FormationProvider } from '@/components/formation/FormationProvider';
import Button from '@/components/inputs/button/Button';
import Toggle from '@/components/inputs/toggle/Toggle';

const maxTeams = 15;

const Index: FC = () => {
  const [teamIndex, setTeamIndex] = useState<number>(0);
  const [unique, setUnique] = useState<boolean>(false);
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
        <div className="container-primary flex flex-col gap-2 items-center xl:w-fit">
          <Toggle
            variant="switch"
            value="sidebar-background"
            activeLabel="Check Duplicates"
            onChange={e => {
              setUnique(e.target.checked);
            }}
            defaultChecked={unique}
            tooltip={<p className="text-sm">Check for duplicate heroes across all teams</p>}
            solidTooltip={true}
          />
          <div className="grid grid-cols-5 w-fit gap-2 xl:flex xl:flex-row xl:flex-wrap xl:items-center xl:justify-center">
            {teams.map((_, i) => (
              <>
                <Button
                  key={i}
                  onClick={() => setTeamIndex(i)}
                  hierarchy="primary"
                  selected={teamIndex === i}
                  size="sm"
                  hasActiveBorder
                >
                  {`Team ${i + 1}`}
                </Button>
                {(i - 4) % 5 === 0 && i < maxTeams - 1 && (
                  <hr key={`${i}-divider`} className="hidden h-full border-x-1 border-primary-750 xl:block" />
                )}
              </>
            ))}
          </div>
        </div>
      </Container>
      {teams.map(({ units, ...props }, i) => {
        const teamUnits = new Set(Object.values(units).map(({ unit }) => unit));

        return (
          <FormationProvider
            key={i}
            id={i}
            currentId={teamIndex}
            units={units}
            allUnits={unique ? allUnits : teamUnits}
            {...props}
          >
            <FormationEditor />
          </FormationProvider>
        );
      })}
    </>
  );
};

export default Index;
