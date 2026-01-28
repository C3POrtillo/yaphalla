import { TagsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { IMAGE_FIELD } from '../commonFields';

export const tierType = defineType({
  name: 'tier',
  title: 'Tier',
  type: 'document',
  icon: TagsIcon,
  fields: [
    defineField({
      title: 'Tier',
      name: 'tier',
      type: 'string',
      options: {
        list: [
          { value: 's', title: 'S' },
          { value: 'a', title: 'A' },
          { value: 'r', title: 'R' },
        ],
      },
    }),
    IMAGE_FIELD,
  ],
  preview: {
    select: {
      title: 'tier',
      media: 'image',
    },
    prepare: ({ title, media }) => ({
      title: title?.toUpperCase() || '',
      media,
    }),
  },
});
