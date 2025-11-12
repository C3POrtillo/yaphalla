import type { FilterPaths, FilterValues } from '@/components/hero-filter/types';
import type { Damage, Faction, HeroClass, Tier } from '@/utils/types';
import type { Dispatch, FC, SetStateAction } from 'react';

import ButtonFilter from '@/components/hero-filter/ButtonFilter';

interface FilterCategoryProps {
  items: readonly HeroClass[] | readonly Faction[] | readonly Tier[] | readonly Damage[];
  filter?: FilterValues;
  setFilter:
    | Dispatch<SetStateAction<HeroClass | undefined>>
    | Dispatch<SetStateAction<Faction | undefined>>
    | Dispatch<SetStateAction<Tier | undefined>>
    | Dispatch<SetStateAction<Damage | undefined>>;
  path: FilterPaths;
}

const FilterCategory: FC<FilterCategoryProps> = ({ items, filter, setFilter, path }) => (
  <div className="flex flex-row gap-1">
    {items.map(item => (
      <ButtonFilter
        key={item}
        src={item}
        path={path}
        onClick={() => setFilter(filter === item ? undefined : (item as any))}
        selected={filter === item}
      />
    ))}
  </div>
);

export default FilterCategory;
