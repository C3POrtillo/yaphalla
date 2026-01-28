import type { FC, ReactNode } from 'react';

import ParserLabel from '@/components/content/ParserLabel';

export interface ContentKickerProps {
  kicker?: string | ReactNode;
}

const ContentKicker: FC<ContentKickerProps> = ({ kicker }) =>
  kicker && typeof kicker === 'string' ? (
    <span className="kicker font-inconsolata -mb-1">{<ParserLabel label={kicker} className="text-sky-900" />}</span>
  ) : (
    kicker
  );

export default ContentKicker;
