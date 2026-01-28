
import type { FilterCategories } from '@/utils/useHeroFilters';
import type { FC,} from 'react';

import ButtonFilter from '@/components/hero-filter/ButtonFilter';

const FilterCategory: FC<FilterCategories['class']> = ({ items, filter, setFilter }) => (
  <div className="flex flex-row gap-1">
    {items?.map(({ _id, image, name }, i) => {
        if (!image || !name) {
          return;
        }
        console.log(name, filter, setFilter)
        return (
          <ButtonFilter
            key={_id + i}
            src={image}
            alt={name}
            onClick={() => {
              if (setFilter) {
                setFilter(filter === name ? undefined : (name as any));
              }
            }}
            selected={filter === name}
          />
        );
      })
      .filter(Boolean)}
  </div>
);

export default FilterCategory;
