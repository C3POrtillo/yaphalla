import { ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const brandType = defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'brand',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'fullLogo',
      type: 'image',
    }),
    defineField({
      name: 'icon',
      type: 'image',
    }),
  ],
});
