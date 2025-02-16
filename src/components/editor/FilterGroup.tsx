import type { Faction, UnitClass } from '@/components/editor/types';
import type { Dispatch, FC, SetStateAction } from 'react';

import FilterButton from '@/components/editor/FilterButton';

interface FilterGroupProps {
  items: readonly UnitClass[] | readonly Faction[];
  filter?: UnitClass | Faction;
  setFilter: Dispatch<SetStateAction<UnitClass | undefined>> | Dispatch<SetStateAction<Faction | undefined>>;
  path: 'class' | 'factions';
}

const FilterGroup: FC<FilterGroupProps> = ({ items, filter, setFilter, path }) => (
  <div className="flex flex-row gap-1">
    {items.map(item => (
      <FilterButton
        key={item}
        src={item}
        path={path}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={() => setFilter(filter === item ? undefined : (item as any))}
        selected={filter === item}
      />
    ))}
  </div>
);

export default FilterGroup;
