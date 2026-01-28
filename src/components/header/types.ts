import type { Navigation } from '@/sanity/types';

export type NavigationLinkType = { _key: string } & Omit<Navigation, '_type' | '_createdAt' | '_updatedAt' | '_rev'>;
