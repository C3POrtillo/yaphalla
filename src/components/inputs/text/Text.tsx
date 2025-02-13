'use-client';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Dispatch, FC, InputHTMLAttributes, SetStateAction } from 'react';

import { joinStrings, kebabCase } from '@/utils/utils';

type Options = {
  [key: string]: string[] | boolean | string;
};

export interface TextProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  setState?: Dispatch<SetStateAction<string>>;
  validate?: (string: string, options?: Options) => boolean;
  hideLabel?: boolean;
  labelClassName?: string;
}

const Text: FC<TextProps> = ({
  type,
  label,
  name,
  value,
  id = kebabCase(label),
  setState,
  validate,
  required,
  hideLabel: labelHidden,
  className,
  labelClassName,
  placeholder,
  ...props
}) => {
  const [isValid, setValid] = useState(validate?.(value as string) ?? true);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const debouncedSetState = useMemo(
    () => setState && debounce((newValue: string) => setState(newValue), 10),
    [setState],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
      debouncedSetState?.(newValue);
      if (validate) {
        setValid(validate(newValue));
      }
    },
    [debouncedSetState, validate],
  );

  return (
    <div className="flex w-full flex-col gap-1">
      {!labelHidden && (
        <label className={joinStrings('flex', labelClassName)} htmlFor={id}>
          {label}
          {required && '*'}
        </label>
      )}
      <input
        className={joinStrings(
          'inset flex w-full rounded-lg bg-primary-750 px-3 py-2 border-2',
          isValid ? 'border-primary-950/80' : 'border-red-400',
          className,
        )}
        type={type || 'text'}
        id={id}
        name={name}
        value={localValue}
        onChange={handleChange}
        required={required}
        placeholder={placeholder || (labelHidden ? `${label}${required && '*'}` : placeholder)}
        {...props}
      />
    </div>
  );
};

export default Text;
