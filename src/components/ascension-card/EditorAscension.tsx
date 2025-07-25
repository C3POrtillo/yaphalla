'use client';
import type { CardAscensionProps } from '@/components/ascension-card/CardAscension';
import type { FC } from 'react';

import CardDeckAscension from '@/components/ascension-card/CardDeckAscension';

interface EditorAscensionProps extends CardAscensionProps {
  teams?: Set<string>[];
  hasLabel?: boolean;
}

const EditorAscension: FC<EditorAscensionProps> = ({ teams, styleType, hasLabel }) =>
  teams?.map(
    (units, i) =>
      !!units.size && (
        <CardDeckAscension
          key={`ascension-deck-${i}`}
          units={units}
          label={`Team ${i + 1}`}
          hasLabel={hasLabel}
          styleType={styleType}
        />
      ),
  );

export default EditorAscension;
