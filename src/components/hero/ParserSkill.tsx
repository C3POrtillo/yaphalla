import type { HeroSkillArgs } from '@/components/hero/types';
import type { FC, ReactNode } from 'react';

import IconDetail from '@/components/hero/IconDetail';
import SkillStat from '@/components/hero/SkillStat';
import { mergeLabeledTokens, mergeTokens, parseSkillToken } from '@/components/hero/utils';

interface ParserSkillProps {
  hero: string;
  Description: string;
  Args: HeroSkillArgs;
  PlusArgs?: HeroSkillArgs;
  prefix?: ReactNode | false;
  hasLine?: boolean;
}

const ParserSkill: FC<ParserSkillProps> = ({ Description, Args, PlusArgs, prefix, hasLine }) => {
  const tokenizeDescription = () => {
    const rawTokens = Description.split(' ');
    const tokens = mergeLabeledTokens(rawTokens);

    return tokens.reduce<(string | ReactNode)[]>((acc, token, i) => {
      const parsedToken = parseSkillToken(token);
      const preSpace = acc[acc.length - 1] !== '\n' && '';
      const push = (...items: (string | ReactNode)[]) => acc.push(...items.filter(item => item !== false));

      if (typeof parsedToken === 'string') {
        if (/^(Active|Passive)\.$/.test(parsedToken)) {
          acc.push(
            <span key={`${i}-${parsedToken}`} className="text-tertiary-400">
              {parsedToken}
            </span>,
            '',
          );
        } else {
          acc.push(parsedToken);
        }
      } else if (parsedToken.icon) {
        const { icon, value } = parsedToken;
        const [unit] = parsedToken.icon.split('/');
        push(
          preSpace,
          <span key={`${i}-${icon}`} className="inline-flex align-bottom">
            <IconDetail src={icon} className={(() => `${unit}-icon`)()} />
          </span>,
          '',
          value,
        );
      } else {
        const { value, name } = parsedToken;
        const plusValue = PlusArgs && <SkillStat key={`${i}-${value}`} args={PlusArgs} name="skill" value={value} />;
        push(preSpace, <SkillStat key={`${i}-${value}`} args={Args} name={name} value={value} hasTrail={!!plusValue} />);
        if (plusValue) {
          push('+', plusValue);
        }
        push('');
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
