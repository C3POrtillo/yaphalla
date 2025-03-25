import type { FC } from 'react';

import { useFormation } from '@/components/editor/FormationProvider';
import Toggle from '@/components/inputs/toggle/Toggle';

const EditorToggles: FC = () => {
  const {
    setEnemy,
    setEmpty,
    setNumber,
    setHideEmptyArtifact,
    setTalents,
    isEditArena,
    isTalents,
    isEmpty,
    isEnemy,
    isNumber,
    hideEmptyArtifact,
  } = useFormation();

  const unitControls = [
    {
      name: 'talentToggle',
      defaultChecked: !isTalents,
      value: 'Talents',
      disabled: isEditArena,
      onChange: setTalents,
    },
    {
      name: 'emptyToggle',
      defaultChecked: !isEmpty,
      value: 'Grid',
      disabled: isEditArena,
      onChange: setEmpty,
    },
    {
      name: 'enemyToggle',
      defaultChecked: !isEnemy,
      value: 'Enemy',
      disabled: isEditArena,
      onChange: setEnemy,
    },
    {
      name: 'numberToggle',
      defaultChecked: !isNumber,
      value: 'Numbers',
      onChange: setNumber,
    },
    {
      name: 'artifactToggle',
      defaultChecked: !hideEmptyArtifact,
      value: 'Empty Artifacts',
      disabled: isEditArena,
      onChange: setHideEmptyArtifact,
    },
  ] as const;

  const controlDivs = [
    {
      label: 'Enable:',
      hideLabel: true,
      divs: unitControls.map(({ onChange, name, ...props }) => (
        <Toggle key={name} variant="switch" name={name} onChange={e => onChange(!e.target.checked)} {...props} />
      )),
    },
  ];

  return (
    <div className="flex flex-col w-full gap-2">
      {controlDivs.map(({ label, hideLabel, divs }) => (
        <div key={label} className="w-full flex flex-row gap-2 items-center">
          {!hideLabel && <span>{label}</span>}
          <div className="w-full flex flex-row gap-1 flex-wrap">{divs}</div>
        </div>
      ))}
    </div>
  );
};

export default EditorToggles;
