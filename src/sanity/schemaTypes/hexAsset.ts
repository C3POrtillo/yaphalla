import { ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { IMAGE_FIELD } from '../commonFields';

export const hexAssetType = defineType({
  title: 'Hex Asset',
  name: 'hexAsset',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { value: 'hex', title: 'Base Hex' },
          { value: 'outline', title: 'Base Outline' },
          { value: 'icon', title: 'Icon Hex' },
          { value: 'logo', title: 'Logo Hex' },
        ],
      },
    }),
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    IMAGE_FIELD,
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      media: 'image',
    },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: (subtitle[0] as string)[0].toUpperCase() + (subtitle as string).slice(1),
      media,
    }),
  },
  orderings: [
    {
      title: 'Type',
      name: 'type',
      by: [
        { field: 'type', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Name',
      name: 'name',
      by: [
        { field: 'name', direction: 'asc' },
        { field: 'type', direction: 'asc' },
      ],
    },
  ],
});
