'use-client';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Dispatch, FC, InputHTMLAttributes, SetStateAction } from 'react';

import { joinStrings, kebabCase } from '@/utils/utils';

type Options = {
  [key: string]: string[] | boolean | string;
};

interface TextProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  setState?: Dispatch<SetStateAction<string>>;
  validate?: (string: string, options?: Options) => boolean;
  hideLabel?: boolean;
  labelClassName?: string;
  debouceTime?: number;
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
  debouceTime = 250,
  children,
  ...props
}) => {
  const [isValid, setValid] = useState(validate?.(value as string) ?? true);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const debouncedSetState = useMemo(() => {
    if (!setState) {
      return undefined;
    }
    const debouncedFn = debounce((newValue: string) => setState(newValue), debouceTime);

    return debouncedFn;
  }, [setState, debouceTime]);

  useEffect(
    () => () => {
      debouncedSetState?.cancel();
    },
    [debouncedSetState],
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
      <div className="flex flex-row gap-1 items-end justify-between">
        {!labelHidden && (
          <label className={joinStrings('flex', labelClassName)} htmlFor={id}>
            {label}
            {required && '*'}
          </label>
        )}
        {children}
      </div>
      <input
        className={joinStrings(
          'inset-secondary flex w-full rounded-lg px-3 py-2 border-2',
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
