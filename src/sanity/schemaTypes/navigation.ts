import { LinkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { IMAGE_FIELDS } from '../commonFields';

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({ title: 'Label', name: 'label', type: 'string' }),
    defineField({ title: 'Link', name: 'link', type: 'string' }),
    defineField({
      title: 'Sub-navigation',
      name: 'sublinks',
      type: 'array',
      description: 'Optionally link to other navigation items',
      of: [
        {
          type: 'reference',
          to: [{ type: 'navigation' }],
        },
      ],
    }),
    ...IMAGE_FIELDS,
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'link',
      media: 'image',
    },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle,
      media,
    }),
  },
});
