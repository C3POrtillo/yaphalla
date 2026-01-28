import { TagsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { IMAGE_FIELD } from '../commonFields';

export const damageType = defineType({
  name: 'damage',
  title: 'Damage',
  type: 'document',
  icon: TagsIcon,
  fields: [
    defineField({
      title: 'Damage',
      name: 'damage',
      type: 'string',
      options: {
        list: [
          { value: 'physical', title: 'Physical' },
          { value: 'magic', title: 'Magic' },
        ],
      },
    }),
    IMAGE_FIELD,
  ],
  preview: {
    select: {
      title: 'damage',
      media: 'image',
    },
    prepare: ({ title, media }) => ({
      title: (title[0] as string)[0].toUpperCase() + (title as string).slice(1),
      media,
    }),
  },
});
