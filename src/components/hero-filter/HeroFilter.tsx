import type { FilterCategories } from '@/utils/useHeroFilters';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

import FilterCategory from '@/components/hero-filter/FilterCategory';
import Text from '@/components/inputs/text/Text';

interface HeroFilterProps extends PropsWithChildren {
  categories?: FilterCategories;
  hasTier?: boolean;
  hasDamage?: boolean;
}

const HeroFilter: FC<HeroFilterProps> = ({ categories, children, hasTier, hasDamage }) => (
  categories && (
    <div className="flex w-full flex-row flex-wrap gap-2 items-end">
      <div className="inset-secondary flex flex-col gap-2 p-2">
        <FilterCategory {...categories.class} />
        <FilterCategory {...categories.faction} />
      </div>
      {(hasTier || hasDamage) && (
        <div className="inset-secondary flex flex-col gap-2 p-2">
          {hasTier && <FilterCategory {...categories.tier} />}
          {hasDamage && <FilterCategory {...categories.damage} />}
        </div>
      )}
      <div className="flex grow">
        <Text
          label="Search"
          setState={categories.search.setFilter as Dispatch<SetStateAction<string>>}
          placeholder="Name/Faction/Class"
          value={categories.search.filter}
        >
          {children}
        </Text>
      </div>
    </div>
  )
);

export default HeroFilter;
