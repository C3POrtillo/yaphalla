import type { HierarchyTypes, InputSizeTypes } from '@/utils/types';
import type { ButtonHTMLAttributes, FC } from 'react';

import { joinStrings } from '@/utils/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  size?: InputSizeTypes;
  hierarchy?: HierarchyTypes;
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  selected,
  disabled,
  size = 'base',
  hierarchy = 'primary',
  ...props
}) => (
  <button
    className={joinStrings(`size-${size} bg-${hierarchy} input-${hierarchy}`, className, selected && 'active-link')}
    disabled={selected || disabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;
