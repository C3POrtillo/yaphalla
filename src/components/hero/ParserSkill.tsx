import { capitalize } from 'lodash';


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
}

const ParserSkill: FC<ParserSkillProps> = ({ Description, Args, prefix }) => {
  const tokenizeDescription = () => {
    const rawTokens = Description.split(' ');
    const tokens = mergeLabeledTokens(rawTokens);

    return tokens.reduce<(string | ReactNode)[]>((acc, token, i) => {
      const parsedToken = parseSkillToken(token);
      if (typeof parsedToken === 'string') {
        acc.push(parsedToken);
      } else if (parsedToken.icon) {
        const [unit, icon] = parsedToken.icon.split('/');
        acc.push('');
        acc.push(
          <span key={`${i}-${parsedToken.icon}`} className="inline-flex align-bottom">
            <IconDetail src={parsedToken.icon} className={(() => `${unit}-icon`)()} />
          </span>,
        );
        acc.push('');
        acc.push(capitalize(icon));
      } else {
        acc.push('');
        acc.push(<SkillStat key={`${i}-${parsedToken.value}`} args={Args} {...parsedToken} />);
        acc.push('');
      }

      return acc;
    }, []);
  };

  const skill = mergeTokens(tokenizeDescription());

  return (
    <div className="flex flex-col border-b-1 border-primary-750 pb-1 mb-1">
      {prefix}
      <div className="inline-block text-base lg:text-lg">{skill}</div>
    </div>
  );
};

export default ParserSkill;
