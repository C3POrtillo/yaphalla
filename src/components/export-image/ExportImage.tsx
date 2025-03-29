import type { ButtonProps } from '@/components/inputs/button/Button';
import type { FC } from 'react';

import { copy, exportToPNG } from '@/components/export-image/utils';
import Button from '@/components/inputs/button/Button';
import { joinStrings } from '@/utils/utils';

interface ExportImageProps extends ButtonProps {
  fileName?: string;
  getImage: () => Promise<string | false>;
  onClick: () => void;
  hasContainer?: boolean;
}

const ExportImage: FC<ExportImageProps> = ({ fileName, getImage, onClick: callback, hasContainer = true }) => {
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
      label: 'Copy to Clipboard',
      onClick: () => {
        handleClick(copy);
      },
    },
    {
      label: 'Export to PNG',
      onClick: () => {
        handleClick(exportToPNG);
      },
    },
  ];

  return (
    <div
      className={joinStrings(
        hasContainer && 'container-primary',
        'w-full flex flex-col grow gap-2 items-center lg:flex-row',
      )}
    >
      {buttons.map(({ onClick, label, ...props }) => (
        <Button key={label} size="sm" className="w-full" onClick={onClick} {...props} hasActiveBorder>
          {label}
        </Button>
      ))}
    </div>
  );
};

export default ExportImage;
