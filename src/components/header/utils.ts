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
  if (length > 4) {
    return `lg:grid-cols-${1 + Math.floor(length / 4)}`;
  }

  return null;
};
