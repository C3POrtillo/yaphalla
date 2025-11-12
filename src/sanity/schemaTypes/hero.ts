import { defineType } from 'sanity';
import { CONTENT_FIELDS, IMAGE_FIELDS } from '../commonFields';

export const heroType = defineType({
  name: 'hero',
  type: 'object',
  fields: [...CONTENT_FIELDS, ...IMAGE_FIELDS],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare: ({ title, media }) => ({
      title,
      subtitle: 'Hero Component',
      media,
    }),
  },
});
