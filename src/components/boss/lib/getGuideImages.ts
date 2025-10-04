import fs from 'fs';
import path from 'path';

import { Difficulties } from '@/utils/types';
import { compareStrings, kebabCase } from '@/utils/utils';

export const getGuideImages = (name: string): Record<string, string[]> => {
  const baseGuidesPath = path.join(process.cwd(), 'public/guides');
  const filesBySeason: Record<string, string[]> = {};

  if (!fs.existsSync(baseGuidesPath)) {
    return {};
  }
  const seasons = fs
    .readdirSync(baseGuidesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && /^Season \d+$/.test(dirent.name));

  for (const season of seasons) {
    const seasonPath = path.join(baseGuidesPath, season.name);
    const seasonFiles: string[] = [];

    for (const difficulty of Difficulties) {
      const difficultyPath = path.join(seasonPath, difficulty);
      if (!fs.existsSync(difficultyPath)) {
        continue;
      }
      const files = fs.readdirSync(difficultyPath);
      const sortedFiles = files
        .filter(file => file.endsWith('.webp') && file.includes(`_${kebabCase(name)}_`))
        .sort((a, b) => {
          const weekA = a.match(/week-(\d+)_/)?.[1] || 0;
          const weekB = b.match(/week-(\d+)_/)?.[1] || 0;
          if (weekA && weekB) {
            return Number(weekA) - Number(weekB);
          }

          return compareStrings(b, a);
        });

      for (const file of sortedFiles) {
        const publicUrl = `/guides/${season.name}/${difficulty}/${file}`;
        seasonFiles.push(publicUrl);
      }
    }
    if (seasonFiles.length > 0) {
      filesBySeason[season.name] = seasonFiles.reverse();
    }
  }

  return filesBySeason;
};
