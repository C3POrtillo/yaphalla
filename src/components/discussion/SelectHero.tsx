import { Suspense } from 'react';

import type { FC } from 'react';

import { useDiscussion } from '@/components/discussion/DiscussionProvider';
import HeroGrid from '@/components/hero-grid/HeroGrid';

const SelectHero: FC = () => {
  const { hero, setHero } = useDiscussion();

  const addUnit = (unit: string, sameUnit: boolean) => {
    if (sameUnit) {
      return;
    }
    setHero(unit);
  };

  return (
    <Suspense
      fallback={<div className="container-primary w-full flex flex-col grow gap-2 p-2 sm:w-min">Loading...</div>}
    >
      <div>
        <HeroGrid currentUnit={hero} onClick={addUnit} />
      </div>
    </Suspense>
  );
};

export default SelectHero;
