import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useMemo, useRef, useState } from 'react';

import type { HierarchyTypes } from '@/utils/siteTypes';
import type { FC, ReactNode } from 'react';

import Button from '@/components/inputs/button/Button';
import Text from '@/components/inputs/text/Text';
import { cleanString, compareStrings, joinStrings, testRegExp } from '@/utils/utils';

interface DropdownProps {
  label: string | number | ReactNode;
  options: (string | number | boolean)[] | readonly (string | number | boolean)[];
  optionLabels?: Record<string | number, string>;
  optionIcons?: ReactNode[] | readonly ReactNode[];
  optionIconPosition?: 'left' | 'right';
  hierarchy?: HierarchyTypes;
  callback: (data: string | number | boolean) => void;
  filterId?: string;
  disabled?: boolean;
}

const Dropdown: FC<DropdownProps> = ({
  label,
  options,
  optionLabels,
  optionIcons,
  optionIconPosition,
  hierarchy,
  callback,
  filterId,
  disabled,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [filterSearch, setFilterSearch] = useState<string>('');
  const filterRegExp = useMemo(() => !!filterSearch && new RegExp(cleanString(filterSearch), 'i'), [filterSearch]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const icon = isOpen ? 'chevron-up' : 'chevron-down';
  const optionIconIsRight = optionIconPosition && !compareStrings(optionIconPosition, 'right');
  const toggleDropdown = () => {
    setOpen(!isOpen);
    setFilterSearch('');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
      setFilterSearch('');
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative flex items-center justify-center w-full grow" ref={dropdownRef}>
      <Button
        className={joinStrings('flex flex-row items-center w-full justify-between', isOpen && '!rounded-b-none')}
        hierarchy={hierarchy}
        size="sm"
        onClick={() => toggleDropdown()}
        disabled={disabled}
        hasActiveBorder
      >
        {label}
        <Icon icon={`mdi:${icon}`} />
      </Button>
      {isOpen && (
        <div className="absolute z-10 top-full  w-full rounded-md !rounded-t-none border-primary-750 border-1 border-t-0 overflow-hidden">
          <div className="scroll-bar-auto scroll-bar-thin scroll-bar-left flex flex-col gap-1 p-1 bg-primary-950 max-h-50 overflow-y-auto">
            {!!filterId && (
              <div className="flex grow">
                <Text
                  label={filterId}
                  hideLabel
                  setState={setFilterSearch}
                  placeholder="Search"
                  value={filterSearch}
                  className="text-sm"
                />
              </div>
            )}
            {options.map((option, i) => {
              let optionLabel = option
              if (typeof option !== 'boolean') {
                optionLabel = optionLabels?.[option] ?? option
              }
              
              return (
                <Button
                  key={`${option}-${i}`}
                  className={joinStrings(
                    'flex flex-row items-center gap-2',
                    !!filterId && !testRegExp(String(option), filterRegExp) && '!hidden',
                  )}
                  hierarchy="tertiary"
                  size="sm"
                  onClick={() => {
                    callback(option);
                    setOpen(false);
                    setFilterSearch('');
                  }}
                >
                  {!optionIconIsRight && optionIcons?.[i]}
                  <span className="min-w-7 text-right">{optionLabel}</span>
                  {optionIconIsRight && optionIcons?.[i]}
                </Button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
