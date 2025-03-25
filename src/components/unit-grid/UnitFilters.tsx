import type { Faction, UnitClass } from '@/utils/types';
import type { Dispatch, FC, SetStateAction } from 'react';

import ButtonFilter from '@/components/unit-grid/ButtonFilter';

interface UnitFilterProps {
  items: readonly UnitClass[] | readonly Faction[];
  filter?: UnitClass | Faction;
  setFilter: Dispatch<SetStateAction<UnitClass | undefined>> | Dispatch<SetStateAction<Faction | undefined>>;
  path: 'class' | 'factions';
}

const UnitFilter: FC<UnitFilterProps> = ({ items, filter, setFilter, path }) => (
  <div className="flex flex-row gap-1">
    {items.map(item => (
      <ButtonFilter
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

export default UnitFilter;
