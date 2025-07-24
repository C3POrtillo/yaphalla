import { Icon } from '@iconify/react';


import type { ButtonProps } from '@/components/inputs/button/Button';
import type { FC } from 'react';

import { labels } from '@/components/export-image/types';
import { copy, exportToPNG } from '@/components/export-image/utils';
import Button from '@/components/inputs/button/Button';
import { joinStrings } from '@/utils/utils';

interface ExportImageProps extends ButtonProps {
  fileName?: string;
  getImage: () => Promise<string | false>;
  onClick: () => void;
  hasContainer?: boolean;
  size?: 'sm' | 'base';
}

const ExportImage: FC<ExportImageProps> = ({
  fileName,
  getImage,
  onClick: callback,
  hasContainer = true,
  selected,
  size = 'base',
}) => {
  const handleClick = async (action: (image: string, file: string | undefined) => Promise<void>) => {
    const image = await getImage();
    if (!image) {
      return;
    }
    await action(image, fileName);
    callback();
  };

  const buttons = [
    {
      label: labels[size].copy,
      icon: 'content-copy',
      onClick: () => {
        handleClick(copy);
      },
    },
    {
      label: labels[size].export,
      icon: 'download',
      onClick: () => {
        handleClick(exportToPNG);
      },
    },
  ] as const;

  return (
    <div
      className={joinStrings(
        hasContainer && 'container-primary',
        'w-full flex flex-col grow gap-2 items-center lg:flex-row',
      )}
    >
      {buttons.map(({ onClick, label, icon, ...props }) => (
        <Button
          key={label}
          size="sm"
          className="inline-flex w-full gap-1 justify-center items-center"
          onClick={onClick}
          selected={selected}
          hasActiveBorder
          {...props}
        >
          <Icon icon={`material-symbols:${icon}`} className="size-6" />
          {label}
        </Button>
      ))}
    </div>
  );
};

export default ExportImage;
