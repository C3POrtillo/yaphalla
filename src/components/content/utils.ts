import { CtaIcons } from '@/components/content/types';

const icons = { ...CtaIcons };

export const getIcon = (icon?: string) => {
  if (!icon) {
    return null;
  }

  return icons[icon?.toLowerCase() as keyof typeof icons];
};
