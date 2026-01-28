import type { FC } from 'react';

interface ParserLabelProps {
  label: string;
  className?: string;
}

const ParserLabel: FC<ParserLabelProps> = ({ label, className }) => {
  const tokenizeLabel = () => {
    const parts = label.split('#');
    const elements = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i % 2 === 1) {
        elements.push(
          i === parts.length - 1 ? (
            `#${part}`
          ) : (
            <span key={i} className={className}>
              {part}
            </span>
          ),
        );
      } else {
        elements.push(part);
      }
    }

    return elements;
  };

  return <>{tokenizeLabel()}</>;
};

export default ParserLabel;
