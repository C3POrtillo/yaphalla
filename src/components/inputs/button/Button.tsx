import type { HierarchyTypes, InputSizeTypes } from '@/utils/types';
import type { ButtonHTMLAttributes, FC } from 'react';

import { joinStrings } from '@/utils/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  size?: InputSizeTypes;
  hierarchy?: HierarchyTypes;
  hasActiveBorder?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  selected,
  disabled,
  size = 'base',
  hierarchy = 'primary',
  hasActiveBorder,
  ...props
}) => (
  <button
    className={joinStrings(
      `border-2 border-transparent size-${size} bg-${hierarchy} input-${hierarchy}`,
      className,
      selected && 'active-link',
      selected && hasActiveBorder && 'active-border',
    )}
    disabled={selected || disabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;
