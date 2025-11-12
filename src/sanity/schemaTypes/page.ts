import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'description',
      title: 'description (SEO)',
      type: 'string',
    }),
    defineField({
      name: 'noIndex',
      title: 'no index (SEO)',
      type: 'boolean',
    }),
    defineField({
      name: 'isFile',
      title: 'Remove Header/Footer?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'content',
      type: 'pageBuilder',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
});
