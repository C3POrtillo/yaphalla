'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Fragment, useEffect, useState } from 'react';

import type { UnitFormationData } from '@/components/formation/types';
import type { Dispatch, FC, SetStateAction } from 'react';

import EditorAscension from '@/components/ascension-card/EditorAscension';
import { filterPairs } from '@/components/ascension-card/utils';
import Container from '@/components/container/Container';
import FormationEditor from '@/components/formation/FormationEditor';
import { FormationProvider } from '@/components/formation/FormationProvider';
import { generateCookies } from '@/components/formation/utils';
import Button from '@/components/inputs/button/Button';
import Toggle from '@/components/inputs/toggle/Toggle';
import { ArtifactSet } from '@/utils/types';
import { compareStrings, getCookie, joinStrings, setCookie } from '@/utils/utils';

const maxTeams = 15;

const Index: FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(0);
  const [teamIndex, setTeamIndex] = useState<number>(0);
  const [unique, setUnique] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const teamArray = new Array(maxTeams).fill(0).map(_ => useState<UnitFormationData>({})) as [
    UnitFormationData,
    Dispatch<SetStateAction<UnitFormationData>>,
  ][];
  const teams = teamArray.map(([units, setUnits]) => ({ units, setUnits }));
  const allUnits = new Set(teams.flatMap(({ units }) => Object.values(units)).map(({ unit }) => unit));
  const tabs = [
    {
      label: 'Formations',
    },
    {
      label: 'Ascensions',
      disabled: !allUnits.size,
    },
  ];
  const isFormation = tab === 0;
  const teamButtons = teams.map((_, i) => (
    <Fragment key={i}>
      <Button
        onClick={() => {
          if (isFormation) {
            setTeamIndex(i);
          } else {
            const target = document.getElementById(`team-${i}`);
            if (!target) {
              return;
            }

            const top = target.getBoundingClientRect().top + window.scrollY + 264;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }}
        hierarchy="primary"
        selected={isFormation && teamIndex === i}
        size="sm"
        hasActiveBorder
      >
        {`Team ${i + 1}`}
      </Button>
      {(i - 4) % 5 === 0 && i < maxTeams - 1 && (
        <hr key={`${i}-divider`} className="hidden h-full border-x-1 border-primary-750 2xl:block" />
      )}
    </Fragment>
  ));
  const formations = teams.map(({ units, ...props }, i) => {
    const teamSet = new Set(Object.values(units).map(({ unit }) => unit));

    return (
      <FormationProvider
        key={i}
        id={i}
        currentId={teamIndex}
        units={units}
        allUnits={unique ? allUnits : teamSet}
        {...props}
      >
        {isFormation && <FormationEditor />}
      </FormationProvider>
    );
  });

  const ascensionEditor = (
    <EditorAscension
      teams={teams.map(
        ({ units }) =>
          new Set(
            Object.values(units)
              .filter(({ unit }) => filterPairs(unit))
              .map(({ unit }) => unit),
          ),
      )}
      styleType="inset"
      hasLabel
    />
  );

  useEffect(() => {
    const loadCookies = async () => {
      Object.entries({
        unique: setUnique,
        teamIndex: setTeamIndex,
      }).forEach(([key, set]) => {
        const cookie = getCookie(`yapbuilder-${key}`);
        if (cookie) {
          if (!compareStrings(cookie, 'undefined')) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            set(undefined as any);
          } else if (!compareStrings(key, 'unique')) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            set(!!Number(cookie) as any);
          } else if (cookie.match(/[0-9]+/)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            set(Number(cookie) as any);
          } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            set(cookie as any);
          }
        }
      });
      setLoaded(true);
    };
    loadCookies();
  }, []);

  useEffect(() => {
    const saveCookies = async () => {
      if (!loaded) {
        return;
      }
      generateCookies(
        {
          unique,
          teamIndex,
        },
        'yapbuilder',
      ).forEach(cookie => {
        setCookie(cookie);
      });
    };
    saveCookies();
  }, [unique, teamIndex]);

  return (
    <>
      <Container className="min-w-full p-2 pb-0">
        <div className="flex flex-col gap-2 items-center min-w-2/3 @2xl:w-full 2xl:w-fit">
          <div className="flex flex-col w-full justify-between gap-2 xl:flex-row">
            <div className="container-primary flex flex-row gap-2">
              {tabs.map(({ label, ...props }, i) => (
                <Button
                  key={`${i}-${label}`}
                  className="inline-flex gap-1 justify-center items-center"
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
            <div className="container-primary flex flex-row gap-2">
              {isFormation && (
                <Toggle
                  variant="switch"
                  value="all-duplicates"
                  activeLabel="Check ALL Duplicates"
                  onChange={e => {
                    setUnique(e.target.checked);
                  }}
                  defaultChecked={unique}
                  tooltip={<p className="text-sm">Check for duplicate heroes across all teams</p>}
                  solidTooltip
                />
              )}
              <Button
                className="inline-flex gap-1 justify-center items-center"
                size="sm"
                hierarchy="warning"
                onClick={() => {
                  teamArray.forEach(([, setUnits]) => {
                    setUnits(prevUnits =>
                      Object.fromEntries(Object.entries(prevUnits).filter(([, data]) => ArtifactSet.has(data.unit))),
                    );
                  });
                }}
              >
                <Icon icon="tabler:user-x" className="size-6" />
                {'Clear ALL Units'}
              </Button>
            </div>
          </div>
          <div className="container-primary grid grid-cols-5 w-fit gap-2 2xl:flex 2xl:flex-row 2xl:flex-wrap 2xl:w-full 2xl:items-center 2xl:justify-between">
            {teamButtons}
          </div>
        </div>
      </Container>
      {formations}
      <div className={joinStrings('mt-2 flex flex-col gap-4', isFormation && 'hidden')}>{ascensionEditor}</div>
    </>
  );
};

export default Index;
