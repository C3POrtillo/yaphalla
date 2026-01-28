import type { ContentType } from '@/components/componentParser/types';
import type { FC } from 'react';

import ComponentRenderer from '@/components/componentParser/ComponentRenderer';
import { fetchPageCTAs } from '@/components/componentParser/utils';
import HeroComponent from '@/components/hero/Hero';
import SwitchbackComponent from '@/components/switchback/Switchback';

interface ComponentParserProps {
  content?: ContentType;
}

const ComponentParser: FC<ComponentParserProps> = async ({ content }) => {
  if (!content?.length) {
    return null;
  }
  const allCTAs = await fetchPageCTAs();

  const components = (
    await Promise.all(
      content.map(async ({ _type, _key, ...props }) => {
        const componentProps = { id: _key, ...props };
        switch (_type) {
          case 'hero':
            return <HeroComponent key={_key} {...componentProps} />;
          case 'switchback':
            return <SwitchbackComponent key={_key} {...componentProps} />;
          default:
            return null;
        }
      }),
    )
  ).filter(Boolean);

  return <ComponentRenderer ALL_CTAS={allCTAs}>{components}</ComponentRenderer>;
};

export default ComponentParser;
