import type { HeroStory } from '@/components/hero/types';
import type { FC } from 'react';

import TaleParser from '@/components/hero/TaleParser';
import { sortData } from '@/utils/utils';

interface HeroTalesProps {
  hero: string;
  tales: HeroStory[];
}

const HeroTales: FC<HeroTalesProps> = ({ hero, tales }) => (
  <div className="container-primary flex flex-col gap-1 w-full">
    <h2 className="pb-2">Tales</h2>
    {tales
      .sort(({ StoryID: a }, { StoryID: b }) => sortData(a, b))
      .map(({ Story, StoryID }) => Story && <TaleParser hero={hero} key={StoryID} id={StoryID} tale={Story} />)}
  </div>
);

export default HeroTales;
