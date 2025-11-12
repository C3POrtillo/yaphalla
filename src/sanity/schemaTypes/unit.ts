import { UserIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const unitType = defineType({
  title: 'Unit',
  name: 'unit',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { value: 'hero', title: 'Hero' },
          { value: 'boss', title: 'Boss' },
          { value: 'phantimal', title: 'Phantimal' },
          { value: 'wildcard', title: 'Wildcard' },
          { value: 'misc', title: 'Misc' },
        ],
      },
    }),
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      title: 'Season',
      name: 'season',
      type: 'number',
      hidden: ({ parent }) => parent?.type !== 'phantimal',
    }),
    defineField({
      title: 'Faction',
      name: 'faction',
      type: 'reference',
      to: [
        {
          type: 'faction',
        },
      ],
      options: {
        sort: [{ field: 'faction', direction: 'asc' }],
      } as any,
      hidden: ({ parent }) => parent?.type !== 'hero' && parent?.type !== 'phantimal' && parent?.type !== 'wildcard',
    }),
    defineField({
      title: 'Class',
      name: 'class',
      type: 'reference',
      to: [
        {
          type: 'class',
        },
      ],
      options: {
        sort: [{ field: 'class', direction: 'asc' }],
      } as any,
    }),
    defineField({
      title: 'Hex',
      name: 'hex',
      type: 'image',
    }),
    defineField({
      title: 'Portrait',
      name: 'portrait',
      type: 'image',
      hidden: ({ parent }) => parent?.type !== 'hero',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      type: 'type',
      faction: 'faction.faction',
      unitClass: 'class.class',
      media: 'hex',
    },
    prepare: ({ title, type, faction, unitClass, media }) => {
      const filteredData = [type, faction, unitClass]
        .filter(Boolean)
        .map(text => (text[0] as string)[0].toUpperCase() + (text as string).slice(1));
      const subtitle = !!filteredData.length ? filteredData.join(' | ') : '';
      return {
        title: title || '',
        subtitle,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Default Order',
      name: 'default',
      by: [
        { field: 'type', direction: 'asc' },
        { field: 'faction.faction', direction: 'asc' },
        { field: 'class.class', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Name',
      name: 'name',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Type',
      name: 'type',
      by: [
        { field: 'type', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Faction',
      name: 'faction',
      by: [
        { field: 'faction.faction', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Class',
      name: 'class',
      by: [
        { field: 'class.class', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
});
