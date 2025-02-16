'use client';
import { useEffect, useRef, useState } from 'react';

import type { HierarchyTypes } from '@/utils/types';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import { joinStrings } from '@/utils/utils';

interface AccordionProps extends PropsWithChildren {
  className?: string;
  hierarchy?: HierarchyTypes;
  label?: string | ReactNode;
  icon?: 'fa-bars';
  labelIsClickable?: boolean;
  keepOpen?: boolean;
  ariaLabel?: string;
  defaultState?: boolean;
  panelHeight?: number;
}

const Accordion: FC<AccordionProps> = ({
  className,
  hierarchy = 'primary',
  label,
  icon,
  children,
  labelIsClickable,
  keepOpen = true,
  ariaLabel,
  defaultState = false,
  panelHeight = 1000,
}) => {
  const [isOpen, setOpen] = useState(defaultState);
  const [isClickable] = useState(labelIsClickable);
  const [maxHeight, setMaxHeight] = useState('0px');
  const panelRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(defaultState);
  }, [defaultState]);

  const toggleDropdown = () => {
    setOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!keepOpen && accordionRef.current && !accordionRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      setMaxHeight(`${panelHeight}px  `);
    } else {
      document.removeEventListener('click', handleClickOutside);
      setMaxHeight('0px');
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const faIcon = icon || (isOpen ? 'fa-chevron-up' : 'fa-chevron-down');

  return (
    <div ref={accordionRef} className="flex w-full flex-col">
      {label && (
        <div
          className={joinStrings(
            className,
            'flex w-full flex-row items-center justify-between ease-in-out',
            `size-${isClickable ? 'base' : 'sm'}`,
            hierarchy && `bg-${hierarchy}`,
            isClickable && hierarchy && `input-${hierarchy}`,
            isOpen && '!rounded-b-none',
          )}
        >
          {!isClickable && <div className="pl-1 w-full">{label}</div>}
          <button
            onClick={toggleDropdown}
            className={joinStrings(
              'cursor-pointer inline-flex flex-row items-center justify-between gap-2',
              isClickable && 'w-full',
              !isClickable && hierarchy && `input-${hierarchy}`,
              !isClickable && 'size-sm !shadow-none',
            )}
            aria-label={!isClickable ? ariaLabel : undefined}
          >
            {isClickable && label}
            <i className={joinStrings('fa self-center before:text-2xl lg:before:text-lg', faIcon)} />
          </button>
        </div>
      )}
      <div
        ref={panelRef}
        className={joinStrings('accordion-panel ease-in-out rounded-b-lg overflow-hidden')}
        style={{ maxHeight }}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
