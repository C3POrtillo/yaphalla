'use client';
import { motion } from 'framer-motion';

import type { FC, PropsWithChildren } from 'react';

interface AnimatedContainerProps extends PropsWithChildren {
  id?: string;
  className?: string;
  hasAnimation?: boolean;
  hasFadeIn?: boolean;
  distance?: number;
  duration?: number;
}

const AnimatedContainer: FC<AnimatedContainerProps> = ({
  children,
  hasAnimation = true,
  hasFadeIn = true,
  distance = 80,
  duration = 0.5,
  ...props
}) => {
  const translateY = hasAnimation ? distance : 0;
  const opacity = hasFadeIn ? 0 : 1;

  return (
    <motion.div
      viewport={{ once: true }}
      whileInView={{ opacity: 1, translateY: 0 }}
      initial={{ opacity, translateY }}
      transition={{
        translateY: { type: 'spring', duration, bounce: 0.2 },
        opacity: { duration },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
