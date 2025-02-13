'use client';
import { useEffect, useState } from 'react';

import type { ChangeEvent, FC, InputHTMLAttributes } from 'react';

import { joinStrings, kebabCase } from '@/utils/utils';

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'checkbox' | 'switch';
  value: string;
  activeLabel?: string;
  disableLabel?: string;
  hierarchy?: 'primary' | 'secondary' | 'tertiary' | 'warning';
}

const Toggle: FC<ToggleProps> = ({
  variant = 'checkbox',
  activeLabel,
  disableLabel,
  value,
  hierarchy = 'primary',
  defaultChecked,
  onChange,
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
        'input-base input-text flex flex-row items-center gap-2',
        !props.disabled && `input-${hierarchy}`,
      )}
    >
      <input
        type="checkbox"
        className={isCheckbox ? 'checkbox' : 'hidden'}
        id={id}
        name={value}
        checked={isChecked}
        onChange={handleChange}
        {...props}
      />
      <div className="flex flex-row items-center justify-center gap-1 xl:gap-2">
        {!isCheckbox && (
          <>
            {disableLabel && <span>{disableLabel}</span>}
            <div className={joinStrings('inset slider ease-in-out', isChecked ? 'bg-primary-400' : 'bg-white')}>
              <div
                className={joinStrings(
                  'slider-ball ease-in-out',
                  isChecked ? 'bg-white translate-x-[50%]' : 'bg-primary-400 translate-x-[-50%]',
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
