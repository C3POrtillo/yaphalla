import { CalendarIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const bossReference = defineArrayMember({
  type: 'reference',
  to: [{ type: 'unit' }],
  options: {
    sort: [{ field: 'name', direction: 'asc' }],
    filter: 'type == $type',
    filterParams: { type: 'boss' },
  } as any,
});

export const seasonDataType = defineType({
  title: 'Seasonal Data',
  name: 'seasonalData',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({ title: 'Season', name: 'season', type: 'number' }),
    defineField({ title: 'Title', name: 'title', type: 'string' }),
    defineField({
      title: 'Dream Realm',
      name: 'dreamRealm',
      type: 'array',
      of: [bossReference],
    }),
    defineField({
      title: 'Primal Lord',
      name: 'primalLord',
      type: 'array',
      of: [bossReference],
    }),
    defineField({
      title: 'Ravaged Realm',
      name: 'ravagedRealm',
      type: 'array',
      of: [bossReference],
    }),
  ],
  preview: {
    select: {
      title: 'season',
      subtitle: 'title',
    },
    prepare: ({ title, subtitle }) => ({
      title: title ? `Season ${title}` : '',
      subtitle: subtitle || '',
    }),
  },
  orderings: [
    {
      title: 'Season',
      name: 'season',
      by: [{ field: 'season', direction: 'desc' }],
    },
  ],
});
