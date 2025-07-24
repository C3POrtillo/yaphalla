import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useRef, useState } from 'react';

import type { HierarchyTypes } from '@/utils/siteTypes';
import type { FC, ReactNode } from 'react';

import Button from '@/components/inputs/button/Button';
import { compareStrings, joinStrings } from '@/utils/utils';

interface DropdownProps {
  label: string | number | ReactNode;
  options: (string | number)[] | readonly (string | number)[];
  optionIcons?: ReactNode[];
  optionIconPosition?: 'left' | 'right';
  hierarchy?: HierarchyTypes;
  callback: (data: string | number) => void;
}

const Dropdown: FC<DropdownProps> = ({ label, options, optionIcons, optionIconPosition, hierarchy, callback }) => {
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const icon = isOpen ? 'chevron-up' : 'chevron-down';
  const optionIconIsRight = optionIconPosition && !compareStrings(optionIconPosition, 'right');
  const toggleDropdown = () => {
    setOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
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
        hasActiveBorder
      >
        {label}
        <Icon icon={`mdi:${icon}`} />
      </Button>
      {isOpen && (
        <div className="scroll-bar-auto scroll-bar-thin scroll-bar-left absolute rounded-md !rounded-t-none flex flex-col z-10 top-full w-full gap-1 p-1 bg-primary-950 max-h-50 overflow-y-auto">
          {options.map((option, i) => (
            <Button
              key={`${option}-${i}`}
              className="inline-flex flex-row gap-2 align-middle"
              hierarchy="tertiary"
              size="sm"
              onClick={() => {
                callback(option);
                setOpen(false);
              }}
            >
              {!optionIconIsRight && optionIcons?.[i]}
              <span className="min-w-7 text-right">{option}</span>
              {optionIconIsRight && optionIcons?.[i]}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
