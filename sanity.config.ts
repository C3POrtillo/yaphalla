import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'yaphalla',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  plugins: [structureTool({structure}), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
