import { TagsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { IMAGE_FIELD } from '../commonFields';

export const factionType = defineType({
  name: 'faction',
  title: 'Faction',
  type: 'document',
  icon: TagsIcon,
  fields: [
    defineField({
      title: 'Faction',
      name: 'faction',
      type: 'string',
      options: {
        list: [
          { value: 'lightbearer', title: 'Lightbearer' },
          { value: 'wilder', title: 'Wilder' },
          { value: 'mauler', title: 'Mauler' },
          { value: 'graveborn', title: 'Graveborn' },
          { value: 'celestial', title: 'Celestial' },
          { value: 'hypogean', title: 'Hypogean' },
          { value: 'dimensional', title: 'Dimensional' },
          { value: 'celestial-hypogean', title: 'Celestial-Hypogean' },
        ],
      },
    }),
    IMAGE_FIELD,
  ],
  preview: {
    select: {
      title: 'faction',
      media: 'image',
    },
    prepare: ({ title, media }) => ({
      title: (title as string)
        .split('-')
        .map(word => (word[0] as string).toUpperCase() + (word as string).slice(1))
        .join(' '),
      media,
    }),
  },
});
