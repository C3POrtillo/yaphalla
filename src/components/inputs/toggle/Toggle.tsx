'use client';
import { useEffect, useState } from 'react';

import type { HierarchyTypes } from '@/utils/siteTypes';
import type { ChangeEvent, FC, InputHTMLAttributes, ReactNode } from 'react';

import Tooltip from '@/components/tooltip/Tooltip';
import { classMerge, compareStrings, kebabCase } from '@/utils/utils';

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'checkbox' | 'switch';
  value: string;
  activeLabel?: string;
  disableLabel?: string;
  hierarchy?: HierarchyTypes;
  tooltip?: ReactNode;
  solidTooltip?: boolean;
}

const Toggle: FC<ToggleProps> = ({
  className,
  variant = 'checkbox',
  activeLabel,
  disableLabel,
  value,
  hierarchy = 'primary',
  defaultChecked,
  onChange,
  disabled,
  tooltip,
  solidTooltip,
  ...props
}) => {
  const [isChecked, setChecked] = useState<boolean>(!!defaultChecked);
  const id = `${variant}-${kebabCase(value)}`;
  const isCheckbox = !compareStrings(variant, 'checkbox');

  useEffect(() => {
    setChecked(!!defaultChecked);
  }, [defaultChecked]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const check = e.target.checked;
    if (onChange) {
      onChange(e);
    }
    setChecked(check);
  };

  return (
    <label
      htmlFor={id}
      className={classMerge(
        !!tooltip && 'group relative lg:justify-center',
        'size-sm !pr-2 flex flex-row items-center gap-2',
        !!disableLabel && '!pl-2',
        isCheckbox && '!pl-2',
        className,
        !disabled && `bg-${hierarchy} input-${hierarchy}`,
      )}
    >
      <input
        type="checkbox"
        className={isCheckbox ? 'checkbox' : 'hidden'}
        id={id}
        name={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
      <div className="flex flex-row items-center justify-center gap-1 xl:gap-1">
        {!isCheckbox && (
          <>
            {disableLabel && <span>{disableLabel}</span>}
            <div
              className={classMerge(
                'inset slider ease-in-out',
                !disabled && (isChecked ? 'bg-primary-400' : 'bg-white'),
                disabled && 'bg-neutral-500',
              )}
            >
              <div
                className={classMerge(
                  'slider-ball ease-in-out',
                  !disabled && (isChecked ? 'bg-white' : 'bg-primary-400'),
                  disabled && 'bg-neutral-400',
                  isChecked ? 'translate-x-[50%]' : 'translate-x-[-50%]',
                )}
              />
            </div>
          </>
        )}
        <span>{activeLabel || value}</span>
      </div>
      {tooltip && (
        <Tooltip className={classMerge('top-full text-center z-20', solidTooltip && '!bg-primary-950')}>
          {tooltip}
        </Tooltip>
      )}
    </label>
  );
};

export default Toggle;
