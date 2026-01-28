import { PortableText } from 'next-sanity';

import type { FC } from 'react';
import type { TypedObject } from 'sanity';

export interface ContentBodyProps {
  body?: TypedObject | TypedObject[];
}

const ContentBody: FC<ContentBodyProps> = ({ body }) =>
  body && (
    <div className="prose">
      <PortableText value={body} />
    </div>
  );

export default ContentBody;
