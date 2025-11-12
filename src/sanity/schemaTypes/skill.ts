import { TagsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { IMAGE_FIELDS } from '../commonFields';

export const skillType = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  icon: TagsIcon,
  fields: [defineField({ title: 'Skill', name: 'skill', type: 'string' }), ...IMAGE_FIELDS],
});
