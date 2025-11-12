import { defineArrayMember, defineField, ReferenceOptions } from 'sanity';

export const KICKER_FIELD = defineField({ title: 'Kicker', name: 'kicker', type: 'string' });
export const TITLE_FIELD = defineField({ title: 'Title', name: 'title', type: 'string' });
export const BODY_FIELD = defineField({ title: 'Body', name: 'body', type: 'array', of: [{ type: 'block' }] });
export const CTA_FIELD = defineField({
  title: 'Call to Actions',
  name: 'cta',
  type: 'array',
  of: [defineArrayMember({ type: 'reference', to: [{ type: 'cta' }] })],
});

export const IMAGE_FIELD = defineField({
  title: 'Image',
  name: 'image',
  type: 'image',
});
export const IMAGE_ALT_FIELD = defineField({ title: 'Image Description', name: 'imageAlt', type: 'string' });
export const IMAGE_FIELDS = [IMAGE_FIELD, IMAGE_ALT_FIELD];

export const CONTENT_FIELDS = [KICKER_FIELD, TITLE_FIELD, BODY_FIELD, CTA_FIELD];

export const HIERARCHY_FIELD = defineField({
  name: 'hierarchy',
  type: 'string',
  options: {
    list: [
      { value: 'primary', title: 'Primary' },
      { value: 'secondary', title: 'Secondary' },
      { value: 'tertiary', title: 'Tertiary' },
    ],
  },
});

export type ReferenceOptionsWithSort = ReferenceOptions & {
  sort: {
    field: string;
    direction: string;
  };
};
