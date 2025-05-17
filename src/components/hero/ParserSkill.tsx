import type { HeroSkillArgs } from '@/components/hero/types';
import type { FC, ReactNode } from 'react';

import IconDetail from '@/components/hero/IconDetail';
import SkillStat from '@/components/hero/SkillStat';
import { mergeLabeledTokens, mergeTokens, parseSkillToken } from '@/components/hero/utils';

interface ParserSkillProps {
  hero: string;
  Description: string;
  Args: HeroSkillArgs;
  prefix?: ReactNode | false;
  hasLine?: boolean;
}

const ParserSkill: FC<ParserSkillProps> = ({ Description, Args, prefix, hasLine }) => {
  const tokenizeDescription = () => {
    const rawTokens = Description.split(' ');
    const tokens = mergeLabeledTokens(rawTokens);

    return tokens.reduce<(string | ReactNode)[]>((acc, token, i) => {
      const parsedToken = parseSkillToken(token);
      const prev = acc[acc.length - 1];
      if (typeof parsedToken === 'string') {
        if (/Active|Passive/.test(parsedToken)) {
          acc.push(
            <span key={`${i}-${parsedToken}`} className="text-tertiary-400">
              {parsedToken}
            </span>,
          );
          acc.push('');
        } else {
          acc.push(parsedToken);
        }
      } else if (parsedToken.icon) {
        const [unit] = parsedToken.icon.split('/');
        if (prev !== '\n') {
          acc.push('');
        }
        acc.push(
          <span key={`${i}-${parsedToken.icon}`} className="inline-flex align-bottom">
            <IconDetail src={parsedToken.icon} className={(() => `${unit}-icon`)()} />
          </span>,
        );
        acc.push('');
        acc.push(parsedToken.value);
      } else {
        if (prev !== '\n') {
          acc.push('');
        }
        acc.push(<SkillStat key={`${i}-${parsedToken.value}`} args={Args} {...parsedToken} />);
        acc.push('');
      }

      return acc;
    }, []);
  };

  const skill = mergeTokens(tokenizeDescription());

  return (
    <>
      <div className="flex flex-col my-1 input-secondary size-sm !cursor-auto !text-white">
        {prefix}
        <div className="inline-block text-base whitespace-pre-wrap lg:text-lg">{skill}</div>
      </div>
      {hasLine && <hr className="w-full border-b-1 border-primary-750" />}
    </>
  );
};

export default ParserSkill;
