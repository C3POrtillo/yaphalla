'use client';
import type { CardAscensionProps } from '@/components/ascension-card/CardAscension';
import type { HeroDetailProps } from '@/components/hero/HeroDetail';
import type { FC } from 'react';

import CardDeckAscension from '@/components/ascension-card/CardDeckAscension';

interface EditorAscensionProps extends CardAscensionProps {
  teams?: Set<string>[];
  hasLabel?: boolean;
  heroes?: HeroDetailProps[];
}

const EditorAscension: FC<EditorAscensionProps> = ({ teams, styleType, hasLabel, heroes }) => (
  <>
    {!!heroes?.length && <CardDeckAscension heroes={heroes} />}
    {teams?.map(
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
    )}
  </>
);

export default EditorAscension;
