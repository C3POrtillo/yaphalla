'use client';
import { useEffect, useState } from 'react';

import type { HierarchyTypes } from '@/utils/types';
import type { ChangeEvent, FC, InputHTMLAttributes } from 'react';

import { joinStrings, kebabCase } from '@/utils/utils';

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'checkbox' | 'switch';
  value: string;
  activeLabel?: string;
  disableLabel?: string;
  hierarchy?: HierarchyTypes;
}

const Toggle: FC<ToggleProps> = ({
  variant = 'checkbox',
  activeLabel,
  disableLabel,
  value,
  hierarchy = 'primary',
  defaultChecked,
  onChange,
  disabled,
  ...props
}) => {
  const [isChecked, setChecked] = useState(defaultChecked);
  const id = `${variant}-${kebabCase(value)}`;
  const isCheckbox = variant === 'checkbox';

  useEffect(() => {
    setChecked(defaultChecked);
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
      className={joinStrings(
        'size-base flex flex-row items-center gap-2',
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
      <div className="flex flex-row items-center justify-center gap-1 xl:gap-2">
        {!isCheckbox && (
          <>
            {disableLabel && <span>{disableLabel}</span>}
            <div
              className={joinStrings(
                'inset slider ease-in-out',
                !disabled && (isChecked ? 'bg-primary-400' : 'bg-white'),
                disabled && 'bg-neutral-500',
              )}
            >
              <div
                className={joinStrings(
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
    </label>
  );
};

export default Toggle;
