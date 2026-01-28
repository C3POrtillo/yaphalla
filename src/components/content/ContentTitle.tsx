import type { FC, ReactNode } from 'react';

import ParserLabel from '@/components/content/ParserLabel';

export interface ContentTitleProps {
  title?: string | ReactNode;
}

const ContentTitle: FC<ContentTitleProps> = ({ title }) =>
  title && typeof title === 'string' ? (
    <span className="title font-inconsolata -mb-1">{<ParserLabel label={title} className="text-green-400" />}</span>
  ) : (
    title
  );

export default ContentTitle;
