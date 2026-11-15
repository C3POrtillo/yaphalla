'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import type { FC, PropsWithChildren } from 'react';

import { joinStrings } from '@/utils/utils';

interface TooltipProps extends PropsWithChildren {
  className?: string;
  pointerEvents?: boolean;
  preWrapText?: boolean;
}

const Tooltip: FC<TooltipProps> = ({ className, pointerEvents = false, preWrapText = true, children }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState('');

  const updatePosition = () => {
    const tooltip = tooltipRef.current;

    if (!tooltip || tooltip.offsetParent === null) {
      return;
    }

    const { left, right } = tooltip.getBoundingClientRect();

    if (left < 0) {
      setPosition('left-0 !translate-x-0');
    } else if (right > window.innerWidth) {
      setPosition('right-0 !translate-x-0');
    } else {
      setPosition('');
    }
  };

  useLayoutEffect(() => {
    updatePosition();
  });

  useEffect(() => {
    const tooltip = tooltipRef.current;
    if (!tooltip) {
      return;
    }

    const observer = new MutationObserver(() => {
      requestAnimationFrame(updatePosition);
    });

    observer.observe(tooltip, {
      attributes: true,
      attributeFilter: ['class'],
    });

    window.addEventListener('resize', updatePosition);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  return (
    <div
      ref={tooltipRef}
      className={joinStrings(
        'container-primary !p-1 hidden absolute w-fit z-10 !text-white group-hover:block group-active:block peer-hover:block peer-active:block',
        preWrapText && 'whitespace-pre',
        !pointerEvents && 'pointer-events-none',
        position,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Tooltip;
