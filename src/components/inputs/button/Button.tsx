import type { HierarchyTypes, InputSizeTypes } from '@/utils/siteTypes';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import Tooltip from '@/components/tooltip/Tooltip';
import { joinStrings } from '@/utils/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  size?: InputSizeTypes;
  hierarchy?: HierarchyTypes;
  hasActiveBorder?: boolean;
  tooltip?: ReactNode;
  solidTooltip?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  selected,
  disabled,
  size = 'base',
  hierarchy = 'primary',
  hasActiveBorder,
  tooltip,
  solidTooltip,
  ...props
}) => (
  <button
    className={joinStrings(
      !!tooltip && 'group relative',
      `border-1 border-transparent size-${size} bg-${hierarchy} input-${hierarchy}`,
      className,
      selected && 'active-link',
      selected && hasActiveBorder && 'active-border',
      !!tooltip && selected && 'disabled:pointer-events-auto'
    )}
    disabled={selected || disabled}
    {...props}
  >
    {children}
    {tooltip && <Tooltip className={joinStrings('top-full', solidTooltip && '!bg-primary-950')}>{tooltip}</Tooltip>}
  </button>
);

export default Button;
