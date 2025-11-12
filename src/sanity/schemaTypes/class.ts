import { TagsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { IMAGE_FIELD } from '../commonFields';

export const classType = defineType({
  name: 'class',
  title: 'Class',
  type: 'document',
  icon: TagsIcon,
  fields: [
    defineField({
      title: 'Class',
      name: 'class',
      type: 'string',
      options: {
        list: [
          { value: 'tank', title: 'Tank' },
          { value: 'support', title: 'Support' },
          { value: 'marksman', title: 'Marksman' },
          { value: 'mage', title: 'Mage' },
          { value: 'rogue', title: 'Rogue' },
          { value: 'warrior', title: 'Warrior' },
        ],
      },
    }),
    IMAGE_FIELD,
  ],
  preview: {
    select: {
      title: 'class',
      media: 'image',
    },
    prepare: ({ title, media }) => ({
      title: (title[0] as string)[0].toUpperCase() + (title as string).slice(1),
      media,
    }),
  },
});
