import type { HeroSkillArgs } from '@/components/hero/types';
import type { FC } from 'react';

import IconDetail from '@/components/hero/IconDetail';
import { correctSrc, getSkillStatValue } from '@/components/hero/utils';
import Tooltip from '@/components/tooltip/Tooltip';
import { compareStrings } from '@/utils/utils';

interface SkillStatProps {
  name?: string;
  value?: string;
  args: HeroSkillArgs;
  hasTrail?: boolean;
  slot?: number;
}

const SkillStat: FC<SkillStatProps> = ({ name, value, args, hasTrail = true, slot }) => {
  if (!value) {
    return null;
  }
  const stat = name && correctSrc(name);
  const formattedValue = getSkillStatValue(value, args);
  if (!formattedValue) {
    return null;
  }
  const match = formattedValue.match(/^(.*?)(s|[^\w\s%])?$/);
  const displayValue = match?.[1];
  const trailString = match?.[2];
  const isSkill =  name && !compareStrings(name, 'skill');
  const getPlusArgLabel = () => slot === 0 ? 'Ultimate' : 'Skill';
  const statLabel = stat && (isSkill ? `Increase in this stat with each point of ${getPlusArgLabel()} Power gained.` : `A value determined by the caster's ${stat.toLocaleUpperCase()}.`);

  return (
    <div className="relative inline-flex group justify-center align-bottom">
      <div className="inline-flex items-center align-baseline whitespace-pre gap-0.25">
        {name && <IconDetail src={name} size="sm" />}{' '}
        {displayValue && <span className={isSkill ? 'text-[#3c76b5]' : 'text-green-400'}>{displayValue}</span>}
        {hasTrail && trailString}
      </div>
      {statLabel && (
        <Tooltip className="text-xs top-0 -translate-y-full !bg-primary-950">
          {statLabel}
        </Tooltip>
      )}
    </div>
  );
};

export default SkillStat;
