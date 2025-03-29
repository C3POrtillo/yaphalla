import { exclusionClasses } from '@/components/export-image/types';

export const exportToPNG = async (image: string, fileName: string | undefined) => {
  const link = document.createElement('a');
  link.href = image;
  link.download = `${fileName || 'download'}.png`;
  link.click();
};

export const copy = async (image: string) => {
  try {
    const base64Data = image.replace(/^data:image\/png;base64,/, '');
    const byteNumbers = new Uint8Array([...atob(base64Data)].map(char => char.charCodeAt(0)));
    const blob = new Blob([byteNumbers], { type: 'image/png' });

    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
  } catch (error) {
    console.error('Failed to copy image:', error);
  }
};

export const filter = (node: HTMLElement) => !exclusionClasses.some(classname => node.classList?.contains(classname));
