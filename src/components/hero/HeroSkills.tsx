import type { HeroSkill } from '@/components/hero/types';
import type { FC } from 'react';

import CardSkill from '@/components/hero/CardSkill';
import { sortData } from '@/utils/utils';

interface HeroSkillsProps {
  hero: string;
  skills: HeroSkill[];
}

const HeroSkills: FC<HeroSkillsProps> = ({ hero, skills }) => (
  <div className="w-full flex flex-row flex-wrap">
    {skills
      .sort(({ DisplaySlot: a }, { DisplaySlot: b }) => sortData(a, b))
      .map((skill, i) => (
        <div key={i} className="p-1 basis-1/1 md:basis-1/2 lg:basis-1/3 whitespace-pre-wrap grow">
          <CardSkill hero={hero} {...skill} />
        </div>
      ))}
  </div>
);

export default HeroSkills;
