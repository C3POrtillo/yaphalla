import type { ImagePath } from '@/utils/types';

import {
  ArtifactHexSet,
  ArtifactSet,
  BaseSet,
  CurrentSeason,
  FactionHexSet,
  HonorDuelSet,
  ModeHexSet,
  PreSeasonSet,
  RarityHexSet,
  SeasonSet,
  UnitClass,
} from '@/utils/types';
import { compareStrings, kebabCase } from '@/utils/utils';

export const getSizeClass = (size: 'md' | 'sm' | 'xs' | '2xs') => {
  if (!compareStrings(size, 'sm')) {
    return 'min-w-16';
  }
  if (!compareStrings(size, 'xs')) {
    return 'min-w-12';
  }
  if (!compareStrings(size, '2xs')) {
    return 'min-w-8';
  }

  return 'min-w-20';
};

export const getArtifactPath = (unit: string): ImagePath => {
  if (HonorDuelSet.has(unit)) {
    return 'artifact/honor-duel';
  }

  if (PreSeasonSet.has(unit)) {
    return 'artifact/pre-season';
  }

  if (SeasonSet.has(unit)) {
    return `artifact/${kebabCase(CurrentSeason)}` as ImagePath;
  }

  return 'base/artifact';
};

const getBasePath = (unit: string): ImagePath => {
  if (ArtifactHexSet.has(unit)) {
    return 'base/artifact';
  }

  if (FactionHexSet.has(unit)) {
    return 'base/faction';
  }

  if (RarityHexSet.has(unit)) {
    return 'base/rarity';
  }

  if (ModeHexSet.has(unit)) {
    return 'base/mode';
  }

  return 'base';
};

const wildcardSet = new Set([...UnitClass, 'Wildcard']);

const getUnitPath = (unit: string): ImagePath => {
  if (wildcardSet.has(unit.split(' ')[1])) {
    return 'unit/wildcard';
  }

  return 'unit';
};

export const getPath = (unit: string): ImagePath => {
  if (ArtifactSet.has(unit)) {
    return getArtifactPath(unit);
  }

  if (BaseSet.has(unit)) {
    return getBasePath(unit);
  }

  return getUnitPath(unit);
};
