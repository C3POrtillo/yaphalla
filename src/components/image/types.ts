import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type ImageType = Exclude<SanityImageSource, string>;
