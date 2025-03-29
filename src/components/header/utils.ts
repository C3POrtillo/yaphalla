export const processPaths = (paths: string[], slug: string[] | undefined) => {
  let slugIndex = 0;

  return paths.filter(Boolean).map(path => {
    if (slug?.length && slugIndex < slug.length && path.match(/\[.*\]/)) {
      return slug[slugIndex++];
    }

    return path;
  });
};

export const getLgCols = (length: number) => {
  if (length > 8) {
    return 'lg:grid-cols-3';
  }
  if (length > 4) {
    return 'lg:grid-cols-2';
  }

  return null;
};
