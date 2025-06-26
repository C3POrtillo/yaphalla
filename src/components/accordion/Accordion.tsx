'use client';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';

import type { HierarchyTypes } from '@/utils/siteTypes';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import { joinStrings } from '@/utils/utils';

interface AccordionProps extends PropsWithChildren {
  className?: string;
  hierarchy?: HierarchyTypes;
  label?: string | ReactNode;
  icon?: string;
  labelIsClickable?: boolean;
  keepOpen?: boolean;
  ariaLabel?: string;
  defaultState?: boolean;
}

const Accordion: FC<AccordionProps> = ({
  className,
  hierarchy = 'primary',
  label,
  icon,
  children,
  labelIsClickable = true,
  keepOpen = true,
  ariaLabel,
  defaultState = false,
}) => {
  const [isOpen, setOpen] = useState<boolean>(defaultState);
  const [isClickable] = useState<boolean>(labelIsClickable);
  const [maxHeight, setMaxHeight] = useState<string>('0px');
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
      setMaxHeight('100vh');
    } else {
      document.removeEventListener('click', handleClickOutside);
      setMaxHeight('0px');
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const accordionIcon = icon || (isOpen ? 'chevron-up' : 'chevron-down');

  return (
    <div ref={accordionRef} className="flex w-full flex-col">
      {label && (
        <div
          className={joinStrings(
            className,
            'flex w-full flex-row items-center justify-between ease-in-out',
            isClickable ? 'size-base' : 'shadow-sm p-1 rounded-lg',
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
              !isClickable && 'size-10 size-sm !shadow-none',
            )}
            aria-label={!isClickable ? ariaLabel : undefined}
          >
            {isClickable && label}
            <Icon
              icon={`mdi:${accordionIcon}`}
              className={joinStrings('self-center size-8', !isClickable && 'mx-auto')}
            />
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
