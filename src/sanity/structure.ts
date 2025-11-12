import type { StructureBuilder, StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Yaphalla')
    .items([
      S.documentTypeListItem('page').title('Pages'),
      ...S.documentTypeListItems().filter(item => item.getId() && !['page'].includes(item.getId()!)),
    ]);
