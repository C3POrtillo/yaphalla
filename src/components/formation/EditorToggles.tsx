import type { FC } from 'react';

import { useFormation } from '@/components/formation/FormationProvider';
import Toggle from '@/components/inputs/toggle/Toggle';

const EditorToggles: FC = () => {
  const {
    // hideTalents,
    hideEmpty,
    hideEnemy,
    hideNumbers,
    hideEmptyArtifact,
    setHideEnemy,
    setHideEmpty,
    setHideNumbers,
    setHideEmptyArtifact,
    // setHideTalents,
    isEditArena,
  } = useFormation();

  const spanHide = <span className="text-neutral-500">Hide</span>;
  const spanToggle = (
    <>
      {spanHide}/<span className="text-tertiary-400">Show</span>
    </>
  );
  const spanGrid = <span className="text-neutral-400">Grid Tiles</span>;
  const spanPlayer = <span className="text-neutral-300">Player Tiles</span>;
  const spanEnemy = <span className="text-hex-enemy-400">Enemy Tiles</span>;
  const spanArtifact = <span className="text-primary-400">Artifact Tiles</span>;

  const unitControls = [
    // {
    //   name: 'talentToggle',
    //   defaultChecked: !hideTalents,
    //   value: 'Talents',
    //   disabled: isEditArena,
    //   onChange: setHideTalents,
    //   tooltip: <p className="text-sm">{spanToggle} Faction Talents tiles</p>,
    // },
    {
      name: 'emptyToggle',
      defaultChecked: !hideEmpty,
      value: 'Grid',
      disabled: isEditArena,
      onChange: setHideEmpty,
      tooltip: (
        <p className="text-sm">
          {spanToggle} {spanGrid}
          {'\n'}
          {spanHide} {spanGrid} & {spanEnemy}
          {'\nto only show '}
          {spanPlayer}
        </p>
      ),
    },
    {
      name: 'enemyToggle',
      defaultChecked: !hideEnemy,
      value: 'Enemy',
      disabled: isEditArena,
      onChange: setHideEnemy,
      tooltip: (
        <p className="text-sm">
          {spanToggle} {spanEnemy}
          {'\n'}
          {spanHide} {spanGrid} & {spanEnemy}
          {'\nto only show '}
          {spanPlayer}
        </p>
      ),
    },
    {
      name: 'numberToggle',
      defaultChecked: !hideNumbers,
      value: 'Numbers',
      onChange: setHideNumbers,
      tooltip: <p className="text-sm">{spanToggle} numbers</p>,
    },
    {
      name: 'artifactToggle',
      defaultChecked: !hideEmptyArtifact,
      value: 'Empty Artifacts',
      disabled: isEditArena,
      onChange: setHideEmptyArtifact,
      tooltip: (
        <p className="text-sm">
          {spanToggle} {spanArtifact}
        </p>
      ),
    },
  ] as const;

  const controlDivs = [
    {
      label: 'Enable:',
      hideLabel: true,
      divs: unitControls.map(({ onChange, name, ...props }) => (
        <Toggle
          key={name}
          variant="switch"
          name={name}
          solidTooltip
          onChange={e => onChange(!e.target.checked)}
          {...props}
        />
      )),
    },
  ];

  return (
    <div className="flex flex-col w-full gap-2">
      {controlDivs.map(({ label, hideLabel, divs }) => (
        <div key={label} className="w-full flex flex-row gap-2 items-center">
          {!hideLabel && <span>{label}</span>}
          <div className="w-full flex flex-row gap-1 flex-wrap justify-center">{divs}</div>
        </div>
      ))}
    </div>
  );
};

export default EditorToggles;
