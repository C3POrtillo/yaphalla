import type { HeroSkill } from '@/utils/hero-data/types';
import type { FC } from 'react';

import CardSkill from '@/components/unit-data/CardSkill';
import { sortData } from '@/utils/utils';

interface HeroSkillsProps {
  hero: string;
  skills?: HeroSkill[];
  isNPC?: boolean;
}

const HeroSkills: FC<HeroSkillsProps> = ({ hero, skills, isNPC }) =>
  skills && (
    <div className="w-full flex flex-row flex-wrap justify-center">
      {skills
        .sort(({ DisplaySlot: a }, { DisplaySlot: b }) => sortData(a, b))
        .filter(skill => !!skill.Description)
        .map((skill, i) => (
          <div key={i} className="p-1 basis-1/1 md:basis-1/2 lg:basis-1/3 whitespace-pre-wrap grow">
            <CardSkill hero={hero} {...skill} isNPC={isNPC} />
          </div>
        ))}
    </div>
  );

export default HeroSkills;
