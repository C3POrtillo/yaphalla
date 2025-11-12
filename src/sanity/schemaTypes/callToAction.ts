import { LinkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { HIERARCHY_FIELD, IMAGE_FIELDS } from '../commonFields';

export const ctaType = defineType({
  name: 'cta',
  title: 'Call To Actions',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({ title: 'Label', name: 'label', type: 'string' }),
    defineField({ title: 'Link', name: 'link', type: 'string' }),
    defineField({ title: 'Icon', name: 'icon', type: 'string' }),
    HIERARCHY_FIELD,
    ...IMAGE_FIELDS,
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'link',
    },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle,
    }),
  },
});
