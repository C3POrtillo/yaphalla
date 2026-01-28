import type { HeroAPIData, HeroStory } from '@/utils/hero-data/types';
import type { FC } from 'react';

import ParserTale from '@/components/unit-data/ParserTale';
import { sortData } from '@/utils/utils';

interface HeroTalesProps {
  hero: string;
  tales?: HeroStory[];
  heroSet: Set<string>;
  allHeroes: Record<string, HeroAPIData>;
}

const HeroTales: FC<HeroTalesProps> = ({ hero, tales, heroSet, allHeroes }) =>
  tales && (
    <div className="container-primary flex flex-col gap-1 w-full">
      <h2 className="pb-2">Tales</h2>
      {tales
        .sort(({ StoryID: a }, { StoryID: b }) => sortData(a, b))
        .map(
          ({ Story, StoryID, ...props }) =>
            Story && (
              <ParserTale
                hero={hero}
                key={StoryID}
                Story={Story}
                StoryID={StoryID}
                heroSet={heroSet}
                allHeroes={allHeroes}
                {...props}
              />
            ),
        )}
    </div>
  );

export default HeroTales;
