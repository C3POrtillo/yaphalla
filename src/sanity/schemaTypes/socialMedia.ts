import { EarthGlobeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const socialMediaType = defineType({
  name: 'socialMedia',
  title: 'Social Media',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({ title: 'Type', name: 'type', type: 'string', validation: rule => rule.required() }),
    defineField({ title: 'Link', name: 'link', type: 'string', validation: rule => rule.required() }),
    defineField({ title: 'Label', name: 'label', type: 'string', validation: rule => rule.required() }),
    defineField({ title: 'Hide From Header', name: 'hide', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'type',
    },
  },
});
