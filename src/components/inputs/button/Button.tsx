import type { ButtonHTMLAttributes, FC } from 'react';

import { joinStrings } from '@/utils/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  size?: 'base';
  hierarchy?: 'primary' | 'secondary' | 'tertiary' | 'warning';
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
    className={joinStrings('input-text', `input-${size}`, `input-${hierarchy}`, className, selected && 'active-link')}
    disabled={selected || disabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;
