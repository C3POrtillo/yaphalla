import { ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { IMAGE_FIELD } from '../commonFields';

export const artifactType = defineType({
  title: 'Artifact',
  name: 'artifact',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { value: 'seasonal', title: 'Seasonal' },
          { value: 'preSeason', title: 'Pre-Season' },
          { value: 'honorDuel', title: 'Honor Duel' },
        ],
      },
    }),
    defineField({
      title: 'Season',
      name: 'season',
      type: 'number',
      hidden: ({ parent }) => parent?.type !== 'seasonal',
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
      type: 'type',
      season: 'season',
      media: 'image',
    },
    prepare: ({ title, type, season, media }) => {
      let subtitle = '';
      switch (type) {
        case 'seasonal':
          subtitle = `Season ${season || 0}`;
          break;
        case 'preSeason':
          subtitle = 'Pre-Season';
          break;
        case 'honorDuel':
          subtitle = 'Honor Duel';
          break;
        default:
          subtitle = '';
          break;
      }

      return {
        title,
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
        { field: 'season', direction: 'desc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Name',
      name: 'name',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
