import { defineField, defineType } from 'sanity';
import { CONTENT_FIELDS, IMAGE_FIELDS } from '../commonFields';

export const switchbackType = defineType({
  name: 'switchback',
  type: 'object',
  fields: [
    defineField({
      name: 'orientation',
      type: 'string',
      options: {
        list: [
          { value: 'imageLeft', title: 'Image Left' },
          { value: 'imageRight', title: 'Image Right' },
        ],
      },
    }),
    ...CONTENT_FIELDS,
    ...IMAGE_FIELDS,
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare: ({ title, media }) => ({
      title,
      subtitle: 'Switchback Component',
      media,
    }),
  },
});
