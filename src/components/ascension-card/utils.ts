export const filterPairs = (unit: string) => {
  switch (unit) {
    case 'Phraesto Clone':
      return 'Phraesto';
    case 'Elijah':
    case 'Lailah':
      return 'Elijah & Lailah';
    default:
      return unit;
  }
};
