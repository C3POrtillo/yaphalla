import { LinkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { TITLE_FIELD } from '../commonFields';

export const headerType = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: LinkIcon,
  fields: [
    TITLE_FIELD,
    defineField({
      title: 'Navigation',
      name: 'navigation',
      type: 'array',
      description: 'Top Level Navigation Links',
      of: [
        {
          type: 'reference',
          to: [{ type: 'navigation' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title,
    }),
  },
});
