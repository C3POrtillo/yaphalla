import type { ButtonProps } from '@/components/inputs/button/Button';
import type { FC } from 'react';

import { copy, exportToPNG } from '@/components/export-image/utils';
import Button from '@/components/inputs/button/Button';
import { joinStrings, solidIcon } from '@/utils/utils';

interface ExportImageProps extends ButtonProps {
  fileName?: string;
  getImage: () => Promise<string | false>;
  onClick: () => void;
  hasContainer?: boolean;
}

const ExportImage: FC<ExportImageProps> = ({
  fileName,
  getImage,
  onClick: callback,
  hasContainer = true,
  selected,
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
      label: 'Copy to Clipboard',
      icon: 'copy',
      onClick: () => {
        handleClick(copy);
      },
    },
    {
      label: 'Export to PNG',
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
          <i className={solidIcon(icon)} />
          {label}
        </Button>
      ))}
    </div>
  );
};

export default ExportImage;
