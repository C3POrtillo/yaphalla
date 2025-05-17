'use client';
import Image from 'next/image';
import { useState } from 'react';

import type { HeroStory } from '@/components/hero/types';
import type { FC, ReactNode } from 'react';

import { cleanToken, joinTokens, mergeTokens } from '@/components/hero/utils';
import HexImage from '@/components/hex-tiles/HexImage';
import Link from '@/components/link/Link';
import { UnitOverride } from '@/utils/pathsHeroes';
import { compareStrings, joinStrings } from '@/utils/utils';

interface ParserTaleProps extends HeroStory {
  hero: string;
}

const ParserTale: FC<ParserTaleProps> = ({ hero, StoryID, Story, IsDefaultUnlock }) => {
  const [isOpen, setOpen] = useState<boolean>(!!IsDefaultUnlock);

  const tokenizeTale = () =>
    Story.split(' ').reduce<(string | ReactNode)[]>((acc, token, i) => {
      const unitToken = cleanToken(token);
      if (!unitToken) {
        acc.push(token, '');

        return acc;
      }
      const linkProps = !hero.includes(unitToken) && {
        className: joinStrings('input-link !inline-flex align-middle', !isOpen && 'pointer-events-none'),
        href: `/heroes/${encodeURIComponent(unitToken)}`,
      };

      const unitSpan = (
        <span key={`${i}-${token}`} className={linkProps ? 'inline' : 'inline-flex align-middle'}>
          <HexImage src={UnitOverride[unitToken] || unitToken} path="unit" disabled size="2xs" />
        </span>
      );

      const getLink = ({ key, label }: Record<string, string>) => (
        <Link key={key} {...linkProps}>
          {unitSpan}
          <span className="pb-1.25">{label}</span>
        </Link>
      );

      if (!compareStrings(unitToken, token)) {
        if (linkProps) {
          const linkData = { key: `${i}-${token}-link`, label: unitToken };
          acc.push(getLink(linkData), '');
        } else {
          acc.push(unitSpan, '', token);
        }

        return acc;
      }

      const [start, ...end] = token.split(unitToken);
      const trail = end.join('');
      const isPunctuation = trail.length === 1;
      const suffix = isPunctuation && trail;
      const joinedToken = joinTokens(' ', unitToken, !isPunctuation && trail);
      const tokens = [start] as ReactNode[];
      if (linkProps) {
        const linkData = { key: `${i}-${token}-link`, label: joinedToken };
        tokens.push(getLink(linkData), ...[suffix, ' ']);
      } else {
        const noLinkToken = joinTokens(joinedToken, suffix);
        tokens.push(...[unitSpan, noLinkToken]);
      }
      acc.push(...tokens.filter(Boolean));

      return acc;
    }, []);

  const formattedTale = mergeTokens(tokenizeTale());

  return (
    <div
      role="button"
      className={joinStrings(
        'inline-flex flex-row items-center gap-2 border-1 border-transparent size-sm',
        isOpen ? '!cursor-auto' : 'cursor-pointer input-secondary',
      )}
      tabIndex={0}
      onClick={() => setOpen(true)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen(true);
        }
      }}
      aria-disabled={isOpen}
    >
      <div className="tale-book flex relative size-16 min-w-16 items-center justify-center -mt-2">
        <Image className="rotate-[15deg] mt-2" src="/assets/images/misc/tale.png" alt={`Tale ${StoryID}`} fill />
        <div className="absolute text-outline inset-0 z-10 flex size-full items-center justify-center text-center text-2xl text-tertiary-600 pt-2">
          {StoryID}
        </div>
      </div>
      <div
        className={joinStrings(
          'inset-secondary text-lg text-left size-full min-h-16 inline-block ease-in-out text-lg lg:text-xl !text-white',
          !isOpen && 'blur-sm',
        )}
      >
        {formattedTale}
      </div>
    </div>
  );
};

export default ParserTale;
